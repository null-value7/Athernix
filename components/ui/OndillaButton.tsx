import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "font-mono-label btn-shine inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-brand-red via-brand-orange to-brand-gold text-black shadow-[0_8px_30px_rgba(255,43,58,0.35)] hover:shadow-[0_10px_45px_rgba(255,107,53,0.55)] hover:-translate-y-0.5",
        outline:
          "border border-white/20 text-white bg-white/[0.03] hover:border-brand-orange/70 hover:bg-brand-orange/10 hover:shadow-[0_6px_25px_rgba(255,107,53,0.2)]",
        ghost: "text-white/70 hover:text-white",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-9 px-4 text-[10px]",
        lg: "h-14 px-8 text-xs",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
