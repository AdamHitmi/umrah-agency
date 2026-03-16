"use client";

import {AnimatePresence, motion, useScroll, useSpring} from "framer-motion";
import {ArrowUp} from "lucide-react";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

type SiteExperienceProps = {
  locale: string;
};

export function SiteExperience({locale}: SiteExperienceProps) {
  const pathname = usePathname();
  const {scrollYProgress} = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.18
  });
  const [showTopButton, setShowTopButton] = useState(false);
  const [pathPulseKey, setPathPulseKey] = useState(0);

  useEffect(() => {
    setPathPulseKey((current) => current + 1);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 560);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, {passive: true});

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-gold-400 via-sand-50 to-gold-300"
        style={{scaleX}}
      />
      <AnimatePresence>
        <motion.div
          key={pathPulseKey}
          initial={{opacity: 0.9, scaleX: 0}}
          animate={{opacity: 0, scaleX: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.8, ease: "easeOut"}}
          className="pointer-events-none fixed inset-x-0 top-0 z-50 h-24 origin-left bg-gradient-to-r from-gold-500/20 via-sand-50/12 to-transparent blur-2xl"
        />
      </AnimatePresence>
      <AnimatePresence>
        {showTopButton ? (
          <motion.div
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 16}}
            className={cn(
              "fixed bottom-24 z-40 sm:bottom-6",
              locale === "ar" ? "left-4 sm:left-6" : "left-4 sm:left-6"
            )}
          >
            <Button
              type="button"
              size="sm"
              className="h-11 w-11 rounded-full px-0"
              onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
              aria-label={locale === "ar" ? "العودة إلى الأعلى" : "Retour en haut"}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
