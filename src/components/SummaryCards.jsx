import React from "react";
import { formatValue } from "../utils/format";

function SummaryCards({ result }) {
  const cards = [
    { label: "Mother Total", value: formatValue(result.motherTotal), tone: "mother" },
    { label: "Father Total", value: formatValue(result.fatherTotal), tone: "father" },
    { label: "Grand Total", value: formatValue(result.grandTotal), tone: "total" },
    { label: "Higher Legacy", value: result.higherParent, tone: "legacy" },
  ];

  return (
    <section className="summary-grid">
      {cards.map((card) => (
        <article key={card.label} className={`summary-card ${card.tone}`}>
          <span>{card.label}</span>
          <strong>{card.value}</strong>
        </article>
      ))}
    </section>
  );
}

export default SummaryCards;
