import React from "react";
import { Trash2 } from "lucide-react";
import { formatValue, parseInputDate } from "../utils/format";

function SavedResults({ savedResults, onSelect, onDelete }) {
  if (savedResults.length === 0) return null;

  return (
    <section className="saved-panel">
      <div className="section-heading">
        <p className="section-kicker">Saved Results</p>
        <h2>Recent calculations</h2>
        <p>Stored locally in this browser.</p>
      </div>
      <div className="saved-list">
        {savedResults.map((item) => (
          <article key={item.id}>
            <button type="button" className="saved-main" onClick={() => onSelect(parseInputDate(item.dob))}>
              <span>{item.dob}</span>
              <strong>{item.higherParent}</strong>
              <small>Grand total {formatValue(item.grandTotal)}</small>
            </button>
            <button
              type="button"
              className="delete-button"
              onClick={() => onDelete(item.id)}
              aria-label={`Delete result for ${item.dob}`}
              title="Delete saved result"
            >
              <Trash2 size={17} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SavedResults;
