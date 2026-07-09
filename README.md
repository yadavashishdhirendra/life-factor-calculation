# Parental Legacy & Life Factors Calculator

A modern React assessment project that calculates Mother and Father life-factor values from a user's date of birth, visualizes the comparison, and supports local saving plus CSV/PDF exports.

## Overview

The calculator uses the selected day of the month to determine parental weighting:

- Odd days favor Mother values.
- Even days favor Father values.
- Every factor displays Mother, Father, and combined Total values.
- Mother Total + Father Total is always exactly `100.000`.

The app is implemented as a frontend-only full-stack-style solution using `localStorage` for persistence.

## Features

- Date of birth picker using `react-datepicker`
- Invalid and future-date validation
- Automatic calculation on DOB selection
- Seven required life factors with configured min/max ranges
- Mother Total, Father Total, and Grand Total display
- Higher parental legacy indicator
- Responsive table and mobile-friendly chart layout
- Chart.js stacked bar and line visual comparison
- Lazy-loaded result sections with loaders
- Top-center animated toast messages with status icons for user actions
- Loading states while files are generated
- Export results as CSV
- Export results as PDF
- Save recent results in `localStorage`
- Dark/light mode toggle
- Global Montserrat typography

## Tech Stack

- React.js
- Vite
- Chart.js
- React Chart.js 2
- React Datepicker
- jsPDF
- Lucide React
- CSS3
- localStorage

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
