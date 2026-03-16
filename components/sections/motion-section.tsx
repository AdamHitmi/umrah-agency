"use client";

import {motion, useReducedMotion} from "framer-motion";
import {ReactNode, useEffect, useState} from "react";

type MotionSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function MotionSection({
  children,
  className,
  delay = 0
}: MotionSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <motion.section
      className={className}
      initial={false}
      animate={
        prefersReducedMotion || !ready
          ? {opacity: 1, y: 0, filter: "blur(0px)"}
          : undefined
      }
      whileInView={
        prefersReducedMotion || !ready
          ? undefined
          : {opacity: 1, y: 0, filter: "blur(0px)"}
      }
      viewport={{once: true, amount: 0.2}}
      style={{opacity: 1}}
      transition={{duration: 0.7, delay, ease: [0.22, 1, 0.36, 1]}}
    >
      {children}
    </motion.section>
  );
}
