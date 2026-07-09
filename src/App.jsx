import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import DobPicker from "./components/DobPicker";
import ActionBar from "./components/ActionBar";
import Loader from "./components/Loader";
import Toast from "./components/Toast";
import { useSavedResults } from "./hooks/useSavedResults";
import { calculateLegacy, validateDob } from "./utils/calculator";
import { exportCsv, exportPdf } from "./utils/exporters";

const SummaryCards = lazy(() => import("./components/SummaryCards"));
const ResultsTable = lazy(() => import("./components/ResultsTable"));
const ComparisonChart = lazy(() => import("./components/ComparisonChart"));
const SavedResults = lazy(() => import("./components/SavedResults"));

const THEME_KEY = "parental-legacy-theme";
const EXPORT_LOADING_MS = 450;

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || "light");
  const [toast, setToast] = useState(null);
  const [exporting, setExporting] = useState("");
  const { savedResults, saveResult, deleteResult } = useSavedResults();

  const result = useMemo(() => {
    if (!selectedDate || error) return null;
    return calculateLegacy(selectedDate);
  }, [selectedDate, error]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (!toast) return undefined;

    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function showToast(title, message, type = "info") {
    setToast({ id: Date.now(), title, message, type });
  }

  function handleDateChange(date) {
    setSelectedDate(date);
    const validationMessage = validateDob(date);
    setError(validationMessage);

    if (date && !validationMessage) {
      showToast("DOB selected", "Life factor values were calculated.", "success");
    }
  }

  function handleToggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    showToast("Theme updated", `${nextTheme === "light" ? "Light" : "Dark"} mode is active.`, "info");
  }

  function handleSaveResult() {
    saveResult(result);
    showToast("Result saved", "Calculation stored in this browser.", "success");
  }

  async function handleExportCsv() {
    try {
      setExporting("csv");
      showToast("Generating CSV", "Your CSV file is being prepared.", "info");
      await wait(EXPORT_LOADING_MS);
      await exportCsv(result);
      showToast("CSV downloaded", "The result file has been generated.", "success");
    } catch {
      showToast("CSV failed", "Please try exporting again.", "error");
    } finally {
      setExporting("");
    }
  }

  async function handleExportPdf() {
    try {
      setExporting("pdf");
      showToast("Generating PDF", "Your PDF file is being prepared.", "info");
      await wait(EXPORT_LOADING_MS);
      await exportPdf(result);
      showToast("PDF downloaded", "The result file has been generated.", "success");
    } catch {
      showToast("PDF failed", "Please try exporting again.", "error");
    } finally {
      setExporting("");
    }
  }

  function handleSelectSaved(date) {
    handleDateChange(date);
    showToast("Saved result opened", "The selected calculation is loaded.", "info");
  }

  function handleDeleteSaved(id) {
    deleteResult(id);
    showToast("Saved result deleted", "The local record was removed.", "success");
  }

  return (
    <main className="app-shell">
      <Header theme={theme} onToggleTheme={handleToggleTheme} />

      <section className="dashboard-grid">
        <aside className="sidebar-panel">
          <DobPicker selectedDate={selectedDate} error={error} onChange={handleDateChange} />
          <ActionBar
            disabled={!result}
            exporting={exporting}
            onSave={handleSaveResult}
            onExportCsv={handleExportCsv}
            onExportPdf={handleExportPdf}
          />
        </aside>

        <section className="content-panel">
          {!result && !error && (
            <div className="empty-state">
              <p className="section-kicker">Ready</p>
              <h2>Start with a birth date</h2>
              <p>The calculator will show parental values, totals, visual comparison, and export options.</p>
            </div>
          )}

          {result && (
            <Suspense fallback={<Loader label="Preparing results" />}>
              <SummaryCards result={result} />
              <section className="result-layout">
                <ResultsTable result={result} />
                <ComparisonChart result={result} />
              </section>
            </Suspense>
          )}

          <Suspense fallback={<Loader label="Loading saved results" />}>
            <SavedResults savedResults={savedResults} onSelect={handleSelectSaved} onDelete={handleDeleteSaved} />
          </Suspense>
        </section>
      </section>
      <Toast toast={toast} />
    </main>
  );
}

export default App;
