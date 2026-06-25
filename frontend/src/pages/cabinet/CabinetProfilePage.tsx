import { useOutletContext } from "react-router-dom";
import CabinetTopbar from "../../components/organisms/CabinetTopbar";
import { FieldLabel, Input } from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import type { CabinetUser } from "../../api/types";

export default function CabinetProfilePage() {
  const { user } = useOutletContext<{ user: CabinetUser }>();
  return (
    <>
      <CabinetTopbar title="Профиль" user={user} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-xl rounded-2xl border border-line bg-white p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange font-bold text-white">
              {user.initials}
            </span>
            <div>
              <div className="font-display font-bold text-navy">
                {user.name}
              </div>
              <div className="text-sm text-muted">{user.company}</div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Имя</FieldLabel>
              <Input defaultValue={user.name} />
            </div>
            <div>
              <FieldLabel>Компания</FieldLabel>
              <Input defaultValue={user.company} />
            </div>
            <div>
              <FieldLabel>E-mail</FieldLabel>
              <Input defaultValue="byte083@gmail.com" />
            </div>
            <div>
              <FieldLabel>Телефон</FieldLabel>
              <Input defaultValue="+7 708 936 6852" />
            </div>
          </div>
          <Button className="mt-5">Сохранить изменения</Button>
        </div>
      </div>
    </>
  );
}
