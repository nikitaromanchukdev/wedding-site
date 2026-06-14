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
 */
export const googleForm = {
  /** Replace with your Google Form ID */
  formId: "YOUR_FORM_ID_HERE",

  /** Maps logical field names → Google Form entry IDs */
  entries: {
    name: "entry.000000000",
    attending: "entry.000000001",
    message: "entry.000000002",
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
