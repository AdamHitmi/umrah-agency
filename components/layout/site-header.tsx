"use client";

import {AnimatePresence, motion} from "framer-motion";
import {Menu, Phone, Sparkles, X} from "lucide-react";
import {useLocale, useTranslations} from "next-intl";
import {useEffect, useState} from "react";

import {LanguageSwitcher} from "@/components/layout/language-switcher";
import {Button, buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Link, usePathname} from "@/lib/i18n/navigation";

type SiteHeaderProps = {
  phone: string;
  whatsapp: string;
  agencyName: string;
};

export function SiteHeader({phone, whatsapp, agencyName}: SiteHeaderProps) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, {passive: true});

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navItems = [
    {href: "/", label: t("nav.home")},
    {href: "/packages", label: t("nav.packages")},
    {href: "/about", label: t("nav.about")},
    {href: "/faq", label: t("nav.faq")},
    {href: "/contact", label: t("nav.contact")}
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-gold-500/10 bg-noir-950/75 backdrop-blur-2xl transition-all duration-300",
        scrolled && "bg-noir-950/92 shadow-panel"
      )}
    >
      <div className="container flex h-[4.6rem] items-center justify-between gap-3 sm:h-20 sm:gap-4">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <div className="glow-pulse flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-gold-500/20 bg-gold-400/10 text-gold-200 transition-transform duration-300 group-hover:rotate-6 sm:h-12 sm:w-12">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-base text-sand-50 sm:text-xl">{agencyName}</p>
            <p className="truncate text-[10px] uppercase tracking-[0.24em] text-gold-200/70 sm:text-xs sm:tracking-[0.3em]">
              Umrah Travel
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative py-2 text-sm text-sand-100/85 hover:text-gold-200",
                pathname === item.href && "text-gold-100"
              )}
            >
              {item.label}
              {pathname === item.href ? (
                <motion.span
                  layoutId="active-nav-item"
                  className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent"
                />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <LanguageSwitcher />
          <a href={`tel:${phone}`} className={buttonVariants({variant: "ghost", size: "sm"})}>
            <Phone className={cn("h-4 w-4", locale === "ar" ? "ml-2" : "mr-2")} />
            {t("common.callNow")}
          </a>
          <a
            href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({variant: "default", size: "sm"})}
          >
            {t("common.whatsapp")}
          </a>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 rounded-full px-0"
            onClick={() => setOpen((current) => !current)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: "auto"}}
            exit={{opacity: 0, height: 0}}
            className="overflow-hidden border-t border-gold-500/10 bg-noir-950/97 xl:hidden"
          >
            <div className="container space-y-4 py-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-[1.35rem] border border-white/5 px-4 py-3 text-sm text-sand-100/85 hover:border-gold-400/25 hover:text-gold-200",
                      pathname === item.href && "border-gold-400/25 bg-gold-500/10 text-gold-100"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <a href={`tel:${phone}`} className={buttonVariants({variant: "secondary"})}>
                  {t("common.callNow")}
                </a>
                <a
                  href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({variant: "default"})}
                >
                  {t("common.whatsapp")}
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
