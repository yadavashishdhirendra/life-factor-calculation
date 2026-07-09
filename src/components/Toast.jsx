import React from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

const toastIcons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

function Toast({ toast }) {
  if (!toast) return null;

  const Icon = toastIcons[toast.type] || Info;

  return (
    <div key={toast.id} className={`toast ${toast.type || "info"}`} role="status" aria-live="polite">
      <span className="toast-icon" aria-hidden="true">
        <Icon size={18} strokeWidth={2.4} />
      </span>
      <span className="toast-copy">
        <strong>{toast.title}</strong>
        {toast.message && <span>{toast.message}</span>}
      </span>
    </div>
  );
}

export default Toast;
