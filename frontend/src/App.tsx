import { Route, Routes } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import CabinetLayout from "./layouts/CabinetLayout";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import InternationalPage from "./pages/InternationalPage";
import DomesticPage from "./pages/DomesticPage";
import AdditionalServicesPage from "./pages/AdditionalServicesPage";
import CalculatorPage from "./pages/CalculatorPage";
import BookingDetailPage from "./pages/BookingDetailPage";
import CabinetDashboardPage from "./pages/cabinet/CabinetDashboardPage";
import CabinetActiveShipmentsPage from "./pages/cabinet/CabinetActiveShipmentsPage";
import CabinetDocumentsPage from "./pages/cabinet/CabinetDocumentsPage";
import CabinetProfilePage from "./pages/cabinet/CabinetProfilePage";
import CabinetSettingsPage from "./pages/cabinet/CabinetSettingsPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="uslugi" element={<CatalogPage />} />
        <Route path="uslugi/dopolnitelnye" element={<AdditionalServicesPage />} />
        <Route path="mezhdunarodnye" element={<InternationalPage />} />
        <Route path="vnutri-kz" element={<DomesticPage />} />
        <Route path="raschet" element={<CalculatorPage />} />
        <Route path="bron/:id" element={<BookingDetailPage />} />
      </Route>

      <Route path="cabinet" element={<CabinetLayout />}>
        <Route index element={<CabinetDashboardPage />} />
        <Route path="active-shipments" element={<CabinetActiveShipmentsPage />} />
        <Route path="documents" element={<CabinetDocumentsPage />} />
        <Route path="profile" element={<CabinetProfilePage />} />
        <Route path="settings" element={<CabinetSettingsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
