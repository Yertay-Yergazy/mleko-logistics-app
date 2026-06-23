import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const fieldBase =
  "w-full rounded-xl border border-line bg-mist-2 text-sm text-ink placeholder:text-[#9aa6c8] focus:outline-none focus:border-blue";

export function Input({
  icon,
  className = "",
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { icon?: ReactNode }) {
  return (
    <div className={`flex h-[46px] items-center gap-2 rounded-xl border border-line bg-mist-2 px-3.5 ${className}`}>
      {icon && <span className="text-blue">{icon}</span>}
      <input className="h-full w-full bg-transparent text-sm text-ink placeholder:text-[#9aa6c8] focus:outline-none" {...rest} />
    </div>
  );
}

export function Textarea({ className = "", ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${fieldBase} min-h-[84px] px-3.5 py-3 ${className}`} {...rest} />;
}

export function Select({ className = "", children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={`${fieldBase} h-[46px] px-3.5 ${className}`} {...rest}>
      {children}
    </select>
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="mb-1.5 block font-display text-[11px] font-bold uppercase tracking-wide text-muted">
      {children}
    </label>
  );
}
