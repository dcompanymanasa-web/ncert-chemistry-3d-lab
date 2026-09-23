export type ReactionType = 
  | 'Combination'
  | 'Decomposition'
  | 'Displacement'
  | 'Double Displacement'
  | 'Oxidation'
  | 'Reduction'
  | 'Redox'
  | 'Precipitation'
  | 'Exothermic'
  | 'Endothermic';

export interface ChemicalEntity {
  name: string;
  formula: string;
  state: 's' | 'l' | 'g' | 'aq';
  physicalForm: 'metal_strip' | 'powder' | 'crystal' | 'liquid' | 'gas' | 'gas_bubbles' | 'precipitate';
  color: string;
  hexColor: string;
  transparency?: number;
  description: string;
}

export interface SimulationStep {
  stepNumber: number;
  instruction: string;
  actionPrompt: string;
  apparatusInvolved: string[];
  animationKey: string;
  hint: string;
}

export interface MolecularComponent {
  symbol: string;
  count: number;
  color: string;
  radius: number;
}

export interface MolecularRepresentation {
  reactantMolecules: Array<{
    name: string;
    formula: string;
    coefficient: number;
    atoms: MolecularComponent[];
    description: string;
  }>;
  productMolecules: Array<{
    name: string;
    formula: string;
    coefficient: number;
    atoms: MolecularComponent[];
    description: string;
  }>;
  conservationNotes: string;
}

export interface EquationBalancingTask {
  unbalancedEquation: string;
  reactants: Array<{ formula: string; correctCoefficient: number; min: number; max: number }>;
  products: Array<{ formula: string; correctCoefficient: number; min: number; max: number }>;
  elementCounts: Record<string, { reactantMultiplier: number[]; productMultiplier: number[] }>;
  explanation: string;
}

export interface NCERTExperiment {
  activityNumber: string; // e.g. "Activity 1.1"
  ncertReference: string; // e.g. "NCERT Class 10 Science, Chapter 1, Section 1.1, Page 1-2"
  title: string;
  apparatus: string[];
  chemicals: {
    reactants: ChemicalEntity[];
    products: ChemicalEntity[];
  };
  procedure: string[];
  observations: string[];
  chemicalEquation: string;
  balancedEquation: string;
  reactionTypes: ReactionType[];
  relevantExplanation: string;
  safetyConsiderations: string[];
  verificationStatus: 'Verified against NCERT Chapter 1 (jesc1ps.pdf)';
  sources: string[];
  // Interactive Simulation Data
  simulationSteps: SimulationStep[];
  molecularView: MolecularRepresentation;
  balancingChallenge: EquationBalancingTask;
  realLabHighlights: {
    glasswareType: 'test_tube' | 'boiling_tube' | 'beaker' | 'conical_flask' | 'china_dish' | 'electrolysis_cell' | 'watch_glass';
    visualEffectType: 'dazzling_flame' | 'yellow_precipitate' | 'effervescence' | 'steam_and_heat' | 'crystal_color_change' | 'brown_fumes' | 'gas_tubes_2to1' | 'light_photolysis' | 'color_and_deposit' | 'white_precipitate' | 'black_oxide_layer';
    soundEffect: 'combustion' | 'precipitate' | 'bubbling' | 'boiling_hiss' | 'crackling' | 'fumes' | 'pop_and_glow' | 'sunlight_hum' | 'clink' | 'burner_flame';
    temperatureDeltaCelsius: number; // e.g. +45 for highly exothermic
  };
}

export const NCERT_EXPERIMENTS: NCERTExperiment[] = [
  // Activity 1.1
  {
    activityNumber: "Activity 1.1",
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.1, Pages 1–2 (Figure 1.1)",
    title: "Burning of Magnesium Ribbon in Air",
    apparatus: [
      "Magnesium ribbon (3-4 cm)",
      "Sandpaper",
      "Pair of tongs",
      "Spirit lamp / Bunsen burner",
      "Watch glass",
      "Safety goggles"
    ],
    chemicals: {
      reactants: [
        {
          name: "Magnesium Ribbon",
          formula: "Mg",
          state: "s",
          physicalForm: "metal_strip",
          color: "Silvery-white metallic ribbon",
          hexColor: "#c0c0c0",
          description: "Solid magnesium ribbon cleaned with sandpaper to remove protective layer of basic magnesium carbonate."
        },
        {
          name: "Oxygen Gas (from air)",
          formula: "O₂",
          state: "g",
          physicalForm: "gas",
          color: "Colourless gas",
          hexColor: "#93c5fd",
          transparency: 0.1,
          description: "Atmospheric oxygen supporting the vigorous combustion of magnesium."
        }
      ],
      products: [
        {
          name: "Magnesium Oxide",
          formula: "MgO",
          state: "s",
          physicalForm: "powder",
          color: "Dazzling white powder",
          hexColor: "#f8fafc",
          description: "Solid basic oxide residue collected in the watch glass."
        }
      ]
    },
    procedure: [
      "Clean a magnesium ribbon about 3-4 cm long by rubbing it with sandpaper.",
      "Hold the cleaned ribbon firmly using a pair of laboratory tongs.",
      "Ignite the free end of the magnesium ribbon using the flame of a spirit lamp or Bunsen burner.",
      "Keep the ribbon away from eyes and collect the resulting white ash on a watch glass."
    ],
    observations: [
      "The magnesium ribbon burns with a blinding, dazzling white flame.",
      "A white ash/powder (magnesium oxide) is deposited and collected on the watch glass.",
      "Intense heat and bright light radiation are emitted."
    ],
    chemicalEquation: "Mg(s) + O₂(g) → MgO(s)",
    balancedEquation: "2Mg(s) + O₂(g) → 2MgO(s)",
    reactionTypes: ["Combination", "Exothermic", "Oxidation"],
    relevantExplanation: "Magnesium reacts vigorously with atmospheric oxygen when ignited, forming magnesium oxide. Two reactants combine to give a single product (combination reaction). Magnesium gains oxygen and is oxidised to MgO. Heat and light energy are released (exothermic reaction).",
    safetyConsiderations: [
      "CAUTION: This activity requires teacher supervision or protective eyewear.",
      "Wear dark UV-protective safety goggles to protect retinas from the dazzling white UV radiation.",
      "Hold the ribbon at arm's length; do not stare directly at the intense flame.",
      "Clean the ribbon thoroughly with sandpaper first to remove any passivating carbonate/oxide layer."
    ],
    verificationStatus: "Verified against NCERT Chapter 1 (jesc1ps.pdf)",
    sources: [
      "NCERT Class 10 Science, Chapter 1, Section 1.1, Pages 1–2",
      "CBSE Science Curriculum Class X Laboratory Manual"
    ],
    simulationSteps: [
      {
        stepNumber: 1,
        instruction: "Rub the magnesium ribbon with sandpaper to remove the protective oxide coating.",
        actionPrompt: "Click or drag sandpaper across the magnesium ribbon.",
        apparatusInvolved: ["Sandpaper", "Magnesium ribbon"],
        animationKey: "clean_ribbon",
        hint: "Magnesium reacts slowly with air to form a basic carbonate layer which impedes combustion."
      },
      {
        stepNumber: 2,
        instruction: "Grip the shiny magnesium ribbon with laboratory tongs and light the Bunsen burner.",
        actionPrompt: "Pick up tongs and position ribbon near the burner flame.",
        apparatusInvolved: ["Tongs", "Bunsen burner"],
        animationKey: "ignite_burner",
        hint: "A steady blue flame provides sufficient activation energy."
      },
      {
        stepNumber: 3,
        instruction: "Introduce the magnesium ribbon into the flame and observe the dazzling white combustion.",
        actionPrompt: "Hold ribbon in flame and collect ash in watch glass.",
        apparatusInvolved: ["Tongs", "Watch glass", "Bunsen burner"],
        animationKey: "burn_magnesium",
        hint: "Observe the intense white brilliance and ash formation."
      }
    ],
    molecularView: {
      reactantMolecules: [
        {
          name: "Magnesium Atoms",
          formula: "2Mg",
          coefficient: 2,
          atoms: [{ symbol: "Mg", count: 2, color: "#94a3b8", radius: 0.38 }],
          description: "Two metallic magnesium atoms ready to lose 2 electrons each."
        },
        {
          name: "Oxygen Molecule",
          formula: "O₂",
          coefficient: 1,
          atoms: [{ symbol: "O", count: 2, color: "#ef4444", radius: 0.32 }],
          description: "Diatomic oxygen molecule sharing a double covalent bond."
        }
      ],
      productMolecules: [
        {
          name: "Magnesium Oxide Lattice",
          formula: "2MgO",
          coefficient: 2,
          atoms: [
            { symbol: "Mg²⁺", count: 2, color: "#64748b", radius: 0.34 },
            { symbol: "O²⁻", count: 2, color: "#f87171", radius: 0.36 }
          ],
          description: "Ionic crystal lattice of Mg²⁺ and O²⁻ ions in a 1:1 stoichiometric ratio."
        }
      ],
      conservationNotes: "Conservation of Mass: 2 Mg atoms + 2 O atoms on reactant side = 2 Mg atoms + 2 O atoms on product side. Total mass is strictly conserved."
    },
    balancingChallenge: {
      unbalancedEquation: "Mg + O₂ → MgO",
      reactants: [
        { formula: "Mg", correctCoefficient: 2, min: 1, max: 4 },
        { formula: "O₂", correctCoefficient: 1, min: 1, max: 4 }
      ],
      products: [
        { formula: "MgO", correctCoefficient: 2, min: 1, max: 4 }
      ],
      elementCounts: {
        Mg: { reactantMultiplier: [1, 0], productMultiplier: [1] },
        O: { reactantMultiplier: [0, 2], productMultiplier: [1] }
      },
      explanation: "Since O₂ provides 2 oxygen atoms, 2 formula units of MgO must be produced, requiring 2 Mg atoms: 2Mg + O₂ → 2MgO."
    },
    realLabHighlights: {
      glasswareType: "watch_glass",
      visualEffectType: "dazzling_flame",
      soundEffect: "combustion",
      temperatureDeltaCelsius: 1200
    }
  },

  // Activity 1.2
  {
    activityNumber: "Activity 1.2",
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.1, Page 2",
    title: "Reaction of Lead Nitrate and Potassium Iodide",
    apparatus: [
      "Test tubes (Borosilicate)",
      "Test tube rack",
      "Droppers / pipettes",
      "Test tube holder",
      "Chemical labels"
    ],
    chemicals: {
      reactants: [
        {
          name: "Lead(II) Nitrate Solution",
          formula: "Pb(NO₃)₂",
          state: "aq",
          physicalForm: "liquid",
          color: "Clear colourless aqueous solution",
          hexColor: "#e2e8f0",
          transparency: 0.2,
          description: "Soluble lead salt dissolved in deionised water."
        },
        {
          name: "Potassium Iodide Solution",
          formula: "KI",
          state: "aq",
          physicalForm: "liquid",
          color: "Clear colourless aqueous solution",
          hexColor: "#f1f5f9",
          transparency: 0.2,
          description: "Aqueous potassium iodide solution."
        }
      ],
      products: [
        {
          name: "Lead(II) Iodide Precipitate",
          formula: "PbI₂",
          state: "s",
          physicalForm: "precipitate",
          color: "Brilliant canary yellow precipitate",
          hexColor: "#fbbf24",
          description: "Insoluble bright yellow precipitate that settles at the bottom of the test tube."
        },
        {
          name: "Potassium Nitrate Solution",
          formula: "KNO₃",
          state: "aq",
          physicalForm: "liquid",
          color: "Colourless supernatant solution",
          hexColor: "#f8fafc",
          transparency: 0.15,
          description: "Aqueous spectator salt remaining dissolved in water."
        }
      ]
    },
    procedure: [
      "Take approximately 2–3 mL of lead nitrate solution in a clean, dry test tube.",
      "Take potassium iodide solution in a second container or dropper.",
      "Slowly add potassium iodide solution dropwise to the lead nitrate solution.",
      "Observe the instantaneous colour change and precipitate formation."
    ],
    observations: [
      "Both starting solutions are completely clear and colourless.",
      "The instant the two liquids touch, an opaque, intense bright canary-yellow precipitate forms.",
      "The yellow precipitate (PbI₂) gradually settles to the bottom of the test tube, leaving a colourless supernatant liquid (KNO₃)."
    ],
    chemicalEquation: "Pb(NO₃)₂(aq) + KI(aq) → PbI₂(s) + KNO₃(aq)",
    balancedEquation: "Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ + 2KNO₃(aq)",
    reactionTypes: ["Double Displacement", "Precipitation"],
    relevantExplanation: "This is a classic double displacement (precipitation) reaction. The Pb²⁺ cations and K⁺ cations exchange anion partners (NO₃⁻ and I⁻). Lead(II) iodide is insoluble in water at room temperature, precipitating as a striking yellow solid.",
    safetyConsiderations: [
      "CAUTION: Lead compounds are toxic and cumulative heavy metal poisons.",
      "Avoid direct skin contact; wear nitrile laboratory gloves.",
      "Do not pour lead waste down the sink; collect in designated heavy metal hazardous waste jars."
    ],
    verificationStatus: "Verified against NCERT Chapter 1 (jesc1ps.pdf)",
    sources: [
      "NCERT Class 10 Science, Chapter 1, Section 1.1, Page 2",
      "NCERT Exemplar Problems Class X Science"
    ],
    simulationSteps: [
      {
        stepNumber: 1,
        instruction: "Place a clean test tube in the rack and add 3 mL of colourless lead nitrate solution.",
        actionPrompt: "Pour lead nitrate into test tube.",
        apparatusInvolved: ["Test tube", "Lead nitrate reagent bottle"],
        animationKey: "pour_pbno3",
        hint: "Notice the clear, transparent liquid inside the borosilicate tube."
      },
      {
        stepNumber: 2,
        instruction: "Take the dropper filled with potassium iodide solution.",
        actionPrompt: "Hold dropper over the test tube.",
        apparatusInvolved: ["Dropper", "Potassium iodide bottle"],
        animationKey: "hold_dropper",
        hint: "Potassium iodide is also clear and colourless."
      },
      {
        stepNumber: 3,
        instruction: "Dispense drops of KI into the lead nitrate tube and witness yellow precipitation.",
        actionPrompt: "Drop KI and observe immediate yellow precipitate PbI₂.",
        apparatusInvolved: ["Test tube", "Dropper"],
        animationKey: "precipitate_pbi2",
        hint: "Watch the brilliant yellow precipitate swirl and settle."
      }
    ],
    molecularView: {
      reactantMolecules: [
        {
          name: "Lead Nitrate Units",
          formula: "Pb(NO₃)₂",
          coefficient: 1,
          atoms: [
            { symbol: "Pb²⁺", count: 1, color: "#64748b", radius: 0.42 },
            { symbol: "N", count: 2, color: "#3b82f6", radius: 0.28 },
            { symbol: "O", count: 6, color: "#ef4444", radius: 0.26 }
          ],
          description: "One Pb²⁺ cation accompanied by two NO₃⁻ nitrate anions."
        },
        {
          name: "Potassium Iodide Units",
          formula: "2KI",
          coefficient: 2,
          atoms: [
            { symbol: "K⁺", count: 2, color: "#a855f7", radius: 0.38 },
            { symbol: "I⁻", count: 2, color: "#eab308", radius: 0.44 }
          ],
          description: "Two K⁺ ions paired with two I⁻ iodide anions."
        }
      ],
      productMolecules: [
        {
          name: "Lead(II) Iodide Precipitate",
          formula: "PbI₂",
          coefficient: 1,
          atoms: [
            { symbol: "Pb²⁺", count: 1, color: "#64748b", radius: 0.42 },
            { symbol: "I⁻", count: 2, color: "#eab308", radius: 0.44 }
          ],
          description: "Insoluble lattice pairing 1 Pb²⁺ with 2 I⁻ ions."
        },
        {
          name: "Potassium Nitrate Units",
          formula: "2KNO₃",
          coefficient: 2,
          atoms: [
            { symbol: "K⁺", count: 2, color: "#a855f7", radius: 0.38 },
            { symbol: "N", count: 2, color: "#3b82f6", radius: 0.28 },
            { symbol: "O", count: 6, color: "#ef4444", radius: 0.26 }
          ],
          description: "Spectator ions remaining in aqueous solution."
        }
      ],
      conservationNotes: "1 Pb, 2 N, 6 O, 2 K, and 2 I atoms on both sides. Matter is conserved."
    },
    balancingChallenge: {
      unbalancedEquation: "Pb(NO₃)₂ + KI → PbI₂ + KNO₃",
      reactants: [
        { formula: "Pb(NO₃)₂", correctCoefficient: 1, min: 1, max: 4 },
        { formula: "KI", correctCoefficient: 2, min: 1, max: 4 }
      ],
      products: [
        { formula: "PbI₂", correctCoefficient: 1, min: 1, max: 4 },
        { formula: "KNO₃", correctCoefficient: 2, min: 1, max: 4 }
      ],
      elementCounts: {
        Pb: { reactantMultiplier: [1, 0], productMultiplier: [1, 0] },
        NO3: { reactantMultiplier: [2, 0], productMultiplier: [0, 1] },
        K: { reactantMultiplier: [0, 1], productMultiplier: [0, 1] },
        I: { reactantMultiplier: [0, 1], productMultiplier: [2, 0] }
      },
      explanation: "Two iodide ions and two nitrate groups require a coefficient of 2 for KI and 2 for KNO₃: Pb(NO₃)₂ + 2KI → PbI₂ + 2KNO₃."
    },
    realLabHighlights: {
      glasswareType: "test_tube",
      visualEffectType: "yellow_precipitate",
      soundEffect: "precipitate",
      temperatureDeltaCelsius: 1
    }
  },

  // Activity 1.3
  {
    activityNumber: "Activity 1.3",
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.1, Pages 2–3 (Figure 1.2)",
    title: "Reaction of Zinc Granules with Dilute Acid",
    apparatus: [
      "Conical flask (or test tube)",
      "Single-hole rubber cork",
      "Glass delivery tube",
      "Zinc granules",
      "Thermometer",
      "Matchstick / burning splinter"
    ],
    chemicals: {
      reactants: [
        {
          name: "Zinc Granules",
          formula: "Zn",
          state: "s",
          physicalForm: "metal_strip",
          color: "Bluish-grey metallic granules",
          hexColor: "#71717a",
          description: "Solid granular zinc metal with high surface area."
        },
        {
          name: "Dilute Sulphuric Acid",
          formula: "H₂SO₄",
          state: "aq",
          physicalForm: "liquid",
          color: "Colourless clear acidic solution",
          hexColor: "#e0f2fe",
          transparency: 0.15,
          description: "Aqueous dilute sulphuric acid (or dilute hydrochloric acid, HCl)."
        }
      ],
      products: [
        {
          name: "Zinc Sulphate Solution",
          formula: "ZnSO₄",
          state: "aq",
          physicalForm: "liquid",
          color: "Colourless transparent aqueous solution",
          hexColor: "#f1f5f9",
          transparency: 0.15,
          description: "Aqueous salt formed by displacement."
        },
        {
          name: "Hydrogen Gas",
          formula: "H₂",
          state: "g",
          physicalForm: "gas_bubbles",
          color: "Colourless, odourless flammable gas",
          hexColor: "#e2e8f0",
          transparency: 0.05,
          description: "Gas evolved as rapid effervescence from zinc surfaces, burns with a 'pop' sound."
        }
      ]
    },
    procedure: [
      "Take a few zinc granules in a conical flask or a test tube.",
      "Add dilute sulphuric acid (or dilute hydrochloric acid) to the flask carefully.",
      "Observe the surface of zinc granules for gas evolution.",
      "Touch the bottom of the conical flask with your hand or use a thermometer to measure temperature.",
      "Bring a burning splinter near the delivery tube opening to test the escaping gas."
    ],
    observations: [
      "Vigorous effervescence is seen with streams of gas bubbles originating from the zinc granules.",
      "The flask becomes distinctly warm to the touch (temperature rises significantly).",
      "The zinc granules slowly shrink as they dissolve into soluble zinc sulphate.",
      "When a burning splinter is brought near the jet tube, the gas burns with a characteristic 'pop' sound, confirming hydrogen gas."
    ],
    chemicalEquation: "Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)",
    balancedEquation: "Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)↑",
    reactionTypes: ["Displacement", "Exothermic", "Redox"],
    relevantExplanation: "Zinc is more electropositive (more reactive) than hydrogen. It displaces hydrogen ions from the acid. Zinc undergoes oxidation (Zn → Zn²⁺ + 2e⁻) and hydrogen ions undergo reduction (2H⁺ + 2e⁻ → H₂). Energy is liberated, making the reaction exothermic.",
    safetyConsiderations: [
      "CAUTION: Handle dilute sulphuric acid with care; acid can cause skin and clothing burns.",
      "Hydrogen gas mixed with air is explosive; conduct the 'pop' test only with small gas volumes.",
      "Ensure the delivery tube is unobstructed to avoid internal pressure build-up."
    ],
    verificationStatus: "Verified against NCERT Chapter 1 (jesc1ps.pdf)",
    sources: [
      "NCERT Class 10 Science, Chapter 1, Section 1.1, Pages 2–3",
      "NCERT Science Figure 1.2: Formation of hydrogen gas by the action of dilute sulphuric acid on zinc"
    ],
    simulationSteps: [
      {
        stepNumber: 1,
        instruction: "Add metallic zinc granules into the conical flask.",
        actionPrompt: "Drop zinc granules into the flask.",
        apparatusInvolved: ["Conical flask", "Zinc granules container"],
        animationKey: "add_zinc",
        hint: "Notice the grey irregular pieces at the flask bottom."
      },
      {
        stepNumber: 2,
        instruction: "Pour dilute sulphuric acid into the flask and fit the cork with delivery tube.",
        actionPrompt: "Pour H₂SO₄ and close with delivery tube cork.",
        apparatusInvolved: ["Conical flask", "Acid bottle", "Cork with tube"],
        animationKey: "pour_acid_and_cork",
        hint: "Liquid surrounds the zinc granules."
      },
      {
        stepNumber: 3,
        instruction: "Watch rapid bubbling effervescence, touch the flask to feel heat, and test gas with flame.",
        actionPrompt: "Observe bubbles and bring lit splinter to nozzle for 'pop' sound.",
        apparatusInvolved: ["Conical flask", "Burning splinter", "Thermometer"],
        animationKey: "effervescence_and_pop",
        hint: "Hydrogen gas ignites with a sharp 'pop' sound!"
      }
    ],
    molecularView: {
      reactantMolecules: [
        {
          name: "Zinc Atoms",
          formula: "Zn",
          coefficient: 1,
          atoms: [{ symbol: "Zn", count: 1, color: "#71717a", radius: 0.4 }],
          description: "Solid zinc atom with valence 2."
        },
        {
          name: "Sulphuric Acid",
          formula: "H₂SO₄",
          coefficient: 1,
          atoms: [
            { symbol: "H⁺", count: 2, color: "#f8fafc", radius: 0.2 },
            { symbol: "S", count: 1, color: "#eab308", radius: 0.35 },
            { symbol: "O", count: 4, color: "#ef4444", radius: 0.26 }
          ],
          description: "Diprotic acid yielding 2 H⁺ protons and 1 SO₄²⁻ sulphate ion."
        }
      ],
      productMolecules: [
        {
          name: "Zinc Sulphate",
          formula: "ZnSO₄",
          coefficient: 1,
          atoms: [
            { symbol: "Zn²⁺", count: 1, color: "#71717a", radius: 0.38 },
            { symbol: "S", count: 1, color: "#eab308", radius: 0.35 },
            { symbol: "O", count: 4, color: "#ef4444", radius: 0.26 }
          ],
          description: "Aqueous salt formed by ion exchange."
        },
        {
          name: "Hydrogen Gas Molecule",
          formula: "H₂",
          coefficient: 1,
          atoms: [{ symbol: "H", count: 2, color: "#f8fafc", radius: 0.22 }],
          description: "Diatomic gaseous hydrogen molecule."
        }
      ],
      conservationNotes: "1 Zn, 2 H, 1 S, 4 O atoms before and after reaction. Mass is conserved."
    },
    balancingChallenge: {
      unbalancedEquation: "Zn + H₂SO₄ → ZnSO₄ + H₂",
      reactants: [
        { formula: "Zn", correctCoefficient: 1, min: 1, max: 4 },
        { formula: "H₂SO₄", correctCoefficient: 1, min: 1, max: 4 }
      ],
      products: [
        { formula: "ZnSO₄", correctCoefficient: 1, min: 1, max: 4 },
        { formula: "H₂", correctCoefficient: 1, min: 1, max: 4 }
      ],
      elementCounts: {
        Zn: { reactantMultiplier: [1, 0], productMultiplier: [1, 0] },
        H: { reactantMultiplier: [0, 2], productMultiplier: [0, 2] },
        S: { reactantMultiplier: [0, 1], productMultiplier: [1, 0] },
        O: { reactantMultiplier: [0, 4], productMultiplier: [4, 0] }
      },
      explanation: "Equation is already stoichiometrically balanced with 1:1:1:1 ratio: Zn + H₂SO₄ → ZnSO₄ + H₂."
    },
    realLabHighlights: {
      glasswareType: "conical_flask",
      visualEffectType: "effervescence",
      soundEffect: "bubbling",
      temperatureDeltaCelsius: 28
    }
  },

  // Activity 1.4
  {
    activityNumber: "Activity 1.4",
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.2.1, Page 6 (Figure 1.3)",
    title: "Reaction of Calcium Oxide (Quicklime) with Water",
    apparatus: [
      "Glass beaker (250 mL borosilicate)",
      "Spatula",
      "Thermometer",
      "Glass stirring rod"
    ],
    chemicals: {
      reactants: [
        {
          name: "Calcium Oxide (Quicklime)",
          formula: "CaO",
          state: "s",
          physicalForm: "powder",
          color: "White hard solid lumps / powder",
          hexColor: "#f1f5f9",
          description: "Dry calcium oxide lumps known commonly as quicklime."
        },
        {
          name: "Water",
          formula: "H₂O",
          state: "l",
          physicalForm: "liquid",
          color: "Clear colourless liquid",
          hexColor: "#38bdf8",
          transparency: 0.2,
          description: "Distilled water added slowly to quicklime."
        }
      ],
      products: [
        {
          name: "Calcium Hydroxide (Slaked Lime)",
          formula: "Ca(OH)₂",
          state: "aq",
          physicalForm: "liquid",
          color: "Milky white suspension / slaked lime solution",
          hexColor: "#f8fafc",
          transparency: 0.6,
          description: "Aqueous slaked lime; clear filtrate is known as lime water."
        }
      ]
    },
    procedure: [
      "Take a small amount (about 5 g) of calcium oxide or quicklime in a borosilicate glass beaker.",
      "Slowly and carefully pour distilled water into the beaker.",
      "Touch the outer surface of the beaker with fingers or measure with a laboratory thermometer.",
      "Observe the sound, release of steam, and state changes."
    ],
    observations: [
      "A vigorous, energetic reaction occurs accompanied by a sharp hissing sound.",
      "The hard white lumps crumble into an amorphous, creamy-white suspension.",
      "Dense steam vapour is emitted.",
      "The beaker becomes extremely hot to the touch (temperature rises past 70°C)."
    ],
    chemicalEquation: "CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat",
    balancedEquation: "CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat",
    reactionTypes: ["Combination", "Exothermic"],
    relevantExplanation: "Calcium oxide combines vigorously with water to produce calcium hydroxide (slaked lime). Since two reactants combine to form a single product, it is a combination reaction. A tremendous amount of thermal energy is liberated, making it intensely exothermic. Slaked lime solution is also used for whitewashing walls, where it slowly absorbs CO₂ to form shiny CaCO₃.",
    safetyConsiderations: [
      "CAUTION: Quicklime reacts aggressively and exothermically; boiling splatters can occur.",
      "Do not touch quicklime or slaked lime with bare skin; it is highly alkaline and corrosive.",
      "Always add water slowly to the beaker, never dump quicklime into a large volume abruptly."
    ],
    verificationStatus: "Verified against NCERT Chapter 1 (jesc1ps.pdf)",
    sources: [
      "NCERT Class 10 Science, Chapter 1, Section 1.2.1, Page 6",
      "NCERT Science Figure 1.3: Formation of slaked lime by the reaction of calcium oxide with water"
    ],
    simulationSteps: [
      {
        stepNumber: 1,
        instruction: "Use spatula to place quicklime (CaO) lumps into the beaker.",
        actionPrompt: "Transfer quicklime into beaker.",
        apparatusInvolved: ["Beaker", "Spatula", "Quicklime container"],
        animationKey: "add_quicklime",
        hint: "Quicklime appears as dry white stone-like lumps."
      },
      {
        stepNumber: 2,
        instruction: "Slowly pour water from the wash bottle into the beaker.",
        actionPrompt: "Pour water onto quicklime.",
        apparatusInvolved: ["Beaker", "Water flask"],
        animationKey: "pour_water_slaking",
        hint: "Notice the immediate swelling and hissing reaction."
      },
      {
        stepNumber: 3,
        instruction: "Touch the beaker to read the temperature rise and observe steam evolution.",
        actionPrompt: "Observe steam and watch thermometer needle climb.",
        apparatusInvolved: ["Beaker", "Thermometer"],
        animationKey: "slaking_heat_and_steam",
        hint: "Thermometer shoots up as slaked lime forms."
      }
    ],
    molecularView: {
      reactantMolecules: [
        {
          name: "Calcium Oxide",
          formula: "CaO",
          coefficient: 1,
          atoms: [
            { symbol: "Ca²⁺", count: 1, color: "#10b981", radius: 0.4 },
            { symbol: "O²⁻", count: 1, color: "#ef4444", radius: 0.3 }
          ],
          description: "Ionic crystal lattice of calcium and oxide ions."
        },
        {
          name: "Water Molecule",
          formula: "H₂O",
          coefficient: 1,
          atoms: [
            { symbol: "H", count: 2, color: "#f8fafc", radius: 0.2 },
            { symbol: "O", count: 1, color: "#ef4444", radius: 0.3 }
          ],
          description: "Bent polar water molecule."
        }
      ],
      productMolecules: [
        {
          name: "Calcium Hydroxide",
          formula: "Ca(OH)₂",
          coefficient: 1,
          atoms: [
            { symbol: "Ca²⁺", count: 1, color: "#10b981", radius: 0.4 },
            { symbol: "O", count: 2, color: "#ef4444", radius: 0.3 },
            { symbol: "H", count: 2, color: "#f8fafc", radius: 0.2 }
          ],
          description: "Ca²⁺ ion coordinated with two hydroxide (OH⁻) ions."
        }
      ],
      conservationNotes: "1 Ca, 2 O, and 2 H atoms on reactant side = 1 Ca, 2 O, and 2 H atoms in product. Mass conserved."
    },
    balancingChallenge: {
      unbalancedEquation: "CaO + H₂O → Ca(OH)₂",
      reactants: [
        { formula: "CaO", correctCoefficient: 1, min: 1, max: 4 },
        { formula: "H₂O", correctCoefficient: 1, min: 1, max: 4 }
      ],
      products: [
        { formula: "Ca(OH)₂", correctCoefficient: 1, min: 1, max: 4 }
      ],
      elementCounts: {
        Ca: { reactantMultiplier: [1, 0], productMultiplier: [1] },
        O: { reactantMultiplier: [1, 1], productMultiplier: [2] },
        H: { reactantMultiplier: [0, 2], productMultiplier: [2] }
      },
      explanation: "Already balanced 1:1:1. 1 Ca, 2 O, 2 H on each side: CaO + H₂O → Ca(OH)₂."
    },
    realLabHighlights: {
      glasswareType: "beaker",
      visualEffectType: "steam_and_heat",
      soundEffect: "boiling_hiss",
      temperatureDeltaCelsius: 65
    }
  },

  // Activity 1.5
  {
    activityNumber: "Activity 1.5",
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.2.2, Page 8 (Figure 1.4)",
    title: "Thermal Decomposition of Ferrous Sulphate Crystals",
    apparatus: [
      "Dry boiling tube (Pyrex/borosilicate)",
      "Boiling tube holder (tongs)",
      "Bunsen burner / spirit lamp",
      "Moist litmus paper"
    ],
    chemicals: {
      reactants: [
        {
          name: "Ferrous Sulphate Heptahydrate Crystals",
          formula: "FeSO₄·7H₂O",
          state: "s",
          physicalForm: "crystal",
          color: "Light green rhombic crystals",
          hexColor: "#86efac",
          description: "Hydrated green vitriol crystals containing 7 molecules of water of crystallisation."
        }
      ],
      products: [
        {
          name: "Ferric Oxide",
          formula: "Fe₂O₃",
          state: "s",
          physicalForm: "powder",
          color: "Reddish-brown solid residue",
          hexColor: "#991b1b",
          description: "Solid residue remaining in the boiling tube."
        },
        {
          name: "Sulphur Dioxide Gas",
          formula: "SO₂",
          state: "g",
          physicalForm: "gas",
          color: "Colourless gas with choking pungent smell",
          hexColor: "#fed7aa",
          transparency: 0.1,
          description: "Acidic gas having the characteristic smell of burning sulphur."
        },
        {
          name: "Sulphur Trioxide Gas",
          formula: "SO₃",
          state: "g",
          physicalForm: "gas",
          color: "Colourless pungent gas",
          hexColor: "#fdba74",
          transparency: 0.1,
          description: "Dense acidic gaseous oxide."
        }
      ]
    },
    procedure: [
      "Take about 2 g of dry, green ferrous sulphate crystals in a clean, completely dry boiling tube.",
      "Note the initial pale green colour of the crystals.",
      "Hold the boiling tube securely with a test tube holder over the flame of a burner.",
      "Observe water droplets condensing on the cooler upper part of the boiling tube.",
      "Observe crystal colour change from green to white and finally to reddish-brown.",
      "Waft the emitted gases gently toward your nose to detect the odour."
    ],
    observations: [
      "Tiny droplets of water condense on the upper, cooler walls of the boiling tube (loss of water of crystallisation).",
      "The vibrant pale green colour fades first to dirty white (anhydrous FeSO₄), then transforms into a reddish-brown solid (Fe₂O₃).",
      "A suffocating, pungent odour of burning sulphur (due to SO₂ and SO₃) is released."
    ],
    chemicalEquation: "2FeSO₄(s) →[Heat] Fe₂O₃(s) + SO₂(g) + SO₃(g)",
    balancedEquation: "2FeSO₄(s) xrightarrow{Δ} Fe₂O₃(s) + SO₂(g)↑ + SO₃(g)↑",
    reactionTypes: ["Decomposition", "Endothermic", "Redox"],
    relevantExplanation: "When green crystals of FeSO₄·7H₂O are heated, they first lose their 7 water molecules of crystallisation (FeSO₄·7H₂O → FeSO₄ + 7H₂O) and turn white. On further strong heating, anhydrous ferrous sulphate undergoes thermal decomposition into ferric oxide (Fe₂O₃), sulphur dioxide (SO₂), and sulphur trioxide (SO₃). Fe²⁺ is oxidised to Fe³⁺ while sulphur undergoes redox disproportionation.",
    safetyConsiderations: [
      "CAUTION: Do not point the open mouth of the boiling tube at yourself or your classmates.",
      "SO₂ and SO₃ gases are choking, toxic, and irritating to the lungs; do not inhale deeply.",
      "Waft the fumes gently toward your nose using your hand from a safe distance.",
      "Use only a dry Pyrex boiling tube; standard test tubes can crack under high thermal stress."
    ],
    verificationStatus: "Verified against NCERT Chapter 1 (jesc1ps.pdf)",
    sources: [
      "NCERT Class 10 Science, Chapter 1, Section 1.2.2, Page 8",
      "NCERT Science Figure 1.4: Correct way of heating the boiling tube containing crystals of ferrous sulphate and of smelling the odour"
    ],
    simulationSteps: [
      {
        stepNumber: 1,
        instruction: "Add pale green ferrous sulphate crystals into a dry boiling tube.",
        actionPrompt: "Transfer green crystals into tube.",
        apparatusInvolved: ["Boiling tube", "Crystals container"],
        animationKey: "add_feso4_crystals",
        hint: "Note the characteristic light green color of FeSO₄·7H₂O."
      },
      {
        stepNumber: 2,
        instruction: "Grip tube with holder, slant at 45° angle away from face, and bring over burner flame.",
        actionPrompt: "Hold tube in flame.",
        apparatusInvolved: ["Boiling tube holder", "Bunsen burner"],
        animationKey: "heat_crystals_dehydration",
        hint: "Water drops condense on upper tube walls as water of crystallisation is expelled."
      },
      {
        stepNumber: 3,
        instruction: "Heat strongly to decompose anhydrous FeSO₄ into reddish-brown Fe₂O₃, SO₂, and SO₃ gases.",
        actionPrompt: "Continue strong heating and observe fumes and color transformation.",
        apparatusInvolved: ["Boiling tube", "Burner"],
        animationKey: "decompose_to_fe2o3",
        hint: "Watch crystals turn reddish-brown while pungent fumes evolve."
      }
    ],
    molecularView: {
      reactantMolecules: [
        {
          name: "Ferrous Sulphate Formula Units",
          formula: "2FeSO₄",
          coefficient: 2,
          atoms: [
            { symbol: "Fe²⁺", count: 2, color: "#86efac", radius: 0.38 },
            { symbol: "S", count: 2, color: "#eab308", radius: 0.35 },
            { symbol: "O", count: 8, color: "#ef4444", radius: 0.26 }
          ],
          description: "Two units of iron(II) sulphate."
        }
      ],
      productMolecules: [
        {
          name: "Ferric Oxide",
          formula: "Fe₂O₃",
          coefficient: 1,
          atoms: [
            { symbol: "Fe³⁺", count: 2, color: "#991b1b", radius: 0.36 },
            { symbol: "O", count: 3, color: "#ef4444", radius: 0.26 }
          ],
          description: "Reddish-brown iron(III) oxide residue."
        },
        {
          name: "Sulphur Dioxide",
          formula: "SO₂",
          coefficient: 1,
          atoms: [
            { symbol: "S", count: 1, color: "#eab308", radius: 0.35 },
            { symbol: "O", count: 2, color: "#ef4444", radius: 0.26 }
          ],
          description: "Bent triatomic SO₂ gas molecule."
        },
        {
          name: "Sulphur Trioxide",
          formula: "SO₃",
          coefficient: 1,
          atoms: [
            { symbol: "S", count: 1, color: "#eab308", radius: 0.35 },
            { symbol: "O", count: 3, color: "#ef4444", radius: 0.26 }
          ],
          description: "Trigonal planar SO₃ gas molecule."
        }
      ],
      conservationNotes: "2 Fe, 2 S, 8 O atoms balance across both sides. Total mass conserved."
    },
    balancingChallenge: {
      unbalancedEquation: "FeSO₄ → Fe₂O₃ + SO₂ + SO₃",
      reactants: [
        { formula: "FeSO₄", correctCoefficient: 2, min: 1, max: 4 }
      ],
      products: [
        { formula: "Fe₂O₃", correctCoefficient: 1, min: 1, max: 4 },
        { formula: "SO₂", correctCoefficient: 1, min: 1, max: 4 },
        { formula: "SO₃", correctCoefficient: 1, min: 1, max: 4 }
      ],
      elementCounts: {
        Fe: { reactantMultiplier: [1], productMultiplier: [2, 0, 0] },
        S: { reactantMultiplier: [1], productMultiplier: [0, 1, 1] },
        O: { reactantMultiplier: [4], productMultiplier: [3, 2, 3] }
      },
      explanation: "2 units of FeSO₄ provide 2 Fe atoms, 2 S atoms, and 8 O atoms matching Fe₂O₃ + SO₂ + SO₃: 2FeSO₄ → Fe₂O₃ + SO₂ + SO₃."
    },
    realLabHighlights: {
      glasswareType: "boiling_tube",
      visualEffectType: "crystal_color_change",
      soundEffect: "crackling",
      temperatureDeltaCelsius: 450
    }
  },

  // Activity 1.6
  {
    activityNumber: "Activity 1.6",
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.2.2, Page 8 (Figure 1.5)",
    title: "Thermal Decomposition of Lead Nitrate Powder",
    apparatus: [
      "Dry boiling tube",
      "Pair of tongs / tube holder",
      "Bunsen burner",
      "Glowing wooden splint"
    ],
    chemicals: {
      reactants: [
        {
          name: "Lead(II) Nitrate Powder",
          formula: "Pb(NO₃)₂",
          state: "s",
          physicalForm: "powder",
          color: "Pure white crystalline powder",
          hexColor: "#f8fafc",
          description: "Dry white crystalline powder of lead(II) nitrate."
        }
      ],
      products: [
        {
          name: "Lead(II) Oxide Residue",
          formula: "PbO",
          state: "s",
          physicalForm: "powder",
          color: "Yellow solid residue (reddish-brown when hot)",
          hexColor: "#facc15",
          description: "Solid residue remaining in tube, yellow when cold."
        },
        {
          name: "Nitrogen Dioxide Fumes",
          formula: "NO₂",
          state: "g",
          physicalForm: "gas",
          color: "Dense reddish-brown suffocating fumes",
          hexColor: "#9a3412",
          transparency: 0.7,
          description: "Characteristic pungent brown nitrogen dioxide fumes."
        },
        {
          name: "Oxygen Gas",
          formula: "O₂",
          state: "g",
          physicalForm: "gas",
          color: "Colourless gas that rekindles a glowing splint",
          hexColor: "#93c5fd",
          transparency: 0.1,
          description: "Colourless supporter of combustion."
        }
      ]
    },
    procedure: [
      "Take about 2 g of dry lead nitrate powder in a clean boiling tube.",
      "Hold the boiling tube firmly with a pair of tongs.",
      "Heat it steadily over the burner flame.",
      "Observe the crackling decrepitation sound, gas emission colour, and residue."
    ],
    observations: [
      "A distinct crackling sound (decrepitation) is heard as crystals break apart under heat.",
      "Copious, dense reddish-brown fumes of nitrogen dioxide gas (NO₂) stream out of the tube.",
      "A glowing wooden splint placed near the mouth bursts into flame (confirming O₂).",
      "A yellow solid residue of lead(II) oxide (PbO) is left behind on the walls and bottom."
    ],
    chemicalEquation: "2Pb(NO₃)₂(s) →[Heat] 2PbO(s) + 4NO₂(g) + O₂(g)",
    balancedEquation: "2Pb(NO₃)₂(s) xrightarrow{Δ} 2PbO(s) + 4NO₂(g)↑ + O₂(g)↑",
    reactionTypes: ["Decomposition", "Endothermic", "Redox"],
    relevantExplanation: "When heated, lead nitrate undergoes thermal decomposition into three products: lead(II) oxide, nitrogen dioxide, and oxygen. The striking visual signature of this experiment in NCERT is the emission of brown fumes of NO₂ and the yellow residue of PbO.",
    safetyConsiderations: [
      "CAUTION: NO₂ is a noxious, highly toxic gas causing severe pulmonary irritation.",
      "Perform strictly under a laboratory fume hood or well-ventilated laboratory window.",
      "Lead oxide residue is toxic; do not handle with bare hands."
    ],
    verificationStatus: "Verified against NCERT Chapter 1 (jesc1ps.pdf)",
    sources: [
      "NCERT Class 10 Science, Chapter 1, Section 1.2.2, Page 8",
      "NCERT Science Figure 1.5: Heating of lead nitrate and emission of nitrogen dioxide"
    ],
    simulationSteps: [
      {
        stepNumber: 1,
        instruction: "Add white lead nitrate powder into the dry boiling tube.",
        actionPrompt: "Pour lead nitrate into boiling tube.",
        apparatusInvolved: ["Boiling tube", "Lead nitrate jar"],
        animationKey: "add_pbno3_powder",
        hint: "Lead nitrate is an opaque white crystalline powder."
      },
      {
        stepNumber: 2,
        instruction: "Grasp boiling tube with tongs and hold directly in the hot burner flame.",
        actionPrompt: "Hold tube in flame.",
        apparatusInvolved: ["Boiling tube", "Tongs", "Bunsen burner"],
        animationKey: "heat_lead_nitrate",
        hint: "Thermal decomposition triggers decrepitation."
      },
      {
        stepNumber: 3,
        instruction: "Observe dense reddish-brown NO₂ plumes and yellow PbO residue coating the glass.",
        actionPrompt: "Observe brown fumes and yellow residue.",
        apparatusInvolved: ["Boiling tube", "Glowing splint"],
        animationKey: "brown_fumes_no2",
        hint: "Brown fumes indicate nitrogen dioxide emission."
      }
    ],
    molecularView: {
      reactantMolecules: [
        {
          name: "Lead Nitrate Units",
          formula: "2Pb(NO₃)₂",
          coefficient: 2,
          atoms: [
            { symbol: "Pb", count: 2, color: "#64748b", radius: 0.42 },
            { symbol: "N", count: 4, color: "#3b82f6", radius: 0.28 },
            { symbol: "O", count: 12, color: "#ef4444", radius: 0.26 }
          ],
          description: "Two formula units containing 2 Pb, 4 N, and 12 O atoms."
        }
      ],
      productMolecules: [
        {
          name: "Lead Oxide Units",
          formula: "2PbO",
          coefficient: 2,
          atoms: [
            { symbol: "Pb", count: 2, color: "#64748b", radius: 0.42 },
            { symbol: "O", count: 2, color: "#ef4444", radius: 0.26 }
          ],
          description: "Solid lead monoxide."
        },
        {
          name: "Nitrogen Dioxide Molecules",
          formula: "4NO₂",
          coefficient: 4,
          atoms: [
            { symbol: "N", count: 4, color: "#3b82f6", radius: 0.28 },
            { symbol: "O", count: 8, color: "#ef4444", radius: 0.26 }
          ],
          description: "4 paramagnetic brown NO₂ molecules."
        },
        {
          name: "Oxygen Molecule",
          formula: "O₂",
          coefficient: 1,
          atoms: [{ symbol: "O", count: 2, color: "#ef4444", radius: 0.26 }],
          description: "1 diatomic oxygen molecule."
        }
      ],
      conservationNotes: "Reactants: 2 Pb, 4 N, 12 O. Products: 2 Pb, 4 N, (2 + 8 + 2) = 12 O. Conservation of mass holds perfectly."
    },
    balancingChallenge: {
      unbalancedEquation: "Pb(NO₃)₂ → PbO + NO₂ + O₂",
      reactants: [
        { formula: "Pb(NO₃)₂", correctCoefficient: 2, min: 1, max: 4 }
      ],
      products: [
        { formula: "PbO", correctCoefficient: 2, min: 1, max: 4 },
        { formula: "NO₂", correctCoefficient: 4, min: 1, max: 5 },
        { formula: "O₂", correctCoefficient: 1, min: 1, max: 4 }
      ],
      elementCounts: {
        Pb: { reactantMultiplier: [1], productMultiplier: [1, 0, 0] },
        N: { reactantMultiplier: [2], productMultiplier: [0, 1, 0] },
        O: { reactantMultiplier: [6], productMultiplier: [1, 2, 2] }
      },
      explanation: "Balancing odd oxygens and nitrates gives: 2Pb(NO₃)₂ → 2PbO + 4NO₂ + O₂."
    },
    realLabHighlights: {
      glasswareType: "boiling_tube",
      visualEffectType: "brown_fumes",
      soundEffect: "fumes",
      temperatureDeltaCelsius: 480
    }
  },

  // Activity 1.7
  {
    activityNumber: "Activity 1.7",
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.2.2, Page 9 (Figure 1.6)",
    title: "Electrolysis of Water",
    apparatus: [
      "Plastic mug with two drilled holes",
      "Two rubber stoppers",
      "Two carbon (graphite) electrodes",
      "6V DC Battery with switch and wires",
      "Two graduated test tubes",
      "Dilute sulphuric acid (electrolyte)"
    ],
    chemicals: {
      reactants: [
        {
          name: "Acidulated Water",
          formula: "H₂O (+ drops of dil. H₂SO₄)",
          state: "l",
          physicalForm: "liquid",
          color: "Clear colourless liquid",
          hexColor: "#0284c7",
          transparency: 0.25,
          description: "Deionised water acidified with dilute H₂SO₄ to enable ionic electrical conduction."
        }
      ],
      products: [
        {
          name: "Hydrogen Gas (at Cathode -)",
          formula: "H₂",
          state: "g",
          physicalForm: "gas_bubbles",
          color: "Colourless gas collected at cathode",
          hexColor: "#e0f2fe",
          transparency: 0.05,
          description: "Twice the volume of oxygen gas; burns with a sharp 'pop' sound."
        },
        {
          name: "Oxygen Gas (at Anode +)",
          formula: "O₂",
          state: "g",
          physicalForm: "gas_bubbles",
          color: "Colourless gas collected at anode",
          hexColor: "#93c5fd",
          transparency: 0.05,
          description: "One unit volume; rekindles a glowing splint."
        }
      ]
    },
    procedure: [
      "Take a plastic mug, drill two holes at the base, and insert rubber stoppers fitted with graphite electrodes.",
      "Connect the two graphite electrodes to the positive and negative terminals of a 6V battery.",
      "Fill the mug with water so the electrodes are immersed, and add a few drops of dilute sulphuric acid.",
      "Fill two test tubes with water and invert them over the two graphite electrodes.",
      "Switch on the DC electrical current and observe gas bubble evolution in both tubes.",
      "Compare the volume of gas collected in the cathode tube vs anode tube.",
      "Test both collected gases carefully with a burning candle."
    ],
    observations: [
      "Continuous streams of bubbles form on both electrodes and displace water downwards.",
      "The rate of gas bubble production at the cathode (negative terminal) is noticeably faster than at the anode (positive terminal).",
      "The volume of gas collected at the cathode is exactly twice the volume collected at the anode (Ratio 2 : 1).",
      "The gas in the cathode tube burns with a 'pop' sound (Hydrogen).",
      "The gas in the anode tube reignites a glowing candle flame (Oxygen)."
    ],
    chemicalEquation: "2H₂O(l) →[Electricity] 2H₂(g) + O₂(g)",
    balancedEquation: "2H₂O(l) xrightarrow{\text{Electricity}} 2H₂(g)↑ + O₂(g)↑",
    reactionTypes: ["Decomposition", "Endothermic", "Redox"],
    relevantExplanation: "Water undergoes electrolytic decomposition when electric current is passed through it. Water molecules split into H⁺ and OH⁻ ions. At cathode: 2H⁺ + 2e⁻ → H₂. At anode: 4OH⁻ → 2H₂O + O₂ + 4e⁻. Because each water molecule consists of two hydrogen atoms bonded to one oxygen atom (H₂O), the volume of hydrogen gas liberated is double the volume of oxygen gas (2:1 volume ratio).",
    safetyConsiderations: [
      "CAUTION: Use only low-voltage direct current (6V DC battery), never domestic 220V AC mains.",
      "Handle dilute sulphuric acid with care when acidulating water.",
      "Ensure proper ventilation during gas testing."
    ],
    verificationStatus: "Verified against NCERT Chapter 1 (jesc1ps.pdf)",
    sources: [
      "NCERT Class 10 Science, Chapter 1, Section 1.2.2, Page 9",
      "NCERT Science Figure 1.6: Electrolysis of water"
    ],
    simulationSteps: [
      {
        stepNumber: 1,
        instruction: "Fill the voltameter cell with acidulated water and invert two water-filled test tubes over graphite rods.",
        actionPrompt: "Set up cell and invert test tubes.",
        apparatusInvolved: ["Electrolysis cell", "Graphite rods", "Test tubes"],
        animationKey: "setup_cell",
        hint: "Acid provides free ions so pure water can conduct current."
      },
      {
        stepNumber: 2,
        instruction: "Turn on the 6V DC power supply switch to start electrolysis.",
        actionPrompt: "Flip 6V DC power switch to ON.",
        apparatusInvolved: ["6V Battery", "Switch"],
        animationKey: "switch_current_on",
        hint: "Observe bubbles streaming upwards on both electrodes immediately."
      },
      {
        stepNumber: 3,
        instruction: "Observe the 2:1 downward displacement volume ratio and test cathode gas with flame.",
        actionPrompt: "Observe 2:1 gas volume and test hydrogen with lit splint.",
        apparatusInvolved: ["Cathode tube", "Anode tube", "Lit candle"],
        animationKey: "collect_gas_2to1",
        hint: "Notice Cathode has 20 mL H₂ while Anode has 10 mL O₂. 'Pop' sound confirms H₂!"
      }
    ],
    molecularView: {
      reactantMolecules: [
        {
          name: "Water Molecules",
          formula: "2H₂O",
          coefficient: 2,
          atoms: [
            { symbol: "H", count: 4, color: "#f8fafc", radius: 0.2 },
            { symbol: "O", count: 2, color: "#ef4444", radius: 0.3 }
          ],
          description: "Two liquid water molecules."
        }
      ],
      productMolecules: [
        {
          name: "Hydrogen Gas Molecules",
          formula: "2H₂",
          coefficient: 2,
          atoms: [{ symbol: "H", count: 4, color: "#f8fafc", radius: 0.22 }],
          description: "Two diatomic hydrogen molecules (double volume)."
        },
        {
          name: "Oxygen Gas Molecule",
          formula: "O₂",
          coefficient: 1,
          atoms: [{ symbol: "O", count: 2, color: "#ef4444", radius: 0.3 }],
          description: "One diatomic oxygen molecule (single volume)."
        }
      ],
      conservationNotes: "4 H atoms and 2 O atoms before and after. Volume ratio 2H₂ : 1O₂ reflects molecular stoichiometry."
    },
    balancingChallenge: {
      unbalancedEquation: "H₂O → H₂ + O₂",
      reactants: [
        { formula: "H₂O", correctCoefficient: 2, min: 1, max: 4 }
      ],
      products: [
        { formula: "H₂", correctCoefficient: 2, min: 1, max: 4 },
        { formula: "O₂", correctCoefficient: 1, min: 1, max: 4 }
      ],
      elementCounts: {
        H: { reactantMultiplier: [2], productMultiplier: [2, 0] },
        O: { reactantMultiplier: [1], productMultiplier: [0, 2] }
      },
      explanation: "2 oxygen atoms on product side require 2 H₂O molecules, producing 2 H₂ molecules: 2H₂O → 2H₂ + O₂."
    },
    realLabHighlights: {
      glasswareType: "electrolysis_cell",
      visualEffectType: "gas_tubes_2to1",
      soundEffect: "pop_and_glow",
      temperatureDeltaCelsius: 2
    }
  },

  // Activity 1.8
  {
    activityNumber: "Activity 1.8",
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.2.2, Pages 9–10 (Figure 1.7)",
    title: "Photolytic Decomposition of Silver Chloride in Sunlight",
    apparatus: [
      "China dish (evaporating dish)",
      "Spatula",
      "Watch glass",
      "Sunlight source / UV lamp"
    ],
    chemicals: {
      reactants: [
        {
          name: "Silver Chloride Powder",
          formula: "AgCl",
          state: "s",
          physicalForm: "powder",
          color: "Pure white light-sensitive powder",
          hexColor: "#f8fafc",
          description: "White solid salt stored in dark amber glass bottles to prevent premature photodecomposition."
        }
      ],
      products: [
        {
          name: "Silver Metal",
          formula: "Ag",
          state: "s",
          physicalForm: "powder",
          color: "Metallic grey solid particles",
          hexColor: "#94a3b8",
          description: "Elemental silver precipitated as fine grey metallic crystals."
        },
        {
          name: "Chlorine Gas",
          formula: "Cl₂",
          state: "g",
          physicalForm: "gas",
          color: "Pale greenish-yellow suffocating gas",
          hexColor: "#bef264",
          transparency: 0.1,
          description: "Gaseous halogen that escapes into the air."
        }
      ]
    },
    procedure: [
      "Take about 2 g of white silver chloride powder in a clean china dish.",
      "Note the initial pure white colour of the powder.",
      "Place the china dish on a windowsill directly in the sunlight for some time.",
      "Observe the gradual transformation of the powder colour."
    ],
    observations: [
      "The pristine white colour of silver chloride gradually darkens.",
      "After exposure to bright sunlight, the powder turns distinctly grey.",
      "Traces of pungent chlorine gas escape."
    ],
    chemicalEquation: "2AgCl(s) →[Sunlight] 2Ag(s) + Cl₂(g)",
    balancedEquation: "2AgCl(s) xrightarrow{\text{Sunlight}} 2Ag(s) + Cl₂(g)↑",
    reactionTypes: ["Decomposition", "Endothermic", "Redox"],
    relevantExplanation: "White silver chloride turns grey in sunlight due to photolytic decomposition. Photons from solar light provide energy to break the ionic bonds, decomposing silver chloride into elemental grey silver metal and chlorine gas. A similar photolytic reaction occurs with silver bromide (2AgBr → 2Ag + Br₂), which was historically used in black-and-white photography.",
    safetyConsiderations: [
      "Store silver salts in dark amber reagent bottles protected from light.",
      "Avoid contact with skin; silver ions reduce on skin to form dark, stubborn stains.",
      "Perform photolysis in a well-ventilated space to let chlorine dissipate."
    ],
    verificationStatus: "Verified against NCERT Chapter 1 (jesc1ps.pdf)",
    sources: [
      "NCERT Class 10 Science, Chapter 1, Section 1.2.2, Pages 9–10",
      "NCERT Science Figure 1.7: Silver chloride turns grey in sunlight to form silver metal"
    ],
    simulationSteps: [
      {
        stepNumber: 1,
        instruction: "Use a spatula to place white silver chloride (AgCl) powder into the china dish.",
        actionPrompt: "Transfer AgCl powder into china dish.",
        apparatusInvolved: ["China dish", "Spatula", "AgCl amber bottle"],
        animationKey: "add_agcl_powder",
        hint: "Notice the pure white color of the fresh AgCl."
      },
      {
        stepNumber: 2,
        instruction: "Position the china dish beneath direct sunlight on the windowsill.",
        actionPrompt: "Slide dish into the sunlight beam.",
        apparatusInvolved: ["China dish", "Sunlight beam"],
        animationKey: "expose_to_sunlight",
        hint: "Photons begin cleaving Ag-Cl chemical bonds."
      },
      {
        stepNumber: 3,
        instruction: "Observe the white powder turn into fine grey metallic silver as Cl₂ gas diffuses.",
        actionPrompt: "Observe gradual darkening to metallic grey.",
        apparatusInvolved: ["China dish"],
        animationKey: "photolysis_to_grey_silver",
        hint: "This fundamental photochemical reaction enabled black-and-white photography!"
      }
    ],
    molecularView: {
      reactantMolecules: [
        {
          name: "Silver Chloride Units",
          formula: "2AgCl",
          coefficient: 2,
          atoms: [
            { symbol: "Ag⁺", count: 2, color: "#cbd5e1", radius: 0.38 },
            { symbol: "Cl⁻", count: 2, color: "#84cc16", radius: 0.35 }
          ],
          description: "Two ionic units of silver chloride."
        }
      ],
      productMolecules: [
        {
          name: "Silver Atoms",
          formula: "2Ag",
          coefficient: 2,
          atoms: [{ symbol: "Ag", count: 2, color: "#94a3b8", radius: 0.38 }],
          description: "Two neutral grey elemental silver atoms."
        },
        {
          name: "Chlorine Molecule",
          formula: "Cl₂",
          coefficient: 1,
          atoms: [{ symbol: "Cl", count: 2, color: "#84cc16", radius: 0.35 }],
          description: "Diatomic chlorine gas molecule."
        }
      ],
      conservationNotes: "2 Ag and 2 Cl atoms on both sides. Energy absorbed from sunlight driving endothermic breakdown."
    },
    balancingChallenge: {
      unbalancedEquation: "AgCl → Ag + Cl₂",
      reactants: [
        { formula: "AgCl", correctCoefficient: 2, min: 1, max: 4 }
      ],
      products: [
        { formula: "Ag", correctCoefficient: 2, min: 1, max: 4 },
        { formula: "Cl₂", correctCoefficient: 1, min: 1, max: 4 }
      ],
      elementCounts: {
        Ag: { reactantMultiplier: [1], productMultiplier: [1, 0] },
        Cl: { reactantMultiplier: [1], productMultiplier: [0, 2] }
      },
      explanation: "Since Cl₂ has two chlorine atoms, 2 formula units of AgCl are required, yielding 2 Ag atoms: 2AgCl → 2Ag + Cl₂."
    },
    realLabHighlights: {
      glasswareType: "china_dish",
      visualEffectType: "light_photolysis",
      soundEffect: "sunlight_hum",
      temperatureDeltaCelsius: 3
    }
  },

  // Activity 1.9
  {
    activityNumber: "Activity 1.9",
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.2.3, Pages 10–11 (Figure 1.8)",
    title: "Displacement Reaction of Iron Nails in Copper Sulphate Solution",
    apparatus: [
      "Two test tubes (labelled A and B)",
      "Test tube rack",
      "Three iron nails",
      "Thread",
      "Sandpaper",
      "Clamp stand"
    ],
    chemicals: {
      reactants: [
        {
          name: "Clean Iron Nails",
          formula: "Fe",
          state: "s",
          physicalForm: "metal_strip",
          color: "Silvery-grey lustrous iron nail",
          hexColor: "#94a3b8",
          description: "Cleaned iron nails rubbed with sandpaper to expose fresh metal surface."
        },
        {
          name: "Copper(II) Sulphate Solution",
          formula: "CuSO₄",
          state: "aq",
          physicalForm: "liquid",
          color: "Deep brilliant blue solution",
          hexColor: "#0284c7",
          transparency: 0.35,
          description: "Aqueous copper sulphate solution (blue vitriol)."
        }
      ],
      products: [
        {
          name: "Ferrous Sulphate Solution",
          formula: "FeSO₄",
          state: "aq",
          physicalForm: "liquid",
          color: "Pale light green solution",
          hexColor: "#86efac",
          transparency: 0.3,
          description: "Aqueous ferrous sulphate replacing the blue solution."
        },
        {
          name: "Copper Metal Coating",
          formula: "Cu",
          state: "s",
          physicalForm: "metal_strip",
          color: "Reddish-brown velvety copper coating",
          hexColor: "#b45309",
          description: "Elemental copper displaced and deposited on the immersed iron nails."
        }
      ]
    },
    procedure: [
      "Take three clean iron nails and polish them with sandpaper to remove rust or grease.",
      "Take two test tubes marked (A) and (B). Add 10 mL of blue copper sulphate solution into each.",
      "Keep test tube (A) in the rack as a control standard for colour comparison.",
      "Tie two iron nails with a thread and immerse them into test tube (B) for about 20 minutes.",
      "Keep the third iron nail aside as a reference nail.",
      "After 20 minutes, retrieve the iron nails from tube (B) and compare both liquid and nail colours."
    ],
    observations: [
      "The deep blue colour of copper sulphate solution in test tube (B) fades and transforms into a pale light green colour.",
      "Control test tube (A) remains deep blue.",
      "The immersed iron nails acquire a thick, reddish-brown deposit/coating of copper metal.",
      "The control iron nail remains lustrous silvery-grey."
    ],
    chemicalEquation: "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)",
    balancedEquation: "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓",
    reactionTypes: ["Displacement", "Redox"],
    relevantExplanation: "Iron is more reactive than copper in the reactivity series. Iron displaces copper from copper sulphate solution. Iron atoms lose two electrons (Fe → Fe²⁺ + 2e⁻, oxidation) and enter solution as pale-green FeSO₄. Cu²⁺ ions in solution gain these electrons (Cu²⁺ + 2e⁻ → Cu, reduction) and deposit on the iron surface as reddish-brown copper metal.",
    safetyConsiderations: [
      "Copper sulphate is an environmental pollutant and harmful if ingested.",
      "Do not handle rusty nails carelessly to avoid skin punctures.",
      "Dispose of heavy metal solutions responsibly."
    ],
    verificationStatus: "Verified against NCERT Chapter 1 (jesc1ps.pdf)",
    sources: [
      "NCERT Class 10 Science, Chapter 1, Section 1.2.3, Pages 10–11",
      "NCERT Science Figure 1.8: Iron nails dipped in copper sulphate solution and comparison of test tubes A and B"
    ],
    simulationSteps: [
      {
        stepNumber: 1,
        instruction: "Fill two test tubes (A and B) with 10 mL of deep blue copper sulphate solution.",
        actionPrompt: "Pour blue CuSO₄ into test tubes A and B.",
        apparatusInvolved: ["Test tubes A & B", "CuSO₄ bottle"],
        animationKey: "pour_cuso4_solutions",
        hint: "Test tube A will act as a control standard."
      },
      {
        stepNumber: 2,
        instruction: "Clean iron nails with sandpaper, tie with thread, and immerse into tube B.",
        actionPrompt: "Lower iron nails into test tube B.",
        apparatusInvolved: ["Iron nails", "Test tube B", "Thread"],
        animationKey: "immerse_iron_nails",
        hint: "Note the shiny grey iron entering the blue liquid."
      },
      {
        stepNumber: 3,
        instruction: "Fast-forward 20 minutes: observe blue liquid turning light green and iron nail turning reddish-brown.",
        actionPrompt: "Pull out nail and compare with control nail and tube A.",
        apparatusInvolved: ["Test tube B", "Control nail", "Test tube A"],
        animationKey: "observe_copper_displacement",
        hint: "Iron displaces copper: Fe²⁺ turns solution pale green while Cu coats the nail!"
      }
    ],
    molecularView: {
      reactantMolecules: [
        {
          name: "Iron Atoms",
          formula: "Fe",
          coefficient: 1,
          atoms: [{ symbol: "Fe", count: 1, color: "#94a3b8", radius: 0.38 }],
          description: "Solid iron atom with 0 oxidation state."
        },
        {
          name: "Copper Sulphate",
          formula: "CuSO₄",
          coefficient: 1,
          atoms: [
            { symbol: "Cu²⁺", count: 1, color: "#0284c7", radius: 0.37 },
            { symbol: "S", count: 1, color: "#eab308", radius: 0.35 },
            { symbol: "O", count: 4, color: "#ef4444", radius: 0.26 }
          ],
          description: "Hydrated Cu²⁺ ions giving the vibrant blue colour."
        }
      ],
      productMolecules: [
        {
          name: "Ferrous Sulphate",
          formula: "FeSO₄",
          coefficient: 1,
          atoms: [
            { symbol: "Fe²⁺", count: 1, color: "#86efac", radius: 0.36 },
            { symbol: "S", count: 1, color: "#eab308", radius: 0.35 },
            { symbol: "O", count: 4, color: "#ef4444", radius: 0.26 }
          ],
          description: "Aqueous Fe²⁺ ions imparting pale green colour."
        },
        {
          name: "Copper Atoms",
          formula: "Cu",
          coefficient: 1,
          atoms: [{ symbol: "Cu", count: 1, color: "#b45309", radius: 0.37 }],
          description: "Neutral reddish-brown metallic copper atoms deposited."
        }
      ],
      conservationNotes: "1 Fe, 1 Cu, 1 S, 4 O atoms. Electron transfer redox displacement."
    },
    balancingChallenge: {
      unbalancedEquation: "Fe + CuSO₄ → FeSO₄ + Cu",
      reactants: [
        { formula: "Fe", correctCoefficient: 1, min: 1, max: 4 },
        { formula: "CuSO₄", correctCoefficient: 1, min: 1, max: 4 }
      ],
      products: [
        { formula: "FeSO₄", correctCoefficient: 1, min: 1, max: 4 },
        { formula: "Cu", correctCoefficient: 1, min: 1, max: 4 }
      ],
      elementCounts: {
        Fe: { reactantMultiplier: [1, 0], productMultiplier: [1, 0] },
        Cu: { reactantMultiplier: [0, 1], productMultiplier: [0, 1] },
        S: { reactantMultiplier: [0, 1], productMultiplier: [1, 0] },
        O: { reactantMultiplier: [0, 4], productMultiplier: [4, 0] }
      },
      explanation: "Equimolar single displacement reaction: Fe + CuSO₄ → FeSO₄ + Cu."
    },
    realLabHighlights: {
      glasswareType: "test_tube",
      visualEffectType: "color_and_deposit",
      soundEffect: "clink",
      temperatureDeltaCelsius: 1
    }
  },

  // Activity 1.10
  {
    activityNumber: "Activity 1.10",
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.2.4, Pages 11–12 (Figure 1.9)",
    title: "Double Displacement Reaction: Sodium Sulphate and Barium Chloride",
    apparatus: [
      "Two test tubes (Borosilicate)",
      "Test tube rack",
      "Droppers / measuring cylinders",
      "Stirring rod"
    ],
    chemicals: {
      reactants: [
        {
          name: "Sodium Sulphate Solution",
          formula: "Na₂SO₄",
          state: "aq",
          physicalForm: "liquid",
          color: "Clear colourless aqueous solution",
          hexColor: "#f1f5f9",
          transparency: 0.15,
          description: "Aqueous sodium sulphate solution (approx 3 mL)."
        },
        {
          name: "Barium Chloride Solution",
          formula: "BaCl₂",
          state: "aq",
          physicalForm: "liquid",
          color: "Clear colourless aqueous solution",
          hexColor: "#e2e8f0",
          transparency: 0.15,
          description: "Aqueous barium chloride solution (approx 3 mL)."
        }
      ],
      products: [
        {
          name: "Barium Sulphate Precipitate",
          formula: "BaSO₄",
          state: "s",
          physicalForm: "precipitate",
          color: "Dense opaque white precipitate",
          hexColor: "#ffffff",
          description: "Extremely insoluble dense white precipitate."
        },
        {
          name: "Sodium Chloride Solution",
          formula: "NaCl",
          state: "aq",
          physicalForm: "liquid",
          color: "Clear colourless aqueous solution",
          hexColor: "#f8fafc",
          transparency: 0.15,
          description: "Soluble common salt remaining dissolved in supernatant liquid."
        }
      ]
    },
    procedure: [
      "Take about 3 mL of sodium sulphate solution in a clean test tube.",
      "In another test tube, take about 3 mL of barium chloride solution.",
      "Mix the two solutions together into one test tube.",
      "Observe the instantaneous formation of insoluble precipitate."
    ],
    observations: [
      "Both reactant liquids are transparent and colourless.",
      "The instant the two liquids mix, a milky, opaque, snow-white precipitate forms.",
      "The white precipitate (BaSO₄) gradually settles to the bottom on standing."
    ],
    chemicalEquation: "Na₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s) + 2NaCl(aq)",
    balancedEquation: "Na₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s)↓ + 2NaCl(aq)",
    reactionTypes: ["Double Displacement", "Precipitation"],
    relevantExplanation: "A double displacement reaction involves mutual exchange of ions between the reactants. The Ba²⁺ ions from barium chloride combine with SO₄²⁻ ions from sodium sulphate to create insoluble white barium sulphate (BaSO₄) precipitate. The Na⁺ and Cl⁻ ions remain in aqueous solution as soluble sodium chloride.",
    safetyConsiderations: [
      "CAUTION: Soluble barium compounds are toxic if ingested.",
      "Wear eye protection and avoid skin contact.",
      "Dispose of chemical waste in the heavy metal salt container."
    ],
    verificationStatus: "Verified against NCERT Chapter 1 (jesc1ps.pdf)",
    sources: [
      "NCERT Class 10 Science, Chapter 1, Section 1.2.4, Pages 11–12",
      "NCERT Science Figure 1.9: Formation of barium sulphate and sodium chloride"
    ],
    simulationSteps: [
      {
        stepNumber: 1,
        instruction: "Add 3 mL colourless sodium sulphate solution into the first test tube.",
        actionPrompt: "Pour Na₂SO₄ into test tube 1.",
        apparatusInvolved: ["Test tube 1", "Na₂SO₄ bottle"],
        animationKey: "pour_na2so4",
        hint: "Notice the clear, transparent liquid."
      },
      {
        stepNumber: 2,
        instruction: "Add 3 mL colourless barium chloride solution into the second test tube.",
        actionPrompt: "Pour BaCl₂ into test tube 2.",
        apparatusInvolved: ["Test tube 2", "BaCl₂ bottle"],
        animationKey: "pour_bacl2",
        hint: "Both solutions look identical to distilled water."
      },
      {
        stepNumber: 3,
        instruction: "Pour the barium chloride solution into the sodium sulphate tube.",
        actionPrompt: "Pour and mix both tubes together.",
        apparatusInvolved: ["Test tube 1", "Test tube 2"],
        animationKey: "mix_and_precipitate_baso4",
        hint: "Boom! An instantaneous white cloud of insoluble BaSO₄ precipitate forms!"
      }
    ],
    molecularView: {
      reactantMolecules: [
        {
          name: "Sodium Sulphate Units",
          formula: "Na₂SO₄",
          coefficient: 1,
          atoms: [
            { symbol: "Na⁺", count: 2, color: "#60a5fa", radius: 0.32 },
            { symbol: "S", count: 1, color: "#eab308", radius: 0.35 },
            { symbol: "O", count: 4, color: "#ef4444", radius: 0.26 }
          ],
          description: "Two sodium cations and one sulphate anion."
        },
        {
          name: "Barium Chloride Units",
          formula: "BaCl₂",
          coefficient: 1,
          atoms: [
            { symbol: "Ba²⁺", count: 1, color: "#14b8a6", radius: 0.44 },
            { symbol: "Cl⁻", count: 2, color: "#84cc16", radius: 0.35 }
          ],
          description: "One barium cation and two chloride anions."
        }
      ],
      productMolecules: [
        {
          name: "Barium Sulphate Precipitate",
          formula: "BaSO₄",
          coefficient: 1,
          atoms: [
            { symbol: "Ba²⁺", count: 1, color: "#14b8a6", radius: 0.44 },
            { symbol: "S", count: 1, color: "#eab308", radius: 0.35 },
            { symbol: "O", count: 4, color: "#ef4444", radius: 0.26 }
          ],
          description: "Insoluble BaSO₄ ionic crystal precipitate."
        },
        {
          name: "Sodium Chloride Units",
          formula: "2NaCl",
          coefficient: 2,
          atoms: [
            { symbol: "Na⁺", count: 2, color: "#60a5fa", radius: 0.32 },
            { symbol: "Cl⁻", count: 2, color: "#84cc16", radius: 0.35 }
          ],
          description: "Two units of soluble aqueous table salt."
        }
      ],
      conservationNotes: "2 Na, 1 Ba, 1 S, 4 O, 2 Cl on both sides. Perfect mass conservation."
    },
    balancingChallenge: {
      unbalancedEquation: "Na₂SO₄ + BaCl₂ → BaSO₄ + NaCl",
      reactants: [
        { formula: "Na₂SO₄", correctCoefficient: 1, min: 1, max: 4 },
        { formula: "BaCl₂", correctCoefficient: 1, min: 1, max: 4 }
      ],
      products: [
        { formula: "BaSO₄", correctCoefficient: 1, min: 1, max: 4 },
        { formula: "NaCl", correctCoefficient: 2, min: 1, max: 4 }
      ],
      elementCounts: {
        Na: { reactantMultiplier: [2, 0], productMultiplier: [0, 1] },
        SO4: { reactantMultiplier: [1, 0], productMultiplier: [1, 0] },
        Ba: { reactantMultiplier: [0, 1], productMultiplier: [1, 0] },
        Cl: { reactantMultiplier: [0, 2], productMultiplier: [0, 1] }
      },
      explanation: "2 sodium atoms and 2 chloride atoms form 2 units of NaCl: Na₂SO₄ + BaCl₂ → BaSO₄ + 2NaCl."
    },
    realLabHighlights: {
      glasswareType: "test_tube",
      visualEffectType: "white_precipitate",
      soundEffect: "precipitate",
      temperatureDeltaCelsius: 0
    }
  },

  // Activity 1.11
  {
    activityNumber: "Activity 1.11",
    ncertReference: "NCERT Class 10 Science, Chapter 1, Section 1.2.5, Pages 12–13 (Figure 1.10)",
    title: "Oxidation of Copper to Copper(II) Oxide and Reduction with Hydrogen",
    apparatus: [
      "China dish",
      "Tripod stand",
      "Wire gauze",
      "Bunsen burner",
      "Glass delivery tube (for hydrogen gas passage)",
      "Tongs"
    ],
    chemicals: {
      reactants: [
        {
          name: "Copper Powder",
          formula: "Cu",
          state: "s",
          physicalForm: "powder",
          color: "Reddish-brown fine metal powder",
          hexColor: "#b45309",
          description: "Elemental copper powder having high surface area."
        },
        {
          name: "Oxygen (from air)",
          formula: "O₂",
          state: "g",
          physicalForm: "gas",
          color: "Colourless atmospheric oxygen",
          hexColor: "#93c5fd",
          transparency: 0.1,
          description: "Atmospheric oxygen combining upon heating."
        },
        {
          name: "Hydrogen Gas (Step 2)",
          formula: "H₂",
          state: "g",
          physicalForm: "gas",
          color: "Colourless reducing gas",
          hexColor: "#e0f2fe",
          transparency: 0.1,
          description: "Reducing agent passed over heated black copper oxide."
        }
      ],
      products: [
        {
          name: "Copper(II) Oxide (Black)",
          formula: "CuO",
          state: "s",
          physicalForm: "powder",
          color: "Jet-black solid coating",
          hexColor: "#1e293b",
          description: "Black oxidised layer of copper(II) oxide formed in Step 1."
        },
        {
          name: "Regenerated Copper Metal (Step 2)",
          formula: "Cu",
          state: "s",
          physicalForm: "powder",
          color: "Reddish-brown restored copper metal",
          hexColor: "#b45309",
          description: "Copper metal restored when CuO is reduced by hydrogen."
        },
        {
          name: "Water Vapour (Step 2)",
          formula: "H₂O",
          state: "g",
          physicalForm: "gas",
          color: "Water vapour / steam",
          hexColor: "#38bdf8",
          transparency: 0.2,
          description: "Formed as hydrogen is oxidised."
        }
      ]
    },
    procedure: [
      "Place about 1 g of reddish-brown copper powder in a china dish.",
      "Place the china dish on wire gauze supported by a tripod stand.",
      "Heat the china dish strongly using a Bunsen burner.",
      "Observe the colour change of the surface of the copper powder.",
      "Subsequently, pass hydrogen gas over the heated black material and observe."
    ],
    observations: [
      "During heating in air: The reddish-brown surface of copper powder becomes completely coated with a jet-black substance (Copper(II) oxide).",
      "During passage of hydrogen gas: The black surface layer reverts back to the original reddish-brown colour as metallic copper is regenerated, and moisture droplets appear."
    ],
    chemicalEquation: "Step 1: 2Cu(s) + O₂(g) →[Heat] 2CuO(s) | Step 2: CuO(s) + H₂(g) →[Heat] Cu(s) + H₂O(g)",
    balancedEquation: "2Cu(s) + O₂(g) xrightarrow{Δ} 2CuO(s) ; CuO(s) + H₂(g) xrightarrow{Δ} Cu(s) + H₂O(g)",
    reactionTypes: ["Oxidation", "Reduction", "Redox"],
    relevantExplanation: "When copper is heated in the presence of oxygen, copper gains oxygen to form black copper(II) oxide (oxidation of Cu: 2Cu + O₂ → 2CuO). When hydrogen gas is subsequently passed over this hot black CuO, oxygen is removed from copper oxide (reduction of CuO to Cu) and gained by hydrogen (oxidation of H₂ to H₂O). This elegantly demonstrates a simultaneous oxidation-reduction (redox) reaction.",
    safetyConsiderations: [
      "CAUTION: Hot china dish and tripod stand; handle only with laboratory tongs.",
      "Hydrogen gas is highly flammable; never allow open flames near hydrogen gas outlets.",
      "Allow apparatus to cool before cleanup."
    ],
    verificationStatus: "Verified against NCERT Chapter 1 (jesc1ps.pdf)",
    sources: [
      "NCERT Class 10 Science, Chapter 1, Section 1.2.5, Pages 12–13",
      "NCERT Science Figure 1.10: Oxidation of copper to copper oxide"
    ],
    simulationSteps: [
      {
        stepNumber: 1,
        instruction: "Place 1 g reddish-brown copper powder into the china dish on the tripod stand.",
        actionPrompt: "Put copper powder on china dish.",
        apparatusInvolved: ["China dish", "Tripod stand", "Wire gauze"],
        animationKey: "place_copper_powder",
        hint: "Observe the characteristic reddish-brown metallic color of pure copper."
      },
      {
        stepNumber: 2,
        instruction: "Light the Bunsen burner beneath the china dish and heat strongly in air.",
        actionPrompt: "Ignite burner and heat copper powder.",
        apparatusInvolved: ["Bunsen burner", "China dish"],
        animationKey: "heat_copper_oxidation",
        hint: "Oxygen in air reacts with copper to form a jet-black CuO surface layer!"
      },
      {
        stepNumber: 3,
        instruction: "Pass hydrogen gas over the hot black CuO to reverse the reaction (Redox).",
        actionPrompt: "Pass H₂ gas stream over heated dish.",
        apparatusInvolved: ["H₂ delivery tube", "China dish"],
        animationKey: "reduce_cuo_with_h2",
        hint: "Watch the black coating turn back to reddish-brown copper as H₂ takes the oxygen!"
      }
    ],
    molecularView: {
      reactantMolecules: [
        {
          name: "Copper Atoms",
          formula: "2Cu",
          coefficient: 2,
          atoms: [{ symbol: "Cu", count: 2, color: "#b45309", radius: 0.38 }],
          description: "Two elemental copper atoms."
        },
        {
          name: "Oxygen Molecule",
          formula: "O₂",
          coefficient: 1,
          atoms: [{ symbol: "O", count: 2, color: "#ef4444", radius: 0.3 }],
          description: "One diatomic oxygen molecule."
        }
      ],
      productMolecules: [
        {
          name: "Copper(II) Oxide Units",
          formula: "2CuO",
          coefficient: 2,
          atoms: [
            { symbol: "Cu²⁺", count: 2, color: "#1e293b", radius: 0.36 },
            { symbol: "O²⁻", count: 2, color: "#ef4444", radius: 0.3 }
          ],
          description: "Black copper(II) oxide lattice."
        }
      ],
      conservationNotes: "2 Cu and 2 O atoms on both sides. Subsequent reduction: CuO + H₂ → Cu + H₂O keeps 1 Cu, 1 O, 2 H conserved."
    },
    balancingChallenge: {
      unbalancedEquation: "Cu + O₂ → CuO",
      reactants: [
        { formula: "Cu", correctCoefficient: 2, min: 1, max: 4 },
        { formula: "O₂", correctCoefficient: 1, min: 1, max: 4 }
      ],
      products: [
        { formula: "CuO", correctCoefficient: 2, min: 1, max: 4 }
      ],
      elementCounts: {
        Cu: { reactantMultiplier: [1, 0], productMultiplier: [1] },
        O: { reactantMultiplier: [0, 2], productMultiplier: [1] }
      },
      explanation: "2 oxygen atoms in O₂ require 2 units of CuO, balanced by 2 Cu atoms: 2Cu + O₂ → 2CuO."
    },
    realLabHighlights: {
      glasswareType: "china_dish",
      visualEffectType: "black_oxide_layer",
      soundEffect: "burner_flame",
      temperatureDeltaCelsius: 380
    }
  }
];
