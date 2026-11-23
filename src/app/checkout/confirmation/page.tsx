"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Hoop } from "@/components/ui/Hoop";
import { Sparkles } from "@/components/ui/Sparkles";
import { ButtonLink } from "@/components/ui/Button";
import { formatINR } from "@/lib/format";

type LastOrder = { paymentId: string; name: string; total: number };

/** Only shows a confirmation for an order whose payment the server has verified. */
export default function ConfirmationPage() {
  const [order, setOrder] = useState<LastOrder | null | undefined>(undefined);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("ryflo-last-order");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only state read after hydration
      setOrder(raw ? (JSON.parse(raw) as LastOrder) : null);
    } catch {
      setOrder(null);
    }
  }, []);

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-blush px-4 pb-20 pt-32 text-center">
      <Sparkles />
      {order === undefined ? null : order ? (
        <div className="relative flex max-w-xl flex-col items-center">
          <motion.div className="w-48" initial={{ rotate: -270, scale: 0.3 }} animate={{ rotate: 0, scale: [0.3, 1.2, 1] }} transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}>
            <Hoop speed={1.2} thickness={12} tilt={50} />
          </motion.div>
          <h1 className="display mt-8 text-[clamp(2.8rem,7vw,5rem)]">
            Thank you, <em>{order.name.split(" ")[0]}!</em>
          </h1>
          <p className="mt-4 text-lg text-wine/75">Your order is confirmed and your hoop is about to get a lot shinier.</p>
          <p className="mt-6 rounded-full bg-ivory px-5 py-2 text-sm">
            Paid {formatINR(order.total)} · Ref {order.paymentId}
          </p>
          <ButtonLink href="/shop" className="mt-10" variant="outline">
            Back to the shop
          </ButtonLink>
        </div>
      ) : (
        <div className="relative max-w-lg">
          <h1 className="display text-[clamp(2.6rem,6vw,4.4rem)]">No recent order found.</h1>
          <p className="mt-4 text-wine/75">If you&apos;ve just paid and expected to see a confirmation, please get in touch with your payment reference.</p>
          <ButtonLink href="/contact" className="mt-8">
            Contact us
          </ButtonLink>
        </div>
      )}
    </section>
  );
}
