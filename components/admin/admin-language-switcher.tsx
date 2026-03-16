"use client";

import {usePathname, useSearchParams} from "next/navigation";

import {buttonVariants} from "@/components/ui/button";
import {useAdminI18n} from "@/components/admin/admin-locale-provider";
import {cn} from "@/lib/utils";

function buildRedirectPath(pathname: string, search: string) {
  if (!search) {
    return pathname;
  }

  return `${pathname}?${search}`;
}

export function AdminLanguageSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {locale, dictionary} = useAdminI18n();
  const search = searchParams.toString();
  const redirectTo = encodeURIComponent(buildRedirectPath(pathname, search));

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-gold-500/20 bg-noir-950/70 p-1"
      aria-label={dictionary.switcher.ariaLabel}
    >
      {(["ar", "fr"] as const).map((item) => (
        <a
          key={item}
          href={`/api/admin/locale?locale=${item}&redirectTo=${redirectTo}`}
          className={cn(
            buttonVariants({
              variant: item === locale ? "default" : "ghost",
              size: "sm"
            }),
            "min-w-12 px-3 text-xs",
            item !== locale && "text-sand-50"
          )}
        >
          {item === "ar" ? dictionary.switcher.arabic : dictionary.switcher.french}
        </a>
      ))}
    </div>
  );
}
