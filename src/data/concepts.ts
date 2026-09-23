export interface ChapterConcept {
  id: string;
  section: string;
  title: string;
  summary: string;
  ncertTextbookReference: string;
  keyPoints: string[];
  examples: Array<{ equation: string; description: string }>;
  realWorldApplications: string[];
}

export const NCERT_CONCEPTS: ChapterConcept[] = [
  {
    id: "chemical-equation-concept",
    section: "1.1",
    title: "Chemical Reactions & Law of Conservation of Mass",
    summary: "Whenever a chemical change occurs, we say a chemical reaction has taken place. A chemical equation represents a chemical reaction using chemical formulae.",
    ncertTextbookReference: "NCERT Class 10 Science, Chapter 1, Section 1.1, Pages 1–5",
    keyPoints: [
      "Indications of a chemical change: change in state, change in colour, evolution of a gas, change in temperature.",
      "Law of Conservation of Mass: Matter can neither be created nor destroyed in a chemical reaction.",
      "The total mass of the elements present in the products of a chemical reaction has to be equal to the total mass of the elements present in the reactants.",
      "The number of atoms of each element remains the same before and after a chemical reaction.",
      "Equations must be balanced using whole number coefficients (Hit-and-trial method)."
    ],
    examples: [
      {
        equation: "2Mg(s) + O₂(g) → 2MgO(s)",
        description: "Magnesium burns in air forming magnesium oxide."
      },
      {
        equation: "3Fe(s) + 4H₂O(g) → Fe₃O₄(s) + 4H₂(g)",
        description: "Iron reacting with steam to form iron(II,III) oxide and hydrogen."
      }
    ],
    realWorldApplications: [
      "Digestion of food in our bodies",
      "Combustion of fuels in vehicles",
      "Rusting of iron structures",
      "Fermentation of grapes"
    ]
  },
  {
    id: "combination-reactions",
    section: "1.2.1",
    title: "Combination Reactions & Exothermic Processes",
    summary: "A reaction in which a single product is formed from two or more reactants is known as a combination reaction.",
    ncertTextbookReference: "NCERT Class 10 Science, Chapter 1, Section 1.2.1, Pages 6–7",
    keyPoints: [
      "General form: A + B → AB",
      "Reactions in which heat is released along with the formation of products are called exothermic chemical reactions.",
      "Slaked lime (Ca(OH)₂) is used for white-washing walls; it reacts slowly with CO₂ in air to form a thin shiny layer of calcium carbonate (CaCO₃).",
      "Respiration is an exothermic reaction: C₆H₁₂O₆(aq) + 6O₂(aq) → 6CO₂(aq) + 6H₂O(l) + Energy.",
      "Decomposition of vegetable matter into compost is also an exothermic reaction."
    ],
    examples: [
      {
        equation: "CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat",
        description: "Slaking of quicklime by water releasing intense heat."
      },
      {
        equation: "C(s) + O₂(g) → CO₂(g)",
        description: "Burning of coal in excess oxygen."
      },
      {
        equation: "2H₂(g) + O₂(g) → 2H₂O(l)",
        description: "Formation of liquid water from hydrogen and oxygen gases."
      }
    ],
    realWorldApplications: [
      "White-washing of buildings using slaked lime",
      "Cellular respiration providing metabolic energy",
      "Industrial manufacturing of slaked lime and calcium salts"
    ]
  },
  {
    id: "decomposition-reactions",
    section: "1.2.2",
    title: "Decomposition Reactions (Thermal, Electrolytic & Photolytic)",
    summary: "A single reactant breaks down to give simpler products. Decomposition reactions require energy in the form of heat, light or electricity to break bonds (Endothermic reactions).",
    ncertTextbookReference: "NCERT Class 10 Science, Chapter 1, Section 1.2.2, Pages 8–10",
    keyPoints: [
      "General form: AB → A + B",
      "Thermal Decomposition: decomposition carried out by heating (e.g. FeSO₄, CaCO₃, Pb(NO₃)₂).",
      "Decomposition of limestone (CaCO₃ →[Heat] CaO + CO₂) is an important industrial reaction for manufacturing cement.",
      "Electrolytic Decomposition: decomposition using electrical current (e.g. electrolysis of water yielding H₂ and O₂ in 2:1 volume ratio).",
      "Photolytic Decomposition: decomposition activated by photons/sunlight (e.g. AgCl, AgBr turning grey).",
      "Reactions in which energy is absorbed are known as endothermic reactions."
    ],
    examples: [
      {
        equation: "CaCO₃(s) →[Heat] CaO(s) + CO₂(g)",
        description: "Thermal decomposition of calcium carbonate (limestone) into quicklime."
      },
      {
        equation: "2Pb(NO₃)₂(s) →[Heat] 2PbO(s) + 4NO₂(g) + O₂(g)",
        description: "Thermal decomposition of lead nitrate yielding brown NO₂ gas."
      },
      {
        equation: "2H₂O(l) →[Electricity] 2H₂(g) + O₂(g)",
        description: "Electrolysis of water."
      },
      {
        equation: "2AgBr(s) →[Sunlight] 2Ag(s) + Br₂(g)",
        description: "Photolytic decomposition used in black and white photography."
      }
    ],
    realWorldApplications: [
      "Manufacturing of quicklime for the cement industry",
      "Black and white photographic films and paper prints",
      "Extraction of reactive metals (sodium, aluminium) by electrolysis of molten salts"
    ]
  },
  {
    id: "displacement-reactions",
    section: "1.2.3",
    title: "Displacement Reactions",
    summary: "A reaction in which a more reactive element displaces a less reactive element from its compound solution.",
    ncertTextbookReference: "NCERT Class 10 Science, Chapter 1, Section 1.2.3, Pages 10–11",
    keyPoints: [
      "General form: A + BC → AC + B (where A is more reactive than B).",
      "Dependent upon the electrochemical reactivity series: K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Hg > Ag > Au.",
      "Zinc and lead are more reactive elements than copper, so they displace copper from its compounds."
    ],
    examples: [
      {
        equation: "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)",
        description: "Iron nail in blue copper sulphate solution turning green."
      },
      {
        equation: "Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)",
        description: "Zinc displacing copper from copper sulphate solution."
      },
      {
        equation: "Pb(s) + CuCl₂(aq) → PbCl₂(aq) + Cu(s)",
        description: "Lead displacing copper from copper(II) chloride solution."
      }
    ],
    realWorldApplications: [
      "Hydrometallurgical extraction of copper and silver",
      "Galvanic corrosion and sacrificial anode cathodic protection",
      "Laboratory chemical testing for metal reactivity"
    ]
  },
  {
    id: "double-displacement-reactions",
    section: "1.2.4",
    title: "Double Displacement & Precipitation Reactions",
    summary: "Reactions in which there is an exchange of ions between the reactants are called double displacement reactions. Often produces an insoluble salt called a precipitate.",
    ncertTextbookReference: "NCERT Class 10 Science, Chapter 1, Section 1.2.4, Pages 11–12",
    keyPoints: [
      "General form: AB + CD → AD + CB",
      "Precipitation reaction: Any reaction that produces an insoluble solid (precipitate) can be called a precipitation reaction.",
      "Ions in aqueous solutions exchange partners spontaneously due to thermodynamic stability of the insoluble lattice."
    ],
    examples: [
      {
        equation: "Na₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s)↓ + 2NaCl(aq)",
        description: "Formation of white barium sulphate precipitate."
      },
      {
        equation: "Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ + 2KNO₃(aq)",
        description: "Formation of canary-yellow lead iodide precipitate."
      }
    ],
    realWorldApplications: [
      "Water purification and wastewater removal of heavy metal toxins",
      "Analytical gravimetric determination of sulphate ions",
      "Kidney stone formation (calcium oxalate precipitation)"
    ]
  },
  {
    id: "redox-reactions",
    section: "1.2.5",
    title: "Oxidation, Reduction, Redox, Corrosion & Rancidity",
    summary: "Oxidation is the gain of oxygen or loss of hydrogen (or loss of electrons). Reduction is the loss of oxygen or gain of hydrogen (or gain of electrons). If one reactant gets oxidised while the other gets reduced, it is a Redox reaction.",
    ncertTextbookReference: "NCERT Class 10 Science, Chapter 1, Section 1.2.5, Pages 12–14",
    keyPoints: [
      "Oxidation: addition of oxygen or removal of hydrogen.",
      "Reduction: removal of oxygen or addition of hydrogen.",
      "Oxidising Agent: substance that gives oxygen or removes hydrogen (gets reduced itself).",
      "Reducing Agent: substance that removes oxygen or gives hydrogen (gets oxidised itself).",
      "Corrosion: When a metal is attacked by substances around it such as moisture, acids, etc., it is said to corrode. Examples: reddish-brown rust on iron (hydrated iron oxide Fe₂O₃·xH₂O), black coating on silver (Ag₂S), green coating on copper (basic copper carbonate).",
      "Rancidity: When fats and oils are oxidised, they become rancid and their smell and taste change. Prevented by adding antioxidants, vacuum packing, or flushing bags of potato chips with inert nitrogen gas."
    ],
    examples: [
      {
        equation: "CuO(s) + H₂(g) →[Heat] Cu(s) + H₂O(g)",
        description: "CuO is reduced to Cu; H₂ is oxidised to H₂O."
      },
      {
        equation: "ZnO(s) + C(s) → Zn(s) + CO(g)",
        description: "Carbon is oxidised to CO; ZnO is reduced to Zn."
      },
      {
        equation: "MnO₂(s) + 4HCl(aq) → MnCl₂(aq) + 2H₂O(l) + Cl₂(g)",
        description: "HCl is oxidised to Cl₂; MnO₂ is reduced to MnCl₂."
      }
    ],
    realWorldApplications: [
      "Flushing potato chips packages with nitrogen gas to prevent rancidity",
      "Painting and galvanising iron bridges to prevent destructive corrosion",
      "Combustion engines and cellular aerobic respiration"
    ]
  }
];
