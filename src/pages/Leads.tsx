import { useState } from "react";
import SidebarLayout from "../layouts/SidebarLayout";
import { useLeadListQuery } from "../services/Service";
import LeadColumn from "./LeadColumn";
import { LuUser } from "react-icons/lu";
import NewLeadModal from "../components/NewLeadModal";

// Lead tipini barcha joylarda bir xil qilib qo'yamiz
type Lead = {
  id: number;
  phone: string;
  lesson_type_display?: string;
  source_display?: string;
  created_at: string;
  lesson_time?: string;
  status_display: string;
};

export default function Leads() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const { data, isLoading } = useLeadListQuery({});

  const handleNewLead = () => setIsModalOpen(true);
  const handleConfirm = () => {
    setIsModalOpen(false);
    setConfirmModal(true);
    setTimeout(() => setConfirmModal(false), 2000);
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  const leadsByStatus: { [key: string]: Lead[] } = {
    "New Leads": [],
    Contacted: [],
    "Trial Lesson": [],
    Summary: [],
  };

  data?.results?.forEach((lead: Lead) => {
    if (leadsByStatus[lead.status_display]) {
      leadsByStatus[lead.status_display].push(lead);
    }
  });

  return (
    <SidebarLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Board of Leads</h1>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={handleNewLead}
        >
          <LuUser size={18} />
          <span>New lead</span>
        </button>
      </div>

      <div className="grid bg-white rounded-lg p-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(leadsByStatus).map(([status, leads]) => (
          <LeadColumn key={status} title={status} leads={leads} />
        ))}
      </div>

      <NewLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </SidebarLayout>
  );
}
