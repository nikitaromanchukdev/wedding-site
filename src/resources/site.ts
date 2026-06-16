export const site = {
  couple: "Irina & Nikita",
  date: "Суббота, 1 августа 2026 года",
  weddingDateTime: new Date("2026-08-01T17:00:00"),
  dateDisplay: {
    day: "1",
    month: "Августа",
    time: "Церемония начнётся в 17:00",
  },
  venue: "Villa Omnia",
  location: "Trębki Nowe 17A, 05-170",
  tagline: "Приглашаем вас разделить с нами\nэтот особенный день",
  rsvpDeadline: "1 июля",
  /** Google Maps link built from the venue + address. */
  get mapsUrl() {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${this.venue}, ${this.location}`
    )}`;
  },
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
