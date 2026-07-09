import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatValue } from "../utils/format";

function ComparisonChart({ result }) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 760px)").matches : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(max-width: 760px)");
    const handleChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const chartData = result.rows.map((row) => ({
    factor: isMobile ? row.name : row.name.replace(" ", "\n"),
    Mother: row.mother,
    Father: row.father,
  }));

  return (
    <section className="chart-panel">
      <div className="section-heading">
        <p className="section-kicker">Charts</p>
        <h2>Mother vs Father</h2>
        <p>Visual comparison of parental values across all seven life factors.</p>
      </div>
      <div className={`chart-wrap ${isMobile ? "mobile-chart" : ""}`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout={isMobile ? "vertical" : "horizontal"}
            margin={isMobile ? { top: 8, right: 8, bottom: 8, left: 12 } : { top: 10, right: 10, bottom: 15, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={!isMobile} horizontal={isMobile} />
            {isMobile ? (
              <>
                <XAxis type="number" domain={[0, 12]} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="factor" width={116} tick={{ fontSize: 10 }} />
              </>
            ) : (
              <>
                <XAxis dataKey="factor" tick={{ fontSize: 11 }} interval={0} />
                <YAxis domain={[0, 12]} tick={{ fontSize: 11 }} />
              </>
            )}
            <Tooltip formatter={(value) => formatValue(Number(value))} />
            <Legend />
            <Bar dataKey="Mother" fill="var(--mother)" radius={isMobile ? [0, 4, 4, 0] : [4, 4, 0, 0]} />
            <Bar dataKey="Father" fill="var(--father)" radius={isMobile ? [0, 4, 4, 0] : [4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default ComparisonChart;
