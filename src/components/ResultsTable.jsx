import React from "react";
import { formatValue } from "../utils/format";

function ResultsTable({ result }) {
  return (
    <section className="table-panel">
      <div className="section-heading">
        <p className="section-kicker">Value Display</p>
        <h2>Life Factor Values</h2>
        <p>
          Day {result.day}: {result.favoredParent} values are intentionally higher. Each parent value stays inside its factor range.
        </p>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Factor</th>
              <th>Parent Range</th>
              <th>Mother</th>
              <th>Father</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row) => (
              <tr key={row.name}>
                <td data-label="Factor">{row.name}</td>
                <td data-label="Parent Range">
                  {formatValue(row.min)} - {formatValue(row.max)}
                </td>
                <td data-label="Mother">{formatValue(row.mother)}</td>
                <td data-label="Father">{formatValue(row.father)}</td>
                <td data-label="Total">{formatValue(row.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ResultsTable;
