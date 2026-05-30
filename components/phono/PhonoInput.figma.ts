// url=https://www.figma.com/design/q7mwQdy7vKDfYUfro9ghD0/%E3%82%B3%E3%83%94%E3%83%BC_phono?node-id=1-2659&m=dev
// source=components/phono/interactive.tsx
// component=PhonoInput

import figma from "figma";

const instance = figma.selectedInstance;
void instance;

// TODO: NEEDS_PROPERTY_REVIEW. Map label, required, type, and placeholder from
// Figma properties after a published Figma component and Code Connect property
// context are available. Current snippet is static by design.
const phonoInputCodeConnect = {
  example: figma.code`
    <PhonoInput
      name="company"
      label="会社名・店舗名・屋号＊"
      required
    />
  `,
  imports: ['import { PhonoInput } from "@/components/phono/interactive"'],
  id: "phono-input",
  metadata: {
    nestable: true
  }
};

export default phonoInputCodeConnect;
