import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const InvoiceCard = ({ invoice }) => {
  const statusConfig = {
    paid: {
      bg: "bg-[#33D69F]/10",
      text: "text-[#33D69F]",
      dot: "bg-[#33D69F]",
    },
    pending: {
      bg: "bg-[#FF8F00]/10",
      text: "text-[#FF8F00]",
      dot: "bg-[#FF8F00]",
    },
    draft: {
      bg: "bg-gray-200/10 dark:bg-[#DFE3FA]/5",
      text: "text-dynamic-secondary",
      dot: "bg-dynamic-secondary",
    },
  };

  const { bg, text, dot } = statusConfig[invoice.status] || statusConfig.draft;

  return (
    <Link to={`/invoice/${invoice.id}`} className="block mb-4">
      <div className="invoice-card-style p-6 md:p-4 w-full cursor-pointer border border-transparent hover:border-purple-500 transition-all group shadow-sm">
        {/* --- MOBILE LAYOUT (Grid) --- */}
        {/* This container defines the layout on mobile and changes on desktop */}
        <div className="grid grid-cols-2 md:flex md:items-center md:justify-between gap-y-4 md:gap-0">
          {/* 1. ID & Client Name (Top Row on Mobile) */}
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-10">
            <span className="font-bold text-[13px] tracking-tight">
              <span className="text-gray-400">#</span>
              {invoice.id}
            </span>
            <span className="text-dynamic-secondary text-[13px] md:text-[var(--text-main)] md:w-[120px] md:truncate">
              {invoice.clientName}
            </span>
          </div>

          {/* 2. Due Date (Bottom Left on Mobile) */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-10">
            <span className="text-dynamic-secondary text-[13px] self-start md:self-auto">
              Due {invoice.paymentDue}
            </span>
            {/* Amount - Positioned specifically for Desktop/Mobile flow */}
            <span className="hidden md:block font-bold text-[16px] md:w-[100px] md:text-right">
              £{" "}
              {Number(invoice.total).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

          {/* 3. Amount (Bottom Left on Mobile - visible only here on mobile) */}
          <div className="md:hidden flex items-end">
            <span className="font-bold text-[16px]">
              £{" "}
              {Number(invoice.total).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

          {/* 4. Status Badge (Bottom Right on Mobile) */}
          <div className="flex items-center justify-end md:gap-5">
            <div
              className={`w-[104px] h-[40px] rounded-[6px] flex items-center justify-center gap-2 font-bold text-[12px] capitalize ${bg} ${text}`}
            >
              <div className={`w-2 h-2 rounded-full ${dot}`}></div>
              {invoice.status}
            </div>

            {/* Arrow - Desktop Only */}
            <ChevronRight
              size={16}
              className="hidden md:block text-purple-500 group-hover:translate-x-1 transition-transform"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InvoiceCard;
