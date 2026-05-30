// url=https://www.figma.com/design/q7mwQdy7vKDfYUfro9ghD0/%E3%82%B3%E3%83%94%E3%83%BC_phono?node-id=1-2741&m=dev
// source=components/phono/interactive.tsx
// component=PhonoButton

import figma from "figma";

const instance = figma.selectedInstance;
void instance;

// TODO: NEEDS_PROPERTY_REVIEW. Replace the static label with Figma text
// properties after a published Figma component and Code Connect property
// context are available for this file and node.
const phonoButtonCodeConnect = {
  example: figma.code`
    <PhonoButton type="submit">
      入力内容を確認する
    </PhonoButton>
  `,
  imports: ['import { PhonoButton } from "@/components/phono/interactive"'],
  id: "phono-button",
  metadata: {
    nestable: true
  }
};

export default phonoButtonCodeConnect;
