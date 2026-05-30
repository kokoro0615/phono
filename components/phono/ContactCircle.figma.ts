// url=https://www.figma.com/design/q7mwQdy7vKDfYUfro9ghD0/%E3%82%B3%E3%83%94%E3%83%BC_phono?node-id=1-2784&m=dev
// source=components/phono/shared.tsx
// component=ContactCircle

import figma from "figma";

const instance = figma.selectedInstance;
void instance;

// TODO: NEEDS_PROPERTY_REVIEW. MCP metadata confirms this node is an ordinary
// frame with text/vector children; Code Connect property names are not
// available until a published Figma component and Developer seat are confirmed.
const contactCircleCodeConnect = {
  example: figma.code`
    <ContactCircle />
  `,
  imports: ['import { ContactCircle } from "@/components/phono/shared"'],
  id: "contact-circle",
  metadata: {
    nestable: true
  }
};

export default contactCircleCodeConnect;
