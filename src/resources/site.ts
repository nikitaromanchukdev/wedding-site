export const site = {
  couple: "Irina & Nikita",
  date: "Суббота, 14 сентября 2026 года",
  weddingDateTime: new Date("2026-09-14T16:30:00"),
  dateDisplay: {
    day: "14",
    month: "Сентября",
    time: "Церемония начнётся в 16:30",
  },
  venue: "Villa Serenità",
  location: "Lake Como, Italy",
  tagline: "Приглашаем вас разделить с нами этот особенный день",
  rsvpDeadline: "1 августа",
} as const;

export const features = {
  /** Show the RSVP form. When false, the form is hidden and a fallback message shows. */
  rsvpForm: false,
} as const;

export const meta = {
  titleSuffix: "Приглашение на свадьбу",
  get title() {
    return `${site.couple} — ${meta.titleSuffix}`;
  },
  description: site.tagline,
} as const;
