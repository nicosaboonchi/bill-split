import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "cursor-pointer rounded-md [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        action: "bg-blue-500 text-white hover:bg-blue-600",
        item: "bg-gray-500 text-white hover:bg-gray-600",
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
