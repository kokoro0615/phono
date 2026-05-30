// url=https://www.figma.com/design/q7mwQdy7vKDfYUfro9ghD0/%E3%82%B3%E3%83%94%E3%83%BC_phono?node-id=1-187&m=dev
// source=components/phono/interactive.tsx
// component=PhonoBadge

import figma from "figma";

const instance = figma.selectedInstance;
void instance;

// TODO: NEEDS_PROPERTY_REVIEW. Map badge text from Figma properties after a
// published Figma component and Code Connect property context are available.
// The current snippet keeps the known project-tag shape static.
const phonoBadgeCodeConnect = {
  example: figma.code`
    <PhonoBadge>事業開発</PhonoBadge>
  `,
  imports: ['import { PhonoBadge } from "@/components/phono/interactive"'],
  id: "phono-badge",
  metadata: {
    nestable: true
  }
};

export default phonoBadgeCodeConnect;
