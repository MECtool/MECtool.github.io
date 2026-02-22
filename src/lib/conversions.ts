/**
 * Drug conversion multipliers and logic for Morphine Equivalence (MEQ).
 * All functions are pure — no DOM access.
 */

/** Methadone uses a tiered conversion based on daily dose. */
export function methadoneMEQ(dose: number): number {
  dose = Math.max(0, dose);
  if (dose >= 61) return dose * 12;
  if (dose >= 41) return dose * 10;
  if (dose >= 21) return dose * 8;
  if (dose >= 1) return dose * 4;
  return 0;
}

/** Generic MEQ calculation for non-tiered drugs. */
export function calculateMEQ(
  drug: string,
  dose: number
): number {
  dose = Math.max(0, dose);
  const multipliers: Record<string, number> = {
    hydromorphone_oral: 4,
    hydromorphone_iv: 5,
    morphine_oral: 1,
    fentanyl_transdermal: 4,
    oxycodone_oral: 1.5,
    sufentanil: 3,
  };
  const multiplier = multipliers[drug];
  if (multiplier === undefined) return 0;
  return Math.round(dose * multiplier);
}

/**
 * Street fentanyl conversion.
 * points × (percentage × 100)
 * percentage is entered as e.g. 4.4 meaning 4.4%
 */
export function calculateStreetFentanyl(
  points: number,
  percentage: number
): number {
  points = Math.max(0, points);
  percentage = Math.max(0, percentage);
  return Math.round(points * (percentage * 100));
}

/** All drugs supported by the calculator. */
export interface DrugInput {
  id: string;
  label: string;
  unit: string;
  placeholder: string;
}

export const DRUGS: DrugInput[] = [
  {
    id: "hydromorphone_oral",
    label: "Hydromorphone Oral",
    unit: "mg",
    placeholder: "Daily dose (mg)",
  },
  {
    id: "hydromorphone_iv",
    label: "Hydromorphone IV",
    unit: "mg",
    placeholder: "Daily dose (mg)",
  },
  {
    id: "morphine_oral",
    label: "Morphine - Oral",
    unit: "mg",
    placeholder: "Daily dose (mg)",
  },
  {
    id: "methadone",
    label: "Methadone",
    unit: "mg",
    placeholder: "Daily dose (mg)",
  },
  {
    id: "fentanyl_transdermal",
    label: "Fentanyl - Transdermal",
    unit: "mcg/hr",
    placeholder: "Daily dose (mcg/hr)",
  },
  {
    id: "oxycodone_oral",
    label: "Oxycodone - Oral",
    unit: "mg",
    placeholder: "Daily dose (mg)",
  },
  {
    id: "sufentanil",
    label: "Sufentanil - IV/SC",
    unit: "mcg",
    placeholder: "Daily dose (mcg)",
  },
];
