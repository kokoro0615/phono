// url=https://www.figma.com/design/q7mwQdy7vKDfYUfro9ghD0/%E3%82%B3%E3%83%94%E3%83%BC_phono?node-id=1-2701&m=dev
// source=components/phono/interactive.tsx
// component=PhonoCheckbox

import figma from "figma";

const instance = figma.selectedInstance;
void instance;

// TODO: NEEDS_PROPERTY_REVIEW. Map option label and required state from Figma
// properties after a published Figma component and Code Connect property
// context are available.
const phonoCheckboxCodeConnect = {
  example: figma.code`
    <PhonoCheckbox name="category" value="事業開発">
      事業開発
    </PhonoCheckbox>
  `,
  imports: ['import { PhonoCheckbox } from "@/components/phono/interactive"'],
  id: "phono-checkbox",
  metadata: {
    nestable: true
  }
};

export default phonoCheckboxCodeConnect;
