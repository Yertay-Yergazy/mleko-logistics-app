import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "orange" | "navy" | "ghost" | "outline";
type Size = "md" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  orange: "bg-orange text-white shadow-[0_8px_20px_rgba(243,133,43,.32)] hover:bg-orange-dark",
  navy: "bg-navy text-white hover:bg-navy-2",
  ghost: "bg-transparent text-white border border-white/50 hover:bg-white/10",
  outline: "bg-white text-navy border border-line hover:border-blue",
};

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-3 text-sm",
  sm: "px-4 py-2 text-xs",
};

export default function Button({
  variant = "orange",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-display font-bold whitespace-nowrap transition-colors cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
