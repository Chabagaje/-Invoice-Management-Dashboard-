import React, { useState, useEffect, useRef, useMemo } from "react";
import { useInvoices } from "../../hooks/useInvoices";

const initialFormState = {
  senderStreet: "",
  senderCity: "",
  senderPostCode: "",
  senderCountry: "",
  clientName: "",
  clientEmail: "",
  clientStreet: "",
  clientCity: "",
  clientPostCode: "",
  clientCountry: "",
  invoiceDate: new Date().toISOString().split("T")[0],
  paymentTerms: "30",
  projectDescription: "",
};

const InvoiceForm = () => {
  const { isModalOpen, closeModal, addInvoice, updateInvoice, editingInvoice } =
    useInvoices();

  const [formData, setFormData] = useState(initialFormState);
  const [items, setItems] = useState([
    { id: Date.now(), name: "", qty: 1, price: 0 },
  ]);
  const [errors, setErrors] = useState({});
  const initializedInvoiceId = useRef(null);

  // Sync form with editingInvoice or Reset for New Invoice
  useEffect(() => {
    if (!isModalOpen) {
      initializedInvoiceId.current = null;
      return;
    }

    const currentId = editingInvoice ? editingInvoice.id : "new";

    if (initializedInvoiceId.current !== currentId) {
      if (editingInvoice) {
        setFormData({
          senderStreet: editingInvoice.senderAddress?.street || "",
          senderCity: editingInvoice.senderAddress?.city || "",
          senderPostCode: editingInvoice.senderAddress?.postCode || "",
          senderCountry: editingInvoice.senderAddress?.country || "",
          clientName: editingInvoice.clientName || "",
          clientEmail: editingInvoice.clientEmail || "",
          clientStreet: editingInvoice.clientAddress?.street || "",
          clientCity: editingInvoice.clientAddress?.city || "",
          clientPostCode: editingInvoice.clientAddress?.postCode || "",
          clientCountry: editingInvoice.clientAddress?.country || "",
          invoiceDate:
            editingInvoice.createdAt || new Date().toISOString().split("T")[0],
          paymentTerms: editingInvoice.paymentTerms?.toString() || "30",
          projectDescription: editingInvoice.description || "",
        });
        setItems(
          editingInvoice.items?.length > 0
            ? [...editingInvoice.items]
            : [{ id: Date.now(), name: "", qty: 1, price: 0 }],
        );
      } else {
        setFormData(initialFormState);
        setItems([{ id: Date.now(), name: "", qty: 1, price: 0 }]);
      }
      setErrors({});
      initializedInvoiceId.current = currentId;
    }
  }, [editingInvoice, isModalOpen]);

  if (!isModalOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === "qty" || field === "price" ? Number(value) : value,
    };
    setItems(updatedItems);
  };

  const validateForm = () => {
    const newErrors = {};
    // Required Fields Check
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = "can't be empty";
    });

    // Item List Check
    if (items.length === 0) {
      alert("An item must be added");
      return false;
    }

    const emptyItems = items.some((item) => !item.name || item.price <= 0);
    if (emptyItems) {
      alert("All items must have a name and price");
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (status) => {
    if (status !== "draft" && !validateForm()) return;

    const total = items.reduce((acc, item) => acc + item.qty * item.price, 0);

    // Calculate Due Date based on current form selections
    const date = new Date(formData.invoiceDate);
    date.setDate(date.getDate() + parseInt(formData.paymentTerms));
    const paymentDue = date.toISOString().split("T")[0];

    const invoiceData = {
      id: editingInvoice
        ? editingInvoice.id
        : Math.random().toString(36).substr(2, 6).toUpperCase(),
      createdAt: formData.invoiceDate,
      paymentDue,
      description: formData.projectDescription,
      paymentTerms: Number(formData.paymentTerms),
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      status: editingInvoice ? editingInvoice.status : status,
      senderAddress: {
        street: formData.senderStreet,
        city: formData.senderCity,
        postCode: formData.senderPostCode,
        country: formData.senderCountry,
      },
      clientAddress: {
        street: formData.clientStreet,
        city: formData.clientCity,
        postCode: formData.clientPostCode,
        country: formData.clientCountry,
      },
      items,
      total,
    };

    editingInvoice ? updateInvoice(invoiceData) : addInvoice(invoiceData);
    closeModal();
  };

  const labelClass = (field) =>
    `text-[13px] mb-2 font-medium flex justify-between ${errors[field] ? "text-red-500" : "text-dynamic-secondary"}`;

  return (
    <div className="fixed inset-0 bg-black/50 z-[150] flex">
      <div className="w-[103px] h-full" onClick={closeModal}></div>

      <div
        className="w-[616px] h-full rounded-r-[20px] p-14 overflow-y-auto animate-slide-in shadow-2xl transition-colors duration-300"
        style={{ backgroundColor: "var(--card-bg)" }}
      >
        <h2 className="text-[var(--text-main)] text-[24px] font-bold mb-12 tracking-[-0.5px]">
          {editingInvoice ? (
            <>
              Edit <span className="text-[#7E88C3]">#</span>
              {editingInvoice.id}
            </>
          ) : (
            "New Invoice"
          )}
        </h2>

        <form
          className="flex flex-col gap-10"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Bill From */}
          <section>
            <p className="text-purple-500 font-bold text-[15px] mb-6">
              Bill From
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 flex flex-col">
                <label className={labelClass("senderStreet")}>
                  Street Address{" "}
                  {errors.senderStreet && <span>{errors.senderStreet}</span>}
                </label>
                <input
                  type="text"
                  value={formData.senderStreet}
                  onChange={(e) =>
                    handleInputChange("senderStreet", e.target.value)
                  }
                  className={`form-input-style ${errors.senderStreet ? "border-red-500" : ""}`}
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClass("senderCity")}>City</label>
                <input
                  type="text"
                  value={formData.senderCity}
                  onChange={(e) =>
                    handleInputChange("senderCity", e.target.value)
                  }
                  className={`form-input-style ${errors.senderCity ? "border-red-500" : ""}`}
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClass("senderPostCode")}>
                  Post Code
                </label>
                <input
                  type="text"
                  value={formData.senderPostCode}
                  onChange={(e) =>
                    handleInputChange("senderPostCode", e.target.value)
                  }
                  className={`form-input-style ${errors.senderPostCode ? "border-red-500" : ""}`}
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClass("senderCountry")}>Country</label>
                <input
                  type="text"
                  value={formData.senderCountry}
                  onChange={(e) =>
                    handleInputChange("senderCountry", e.target.value)
                  }
                  className={`form-input-style ${errors.senderCountry ? "border-red-500" : ""}`}
                />
              </div>
            </div>
          </section>

          {/* Bill To */}
          <section>
            <p className="text-purple-500 font-bold text-[15px] mb-6">
              Bill To
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <label className={labelClass("clientName")}>
                  Client's Name
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) =>
                    handleInputChange("clientName", e.target.value)
                  }
                  className={`form-input-style ${errors.clientName ? "border-red-500" : ""}`}
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClass("clientEmail")}>
                  Client's Email
                </label>
                <input
                  type="email"
                  placeholder="e.g. email@example.com"
                  value={formData.clientEmail}
                  onChange={(e) =>
                    handleInputChange("clientEmail", e.target.value)
                  }
                  className={`form-input-style ${errors.clientEmail ? "border-red-500" : ""}`}
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClass("clientStreet")}>
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.clientStreet}
                  onChange={(e) =>
                    handleInputChange("clientStreet", e.target.value)
                  }
                  className={`form-input-style ${errors.clientStreet ? "border-red-500" : ""}`}
                />
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label className={labelClass("clientCity")}>City</label>
                  <input
                    type="text"
                    value={formData.clientCity}
                    onChange={(e) =>
                      handleInputChange("clientCity", e.target.value)
                    }
                    className={`form-input-style ${errors.clientCity ? "border-red-500" : ""}`}
                  />
                </div>
                <div className="flex flex-col">
                  <label className={labelClass("clientPostCode")}>
                    Post Code
                  </label>
                  <input
                    type="text"
                    value={formData.clientPostCode}
                    onChange={(e) =>
                      handleInputChange("clientPostCode", e.target.value)
                    }
                    className={`form-input-style ${errors.clientPostCode ? "border-red-500" : ""}`}
                  />
                </div>
                <div className="flex flex-col">
                  <label className={labelClass("clientCountry")}>Country</label>
                  <input
                    type="text"
                    value={formData.clientCountry}
                    onChange={(e) =>
                      handleInputChange("clientCountry", e.target.value)
                    }
                    className={`form-input-style ${errors.clientCountry ? "border-red-500" : ""}`}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Details */}
          <section className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-dynamic-secondary text-[13px] mb-2 font-medium">
                Invoice Date
              </label>
              <input
                type="date"
                value={formData.invoiceDate}
                onChange={(e) =>
                  handleInputChange("invoiceDate", e.target.value)
                }
                className="form-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-dynamic-secondary text-[13px] mb-2 font-medium">
                Payment Terms
              </label>
              <select
                value={formData.paymentTerms}
                onChange={(e) =>
                  handleInputChange("paymentTerms", e.target.value)
                }
                className="form-input-style appearance-none bg-[url('https://raw.githubusercontent.com/Habakkuk-Jama/Invoice-App/main/src/assets/icon-arrow-down.svg')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat cursor-pointer"
              >
                <option value="1">Net 1 Day</option>
                <option value="7">Net 7 Days</option>
                <option value="14">Net 14 Days</option>
                <option value="30">Net 30 Days</option>
              </select>
            </div>
            <div className="col-span-2 flex flex-col">
              <label className={labelClass("projectDescription")}>
                Project Description
              </label>
              <input
                type="text"
                placeholder="e.g. Graphic Design Service"
                value={formData.projectDescription}
                onChange={(e) =>
                  handleInputChange("projectDescription", e.target.value)
                }
                className={`form-input-style ${errors.projectDescription ? "border-red-500" : ""}`}
              />
            </div>
          </section>

          {/* Item List */}
          <section>
            <h3 className="text-[#777DB5] text-[18px] font-bold mb-6">
              Item List
            </h3>
            <div className="flex flex-col gap-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[2.5fr_0.8fr_1.2fr_1fr_0.4fr] gap-4 items-end"
                >
                  <div className="flex flex-col">
                    <label className="text-dynamic-secondary text-[13px] mb-2">
                      Item Name
                    </label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                      className="form-input-style"
                    />
                  </div>
                  <div className="flex flex-col text-center">
                    <label className="text-dynamic-secondary text-[13px] mb-2">
                      Qty.
                    </label>
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) =>
                        handleItemChange(index, "qty", e.target.value)
                      }
                      className="form-input-style text-center"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-dynamic-secondary text-[13px] mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(index, "price", e.target.value)
                      }
                      className="form-input-style"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-dynamic-secondary text-[13px] mb-2">
                      Total
                    </label>
                    <div className="h-[48px] flex items-center text-dynamic-secondary font-bold">
                      {(item.qty * item.price).toFixed(2)}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setItems(items.filter((i) => i.id !== item.id))
                    }
                    className="mb-4 group"
                    disabled={items.length === 1}
                  >
                    <svg
                      width="13"
                      height="16"
                      className="fill-[#888EB0] group-hover:fill-red-500 transition-colors"
                    >
                      <path d="M11.583 3.556v10.666c0 .896-.707 1.622-1.583 1.622H2.667c-.876 0-1.584-.726-1.584-1.622V3.556h10.5zM9.25 0a.822.822 0 01.822.822v1.646h2.479c.227 0 .41.184.41.411v.823c0 .227-.183.411-.41.411H.959a.41.41 0 01-.41-.411v-.823c0-.227.183-.411.41-.411h2.48V.822C3.439.37 3.807 0 4.261 0h4.99z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                setItems([
                  ...items,
                  { id: Date.now(), name: "", qty: 1, price: 0 },
                ])
              }
              className="w-full mt-4 bg-gray-100 dark:bg-dark-200 text-[#7E88C3] dark:text-[#DFE3FA] font-bold py-4 rounded-full hover:bg-gray-200 transition-colors"
            >
              + Add New Item
            </button>
          </section>

          {/* Actions */}
          <div
            className="mt-8 flex justify-end items-center sticky bottom-0 py-6 border-t border-[var(--input-border)] gap-2 transition-colors duration-300"
            style={{ backgroundColor: "var(--card-bg)" }}
          >
            {editingInvoice ? (
              <>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-100 dark:bg-dark-200 text-[#7E88C3] dark:text-[#DFE3FA] font-bold py-4 px-6 rounded-full hover:bg-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit(editingInvoice.status)}
                  className="bg-purple-500 text-white font-bold py-4 px-6 rounded-full hover:bg-purple-400 transition-colors"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-100 dark:bg-dark-200 text-[#7E88C3] dark:text-[#DFE3FA] font-bold py-4 px-6 rounded-full hover:bg-white transition-colors"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit("draft")}
                  className="bg-[#373B53] text-[#DFE3FA] font-bold py-4 px-6 rounded-full hover:bg-[#0C0E16] transition-colors"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit("pending")}
                  className="bg-purple-500 text-white font-bold py-4 px-6 rounded-full hover:bg-purple-400 transition-colors"
                >
                  Save & Send
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
