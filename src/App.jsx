import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import DashboardHeader from "./components/layout/DashboardHeader";
import InvoiceCard from "./components/invoice/InvoiceCard";
import InvoiceForm from "./components/invoice/InvoiceForm";
import EmptyState from "./components/dashboard/EmptyState";
import InvoiceDetails from "./pages/InvoiceDetails";
import { useInvoices } from "./hooks/useInvoices";

const Dashboard = () => {
  const { invoices } = useInvoices();
  const [filter, setFilter] = useState(null);

  const filteredInvoices = invoices?.filter((invoice) => {
    if (!filter) return true;
    return invoice.status === filter;
  });

  return (
    <div className="w-[730px] pt-[72px]">
      {/* DashboardHeader will now inherit text color automatically */}
      <DashboardHeader
        setFilter={setFilter}
        count={filteredInvoices?.length || 0}
      />

      <div className="flex flex-col gap-4 mt-16 pb-12">
        {filteredInvoices && filteredInvoices.length > 0 ? (
          filteredInvoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    /* Use the variable-based background and transition */
    <div className="flex min-h-screen bg-[var(--app-bg)] text-[var(--text-main)] transition-colors duration-300 font-spartan">
      <Sidebar />
      <main className="flex-1 flex justify-center">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/invoice/:id" element={<InvoiceDetails />} />
        </Routes>
      </main>
      <InvoiceForm />
    </div>
  );
}

export default App;
