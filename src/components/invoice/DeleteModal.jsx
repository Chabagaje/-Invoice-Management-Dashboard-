import React from "react";

const DeleteModal = ({ id, onCancel, onDelete }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-6">
      <div className="bg-[var(--card-bg)] w-full max-w-[480px] p-8 md:p-12 rounded-lg shadow-lg font-spartan transition-colors">
        <h2 className="text-[var(--text-main)] text-[24px] font-bold mb-3 tracking-[-0.5px]">
          Confirm Deletion
        </h2>

        <p className="text-dynamic-secondary text-[13px] leading-[22px] mb-8 font-medium">
          Are you sure you want to delete invoice{" "}
          <span className="uppercase font-bold">#{id}</span>? This action cannot
          be undone.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="h-[48px] px-6 rounded-full bg-gray-100 dark:bg-dark-200 text-gray-400 dark:text-white font-bold text-[15px] tracking-[-0.25px] hover:bg-gray-200 dark:hover:bg-white dark:hover:text-dark-100 transition-all"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="h-[48px] px-6 rounded-full bg-red-500 text-white font-bold text-[15px] tracking-[-0.25px] hover:bg-[#FF9797] transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
