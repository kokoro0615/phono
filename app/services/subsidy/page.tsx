import { ArrowLink, FigmaAsset, PageHero, SectionHeading, SiteFooter } from "@/components/phono/shared";
import {
  figmaAssets,
  financeRows,
  subsidyDetailGroups,
  subsidyFeatures,
  subsidyIntro
} from "@/data/site";

export default function SubsidyPage() {
  return (
    <main id="main-content" className="subsidy-page figma-subpage">
      {/* Hero — Figma 1:1286 (Services / 事業内容) + 1:1290 lead */}
      <PageHero
        title="Services"
        label="事業内容"
        assetSrc={figmaAssets.subsidy.heroWave}
        assetClassName="subsidy-hero-asset"
      >
        <p className="subsidy-hero-lead">phonoの補助金・助成金活用サポート</p>
      </PageHero>

      {/* Figma 1:1474 — the tall right-side ribbon crosses Hero, Intro, and Financing. */}
      <FigmaAsset
        src={figmaAssets.subsidy.decorativeVectors[1]}
        alt=""
        className="subsidy-page-ribbon"
        priority
        sizes="974px"
      />

      {/* Intro — Figma 1:1325 heading + 1:1316 icon + 1:1313 copy + 1:1292 diagram */}
      <section className="subsidy-intro">
        <div className="site-shell subsidy-intro-grid">
          <div className="subsidy-intro-copy">
            <SectionHeading title="Services" label="［　資金調達サポートについて　］" />
            <div className="subsidy-money-mark" aria-hidden>
              {figmaAssets.subsidy.moneyMarkLayers.map((src, index) => (
                <FigmaAsset
                  key={src}
                  src={src}
                  className={`subsidy-money-mark-layer subsidy-money-mark-layer-${index + 1}`}
                  sizes="84px"
                />
              ))}
            </div>
            <h2 className="subsidy-statement">{subsidyIntro.statement}</h2>
            <div className="subsidy-intro-body">
              {subsidyIntro.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          <FigmaAsset
            src={figmaAssets.subsidy.financeDiagram}
            alt="助成金・補助金・融資をクリエイティブに接続する関係図"
            className="subsidy-intro-diagram"
            priority
            sizes="(max-width: 1024px) 80vw, 480px"
          />
        </div>
      </section>

      {/* Financing — Figma 1:1330 heading + 3 rows (補助金/助成金/融資) */}
      <section className="subsidy-financing">
        <div className="site-shell">
          <SectionHeading title="Financing" label="［　補助金・助成金・融資の活用方法　］" />
          <ol className="subsidy-finance-list">
            {financeRows.map((row) => (
              <li key={row.title} className="subsidy-finance-row">
                {/* Teardrop label and pill circle bake all text as vector paths in
                    the Figma SVG; alt carries the meaning for assistive tech. */}
                <FigmaAsset
                  src={figmaAssets.subsidy.circleDiagrams[row.teardropIndex]}
                  alt={`${row.title} ${row.sub}`}
                  className="subsidy-finance-teardrop"
                  sizes="(max-width: 720px) 56vw, 280px"
                />
                <FigmaAsset
                  src={figmaAssets.subsidy.circleDiagrams[row.diagramIndex]}
                  alt={`${row.title}の対象制度（${row.items.join("、")}）。補助・受給の目安は${row.range}。`}
                  className="subsidy-finance-circle"
                  sizes="(max-width: 720px) 86vw, 522px"
                />
              </li>
            ))}
          </ol>
          <p className="subsidy-finance-note">
            ※ 事業内容や規模に応じて、適切な資金調達方法を組み合わせることで最大限の活用が可能です。
          </p>
        </div>
      </section>

      {/* Feature — Figma 1:1335 heading + 3 numbered teardrops (1:1341) */}
      <section className="subsidy-feature">
        <div className="site-shell">
          <SectionHeading title="Feature" label="［　phonoのサポートの特徴　］" />
          <ol className="subsidy-feature-grid">
            {subsidyFeatures.map((feature, index) => (
              <li key={feature.number} className="subsidy-feature-card">
                <div className={`subsidy-feature-mark subsidy-feature-mark-${feature.number}`}>
                  <FigmaAsset
                    src={figmaAssets.subsidy.featureMarks[index][0]}
                    alt=""
                    className="subsidy-feature-mark-layer subsidy-feature-mark-layer-a"
                    sizes="142px"
                  />
                  <FigmaAsset
                    src={figmaAssets.subsidy.featureMarks[index][1]}
                    alt=""
                    className="subsidy-feature-mark-layer subsidy-feature-mark-layer-b"
                    sizes="142px"
                  />
                  <span className="subsidy-feature-number tabular-nums" aria-hidden>
                    {feature.number}
                  </span>
                </div>
                <h3 className="subsidy-feature-heading">
                  {feature.heading.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h3>
                <p className="subsidy-feature-body">{feature.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Detail — Figma 1:1479 scene + 1:1493 (補助金) + 1:1502 (助成金). */}
      <div className="subsidy-detail-scene">
        <FigmaAsset
          src={figmaAssets.subsidy.decorativeVectors[2]}
          alt=""
          className="subsidy-detail-scene-asset"
          sizes="100vw"
        />
        <div className="subsidy-detail-blobs" aria-hidden>
          <FigmaAsset
            src={figmaAssets.subsidy.detailBlobs.pink}
            className="subsidy-detail-blob subsidy-detail-blob-pink-left"
            sizes="789px"
          />
          <FigmaAsset
            src={figmaAssets.subsidy.decorativeVectors[0]}
            className="subsidy-detail-blob subsidy-detail-blob-lavender-center"
            sizes="737px"
          />
          <FigmaAsset
            src={figmaAssets.subsidy.detailBlobs.pink}
            className="subsidy-detail-blob subsidy-detail-blob-pink-right"
            sizes="789px"
          />
          <FigmaAsset
            src={figmaAssets.subsidy.decorativeVectors[3]}
            className="subsidy-detail-blob subsidy-detail-blob-lavender-left"
            sizes="737px"
          />
          <FigmaAsset
            src={figmaAssets.subsidy.detailBlobs.pinkCenter}
            className="subsidy-detail-blob subsidy-detail-blob-pink-center"
            sizes="709px"
          />
          <FigmaAsset
            src={figmaAssets.subsidy.decorativeVectors[4]}
            className="subsidy-detail-blob subsidy-detail-blob-lavender-right"
            sizes="737px"
          />
        </div>
        {subsidyDetailGroups.map((group, groupIndex) => (
          <section key={group.title} className={`subsidy-detail subsidy-detail-${group.palette}`}>
            <div className="site-shell">
              <h2 className="subsidy-detail-title">{group.title}</h2>
              <div className="subsidy-detail-grid">
                {(group.palette === "lavender"
                  ? [group.cards[0], group.cards[2], group.cards[1]]
                  : group.cards
                ).map((card, cardIndex) => (
                  <article
                    key={card.title}
                    className={`subsidy-detail-card subsidy-detail-card-${groupIndex + 1}-${cardIndex + 1}`}
                  >
                    <h3 className="subsidy-detail-card-title">{card.title}</h3>
                    <dl className="subsidy-detail-rows">
                      {card.rows.map((field) => (
                        <div key={field.label} className="subsidy-detail-field">
                          <dt>{field.label}</dt>
                          <dd>
                            {field.lines.map((line) => (
                              <span key={line}>{line}</span>
                            ))}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <ArrowLink
                      className="subsidy-detail-link"
                      href="/contact"
                      label="詳細はこちら"
                      sublabel=""
                    />
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <SiteFooter />
    </main>
  );
}
