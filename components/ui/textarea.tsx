import * as React from "react";

import {cn} from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({className, ...props}, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-[120px] w-full rounded-2xl border border-gold-500/15 bg-noir-950/70 px-4 py-3 text-sm text-sand-50 outline-none placeholder:text-sand-200/45 focus:border-gold-400/40 focus:ring-2 focus:ring-gold-400/20",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
