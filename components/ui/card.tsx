import * as React from "react";

import {cn} from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "shine-border relative overflow-hidden rounded-3xl border border-gold-500/15 bg-noir-900/70 shadow-panel backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/25 hover:shadow-glow",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 sm:p-8", className)} {...props} />;
}
