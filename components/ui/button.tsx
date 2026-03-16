import * as React from "react";
import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "@/lib/utils";

export const buttonVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 disabled:pointer-events-none disabled:opacity-50 before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:-skew-x-12 before:bg-white/10 before:opacity-0 before:transition-all before:duration-500 hover:before:left-[115%] hover:before:opacity-100",
  {
    variants: {
      variant: {
        default:
          "bg-gold-400 text-noir-950 shadow-glow hover:-translate-y-0.5 hover:bg-gold-300",
        secondary:
          "border border-gold-400/30 bg-noir-900/70 text-sand-50 hover:-translate-y-0.5 hover:border-gold-300/60 hover:bg-noir-800",
        ghost: "text-sand-50 hover:bg-white/5",
        outline:
          "border border-gold-400/30 bg-transparent text-sand-50 hover:-translate-y-0.5 hover:border-gold-300 hover:bg-gold-500/10",
        destructive: "bg-red-600 text-white hover:bg-red-500"
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-6 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, ...props}, ref) => (
    <button
      className={cn(buttonVariants({variant, size}), className)}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export {Button};
