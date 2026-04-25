import React, { useState, useEffect } from "react";
import { InvoiceContext } from "./InvoiceContext.js";

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState(() => {
    const savedInvoices = localStorage.getItem("zinari_invoices");
    return savedInvoices
      ? JSON.parse(savedInvoices)
      : [
          {
            id: "RT3080",
            clientName: "Jensen Huang",
            total: 1800.9,
            status: "paid",
            paymentDue: "2026-05-19",
          },
        ];
  });

  const [editingInvoice, setEditingInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("zinari_invoices", JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

  const addInvoice = (newInvoice) =>
    setInvoices((prev) => [newInvoice, ...prev]);

  const markAsPaid = (id) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: "paid" } : inv)),
    );
  };

  const deleteInvoice = (id) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  const updateInvoice = (updatedInvoice) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === updatedInvoice.id ? updatedInvoice : inv)),
    );
    setEditingInvoice(null);
  };

  const openModal = (invoice = null) => {
    setEditingInvoice(invoice);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingInvoice(null);
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        editingInvoice,
        addInvoice,
        markAsPaid,
        deleteInvoice,
        updateInvoice,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
