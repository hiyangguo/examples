export function toPercent(value, digits = 1) {
  return `${(value * 100).toFixed(digits)}%`;
}

export function toQ(params = {}) {
  return Object.entries(params)
    .filter(([key, value]) => value !== null && value !== undefined)
    .map(([key, value]) => `${key}:${value}`)
    .join('+');
}

export function fromQ(q = '') {
  if (!q) return {};
  return q.split('+')
    .reduce((acc, kv) => {
      const [key, value] = decodeURIComponent(kv).split(':');
      return {
        ...acc,
        [key]: value
      }
    }, {})
}
