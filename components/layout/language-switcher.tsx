"use client";

import {Globe} from "lucide-react";
import {useLocale, useTranslations} from "next-intl";
import {useSearchParams} from "next/navigation";

import {buttonVariants} from "@/components/ui/button";
import {Link, usePathname} from "@/lib/i18n/navigation";
import {cn} from "@/lib/utils";

function buildHref(pathname: string, search: string) {
  return search ? `${pathname}?${search}` : pathname;
}

export function LanguageSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale() as "ar" | "fr";
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const href = buildHref(pathname, search);

  return (
    <div className="flex items-center gap-2 rounded-full border border-gold-500/20 bg-noir-950/70 px-2 py-1.5 shadow-[0_14px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-400/12 text-gold-200">
        <Globe className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-1 rounded-full border border-white/8 bg-white/5 p-1">
        {(["ar", "fr"] as const).map((item) => {
          const isActive = item === locale;

          return (
            <Link
              key={item}
              href={href}
              locale={item}
              aria-label={`${t("language")} ${item}`}
              className={cn(
                buttonVariants({
                  variant: isActive ? "default" : "ghost",
                  size: "sm"
                }),
                "h-8 min-w-12 rounded-full px-3 text-xs",
                !isActive && "text-sand-50 hover:bg-white/8"
              )}
              prefetch={false}
            >
              {item.toUpperCase()}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
