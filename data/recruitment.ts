/**
 * Recruitment page content — Figma 1:2872 (採用ページ, 1440x15086).
 *
 * Every string here is the copy of a Figma text node, split on the line breaks
 * the design authors rather than left to the browser to wrap. Node ids are
 * recorded so the geometry in `app/globals.css` can be traced back.
 */

/** Section heads: Futura PT Heavy 80px + a bracketed Zen Kaku 18px label. */
export const recruitmentSections = [
  { id: "stance", title: "Stance", label: "［　phonoの向き合い方　］", node: "1:2888" },
  { id: "partner", title: "Partner Policy", label: "［　phonoが求めるパートナー像　］", node: "1:2941" },
  { id: "schedule", title: "Schedule", label: "［　採用スケジュール　］", node: "1:2945" },
  { id: "flow", title: "Flow", label: "［　採用フロー　］", node: "1:2949" },
  { id: "eligibility", title: "Eligibility", label: "［　応募資格　］", node: "1:2954" },
  { id: "occupation", title: "Occupation", label: "［　現在募集中の職種　］", node: "1:2959" },
  { id: "hospitality", title: "Hospitality", label: "［　待遇　］", node: "1:3394" },
  { id: "style", title: "Style", label: "［　働き方　］", node: "1:3400" },
  { id: "benefits", title: "Benefits", label: "［　福利厚生　］", node: "1:3406" },
  { id: "support", title: "Support", label: "［　成長支援　］", node: "1:3317" },
  { id: "faq", title: "FAQ", label: "［　よくある質問　］", node: "1:3322" },
  { id: "career", title: "Career up", label: "［　評価制度　］", node: "1:3327" }
] as const;

/** 1:2886 — 16px on a 32px line; blank entries are the design's empty lines. */
export const stanceBody: string[][] = [
  [
    "phonoは、ひとつひとつのプロジェクトにじっくりと時間をかけ、",
    "クライアントの本質を最大限に引き出すことを大切にしています。",
    "それは、単なるデザインやマーケティングではなく、",
    "その企業やブランドが本来持つ「ありのまま」に深く寄り添い、",
    "まだ言葉にならない想いや価値をすくい上げ、",
    "共鳴する形へと昇華させること。"
  ],
  [
    "そのプロセスは決して一直線ではなく、",
    "試行錯誤しながら形を探る「揺らぎ」の時間を必要とします。",
    "クライアント自身が気づいていない魅力を見つけるために、",
    "私たちは表層的なアプローチではなく、",
    "深くしなやかに「問い」を立て、",
    "対話を繰り返しながら本質に迫ります。"
  ],
  [
    "phonoのスタンスは、",
    "「速さ」や「大量生産」ではなく、",
    "「対話」と「発見」。",
    "短期間で答えを出すのではなく、価値が最も響く形へと練り上げていく。",
    "そのために、プロジェクトごとに時間とリソースを惜しみなく投じ、",
    "細部にまでこだわり抜きます。"
  ],
  [
    "そして、それを実現するには、",
    "クライアントとの関係も 単なる受発注の枠を超え、",
    "互いに「関わり合う」ことが不可欠です。"
  ],
  ["本気で向き合い、共に考え、共に創る。", "それが、phonoが目指すクリエイティブのあり方です。"]
];

/** 1:2895 — Zen Kaku Medium 36px on a 60px line, inside the ring. */
export const stanceLead = ["揺らぎ、問い、関わり合う。", "それがphonoのスタンス。"];

/**
 * 1:2897 — four cards. `mark` selects the two-layer blob (see figmaAssets),
 * `title` is 32px/48px centred, `body` is 16px/32px with authored breaks.
 */
export const partnerPolicies = [
  {
    mark: 1,
    title: ["事業や市場について", "深く理解している。"],
    body: [
      "言葉にするのは私たちの仕事ですが、そのためには",
      "事業の本質や市場の構造や環境を深く理解している",
      "ことが欠かせません。マーケティング戦略は私たち",
      "が担いますが、事業の背景や目指す未来を共に議論",
      "し、共有できるパートナーを求めています。"
    ]
  },
  {
    mark: 2,
    title: ["価値を見極め、", "適切な投資ができること。"],
    body: [
      "事業やブランドの成長には、適切な投資が欠かせません。",
      "融資や助成金・補助金の活用を含め、資金調達の",
      "サポートも行いますが、計画の策定や必要書類の",
      "準備など、クライアントにもご協力いただく場面が",
      "あります。お互いに力を合わせながら、価値を最",
      "大化できるパートナーを求めています。"
    ]
  },
  {
    mark: 3,
    title: ["違いは価値になる。"],
    body: [
      "ブランドの核は「想い」と「情熱」。phonoは、",
      "ただデザインを作るのではなく、本質的な価値を",
      "形にし、長く愛されるブランドへと育てていきます。",
      "だからこそ、「どう見せるか」だけでなく、「何を",
      "伝えるか」を共に考え、ブランドの成長に本気で",
      "向き合えるパートナーを求めています。"
    ]
  },
  {
    mark: 1,
    title: ["挑戦を恐れず、", "新しい視点を受け入れる。"],
    body: [
      "ブランドの核は「想い」と「情熱」。phonoは、",
      "ただデザインを作るのではなく、本質的な価値を",
      "形にし、長く愛されるブランドへと育てていきます。",
      "だからこそ、「どう見せるか」だけでなく、「何を",
      "伝えるか」を共に考え、ブランドの成長に本気で",
      "向き合えるパートナーを求めています。"
    ]
  }
];

/** 1:3032 — the Gantt band. Months are 12px Inter; years 16px Inter ExtraBold. */
export const scheduleYears = [
  { label: "2024", node: "1:3062" },
  { label: "2025", node: "1:3063" }
];

export const scheduleMonths = [
  "12月",
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月"
];

/** Ten dashed rules; the last one is 18px higher than the rest (1:3083). */
export const scheduleGridCount = 10;

export const scheduleBars = [
  { key: "entry", label: "エントリー期間　　　　2024年12月1日-2025年6月30日", node: "1:3074" },
  { key: "screening", label: "書類選考結果通知　　7月15日", node: "1:3081" },
  { key: "interview", label: "面接期間　　7月20日〜8月15日", node: "1:3077" },
  { key: "offer", label: "内定通知　8月31日", node: "1:3064" }
];

/** 1:2983–1:2997 — number 48px Futura Heavy, label 24px Zen Kaku. */
export const recruitmentFlow = [
  "エントリー",
  "書類選考",
  "適性検査受験",
  "1次面接",
  "最終面接",
  "内定",
  "入社"
];

/** 1:3346 — four requirement rows, each with a numbered blob on the left. */
export const eligibilityItems = [
  {
    mark: 1,
    title: "学歴要件",
    body: [
      "専門学校、短期大学、または4年生大学の卒業見込みまたは卒業済みの方、もしくは大学院修了見込みまたは修了済みの方。",
      "※ デザイン系、芸術大学、美術大学の卒業生、もしくは在学中の方は特に優遇します。"
    ]
  },
  {
    mark: 2,
    title: "業界経験の有無",
    body: [
      "未経験者でもポテンシャルがある方は歓迎しますが、クリエイティブ業界、広告業界、マーケティング業界での実務経験がある方は特に優遇します。"
    ]
  },
  {
    mark: 3,
    title: "ポートフォリオ提出",
    body: [
      "クリエイティブ系職種（デザイナー、ビデオグラファー、フォトグラファー、コピーライター、UI/UXデザイナーなど）は必須。ポートフォリオには過去のプロジェクトや作品のサンプルを含めてください。"
    ]
  },
  {
    mark: 1,
    title: "資格・技術的能力",
    body: [
      "特定の資格は必須ではありませんが、Adobe Creative Suite、Figma、Google Analytics、SEO、SNS広告運用などのスキルは歓迎します。"
    ]
  }
];

/** 1:3505 — two columns of five black pills, read down the left column first. */
export const occupations = [
  "クリエイティブディレクター / ビジネスプロデューサー",
  "UI / UXデザイナー / マルチデザイナー",
  "ビデオグラファー",
  "フォトグラファー",
  "データアナリスト",
  "コピーライター",
  "PR / コミュニケーションプロデューサー",
  "プロジェクトマネージャー",
  "ストラテジックプランナー",
  "マネジメントプロデュース職"
];

/** 1:3084 — label right-aligned to x=379, blob at 400, value from 448. */
export const hospitalityRows: Array<{ term: string; lines: string[] }> = [
  { term: "基本給", lines: ["年俸360万円〜1000万円（経験・能力に基づき決定）"] },
  { term: "諸手当", lines: ["交通費支給、時間外手当（条件付き）"] },
  { term: "勤務地", lines: ["大阪オフィス（リモート勤務可）"] },
  { term: "勤務時間", lines: ["フレックスタイム制（コアタイムなし）、1日実働8時間（リモートワーク対応可）"] },
  { term: "業務内容", lines: ["各職種における業務の遂行"] },
  {
    term: "雇用形態",
    lines: [
      "契約社員（正社員登用制度あり）",
      "※ 契約社員として入社後、一定の期間と評価基準を満たした場合、正社員への登用が可能です。"
    ]
  },
  { term: "給与", lines: ["年俸制（スキル・経験に基づき決定）"] },
  { term: "賞与", lines: ["年俸制のため、賞与は含まれています"] },
  { term: "休日・休暇", lines: ["年間休日120日以上、有給休暇、夏季休暇、年末年始休暇、特別休暇"] },
  {
    term: "特別休暇",
    lines: ["忌引休暇、結婚休暇、出産休暇、誕生日休暇、ウェルビーイング休暇（生理など体調不良に伴う特別休暇）"]
  },
  {
    term: "住居支援",
    lines: ["「賃貸サポートプログラム」：住居契約時の初期費用軽減や、条件の良い物件の紹介サポートを実施"]
  },
  {
    term: "試用 / 契約期間",
    lines: [
      "3ヶ月（試用期間中の待遇変更なし）",
      "※ 試用期間終了後、業務パフォーマンスや勤怠状況を総合的に評価し、正社員登用を検討いたします。"
    ]
  }
];

/** 1:3188 — same three-track rhythm as Hospitality. */
export const benefitRows: Array<{ term: string; lines: string[] }> = [
  { term: "完全週休2日制", lines: ["土曜、日曜、祝日、年末年始を休日としています。"] },
  {
    term: "有給休暇",
    lines: ["入社時に10日付与され、以降は毎年電通の事業年度の初月である１月に、決められた日数が付与されます。"]
  },
  {
    term: "積立休暇",
    lines: ["翌年度に繰り越せない有給休暇が残ってしまった場合は、年間20⽇、上限120⽇まで特定積⽴休暇として累積"]
  },
  { term: "社会保険完備", lines: ["健康保険、厚生年金保険、雇用保険、労災保険に加入"] },
  { term: "交通費支給", lines: ["通勤手当（上限3万円 / 月）"] },
  { term: "住宅手当", lines: ["条件を満たす場合、住宅補助として月額2万円支給"] },
  {
    term: "転居費用 / 転居時交通費補助",
    lines: ["正社員として入社のため、遠方から引越しされた場合、その費用を会社で補助します。（条件/上限金額あり）"]
  },
  { term: "健康管理サポート", lines: ["年1回の定期健康診断が受診可能"] },
  { term: "ランチ代サポート", lines: ["社内食堂を利用の際に、半額補助しております。"] },
  {
    term: "企業型確定拠出年金",
    lines: [
      "一定の金額を毎月拠出して、加入者個人が金融商品（定期預金、投資信託等）で運用し、",
      "形成した資産を60歳到達後に年金または一時金として受け取る制度です。"
    ]
  },
  {
    term: "病児保育＆ベビーシッター補助制度",
    lines: [
      "お子様が病気の時にも働ける手段を提供することによって時間的制約の軽減をはかります。",
      "病児保育やベビーシッター会社、ファミリーサポート等の保育サービスを利用した際の利用料の半額を補助します。（上限金額あり）"
    ]
  },
  {
    term: "Appleギフトカード/Google Playカード購入補助",
    lines: [
      "有料アプリやアプリ課金の利用体験の促進を目的とした制度で、",
      "「Apple Gift Card」または「Google Play ギフトカード」の購入金額の50%を補助します。（上限あり）"
    ]
  }
];

/** 1:3302 / 1:3308 — two large gradient discs with white type inside. */
export const styleCards = [
  {
    badge: "制度",
    letter: "A",
    title: ["フレックスタイム", "&", "リモートワーク制度"],
    lead: ["時間も場所も、もっと自由に。", "自分のリズムで働く。"],
    body: [
      "phonoでは、決まった働き方はありません。 朝でも夜でも、街でも海",
      "でも。自分が一番集中できる時間と場所を選べます。オフィスは、「",
      "創発・インプット・つながり」が生まれる場。 ふらっと立ち寄って",
      "雑談するのも、じっくり向き合うのも、自由。集まる意味、離れる",
      "意味を考えながら、それぞれの働き方を大切にしています。"
    ]
  },
  {
    badge: "制度",
    letter: "B",
    title: ["個人プロジェクト", "&", "新規事業開発支援"],
    lead: ["好きなこと、気になることを、", "とことん追求できる環境。"],
    body: [
      "phonoでは、業務時間外の個人の創作・研究、新規事業開発を支援",
      "する制度を設けています。 本業とは別に興味のある分野を自由に追求",
      "でき、一定の段階に達したアイデアは事業化支援を受けることも可能",
      "です。 また、社内で評価されたプロジェクトは、正式な業務として",
      "組み込まれる可能性もあります。業務と個人の探求は切り離しつつ、",
      "相互に影響し合うことで新たな価値を生み出す環境を目指しています。"
    ]
  }
];

/** 1:3314 — a single 16px note under the Style bodies. */
export const styleNote = "今後は、無期限の有給制度なども導入を検討しています。";

/** 1:3315 — four discs, black 32px/48px type inside, 16px/32px copy beneath. */
export const supportItems = [
  {
    title: ["スキルアップ", "支援"],
    body: ["資格取得支援、社内外のトレーニングプログラム、", "キャリアアップのための研修制度"]
  },
  { title: ["メンタルヘルス", "ケア"], body: ["従業員支援プログラム（EAP）およびメンタル", "ヘルスサポート"] },
  {
    title: ["キャリア", "開発"],
    body: ["キャリアコンサルティング、パーソナルコーチング", "の提供により、長期的なキャリア形成を支援"]
  },
  { title: ["退職金", "制度"], body: ["勤続年数に応じた退職金および積立制度"] }
];

/** 1:3410 — nine questions, each on a multiplied disc carrying a white "Q". */
export const faqQuestions = [
  "応募に必要な書類は何ですか？",
  "リモートワークは可能ですか？",
  "試用期間中の待遇は変わりますか？",
  "社内でのキャリアアップの機会はありますか？",
  "社内の雰囲気はどのようなものですか？",
  "服装や髪色、髪型、ネイル、ピアス、タトゥーに関する決まりはありますか？",
  "飲み会は多いですか？お酒が苦手です。",
  "人見知りです",
  "個性がないです"
];

/** 1:2896 / 1:3472 — the Career up lead and body. */
export const careerLead = ["創造力と挑戦を正当に評価し、", "成長を最大限サポート"];

export const careerBody = [
  "phonoでは、「やった分だけ評価される」ことを重視し、クリエイターが本当にやる気を出せる評価制度を導入します。",
  "ただの成果主義ではなく、挑戦・成長・チーム貢献など多角的に評価し、報酬やキャリアアップにつなげる仕組みを整えています。"
];

/** 1:3486–1:3493 — four discs with white type and a chevron beneath. */
export const careerCards = [
  ["レベルアップ", "評価制度"],
  ["クリエイティブ", "チャレン", "ジボーナス"],
  ["チームプレイヤー", "評価制度"],
  ["自己ブランディング", "支援"]
];

/** 1:3502 / 1:3504 / 1:3473 — the entry CTA and its two destinations. */
export const entryCta = {
  label: "エントリーする",
  links: [
    { label: "外部サイト", href: "/contact" },
    { label: "お問い合わせフォーム", href: "/contact" }
  ]
};
