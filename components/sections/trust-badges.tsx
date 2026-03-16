"use client";

import {AnimatePresence, motion} from "framer-motion";
import {ShieldCheck, Ticket, Hotel, Plane} from "lucide-react";
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";

import {Card, CardContent} from "@/components/ui/card";
import {cn} from "@/lib/utils";

export function TrustBadges() {
  const t = useTranslations("common");
  const marketing = useTranslations("marketing.trustBadges");
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      label: t("directFlight"),
      icon: Plane,
      eyebrow: marketing("directFlight.eyebrow"),
      detail: marketing("directFlight.detail")
    },
    {
      label: t("visaSupport"),
      icon: ShieldCheck,
      eyebrow: marketing("visaSupport.eyebrow"),
      detail: marketing("visaSupport.detail")
    },
    {
      label: t("roundTrip"),
      icon: Ticket,
      eyebrow: marketing("roundTrip.eyebrow"),
      detail: marketing("roundTrip.detail")
    },
    {
      label: t("accommodation"),
      icon: Hotel,
      eyebrow: marketing("accommodation.eyebrow"),
      detail: marketing("accommodation.detail")
    }
  ];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [items.length]);

  const activeItem = items[activeIndex];

  return (
    <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item, index) => {
          const Icon = item.icon;
          const active = index === activeIndex;

          return (
            <button
              key={item.label}
              type="button"
              className="text-start"
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
            >
              <Card
                className={cn(
                  "spotlight-card h-full transition-all duration-300",
                  active
                    ? "border-gold-300/35 bg-gold-500/10 shadow-glow"
                    : "bg-noir-900/55 hover:border-gold-300/25 hover:bg-white/5"
                )}
              >
                <CardContent className="space-y-4 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl text-gold-200 transition-all duration-300",
                        active ? "bg-gold-400/20 shadow-glow" : "bg-gold-400/12"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.24em] text-gold-200/55">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-sand-50">{item.label}</p>
                    <p className="text-xs uppercase tracking-[0.24em] text-gold-200/55">
                      {item.eyebrow}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.label}
          initial={{opacity: 0, y: 12}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -12}}
          transition={{duration: 0.22}}
          className="rounded-[2rem] border border-gold-500/15 bg-noir-900/55 p-6"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-gold-500/20 bg-gold-500/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-gold-200/70">
              {activeItem.eyebrow}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-sand-100/70">
              {activeItem.label}
            </span>
          </div>
          <p className="mt-5 text-sm leading-8 text-sand-100/72">{activeItem.detail}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {items.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group"
                aria-label={item.label}
              >
                <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-gold-300 via-sand-50 to-gold-400"
                    animate={{width: index <= activeIndex ? "100%" : "22%"}}
                    transition={{duration: 0.25}}
                  />
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
