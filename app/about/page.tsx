import { FigmaAsset, SiteFooter, WaveField } from "@/components/phono/shared";
import { figmaAssets, statementCopy } from "@/data/site";

const introductionCopy = [
  "かつては、「いいものをつくれば、売れる」時代でした。性能と価格、それだけで選ばれた“合理性の時代”。",
  "でも、気づけば、世界は静かに変わっていました。人はモノの先にある「意味」や「姿勢」を見るようになった。想いが伝わらなければ、選ばれない時代です。",
  "あなたの中にも、きっとあるはずです。うまく言葉にできないけれど、大切にしてきた想い。誰にも譲れないこだわりや、信念のようなもの。",
  "他にはない“違い”が、あなたの中には、確かにある。でも、今はまだ、それが届いていない。",
  "誰に届けたいのか。なぜ、それを届けたいのか。その問いが、まだ言葉になっていない。",
  "phonoは、あなたの中にある静かな想いに耳をすまし、日々の営みの中で当たり前になった想いやこだわりを、言葉と形に変えて、世界へとそっと手渡していく。",
  "焦って変わらなくていい。必要なのは、“思い出すこと”。あなたが本当は、なぜここにいるのかを。"
];

const phonoColumns = [
  {
    title: "About",
    heading: "phono［フォノ］は、クリエイティブカンパニーです。",
    body: "phono［フォノ］は、人や企業の「ありのまま」に着目し、そのポテンシャルを最大限に引き出すクリエイティブカンパニーです。自分自身を社会に合わせようとして無理やり変えるのではなく、社会との関係性をデザインすることによって生き生きと「ありのまま」を貫けるありかたを追い求めています。",
    noteTitle: "-フォノイコライザー【phono equalizer】",
    noteBody: "アナログレコードの再生時に使う装置。記録された本来の音を復元して出力レベルを上げる役割を担う。"
  },
  {
    title: "Mission",
    heading: "あらゆる個性の肯定と解放",
    body: "人や企業が本来の姿として存在・活動できるように。あらゆる個性をクリエイティブの力で肯定し、ステレオタイプの呪縛から解放することがphonoの使命です。"
  },
  {
    title: "Vision",
    heading: "カオスと共感に満ちた社会",
    body: "人や企業が共感を通じて対立を超え、平和的で活力に満ちたカオスを生む。個々の個性が孤立せず、互いに関わり合うことで築かれる社会の形。phonoが目指している未来像です。"
  }
];

const hipValues = [
  ["01", "適応より適合。", "無理をして環境に合わせるのでなく、ありのままの自分らしさがハマる場所を発見・創出します。"],
  ["02", "こうあるべきってないべき。", "既存の正しさだけが正解じゃない。常識にとらわれず、失敗を恐れず、柔軟に問いを重ねます。"],
  ["03", "違いは価値になる。", "他と同じであることへの圧力に屈せず、他との違いこそが価値の源泉であると信じています。"],
  ["04", "弱さはつながりを生む。", "だれもが抱える弱さから目を背けず、受け入れ、助け合うためにできることを考え続けます。"]
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

function AboutSectionTitle({ title, label }: { title: string; label: string }) {
  return (
    <div className="figma-section-title">
      <h2>{title}</h2>
      <p>［　{label}　］</p>
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
            <span>何のため？<br />誰のため？</span>
          </div>
          <div>
            {introductionCopy.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="about-statement-figma">
        <WaveField variant="deep" assetSrc={figmaAssets.about.decorativeWave} assetClassName="about-statement-wave-asset" />
        <div className="site-shell about-statement-grid">
          <AboutSectionTitle title="Statement" label="ステートメント" />
          <p className="about-statement-lead">ありのまま原理主義。</p>
          <div className="about-statement-copy">
            {statementCopy.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="about-phono site-shell">
        <AboutSectionTitle title="What is phono?" label="phonoについて" />
        <div className="about-phono-grid">
          {phonoColumns.map((column) => (
            <article key={column.title}>
              <span>{column.title}</span>
              <h3>{column.heading}</h3>
              <p>{column.body}</p>
              {"noteTitle" in column ? (
                <div className="phono-equalizer">
                  <FigmaAsset src={figmaAssets.about.phonoImage} alt="" className="phono-equalizer-asset" sizes="396px" />
                  <strong>{column.noteTitle}</strong>
                  <p>{column.noteBody}</p>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="about-hip">
        <div className="site-shell">
          <p className="about-hip-label">What is Hip?</p>
          <h2>「ありのまま」が、最もイケてる。</h2>
          <div className="about-hip-grid">
            {hipValues.map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-company site-shell">
        <FigmaAsset src={figmaAssets.about.companyLogoArt} alt="" className="about-company-logo-art" sizes="(max-width: 720px) 100vw, 38vw" />
        <div>
          <AboutSectionTitle title="Company Profile" label="会社概要" />
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
