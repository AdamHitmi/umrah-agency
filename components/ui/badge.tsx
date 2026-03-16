import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        gold: "bg-gold-400/15 text-gold-200 ring-1 ring-inset ring-gold-300/25",
        sand: "bg-sand-50/10 text-sand-100 ring-1 ring-inset ring-sand-50/20",
        dark: "bg-noir-950/80 text-sand-100 ring-1 ring-inset ring-white/10"
      }
    },
    defaultVariants: {
      variant: "gold"
    }
  }
);

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({className, variant, ...props}: BadgeProps) {
  return <div className={cn(badgeVariants({variant}), className)} {...props} />;
}
