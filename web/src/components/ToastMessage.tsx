"use client";

import type React from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

interface ToastMessageProps {
  text: string;
  type: "success" | "error";
}

export const ToastMessage: React.FC<ToastMessageProps> = ({ text, type }) => {
  const handleToast = () => {
    toast(
      <div className="flex items-center gap-3 flex-row text-base font-semibold">
        <div
          className={
            type === "success"
              ? "bg-[#FF204E] min-w-6 rounded-full size-6 flex items-center justify-center"
              : "bg-[#FF204E] min-w-6 rounded-full size-6 flex items-center justify-center"
          }
        >
          {type === "success" ? (
            <Check strokeWidth={3} className="text-white size-3" />
          ) : (
            <X strokeWidth={3} className="text-white size-3" />
          )}
        </div>
        <span className="text-white text-sm font-semibold">{text}</span>
      </div>,
      {
        style: {
          background:
            "linear-gradient(90deg, rgba(255, 32, 78, 0.15) 0%, rgba(255, 32, 78, 0.08) 30%, rgba(255, 32, 78, 0.02) 60%, rgba(255, 32, 78, 0) 100%), linear-gradient(0deg, rgba(34, 34, 37, 0.98), rgba(34, 34, 37, 0.98))",
          color: "white",
          borderRadius: "300px",
          padding: "14px 18px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
          minWidth: "140px",
        },
      }
    );
  };

  useEffect(() => {
    handleToast();
  }, [text, type]);

  return null;
};
