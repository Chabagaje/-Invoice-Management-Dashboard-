import React from "react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-[102px] animate-fade-in px-6">
      {/* Illustration */}
      <img
        src="/src/assets/Emailcampaign2.png"
        alt="No invoices"
        className="mb-16 w-[242px] h-auto"
      />

      {/* Text Content */}
      <div className="text-center">
        <h2 className="text-[var(--text-main)] text-[20px] font-bold mb-6 tracking-[-0.63px]">
          There is nothing here
        </h2>
        <p className="text-dynamic-secondary text-[12px] font-medium leading-[15px] tracking-[-0.25px] max-w-[220px] mx-auto">
          Create an invoice by clicking the{" "}
          <span className="font-bold">New Invoice</span> button and get started
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
