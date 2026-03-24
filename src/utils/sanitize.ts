export const sanitizeString = (value: string): string => {
  return value
    .trim()
    .replace(/[<>'"`;]/g, "")        // remove HTML/JS injection chars
    .replace(/\$/g, "")              // remove MongoDB operator prefix
    .replace(/\.\./g, "")           // remove path traversal
};

export const sanitizeObject = (obj: Record<string, unknown>): Record<string, unknown> => {
  const sanitized: Record<string, unknown> = {};

  for (const key of Object.keys(obj)) {
    const value = obj[key];

    // Block MongoDB operators like $where, $gt, $ne etc.
    if (key.startsWith("$")) continue;

    if (typeof value === "string") {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === "number" || typeof value === "boolean") {
      sanitized[key] = value;
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      // Recursively sanitize nested objects
      sanitized[key] = sanitizeObject(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
};