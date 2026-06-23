import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CabinetTopbar from "../../components/organisms/CabinetTopbar";
import StatCard from "../../components/molecules/StatCard";
import RequestsTable from "../../components/organisms/RequestsTable";
import DetailPanel from "../../components/organisms/DetailPanel";
import { getCabinetRequests, getCabinetStats, getRequestDetail, getRequestFilters } from "../../api/cabinetApi";
import type { CabinetRequest, CabinetRequestDetail, CabinetStat, CabinetUser } from "../../api/types";

export default function CabinetDashboardPage() {
  const { user } = useOutletContext<{ user: CabinetUser }>();
  const [stats, setStats] = useState<CabinetStat[]>([]);
  const [requests, setRequests] = useState<CabinetRequest[]>([]);
  const [filters, setFilters] = useState<{ id: string; label: string }[]>([]);
  const [selectedId, setSelectedId] = useState<string>();
  const [detail, setDetail] = useState<CabinetRequestDetail>();

  useEffect(() => {
    getCabinetStats().then(setStats);
    getRequestFilters().then((f) => setFilters([...f]));
    getCabinetRequests().then((reqs) => {
      setRequests(reqs);
      setSelectedId(reqs[0]?.id);
    });
  }, []);

  useEffect(() => {
    if (selectedId) getRequestDetail(selectedId).then(setDetail);
  }, [selectedId]);

  return (
    <>
      <CabinetTopbar title="Мои заявки" user={user} />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col gap-4.5 overflow-hidden p-6">
          <div className="grid flex-none grid-cols-2 gap-3.5 lg:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.id} stat={s} />
            ))}
          </div>
          <RequestsTable requests={requests} filters={filters} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        {detail && <DetailPanel detail={detail} />}
      </div>
    </>
  );
}
