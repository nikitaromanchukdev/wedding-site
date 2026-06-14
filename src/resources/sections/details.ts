import { site } from "../site";

export type BodySegment = { text: string; strong?: boolean };

export const details = {
  label: "Good to know",
  title: "Everything\nyou need",
  cards: [
    {
      icon: "◈",
      title: "Getting There",
      body: [
        { text: site.venue, strong: true },
        { text: ` is located on ${site.location}. Private transfers will be arranged from ` },
        { text: "Como Station", strong: true },
        { text: ". A shuttle will run between the venue and local hotels throughout the evening." },
      ] as BodySegment[],
    },
    {
      icon: "◇",
      title: "Gifts",
      body: [
        { text: "Your presence is the gift. If you'd like to contribute something, we are building a " },
        { text: "travel fund", strong: true },
        { text: " for our honeymoon. Details will be shared after your RSVP is confirmed." },
      ] as BodySegment[],
    },
  ],
};
