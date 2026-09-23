import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Slot } from "radix-ui";

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-medium tracking-[0.01em] whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_10px_30px_-12px_rgb(70_89_2/0.55)] hover:-translate-y-0.5 hover:bg-[#3a4a02] hover:shadow-[0_16px_36px_-14px_rgb(70_89_2/0.6)]",
        wine: "bg-wine text-cream shadow-[0_10px_30px_-12px_rgb(138_46_70/0.55)] hover:-translate-y-0.5 hover:bg-[#76263b]",
        cream:
          "bg-cream text-green-dark hover:-translate-y-0.5 hover:bg-white focus-visible:ring-cream/60 focus-visible:ring-offset-green-dark",
        outline: "border border-ink/15 bg-transparent text-ink hover:border-ink/30 hover:bg-ink/[0.03]",
        ghost: "text-ink hover:bg-ink/[0.04]",
        link: "rounded-none px-0 text-ink underline-offset-[6px] hover:underline",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[0.8rem]",
        lg: "h-14 px-8 text-[0.95rem]",
        icon: "size-11",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
