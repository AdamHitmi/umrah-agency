"use client";

import {motion} from "framer-motion";
import Image from "next/image";
import {ArrowUpRight, CalendarDays, Clock3, MapPin} from "lucide-react";
import {useLocale, useTranslations} from "next-intl";
import {type CSSProperties, useState} from "react";

import {Badge} from "@/components/ui/badge";
import {buttonVariants} from "@/components/ui/button";
import {TiltPanel} from "@/components/motion/tilt-panel";
import {Card, CardContent} from "@/components/ui/card";
import {formatDisplayRange, formatMadCurrency} from "@/lib/format";
import {Link} from "@/lib/i18n/navigation";

type PackageCardProps = {
  slug: string;
  heroImage: string;
  titleAr: string;
  titleFr: string;
  shortDescriptionAr: string;
  shortDescriptionFr: string;
  startDate: Date;
  endDate: Date;
  durationDays: number;
  originCityAr: string;
  originCityFr: string;
  isDirectFlight: boolean;
  startingPrice: number;
};

export function PackageCard(props: PackageCardProps) {
  const locale = useLocale() as "ar" | "fr";
  const t = useTranslations();
  const [spotlight, setSpotlight] = useState({x: 50, y: 24});

  const title = locale === "ar" ? props.titleAr : props.titleFr;
  const description =
    locale === "ar" ? props.shortDescriptionAr : props.shortDescriptionFr;
  const origin = locale === "ar" ? props.originCityAr : props.originCityFr;
  const highlights = [
    props.isDirectFlight
      ? t("common.directFlight")
      : t("marketing.packageCard.flexibleProgram"),
    t("marketing.packageCard.umrahVisa"),
    t("marketing.packageCard.selectedAccommodation")
  ];

  return (
    <motion.div
      className="group three-d-shell"
      whileHover={{y: -8}}
      transition={{duration: 0.25}}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setSpotlight({
          x: ((event.clientX - bounds.left) / bounds.width) * 100,
          y: ((event.clientY - bounds.top) / bounds.height) * 100
        });
      }}
    >
      <TiltPanel
        className="rounded-[2rem]"
        glareClassName="rounded-[2rem]"
      >
        <Card
          className="group spotlight-card aurora-panel h-full border-gold-500/15"
          style={
            {
              "--spotlight-x": `${spotlight.x}%`,
              "--spotlight-y": `${spotlight.y}%`
            } as CSSProperties
          }
        >
        <div className="relative h-56 overflow-hidden rounded-t-[inherit]">
          <Image
            src={props.heroImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/45 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(247,237,208,0.2),transparent_42%)] opacity-70" />
          <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-3">
            {props.isDirectFlight ? <Badge>{t("common.directFlight")}</Badge> : <span />}
            <Badge variant="dark">
              {t("common.from")} {formatMadCurrency(props.startingPrice, locale)}
            </Badge>
          </div>
          <div className="absolute inset-x-4 bottom-4 space-y-3 sm:inset-x-5 sm:bottom-5">
            <div className="flex items-end justify-between gap-4">
              <div className="three-d-layer-soft rounded-full border border-white/10 bg-noir-950/65 px-4 py-2 text-xs uppercase tracking-[0.26em] text-gold-200/75 backdrop-blur-xl">
                {origin}
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sand-50 backdrop-blur-md transition-transform duration-300 group-hover:rotate-6 group-hover:bg-gold-500/15">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-noir-950/60 px-3 py-1 text-[11px] text-sand-100/80 backdrop-blur-xl"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <CardContent className="flex h-[calc(100%-14rem)] flex-col gap-4 p-5 sm:gap-5 sm:p-6">
          <div className="space-y-3">
            <h3 className="font-display text-xl text-sand-50 sm:text-2xl">{title}</h3>
            <p className="text-sm leading-7 text-sand-100/70">{description}</p>
          </div>
          <div className="grid gap-3 rounded-[1.75rem] border border-white/5 bg-white/5 p-4 text-sm text-sand-100/75">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-4 w-4 text-gold-300" />
              {formatDisplayRange(props.startDate, props.endDate, locale)}
            </div>
            <div className="flex items-center gap-3">
              <Clock3 className="h-4 w-4 text-gold-300" />
              {props.durationDays} {t("common.days")}
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-gold-300" />
              {origin}
            </div>
          </div>
          <div className="mt-auto flex items-center justify-between gap-4">
            <div className="text-xs uppercase tracking-[0.24em] text-gold-200/60">
              {props.isDirectFlight
                ? t("marketing.packageCard.premiumDirectDeparture")
                : t("marketing.packageCard.flexibleProgram")}
            </div>
            <Link href={`/packages/${props.slug}`} className={buttonVariants({variant: "default"})}>
              {t("common.viewDetails")}
            </Link>
          </div>
        </CardContent>
      </Card>
      </TiltPanel>
    </motion.div>
  );
}
