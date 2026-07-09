import { FACTORS } from "../constants/factors";
import { round3, toInputDate } from "./format";

function balanceToTarget(values, target) {
  const scaled = values.map((value) => Math.round(value * 1000));
  let remaining = Math.round(target * 1000) - scaled.reduce((sum, value) => sum + value, 0);

  while (remaining !== 0) {
    const direction = remaining > 0 ? 1 : -1;
    const adjustableIndex = scaled.findIndex((value, index) => {
      const factor = FACTORS[index];
      const next = value + direction;
      return next >= Math.round(factor.min * 1000) && next <= Math.round(factor.max * 1000);
    });

    if (adjustableIndex === -1) break;
    scaled[adjustableIndex] += direction;
    remaining -= direction;
  }

  return scaled.map((value) => value / 1000);
}

function getParentBaselines(day) {
  const rawValues = FACTORS.map((factor, index) => {
    const range = factor.max - factor.min;
    const wave = Math.sin((day + index + 1) * 1.618);
    const ratio = 0.5 + wave * 0.42;
    return factor.min + range * Math.min(0.92, Math.max(0.08, ratio));
  });

  const minSum = FACTORS.reduce((sum, factor) => sum + factor.min, 0);
  const rawSum = rawValues.reduce((sum, value) => sum + value, 0);
  const scale = (50 - minSum) / (rawSum - minSum);
  const normalized = rawValues.map((raw, index) => FACTORS[index].min + (raw - FACTORS[index].min) * scale);

  return balanceToTarget(normalized, 50);
}

export function validateDob(date) {
  if (!date) return "Please select your date of birth.";
  if (Number.isNaN(date.getTime())) return "Please enter a valid date.";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selected = new Date(date);
  selected.setHours(0, 0, 0, 0);

  if (selected > today) return "Date of birth cannot be in the future.";
  return "";
}

export function calculateLegacy(date) {
  if (!date) return null;

  const day = date.getDate();
  const motherFavored = day % 2 === 1;
  const baselines = getParentBaselines(day);

  const rows = FACTORS.map((factor, index) => {
    const baseline = baselines[index];
    const availableSkew = Math.min(factor.max - baseline, baseline - factor.min);
    const skewStrength = 0.35 + Math.abs(Math.sin((day + index * 3) * 0.71)) * 0.32;
    const skew = round3(availableSkew * skewStrength * (motherFavored ? 1 : -1));
    const mother = round3(baseline + skew);
    const father = round3(baseline * 2 - mother);

    return {
      ...factor,
      mother,
      father,
      total: round3(mother + father),
    };
  });

  const motherTotal = round3(rows.reduce((sum, row) => sum + row.mother, 0));
  const fatherTotal = round3(rows.reduce((sum, row) => sum + row.father, 0));

  return {
    dob: toInputDate(date),
    day,
    favoredParent: motherFavored ? "Mother" : "Father",
    higherParent: motherTotal > fatherTotal ? "Mother" : "Father",
    rows,
    motherTotal,
    fatherTotal,
    grandTotal: round3(motherTotal + fatherTotal),
    createdAt: new Date().toISOString(),
  };
}
