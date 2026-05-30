import Link from "next/link";
import {
  ArrowLink,
  FigmaAsset,
  SectionHeading,
  SiteFooter,
  WaveField
} from "@/components/phono/shared";
import {
  approachSteps,
  contractTypes,
  figmaAssets,
  servicesCopy
} from "@/data/site";

const { hero, circles, creative, media } = servicesCopy;

export default function ServicesPage() {
  return (
    <main id="main-content" className="services-page figma-subpage">
      {/* Hero — Figma 1:1110 (title) + 1:1097 (two overlapping business circles) */}
      <section className="services-hero">
        <WaveField
          variant="hero"
          assetSrc={figmaAssets.services.heroDecorative}
          assetClassName="services-hero-asset"
        />
        <div className="site-shell services-hero-inner">
          <SectionHeading title={hero.title} label={hero.label} level={1} align="center" />
          <p className="services-hero-lead">
            {hero.lead.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <div className="services-business-circles">
            <FigmaAsset
              src={figmaAssets.services.overlappingCircle}
              alt=""
              className="services-business-circles-asset"
              sizes="(max-width: 768px) 100vw, 1098px"
            />
            {circles.map((circle) => (
              <Link
                key={circle.title}
                href={circle.href}
                className={`services-business-circle services-business-circle-${circle.palette}`}
                aria-label={`${circle.label} ${circle.title}`}
              >
                {/* Visible on mobile (SVG hidden); on desktop the SVG carries the baked labels. */}
                <span className="services-business-circle-text" aria-hidden>
                  <span className="services-business-circle-label">{circle.label}</span>
                  <strong>{circle.title}</strong>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Creative — Figma 1:1057 (statement + body) + 1:1062 (restore diagram) */}
      <section id="creative" className="services-creative">
        <div className="site-shell">
          <p className="services-eyebrow">{creative.label}</p>
          <h2 className="services-statement">
            {creative.statement.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <div className="services-creative-grid">
            <div className="services-creative-copy">
              {creative.body.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
            <FigmaAsset
              src={figmaAssets.services.mainDiagram}
              alt="本来の音を復元し、増幅して大きく響かせるまでのプロセス図"
              className="services-restore-diagram"
              sizes="(max-width: 1024px) 100vw, 757px"
            />
          </div>
        </div>
      </section>

      {/* Approach — Figma 1:1045 (heading) + 5 numbered process areas */}
      <section className="services-approach">
        <div className="site-shell">
          <SectionHeading title="Approach" label="［　業務の流れ　］" />
          <ol className="services-approach-list">
            {approachSteps.map((step, index) => (
              <li key={step.number} className="services-approach-row">
                <div className={`services-teardrop services-teardrop-${step.palette}`}>
                  <FigmaAsset
                    src={figmaAssets.services.processDiagrams[index]}
                    alt=""
                    className="services-teardrop-asset"
                    sizes="368px"
                  />
                  <span className="services-teardrop-number" aria-hidden>
                    {step.number}
                  </span>
                  <h3 className="services-teardrop-title">
                    {step.title.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h3>
                </div>
                <div className="services-approach-detail">
                  <p className="services-approach-body">{step.body}</p>
                  <div className="services-approach-columns">
                    {step.columns.map((column, columnIndex) => (
                      <ul key={columnIndex}>
                        {column.map((item) => (
                          <li key={item}>- {item}</li>
                        ))}
                      </ul>
                    ))}
                  </div>
                  {step.number === "1" ? (
                    <ArrowLink
                      className="services-inline-link"
                      href="/services/subsidy"
                      label="補助金・助成金の詳細"
                      sublabel=""
                    />
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
          <ArrowLink
            className="services-projects-link"
            href="/projects"
            label="Projects"
            sublabel="実績を見る"
          />
        </div>
      </section>

      {/* Contract — Figma 1:985 (heading) + 1:966 (intro) + 1:957 (two contract circles) */}
      <section className="services-contract">
        <div className="site-shell">
          <SectionHeading title="Contract" label="［　契約形態　］" />
          <p className="services-contract-intro">
            phonoでは、プロジェクトの内容や企業の成長フェーズに応じ、オーソドックスな「業務委託契約」と、
            成果に応じて報酬をシェアする「レベニューシェア契約」の2つの契約形態を採用しています。
          </p>
          <div className="services-contract-circles">
            <FigmaAsset
              src={figmaAssets.services.contractVisual}
              alt=""
              className="services-contract-asset"
              sizes="(max-width: 1024px) 100vw, 1320px"
            />
            {contractTypes.map((contract) => (
              <article
                key={contract.title}
                className={`services-contract-card services-contract-card-${contract.palette}`}
              >
                <h3>{contract.title}</h3>
                <p className="services-contract-lead">
                  {contract.lead.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
                <p className="services-contract-body">{contract.body}</p>
                <p className="services-contract-examples-title">適用例</p>
                <ul className="services-contract-examples">
                  {contract.examples.map((example) => (
                    <li key={example}>- {example}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <ArrowLink
            className="services-contact-link"
            href="/contact"
            label="Contact"
            sublabel="お問い合わせはこちら"
          />
        </div>
      </section>

      {/* Media — Figma 1:1115 (statement + body) + 1:1121 (Coming soon + feature) */}
      <section id="media" className="services-media">
        <div className="site-shell">
          <p className="services-eyebrow">{media.label}</p>
          <h2 className="services-statement">
            {media.statement.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <div className="services-media-copy">
            {media.body.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
        </div>
        <WaveField
          variant="section"
          assetSrc={figmaAssets.services.footerWave}
          assetClassName="services-media-wave-asset"
        />
        <div className="site-shell services-media-feature-wrap">
          <p className="services-coming-soon">{media.comingSoon}</p>
          <div className="services-media-feature">
            <FigmaAsset
              src={figmaAssets.services.lowerMedia}
              alt=""
              className="services-media-thumb"
              sizes="(max-width: 768px) 100vw, 606px"
            />
            <div className="services-media-feature-copy">
              <h3>{media.feature.title}</h3>
              {media.feature.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
