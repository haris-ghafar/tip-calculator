# Technical Assessment Answers — Tip Calculator

This document contains the engineering rationale, architectural patterns, and accessibility configurations implemented for the Dev Weekends Fellowship 2026 application.

---

### 1. How to Run

To execute this project locally on a clean machine, follow these steps:

1. **Clone the Repository:** Download or clone this project folder to your local drive.
2. **Install Node Modules:** Open your terminal in the root directory and run:
   ```bash
   npm install
Launch Development Server: Boot up the application using Vite's local compiler:

Bash
npm run dev
Access via Browser: Open your browser and navigate to http://localhost:5173/.

🌐 Live Production URL: https://tip-calculator-psi-olive.vercel.app/



2. Stack & Design Choices
Technical Stack Selection
I selected React (with Vite) as the frontend framework stack. This application strictly requires live-updating calculations with zero-latency responses as the user strikes a key. React's state reactivity system tracks data entry dynamically and re-calculates the arithmetic layout smoothly without relying on outdated submit or "Calculate" buttons. Vite was selected as the build bundle tool to provide instant Hot Module Replacement (HMR) and an optimized single-page build footprint.



3. Responsive & Accessibility
Viewport Behavior (360px vs. 1440px)
At 360px (Mobile Viewports): The grid structure shifts dynamically. Input fields and output blocks stack in a single column to ensure maximum vertical scrolling efficiency, and the custom tip preset buttons adapt to a 2x2 grid layout providing comfortable finger-touch bounds.

At 1440px (Desktop Widescreen): The structure realigns into an explicit 2-column spatial card container. The results block anchors securely next to the fields for side-by-side analysis.




I utilized AI as an interactive structural architect, component boundaries consultant, and strict cross-platform edge-case QA checker throughout the engineering phase.

Specific Code Customization Example
When building out the validation and input safety structures, the AI initially generated standard HTML numeric handling structures using basic inline attributes like type="number". However, native browser inputs have a significant quirk—they still allow users to type or paste characters like e, E, +, -, or decimal points inside fields that require flat whole integers (like the number of people)




5. Honest Gap
If granted an extra day of development, I would focus on polishing the Micro-interactions and Component Transitions. Currently, validation warning alerts and output numbers update instantly.

I would incorporate a specialized layout utility like Framer Motion or lightweight CSS keyframe tracking to allow error messages to smoothly slide and fade down, and apply a rolling digit animation to the currency numbers when they recalculate. This would elevate the app from a clean utility to an elite, production-grade interface.
