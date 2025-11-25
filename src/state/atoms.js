import { atom } from 'jotai';

// --- Input Atoms ---
// Each atom represents a user input field.
// We initialize with empty string or 0 depending on desired UX, 
// but empty string allows for "placeholder" behavior.

export const hmoAtom = atom(''); // Hydromorphone Oral
export const hmivAtom = atom(''); // Hydromorphone IV
export const kadianAtom = atom(''); // Morphine Oral (Kadian)
export const methadoneAtom = atom(''); // Methadone
export const fentanylAtom = atom(''); // Fentanyl Transdermal
export const oxycodoneAtom = atom(''); // Oxycodone Oral
export const sufentanilAtom = atom(''); // Sufentanil IV/SC

// Street Fentanyl
export const streetFentanylPtsAtom = atom(''); // Points
export const streetFentanylPctAtom = atom(4.4); // Percentage (default 4.4)

// --- Theme Atom ---
export const themeAtom = atom('light'); // 'light' or 'dark'

// --- Helper Functions ---

const safeParse = (val) => {
    const parsed = parseFloat(val);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
};

const calculateMethadoneMEQ = (dose) => {
    if (dose >= 61) return dose * 12;
    if (dose >= 41) return dose * 10;
    if (dose >= 21) return dose * 8;
    if (dose >= 1) return dose * 4;
    return 0;
};

// --- Derived Atom (Selector) ---
// Calculates all MEQs and the total.

export const resultsAtom = atom((get) => {
    const hmo = safeParse(get(hmoAtom));
    const hmiv = safeParse(get(hmivAtom));
    const kadian = safeParse(get(kadianAtom));
    const methadone = safeParse(get(methadoneAtom));
    const fentanyl = safeParse(get(fentanylAtom));
    const oxycodone = safeParse(get(oxycodoneAtom));
    const sufentanil = safeParse(get(sufentanilAtom));

    const sfPts = safeParse(get(streetFentanylPtsAtom));
    const sfPct = safeParse(get(streetFentanylPctAtom));

    // Individual MEQ Calculations
    const hmoMEQ = hmo * 4;
    const hmivMEQ = hmiv * 5;
    const kadianMEQ = kadian; // 1:1
    const methadoneMEQ = calculateMethadoneMEQ(methadone);
    const fentanylMEQ = fentanyl * 4; // Note: legacy said * 4 for transdermal? usually it's different but sticking to legacy code.
    // Legacy: if (fentanyl > 0) fentanylMEQ = fentanyl * 4;

    const oxycodoneMEQ = oxycodone * 1.5;
    const sufentanilMEQ = sufentanil * 3; // 1 mcg = 3 mg morphine (Legacy: sufentanil * 3)

    // Street Fentanyl
    // Legacy: Math.round(SfentanylPts * (SfentanylPct * 100))
    const streetFentanylMEQ = sfPts * (sfPct * 100);

    // Rounding individual results for display (as per legacy behavior which rounds for display)
    // However, for total, legacy sums the ROUNDED values.
    // "let subtotal = Math.round(parseFloat(m0)) + ..."

    const results = {
        hmo: Math.round(hmoMEQ),
        hmiv: Math.round(hmivMEQ),
        kadian: Math.round(kadianMEQ),
        methadone: Math.round(methadoneMEQ),
        fentanyl: Math.round(fentanylMEQ),
        oxycodone: Math.round(oxycodoneMEQ),
        sufentanil: Math.round(sufentanilMEQ),
        streetFentanyl: Math.round(streetFentanylMEQ),
    };

    const total =
        results.hmo +
        results.hmiv +
        results.kadian +
        results.methadone +
        results.fentanyl +
        results.oxycodone +
        results.sufentanil +
        results.streetFentanyl;

    return { ...results, total };
});
