import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

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

    // Ensure unique code
    let code = makeOrderCode();
    for (let i = 0; i < 5; i++) {
      const exists = await db.order.findUnique({ where: { code } });
      if (!exists) break;
      code = makeOrderCode();
    }

    const order = await db.order.create({
      data: {
        code,
        customerName: body.customerName.trim().slice(0, 80),
        phone: body.phone.trim(),
        type: body.type === "delivery" ? "delivery" : "pickup",
        address: body.address ? body.address.trim().slice(0, 300) : null,
        total: Math.round(body.total),
        status: "received",
        items: {
          create: body.items.slice(0, 50).map((it) => ({
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
    const count = await db.order.count();
    return NextResponse.json({ totalOrders: count });
  } catch {
    return NextResponse.json({ totalOrders: 0 });
  }
}
