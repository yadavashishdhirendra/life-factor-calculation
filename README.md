# Parental Legacy & Life Factors Calculator

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=111827)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=ffffff)
![Chart.js](https://img.shields.io/badge/Chart.js-4-FF6384?logo=chartdotjs&logoColor=ffffff)
![Lucide](https://img.shields.io/badge/Lucide-Icons-0F766E)
![LocalStorage](https://img.shields.io/badge/Persistence-localStorage-334155)

A modern React assessment project that calculates Mother and Father life-factor values from a user's date of birth, visualizes the comparison, and supports local saving plus CSV/PDF exports.

## Overview

The calculator uses the selected day of the month to determine parental weighting:

| Rule | Behavior |
| --- | --- |
| Mother weighting | Odd days favor Mother values. |
| Father weighting | Even days favor Father values. |
| Factor totals | Every factor displays Mother, Father, and combined Total values. |
| Grand total | Mother Total + Father Total is always exactly `100.000`. |

The app is implemented as a frontend-only full-stack-style solution using `localStorage` for persistence.

## Features

| Area | Details |
| --- | --- |
| Input | Date of birth picker using `react-datepicker`, with invalid and future-date validation. |
| Calculation | Automatic calculation on DOB selection across seven required life factors. |
| Results | Mother Total, Father Total, Grand Total, and higher parental legacy indicator. |
| Visualization | Responsive table plus Chart.js stacked bar and line comparison. |
| Feedback | Top-center animated toast messages with Lucide status icons. |
| Export | Loading states while generating CSV and PDF files. |
| Persistence | Save recent results in browser `localStorage`. |
| Theme | Dark/light mode toggle with global Montserrat typography. |

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React.js | Frontend UI |
| Vite | Development server and production bundling |
| Chart.js | Result visualization |
| React Chart.js 2 | React wrapper for Chart.js |
| React Datepicker | DOB selection |
| jsPDF | PDF export |
| Lucide React | Interface and toast icons |
| CSS3 | Responsive styling, themes, and animations |
| localStorage | Browser-based saved results |

## Project Structure

```text
src/
  components/
    ActionBar.jsx
    ComparisonChart.jsx
    DobPicker.jsx
    Header.jsx
    Loader.jsx
    ResultsTable.jsx
    SavedResults.jsx
    SummaryCards.jsx
    Toast.jsx
  constants/
    factors.js
  hooks/
    useSavedResults.js
  utils/
    calculator.js
    exporters.js
    format.js
  App.jsx
  main.jsx
  styles.css
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:5173
```

If Vite chooses another port, use the URL shown in the terminal.

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Calculation Rules

The app calculates values for these seven factors:

| Factor | Min | Max |
| --- | ---: | ---: |
| Genetic Inheritance | 9.333 | 10.777 |
| Constitutional Vitality | 8.111 | 9.111 |
| Mental Patterns | 6.111 | 7.111 |
| Intellectual Capacity | 6.333 | 6.999 |
| Emotional Foundation | 7.111 | 7.999 |
| Spiritual Lineage | 5.011 | 6.011 |
| Soul Connections | 5.111 | 6.222 |

Each parent value remains within the factor range, and the final Grand Total remains exactly `100.000`.

## Notes

- Backend and database are optional for this assessment, so persistence is handled with browser `localStorage`.
- PDF export is lazy-loaded so the initial app remains lighter.
- Chart and result sections are lazy-loaded with React `Suspense`.
- Toast notifications use Lucide status icons and restart their entrance animation for each new message.
