import React, { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

const Toast = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    if (isShown) {
      const timeoutId = setTimeout(onClose, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [isShown, onClose]);

  return (
    <div
      className={`fixed top-20 right-6 transition-all duration-500 ease-in-out transform ${
        isShown ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
    >
      <div
        className={`min-w-52 bg-white border shadow-xl rounded-md flex items-center gap-3 py-2 px-4 ${
          type === "error" ? "border-red-500 bg-red-100" : "border-green-500 bg-green-100"
        }`}
      >
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full ${
            type === "error" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {type === "error" ? <MdDeleteOutline className="text-xl text-white" /> : <LuCheck className="text-xl text-white" />}
        </div>
        <p className="text-sm text-slate-800">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
