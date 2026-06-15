import { site } from "../site";

export const rsvp = {
  label: "RSVP",
  title: "Will you join us?",
  description: `Please respond by ${site.rsvpDeadline}. We can't wait to celebrate with you.`,
  submitLabel: "Send RSVP",
  submittingLabel: "Sending...",
  successMessage: "Thank you — your RSVP has been received.",
  errorMessage: "Something went wrong. Please try again.",
  comingSoonMessage: "RSVP opens soon. Check back closer to the date.",
  cta: {
    label: "Reserve your seat",
    href: process.env.NEXT_PUBLIC_RSVP_URL || "#",
  },
  fields: {
    name: {
      label: "Your name",
      placeholder: "Full name",
    },
    attending: {
      label: "Attending?",
      placeholder: "Select response",
      options: [
        { value: "yes", label: "Joyfully accepts" },
        { value: "no", label: "Regretfully declines" },
      ],
    },
    message: {
      label: "Message (optional)",
      placeholder: "Share your wishes...",
    },
  },
} as const;
