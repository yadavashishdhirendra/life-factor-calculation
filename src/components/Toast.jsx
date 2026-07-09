import React from "react";

function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div className={`toast ${toast.type || "info"}`} role="status" aria-live="polite">
      <strong>{toast.title}</strong>
      {toast.message && <span>{toast.message}</span>}
    </div>
  );
}

export default Toast;
