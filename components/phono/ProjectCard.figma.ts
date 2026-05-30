// url=https://www.figma.com/design/q7mwQdy7vKDfYUfro9ghD0/%E3%82%B3%E3%83%94%E3%83%BC_phono?node-id=1-177&m=dev
// source=components/phono/interactive.tsx
// component=ProjectCard

import figma from "figma";

const instance = figma.selectedInstance;
void instance;

// TODO: NEEDS_PROPERTY_REVIEW. Replace static text with Figma properties after
// a published Figma component and Code Connect property context are available.
const projectCardCodeConnect = {
  example: figma.code`
    <ProjectCard
      number="012"
      client="ハチマル水産"
      title="オンラインストアの構築と新商品の開発。"
      description="安心・安全の魚惣菜を全国へ。Shopify導入と補助金活用で販路拡大を支援。"
      href="/projects/hachimarusuisan-ec"
      tags={["事業開発", "資金調達サポート"]}
      palette="violet"
    />
  `,
  imports: ['import { ProjectCard } from "@/components/phono/interactive"'],
  id: "project-card",
  metadata: {
    nestable: true
  }
};

export default projectCardCodeConnect;
