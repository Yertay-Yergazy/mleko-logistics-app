import { Link } from "react-router-dom";
import Button from "../components/atoms/Button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-mist-2 px-6 text-center">
      <div className="font-display text-6xl font-black italic text-navy">404</div>
      <p className="text-muted">Страница не найдена.</p>
      <Link to="/">
        <Button>На главную</Button>
      </Link>
    </div>
  );
}
