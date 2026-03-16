import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0 bg-rose-900 hover:bg-rose-900/80 disabled:hover:bg-rose-900",
  {
    variants: {
      variant: {
        action: "text-white hover:bg-red-500 rounded-md",
        destructive: "bg-red-500 text-white hover:bg-red-600",
      },
      size: {
        sm: "h-8 px-3 has-[>svg]:px-2.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "action",
      size: "sm",
    },
  },
);

export function Button({
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return <button className={buttonVariants({ variant, size })} {...props} />;
}
