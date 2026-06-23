import { useOutletContext } from "react-router-dom";
import CabinetTopbar from "../../components/organisms/CabinetTopbar";
import Checkbox from "../../components/atoms/Checkbox";
import { useState } from "react";
import type { CabinetUser } from "../../api/types";

export default function CabinetSettingsPage() {
  const { user } = useOutletContext<{ user: CabinetUser }>();
  const [emailNotify, setEmailNotify] = useState(true);
  const [whatsappNotify, setWhatsappNotify] = useState(true);

  return (
    <>
      <CabinetTopbar title="Настройки" user={user} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-xl rounded-2xl border border-line bg-white p-6">
          <h3 className="font-display text-sm font-bold text-navy">Уведомления о статусе груза</h3>
          <div className="mt-4 flex flex-col gap-3">
            <Checkbox checked={emailNotify} onChange={setEmailNotify} label="Уведомлять на e-mail" />
            <Checkbox checked={whatsappNotify} onChange={setWhatsappNotify} label="Уведомлять в WhatsApp" />
          </div>
        </div>
      </div>
    </>
  );
}
