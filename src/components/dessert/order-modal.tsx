"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bike,
  CheckCircle2,
  Loader2,
  Plus,
  ShoppingBag,
  Store,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { formatINR } from "@/lib/dessert-data";
import { useCart } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type Stage = "cart" | "success";
type Fulfil = "pickup" | "delivery";

export default function OrderModal() {
  const { items, orderOpen, setOrderOpen, removeItem, clearCart } = useCart();
  const [stage, setStage] = useState<Stage>("cart");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [placing, setPlacing] = useState(false);
  const [fulfil, setFulfil] = useState<Fulfil>("pickup");
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [error, setError] = useState("");

  const subtotal = useMemo(
    () => items.reduce((n, i) => n + i.unit * i.qty, 0),
    [items]
  );
  const deliveryFee = fulfil === "delivery" && subtotal < 599 && subtotal > 0 ? 49 : 0;
  const total = subtotal + deliveryFee;
  const count = items.reduce((n, i) => n + i.qty, 0);

  const close = (open: boolean) => {
    setOrderOpen(open);
    if (!open) {
      setTimeout(() => {
        if (stage === "success") clearCart();
        setStage("cart");
        setOrderId(null);
        setError("");
      }, 300);
    }
  };

  const placeOrder = async () => {
    setError("");
    if (form.name.trim().length < 2) {
      setError("Please tell us your lovely name.");
      return;
    }
    if (!/^[0-9+\-\s]{8,15}$/.test(form.phone.trim())) {
      setError("That phone number looks a little melted — check it?");
      return;
    }
    if (fulfil === "delivery" && form.address.trim().length < 8) {
      setError("We need a fuller address to find your sweet tooth.");
      return;
    }

    setPlacing(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name.trim(),
          phone: form.phone.trim(),
          type: fulfil,
          address: fulfil === "delivery" ? form.address.trim() : null,
          items: items.map((i) => ({
            name: i.name,
            qty: i.qty,
            addons: i.addons.map((a) => a.label),
            unitPrice: i.unit,
            lineTotal: i.unit * i.qty,
          })),
          total,
        }),
      });
      if (!res.ok) throw new Error("Order failed");
      const data = await res.json();
      setOrderId(data.orderId ?? `LF-${Math.floor(1000 + Math.random() * 9000)}`);
      setStage("success");
    } catch {
      setError("Our kitchen glitched for a second — please try again.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <Dialog open={orderOpen} onOpenChange={close}>
      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="fancy-scroll max-h-[92vh] gap-0 overflow-y-auto rounded-[2rem] border-gold/40 p-0 sm:max-w-lg"
      >
        <AnimatePresence mode="wait">
          {stage === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center px-8 py-14 text-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-green-600 to-green-700 text-cream shadow-xl shadow-green-700/30"
              >
                <CheckCircle2 className="h-10 w-10" />
              </motion.span>
              <DialogTitle className="mt-6 font-display text-3xl font-black text-maroon-deep">
                Order Confirmed! 🎉
              </DialogTitle>
              <DialogDescription className="mt-3 max-w-xs text-sm leading-relaxed text-choco/65">
                Thank you, {form.name.split(" ")[0]}! Our chefs have started
                crafting your sweetness. Order{" "}
                <span className="font-bold text-maroon">{orderId}</span>
                {fulfil === "delivery"
                  ? " will arrive within 40 minutes."
                  : " will be ready for pickup in 20 minutes."}
              </DialogDescription>
              <div className="mt-4 rounded-2xl border border-gold/40 bg-gold/10 px-5 py-3 text-sm font-bold text-maroon">
                {count} item{count > 1 ? "s" : ""} · {formatINR(total)} ·{" "}
                {fulfil === "delivery" ? "🛵 Delivery" : "🏬 Pickup"}
              </div>
              <button
                onClick={() => close(false)}
                className="mt-7 h-12 w-full rounded-full bg-maroon text-sm font-bold uppercase tracking-wider text-cream shadow-lg shadow-maroon/30 transition-all hover:bg-maroon-dark"
              >
                Sweet, thanks!
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 sm:p-7"
            >
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="font-display text-2xl font-black text-maroon-deep">
                    Your Dessert Box
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-sm text-choco/60">
                    {count === 0
                      ? "A box full of possibilities (and soon, desserts)."
                      : `${count} delicious item${count > 1 ? "s" : ""} waiting for you.`}
                  </DialogDescription>
                </div>
                <button
                  onClick={() => close(false)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 text-choco/60 transition-colors hover:border-maroon hover:text-maroon"
                  aria-label="Close order box"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {items.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-gold/15 text-gold-dark">
                    <ShoppingBag className="h-9 w-9" />
                  </span>
                  <p className="mt-4 font-display text-lg font-bold text-maroon-deep">
                    Your dessert box is empty
                  </p>
                  <p className="mt-1.5 max-w-[240px] text-sm text-choco/60">
                    Head to the menu and pile in some gelato, cake & magic ✦
                  </p>
                  <button
                    onClick={() => close(false)}
                    className="mt-6 h-11 rounded-full bg-maroon px-7 text-sm font-bold text-cream shadow-lg shadow-maroon/25 transition-colors hover:bg-maroon-dark"
                  >
                    Browse the Menu
                  </button>
                </div>
              ) : (
                <>
                  {/* items */}
                  <ul className="mt-5 space-y-3">
                    {items.map((i) => (
                      <li
                        key={i.key}
                        className="flex items-center gap-3 rounded-2xl border border-gold/25 bg-cream/60 p-3"
                      >
                        <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-2 ring-gold/40">
                          <Image
                            src={i.img}
                            alt={i.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-maroon-deep">
                            {i.name}
                          </p>
                          <p className="truncate text-xs text-choco/55">
                            {i.addons.length > 0
                              ? `+ ${i.addons.map((a) => a.label).join(", ")}`
                              : "Classic, no add-ons"}
                          </p>
                          <p className="mt-0.5 text-xs font-bold text-gold-dark">
                            Qty {i.qty} · {formatINR(i.unit * i.qty)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(i.key)}
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-choco/40 transition-colors hover:bg-red-50 hover:text-red-600"
                          aria-label={`Remove ${i.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* fulfilment */}
                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    {(
                      [
                        { id: "pickup", icon: Store, label: "Pickup", sub: "Ready in 20 min" },
                        { id: "delivery", icon: Bike, label: "Delivery", sub: "In ~40 min" },
                      ] as const
                    ).map((o) => (
                      <button
                        key={o.id}
                        onClick={() => setFulfil(o.id)}
                        aria-pressed={fulfil === o.id}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all",
                          fulfil === o.id
                            ? "border-gold bg-gold/15"
                            : "border-border bg-white hover:border-gold/50"
                        )}
                      >
                        <o.icon
                          className={cn(
                            "h-5 w-5",
                            fulfil === o.id ? "text-maroon" : "text-choco/50"
                          )}
                        />
                        <span>
                          <span className="block text-sm font-bold text-maroon-deep">
                            {o.label}
                          </span>
                          <span className="block text-[11px] text-choco/55">
                            {o.sub}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* form */}
                  <div className="mt-4 grid gap-2.5">
                    <input
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your name *"
                      aria-label="Your name"
                      className="h-12 rounded-2xl border border-border bg-white px-4 text-sm font-medium text-choco outline-none transition-colors placeholder:text-choco/40 focus:border-gold focus:ring-2 focus:ring-gold/30"
                    />
                    <input
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="Phone number *"
                      aria-label="Phone number"
                      inputMode="tel"
                      className="h-12 rounded-2xl border border-border bg-white px-4 text-sm font-medium text-choco outline-none transition-colors placeholder:text-choco/40 focus:border-gold focus:ring-2 focus:ring-gold/30"
                    />
                    {fulfil === "delivery" && (
                      <textarea
                        value={form.address}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, address: e.target.value }))
                        }
                        placeholder="Delivery address *"
                        aria-label="Delivery address"
                        rows={2}
                        className="resize-none rounded-2xl border border-border bg-white px-4 py-3 text-sm font-medium text-choco outline-none transition-colors placeholder:text-choco/40 focus:border-gold focus:ring-2 focus:ring-gold/30"
                      />
                    )}
                  </div>

                  {/* totals */}
                  <div className="mt-4 space-y-1.5 rounded-2xl bg-maroon-deep/[0.04] p-4 text-sm">
                    <div className="flex justify-between text-choco/65">
                      <span>Subtotal</span>
                      <span className="font-semibold">{formatINR(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-choco/65">
                      <span>Delivery</span>
                      <span className="font-semibold">
                        {deliveryFee === 0 ? (
                          fulfil === "delivery" ? (
                            <span className="text-green-700">FREE 🎉</span>
                          ) : (
                            "—"
                          )
                        ) : (
                          formatINR(deliveryFee)
                        )}
                      </span>
                    </div>
                    {fulfil === "delivery" && subtotal < 599 && (
                      <p className="text-[11px] text-choco/50">
                        Add {formatINR(599 - subtotal)} more for free delivery ✦
                      </p>
                    )}
                    <div className="flex justify-between border-t border-dashed border-gold/50 pt-2.5 text-base font-black text-maroon">
                      <span>Total</span>
                      <span>{formatINR(total)}</span>
                    </div>
                  </div>

                  {error && (
                    <p className="mt-3 rounded-xl bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-700">
                      {error}
                    </p>
                  )}

                  <button
                    onClick={placeOrder}
                    disabled={placing}
                    className="mt-4 flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-maroon to-maroon-light text-base font-bold tracking-wide text-cream shadow-xl shadow-maroon/30 transition-all hover:-translate-y-0.5 hover:shadow-2xl disabled:opacity-60"
                  >
                    {placing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Placing your order…
                      </>
                    ) : (
                      <>
                        <Plus className="h-5 w-5" />
                        Place Order — {formatINR(total)}
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-center text-[11px] text-choco/45">
                    Pay at counter or on delivery · UPI, cards & cash accepted
                  </p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </DialogContent>
    </Dialog>
  );
}
