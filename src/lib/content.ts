export type DiagramKey =
  | "forms"
  | "circuit"
  | "rollercoaster"
  | "sun"
  | "flashlight"
  | "heat"
  | "sound"
  | "collision";

export type Block =
  | { kind: "intro"; text: string }
  | { kind: "vocab"; items: { term: string; def: string }[] }
  | { kind: "diagram"; diagram: DiagramKey; caption: string }
  | { kind: "notes"; items: { heading: string; text: string; blanks: string[] }[] }
  | { kind: "mcq"; items: { q: string; options: string[]; answer: number }[] }
  | { kind: "fill"; bank: string[]; items: { text: string; answer: string }[] }
  | { kind: "match"; items: { left: string; right: string }[] }
  | { kind: "short"; items: { q: string; answer: string; lines?: number }[] }
  | { kind: "chain"; items: { device: string; steps: string[] }[] }
  | { kind: "sort"; categories: string[]; items: { word: string; cat: number }[] }
  | { kind: "cards"; items: { title: string; text: string; diagram?: DiagramKey }[] };

export type Section = { title: string; directions?: string; points?: number; block: Block };

export type Resource = {
  id: string;
  type: "Worksheet" | "Handout" | "Test" | "Quiz" | "Guided Notes" | "Visual Reference";
  title: string;
  subtitle: string;
  standard: string;
  minutes: number;
  sections: Section[];
};

const vocab = [
  { term: "Energy", def: "The ability to cause change or do work." },
  { term: "Kinetic energy", def: "The energy of motion. Faster objects have more." },
  { term: "Potential energy", def: "Stored energy because of position or condition." },
  { term: "Energy transfer", def: "Energy moving from one object or place to another." },
  { term: "Energy transformation", def: "Energy changing from one form into another." },
  { term: "Thermal energy", def: "Energy of heat; moves from warmer to cooler objects." },
  { term: "Electrical energy", def: "Energy carried by moving electric charges in a circuit." },
  { term: "Collision", def: "When two objects hit each other and transfer energy." },
];

export const resources: Resource[] = [
  {
    id: "notes",
    type: "Guided Notes",
    title: "Energy on the Move",
    subtitle: "Guided Notes: Transfer vs. Transformation",
    standard: "NGSS 4-PS3-2",
    minutes: 30,
    sections: [
      {
        title: "Big Idea",
        block: { kind: "intro", text: "Energy can't be created or destroyed. It can only MOVE (transfer) or CHANGE FORM (transform)." },
      },
      {
        title: "Fill in the Notes",
        directions: "Listen and fill in each blank as we learn together.",
        block: {
          kind: "notes",
          items: [
            { heading: "What is energy?", text: "Energy is the ability to cause ____ or do ____.", blanks: ["change", "work"] },
            { heading: "Kinetic energy", text: "Kinetic energy is the energy of ____. A faster ball has ____ kinetic energy.", blanks: ["motion", "more"] },
            { heading: "Potential energy", text: "Potential energy is ____ energy. A book on a high shelf has more potential energy than one on the ____.", blanks: ["stored", "floor"] },
            { heading: "Energy transfer", text: "In a transfer, energy moves from one ____ to another, like a bat hitting a ____.", blanks: ["object", "ball"] },
            { heading: "Energy transformation", text: "In a transformation, energy changes ____. A lamp changes electrical energy into ____ and heat.", blanks: ["form", "light"] },
          ],
        },
      },
      { title: "Sketch It", directions: "Study the diagram. Label one transfer and one transformation.", block: { kind: "diagram", diagram: "flashlight", caption: "Chemical → Electrical → Light + Thermal" } },
      { title: "Reflect", block: { kind: "short", items: [{ q: "In your own words, what is the difference between energy transfer and energy transformation?", answer: "Transfer = energy moves between objects; transformation = energy changes form.", lines: 3 }] } },
    ],
  },
  {
    id: "worksheet",
    type: "Worksheet",
    title: "Follow the Energy!",
    subtitle: "Energy Transformation Chains",
    standard: "NGSS 4-PS3-4",
    minutes: 35,
    sections: [
      { title: "Forms of Energy", directions: "Use this picture to help you.", block: { kind: "diagram", diagram: "forms", caption: "Six common forms of energy" } },
      {
        title: "Complete the Energy Chain",
        directions: "Write the missing form of energy in each empty box.",
        points: 8,
        block: {
          kind: "chain",
          items: [
            { device: "Toaster", steps: ["Electrical", "Thermal"] },
            { device: "Flashlight", steps: ["Chemical", "Electrical", "Light"] },
            { device: "Wind turbine", steps: ["Kinetic", "Electrical"] },
            { device: "Drum", steps: ["Kinetic", "Sound"] },
            { device: "Solar panel", steps: ["Light", "Electrical"] },
            { device: "Campfire", steps: ["Chemical", "Thermal", "Light"] },
          ],
        },
      },
      {
        title: "Sort It Out",
        directions: "Write each example in the correct column.",
        points: 8,
        block: {
          kind: "sort",
          categories: ["Energy Transfer", "Energy Transformation"],
          items: [
            { word: "A soccer ball kicked by a foot", cat: 0 },
            { word: "A lamp turns on", cat: 1 },
            { word: "A spoon gets hot in soup", cat: 0 },
            { word: "A radio plays music", cat: 1 },
            { word: "Bowling ball knocks pins", cat: 0 },
            { word: "Burning wood in a fireplace", cat: 1 },
            { word: "Hands warming by a heater", cat: 0 },
            { word: "Solar calculator works", cat: 1 },
          ],
        },
      },
      {
        title: "Think Like a Scientist",
        points: 4,
        block: { kind: "short", items: [{ q: "Pick an object in your home. Draw or write its energy chain.", answer: "Answers vary (e.g., TV: electrical → light + sound).", lines: 4 }] },
      },
    ],
  },
  {
    id: "handout",
    type: "Handout",
    title: "Energy Explorers",
    subtitle: "Student Reference Handout",
    standard: "NGSS 4-PS3-1, 4-PS3-2",
    minutes: 15,
    sections: [
      { title: "Key Vocabulary", block: { kind: "vocab", items: vocab } },
      {
        title: "4 Ways Energy Moves",
        block: {
          kind: "cards",
          items: [
            { title: "Sound", text: "Vibrations transfer energy through air, water, and solids.", diagram: "sound" },
            { title: "Light", text: "Light travels from the Sun to Earth and warms it.", diagram: "sun" },
            { title: "Heat", text: "Thermal energy flows from warmer to cooler objects.", diagram: "heat" },
            { title: "Electric current", text: "Electricity flows through a closed circuit.", diagram: "circuit" },
          ],
        },
      },
    ],
  },
  {
    id: "visual",
    type: "Visual Reference",
    title: "Speed & Energy",
    subtitle: "Anchor Chart Visual Reference",
    standard: "NGSS 4-PS3-1, 4-PS3-3",
    minutes: 10,
    sections: [
      { title: "The Roller Coaster Rule", block: { kind: "diagram", diagram: "rollercoaster", caption: "Top of the hill = most potential energy. Bottom = most kinetic energy." } },
      { title: "When Objects Collide", block: { kind: "diagram", diagram: "collision", caption: "The moving ball transfers energy to the still ball. Some becomes sound and heat!" } },
      {
        title: "Remember",
        block: {
          kind: "cards",
          items: [
            { title: "Faster = More", text: "The faster an object moves, the more kinetic energy it has." },
            { title: "Higher = More", text: "The higher an object is, the more potential energy it stores." },
            { title: "Never Lost", text: "Energy is never used up. It transfers or transforms." },
          ],
        },
      },
    ],
  },
  {
    id: "quiz",
    type: "Quiz",
    title: "Energy Quick Check",
    subtitle: "10-Point Quiz",
    standard: "NGSS 4-PS3-2",
    minutes: 15,
    sections: [
      {
        title: "Multiple Choice",
        directions: "Circle the best answer.",
        points: 6,
        block: {
          kind: "mcq",
          items: [
            { q: "Which has the MOST kinetic energy?", options: ["A parked car", "A rolling marble", "A speeding train", "A sleeping cat"], answer: 2 },
            { q: "A light bulb transforms electrical energy into…", options: ["sound and motion", "light and heat", "chemical energy", "potential energy"], answer: 1 },
            { q: "When you rub your hands together, motion becomes…", options: ["thermal energy", "light energy", "sound only", "electrical energy"], answer: 0 },
          ],
        },
      },
      {
        title: "Match It",
        directions: "Draw a line to match each word to its meaning.",
        points: 4,
        block: {
          kind: "match",
          items: [
            { left: "Kinetic", right: "Energy of motion" },
            { left: "Potential", right: "Stored energy" },
            { left: "Thermal", right: "Heat energy" },
            { left: "Transfer", right: "Energy moves to another object" },
          ],
        },
      },
    ],
  },
  {
    id: "test",
    type: "Test",
    title: "Energy Transfer & Transformation",
    subtitle: "Unit Assessment",
    standard: "NGSS 4-PS3-1 to 4-PS3-4",
    minutes: 45,
    sections: [
      {
        title: "Part A: Multiple Choice",
        directions: "Circle the letter of the best answer.",
        points: 10,
        block: {
          kind: "mcq",
          items: [
            { q: "Energy is best described as…", options: ["a type of matter", "the ability to cause change", "only electricity", "something that is used up"], answer: 1 },
            { q: "Which is an example of energy TRANSFER?", options: ["A battery powers a fan", "A pot of water heats on a stove", "A candle burns", "A plant grows"], answer: 1 },
            { q: "A wind turbine changes kinetic energy into…", options: ["electrical energy", "chemical energy", "sound energy", "potential energy"], answer: 0 },
            { q: "Where does a roller coaster have the most potential energy?", options: ["At the bottom", "In a loop", "At the top of the tallest hill", "At the station"], answer: 2 },
            { q: "Sound energy travels by…", options: ["magnets", "vibrations", "batteries", "shadows"], answer: 1 },
          ],
        },
      },
      {
        title: "Part B: Fill in the Blank",
        directions: "Use the word bank.",
        points: 5,
        block: {
          kind: "fill",
          bank: ["circuit", "faster", "collide", "warmer", "Sun"],
          items: [
            { text: "Electricity can only flow through a closed ____.", answer: "circuit" },
            { text: "Heat flows from ____ objects to cooler objects.", answer: "warmer" },
            { text: "When two cars ____, energy is transferred.", answer: "collide" },
            { text: "The ____ an object moves, the more energy it has.", answer: "faster" },
            { text: "Most of Earth's energy comes from the ____.", answer: "Sun" },
          ],
        },
      },
      { title: "Part C: Label the Circuit", directions: "Label the battery, wire, switch, and bulb.", points: 4, block: { kind: "diagram", diagram: "circuit", caption: "Label each part of this circuit." } },
      {
        title: "Part D: Constructed Response",
        points: 6,
        block: {
          kind: "short",
          items: [
            { q: "Explain what happens to energy when a bowling ball hits the pins.", answer: "Kinetic energy transfers from ball to pins; some transforms into sound and heat.", lines: 4 },
            { q: "Design a device that changes one form of energy into another. Describe its energy chain.", answer: "Answers vary; must show input form → output form.", lines: 5 },
          ],
        },
      },
    ],
  },
];
