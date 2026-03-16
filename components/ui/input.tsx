import * as React from "react";

import {cn} from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({className, ...props}, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-2xl border border-gold-500/15 bg-noir-950/70 px-4 py-2 text-sm text-sand-50 outline-none ring-offset-background placeholder:text-sand-200/45 focus:border-gold-400/40 focus:ring-2 focus:ring-gold-400/20",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
