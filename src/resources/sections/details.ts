import { site } from "../site";

export const details = {
  label: "The Celebration",
  title: "Save the date",
  items: [
    { label: "Date", value: site.date },
    { label: "Venue", value: site.venue },
    { label: "Location", value: site.location },
  ],
} as const;
