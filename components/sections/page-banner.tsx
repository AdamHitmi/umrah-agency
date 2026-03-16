import {useTranslations} from "next-intl";
import {Compass, Sparkles} from "lucide-react";

import {Badge} from "@/components/ui/badge";

type PageBannerProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageBanner({eyebrow, title, description}: PageBannerProps) {
  const t = useTranslations("marketing.banner");

  return (
    <section className="container py-16 sm:py-20">
      <div className="aurora-panel relative overflow-hidden rounded-[2rem] border border-gold-500/15 bg-gradient-to-br from-noir-900 via-noir-950 to-noir-800 px-6 py-12 shadow-panel sm:px-10 sm:py-16">
        <div className="floating-orb absolute -top-10 end-0 h-40 w-40 rounded-full bg-gold-500/12 blur-3xl" />
        <div className="float-slow absolute -bottom-12 start-0 h-48 w-48 rounded-full bg-sand-50/8 blur-3xl" />
        <div className="absolute end-6 top-6 flex h-20 w-20 items-center justify-center rounded-full border border-gold-500/15 bg-gold-500/10 text-gold-200/50">
          <Compass className="h-8 w-8" />
        </div>
        <div className="grid-accent absolute inset-0 opacity-30" />
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            {eyebrow ? <Badge variant="gold">{eyebrow}</Badge> : null}
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-gold-200/70">
              <Sparkles className="h-3.5 w-3.5" />
              {t("premiumJourney")}
            </span>
          </div>
          <h1 className="text-balance font-display text-4xl text-sand-50 sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-sand-100/75 sm:text-base">
            {description}
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/8 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.24em] text-gold-200/65">{t("morocco")}</p>
              <p className="mt-1 text-sm text-sand-50">{t("casablancaSupport")}</p>
            </div>
            <div className="rounded-3xl border border-white/8 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.24em] text-gold-200/65">{t("spiritual")}</p>
              <p className="mt-1 text-sm text-sand-50">{t("comfortPlanning")}</p>
            </div>
            <div className="rounded-3xl border border-white/8 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.24em] text-gold-200/65">{t("luxury")}</p>
              <p className="mt-1 text-sm text-sand-50">{t("elegantDetails")}</p>
            </div>
          </div>
          <div className="luxury-divider max-w-xl" />
        </div>
      </div>
    </section>
  );
}
