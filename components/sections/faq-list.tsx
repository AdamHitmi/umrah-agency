"use client";

import {AnimatePresence, motion} from "framer-motion";
import {Minus, Plus} from "lucide-react";
import {useLocale} from "next-intl";
import {useState} from "react";

import {Card, CardContent} from "@/components/ui/card";

type FaqItem = {
  id: string;
  questionAr: string;
  questionFr: string;
  answerAr: string;
  answerFr: string;
};

export function FaqList({items}: {items: FaqItem[]}) {
  const locale = useLocale();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent>
            <button
              type="button"
              onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}
              className="flex w-full items-center justify-between gap-4 text-start"
            >
              <span className="text-lg font-medium text-sand-50">
                {locale === "ar" ? item.questionAr : item.questionFr}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-200">
                {openId === item.id ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {openId === item.id ? (
                <motion.div
                  initial={{height: 0, opacity: 0}}
                  animate={{height: "auto", opacity: 1}}
                  exit={{height: 0, opacity: 0}}
                  className="overflow-hidden"
                >
                  <p className="mt-4 text-sm leading-7 text-sand-100/70">
                    {locale === "ar" ? item.answerAr : item.answerFr}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
