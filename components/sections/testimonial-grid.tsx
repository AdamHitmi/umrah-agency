"use client";

import {AnimatePresence, motion} from "framer-motion";
import {ChevronLeft, ChevronRight, Quote, Star} from "lucide-react";
import {useLocale} from "next-intl";
import {useEffect, useState} from "react";

import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {cn} from "@/lib/utils";

type TestimonialItem = {
  id: string;
  name: string;
  city: string;
  rating: number;
  contentAr: string;
  contentFr: string;
};

export function TestimonialGrid({items}: {items: TestimonialItem[]}) {
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (items.length < 2 || paused) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [items.length, paused]);

  const activeItem = items[activeIndex];

  if (!activeItem) {
    return null;
  }

  return (
    <div
      className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Card className="min-h-[320px]">
        <CardContent className="relative flex h-full flex-col justify-between gap-8">
          <div className="pointer-events-none absolute end-6 top-6 text-gold-300/15">
            <Quote className="h-20 w-20" />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -10}}
              transition={{duration: 0.35}}
              className="space-y-6"
            >
              <div className="flex items-center gap-1 text-gold-300">
                {Array.from({length: activeItem.rating}).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="max-w-2xl font-display text-3xl leading-relaxed text-sand-50">
                "{locale === "ar" ? activeItem.contentAr : activeItem.contentFr}"
              </p>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center gap-2">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group"
                aria-label={item.name}
              >
                <div className="h-1.5 w-8 overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-gold-300 via-sand-50 to-gold-400"
                    animate={{width: index === activeIndex ? "100%" : "40%"}}
                    transition={{duration: 0.25}}
                  />
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-medium text-sand-50">{activeItem.name}</p>
              <p className="text-xs uppercase tracking-[0.24em] text-gold-200/70">
                {activeItem.city}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() =>
                  setActiveIndex((current) => (current - 1 + items.length) % items.length)
                }
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setActiveIndex((current) => (current + 1) % items.length)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="text-start"
          >
            <Card
              className={cn(
                "spotlight-card h-full",
                index === activeIndex
                  ? "border-gold-300/35 bg-gold-500/10"
                  : "hover:bg-white/5"
              )}
            >
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-sand-50">{item.name}</p>
                  <div className="flex items-center gap-1 text-gold-300">
                    {Array.from({length: item.rating}).map((_, ratingIndex) => (
                      <Star key={ratingIndex} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="line-clamp-3 text-sm leading-7 text-sand-100/70">
                  {locale === "ar" ? item.contentAr : item.contentFr}
                </p>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}
