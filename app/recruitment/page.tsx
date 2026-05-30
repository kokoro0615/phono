import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArrowLink, FigmaAsset, PageHero, SectionHeading, SiteFooter, WaveField } from "@/components/phono/shared";
import { figmaAssets } from "@/data/site";

const partnerPolicies = [
  {
    title: "事業や市場について深く理解している。",
    body: "事業の背景や目指す未来を共に議論し、共有できるパートナーを求めています。"
  },
  {
    title: "価値を見極め、適切な投資ができること。",
    body: "資金調達も含めた計画づくりを一緒に進め、価値を最大化できる関係を大切にします。"
  },
  {
    title: "違いは価値になる。",
    body: "どう見せるかだけでなく、何を伝えるかを共に考え、ブランドの成長に本気で向き合います。"
  },
  {
    title: "挑戦を恐れず、新しい視点を受け入れる。",
    body: "試行錯誤を前提に、対話と発見を重ねながら本質に迫る姿勢を歓迎します。"
  }
];

const eligibilityItems = [
  ["学歴要件", "専門学校、短期大学、または四年制大学の卒業見込みまたは卒業済みの方。"],
  ["業界経験の有無", "未経験者でもチャレンジ心がある方は歓迎します。クリエイティブ業界、広告業界、マーケティング業界での実務経験がある方は特に歓迎します。"],
  ["ポートフォリオ提出", "クリエイティブ職種は、実績や制作物が分かるポートフォリオをご提出ください。"],
  ["資格・技術的能力", "特定の資格は必須ではありませんが、Adobe Creative Suite、Figma、Google Analytics、SEO、SNS広告運用などのスキルは歓迎します。"]
];

const occupations = [
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

const recruitmentFlow = ["エントリー", "書類選考", "適性検査受験", "1次面接", "最終面接", "内定", "入社"];

const benefits = [
  "レベルアップ評価制度",
  "クリエイティブチャレンジボーナス",
  "チームプレイヤー評価制度",
  "自己ブランディング支援"
];

const hospitalityRows = [
  ["基本給", "年俸360万円〜1000万円（経験・能力に基づき決定）"],
  ["諸手当", "交通費支給、時間外手当（条件付き）"],
  ["勤務地", "大阪オフィス（リモート勤務可）"],
  ["勤務時間", "フレックスタイム制（コアタイムなし）、1日実働8時間"],
  ["業務内容", "各職種における業務の遂行"],
  ["雇用形態", "契約社員（正社員登用制度あり）"],
  ["休日・休暇", "年間休日120日以上、有給休暇、夏季休暇、年末年始休暇"],
  ["試用期間", "3ヶ月（試用期間中の待遇変更なし）"]
];

const styleCards = [
  {
    title: "制度 A",
    body: "フレックスタイム & リモートワーク制度",
    lead: "時間も場所も、もっと自由に。自分のリズムで働く。"
  },
  {
    title: "制度 B",
    body: "個人プロジェクト & 新規事業開発支援",
    lead: "好きなこと、気になることを、とことん追求できる環境。"
  }
];

const supportItems = [
  "スキルアップ支援",
  "メンタルヘルスケア",
  "キャリア開発",
  "退職金制度"
];

const faqs = [
  ["副業から参加できますか？", "プロジェクト単位の関わり方から相談できます。"],
  ["リモートワークは可能ですか？", "職種やプロジェクト状況に応じて、リモート勤務を組み合わせられます。"],
  ["試用期間中の待遇は変わりますか？", "試用期間中も待遇変更はありません。"],
  ["社内でのキャリアアップの機会はありますか？", "評価制度とキャリア面談を通じて、成長機会を設計します。"],
  ["未経験領域があります。", "役割を明確にし、学習と実践を往復できる環境を整えます。"],
  ["選考期間はどのくらいですか？", "エントリーから内定まで通常2〜4週間を想定しています。"]
];

export default function RecruitmentPage() {
  return (
    <main id="main-content" className="recruitment-page">
      <PageHero title="Recruitment" label="採用情報" assetSrc={figmaAssets.recruitment.heroWave} assetClassName="recruitment-hero-asset">
        <p>創造力と挑戦を正当に評価し、成長を最大限サポート。</p>
      </PageHero>

      <section className="recruit-stance">
        <WaveField variant="section" assetSrc={figmaAssets.recruitment.lowerWaves[0]} assetClassName="recruit-stance-wave-asset" />
        <div className="site-shell two-column">
          <SectionHeading title="Stance" label="phonoが求めるパートナー像" />
          <div className="large-copy">
            <FigmaAsset src={figmaAssets.recruitment.stanceIllustration} alt="" className="recruit-stance-asset" sizes="(max-width: 720px) 100vw, 50vw" />
            <h2>ありのままを面白がり、問いを仕事にできる人へ。</h2>
            <p>
              phonoは、決まった型に人を合わせるのではなく、その人の強さが活きる場所を発見・創出します。
            </p>
          </div>
        </div>
      </section>

      <section className="site-shell value-grid-section">
        <SectionHeading title="Partner Policy" label="phonoが求めるパートナー像" />
        <div className="value-grid">
          {partnerPolicies.map((value, index) => (
            <article key={value.title} className="value-card">
              {index < figmaAssets.recruitment.benefitVisuals.length ? (
                <FigmaAsset src={figmaAssets.recruitment.benefitVisuals[index]} alt="" className="value-card-asset" sizes="296px" />
              ) : null}
              <span>{index + 1}</span>
              <h2>{value.title}</h2>
              <p>{value.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="schedule-section site-shell">
        <SectionHeading title="Schedule" label="採用スケジュール" />
        <div className="schedule-timeline-scroll" aria-label="採用スケジュール">
          <FigmaAsset
            src={figmaAssets.recruitment.timelineDiagram}
            alt="採用スケジュール: エントリー期間、書類選考結果通知、面接期間、内定通知"
            className="flow-diagram-asset"
            priority
            sizes="(max-width: 720px) 760px, 100vw"
          />
        </div>
      </section>

      <section className="flow-section site-shell">
        <SectionHeading title="Flow" label="採用フロー" />
        <div className="flow-row">
          {recruitmentFlow.map((step, index) => (
            <article key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="eligibility-section site-shell">
        <SectionHeading title="Eligibility" label="応募資格" />
        <div className="eligibility-list">
          {eligibilityItems.map(([title, body], index) => (
            <article key={title}>
              <span>{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell recruit-details">
        <FigmaAsset src={figmaAssets.recruitment.lowerWaves[1]} alt="" className="recruit-lower-wave-asset" sizes="100vw" />
        <div>
          <SectionHeading title="Occupation" label="現在募集中の職種" />
          <ul className="occupation-list">
            {occupations.map((occupation) => (
              <li key={occupation}>
                <span>{occupation}</span>
                <ArrowRight size={20} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="hospitality-section site-shell">
        <SectionHeading title="Hospitality" label="待遇" />
        <dl className="hospitality-list">
          {hospitalityRows.map(([term, description]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="style-section site-shell">
        <SectionHeading title="Style" label="働き方" />
        <div className="style-grid">
          {styleCards.map((style) => (
            <article key={style.title}>
              <div className="gradient-orbit">{style.title}<strong>{style.body}</strong></div>
              <h3>{style.lead}</h3>
              <p>
                phonoでは、制度を固定化せず、個人の挑戦やチームの成果につながる働き方を一緒に整えています。
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="benefits-section site-shell">
        <SectionHeading title="Benefits" label="福利厚生" />
        <dl className="benefits-list">
          <div><dt>完全週休2日制</dt><dd>土曜、日曜、祝日、年末年始を休日としています。</dd></div>
          <div><dt>有給休暇</dt><dd>入社時に10日付与され、計画的な取得を推奨しています。</dd></div>
          <div><dt>社会保険完備</dt><dd>健康保険、厚生年金保険、雇用保険、労災保険に加入します。</dd></div>
          <div><dt>研修制度</dt><dd>外部研修や社内勉強会を通じて、専門性の向上を支援します。</dd></div>
          <div><dt>書籍購入サポート</dt><dd>業務や学習に必要な書籍購入を補助します。</dd></div>
          <div><dt>デバイスサポート</dt><dd>社内規定をもとに必要な制作環境を整えます。</dd></div>
        </dl>
      </section>

      <section className="support-section site-shell">
        <SectionHeading title="Support" label="成長支援" />
        <div className="support-grid">
          {supportItems.map((item, index) => (
            <article key={item}>
              <div className={`gradient-orbit gradient-orbit-${index % 2 === 0 ? "purple" : "pink"}`}>{item}</div>
              <p>専門性とコンディションの両面から、長く挑戦できる状態を支えます。</p>
            </article>
          ))}
        </div>
      </section>

      <section className="faq-section site-shell">
        <SectionHeading title="FAQ" label="よくある質問" />
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="career-section site-shell">
        <SectionHeading title="Career up" label="評価制度" />
        <div className="career-copy">
          <h2>創造力と挑戦を正当に評価し、成長を最大限サポート</h2>
          <p>結果だけでなく、挑戦・成長・チーム貢献を多角的に評価し、継続的なキャリアアップにつなげます。</p>
        </div>
        <div className="benefit-grid career-grid">
          {benefits.map((benefit, index) => (
            <article key={benefit}>
              {index < figmaAssets.recruitment.benefitVisuals.length ? (
                <FigmaAsset src={figmaAssets.recruitment.benefitVisuals[index]} alt="" className="benefit-asset" sizes="296px" />
              ) : null}
              <h3>{benefit}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="entry-section">
        <WaveField variant="footer" assetSrc={figmaAssets.recruitment.footerWave} assetClassName="recruit-footer-wave-asset" />
        <div className="site-shell entry-inner">
          <SectionHeading title="Entry" label="応募する" />
          <p>まずはあなたのこと、これからやってみたいことを聞かせてください。</p>
          <ArrowLink href="/contact" label="Contact" sublabel="エントリーする" />
          <Link href="/projects">phonoの実績を見る</Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
