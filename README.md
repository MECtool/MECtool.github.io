# MECtool — Morphine Equivalence Calculator

A clinical tool for healthcare providers to calculate morphine equivalence doses (MEQ) for opioid medications.

Built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Installable as a PWA for offline use.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
npm run build
npm start
```

Deployed automatically on [Vercel](https://vercel.com) from the `main` branch.

## Supported Drugs

| Drug | Input Unit | Multiplier |
|------|-----------|------------|
| Hydromorphone Oral | mg | x4 |
| Hydromorphone IV | mg | x5 |
| Morphine Oral | mg | x1 |
| Methadone | mg | Tiered (1-20: x4, 21-40: x8, 41-60: x10, 61+: x12) |
| Fentanyl Transdermal | mcg/hr | x4 |
| Oxycodone Oral | mg | x1.5 |
| Sufentanil IV/SC | mcg | x3 |
| Street Fentanyl | points + % | points x (% x 100) |

## Disclaimer

The information provided by the Morphine Equivalence Calculator is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.

Contact: MECConversion@gmail.com
