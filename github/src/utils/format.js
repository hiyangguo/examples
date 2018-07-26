export function toPercent(value, digits = 1) {
  return `${(value * 100).toFixed(digits)}%`;
}