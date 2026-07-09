import React, { useEffect, useMemo, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { formatValue } from "../utils/format";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Filler, Tooltip, Legend);

function getCssVar(name, fallback) {
  if (typeof window === "undefined") return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

function ComparisonChart({ result }) {
  const [themeKey, setThemeKey] = useState(() =>
    typeof document !== "undefined" ? document.documentElement.dataset.theme || "light" : "light"
  );

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const observer = new MutationObserver(() => {
      setThemeKey(document.documentElement.dataset.theme || "light");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  const chartData = useMemo(
    () => ({
      labels: result.rows.map((row) => row.name),
      datasets: [
        {
          type: "bar",
          label: "Mother",
          data: result.rows.map((row) => row.mother),
          backgroundColor: getCssVar("--mother", "#d9577a"),
          borderColor: getCssVar("--mother", "#d9577a"),
          borderWidth: 0,
          borderRadius: 5,
          stack: "parental",
          order: 2,
        },
        {
          type: "bar",
          label: "Father",
          data: result.rows.map((row) => row.father),
          backgroundColor: getCssVar("--father", "#1d8293"),
          borderColor: getCssVar("--father", "#1d8293"),
          borderWidth: 0,
          borderRadius: 5,
          stack: "parental",
          order: 2,
        },
        {
          type: "line",
          label: "Total",
          data: result.rows.map((row) => row.total),
          borderColor: getCssVar("--accent-strong", "#163d46"),
          backgroundColor: getCssVar("--accent-strong", "#163d46"),
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
          tension: 0.35,
          fill: false,
          order: 1,
        },
      ],
    }),
    [result.rows, themeKey]
  );

  const chartOptions = useMemo(() => {
    const textColor = getCssVar("--text", "#141f24");
    const mutedColor = getCssVar("--muted", "#66757d");
    const lineColor = getCssVar("--line", "#d7e2e6");

    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          position: "top",
          align: "end",
          labels: {
            color: textColor,
            boxWidth: 10,
            boxHeight: 10,
            borderRadius: 5,
            useBorderRadius: true,
            font: {
              family: "Montserrat",
              size: 11,
              weight: "600",
            },
          },
        },
        tooltip: {
          backgroundColor: themeKey === "dark" ? "#151f22" : "#ffffff",
          titleColor: textColor,
          bodyColor: textColor,
          borderColor: lineColor,
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: (context) => `${context.dataset.label}: ${formatValue(context.parsed.y)}`,
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
          },
          ticks: {
            color: mutedColor,
            maxRotation: 35,
            minRotation: 0,
            font: {
              family: "Montserrat",
              size: 10,
              weight: "500",
            },
          },
        },
        y: {
          stacked: true,
          suggestedMax: 22,
          grid: {
            color: lineColor,
            borderDash: [4, 5],
          },
          ticks: {
            color: mutedColor,
            font: {
              family: "Montserrat",
              size: 10,
              weight: "500",
            },
          },
        },
      },
    };
  }, [themeKey]);

  return (
    <section className="chart-panel">
      <div className="section-heading">
        <p className="section-kicker">Charts</p>
        <h2>Stacked Parent Values</h2>
        <p>Mother and Father values are stacked, with a line showing each factor total.</p>
      </div>

      <div className="chart-wrap chartjs-wrap" role="img" aria-label="Stacked Mother and Father bar chart with Total line">
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
    </section>
  );
}

export default ComparisonChart;
