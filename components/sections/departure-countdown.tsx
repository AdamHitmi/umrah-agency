"use client";

import {motion} from "framer-motion";
import {CalendarClock} from "lucide-react";
import {useTranslations} from "next-intl";
import {useEffect, useMemo, useState} from "react";

type DepartureCountdownProps = {
  locale: "ar" | "fr";
  targetDate: string;
};

type CountdownUnit = {
  label: string;
  value: number;
};

function getRemainingUnits(
  targetDate: string,
  labels: {days: string; hours: string; minutes: string}
): CountdownUnit[] {
  const diff = Math.max(new Date(targetDate).getTime() - Date.now(), 0);
  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return [
    {label: labels.days, value: days},
    {label: labels.hours, value: hours},
    {label: labels.minutes, value: minutes}
  ];
}

export function DepartureCountdown({targetDate}: DepartureCountdownProps) {
  const t = useTranslations("marketing.countdown");
  const labels = useMemo(
    () => ({
      days: t("days"),
      hours: t("hours"),
      minutes: t("minutes")
    }),
    [t]
  );
  const [units, setUnits] = useState(() => getRemainingUnits(targetDate, labels));

  useEffect(() => {
    setUnits(getRemainingUnits(targetDate, labels));

    const interval = window.setInterval(() => {
      setUnits(getRemainingUnits(targetDate, labels));
    }, 60000);

    return () => window.clearInterval(interval);
  }, [labels, targetDate]);

  return (
    <div className="rounded-[2rem] border border-gold-500/15 bg-noir-950/55 p-5 backdrop-blur-xl">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-500/12 text-gold-200">
          <CalendarClock className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-gold-200/70">{t("title")}</p>
          <p className="text-sm text-sand-100/72">{t("description")}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {units.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: index * 0.06}}
            className="rounded-3xl border border-white/8 bg-white/5 p-4 text-center"
          >
            <p className="font-display text-3xl text-sand-50">{unit.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.26em] text-gold-200/70">
              {unit.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
