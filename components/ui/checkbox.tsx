import * as React from "react";

import {cn} from "@/lib/utils";

export function Checkbox({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border-gold-500/30 bg-noir-950 text-gold-400 focus:ring-gold-400/30",
        className
      )}
      {...props}
    />
  );
}
