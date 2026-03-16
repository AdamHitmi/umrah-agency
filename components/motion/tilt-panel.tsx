"use client";

import {motion, useReducedMotion} from "framer-motion";
import {ReactNode, useState} from "react";

import {cn} from "@/lib/utils";

type TiltPanelProps = {
  children: ReactNode;
  className?: string;
  glareClassName?: string;
  disabled?: boolean;
};

export function TiltPanel({
  children,
  className,
  glareClassName,
  disabled = false
}: TiltPanelProps) {
  const prefersReducedMotion = useReducedMotion();
  const [tilt, setTilt] = useState({rotateX: 0, rotateY: 0, glareX: 50, glareY: 50});
  const isDisabled = disabled || prefersReducedMotion;

  return (
    <motion.div
      className={cn("relative [transform-style:preserve-3d]", className)}
      onPointerMove={(event) => {
        if (isDisabled) {
          return;
        }

        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;

        setTilt({
          rotateX: (0.5 - y) * 10,
          rotateY: (x - 0.5) * 14,
          glareX: x * 100,
          glareY: y * 100
        });
      }}
      onPointerLeave={() => {
        setTilt({rotateX: 0, rotateY: 0, glareX: 50, glareY: 50});
      }}
      animate={
        isDisabled
          ? {rotateX: 0, rotateY: 0, y: 0}
          : {rotateX: tilt.rotateX, rotateY: tilt.rotateY, y: -2}
      }
      transition={{type: "spring", stiffness: 180, damping: 18, mass: 0.8}}
      style={{transformPerspective: 1600}}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          glareClassName
        )}
        style={{
          background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(247,237,208,0.18), transparent 32%)`
        }}
      />
      <div className="relative z-[1] [transform:translateZ(0)]">{children}</div>
    </motion.div>
  );
}
