import { formatValue } from "./format";

export async function exportCsv(result) {
  if (!result) return;
  const rows = [
    ["Factor", "Mother", "Father", "Total"],
    ...result.rows.map((row) => [row.name, formatValue(row.mother), formatValue(row.father), formatValue(row.total)]),
    ["Totals", formatValue(result.motherTotal), formatValue(result.fatherTotal), formatValue(result.grandTotal)],
  ];
  const csv = rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `parental-legacy-${result.dob}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export async function exportPdf(result) {
  if (!result) return;
  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Parental Legacy & Life Factors Calculator", 14, 18);
  doc.setFontSize(11);
  doc.text(`Date of Birth: ${result.dob}`, 14, 30);
  doc.text(`Higher Parent: ${result.higherParent}`, 14, 38);
  doc.text(`Mother Total: ${formatValue(result.motherTotal)}`, 14, 46);
  doc.text(`Father Total: ${formatValue(result.fatherTotal)}`, 80, 46);
  doc.text(`Grand Total: ${formatValue(result.grandTotal)}`, 146, 46);

  let y = 62;
  doc.setFont(undefined, "bold");
  doc.text("Factor", 14, y);
  doc.text("Mother", 98, y);
  doc.text("Father", 128, y);
  doc.text("Total", 160, y);
  doc.setFont(undefined, "normal");

  result.rows.forEach((row) => {
    y += 10;
    doc.text(row.name, 14, y);
    doc.text(formatValue(row.mother), 98, y);
    doc.text(formatValue(row.father), 128, y);
    doc.text(formatValue(row.total), 160, y);
  });

  doc.save(`parental-legacy-${result.dob}.pdf`);
}
