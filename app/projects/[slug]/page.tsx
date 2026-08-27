import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { PhonoBadge } from "@/components/phono/interactive";
import { FigmaAsset, PageHero, SiteFooter } from "@/components/phono/shared";
import { figmaAssets, projects } from "@/data/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const currentIndex = projects.findIndex((project) => project.slug === slug);
  const project = projects[currentIndex];

  if (!project) {
    notFound();
  }

  const previous = projects[(currentIndex - 1 + projects.length) % projects.length];
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <main id="main-content" className="figma-subpage project-detail-figma">
      <PageHero title="Projects" label="実績紹介" assetSrc={figmaAssets.projects.detailHeroWave} assetClassName="project-detail-hero-asset" />

      <article className="project-detail site-shell">
        <FigmaAsset src={figmaAssets.projects.detailVisual} alt="" className="detail-visual" sizes="(max-width: 720px) 100vw, 948px" />
        <div className="project-meta">
          <h2>{project.client}</h2>
          <h3>
            <span>{project.title}</span>
            {project.slug === "hachimarusuisan-ec" ? <span>安心・安全の魚惣菜を全国へ。</span> : null}
          </h3>
          <dl className="project-detail-meta">
            <div>
              <dt>Client</dt>
              <dd>{project.legalClient ?? project.client}</dd>
            </div>
            <div>
              <dt>Service</dt>
              <dd className="tag-row">
                {project.tags.map((tag) => (
                  <PhonoBadge key={tag} className="project-detail-badge">{tag}</PhonoBadge>
                ))}
              </dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>{project.date}</dd>
            </div>
          </dl>
        </div>

        <DetailBlock title="Outline" label="概要">
          <h3>見出しやキャッチコピー等のテキストがが入ります。</h3>
          <p>
            ショッピングモールでの対面販売に限界を感じており、オンラインでの販路拡大が急務でした。
            特に、健康志向の高い主婦層からの要望が増えていたため、オンライン販売の必要性が高まっていました。
          </p>
        </DetailBlock>

        <DetailBlock title="Issue" label="課題">
          <ol>
            <li>対面販売に依存し販路が限定的</li>
            <li>オンラインでの販売チャネルが未整備</li>
            <li>魚惣菜に対するネガティブな印象</li>
          </ol>
        </DetailBlock>

        <DetailBlock title="Solution" label="解決策">
          <h3>見出しやキャッチコピー等のテキストがが入ります。</h3>
          <div className="detail-solution-grid">
            <strong>shopifyの導入<br />ターゲット設定<br />商品開発</strong>
            <p>補助金を活用してShopifyを導入し、オンライン販売のためのECサイトを構築。EC市場の魚惣菜の調査・分析を行い、ターゲット設定から商品開発まで一体で設計しました。</p>
          </div>
        </DetailBlock>

        <DetailBlock title="Result" label="実施結果">
          <h3>オンライン販売開始後の成果</h3>
          <dl className="result-list">
            <div>
              <dt>月間売上</dt>
              <dd>対面販売の2倍に増加</dd>
            </div>
            <div>
              <dt>リピーター率</dt>
              <dd>30%向上</dd>
            </div>
            <div>
              <dt>ターゲット層からの評価</dt>
              <dd>非常に高く、健康志向の商品が支持される</dd>
            </div>
          </dl>
        </DetailBlock>

        <nav className="detail-nav" aria-label="実績詳細ナビゲーション">
          <Link href={`/projects/${previous.slug}`}>
            <FigmaAsset src={figmaAssets.pagerChevron} className="pager-chevron pager-chevron-prev" sizes="18px" /> prev
          </Link>
          <Link href="/projects">back to list</Link>
          <Link href={`/projects/${next.slug}`}>
            next <FigmaAsset src={figmaAssets.pagerChevron} className="pager-chevron" sizes="18px" />
          </Link>
        </nav>
      </article>
      <SiteFooter />
    </main>
  );
}

function DetailBlock({
  title,
  label,
  children
}: {
  title: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="figma-detail-block">
      <div className="figma-section-title">
        <h2>{title}</h2>
        <p>［　{label}　］</p>
      </div>
      <div className="figma-detail-copy">{children}</div>
    </section>
  );
}
