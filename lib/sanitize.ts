export function sanitizeText(value: string) {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeNullableText(value?: string | null) {
  if (!value) {
    return null;
  }

  const sanitized = sanitizeText(value);
  return sanitized.length > 0 ? sanitized : null;
}
