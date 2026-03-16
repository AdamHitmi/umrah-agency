"use client";

import {AnimatePresence, motion} from "framer-motion";
import {ChevronUp, MessageCircleMore, PhoneCall, Sparkles} from "lucide-react";
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";

import {buttonVariants} from "@/components/ui/button";
import {Link} from "@/lib/i18n/navigation";
import {cn} from "@/lib/utils";

type FloatingContactDockProps = {
  phone: string;
  whatsapp: string;
};

export function FloatingContactDock({
  phone,
  whatsapp
}: FloatingContactDockProps) {
  const t = useTranslations();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const syncExpandedState = () => {
      setExpanded(window.innerWidth >= 640);
    };

    syncExpandedState();
    window.addEventListener("resize", syncExpandedState);

    return () => window.removeEventListener("resize", syncExpandedState);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-3 sm:bottom-4 sm:px-4 sm:pb-0 sm:justify-end">
      <div className="pointer-events-auto">
        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              key="expanded"
              initial={{opacity: 0, y: 14, scale: 0.96}}
              animate={{opacity: 1, y: 0, scale: 1}}
              exit={{opacity: 0, y: 14, scale: 0.96}}
              className="mobile-bottom-safe flex w-full max-w-[calc(100vw-1.5rem)] flex-col gap-2 rounded-[1.75rem] border border-gold-500/20 bg-noir-950/90 p-2 shadow-panel backdrop-blur-2xl sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:rounded-full"
            >
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="flex h-10 w-10 items-center justify-center self-end rounded-full border border-white/10 bg-white/5 text-sand-50 transition-colors hover:bg-white/10 sm:hidden"
                aria-label="Toggle actions"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <a
                href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({variant: "default", size: "sm"}), "w-full sm:w-auto")}
              >
                <MessageCircleMore className="me-2 h-4 w-4" />
                {t("common.whatsapp")}
              </a>
              <a
                href={`tel:${phone}`}
                className={cn(buttonVariants({variant: "secondary", size: "sm"}), "w-full sm:w-auto")}
              >
                <PhoneCall className="me-2 h-4 w-4" />
                {t("common.callNow")}
              </a>
              <Link
                href="/packages/omra-janvier"
                className={cn(buttonVariants({variant: "ghost", size: "sm"}), "w-full sm:w-auto")}
              >
                {t("common.bookNow")}
              </Link>
            </motion.div>
          ) : (
            <motion.button
              key="collapsed"
              type="button"
              initial={{opacity: 0, y: 14, scale: 0.96}}
              animate={{opacity: 1, y: 0, scale: 1}}
              exit={{opacity: 0, y: 14, scale: 0.96}}
              onClick={() => setExpanded(true)}
              className={cn(
                "mobile-bottom-safe flex w-full max-w-[calc(100vw-1.5rem)] items-center gap-3 rounded-[1.6rem] border border-gold-500/20 bg-noir-950/90 px-4 py-3 shadow-panel backdrop-blur-2xl sm:w-auto sm:max-w-none sm:rounded-full",
                "hover:border-gold-300/35"
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/15 text-gold-200">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="text-start">
                <p className="text-xs uppercase tracking-[0.24em] text-gold-200/65">
                  {t("common.bookNow")}
                </p>
                <p className="text-sm text-sand-50">
                  {t("common.whatsapp")} / {t("common.callNow")}
                </p>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
