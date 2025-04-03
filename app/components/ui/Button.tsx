import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "default" | "primary" | "danger" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  default: "bg-gray-800 hover:bg-gray-900 text-white",
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  ghost: "bg-transparent hover:bg-gray-200 text-gray-800",
  link: "text-blue-600 hover:underline",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "rounded-full font-semibold transition-all",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
