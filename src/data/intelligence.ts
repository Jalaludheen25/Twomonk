/**
 * AI / Automation section content.
 *
 * NEEDS CONFIRMATION — the brochure does not mention AI. These capabilities are
 * proposed for a modern technology company; confirm what TwoMonk actually
 * delivers today and remove the rest. Claiming AI work you cannot staff is the
 * fastest way to lose a technical buyer.
 */

export type IntelligenceCapability = {
  index: string;
  name: string;
  description: string;
  /** Plain-language example of the work, not a buzzword. */
  example: string;
};

export const intelligenceHeadline = "Make your business smarter.";

export const intelligenceIntro =
  "AI is only worth adding where it removes real work. We look for the repetitive, expensive, human-in-the-loop tasks first — then automate those.";

export const intelligenceCapabilities: IntelligenceCapability[] = [
  {
    index: "01",
    name: "AI Integration",
    description:
      "Connecting language and vision models into the systems you already run.",
    example: "Draft replies from your own knowledge base, inside your own tools.",
  },
  {
    index: "02",
    name: "AI Assistants",
    description:
      "Support and internal assistants grounded in your documentation and data.",
    example: "A support assistant that answers from your policies, not the internet.",
  },
  {
    index: "03",
    name: "Workflow Automation",
    description:
      "Removing the manual handoffs between systems, forms, inboxes and spreadsheets.",
    example: "Order to invoice to fulfilment, without a person re-typing anything.",
  },
  {
    index: "04",
    name: "Business Intelligence",
    description:
      "Reporting that answers the questions leadership actually asks.",
    example: "One dashboard instead of four exports reconciled by hand.",
  },
  {
    index: "05",
    name: "Data-Driven Systems",
    description:
      "Applications that use your own data to rank, route, score and recommend.",
    example: "Lead scoring that reflects who actually converts for you.",
  },
  {
    index: "06",
    name: "Intelligent Customer Experience",
    description:
      "Personalisation and triage that make the product feel attentive.",
    example: "Routing an enquiry to the right person on the first touch.",
  },
];
