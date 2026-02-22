"use client";

import { useState, useCallback } from "react";
import {
  DRUGS,
  calculateMEQ,
  methadoneMEQ,
  calculateStreetFentanyl,
} from "@/lib/conversions";

export default function Calculator() {
  const [doses, setDoses] = useState<Record<string, string>>({});
  const [streetPoints, setStreetPoints] = useState("");
  const [streetPct, setStreetPct] = useState("4.4");

  const updateDose = useCallback((id: string, value: string) => {
    setDoses((prev) => ({ ...prev, [id]: value }));
  }, []);

  const resetAll = useCallback(() => {
    setDoses({});
    setStreetPoints("");
    setStreetPct("4.4");
  }, []);

  // Calculate MEQ for each drug
  const meqValues: Record<string, number> = {};
  let subtotal = 0;

  for (const drug of DRUGS) {
    const raw = parseFloat(doses[drug.id] || "");
    const dose = isNaN(raw) ? 0 : raw;

    let meq: number;
    if (drug.id === "methadone") {
      meq = Math.round(methadoneMEQ(dose));
    } else {
      meq = calculateMEQ(drug.id, dose);
    }
    meqValues[drug.id] = meq;
    subtotal += meq;
  }

  // Street fentanyl
  const sfPoints = parseFloat(streetPoints) || 0;
  const sfPct = parseFloat(streetPct) || 0;
  const streetMEQ = calculateStreetFentanyl(sfPoints, sfPct);

  const totalMEQ = subtotal + streetMEQ;

  return (
    <main className="min-h-screen pb-8">
      <div className="mx-auto max-w-3xl px-4 pt-6 sm:pt-10">
        <h1 className="mb-6 text-center text-2xl font-bold text-primary sm:text-3xl">
          Morphine Equivalence Calculator
        </h1>

        {/* Drug conversion card */}
        <div className="rounded-xl bg-surface shadow-md p-4 sm:p-6 mb-6">
          {/* Header row */}
          <div className="hidden sm:grid sm:grid-cols-[1fr_140px] gap-4 mb-2 px-1">
            <span className="text-sm font-semibold text-primary">
              Drug / Dose
            </span>
            <span className="text-sm font-semibold text-primary text-right">
              MEQ (mg)
            </span>
          </div>

          <div className="space-y-3">
            {DRUGS.map((drug) => (
              <div
                key={drug.id}
                className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-2 sm:gap-4 items-center"
              >
                {/* Input side */}
                <div>
                  <label
                    htmlFor={drug.id}
                    className="block text-sm font-semibold mb-1 text-text"
                  >
                    {drug.label}{" "}
                    <span className="font-normal text-text/60">
                      ({drug.unit})
                    </span>
                  </label>
                  <input
                    id={drug.id}
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    placeholder={drug.placeholder}
                    value={doses[drug.id] || ""}
                    onChange={(e) => updateDose(drug.id, e.target.value)}
                    className="w-full rounded-lg border border-primary/30 bg-white px-3 py-2.5 text-base
                               placeholder:text-text/40 focus:border-secondary focus:ring-2 focus:ring-secondary/30
                               focus:outline-none transition-all"
                  />
                </div>

                {/* MEQ output */}
                <div className="flex items-center sm:items-end sm:pb-0.5">
                  <span className="text-sm font-semibold text-text/60 sm:hidden mr-2">
                    MEQ:
                  </span>
                  <div
                    className="w-full rounded-lg bg-meq-bg px-3 py-2.5 text-base font-semibold
                                  text-primary text-right tabular-nums"
                  >
                    {meqValues[drug.id]} mg
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal bar */}
          <div className="mt-4 rounded-lg bg-primary/10 px-4 py-3 flex justify-between items-center">
            <span className="font-semibold text-primary">
              Subtotal Morphine Equivalence
            </span>
            <span className="text-xl font-bold text-primary tabular-nums">
              {subtotal} mg
            </span>
          </div>
        </div>

        {/* Street Fentanyl card */}
        <div className="rounded-xl bg-surface shadow-md p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-bold text-secondary mb-3">
            Street Fentanyl Conversion
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="streetPoints"
                className="block text-sm font-semibold mb-1"
              >
                Points
              </label>
              <input
                id="streetPoints"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                placeholder="Enter points"
                value={streetPoints}
                onChange={(e) => setStreetPoints(e.target.value)}
                className="w-full rounded-lg border border-primary/30 bg-white px-3 py-2.5 text-base
                           placeholder:text-text/40 focus:border-secondary focus:ring-2 focus:ring-secondary/30
                           focus:outline-none transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="streetPct"
                className="block text-sm font-semibold mb-1"
              >
                Percentage (%)
              </label>
              <input
                id="streetPct"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                placeholder="4.4% (Default)"
                value={streetPct}
                onChange={(e) => setStreetPct(e.target.value)}
                className="w-full rounded-lg border border-primary/30 bg-white px-3 py-2.5 text-base
                           placeholder:text-text/40 focus:border-secondary focus:ring-2 focus:ring-secondary/30
                           focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">MEQ</label>
              <div
                className="w-full rounded-lg bg-meq-bg px-3 py-2.5 text-base font-semibold
                              text-primary text-right tabular-nums"
              >
                {streetMEQ} mg
              </div>
            </div>
          </div>
        </div>

        {/* Total MEQ bar */}
        <div className="rounded-xl bg-primary px-4 sm:px-6 py-4 flex justify-between items-center mb-6 shadow-lg">
          <span className="text-lg font-bold text-white">
            Total Morphine Equivalence
          </span>
          <span className="text-2xl font-bold text-white tabular-nums">
            {totalMEQ} mg
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 no-print">
          <button
            onClick={resetAll}
            className="rounded-lg bg-text/10 px-6 py-2.5 text-sm font-semibold text-text
                       hover:bg-text/20 active:scale-95 transition-all cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={() => window.print()}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white
                       hover:bg-primary-dark active:scale-95 transition-all cursor-pointer"
          >
            Print Results
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 border-t border-text/10 bg-surface py-6">
        <div className="mx-auto max-w-3xl px-4 space-y-3 text-sm text-text/70 leading-relaxed">
          <p>
            <strong>Disclaimer:</strong> The information provided by the
            Morphine Equivalence Calculator is for general informational
            purposes only. It is not intended to be a substitute for
            professional medical advice, diagnosis, or treatment.{" "}
            <a href="#disclaimer" className="text-primary hover:underline">
              Read more
            </a>
          </p>
          <p>
            <strong>Privacy Policy:</strong> This website collects no personal
            data from its users, except for anonymous analytics.{" "}
            <a href="#privacy" className="text-primary hover:underline">
              Read more
            </a>
          </p>
          <p>
            <strong>Terms of Use:</strong> By using our website, you agree to
            comply with and be bound by our terms of use.{" "}
            <a href="#terms" className="text-primary hover:underline">
              Read more
            </a>
          </p>
          <p>
            <strong>Accessibility Statement:</strong> We are committed to
            ensuring digital accessibility for people with disabilities.{" "}
            <a href="#accessibility" className="text-primary hover:underline">
              Read more
            </a>
          </p>
          <p>
            If you have any questions or concerns about our tool, please contact
            us at{" "}
            <a
              href="mailto:MECConversion@gmail.com"
              className="text-primary hover:underline"
            >
              MECConversion@gmail.com
            </a>
            .
          </p>
        </div>
      </footer>
    </main>
  );
}
