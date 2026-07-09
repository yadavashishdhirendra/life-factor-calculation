import React from "react";

function Loader({ label = "Loading section" }) {
  return (
    <div className="loader" role="status" aria-label={label}>
      <span />
      <p>{label}</p>
    </div>
  );
}

export default Loader;
