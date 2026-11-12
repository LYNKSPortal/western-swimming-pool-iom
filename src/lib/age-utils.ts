/**
 * Returns the number of whole months between a date of birth (YYYY-MM-DD)
 * and today, or null if the date is missing/invalid/in the future.
 */
export function ageInMonths(dob: string, now: Date = new Date()): number | null {
  if (!dob) return null;
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime()) || birth > now) return null;

  let months = (now.getFullYear() - birth.getFullYear()) * 12;
  months += now.getMonth() - birth.getMonth();
  if (now.getDate() < birth.getDate()) months -= 1;
  return Math.max(0, months);
}

/** Formats an age in months as a friendly string, e.g. "7 months" or "4 years". */
export function formatAge(months: number): string {
  if (months < 24) return `${months} month${months === 1 ? "" : "s"}`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"}`;
}
