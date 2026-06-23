import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CabinetTopbar from "../../components/organisms/CabinetTopbar";
import Icon from "../../components/atoms/Icon";
import { getCabinetRequests, getRequestDetail } from "../../api/cabinetApi";
import type { CabinetUser, ShipmentDocument } from "../../api/types";

interface DocumentRow extends ShipmentDocument {
  requestId: string;
}

export default function CabinetDocumentsPage() {
  const { user } = useOutletContext<{ user: CabinetUser }>();
  const [documents, setDocuments] = useState<DocumentRow[]>([]);

  useEffect(() => {
    getCabinetRequests().then(async (requests) => {
      const details = await Promise.all(requests.map((r) => getRequestDetail(r.id)));
      setDocuments(
        details.flatMap((detail) =>
          detail ? detail.documents.map((doc) => ({ ...doc, requestId: detail.id })) : [],
        ),
      );
    });
  }, []);

  return (
    <>
      <CabinetTopbar title="Документы" user={user} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col gap-2 rounded-2xl border border-line bg-white p-2">
          {documents.map((doc, i) => (
            <div
              key={`${doc.requestId}-${i}`}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm ${
                doc.status === "needs-signature" ? "bg-[#fff8f4]" : ""
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Icon name="document" size={16} className="text-blue" />
                {doc.name}
                <span className="font-mono text-xs text-muted">{doc.requestId}</span>
              </span>
              <span className={`font-bold text-xs ${doc.status === "ready" ? "text-ok" : "text-orange"}`}>
                {doc.status === "ready" ? "✓ готов" : "⚡ нужна подпись"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
