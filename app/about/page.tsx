import { Fragment } from "react";
import { FigmaAsset, SiteFooter, StatementParagraphs, WaveField } from "@/components/phono/shared";
import { figmaAssets } from "@/data/site";

/**
 * Figma 1:629 — 16px on a 32px line with the breaks authored in the design and
 * one empty line box between groups, so the lines are rendered, not wrapped.
 */
const introductionCopy: string[][] = [
  [
    "かつては、「いいものをつくれば、売れる」時代でした。",
    "性能と価格、それだけで選ばれた“合理性の時代”。",
    "でも、気づけば、世界は静かに変わっていました。",
    "人はモノの先にある「意味」や「姿勢」を見るようになった。",
    "想いが伝わらなければ、選ばれない時代です。"
  ],
  [
    "あなたの中にも、きっとあるはずです。",
    "うまく言葉にできないけれど、大切にしてきた想い。",
    "誰にも譲れないこだわりや、信念のようなもの。",
    "他にはない“違い”が、あなたの中には、確かにある。"
  ],
  [
    "でも、今はまだ、それが届いていない。",
    "誰に届けたいのか。 なぜ、それを届けたいのか。",
    "その問いが、まだ言葉になっていない。"
  ],
  [
    "phonoは、あなたの中にある静かな想いに耳をすまし、",
    "日々の営みの中で当たり前になった想いやこだわりを、",
    "言葉と形に変えて、世界へとそっと手渡していく。"
  ],
  ["焦って変わらなくていい。", "必要なのは、“思い出すこと”。", "あなたが本当は、なぜここにいるのかを。"]
];

/**
 * Figma 1:564 — the three columns set every line explicitly. About (1:573) has
 * no 40px heading at all; Mission (1:577) and Vision (1:579) do.
 */
const phonoColumns = [
  {
    anchor: "about-phono",
    title: "About",
    heading: [] as string[],
    body: [
      "phono［フォノ］は、",
      "人や企業の「ありのまま」に着目し、",
      "そのポテンシャルを最大限に引き出す",
      "クリエイティブカンパニーです。",
      "自分自身を社会に合わせようとして",
      "無理やり変えるのではなく、",
      "社会との関係性をデザインすることによって",
      "生き生きと「ありのまま」を貫ける",
      "ありかたを追い求めています。"
    ],
    noteTitle: "-フォノイコライザー【phono equalizer】",
    noteBody: [
      "アナログレコードの再生時に使う装置。",
      "記録された 本来の音を復元して出力レベルを上げる役割を担う。"
    ]
  },
  {
    anchor: "mission",
    title: "Mission",
    heading: ["あらゆる個性の", "肯定と解放"],
    body: [
      "人や企業が本来の姿として",
      "存在・活動できるように。",
      "あらゆる個性を",
      "クリエイティブの力で肯定し、",
      "ステレオタイプの呪縛から",
      "解放することがphonoの使命です。"
    ]
  },
  {
    anchor: "vision",
    title: "Vision",
    heading: ["カオスと共感に", "満ちた社会"],
    body: [
      "人や企業が共感を通じて対立を超え、",
      "平和的で活力に満ちたカオスを生む。",
      "個々の個性が孤立せず、",
      "互いに関わり合うことで築かれる社会の形。",
      "phonoが目指している未来像です。"
    ]
  }
];

/**
 * Figma 1:625 / 1:617 / 1:609 / 1:601 set the marks as single digits in Futura
 * PT Heavy 55px — "01".."04" was a zero-padded invention. The body copy is two
 * authored lines per card (1:727 / 1:586 / 1:589 / 1:592), not a wrapped block.
 */
const hipValues: { number: string; title: string; body: string[] }[] = [
  {
    number: "1",
    title: "適応より適合。",
    body: ["無理をして環境に合わせるのでなく、", "ありのままの自分らしさがハマる場所を発見・創出します。"]
  },
  {
    number: "2",
    title: "こうあるべきってないべき。",
    body: ["既存の正しさだけが正解じゃない。", "常識にとらわれず、失敗を恐れず、柔軟に問いを重ねます。"]
  },
  {
    number: "3",
    title: "違いは価値になる。",
    body: ["他と同じであることへの圧力に屈せず、", "他との違いこそが価値の源泉であると信じています。"]
  },
  {
    number: "4",
    title: "弱さはつながりを生む。",
    body: ["だれもが抱える弱さから目を背けず、受け入れ、", "助け合うためにできることを考え続けます。"]
  }
];

const companyProfile = [
  ["会社名", "株式会社phono"],
  ["代表者", "山下隆志"],
  ["所在地", "〒 530-0001 大阪府大阪市北区梅田1丁目2番2号 大阪駅前第2ビル12-12\n〒 540-0025 大阪市中央区徳井町1-3-8\n〒 541-0048 大阪市中央区瓦町一丁目3-2HIFASHI.BLD 4F"],
  ["資本金", "100万"],
  ["事業内容", "事業内容：クリエイティブ事業"],
  ["設立", "2023年4月3日"],
  ["従業員数", "9名"],
  ["主な取引銀行", "住信SBI ネット銀行・GMOあおぞらネット銀行"]
];

function AboutSectionTitle({
  title,
  label,
  bracketed = true
}: {
  title: string;
  label: string;
  bracketed?: boolean;
}) {
  return (
    <div className="figma-section-title">
      <h2>{title}</h2>
      <p>{bracketed ? `［　${label}　］` : label}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main id="main-content" className="figma-subpage about-figma">
      <section className="figma-subpage-hero about-hero" aria-labelledby="about-title">
        <WaveField variant="hero" assetSrc={figmaAssets.about.heroWave} assetClassName="about-hero-wave-asset" />
        <div className="figma-page-title">
          <h1 id="about-title">About</h1>
          <p>phonoとは？</p>
        </div>
      </section>

      <section className="about-introduction site-shell">
        <AboutSectionTitle title="Introduction" label="ご挨拶" />
        <div className="about-introduction-grid">
          <div className="about-question">
            {/* Figma 1:632 — four multiplied vectors, not a pair of CSS rings. */}
            <FigmaAsset src={figmaAssets.about.introRing} className="about-question-ring" sizes="657px" />
            <span>何のため？<br />誰のため？</span>
          </div>
          <div>
            {introductionCopy.map((group) => (
              <p key={group[0]}>
                {group.map((line, index) => (
                  <Fragment key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </Fragment>
                ))}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="about-statement-figma">
        <WaveField variant="deep" assetSrc={figmaAssets.about.decorativeWave} assetClassName="about-statement-wave-asset" />
        {/* Figma 1:542 — three multiplied vectors, not a disc plus box-shadows. */}
        <FigmaAsset src={figmaAssets.about.statementDisc} className="about-statement-disc" sizes="995px" />
        <div className="site-shell about-statement-grid">
          <AboutSectionTitle title="Statement" label="ステートメント" />
          <p className="about-statement-lead">ありのまま原理主義。</p>
          <div className="about-statement-copy">
            <StatementParagraphs />
          </div>
        </div>
      </section>

      <section className="about-phono site-shell">
        <AboutSectionTitle title="What is phono?" label="phonoについて" />
        <div className="about-phono-grid">
          {phonoColumns.map((column) => (
            <article key={column.title} id={column.anchor}>
              <span>{column.title}</span>
              <h3>
                {column.heading.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h3>
              <p>
                {column.body.map((line, index) => (
                  <Fragment key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </Fragment>
                ))}
              </p>
              {"noteTitle" in column && column.noteBody ? (
                <div className="phono-equalizer">
                  <FigmaAsset src={figmaAssets.about.phonoImage} alt="" className="phono-equalizer-asset" sizes="396px" />
                  <strong>{column.noteTitle}</strong>
                  <p>
                    {column.noteBody.map((line, index) => (
                      <Fragment key={line}>
                        {index > 0 ? <br /> : null}
                        {line}
                      </Fragment>
                    ))}
                  </p>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="about-hip" id="value">
        <div className="site-shell">
          <p className="about-hip-label">What is Hip?</p>
          <h2>「ありのまま」が、最もイケてる。</h2>
          <div className="about-hip-grid">
            {hipValues.map((value) => (
              <article key={value.number}>
                <span>{value.number}</span>
                <div>
                  <h3>{value.title}</h3>
                  <p>
                    {value.body.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-company site-shell" id="company">
        <FigmaAsset src={figmaAssets.about.companyLogoArt} alt="" className="about-company-logo-art" sizes="(max-width: 720px) 100vw, 38vw" />
        <div>
          <AboutSectionTitle title="Company Profile" label="会社概要" bracketed={false} />
          <dl>
            {companyProfile.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
