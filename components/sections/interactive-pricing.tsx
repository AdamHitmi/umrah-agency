"use client";

import {AnimatePresence, motion} from "framer-motion";
import {ArrowDownToLine, Check, Sparkles} from "lucide-react";
import {useTranslations} from "next-intl";
import {useMemo, useState} from "react";

import {Badge} from "@/components/ui/badge";
import {Button, buttonVariants} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {formatMadCurrency} from "@/lib/format";
import {cn} from "@/lib/utils";

type PricingTier = {
  id: string;
  labelAr: string;
  labelFr: string;
  amountMad: number;
};

type PricingGroup = {
  id: string;
  roomTypeAr: string;
  roomTypeFr: string;
  tiers: PricingTier[];
};

type InteractivePricingProps = {
  locale: "ar" | "fr";
  title: string;
  groups: PricingGroup[];
};

export function InteractivePricing({
  locale,
  title,
  groups
}: InteractivePricingProps) {
  const t = useTranslations("marketing.pricing");
  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.id ?? "");
  const [activeTierId, setActiveTierId] = useState(groups[0]?.tiers[0]?.id ?? "");

  const activeGroup = useMemo(
    () => groups.find((group) => group.id === activeGroupId) ?? groups[0],
    [activeGroupId, groups]
  );
  const activeTier = useMemo(
    () =>
      activeGroup?.tiers.find((tier) => tier.id === activeTierId) ?? activeGroup?.tiers[0],
    [activeGroup, activeTierId]
  );

  if (!activeGroup || !activeTier) {
    return null;
  }

  const roomType = locale === "ar" ? activeGroup.roomTypeAr : activeGroup.roomTypeFr;

  const handleSelectOffer = () => {
    window.dispatchEvent(
      new CustomEvent("booking-room-type:selected", {
        detail: {
          roomType
        }
      })
    );

    document.getElementById("booking")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="gold">{title}</Badge>
          <p className="text-sm text-sand-100/70">{t("intro")}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {groups.map((group) => {
            const label = locale === "ar" ? group.roomTypeAr : group.roomTypeFr;
            const active = group.id === activeGroup.id;

            return (
              <button
                key={group.id}
                type="button"
                onClick={() => {
                  setActiveGroupId(group.id);
                  setActiveTierId(group.tiers[0]?.id ?? "");
                }}
                className={buttonVariants({
                  variant: active ? "default" : "secondary",
                  size: "sm"
                })}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {activeGroup.tiers.map((tier, index) => {
            const tierLabel = locale === "ar" ? tier.labelAr : tier.labelFr;
            const active = tier.id === activeTier.id;

            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setActiveTierId(tier.id)}
                className="text-start"
              >
                <Card
                  className={cn(
                    "h-full",
                    active
                      ? "border-gold-300/35 bg-gold-500/10 shadow-glow"
                      : "bg-noir-900/55"
                  )}
                >
                  <CardContent className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-gold-200/70">
                          {tierLabel}
                        </p>
                        <p className="mt-2 font-display text-4xl text-sand-50">
                          {formatMadCurrency(tier.amountMad, locale)}
                        </p>
                      </div>
                      <div
                        className={cn(
                          "flex h-11 w-11 items-center justify-center rounded-2xl border transition-colors",
                          active
                            ? "border-gold-300/40 bg-gold-400/15 text-gold-100"
                            : "border-white/10 bg-white/5 text-sand-100/45"
                        )}
                      >
                        {active ? <Check className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                      </div>
                    </div>
                    <div className="luxury-divider" />
                    <p className="text-sm leading-7 text-sand-100/70">
                      {t("tierDescription", {index: index + 1})}
                    </p>
                  </CardContent>
                </Card>
              </button>
            );
          })}
        </div>
      </div>

      <Card className="h-fit xl:sticky xl:top-28">
        <CardContent className="space-y-5">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.28em] text-gold-200/70">
              {t("selectedOffer")}
            </p>
            <h3 className="font-display text-3xl text-sand-50">{roomType}</h3>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTier.id}
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -10}}
              transition={{duration: 0.25}}
              className="rounded-[2rem] border border-gold-500/15 bg-gradient-to-br from-gold-500/12 to-transparent p-5"
            >
              <p className="text-xs uppercase tracking-[0.26em] text-gold-200/70">
                {locale === "ar" ? activeTier.labelAr : activeTier.labelFr}
              </p>
              <p className="mt-2 font-display text-5xl text-sand-50">
                {formatMadCurrency(activeTier.amountMad, locale)}
              </p>
              <p className="mt-4 text-sm leading-7 text-sand-100/72">
                {t("selectedDescription")}
              </p>
            </motion.div>
          </AnimatePresence>
          <div className="grid gap-3 rounded-[2rem] border border-white/8 bg-white/5 p-5 text-sm text-sand-100/72">
            <div className="flex items-center gap-3">
              <Check className="h-4 w-4 text-gold-300" />
              {t("benefit0")}
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-4 w-4 text-gold-300" />
              {t("benefit1")}
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-4 w-4 text-gold-300" />
              {t("benefit2")}
            </div>
          </div>
          <Button type="button" size="lg" onClick={handleSelectOffer}>
            <ArrowDownToLine className="me-2 h-4 w-4" />
            {t("cta")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
