export const site = {
  couple: "Sarah & James",
  date: "Saturday, September 14, 2026",
  weddingDateTime: new Date("2026-09-14T16:30:00"),
  dateDisplay: {
    day: "14",
    month: "September",
    year: "Two Thousand & Twenty-Six",
    time: "Ceremonies begin at 4:30 PM",
  },
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
