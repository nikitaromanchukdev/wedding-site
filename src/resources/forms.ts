/**
 * Google Form direct-submission config.
 *
 * How to find your entry IDs:
 * 1. Open your Google Form in the browser.
 * 2. View page source (or use prefill: .../viewform?usp=pp_url&entry.XXXXX=Test).
 * 3. Copy each `entry.XXXXXXXX` value into the map below.
 *
 * Form ID is the long string in the form URL:
 * https://docs.google.com/forms/d/e/{FORM_ID}/viewform
 *
 * Values come from NEXT_PUBLIC_* env vars (see .env.example).
 */
export const googleForm = {
  formId: process.env.NEXT_PUBLIC_GOOGLE_FORM_ID || "YOUR_FORM_ID_HERE",

  /** Maps logical field names → Google Form entry IDs */
  entries: {
    name: process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_NAME || "entry.000000000",
    attending: process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_ATTENDING || "entry.000000001",
    message: process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_MESSAGE || "entry.000000002",
  },
} as const;

export type RsvpFieldName = keyof typeof googleForm.entries;

export function getGoogleFormActionUrl(formId: string = googleForm.formId) {
  return `https://docs.google.com/forms/d/e/${formId}/formResponse`;
}

export function getGoogleFormEntryId(field: RsvpFieldName) {
  return googleForm.entries[field];
}

export function isGoogleFormConfigured() {
  return googleForm.formId !== "YOUR_FORM_ID_HERE";
}
