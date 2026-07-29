import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArrowLink, FigmaAsset, PageHero, SectionHeading, SiteFooter } from "@/components/phono/shared";
import { figmaAssets } from "@/data/site";

const partnerPolicies = [
  {
    title: "事業や市場について深く理解している。",
    body: "言葉にするのは私たちの仕事ですが、そのためには事業の本質や市場の構造や環境を深く理解していることが欠かせません。マーケティング戦略は私たちが担いますが、事業の背景や目指す未来を共に議論し、共有できるパートナーを求めています。"
  },
  {
    title: "価値を見極め、適切な投資ができること。",
    body: "事業やブランドの成長には、適切な投資が欠かせません。融資や助成金・補助金の活用を含め、資金調達のサポートも行いますが、計画の策定や必要書類の準備など、クライアントにもご協力いただく場面があります。お互いに力を合わせながら、価値を最大化できるパートナーを求めています。"
  },
  {
    title: "違いは価値になる。",
    body: "ブランドの核は「想い」と「情熱」。phonoは、ただデザインを作るのではなく、本質的な価値を形にし、長く愛されるブランドへと育てていきます。だからこそ、「どう見せるか」だけでなく、「何を伝えるか」を共に考え、ブランドの成長に本気で向き合えるパートナーを求めています。"
  },
  {
    title: "挑戦を恐れず、新しい視点を受け入れる。",
    body: "ブランドの核は「想い」と「情熱」。phonoは、ただデザインを作るのではなく、本質的な価値を形にし、長く愛されるブランドへと育てていきます。だからこそ、「どう見せるか」だけでなく、「何を伝えるか」を共に考え、ブランドの成長に本気で向き合えるパートナーを求めています。"
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
  ["勤務時間", "フレックスタイム制（コアタイムなし）、1日実働8時間（リモートワーク対応可）"],
  ["業務内容", "各職種における業務の遂行"],
  ["雇用形態", "契約社員（正社員登用制度あり） ※ 契約社員として入社後、一定の期間と評価基準を満たした場合、正社員への登用が可能です。"],
  ["給与", "年俸制（スキル・経験に基づき決定）"],
  ["賞与", "年俸制のため、賞与は含まれています"],
  ["休日・休暇", "年間休日120日以上、有給休暇、夏季休暇、年末年始休暇、特別休暇"],
  ["特別休暇", "忌引休暇、結婚休暇、出産休暇、誕生日休暇、ウェルビーイング休暇（生理など体調不良に伴う特別休暇）"],
  ["住居支援", "「賃貸サポートプログラム」：住居契約時の初期費用軽減や、条件の良い物件の紹介サポートを実施"],
  ["試用 / 契約期間", "3ヶ月（試用期間中の待遇変更なし） ※ 試用期間終了後、業務パフォーマンスや勤怠状況を総合的に評価し、正社員登用を検討いたします。"]
];

const benefitRows = [
  ["完全週休2日制", "土曜、日曜、祝日、年末年始を休日としています。"],
  ["有給休暇", "入社時に10日付与され、以降は毎年1月に決められた日数が付与されます。"],
  ["積立休暇", "翌年度に繰り越せない有給休暇は、年間20日・上限120日まで特定積立休暇として累積できます。"],
  ["社会保険完備", "健康保険、厚生年金保険、雇用保険、労災保険に加入します。"],
  ["交通費支給", "通勤手当（上限3万円 / 月）"],
  ["住宅手当", "条件を満たす場合、住宅補助として月額2万円支給します。"],
  ["転居費用 / 転居時交通費補助", "遠方から引越しされた場合、その費用を会社で補助します。（条件 / 上限金額あり）"],
  ["健康管理サポート", "年1回の定期健康診断が受診可能です。"],
  ["ランチ代サポート", "社内食堂を利用の際に、半額補助しています。"],
  ["企業型確定拠出年金", "毎月拠出した金額を運用し、60歳到達後に年金または一時金として受け取る制度です。"],
  ["病児保育＆ベビーシッター補助制度", "保育サービスを利用した際の利用料の半額を補助します。（上限金額あり）"],
  ["Appleギフトカード / Google Playカード購入補助", "有料アプリ等の利用体験促進を目的に、購入金額の50%を補助します。（上限あり）"]
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
  ["応募に必要な書類は何ですか？", "履歴書・職務経歴書と、クリエイティブ職はポートフォリオをご用意ください。"],
  ["リモートワークは可能ですか？", "職種やプロジェクト状況に応じて、リモート勤務を組み合わせられます。"],
  ["試用期間中の待遇は変わりますか？", "試用期間中も待遇変更はありません。"],
  ["社内でのキャリアアップの機会はありますか？", "評価制度とキャリア面談を通じて、成長機会を設計します。"],
  ["社内の雰囲気はどのようなものですか？", "対話と発見を大切にする、個性豊かなチームです。"],
  ["服装や髪色、髪型、ネイル、ピアス、タトゥーに関する決まりはありますか？", "業務に支障のない範囲で、それぞれの個性を尊重します。"],
  ["飲み会は多いですか？お酒が苦手です。", "参加は任意です。お酒を飲まないメンバーも安心して参加できます。"],
  ["人見知りです", "静かな関わり方も含め、それぞれが心地よく働ける関係を大切にします。"],
  ["個性がないです", "対話を重ねながら、その人らしい強みを一緒に見つけます。"]
];

export default function RecruitmentPage() {
  return (
    <main id="main-content" className="recruitment-page">
      <PageHero title="Recruitment" label="採用情報" assetSrc={figmaAssets.recruitment.lowerWaves[1]} assetClassName="recruitment-hero-asset">
        <p>創造力と挑戦を正当に評価し、成長を最大限サポート。</p>
      </PageHero>

      <section className="recruit-stance">
        <div className="site-shell two-column">
          <SectionHeading title="Stance" label="phonoの向き合い方" />
          <div className="large-copy">
            <FigmaAsset src={figmaAssets.recruitment.stanceIllustration} alt="" className="recruit-stance-asset" sizes="(max-width: 720px) 100vw, 50vw" />
            <h2>揺らぎ、問い、関わり合う。<br />それがphonoのスタンス。</h2>
            <p>
              phonoは、ひとつひとつのプロジェクトにじっくりと時間をかけ、クライアントの本質を最大限に引き出すことを大切にしています。
              それは、単なるデザインやマーケティングではなく、その企業やブランドが本来持つ「ありのまま」に深く寄り添い、
              まだ言葉にならない想いや価値をすくい上げ、共鳴する形へと昇華させること。そのプロセスは決して一直線ではなく、
              試行錯誤しながら形を探る「揺らぎ」の時間を必要とします。クライアント自身が気づいていない魅力を見つけるために、
              私たちは表層的なアプローチではなく、深くしなやかに「問い」を立て、対話を繰り返しながら本質に迫ります。
              phonoのスタンスは、「速さ」や「大量生産」ではなく、「対話」と「発見」。短期間で答えを出すのではなく、
              価値が最も響く形へと練り上げていく。そのために、プロジェクトごとに時間とリソースを惜しみなく投じ、
              細部にまでこだわり抜きます。そして、それを実現するには、クライアントとの関係も単なる受発注の枠を超え、
              互いに「関わり合う」ことが不可欠です。本気で向き合い、共に考え、共に創る。
              それが、phonoが目指すクリエイティブのあり方です。
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
        <FigmaAsset src={figmaAssets.recruitment.heroWave} alt="" className="recruit-lower-wave-asset" sizes="100vw" />
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
          {benefitRows.map(([term, description]) => (
            <div key={term}><dt>{term}</dt><dd>{description}</dd></div>
          ))}
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
          <p>
            phonoでは、「やった分だけ評価される」ことを重視し、クリエイターが本当にやる気を出せる評価制度を導入します。
            ただの成果主義ではなく、挑戦・成長・チーム貢献など多角的に評価し、報酬やキャリアアップにつなげる仕組みを整えています。
          </p>
        </div>
        <div className="benefit-grid career-grid">
          {benefits.map((benefit, index) => (
            <article key={benefit}>
              {index === 1 || index === 3 ? (
                <FigmaAsset
                  src={figmaAssets.recruitment.benefitVisuals[index === 1 ? 0 : 1]}
                  alt=""
                  className="benefit-asset"
                  sizes="296px"
                />
              ) : null}
              <h3>{benefit}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="entry-section">
        <div className="site-shell entry-inner">
          <SectionHeading title="Entry" label="応募する" />
          <p>まずはあなたのこと、これからやってみたいことを聞かせてください。</p>
          <ArrowLink href="/contact" label="Contact" sublabel="エントリーする" />
          <Link href="/projects">phonoの実績を見る</Link>
        </div>
      </section>
      <div className="recruit-footer-wrap">
        <FigmaAsset
          src={figmaAssets.recruitment.lowerWaves[0]}
          alt=""
          className="recruit-footer-background-asset"
          sizes="3026px"
        />
        <SiteFooter />
      </div>
    </main>
  );
}
