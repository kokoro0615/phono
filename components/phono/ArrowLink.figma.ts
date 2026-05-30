// url=https://www.figma.com/design/q7mwQdy7vKDfYUfro9ghD0/%E3%82%B3%E3%83%94%E3%83%BC_phono?node-id=1-119&m=dev
// source=components/phono/shared.tsx
// component=ArrowLink

import figma from "figma";

const instance = figma.selectedInstance;
void instance;

// TODO: NEEDS_PROPERTY_REVIEW. MCP metadata confirms this node is an ordinary
// frame with text/vector children; Code Connect property names are not
// available until a published Figma component and Developer seat are confirmed.
const arrowLinkCodeConnect = {
  example: figma.code`
    <ArrowLink href="/projects" label="View All" sublabel="実績一覧を見る" />
  `,
  imports: ['import { ArrowLink } from "@/components/phono/shared"'],
  id: "arrow-link",
  metadata: {
    nestable: true
  }
};

export default arrowLinkCodeConnect;
