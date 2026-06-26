import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CabinetTopbar from "../../components/organisms/CabinetTopbar";
import RequestsTable from "../../components/organisms/RequestsTable";
import DetailPanel from "../../components/organisms/DetailPanel";
import { getCabinetRequests, getRequestDetail, getRequestFilters, getRequestStatusOptions } from "../../api/cabinetApi";
import type { CabinetRequest, CabinetRequestDetail, CabinetUser, RequestStatusOption } from "../../api/types";

export default function CabinetActiveShipmentsPage() {
  const { user } = useOutletContext<{ user: CabinetUser }>();
  const [requests, setRequests] = useState<CabinetRequest[]>([]);
  const [filters, setFilters] = useState<{ id: string; label: string }[]>([]);
  const [statusOptions, setStatusOptions] = useState<RequestStatusOption[]>([]);
  const [selectedId, setSelectedId] = useState<string>();
  const [detail, setDetail] = useState<CabinetRequestDetail>();

  function refresh() {
    getCabinetRequests().then((reqs) => {
      const active = reqs.filter((r) => r.statusLabel !== "Доставлен");
      setRequests(active);
      setSelectedId((current) => current ?? active[0]?.id);
    });
  }

  useEffect(() => {
    getRequestFilters().then((f) => setFilters([...f]));
    getRequestStatusOptions().then(setStatusOptions);
    refresh();
  }, []);

  useEffect(() => {
    if (selectedId) getRequestDetail(selectedId).then(setDetail);
  }, [selectedId]);

  function handleStatusChange() {
    refresh();
    if (selectedId) getRequestDetail(selectedId).then(setDetail);
  }

  return (
    <>
      <CabinetTopbar title="Активные грузы" user={user} />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-hidden p-6">
          <RequestsTable requests={requests} filters={filters} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        {detail && (
          <DetailPanel detail={detail} statusOptions={statusOptions} onStatusChange={handleStatusChange} />
        )}
      </div>
    </>
  );
}
