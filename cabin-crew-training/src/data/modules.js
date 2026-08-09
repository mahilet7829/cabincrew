export const modules = [
  {
    id: "safety-emergency",
    title: "Safety & Emergency Procedures",
    description: "Evacuation, fire, decompression, and emergency equipment.",
    icon: "🛟",
    lessons: [
      {
        id: "evacuation-basics",
        title: "Evacuation Procedures",
        content: `
## Evacuation Procedures

Cabin crew must be able to evacuate an aircraft in 90 seconds using only half the exits (this is the certification standard most airlines test against).

Key points:
- Command phrases must be loud, short, and repeated ("Release seatbelts, come this way, leave everything!")
- Assess exit viability before opening (look outside for fire/water/obstacles)
- Redirect passengers calmly if an exit is unusable
        `,
      },
      {
        id: "fire-onboard",
        title: "In-Flight Fire",
        content: `## In-Flight Fire\n\nCover the fire triangle, extinguisher types (Halon, water), and hidden fire risks (lavatory, ovens, lithium batteries).`,
      },
    ],
  },
  {
    id: "service-hospitality",
    title: "Service & Hospitality",
    description: "Passenger service standards, cabin etiquette, difficult passengers.",
    icon: "🍽️",
    lessons: [
      {
        id: "service-sequence",
        title: "Standard Service Sequence",
        content: `## Standard Service Sequence\n\nBoarding greeting → safety demo support → beverage/meal service → cabin checks → landing prep.`,
      },
    ],
  },
  {
    id: "grooming-presentation",
    title: "Grooming & Presentation",
    description: "Uniform standards, posture, and personal presentation for interviews.",
    icon: "💼",
    lessons: [
      {
        id: "grooming-standards",
        title: "Grooming Standards",
        content: `## Grooming Standards\n\nUniform fit, hair, makeup/grooming norms, and why airlines assess this at screening (represents brand image).`,
      },
    ],
  },
  {
    id: "interview-screening",
    title: "Interview & Screening Prep",
    description: "Group exercises, one-on-one interviews, common questions.",
    icon: "🎤",
    lessons: [
      {
        id: "common-questions",
        title: "Common Interview Questions",
        content: `## Common Interview Questions\n\n"Why cabin crew?", "Tell me about a time you handled a difficult customer", teamwork scenarios, and how assessors score group exercises.`,
      },
    ],
  },
];