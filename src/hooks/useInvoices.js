import { useContext } from "react";
import { InvoiceContext } from "../context/InvoiceContext.js";

/**
 * useInvoices Hook
 * Provides access to:
 * - invoices (Array)
 * - addInvoice (Function)
 * - markAsPaid (Function)
 * - deleteInvoice (Function)
 * - updateInvoice (Function)
 * - Modal controls (isModalOpen, openModal, closeModal)
 */
export const useInvoices = () => {
  const context = useContext(InvoiceContext);

  // Safety check to ensure the hook is used inside the Provider
  if (!context) {
    throw new Error("useInvoices must be used within an InvoiceProvider");
  }

  return context;
};
