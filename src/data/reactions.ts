import { ReactionType } from './experiments';

export interface ReactionRegistryItem {
  id: string;
  name: string;
  activityNumber?: string;
  unbalanced: string;
  balanced: string;
  types: ReactionType[];
  reactants: Array<{ formula: string; coefficient: number; state: string }>;
  products: Array<{ formula: string; coefficient: number; state: string }>;
  observationSummary: string;
  isNcertActivity: boolean;
}

export const NCERT_REACTIONS_REGISTRY: ReactionRegistryItem[] = [
  {
    id: "rxn-act-1.1",
    name: "Magnesium Combustion",
    activityNumber: "Activity 1.1",
    unbalanced: "Mg(s) + O₂(g) → MgO(s)",
    balanced: "2Mg(s) + O₂(g) → 2MgO(s)",
    types: ["Combination", "Exothermic", "Oxidation"],
    reactants: [
      { formula: "Mg", coefficient: 2, state: "s" },
      { formula: "O₂", coefficient: 1, state: "g" }
    ],
    products: [
      { formula: "MgO", coefficient: 2, state: "s" }
    ],
    observationSummary: "Dazzling white flame with white magnesium oxide powder residue.",
    isNcertActivity: true
  },
  {
    id: "rxn-act-1.2",
    name: "Lead Nitrate and Potassium Iodide",
    activityNumber: "Activity 1.2",
    unbalanced: "Pb(NO₃)₂(aq) + KI(aq) → PbI₂(s) + KNO₃(aq)",
    balanced: "Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ + 2KNO₃(aq)",
    types: ["Double Displacement", "Precipitation"],
    reactants: [
      { formula: "Pb(NO₃)₂", coefficient: 1, state: "aq" },
      { formula: "KI", coefficient: 2, state: "aq" }
    ],
    products: [
      { formula: "PbI₂", coefficient: 1, state: "s" },
      { formula: "KNO₃", coefficient: 2, state: "aq" }
    ],
    observationSummary: "Instant bright yellow lead iodide precipitate.",
    isNcertActivity: true
  },
  {
    id: "rxn-act-1.3",
    name: "Zinc and Dilute Sulphuric Acid",
    activityNumber: "Activity 1.3",
    unbalanced: "Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)",
    balanced: "Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)↑",
    types: ["Displacement", "Exothermic", "Redox"],
    reactants: [
      { formula: "Zn", coefficient: 1, state: "s" },
      { formula: "H₂SO₄", coefficient: 1, state: "aq" }
    ],
    products: [
      { formula: "ZnSO₄", coefficient: 1, state: "aq" },
      { formula: "H₂", coefficient: 1, state: "g" }
    ],
    observationSummary: "Effervescence of hydrogen gas and noticeable temperature rise.",
    isNcertActivity: true
  },
  {
    id: "rxn-act-1.4",
    name: "Quicklime and Water (Slaking of Lime)",
    activityNumber: "Activity 1.4",
    unbalanced: "CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat",
    balanced: "CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat",
    types: ["Combination", "Exothermic"],
    reactants: [
      { formula: "CaO", coefficient: 1, state: "s" },
      { formula: "H₂O", coefficient: 1, state: "l" }
    ],
    products: [
      { formula: "Ca(OH)₂", coefficient: 1, state: "aq" }
    ],
    observationSummary: "Vigorous reaction with hissing sound, steam, and large heat evolution.",
    isNcertActivity: true
  },
  {
    id: "rxn-act-1.5",
    name: "Thermal Decomposition of Ferrous Sulphate",
    activityNumber: "Activity 1.5",
    unbalanced: "FeSO₄(s) → Fe₂O₃(s) + SO₂(g) + SO₃(g)",
    balanced: "2FeSO₄(s) → Fe₂O₃(s) + SO₂(g)↑ + SO₃(g)↑",
    types: ["Decomposition", "Endothermic", "Redox"],
    reactants: [
      { formula: "FeSO₄", coefficient: 2, state: "s" }
    ],
    products: [
      { formula: "Fe₂O₃", coefficient: 1, state: "s" },
      { formula: "SO₂", coefficient: 1, state: "g" },
      { formula: "SO₃", coefficient: 1, state: "g" }
    ],
    observationSummary: "Green crystals turn white then reddish-brown; pungent choking burning-sulphur odour.",
    isNcertActivity: true
  },
  {
    id: "rxn-act-1.6",
    name: "Thermal Decomposition of Lead Nitrate",
    activityNumber: "Activity 1.6",
    unbalanced: "Pb(NO₃)₂(s) → PbO(s) + NO₂(g) + O₂(g)",
    balanced: "2Pb(NO₃)₂(s) → 2PbO(s) + 4NO₂(g)↑ + O₂(g)↑",
    types: ["Decomposition", "Endothermic", "Redox"],
    reactants: [
      { formula: "Pb(NO₃)₂", coefficient: 2, state: "s" }
    ],
    products: [
      { formula: "PbO", coefficient: 2, state: "s" },
      { formula: "NO₂", coefficient: 4, state: "g" },
      { formula: "O₂", coefficient: 1, state: "g" }
    ],
    observationSummary: "Decrepitation crackling, dense brown NO₂ fumes, and yellow PbO residue.",
    isNcertActivity: true
  },
  {
    id: "rxn-act-1.7",
    name: "Electrolysis of Water",
    activityNumber: "Activity 1.7",
    unbalanced: "H₂O(l) → H₂(g) + O₂(g)",
    balanced: "2H₂O(l) → 2H₂(g)↑ + O₂(g)↑",
    types: ["Decomposition", "Endothermic", "Redox"],
    reactants: [
      { formula: "H₂O", coefficient: 2, state: "l" }
    ],
    products: [
      { formula: "H₂", coefficient: 2, state: "g" },
      { formula: "O₂", coefficient: 1, state: "g" }
    ],
    observationSummary: "2:1 volume ratio of hydrogen (cathode) and oxygen (anode); pop sound for H₂.",
    isNcertActivity: true
  },
  {
    id: "rxn-act-1.8",
    name: "Photolysis of Silver Chloride",
    activityNumber: "Activity 1.8",
    unbalanced: "AgCl(s) → Ag(s) + Cl₂(g)",
    balanced: "2AgCl(s) → 2Ag(s) + Cl₂(g)↑",
    types: ["Decomposition", "Endothermic", "Redox"],
    reactants: [
      { formula: "AgCl", coefficient: 2, state: "s" }
    ],
    products: [
      { formula: "Ag", coefficient: 2, state: "s" },
      { formula: "Cl₂", coefficient: 1, state: "g" }
    ],
    observationSummary: "White solid turns grey in sunlight as chlorine gas evolves.",
    isNcertActivity: true
  },
  {
    id: "rxn-act-1.9",
    name: "Iron Nail in Copper Sulphate",
    activityNumber: "Activity 1.9",
    unbalanced: "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)",
    balanced: "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓",
    types: ["Displacement", "Redox"],
    reactants: [
      { formula: "Fe", coefficient: 1, state: "s" },
      { formula: "CuSO₄", coefficient: 1, state: "aq" }
    ],
    products: [
      { formula: "FeSO₄", coefficient: 1, state: "aq" },
      { formula: "Cu", coefficient: 1, state: "s" }
    ],
    observationSummary: "Blue solution turns pale green; nail gets covered with reddish-brown copper deposit.",
    isNcertActivity: true
  },
  {
    id: "rxn-act-1.10",
    name: "Sodium Sulphate and Barium Chloride",
    activityNumber: "Activity 1.10",
    unbalanced: "Na₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s) + NaCl(aq)",
    balanced: "Na₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s)↓ + 2NaCl(aq)",
    types: ["Double Displacement", "Precipitation"],
    reactants: [
      { formula: "Na₂SO₄", coefficient: 1, state: "aq" },
      { formula: "BaCl₂", coefficient: 1, state: "aq" }
    ],
    products: [
      { formula: "BaSO₄", coefficient: 1, state: "s" },
      { formula: "NaCl", coefficient: 2, state: "aq" }
    ],
    observationSummary: "Instant dense white precipitate of barium sulphate.",
    isNcertActivity: true
  },
  {
    id: "rxn-act-1.11a",
    name: "Oxidation of Copper to Copper Oxide",
    activityNumber: "Activity 1.11",
    unbalanced: "Cu(s) + O₂(g) → CuO(s)",
    balanced: "2Cu(s) + O₂(g) → 2CuO(s)",
    types: ["Combination", "Oxidation"],
    reactants: [
      { formula: "Cu", coefficient: 2, state: "s" },
      { formula: "O₂", coefficient: 1, state: "g" }
    ],
    products: [
      { formula: "CuO", coefficient: 2, state: "s" }
    ],
    observationSummary: "Reddish-brown copper powder surface becomes covered with black copper(II) oxide.",
    isNcertActivity: true
  },
  {
    id: "rxn-act-1.11b",
    name: "Reduction of Copper Oxide with Hydrogen",
    activityNumber: "Activity 1.11",
    unbalanced: "CuO(s) + H₂(g) → Cu(s) + H₂O(g)",
    balanced: "CuO(s) + H₂(g) → Cu(s) + H₂O(g)",
    types: ["Redox", "Reduction"],
    reactants: [
      { formula: "CuO", coefficient: 1, state: "s" },
      { formula: "H₂", coefficient: 1, state: "g" }
    ],
    products: [
      { formula: "Cu", coefficient: 1, state: "s" },
      { formula: "H₂O", coefficient: 1, state: "g" }
    ],
    observationSummary: "Black coating turns reddish-brown again as elemental copper is restored.",
    isNcertActivity: true
  }
];
