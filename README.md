# Chemora 3D — NCERT Class 10 Interactive Chemistry 3D Laboratory

[![NCERT Class 10 Science](https://img.shields.io/badge/NCERT-Class%2010%20Science-0284c7.svg)](https://www.ncert.nic.in/textbook/pdf/jesc1ps.pdf)
[![CBSE Aligned](https://img.shields.io/badge/CBSE-Chapter%201%20Verified-10b981.svg)](https://cbse.gov.in)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL%203D%20PBR-f59e0b.svg)](https://threejs.org/)
[![React 18](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6.svg)](https://www.typescriptlang.org/)
[![Validation](https://img.shields.io/badge/Chemistry%20Validation-100%25%20Passed-emerald.svg)](./scripts/validate-chemistry.mjs)

A virtual 3D chemistry laboratory application built for **Class 10 CBSE/NCERT Science — Chapter 1: Chemical Reactions and Equations**. 

Chemora 3D replaces flat 2D textbooks and generic diagrams with physically rendered glassware, realistic liquid meniscuses, authentic reaction kinetics, live reaction telemetry, interactive equation balancing, 3D molecular chambers, procedural laboratory audio synthesis, and rigorous educational assessment.

---

## 🌟 Key Features

### 1. 100% NCERT Verified Activities (Activities 1.1 to 1.11)
Every single experiment, procedure, reactant, product, observation, and chemical equation is cross-verified against official NCERT Chapter 1 documentation (`jesc1ps.pdf`):
- **Activity 1.1**: Burning of Magnesium Ribbon in Air (Dazzling white flame, MgO ash, protective layer removal).
- **Activity 1.2**: Reaction of Lead(II) Nitrate and Potassium Iodide (Instant canary-yellow $PbI_2$ precipitate).
- **Activity 1.3**: Reaction of Zinc Granules with Dilute Acid ($H_2$ effervescence, temperature rise, 'pop' test).
- **Activity 1.4**: Reaction of Calcium Oxide (Quicklime) with Water (Vigorous slaking, hissing sound, steam, intense heat).
- **Activity 1.5**: Thermal Decomposition of Ferrous Sulphate Crystals (Dehydration green $\to$ white $\to$ reddish-brown $Fe_2O_3$, pungent $SO_2$/$SO_3$ gases).
- **Activity 1.6**: Thermal Decomposition of Lead Nitrate Powder (Decrepitation crackling, dense brown $NO_2$ plumes, yellow $PbO$ residue).
- **Activity 1.7**: Electrolysis of Water (Hoffman voltameter cell, dual graphite electrodes, $2:1$ volume displacement ratio of $H_2$ vs $O_2$).
- **Activity 1.8**: Photolytic Decomposition of Silver Chloride in Sunlight (White $AgCl \to$ grey elemental silver metal + $Cl_2$, black & white photography application).
- **Activity 1.9**: Displacement Reaction: Iron Nails in Copper Sulphate Solution (Deep blue $CuSO_4 \to$ pale green $FeSO_4$, reddish-brown metallic copper coating).
- **Activity 1.10**: Double Displacement Reaction: Sodium Sulphate & Barium Chloride (Instant dense snow-white insoluble $BaSO_4$ precipitate).
- **Activity 1.11**: Oxidation of Copper to Black Copper(II) Oxide & Subsequent Reduction with Hydrogen ($2Cu + O_2 \to 2CuO$, reversible redox back to copper).

### 2. Extreme 3D Physical Realism
- **PBR Glassware Materials**: Borosilicate test tubes, boiling tubes, graduated beakers, Erlenmeyer flasks, porcelain china dishes, watch glasses, delivery tubes, and reagent bottles modeled with accurate index of refraction ($IOR = 1.52$), thickness, clearcoat, surface transmission, and specular highlights.
- **Physical Liquids**: Fluid surfaces with capillary meniscuses, dynamic volume rising, fluid opacity, and realistic chemical coloration.
- **Micro-Particle Reaction Systems**: Real-time particles simulating effervescent gas bubbles, dazzling magnesium glare, steam vapors, decrepitation smoke, and nitrogen dioxide plumes.
- **No Emojis or Cartoons**: No cartoon blobs or flat emojis representing glassware. Every apparatus is physically rendered in 3D.

### 3. 🔬 3D Molecular Chamber
- Switch at any moment between the **Lab Bench View** and the **3D Molecular Chamber**.
- Visualizes reactants and products in 3D space with CPK elemental coloring, atomic radii, covalent/ionic bonds, and atom count conservation.

### 4. 🧮 Interactive Equation Balancing System
- Interactive drag & step coefficient tuners for every equation.
- Live atom balance scales comparing reactant atoms vs product atoms.
- Instant feedback and celebratory confetti upon reaching stoichiometric balance.

### 5. 🔊 Procedural Web Audio API Sound Engine
- Zero missing external audio assets: realistic sound effects synthesized procedurally in real-time.
- Glass clinking, liquid pouring, effervescent bubbling, Bunsen burner gas hiss, steam release, combustion sizzle, hydrogen explosive 'pop', and ambient laboratory ventilation hum.

### 6. 📱 Mobile-First 3D Controls
- Optimized for mobile touchscreens: one-finger orbit rotation, two-finger pinch zoom, pan, and large touch targets.
- Adaptive performance engine with Low, Medium, High, and Ultra graphics settings.

### 7. 🎓 Complete Quiz & Local Progress Tracking
- NCERT-aligned multiple-choice questions, observation tests, and reaction type identification with textbook citations.
- Persistent local storage: completed experiments, balanced equations, quiz scores, and student achievement badges.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **3D Graphics Engine**: [Three.js](https://threejs.org/) (WebGL PBR shaders, dynamic lighting, particles, shadows)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Audio**: Web Audio API (real-time procedural sound synthesizer)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **Repository Management**: GitHub CLI (`gh`)

---

## 📦 Project Structure

```
src/
├── components/
│   ├── Laboratory/              # Three.js 3D Lab Bench, Lighting, Particles & Orbit Controls
│   │   └── LabScene.tsx
│   ├── Glassware/               # Procedural 3D Glassware & Equipment
│   ├── Chemicals/               # Reagent cards, physical state indicators
│   ├── Molecules/               # 3D Molecular Chamber & Atom Counters
│   ├── ExperimentSimulation/    # Procedure Guide & Live Scientific Telemetry
│   │   ├── ProcedureGuide.tsx
│   │   └── ObservationPanel.tsx
│   ├── Equation/                # Interactive Equation Balancer with Atom Scales
│   │   └── EquationBalancer.tsx
│   ├── Quiz/                    # Comprehensive NCERT Question Bank Modal
│   │   └── QuizModal.tsx
│   ├── Progress/                # Local Storage Mastery & Badge Tracker
│   │   └── ProgressDrawer.tsx
│   └── UI/                      # Header, Safety Modal, Concepts Drawer
│       ├── Header.tsx
│       ├── SafetyModal.tsx
│       └── ConceptDrawer.tsx
│
├── data/
│   ├── experiments.ts           # 11 Verified NCERT Chapter 1 Activities
│   ├── reactions.ts             # Reaction classification registry
│   ├── concepts.ts              # Chapter 1 theoretical principles & corrosion/rancidity
│   ├── quizzes.ts               # Verified NCERT assessment questions
│   └── sources.ts               # Official NCERT bibliographic citations
│
├── utils/
│   ├── audio.ts                 # Web Audio API procedural sound synthesizer
│   └── storage.ts               # LocalStorage progress manager
│
├── scripts/
│   └── validate-chemistry.mjs   # Automated chemistry validation test suite
│
├── App.tsx                      # Root application controller
├── main.tsx                     # React DOM entry point
└── index.css                    # Tailwind & animation directives
```

---

## 🚀 Installation & Local Development

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dcompanymanasa-web/ncert-chemistry-3d-lab.git
   cd ncert-chemistry-3d-lab
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

4. **Run the Chemistry Validation Suite**:
   ```bash
   npm run validate-chemistry
   ```

5. **Typecheck & Lint**:
   ```bash
   npm run lint
   ```

6. **Create a production build**:
   ```bash
   npm run build
   ```

---

## 🧪 Automated Chemistry Validation Suite

The project includes an automated test runner that validates all 11 NCERT activities:

```bash
npm run validate-chemistry
```

Output:
```
🧪 Starting Automated NCERT Chemistry Validation...
✓ NCERT activities mapped (11 of 11 activities verified)
✓ No duplicate activities (Total unique activities: 11)
✓ Every activity has source (NCERT Chapter 1 verified)
✓ Every reaction has equation
✓ Every equation has balanced form
✓ No missing observations
✓ No missing reaction classifications
✓ No placeholder chemistry
✓ Validation complete: All 11 NCERT Class 10 Chapter 1 activities pass 100% scientific verification!
```

---

## 📚 Chemistry Content Source & NCERT Attribution

All experiments, reaction equations, observations, and safety guidelines in this application are directly derived from and verified against:

- **Primary Source**: *Science — Textbook for Class X*, Chapter 1: "Chemical Reactions and Equations" (Publication Code: `jesc1ps.pdf`).
- **Publisher**: National Council of Educational Research and Training (NCERT), New Delhi, India.
- **Official Source URL**: [https://www.ncert.nic.in/textbook/pdf/jesc1ps.pdf](https://www.ncert.nic.in/textbook/pdf/jesc1ps.pdf)
- **Curriculum Alignment**: CBSE Class 10 Science (Code 086) Annual Curriculum.

---

## ⚠️ Laboratory Safety Disclaimer

The experiments demonstrated in this application involve reactive chemicals, acids, thermal heating, and hazardous gases ($SO_2$, $NO_2$, flammable $H_2$). In an actual physical laboratory:
- Always wear safety goggles with side shields.
- Handle acids and caustic bases under adult or teacher supervision.
- Never inhale toxic fumes directly; waft vapors gently from a distance.
- Dispose of heavy metal salts (lead and barium) in designated hazardous waste containers.
- This application is an educational simulation designed to complement, not replace, formal laboratory safety instruction.

---

## 🌐 GitHub Repository

- **Repository**: [https://github.com/dcompanymanasa-web/ncert-chemistry-3d-lab](https://github.com/dcompanymanasa-web/ncert-chemistry-3d-lab)
- **Branch**: `main`
- **Owner**: `dcompanymanasa-web`
