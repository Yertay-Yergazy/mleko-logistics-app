import { Outlet } from "react-router-dom";
import TopNav from "../components/organisms/TopNav";
import Footer from "../components/organisms/Footer";
import WhatsAppButton from "../components/molecules/WhatsAppButton";

export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
