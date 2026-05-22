# Premium Responsive Tip Calculator & Bill Splitter

A highly polished, live-updating single-screen web application built for the fellowship technical assessment. The application manages real-time split-billing arithmetic dynamically with granular user input validation and complete layout shift safety.

🌐 **Live Deployed URL:** [https://tip-calculator-psi-olive.vercel.app/](https://tip-calculator-psi-olive.vercel.app/)

---

## ✨ Features Built into the Application

- **Zero-Latency Dynamic Calculations:** Eliminates the need for traditional "Calculate" submit buttons. React state automatically catches and recalibrates outputs instantly upon keystrokes.
- **Enforced Venue-Safe Rounding Policy:** Solves precision flaws by ensuring group splits are cleanly structured using a ceiling-based rounding strategy (`Math.ceil(value * 100) / 100`). The group will never underpay the restaurant venue by fractional pennies/paisas.
- **Anti-Flicker Layout Shift Protection:** All field error messages are contained within absolute-positioned blocks or reserved static heights. Error messaging toggles naturally without jarringly bouncing or shifting the rest of the UI layout down.
- **Advanced Keystroke Disruption Sanitization:** Hardened input handling intercepts native HTML number input quirks—strictly preventing edge-case bugs caused by entering symbols like `e`, `E`, `+`, `-`, or decimal points inside integer fields.
- **Multi-Theme Experience & Adaptive Currency:** Built-in semantic premium customization bar supporting switching between multiple color themes (Emerald, Sky, Slate) and regional symbols (Rs., ₹, $, €).
- **Responsive Adaptive Interface:** Seamless breakpoints shifting cleanly from a mobile single-column stacked view (optimized for small 360px devices) up to a beautiful side-by-side split container layout on widescreen loptops (1440px).

---

## 🛠️ Tech Stack & Design Choices

- **Core Library:** React 18 (Functional components with hooks like `useState` and `useEffect`)
- **Build Tool / Bundle Compiler:** Vite (Optimized for ultra-fast Hot Module Replacement)
- **Styling Layer:** Standard vanilla CSS3 implementing custom CSS variables (`:root`) for modern real-time global theme toggling.
- **Accessibility Integration:** Full semantic HTML mapping with linked `<label>` blocks, custom `:focus-visible` ring parameters for keyboard-only navigation accessibility, and explicit `inputMode` mobile keypads.

---

## 🚀 How to Run the Project Locally

Follow these quick steps to pull down and launch the development environment on your computer:

### 1. Pre-requisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Install Dependencies
Open your system terminal inside the root directory where the `package.json` file resides and execute:
```bash
npm install