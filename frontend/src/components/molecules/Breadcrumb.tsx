import { Link } from "react-router-dom";

export default function Breadcrumb({ current }: { current: string }) {
  return (
    <div className="text-sm text-muted">
      <Link to="/" className="hover:text-blue">
        Главная
      </Link>
      <span className="px-1.5">/</span>
      <span className="font-semibold text-navy">{current}</span>
    </div>
  );
}
