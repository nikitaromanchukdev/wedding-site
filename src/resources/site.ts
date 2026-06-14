export const site = {
  couple: "Sarah & James",
  date: "Saturday, September 14, 2026",
  venue: "Villa Serenità",
  location: "Lake Como, Italy",
  tagline: "Two hearts, one beautiful beginning",
  rsvpDeadline: "August 1st",
} as const;

export const meta = {
  titleSuffix: "Wedding Invitation",
  get title() {
    return `${site.couple} — ${meta.titleSuffix}`;
  },
  description: site.tagline,
} as const;
