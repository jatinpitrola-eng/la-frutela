import { NextRequest, NextResponse } from "next/server";

/**
 * Orders API — resilient by design.
 *
 * - Local / self-hosted: persists to SQLite through Prisma.
 * - Vercel (serverless, ephemeral FS): transparently falls back to an
 *   in-memory store so the full ordering experience keeps working.
 */

interface IncomingItem {
  name: string;
  qty: number;
  addons: string[];
  unitPrice: number;
  lineTotal: number;
}

interface OrderPayload {
  customerName: string;
  phone: string;
  type: "pickup" | "delivery";
  address: string | null;
  items: IncomingItem[];
  total: number;
}

interface StoredOrder {
  code: string;
  customerName: string;
  phone: string;
  type: string;
  address: string | null;
  total: number;
  status: string;
  createdAt: string;
  items: {
    name: string;
    qty: number;
    addons: string;
    unitPrice: number;
    lineTotal: number;
  }[];
}

interface OrderStore {
  exists(code: string): Promise<boolean>;
  create(code: string, payload: OrderPayload): Promise<StoredOrder>;
  count(): Promise<number>;
}

/* ── In-memory store (globalThis survives dev hot-reload) ── */
const g = globalThis as unknown as { __lfMemoryOrders?: Map<string, StoredOrder> };
const memoryOrders = (g.__lfMemoryOrders ??= new Map<string, StoredOrder>());

const memoryStore: OrderStore = {
  async exists(code) {
    return memoryOrders.has(code);
  },
  async create(code, payload) {
    const order: StoredOrder = {
      code,
      customerName: payload.customerName.trim().slice(0, 80),
      phone: payload.phone.trim(),
      type: payload.type === "delivery" ? "delivery" : "pickup",
      address: payload.address ? payload.address.trim().slice(0, 300) : null,
      total: Math.round(payload.total),
      status: "received",
      createdAt: new Date().toISOString(),
      items: payload.items.slice(0, 50).map((it) => ({
        name: String(it.name).slice(0, 120),
        qty: Math.max(1, Math.min(99, Math.round(it.qty))),
        addons: (it.addons ?? []).join(", ").slice(0, 300),
        unitPrice: Math.max(0, Math.round(it.unitPrice)),
        lineTotal: Math.max(0, Math.round(it.lineTotal)),
      })),
    };
    memoryOrders.set(code, order);
    return order;
  },
  async count() {
    return memoryOrders.size;
  },
};

/* ── Prisma store (skipped entirely on Vercel; falls back on any error) ── */
async function getPrismaStore(): Promise<OrderStore | null> {
  if (process.env.VERCEL) return null;
  try {
    const { db } = await import("@/lib/db");
    return {
      async exists(code) {
        const found = await db.order.findUnique({ where: { code } });
        return Boolean(found);
      },
      async create(code, payload) {
        const order = await db.order.create({
          data: {
            code,
            customerName: payload.customerName.trim().slice(0, 80),
            phone: payload.phone.trim(),
            type: payload.type === "delivery" ? "delivery" : "pickup",
            address: payload.address ? payload.address.trim().slice(0, 300) : null,
            total: Math.round(payload.total),
            status: "received",
            items: {
              create: payload.items.slice(0, 50).map((it) => ({
                name: String(it.name).slice(0, 120),
                qty: Math.max(1, Math.min(99, Math.round(it.qty))),
                addons: (it.addons ?? []).join(", ").slice(0, 300),
                unitPrice: Math.max(0, Math.round(it.unitPrice)),
                lineTotal: Math.max(0, Math.round(it.lineTotal)),
              })),
            },
          },
          include: { items: true },
        });
        return {
          code: order.code,
          customerName: order.customerName,
          phone: order.phone,
          type: order.type,
          address: order.address,
          total: order.total,
          status: order.status,
          createdAt: order.createdAt.toISOString(),
          items: order.items.map((it) => ({
            name: it.name,
            qty: it.qty,
            addons: it.addons,
            unitPrice: it.unitPrice,
            lineTotal: it.lineTotal,
          })),
        };
      },
      async count() {
        return db.order.count();
      },
    };
  } catch {
    return null;
  }
}

async function resolveStore(): Promise<OrderStore> {
  const prisma = await getPrismaStore();
  return prisma ?? memoryStore;
}

function makeOrderCode() {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `LF-${rand}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as OrderPayload;

    // Validation
    if (
      !body?.customerName ||
      body.customerName.trim().length < 2 ||
      !body?.phone ||
      !/^[0-9+\-\s]{8,15}$/.test(body.phone.trim()) ||
      !Array.isArray(body.items) ||
      body.items.length === 0 ||
      typeof body.total !== "number" ||
      body.total <= 0
    ) {
      return NextResponse.json(
        { error: "Invalid order payload — missing or malformed fields." },
        { status: 400 }
      );
    }

    if (body.type === "delivery" && (!body.address || body.address.trim().length < 8)) {
      return NextResponse.json(
        { error: "Delivery orders require a valid address." },
        { status: 400 }
      );
    }

    const store = await resolveStore();

    // Ensure unique code
    let code = makeOrderCode();
    for (let i = 0; i < 5; i++) {
      if (!(await store.exists(code))) break;
      code = makeOrderCode();
    }

    const order = await store.create(code, body);

    return NextResponse.json(
      { orderId: order.code, status: order.status, createdAt: order.createdAt },
      { status: 201 }
    );
  } catch (err) {
    console.error("Order creation failed:", err);
    return NextResponse.json(
      { error: "Kitchen hiccup — could not save the order." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const store = await resolveStore();
    const count = await store.count();
    return NextResponse.json({ totalOrders: count });
  } catch {
    return NextResponse.json({ totalOrders: 0 });
  }
}
