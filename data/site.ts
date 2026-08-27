export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  href: string;
  label: string;
  sublabel: string;
  children?: NavChild[];
};

export type Project = {
  slug: string;
  number: string;
  client: string;
  legalClient?: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  date: string;
  palette: string;
};

export const figmaAssets = {
  headerLogo: "/figma-assets/svg/header-phono-logo-vector-group--1-97.svg",
  footerBrandWave: "/figma-assets/svg/footer-brand-wave--1-380.svg",
  footerLogo: "/figma-assets/svg/footer-logo--1-386.svg",
  footerSocial: "/figma-assets/svg/footer-social--1-396.svg",
  navSocial: "/figma-assets/svg/nav-social-marks--1-315.svg",
  menuDots: "/figma-assets/svg/header-menu-dots--1-87.svg",
  arrowLinkRule: "/figma-assets/svg/arrow-link-rule--1-120.svg",
  arrowLinkHead: "/figma-assets/svg/arrow-link-head--1-123.svg",
  pagerChevron: "/figma-assets/svg/pager-chevron--1-2383.svg",
  submitChevron: "/figma-assets/svg/contact-submit-chevron--1-2742.svg",
  contactCircleStem: "/figma-assets/svg/contact-circle-stem--1-421.svg",
  contactCircleArrow: "/figma-assets/svg/contact-circle-arrowhead--1-418.svg",
  top: {
    decorativeCluster: "/figma-assets/svg/top-decorative-vector-cluster--1-68.svg",
    heroGradientWave: "/figma-assets/svg/hero-gradient-wave-vector--1-252.svg",
    lowerWaveGroup: "/figma-assets/svg/top-lower-wave-group--1-79.svg",
    memberArrows: "/figma-assets/svg/top-member-arrows--1-14.svg",
    memberBand: "/figma-assets/svg/top-member-band--1-6.svg",
    memberWaveA: "/figma-assets/svg/top-member-wave-a--1-21.svg",
    memberWaveB: "/figma-assets/svg/top-member-wave-b--1-22.svg",
    memberRing: "/figma-assets/svg/top-member-ring--1-24.svg",
    recruitmentWave: "/figma-assets/svg/top-recruitment-wave-group--1-10.svg",
    scrollBlob: "/figma-assets/svg/top-scroll-blob--1-72.svg",
    scrollBlobLower: "/figma-assets/svg/top-scroll-blob--1-75.svg",
    serviceCircles: "/figma-assets/svg/top-service-circles-group--1-237.svg",
    memberVisuals: [
      "/figma-assets/png/member-visual-04--1-34.png",
      "/figma-assets/png/member-visual-01--1-44.png",
      "/figma-assets/png/member-visual-02--1-54.png",
      "/figma-assets/png/member-visual-03--1-64.png"
    ],
    projectVisuals: [
      "/figma-assets/png/top-project-visual-d1--1-253.png",
      "/figma-assets/png/top-project-mask-visual-d3--1-257.png",
      "/figma-assets/png/top-project-mask-visual-d2--1-260.png"
    ]
  },
  about: {
    companyLogoArt: "/figma-assets/svg/about-company-logo-art-frame--1-641.svg",
    decorativeWave: "/figma-assets/svg/about-decorative-wave-group--1-555.svg",
    heroWave: "/figma-assets/svg/about-hero-wave-group--1-517.svg",
    statementDisc: "/figma-assets/svg/about-statement-disc--1-542.svg",
    introRing: "/figma-assets/svg/about-intro-ring-group--1-632.svg",
    phonoImage: "/figma-assets/png/about-phono-image-4--1-571.png"
  },
  services: {
    contractVisual: "/figma-assets/svg/services-contract-visual--1-957.svg",
    footerWave: "/figma-assets/svg/services-footer-wave-group--1-893.svg",
    heroDecorative: "/figma-assets/svg/services-hero-decorative-group--1-911.svg",
    lowerMedia: "/figma-assets/svg/services-lower-media-vector--1-1120.svg",
    mainDiagram: "/figma-assets/svg/services-main-diagram--1-1062.svg",
    mediaVector: "/figma-assets/svg/services-media-vector--1-936.svg",
    overlappingCircle: "/figma-assets/svg/services-overlapping-circle-visual--1-1097.svg",
    /* Page order, not export order: the Approach teardrops run
       1:1004 -> 1:1008 -> 1:1037 -> 1:1027 -> 1:1012 down the Figma frame
       (y 2437/2774/3112/3451/3787). The export ordinals in the filenames are
       not the reading order, so 1:1037 (#A99CFF) is the third teardrop and
       1:1012 (#DEB2FF) the fifth — measured off the reference render. */
    processDiagrams: [
      "/figma-assets/svg/services-process-diagram-01--1-1004.svg",
      "/figma-assets/svg/services-process-diagram-02--1-1008.svg",
      "/figma-assets/svg/services-process-diagram-05--1-1037.svg",
      "/figma-assets/svg/services-process-diagram-04--1-1027.svg",
      "/figma-assets/svg/services-process-diagram-03--1-1012.svg"
    ]
  },
  subsidy: {
    moneyMarkLayers: [
      "/figma-assets/svg/subsidy-money-mark-layer-01--1-1320.svg",
      "/figma-assets/svg/subsidy-money-mark-layer-02--1-1321.svg",
      "/figma-assets/svg/subsidy-money-mark-layer-03--1-1322.svg",
      "/figma-assets/svg/subsidy-money-mark-layer-04--1-1323.svg"
    ],
    featureMarks: [
      [
        "/figma-assets/svg/subsidy-feature-mark-01-layer-a--1-1369.svg",
        "/figma-assets/svg/subsidy-feature-mark-01-layer-b--1-1370.svg"
      ],
      [
        "/figma-assets/svg/subsidy-feature-mark-02-layer-a--1-1361.svg",
        "/figma-assets/svg/subsidy-feature-mark-02-layer-b--1-1362.svg"
      ],
      [
        "/figma-assets/svg/subsidy-feature-mark-03-layer-a--1-1353.svg",
        "/figma-assets/svg/subsidy-feature-mark-03-layer-b--1-1354.svg"
      ]
    ],
    circleDiagrams: [
      "/figma-assets/svg/subsidy-circle-diagram-1374--1-1374.svg",
      "/figma-assets/svg/subsidy-circle-diagram-1401--1-1401.svg",
      "/figma-assets/svg/subsidy-circle-diagram-1419--1-1419.svg",
      "/figma-assets/svg/subsidy-circle-diagram-1429--1-1429.svg",
      "/figma-assets/svg/subsidy-circle-diagram-1439--1-1439.svg",
      "/figma-assets/svg/subsidy-circle-diagram-1450--1-1450.svg"
    ],
    decorativeVectors: [
      "/figma-assets/svg/subsidy-decorative-vector-1324--1-1324.svg",
      "/figma-assets/svg/subsidy-decorative-vector-1474--1-1474.svg",
      "/figma-assets/svg/subsidy-decorative-vector-1479--1-1479.svg",
      "/figma-assets/svg/subsidy-decorative-vector-1545--1-1545.svg",
      "/figma-assets/svg/subsidy-decorative-vector-1579--1-1579.svg"
    ],
    detailBlobs: {
      pink: "/figma-assets/svg/subsidy-detail-blob-pink--1-1490.svg",
      pinkCenter: "/figma-assets/svg/subsidy-detail-blob-pink-center--1-1491.svg"
    },
    financeDiagram: "/figma-assets/svg/subsidy-finance-diagram--1-1292.svg",
    heroWave: "/figma-assets/svg/subsidy-hero-wave-vector--1-1264.svg"
  },
  projects: {
    detailHeroWave: "/figma-assets/svg/project-detail-hero-wave-group--1-2398.svg",
    detailVisual: "/figma-assets/svg/project-detail-visual-vector-group--1-2436.svg",
    listHeroWave: "/figma-assets/svg/projects-list-hero-wave-group--1-1750.svg",
    thumbnails: [
      "/figma-assets/svg/projects-list-thumbnail-visual-01--1-1947.svg",
      "/figma-assets/svg/projects-list-thumbnail-visual-02--1-1975.svg",
      "/figma-assets/svg/projects-list-thumbnail-visual-03--1-2004.svg",
      "/figma-assets/svg/projects-list-thumbnail-visual-04--1-2149.svg",
      "/figma-assets/svg/projects-list-thumbnail-visual-05--1-2178.svg",
      "/figma-assets/svg/projects-list-thumbnail-visual-06--1-2208.svg",
      "/figma-assets/svg/projects-list-thumbnail-visual-07--1-2237.svg",
      "/figma-assets/svg/projects-list-thumbnail-visual-08--1-2266.svg",
      "/figma-assets/svg/projects-list-thumbnail-visual-09--1-2295.svg",
      "/figma-assets/svg/projects-list-thumbnail-visual-10--1-2323.svg",
      "/figma-assets/svg/projects-list-thumbnail-visual-11--1-2352.svg"
    ]
  },
  contact: {
    formBackground: "/figma-assets/svg/contact-form-background-vector-group--1-2652.svg",
    heroWave: "/figma-assets/svg/contact-hero-wave-group--1-2641.svg"
  },
  recruitment: {
    /* 1:3563 — the hero crest; 1:2873 — the band behind Occupation. */
    heroWave: "/figma-assets/svg/recruitment-lower-wave-3563--1-3563.svg",
    occupationWave: "/figma-assets/svg/recruitment-hero-wave-group--1-2873.svg",
    footerWave: "/figma-assets/svg/recruitment-lower-wave-3558--1-3558.svg",
    stanceRing: "/figma-assets/svg/recruitment-stance-ring--1-2889.svg",
    flowCircles: "/figma-assets/svg/recruitment-flow-circles--1-2998.svg",
    scheduleBars: {
      entry: "/figma-assets/svg/recruitment-schedule-bar-entry--1-3074.svg",
      screening: "/figma-assets/svg/recruitment-schedule-bar-screening--1-3081.svg",
      interview: "/figma-assets/svg/recruitment-schedule-bar-interview--1-3077.svg",
      offer: "/figma-assets/svg/recruitment-schedule-bar-offer--1-3064.svg"
    },
    scheduleGridline: "/figma-assets/svg/recruitment-schedule-gridline--1-3065.svg",
    occupationPill: "/figma-assets/svg/recruitment-occupation-pill--1-3508.svg",
    occupationChevron: "/figma-assets/svg/recruitment-occupation-chevron--1-3510.svg",
    rowBullet: "/figma-assets/svg/recruitment-row-bullet--1-3088.svg",
    styleCircles: [
      "/figma-assets/svg/recruitment-style-circle-a--1-3296.svg",
      "/figma-assets/svg/recruitment-style-circle-b--1-3299.svg"
    ],
    supportCircles: [
      "/figma-assets/svg/recruitment-support-circle-1--1-3332.svg",
      "/figma-assets/svg/recruitment-support-circle-2--1-3333.svg",
      "/figma-assets/svg/recruitment-support-circle-3--1-3331.svg",
      "/figma-assets/svg/recruitment-support-circle-4--1-3330.svg"
    ],
    faqMark: "/figma-assets/svg/recruitment-faq-mark--1-3411.svg",
    careerCircles: [
      "/figma-assets/svg/recruitment-career-circle-1--1-3474.svg",
      "/figma-assets/svg/recruitment-career-circle-2--1-3480.svg",
      "/figma-assets/svg/recruitment-career-circle-3--1-3477.svg",
      "/figma-assets/svg/recruitment-career-circle-4--1-3483.svg"
    ],
    careerChevron: "/figma-assets/svg/recruitment-career-chevron--1-3494.svg",
    entryButton: "/figma-assets/svg/recruitment-entry-button--1-3503.svg"
  },
  /**
   * Two-layer numbered blobs. The same three vectors serve /services/subsidy
   * Feature (1:1349/1:1357/1:1365) and both numbered lists on /recruitment
   * (Partner Policy 1:2906… and Eligibility 1:3359…), so they live here once.
   */
  numberMarks: [
    [
      "/figma-assets/svg/subsidy-feature-mark-01-layer-a--1-1369.svg",
      "/figma-assets/svg/subsidy-feature-mark-01-layer-b--1-1370.svg"
    ],
    [
      "/figma-assets/svg/subsidy-feature-mark-02-layer-a--1-1361.svg",
      "/figma-assets/svg/subsidy-feature-mark-02-layer-b--1-1362.svg"
    ],
    [
      "/figma-assets/svg/subsidy-feature-mark-03-layer-a--1-1353.svg",
      "/figma-assets/svg/subsidy-feature-mark-03-layer-b--1-1354.svg"
    ]
  ]
} as const;

/**
 * The Figma nav/footer draw the sub-items as plain text, but on a live site they
 * are the only route to some pages — `/services/subsidy` (Figma 1:1263) had no
 * reachable link at all before. Labels and order stay exactly as designed.
 */
export const navItems: NavItem[] = [
  { href: "/", label: "Top", sublabel: "トップ" },
  {
    href: "/about",
    label: "About",
    sublabel: "phonoとは？",
    children: [
      { label: "Mission ミッション", href: "/about#mission" },
      { label: "Vision ビジョン", href: "/about#vision" },
      { label: "Value バリュー", href: "/about#value" },
      { label: "Company 会社概要", href: "/about#company" }
    ]
  },
  {
    href: "/services",
    label: "Services",
    sublabel: "事業内容",
    children: [
      { label: "クリエイティブ事業", href: "/services#creative" },
      { label: "補助金・助成金活用サポート", href: "/services/subsidy" },
      { label: "メディア事業", href: "/services#media" }
    ]
  },
  {
    href: "/projects",
    label: "Projects",
    sublabel: "実績紹介",
    children: [
      { label: "事業開発", href: "/projects" },
      { label: "サービス開発", href: "/projects" },
      { label: "ブランディング", href: "/projects" },
      { label: "プロモーション・PR", href: "/projects" },
      { label: "資金調達サポート", href: "/projects" }
    ]
  },
  {
    href: "/#member",
    label: "Member",
    sublabel: "phonoの人",
    children: [
      { label: "遠藤信広", href: "/#member" },
      { label: "山下隆志", href: "/#member" },
      { label: "佐藤隼", href: "/#member" },
      { label: "野々口丈人", href: "/#member" },
      { label: "遠藤拓真", href: "/#member" },
      { label: "川上亮", href: "/#member" }
    ]
  },
  { href: "/recruitment", label: "Recruitment", sublabel: "採用情報" },
  { href: "/contact", label: "Contact", sublabel: "お問合せ" }
];

/**
 * Figma 1:107 is a single 543x576 text node: 15 typeset lines in four groups
 * separated by one blank line each (18 line boxes x 32px). The line breaks are
 * authored, not the result of wrapping, so they are stored explicitly.
 */
export const statementCopy = [
  [
    "「ありのまま」とは、なんにもしないことじゃない。",
    "自分らしさと普通であることを同時に押しつけてくる世の中で",
    "ありのままを貫くのはなかなか難しいことだし、",
    "そもそも自分のありのままがどういうものなのか人も企業も見失いがち。"
  ],
  [
    "でも。だからこそ。ありのままに、私たちは徹底的にこだわりたい。",
    "曖昧で、複雑で、矛盾すら含むような",
    "ありのままの自分と向き合い、肯定するところが出発点。",
    "そして、しなやかに問いを立てながら",
    "他者や社会との関わり合いをデザインしていく。"
  ],
  [
    "ありのままの違いは価値になり、ありのままの弱さはつながりを生む。",
    "ありのままの変化もあるだろう。それは生きている証拠だ。",
    "みんなが生き生きしてて、ちょっとカオス。",
    "そんな世の中のほうが面白そうだと思うから。"
  ],
  [
    "私たちの名前はphono［フォノ］。",
    "「ありのまま」を響かせる会社です。"
  ]
];

export const serviceCircles = [
  {
    title: "Creative",
    label: "クリエイティブ事業",
    href: "/services",
    description: "事業開発、ブランド設計、資金調達まで、角を丸めず強みに変える。"
  },
  {
    title: "Media",
    label: "メディア事業",
    href: "/services#media",
    description: "人や事業の輪郭を、社会へ届く言葉と編集で広げる。"
  }
];

export const projects: Project[] = [
  {
    slug: "hachimarusuisan-ec",
    number: "012",
    client: "ハチマル水産",
    legalClient: "株式会社ハチマル水産",
    title: "オンラインストアの構築と新商品の開発。",
    summary: "安心・安全の魚惣菜を全国へ。Shopify導入と補助金活用で販路拡大を支援。",
    category: "事業開発",
    tags: ["事業開発", "資金調達サポート"],
    date: "2024-2026",
    palette: "violet"
  },
  {
    slug: "motocola-rebrand",
    number: "011",
    client: "モトコーラ",
    title: "リブランディングでクラフトコーラを再構築。",
    summary: "花と癒しのコーラ。コンセプトからパッケージまで一貫して整理。",
    category: "ブランディング",
    tags: ["サービス開発", "ブランディング"],
    date: "2023.09",
    palette: "pink"
  },
  {
    slug: "market-insights",
    number: "010",
    client: "ORG Lab",
    title: "市場調査からサービス開発の仮説を設計。",
    summary: "新規事業の検証速度を高める調査設計とプロトタイピング。",
    category: "サービス開発",
    tags: ["サービス開発", "プロモーション・PR"],
    date: "2023.07",
    palette: "blue"
  },
  {
    slug: "gift-package",
    number: "009",
    client: "HACO",
    title: "ギフト体験を中心にしたパッケージ開発。",
    summary: "贈る行為まで含めたブランド体験を、形と言葉で再設計。",
    category: "プロモーション・PR",
    tags: ["ブランディング", "プロモーション・PR"],
    date: "2023.05",
    palette: "lavender"
  },
  {
    slug: "local-finance",
    number: "008",
    client: "地域商社",
    title: "資金調達と事業計画書の伴走支援。",
    summary: "補助金・融資の計画を事業成長のロードマップへ接続。",
    category: "資金調達サポート",
    tags: ["事業開発", "資金調達サポート"],
    date: "2023.03",
    palette: "mint"
  },
  {
    slug: "brand-sheet",
    number: "007",
    client: "STUDIO ODEA",
    title: "ブランドガイドと営業資料を整備。",
    summary: "見えにくい強みを言語化し、提案資料とビジュアルルールへ展開。",
    category: "ブランディング",
    tags: ["ブランディング", "サービス開発"],
    date: "2022.11",
    palette: "gray"
  }
];

export const members = [
  { name: "Hiroto Nonoguchi", jp: "野々口 丈人", role: "プロジェクトマネージャー", quote: "キャッチコピーや一言コメント。" },
  { name: "Takashi Yamashita", jp: "山下 隆志", role: "マネジメントプロデューサー", quote: "キャッチコピーや一言コメント。" },
  { name: "Nobuhiro Endoh", jp: "遠藤 信広", role: "ビジネスプロデューサー／クリエイティブディレクター", quote: "キャッチコピーや一言コメント。" },
  { name: "Ryo Kawakami", jp: "川上 亮", role: "ストラテジックプランナー", quote: "キャッチコピーや一言コメント。" },
  { name: "Jun Sato", jp: "佐藤 隼", role: "クリエイティブディレクター", quote: "キャッチコピーや一言コメント。" },
  { name: "Takuma Endoh", jp: "遠藤 拓真", role: "プランナー", quote: "キャッチコピーや一言コメント。" }
];

export type ApproachStep = {
  number: string;
  title: string[];
  palette: "pink" | "lavender" | "violet";
  /** Authored line boxes — Figma sets each body as `whitespace-nowrap` lines. */
  body: string[];
  columns: string[][];
};

// Source: Figma node 1:892 (Services / Approach). Number circles 1:1020/1:1034/1:1042/1:1031/1:1017,
// bodies 1:1051/1:1052/1:1025/1:1026, item columns 1:996-1:1003 / 1:1022-1:1024.
export const approachSteps: ApproachStep[] = [
  {
    number: "1",
    title: ["資金調達", "サポート"],
    palette: "pink",
    body: [
      "「資金不足でクリエイティブ投資に踏み切れない」という課題に対し、事業計画の設計、金融機関との交渉",
      "　などの資金調達プロセスに伴走。補助金・助成金に関しても計画から申請まで包括的に支援します。"
    ],
    columns: [["補助金の計画・申請サポート", "助成金の計画・申請サポート", "融資の計画・申請サポート"]]
  },
  {
    number: "2",
    title: ["事業開発"],
    palette: "lavender",
    body: [
      "企業としての事業の根幹に関わる、新規ビジネスモデルの構築を支援します。企業の既にある資産や思い",
      "を出発点として、市場調査や競合分析も踏まえながら戦略を立案します。"
    ],
    columns: [
      ["市場調査・分析", "ビジネスモデルの設計・構築", "マーケティング戦略設計"],
      ["ブランド戦略設計", "CI 設計・開発", "プレゼン資料・事業計画書の制作"]
    ]
  },
  {
    number: "3",
    // 1:1044 is one 192px-wide centred string; Figma wraps it at the space.
    title: ["商品開発", "サービス開発"],
    palette: "violet",
    body: [
      "企業のアイデンティティに立脚し、らしさを生かした商品・サービスを開発。クリエイティブとマーケ",
      "ティング両方の視点を大切に、ユーザーのインサイトに響く価値創出に貢献します。"
    ],
    columns: [
      ["市場調査・分析", "マーケティング戦略設計", "ブランド戦略設計"],
      ["CI 設計・開発", "ネーミング開発", "ロゴ制作"],
      ["ラベル・パッケージ制作", "プロダクト制作", "UI / UX 設計・開発"]
    ]
  },
  {
    number: "4",
    title: ["ブランディング"],
    palette: "pink",
    body: [
      "新規ブランドの開発も、既存ブランドのリブランディングも。企業や製品の独自価値を際立たせるブランド",
      "戦略と実行プランによって、認知度の向上、市場での差別化を実現します。"
    ],
    columns: [
      ["市場調査・分析", "マーケティング戦略設計", "ブランド戦略設計", "CI 設計・開発"],
      ["ブランドガイドライン策定", "ロゴ制作", "ラベル・パッケージ制作", "UI / UX 設計・開発"],
      ["販促ツール制作", "写真・映像の制作"]
    ]
  },
  {
    number: "5",
    title: ["プロモーション", "PR"],
    palette: "lavender",
    body: [
      "新規ブランドの開発も、既存ブランドのリブランディングも。企業や製品の独自価値を際立たせるブランド",
      "戦略と実行プランによって、認知度の向上、市場での差別化を実現します。"
    ],
    columns: [
      ["市場調査・分析", "プロモーション戦略設計", "PR 戦略設計", "広告制作"],
      ["プレスリリース制作", "コンテンツ制作", "イベント・ビジュアル制作", "オウンドメディア設計"]
    ]
  }
];

// Source: Figma node 1:892 (Services / Contract). Cards 1:967 (業務委託契約) and 1:976 (レベニューシェア契約).
export const contractTypes = [
  {
    title: "業務委託契約",
    palette: "left" as const,
    lead: ["明確な納品物とスケジュールがある場合に", "適した契約形態"],
    body: "特定の業務において、明確な納品物とスケジュールを設定し、費用を事前に確定する契約形態です。プロジェクトごとの費用感を把握しやすい点が特徴。短期間で具体的な成果が求められるプロジェクトに適しています。",
    examples: [
      "ロゴ・名刺・販促ツール（ポスター・チラシ・パンフレット）",
      "LP・Webサイト・ECサイト制作",
      "プロモーション施策・広告制作",
      "UI/UX設計・開発"
    ]
  },
  {
    title: "レベニューシェア契約",
    palette: "right" as const,
    lead: ["長期的な利益を共に創出する", "パートナーシップ型契約"],
    body: "クライアントとphono双方の合意に基づきプロジェクトの売上や成果に応じた報酬を設定する契約形態。新規ビジネスの立ち上げ時などに初期費用を抑えられるモデルです。phonoはクリエイティブとマーケティングのサポートに特化し、共に事業の長期的な成長を目指します。",
    examples: [
      "ECサイトの共同運営（売上の一部をシェア）",
      "サブスクリプションサービスの企画・運営",
      "メディア・コンテンツ事業の収益化サポート",
      "共同プロダクト開発（ブランド・商品開発）"
    ]
  }
];

// Source: Figma node 1:892 (Services). Creative statement 1:1059, body 1:1058,
// diagram labels 1:1085-1:1093, media statement 1:1117, media body 1:1116, media item 1:1121-1:1123.
export const servicesCopy = {
  hero: {
    title: "Services",
    label: "事業内容",
    lead: ["主に企業のビジネスをサポートするクリエイティブ事業と、", "自社コンテンツを制作・発信するメディア事業を二本柱としています。"]
  },
  circles: [
    { title: "Creative", label: "クリエイティブ事業", href: "#creative", palette: "creative" as const },
    { title: "Media", label: "メディア事業", href: "#media", palette: "media" as const }
  ],
  creative: {
    label: "クリエイティブ事業",
    statement: ["角があるなら、丸くせずに尖らせる。", "突破口は「違い」と「弱さ」。"],
    body: [
      "商品・サービスにしても、ブランドにしても、人々に広く受け入れられようとするとき、その角は削って丸く整えられがちです。たしかにそれは手段の一つ。",
      "ですが、phono ではこの道を選びません。私たちは「違い」や「弱さ」にこそ、ビジネスの突破口があると考えます。「違い」を徹底的に研ぎ澄ませば個性の揺るぎない軸となり、「弱さ」はただの欠点ではなく、共感を生む力に変えられます。",
      "一つひとつのプロジェクトにじっくり時間をかけ、粘り強くしなやかに問いを立てながら本質に迫る。本気で対話を重ね、クライアント自身も気づいていないような「ありのまま」を発掘し、磨き上げる。このようなプロセスを通じて本来の価値を最大限に引き出し、社会に響かせることが私たちのアプローチです。"
    ],
    flow: [
      { title: "本来の音", sub: "アイデンティティ見直し" },
      { title: "復元した音を増幅", sub: "コンセプト開発・ブランディング" },
      { title: "大きく響かせる", sub: "プロモーション・PR" }
    ]
  },
  media: {
    label: "メディア事業",
    statement: ["自社コンテンツを通じ、", "あらゆる個性の肯定と解放を目指す。"],
    body: [
      "phono のミッションである「あらゆる個性の肯定と解放」。",
      "クライアントワークだけでなく、自分たちの制作・発信するコンテンツでも様々なアプローチで人々をエンパワーするメッセージを届けていきます。",
      "すべての人々が ありのまま を気持ちよく響かせられる社会へ。"
    ],
    comingSoon: "Coming soon",
    feature: {
      title: "ゆれる動画メディア「phono」",
      body: ["何者かになりたいと願いながら漂流しているすべての人へ。", "違いと弱さを映し出す、生き方のアーカイブ・コンテンツ。"]
    }
  }
};

export const subsidyCards = [
  { title: "補助金", body: "事業の新しい挑戦に必要な設備・開発・販路開拓を計画から申請まで支援。" },
  { title: "助成金", body: "採用や人材育成、働き方の整備など、組織づくりに関わる制度活用を伴走。" },
  { title: "融資", body: "事業計画と資金繰りを整理し、金融機関との対話に必要な資料を設計。" }
];

// ── /services/subsidy — Figma node 1:1263 (補助金詳細ページ) ────────────────
// Intro copy — Figma 1:1315 (statement) + 1:1314 (body).
export const subsidyIntro = {
  statement: "未来をつくるための投資戦略。",
  body: [
    "事業やブランドの成長には、戦略的なクリエイティブ投資が欠かせません。",
    "しかし、多くの企業が、資金不足で踏み切れないという課題を抱えています。",
    "phonoは、補助金・助成金・融資を活用し、",
    "資金調達から事業戦略までを包括的にサポート。",
    "単なる資金確保ではなく、",
    "本来の価値を 最大限に引き出すための投資戦略として機能させます。",
    "事業計画の設計から申請、金融機関との交渉まで、資金調達のプロセスを伴走。",
    "適切なクリエイティブ投資を実現することで、",
    "事業のポテンシャルを引き出し、長期的な価値へと転換させます。"
  ]
};

export type FinanceRow = {
  title: string;
  sub: string;
  // Pill-circle asset index in figmaAssets.subsidy.circleDiagrams (1:1374/1:1401/1:1450).
  diagramIndex: number;
  // Teardrop label shape asset index (1:1419/1:1429/1:1439).
  teardropIndex: number;
  // Baked into the circle SVG; carried here only for alt-text and a11y.
  items: string[];
  range: string;
};

// Financing rows — Figma 1:1419/1:1429/1:1439 (teardrop labels) + pill circles
// 1:1374/1:1401/1:1450 (all text baked as vector paths in each SVG).
export const financeRows: FinanceRow[] = [
  {
    title: "補助金",
    sub: "計画・申請サポート",
    diagramIndex: 0,
    teardropIndex: 2,
    items: [
      "IT導入補助金",
      "小規模事業者持続化補助金",
      "事業再構築補助金",
      "ものづくり補助金",
      "中小企業省力化投資補助金",
      "中小企業新事業進出補助金"
    ],
    range: "100万円〜最大9000万円"
  },
  {
    title: "助成金",
    sub: "計画・申請サポート",
    diagramIndex: 1,
    teardropIndex: 3,
    items: [
      "人材確保等支援助成金",
      "キャリアアップ助成金",
      "人材開発支援助成金",
      "業務改善助成金"
    ],
    range: "720万円〜最大1億円以上"
  },
  {
    title: "融資",
    sub: "計画・申請サポート",
    diagramIndex: 5,
    teardropIndex: 4,
    items: [
      "資金計画の立案",
      "適切な融資プランの選定",
      "事業計画書・資金繰り表の作成",
      "金融機関との交渉・申請サポート",
      "融資実行後のフォローアップ"
    ],
    range: "0円〜"
  }
];

export const subsidyFeatures = [
  {
    number: "1",
    heading: ["確かな採択実績で", "ノウハウも豊富"],
    body: "補助金・助成金は、申請すれば必ず採択されるというわけではありません。phonoでは制度ごとの審査基準に応じて戦略的に申請内容を設計。これまで多数のプロジェクトで採択されてきた実績があり、ノウハウも豊富です。"
  },
  {
    number: "2",
    heading: ["クリエイティブ分野の", "申請に強い"],
    body: "ブランディング、デザイン、商品・サービス開発などの創造的な領域を含む補助事業において、一般的な申請代行会社ではカバーしづらい「創造性・独自性」が評価される申請を得意としています。"
  },
  {
    number: "3",
    heading: ["「どの制度が使えるか」から", "考える伴走型支援"],
    body: "クライアントにとって最適な制度選びから、必要書類の整理、申請書作成、報告業務まで一貫してサポート。補助金・助成金にまつわるクライアントの不安を取り除きながら最後まで寄り添います。"
  }
];

export type SubsidyDetailRow = { label: string; lines: string[] };
export type SubsidyDetailCard = {
  title: string;
  rows: SubsidyDetailRow[];
};

// Detail cards — Figma "ご提案できる補助金" 1:1493 (cards 1:1513/1:1546/1:1534)
// and "ご提案できる助成金" 1:1502 (cards 1:1563/1:1596/1:1580).
export const subsidyDetailGroups: { title: string; palette: "pink" | "lavender"; cards: SubsidyDetailCard[] }[] = [
  {
    title: "ご提案できる補助金",
    palette: "pink",
    cards: [
      {
        title: "IT導入補助金",
        rows: [
          { label: "概要", lines: ["中小企業・小規模事業者の業務効率化・DX化を目的に、ITツール（ソフトウェア・サービス等）の導入を支援する補助金。"] },
          { label: "活用事例", lines: ["●小売業者がPOSレジ・在庫管理システムを導入。販売データの可視化により、商品の見せ方や打ち出し方をブランド戦略に反映し、売上改善に成功。", "●EC運営企業がCRMを導入し、ブランドに合ったパーソナライズされたメール・広告運用を実現。リピート率が向上。"] },
          { label: "最大補助額", lines: ["450万円", "（インボイス枠含むと最大800万円）"] },
          { label: "補助率", lines: ["1/2（インボイス枠は3/4）"] }
        ]
      },
      {
        title: "小規模事業者持続化補助金",
        rows: [
          { label: "概要", lines: ["小規模事業者の販路開拓・業務改善・ブランディング構築など、幅広い取り組みを支援する補助金。"] },
          { label: "活用事例", lines: ["●地元のパン屋がSNS広告と新商品開発に活用。ストーリー性あるブランド発信により、若年層の顧客が増え売上40%増。", "●クラフトコーラブランドがロゴ・ECサイト・パッケージを一新。「世界観」を一貫して表現できたことで、オンライン売上が80%上昇。"] },
          { label: "最大補助額", lines: ["200万円", "（インボイス枠含むと最大250万円）"] },
          { label: "補助率", lines: ["2/3"] }
        ]
      },
      {
        title: "新事業進出補助金（旧：事業再構築補助金）",
        rows: [
          { label: "概要", lines: ["中小企業の新規事業・業態転換・事業再編など、抜本的な事業構造の転換を支援する補助金。"] },
          { label: "活用事例", lines: ["●美容D2Cブランドが新市場向けにブランド設計・パッケージ・映像制作を一括支援。ブランディング強化により、参入初月でSNSフォロワーが1万人超。", "●製造業者が環境配慮型プロダクトを開発し、ブランドコンセプトを再設計。展示会・ECサイト・海外展開で新たな顧客層を獲得。"] },
          { label: "最大補助額", lines: ["1億円"] },
          { label: "補助率", lines: ["1/2〜2/3（枠により異なる）"] }
        ]
      }
    ]
  },
  {
    title: "ご提案できる助成金",
    palette: "lavender",
    cards: [
      {
        title: "キャリアアップ助成金",
        rows: [
          { label: "概要", lines: ["非正規雇用のスタッフ（有期契約・短時間労働者・派遣社員）を正社員に転換した場合に支給される助成金。"] },
          { label: "受給額の目安", lines: ["1人あたり 最大72万円", "（例：3名 → 合計216万円）"] },
          { label: "活用事例", lines: ["●216万円を受給 → 正社員化したスタッフ向けに社内研修制度を整備、採用パンフレットとECサイトの刷新にも充当。", "●72万円を受給 → 昇格制度導入・名刺／プロフィール写真撮影費・社内ガイド制作に使用。"] },
          { label: "スケジュール", lines: ["ヒアリングから最短で3ヶ月後に入金"] }
        ]
      },
      {
        title: "人材開発支援助成金",
        rows: [
          { label: "概要", lines: ["従業員の職務に関連した専門的な知識・技能を習得させるための職業訓練に対して支給される助成金。"] },
          { label: "受給額の目安", lines: ["1人あたり 最大72万円", "（例：3名 → 合計216万円）"] },
          { label: "活用事例", lines: ["●研修費用の一部を受給 → 新人デザイナーの育成プログラムを整備し、制作品質と内製化率を向上。", "●OJTと座学を組み合わせた人材開発を実施し、サービス開発チームの立ち上げを加速。"] },
          { label: "スケジュール", lines: ["ヒアリングから最短で3ヶ月後に入金"] }
        ]
      },
      {
        title: "業務改善助成金",
        rows: [
          { label: "概要", lines: ["事業場内最低賃金の引き上げと、生産性向上に資する設備投資等を行った場合に支給される助成金。"] },
          { label: "受給額の目安", lines: ["1人あたり 最大72万円", "（例：3名 → 合計216万円）"] },
          { label: "活用事例", lines: ["●最低賃金の引き上げと合わせて受給 → 制作設備を刷新し、納期短縮と品質向上を実現。", "●受給額を業務システム導入に充当 → バックオフィスの効率化で残業を削減。"] }
        ]
      }
    ]
  }
];

export const recruitmentValues = [
  { title: "ありのままを面白がる", body: "違い、弱さ、変化を隠さず、価値に変える姿勢を大切にします。" },
  { title: "問いを立てる", body: "正解を急がず、状況の奥にある課題を言葉にします。" },
  { title: "手を動かす", body: "議論だけで終わらせず、試作し、検証し、前に進めます。" },
  { title: "関係性を設計する", body: "クライアント、仲間、社会との関わりを丁寧につくります。" }
];

export const flowSteps = ["エントリー", "書類選考", "カジュアル面談", "1次面接", "最終面接", "内定", "入社"];

export const companyRows = [
  ["会社名", "phono Co.,Ltd."],
  ["事業内容", "事業開発、ブランディング、資金調達サポート、メディア運営"],
  ["所在地", "Tokyo / Osaka"],
  ["設立", "2023年"],
  ["代表", "遠藤 信広"]
];
