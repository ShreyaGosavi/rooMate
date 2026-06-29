"use client";
import { useEffect, useState } from "react";

type Toast = { id: number; message: string; type: "error" | "success" };
let toastId = 0;
const listeners: ((toast: Toast) => void)[] = [];

export function showToast(
  message: string,
  type: "error" | "success" = "error",
) {
  const toast = { id: ++toastId, message, type };
  listeners.forEach((l) => l(toast));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handler = (toast: Toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(
        () => setToasts((prev) => prev.filter((t) => t.id !== toast.id)),
        4000,
      );
    };
    listeners.push(handler);
    return () => {
      const i = listeners.indexOf(handler);
      if (i > -1) listeners.splice(i, 1);
    };
  }, []);

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium shadow-lg text-white max-w-sm ${t.type === "error" ? "bg-red-500" : "bg-[#9fdbda] text-[#061b32]"}`}
        >
          {t.type === "error" ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
          {t.message}
        </div>
      ))}
    </div>
  );
}
