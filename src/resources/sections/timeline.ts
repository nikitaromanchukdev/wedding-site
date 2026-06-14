export const timeline = {
  label: "The Celebration",
  title: "A day to remember",
  milestones: [
    {
      time: "3:00 PM",
      event: "Arrival &\nWelcome",
      description:
        "The gates open to ancient gardens. Champagne waits in the shade of olive trees. Find your people. Make new ones.",
      accent: "blue" as const,
      roman: "I",
      index: "Arrival",
    },
    {
      time: "4:30 PM",
      event: "The\nCeremony",
      description:
        "Beneath open sky, before everyone they love. The vows they wrote themselves — in their own words, from their own hearts.",
      accent: "hazel" as const,
      roman: "II",
      index: "Ceremony",
    },
    {
      time: "5:30 PM",
      event: "Cocktail\nHour",
      description:
        "An hour of aperitivo and golden light. The terrace is yours to wander. The evening is just beginning.",
      accent: "coffee" as const,
      roman: "III",
      index: "Cocktails",
    },
    {
      time: "7:30 PM",
      event: "Dinner &\nToasts",
      description:
        "A long table under lantern light. Words from those who have known them longest — and the laughter that lives between the speeches.",
      accent: "snow" as const,
      roman: "IV",
      index: "Dinner",
    },
    {
      time: "9:30 PM",
      event: "First\nDance",
      description:
        "The song they chose together. The floor is theirs first — then it belongs to all of you.",
      accent: "hazel" as const,
      roman: "V",
      index: "First Dance",
    },
    {
      time: "Until Midnight",
      event: "The\nNight",
      description:
        "Music. Stars above. The kind of night that stays with you longer than any photograph.",
      accent: "blue" as const,
      roman: "VI",
      index: "Celebration",
    },
  ],
} as const;
