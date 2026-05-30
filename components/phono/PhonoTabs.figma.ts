// url=https://www.figma.com/design/q7mwQdy7vKDfYUfro9ghD0/%E3%82%B3%E3%83%94%E3%83%BC_phono?node-id=1-197&m=dev
// source=components/phono/interactive.tsx
// component=PhonoTabs

import figma from "figma";

const instance = figma.selectedInstance;
void instance;

// TODO: NEEDS_PROPERTY_REVIEW. Confirm Figma variant/property names for active
// tab and tab labels after a published Figma component and Code Connect
// property context are available. This static example represents the project
// category filter.
const phonoTabsCodeConnect = {
  example: figma.code`
    <PhonoTabs
      tabs={[
        { value: "All", label: "All" },
        { value: "事業開発", label: "事業開発" },
        { value: "サービス開発", label: "サービス開発" },
        { value: "ブランディング", label: "ブランディング" },
        { value: "プロモーション・PR", label: "プロモーション・PR" },
        { value: "資金調達サポート", label: "資金調達サポート" }
      ]}
      activeTab="All"
      onChange={() => {}}
      ariaLabel="実績カテゴリ"
      className="filter-row"
    />
  `,
  imports: ['import { PhonoTabs } from "@/components/phono/interactive"'],
  id: "phono-tabs",
  metadata: {
    nestable: true
  }
};

export default phonoTabsCodeConnect;
