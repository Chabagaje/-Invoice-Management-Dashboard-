import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useInvoices } from "../hooks/useInvoices";
import DeleteModal from "../components/invoice/DeleteModal";

const InvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { invoices, deleteInvoice, markAsPaid, openModal } = useInvoices();
  const [showModal, setShowModal] = useState(false);

  const invoice = invoices.find((inv) => inv.id === id);

  const handleDelete = () => {
    deleteInvoice(id);
    setShowModal(false);
    navigate("/");
  };

  const handleMarkAsPaid = () => markAsPaid(id);
  const handleEdit = () => {
    if (invoice.status !== "paid") openModal(invoice);
  };

  if (!invoice)
    return (
      <div className="pt-32 text-center font-bold text-xl text-dynamic-secondary">
        Invoice not found
      </div>
    );

  // Common Button Component for the Header/Footer
  const ActionButtons = ({ isMobile = false }) => (
    <div
      className={`flex gap-2 ${isMobile ? "w-full justify-center bg-[var(--card-bg)] p-6 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]" : ""}`}
    >
      <button
        onClick={handleEdit}
        disabled={invoice.status === "paid"}
        className="h-[48px] px-6 rounded-full font-bold text-[15px] transition-all bg-gray-100 dark:bg-dark-200 text-[#7E88C3] dark:text-[#DFE3FA] hover:bg-gray-200 dark:hover:bg-white dark:hover:text-[#7E88C3] disabled:opacity-50"
      >
        Edit
      </button>
      <button
        onClick={() => setShowModal(true)}
        className="h-[48px] px-6 rounded-full bg-red-500 text-white font-bold text-[15px] hover:bg-[#FF9797]"
      >
        Delete
      </button>
      {invoice.status !== "paid" && (
        <button
          onClick={handleMarkAsPaid}
          className="h-[48px] px-6 rounded-full bg-purple-500 text-white font-bold text-[15px] hover:bg-purple-400"
        >
          Mark as Paid
        </button>
      )}
    </div>
  );

  return (
    <>
      {showModal && (
        <DeleteModal
          id={invoice.id}
          onCancel={() => setShowModal(false)}
          onDelete={handleDelete}
        />
      )}

      {/* Main Container - Responsive Width */}
      <div className="w-full max-w-[730px] pt-10 lg:pt-[64px] pb-32 px-6 mx-auto">
        {/* Back Button */}
        <Link
          to="/"
          className="flex items-center gap-6 text-[15px] font-bold mb-8 group transition-all"
        >
          <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.342.886L2.114 5.114l4.228 4.228"
              stroke="#7C5DFA"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <span className="group-hover:text-dynamic-secondary">Go back</span>
        </Link>

        {/* Header Bar */}
        <div className="invoice-card-style p-6 lg:p-8 flex justify-between items-center mb-6">
          <div className="flex justify-between lg:justify-start items-center w-full lg:w-auto gap-6">
            <span className="text-dynamic-secondary text-[13px] font-medium">
              Status
            </span>
            <div
              className={`w-[104px] h-[40px] rounded-[6px] flex items-center justify-center gap-2 font-bold text-[15px] capitalize 
              ${invoice.status === "paid" ? "bg-[#33D69F]/10 text-[#33D69F]" : invoice.status === "pending" ? "bg-[#FF8F00]/10 text-[#FF8F00]" : "bg-gray-200/10 text-dynamic-secondary"}`}
            >
              <div
                className={`w-2 h-2 rounded-full ${invoice.status === "paid" ? "bg-[#33D69F]" : invoice.status === "pending" ? "bg-[#FF8F00]" : "bg-dynamic-secondary"}`}
              ></div>
              {invoice.status}
            </div>
          </div>
          {/* Desktop Actions */}
          <div className="hidden md:block">
            <ActionButtons />
          </div>
        </div>

        {/* Main Details Card */}
        <div className="invoice-card-style p-6 md:p-12">
          {/* Top Info */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            <div>
              <h1 className="font-bold text-[15px] md:text-xl mb-1 uppercase">
                <span className="text-gray-400">#</span>
                {invoice.id}
              </h1>
              <p className="text-dynamic-secondary text-[13px]">
                {invoice.description}
              </p>
            </div>
            <div className="text-left md:text-right text-dynamic-secondary text-[13px] leading-[18px]">
              <p>{invoice.senderAddress?.street}</p>
              <p>{invoice.senderAddress?.city}</p>
              <p>{invoice.senderAddress?.postCode}</p>
              <p>{invoice.senderAddress?.country}</p>
            </div>
          </div>

          {/* Middle Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 mb-12">
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="text-dynamic-secondary text-[13px] mb-3">
                  Invoice Date
                </h3>
                <p className="font-bold text-[15px] md:text-[19px]">
                  {invoice.createdAt}
                </p>
              </div>
              <div>
                <h3 className="text-dynamic-secondary text-[13px] mb-3">
                  Payment Due
                </h3>
                <p className="font-bold text-[15px] md:text-[19px]">
                  {invoice.paymentDue}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-dynamic-secondary text-[13px] mb-3">
                Bill To
              </h3>
              <p className="font-bold text-[15px] md:text-[19px] mb-2">
                {invoice.clientName}
              </p>
              <div className="text-dynamic-secondary text-[13px] leading-[18px]">
                <p>{invoice.clientAddress?.street}</p>
                <p>{invoice.clientAddress?.city}</p>
                <p>{invoice.clientAddress?.postCode}</p>
                <p>{invoice.clientAddress?.country}</p>
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-dynamic-secondary text-[13px] mb-3">
                Sent to
              </h3>
              <p className="font-bold text-[15px] md:text-[19px] break-all">
                {invoice.clientEmail}
              </p>
            </div>
          </div>

          {/* Items Table Section */}
          <div className="rounded-t-lg p-6 md:p-8 transition-colors mt-12 bg-[var(--table-bg)]">
            {/* Table Header (Desktop Only) */}
            <div className="hidden md:grid grid-cols-4 text-dynamic-secondary text-[13px] mb-8">
              <span className="col-span-2">Item Name</span>
              <span className="text-center">QTY.</span>
              <span className="text-right">Price</span>
              <span className="text-right">Total</span>
            </div>

            {/* Item Rows */}
            <div className="flex flex-col gap-6 md:gap-8">
              {invoice.items?.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 md:grid-cols-4 items-center"
                >
                  <div className="flex flex-col md:col-span-2 gap-2">
                    <span className="font-bold text-[15px] text-[var(--text-main)]">
                      {item.name}
                    </span>
                    {/* Mobile Quantity/Price display */}
                    <span className="md:hidden text-dynamic-secondary font-bold">
                      {item.quantity} x £ {item.price.toFixed(2)}
                    </span>
                  </div>
                  <span className="hidden md:block text-center font-bold text-dynamic-secondary">
                    {item.quantity}
                  </span>
                  <span className="hidden md:block text-right font-bold text-dynamic-secondary">
                    £ {item.price.toFixed(2)}
                  </span>
                  <span className="text-right font-bold text-[var(--text-main)] text-[15px]">
                    £ {(item.quantity * item.price).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Total Bar */}
          <div className="bg-[#0C0E16] dark:bg-dark-400 rounded-b-lg p-6 md:p-8 flex justify-between items-center transition-colors">
            <span className="text-white text-[13px]">Amount Due</span>
            <span className="text-white font-bold text-2xl md:text-[32px]">
              £{" "}
              {Number(invoice.total).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-10">
        <ActionButtons isMobile={true} />
      </div>
    </>
  );
};

export default InvoiceDetails;
