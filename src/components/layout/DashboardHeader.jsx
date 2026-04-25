import React, { useState } from "react";
import { useInvoices } from "../../hooks/useInvoices";

const DashboardHeader = ({ setFilter }) => {
  const { invoices, openModal } = useInvoices();
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);

  const statuses = ["draft", "pending", "paid"];

  const handleFilterClick = (status) => {
    const newStatus = activeFilter === status ? null : status;
    setActiveFilter(newStatus);
    setFilter(newStatus);
  };

  return (
    <header className="w-full max-w-[730px] flex justify-between items-center mb-8 md:mb-[64px] font-spartan relative mx-auto px-6 md:px-0">
      <div className="flex flex-col justify-between">
        <h1 className="text-xl md:text-[32px] font-bold leading-tight tracking-[-1px]">
          Invoices
        </h1>
        <p className="text-dynamic-secondary text-[13px] font-medium mt-1">
          <span className="hidden md:inline">
            {invoices.length === 0
              ? "No invoices"
              : `There are ${invoices.length} total invoices`}
          </span>
          <span className="md:hidden">
            {invoices.length === 0
              ? "No invoices"
              : `${invoices.length} invoices`}
          </span>
        </p>
      </div>

      <div className="flex items-center gap-4 md:gap-[40px]">
        <div className="relative">
          <div
            className="flex items-center gap-3 md:gap-[16px] cursor-pointer group"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="font-bold text-[15px] tracking-[-0.25px]">
              Filter <span className="hidden md:inline">by status</span>
            </span>
            <svg
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              width="11"
              height="7"
              viewBox="0 0 11 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1l4.228 4.228L9.456 1"
                stroke="#7C5DFA"
                strokeWidth="2"
              />
            </svg>
          </div>

          {isOpen && (
            <div className="absolute top-[40px] left-[-40px] md:left-[-20px] w-[192px] bg-[var(--card-bg)] shadow-[0_10px_20px_rgba(0,0,0,0.25)] rounded-lg p-6 flex flex-col gap-4 z-50 transition-colors">
              {statuses.map((status) => (
                <label
                  key={status}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="appearance-none w-4 h-4 rounded-sm bg-[var(--app-bg)] border border-transparent group-hover:border-[#7C5DFA] checked:bg-[#7C5DFA] cursor-pointer transition-all"
                      checked={activeFilter === status}
                      onChange={() => handleFilterClick(status)}
                    />
                    {activeFilter === status && (
                      <svg
                        className="absolute w-2 h-2 pointer-events-none"
                        viewBox="0 0 10 8"
                        fill="none"
                      >
                        <path
                          d="M1.5 4.5l2.5 2.5 4.5-5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="font-bold capitalize text-[12px] tracking-[-0.25px]">
                    {status}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => openModal()}
          className="relative w-[90px] md:w-[150px] h-[40px] md:h-[48px] bg-[#7C5DFA] hover:bg-[#9277FF] rounded-full transition-colors flex items-center"
        >
          <div className="absolute left-[6px] md:left-[8px] w-[28px] md:w-[32px] h-[28px] md:h-[32px] bg-white rounded-full flex items-center justify-center">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M6.313 10.032V6.313h3.719V4.687H6.313V.968H4.687v3.719H.968v1.626h3.719v3.719h1.626z"
                fill="#7C5DFA"
              />
            </svg>
          </div>
          <span className="w-full text-center pl-6 md:pl-8 text-white font-bold text-[15px] tracking-[-0.25px]">
            New<span className="hidden md:inline"> Invoice</span>
          </span>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
