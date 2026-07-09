import React from "react";
import { Download, FileDown, Save } from "lucide-react";

function ActionBar({ disabled, exporting, onSave, onExportCsv, onExportPdf }) {
  const isCsvLoading = exporting === "csv";
  const isPdfLoading = exporting === "pdf";
  const isExporting = Boolean(exporting);

  return (
    <div className="action-bar">
      <button type="button" onClick={onSave} disabled={disabled || isExporting}>
        <Save size={17} /> Save
      </button>
      <button type="button" onClick={onExportCsv} disabled={disabled || isExporting}>
        {isCsvLoading ? <span className="button-spinner" /> : <Download size={17} />}
        {isCsvLoading ? "Generating CSV" : "CSV"}
      </button>
      <button type="button" onClick={onExportPdf} disabled={disabled || isExporting}>
        {isPdfLoading ? <span className="button-spinner" /> : <FileDown size={17} />}
        {isPdfLoading ? "Generating PDF" : "PDF"}
      </button>
    </div>
  );
}

export default ActionBar;
