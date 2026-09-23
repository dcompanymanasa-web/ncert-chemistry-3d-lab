export interface QuizQuestion {
  id: string;
  activityNumber: string;
  question: string;
  type: 'mcq' | 'equation_order' | 'observation' | 'classification';
  options: string[];
  correctIndex: number;
  ncertReference: string;
  explanation: string;
}

export const NCERT_QUIZ_QUESTIONS: QuizQuestion[] = [
  // Activity 1.1
  {
    id: "q-1.1a",
    activityNumber: "Activity 1.1",
    question: "Why is a magnesium ribbon cleaned with sandpaper before burning in air according to NCERT Activity 1.1?",
    type: "mcq",
    options: [
      "To make the ribbon shiny for visual appeal",
      "To remove the protective layer of basic magnesium carbonate and oxide",
      "To increase the mass of magnesium before weighing",
      "To make it soft enough to bend into a coil"
    ],
    correctIndex: 1,
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.1, Page 2",
    explanation: "Magnesium ribbon is cleaned with sandpaper to remove the passivating layer of basic magnesium carbonate [MgCO₃·Mg(OH)₂] and magnesium oxide formed by reaction with moist air, so that the underlying pure metal can burn freely."
  },
  {
    id: "q-1.1b",
    activityNumber: "Activity 1.1",
    question: "What is the visual observation when magnesium ribbon burns in air and what is the chemical nature of the ash formed?",
    type: "observation",
    options: [
      "Burns with a smoky yellow flame forming black acidic ash",
      "Burns with a pale blue flame forming green neutral crystals",
      "Burns with a dazzling white flame forming white basic magnesium oxide powder",
      "Glows red without a flame and melts into liquid magnesium"
    ],
    correctIndex: 2,
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.1, Page 2",
    explanation: "Magnesium burns with an intense, dazzling white flame, forming a fine white powder of magnesium oxide (MgO), which is basic in nature."
  },

  // Activity 1.2
  {
    id: "q-1.2",
    activityNumber: "Activity 1.2",
    question: "When potassium iodide solution is added to a test tube containing lead nitrate solution, what observation and reaction type are witnessed?",
    type: "observation",
    options: [
      "A bright yellow precipitate forms; Double Displacement (Precipitation)",
      "Vigorous bubbling of brown gas; Thermal Decomposition",
      "A deep blue solution forms with no precipitate; Combination",
      "A white effervescence that turns lime water milky; Redox"
    ],
    correctIndex: 0,
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.1, Page 2",
    explanation: "Mixing colourless solutions of lead(II) nitrate and potassium iodide instantly forms an insoluble canary-yellow precipitate of lead(II) iodide (PbI₂), exemplifying a double displacement precipitation reaction."
  },

  // Activity 1.3
  {
    id: "q-1.3",
    activityNumber: "Activity 1.3",
    question: "During the reaction between zinc granules and dilute sulphuric acid in Activity 1.3, how is the evolved gas identified and what temperature change occurs?",
    type: "mcq",
    options: [
      "Oxygen gas that rekindles a glowing splint; temperature decreases",
      "Carbon dioxide gas that turns lime water milky; temperature remains constant",
      "Hydrogen gas that burns with a 'pop' sound; temperature increases (exothermic)",
      "Nitrogen gas that extinguishes a candle; temperature drops sharply"
    ],
    correctIndex: 2,
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.1, Pages 2–3",
    explanation: "Zinc displaces hydrogen from dilute acid, releasing colourless H₂ gas which burns with a sharp 'pop' sound. The conical flask becomes warm, indicating an exothermic displacement reaction."
  },

  // Activity 1.4
  {
    id: "q-1.4",
    activityNumber: "Activity 1.4",
    question: "When water is slowly added to calcium oxide (quicklime) in a beaker, which statement correctly describes the process?",
    type: "classification",
    options: [
      "It is an endothermic decomposition reaction forming calcium carbonate",
      "It is an exothermic combination reaction forming slaked lime Ca(OH)₂ with hissing sound and heat",
      "It is a displacement reaction liberating toxic hydrogen gas",
      "No reaction takes place until heated to 500°C"
    ],
    correctIndex: 1,
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.2.1, Page 6",
    explanation: "CaO combines with H₂O to form a single product, calcium hydroxide [Ca(OH)₂], releasing a large amount of heat with a hissing sound. This is a combination and exothermic reaction."
  },

  // Activity 1.5
  {
    id: "q-1.5",
    activityNumber: "Activity 1.5",
    question: "What are the two acidic gases released during the thermal decomposition of green ferrous sulphate crystals in Activity 1.5?",
    type: "mcq",
    options: [
      "Carbon monoxide (CO) and carbon dioxide (CO₂)",
      "Nitrogen dioxide (NO₂) and oxygen (O₂)",
      "Sulphur dioxide (SO₂) and sulphur trioxide (SO₃)",
      "Hydrogen sulphide (H₂S) and chlorine (Cl₂)"
    ],
    correctIndex: 2,
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.2.2, Page 8",
    explanation: "When green FeSO₄ crystals are heated, they turn reddish-brown (Fe₂O₃) and emit choking fumes of sulphur dioxide (SO₂) and sulphur trioxide (SO₃) with the characteristic pungent odour of burning sulphur."
  },

  // Activity 1.6
  {
    id: "q-1.6",
    activityNumber: "Activity 1.6",
    question: "When white lead nitrate powder is heated in a boiling tube, what causes the dense reddish-brown fumes and what is the yellow residue?",
    type: "observation",
    options: [
      "Brown fumes are NO₂; yellow residue is PbO (lead monoxide)",
      "Brown fumes are Br₂; yellow residue is sulphur",
      "Brown fumes are I₂ vapour; yellow residue is potassium oxide",
      "Brown fumes are chlorine gas; yellow residue is lead nitrate"
    ],
    correctIndex: 0,
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.2.2, Page 8",
    explanation: "Thermal decomposition of lead nitrate: 2Pb(NO₃)₂ → 2PbO + 4NO₂ + O₂. The brown fumes are nitrogen dioxide (NO₂) gas, and the yellow residue remaining in the boiling tube is lead(II) oxide (PbO)."
  },

  // Activity 1.7
  {
    id: "q-1.7",
    activityNumber: "Activity 1.7",
    question: "In the electrolysis of water (Activity 1.7), why is the volume of gas collected at the cathode twice that collected at the anode?",
    type: "mcq",
    options: [
      "Hydrogen is heavier than oxygen",
      "A water molecule contains two hydrogen atoms for every one oxygen atom (H₂O)",
      "The battery supplies more voltage to the negative electrode",
      "Oxygen is absorbed by the plastic container"
    ],
    correctIndex: 1,
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.2.2, Page 9",
    explanation: "Water decomposes according to 2H₂O(l) → 2H₂(g) + O₂(g). The 2:1 stoichiometric molar ratio means 2 volumes of hydrogen gas are collected at the cathode for every 1 volume of oxygen gas at the anode."
  },

  // Activity 1.8
  {
    id: "q-1.8",
    activityNumber: "Activity 1.8",
    question: "Why is silver chloride stored in dark-coloured bottles, and what happens when it is placed in sunlight?",
    type: "classification",
    options: [
      "To prevent moisture; it turns blue in sunlight",
      "To prevent photodecomposition; it turns grey in sunlight forming silver metal and chlorine gas",
      "To keep it cold; it turns green in sunlight",
      "To prevent oxidation; it melts into liquid silver"
    ],
    correctIndex: 1,
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.2.2, Pages 9–10",
    explanation: "Silver chloride undergoes photolytic decomposition in the presence of sunlight (2AgCl → 2Ag + Cl₂). White AgCl decomposes into grey metallic silver, hence it must be stored in dark bottles."
  },

  // Activity 1.9
  {
    id: "q-1.9",
    activityNumber: "Activity 1.9",
    question: "When iron nails are dipped in blue copper sulphate solution for 20 minutes, what colour changes occur to the solution and the iron nails?",
    type: "observation",
    options: [
      "Solution turns colourless; nails turn white",
      "Solution turns pale green; nails acquire a reddish-brown copper coating",
      "Solution turns dark purple; nails dissolve completely with no coating",
      "Solution remains blue; nails turn yellow"
    ],
    correctIndex: 1,
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.2.3, Pages 10–11",
    explanation: "Iron displaces copper: Fe + CuSO₄ → FeSO₄ + Cu. Fe²⁺ ions turn the solution light green, while displaced copper metal deposits onto the nail as a reddish-brown coating."
  },

  // Activity 1.10
  {
    id: "q-1.10",
    activityNumber: "Activity 1.10",
    question: "Which chemical compound precipitates as an insoluble white solid when sodium sulphate and barium chloride solutions are mixed?",
    type: "mcq",
    options: [
      "Sodium chloride (NaCl)",
      "Barium sulphate (BaSO₄)",
      "Sodium oxide (Na₂O)",
      "Barium sulphite (BaSO₃)"
    ],
    correctIndex: 1,
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.2.4, Pages 11–12",
    explanation: "In this double displacement reaction, Ba²⁺ and SO₄²⁻ ions combine to form an insoluble white precipitate of barium sulphate (BaSO₄)."
  },

  // Activity 1.11
  {
    id: "q-1.11",
    activityNumber: "Activity 1.11",
    question: "In Activity 1.11, heating reddish-brown copper powder in air turns it black. Passing hydrogen gas over this heated black substance turns it reddish-brown again. What does this demonstrate?",
    type: "classification",
    options: [
      "Only physical changes without chemical reactions",
      "A reversible redox reaction: Cu is oxidised to black CuO, then CuO is reduced back to Cu by H₂",
      "Decomposition of copper into hydrogen and carbon",
      "A precipitation reaction forming copper hydroxide"
    ],
    correctIndex: 1,
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.2.5, Pages 12–13",
    explanation: "Copper gains oxygen to form black CuO (oxidation: 2Cu + O₂ → 2CuO). When H₂ is passed over hot CuO, CuO loses oxygen to become Cu (reduction) while H₂ gains oxygen to become H₂O (oxidation), showing a classic redox reaction."
  }
];
