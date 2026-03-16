"use client";

import {motion} from "framer-motion";
import {CircleDashed, PlaneTakeoff} from "lucide-react";
import {useTranslations} from "next-intl";
import {useEffect, useMemo, useState} from "react";

import {Badge} from "@/components/ui/badge";
import {TiltPanel} from "@/components/motion/tilt-panel";
import {Card, CardContent} from "@/components/ui/card";
import {cn} from "@/lib/utils";

type RouteVisualizationProps = {
  title: string;
  description: string;
  locale: string;
  destinations: Array<{
    id?: string;
    nameAr: string;
    nameFr: string;
    airportCode?: string | null;
  }>;
};

export function RouteVisualization({
  title,
  description,
  locale,
  destinations
}: RouteVisualizationProps) {
  const t = useTranslations("marketing.route");
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDestination = destinations[activeIndex];
  const activeName =
    locale === "ar" ? activeDestination.nameAr : activeDestination.nameFr;
  const progress =
    destinations.length > 1 ? (activeIndex / (destinations.length - 1)) * 100 : 100;
  const detailCopy = useMemo(
    () => [t("detail0"), t("detail1"), t("detail2"), t("detail3")],
    [t]
  );

  useEffect(() => {
    if (destinations.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % destinations.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [destinations.length]);

  return (
    <TiltPanel className="rounded-[2rem]" glareClassName="rounded-[2rem]">
    <Card className="overflow-hidden aurora-panel">
      <CardContent className="space-y-8">
        <div className="space-y-3">
          <Badge variant="sand">{title}</Badge>
          <p className="max-w-2xl text-sm leading-7 text-sand-100/70">{description}</p>
        </div>

        <div className="three-d-layer-soft rounded-[2rem] border border-gold-500/15 bg-noir-950/55 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.28em] text-gold-200/70">
                {t("progress")}
              </p>
              <p className="text-sm text-sand-50">
                {t("stepStatus", {current: activeIndex + 1, total: destinations.length})}
              </p>
            </div>
            <Badge>{activeName}</Badge>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-gold-300 via-sand-50 to-gold-400"
              animate={{width: `${Math.max(progress, 10)}%`}}
              transition={{duration: 0.45, ease: "easeOut"}}
            />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="grid gap-3 sm:gap-4">
            {destinations.map((destination, index) => {
              const name = locale === "ar" ? destination.nameAr : destination.nameFr;
              const active = index === activeIndex;

              return (
                <button
                  key={`${name}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="text-start"
                >
                  <div
                    className={cn(
                      "spotlight-card rounded-[1.75rem] border p-4 transition-all duration-300 sm:p-4",
                      active
                        ? "border-gold-300/35 bg-gold-500/10 shadow-glow"
                        : "border-gold-500/15 bg-noir-950/55 hover:border-gold-300/25 hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-2xl border text-gold-200",
                          active
                            ? "border-gold-300/30 bg-gold-400/15"
                            : "border-white/10 bg-white/5"
                        )}
                      >
                        {active ? (
                          <PlaneTakeoff className="h-5 w-5" />
                        ) : (
                          <CircleDashed className="h-5 w-5" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm text-sand-50">{name}</p>
                          <span className="text-[10px] uppercase tracking-[0.28em] text-gold-200/55">
                            {t("stopLabel", {index: index + 1})}
                          </span>
                        </div>
                        {destination.airportCode ? (
                          <p className="mt-1 text-xs uppercase tracking-[0.28em] text-gold-200/65">
                            {destination.airportCode}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <motion.div
            key={activeIndex}
            initial={{opacity: 0, y: 18}}
            animate={{opacity: 1, y: 0}}
            className="rounded-[2rem] border border-gold-500/15 bg-noir-950/65 p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-center gap-3">
              <Badge>{activeName}</Badge>
              {activeDestination.airportCode ? (
                <Badge variant="dark">{activeDestination.airportCode}</Badge>
              ) : null}
            </div>
            <p className="mt-4 text-sm leading-7 text-sand-100/75">
              {detailCopy[activeIndex] ?? description}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/8 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.26em] text-gold-200/70">
                  {t("step")}
                </p>
                <p className="mt-2 font-display text-3xl text-sand-50">{activeIndex + 1}</p>
              </div>
              <div className="rounded-3xl border border-white/8 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.26em] text-gold-200/70">
                  {t("stops")}
                </p>
                <p className="mt-2 font-display text-3xl text-sand-50">{destinations.length}</p>
              </div>
              <div className="rounded-3xl border border-white/8 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.26em] text-gold-200/70">
                  {t("code")}
                </p>
                <p className="mt-2 font-display text-3xl text-sand-50">
                  {activeDestination.airportCode ?? "--"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
    </TiltPanel>
  );
}
