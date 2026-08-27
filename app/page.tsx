import Link from "next/link";
import { PhonoTabs, ProjectCard } from "@/components/phono/interactive";
import { ArrowLink, FigmaAsset, LogoMark, SiteFooter, StatementParagraphs } from "@/components/phono/shared";
import { figmaAssets, members, projects, serviceCircles } from "@/data/site";

const projectCategories = ["All", "事業開発", "サービス開発", "ブランディング", "プロモーション・PR", "資金調達サポート"];
const featuredProjects = projects.slice(0, 5);
const featuredMembers = members.slice(0, 4);

function ProjectFeature() {
  return (
    <section className="figma-projects" aria-labelledby="home-projects-title">
      <div className="figma-project-heading">
        <span>実績紹介</span>
        <h2 id="home-projects-title">Projects</h2>
      </div>
      <PhonoTabs
        tabs={projectCategories.map((category) => ({ value: category, label: category }))}
        ariaLabel="実績カテゴリ"
        className="figma-project-filter"
      />
      <ArrowLink href="/projects" label="View All" sublabel="実績一覧を見る" className="figma-arrow-link" />
      <div className="figma-project-list">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            title={project.title}
            description={project.summary}
            href={`/projects/${project.slug}`}
            tags={project.tags.slice(0, 2)}
            number={project.number}
            client={project.client}
            className="figma-project-card"
            image={
              <Link href={`/projects/${project.slug}`} className={`figma-project-thumb figma-project-thumb-${index + 1} figma-project-thumb-with-asset`}>
                <FigmaAsset
                  src={figmaAssets.top.projectVisuals[index % figmaAssets.top.projectVisuals.length]}
                  alt=""
                  className="figma-project-thumb-image"
                  sizes="230px"
                />
              </Link>
            }
          />
        ))}
      </div>
    </section>
  );
}

function MemberStrip() {
  return (
    <section className="figma-member" id="member" aria-labelledby="home-member-title">
      <div className="figma-member-heading">
        <h2 id="home-member-title">Member</h2>
        <span>phonoの人</span>
      </div>
      {/* Figma 1:14 — the two carousel arrows flanking the member row. The row
          itself is static here, so they are decorative. */}
      <FigmaAsset src={figmaAssets.top.memberArrows} className="figma-member-arrows" sizes="1305px" />
      <div className="figma-member-track">
        {featuredMembers.map((member, index) => {
          const [firstName, lastName] = member.name.split(" ");

          return (
            <article key={member.name} className="figma-member-card">
              <FigmaAsset
                src={figmaAssets.top.memberVisuals[index]}
                alt=""
                className={`figma-member-portrait figma-member-portrait-${index + 1}`}
                sizes="(max-width: 720px) 76vw, 352px"
              />
              <h3>
                <span>{firstName}</span>
                <span>{lastName}</span>
              </h3>
              <p>{member.quote}</p>
              <small>{member.role}</small>
              <strong>{member.jp}</strong>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function RecruitmentCta() {
  return (
    <section className="figma-recruitment" aria-labelledby="home-recruitment-title">
      <div className="figma-recruitment-title">
        <h2 id="home-recruitment-title">Recruitment</h2>
        <span>採用情報</span>
      </div>
      <ArrowLink href="/recruitment" label="View More" sublabel="詳細を見る" className="figma-arrow-link" />
      <div className="figma-recruitment-copy">
        <h3>phonoは一緒に働く<br />仲間を探しています。</h3>
        {/* Figma 1:236 — six authored lines on a 32px baseline. */}
        <p>
          {"このテキストエリアにはボディコピーや本文、\n説明文や詳細記事などが入ってきます。\nここには簡単な説明や、補足情報などの\n文章が記載される予定です。\n現状でここに入っている文字は\n全てダミーテキストです。"}
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main id="main-content" className="home-top">
      {/* Page-level Figma artwork. These vectors span section boundaries in the
          design, so they live in one 1440px canvas layer positioned by their
          Figma page coordinates rather than inside a single section. */}
      <div className="figma-canvas" aria-hidden>
        {/* Figma 1:79 — the 1068x3150 wave running down the right edge from
            y=-679 — and 1:68, the Projects blob. */}
        <FigmaAsset src={figmaAssets.top.lowerWaveGroup} className="figma-bg figma-bg-hero-side" priority sizes="1068px" />
        <FigmaAsset src={figmaAssets.top.decorativeCluster} className="figma-bg figma-bg-projects-blob" sizes="1636px" />

        {/* Figma 1:5 is a clip-path group: everything below is masked by the
            band shape (1:6), which is why the crest waves stop at its top edge
            instead of flooding the white above it. */}
        <div className="figma-bg figma-bg-member-clip">
          <FigmaAsset src={figmaAssets.top.memberBand} className="figma-bg-member-band" sizes="1440px" />
          <FigmaAsset src={figmaAssets.top.memberWaveA} className="figma-bg-member-wave-a" sizes="1440px" />
          <FigmaAsset src={figmaAssets.top.memberWaveB} className="figma-bg-member-wave-b" sizes="1440px" />
          <FigmaAsset src={figmaAssets.top.recruitmentWave} className="figma-bg-recruitment-wave" sizes="1440px" />
        </div>
      </div>

      <section className="figma-hero" aria-labelledby="home-hero-title">
        <div className="figma-hero-brand">
          <LogoMark muted priority />
          <h1 id="home-hero-title">ありのまま原理主義。</h1>
        </div>
        {/* Figma 1:72 + 1:75 — two teardrops offset 12.5px apart, multiplied.
            The lower violet copy is what darkens the overlap to #DE82E4. */}
        <FigmaAsset src={figmaAssets.top.scrollBlob} className="figma-scroll-blob" sizes="59px" />
        <FigmaAsset src={figmaAssets.top.scrollBlobLower} className="figma-scroll-blob figma-scroll-blob-lower" sizes="59px" />
        <div className="figma-scroll">Scroll</div>
        {/* Figma 1:252 (the 1440x615 gradient wave that paints over the
            wordmark at 90%) belongs to the *open* menu — the TOP frame is
            captured with the nav modal 1:308 showing. It is rendered by
            SiteHeader's curtain so it flows in with the navigation. */}
      </section>

      <section className="figma-statement" aria-label="phonoステートメント">
        <div>
          <StatementParagraphs />
        </div>
      </section>

      <section className="figma-services" aria-label="TOP導線とサービス">
        <div className="figma-service-links">
          <ArrowLink href="/about" label="About" sublabel="phonoとは？" className="figma-arrow-link" />
          <ArrowLink href="/services" label="Services" sublabel="事業内容" className="figma-arrow-link" />
        </div>
        {/* Figma 1:237 — the two overlapping multiply-blended circles are one
            exported vector group; the links sit transparently on top of it. */}
        <div className="figma-service-circles">
          <FigmaAsset src={figmaAssets.top.serviceCircles} className="figma-service-circles-asset" sizes="1117px" />
          {serviceCircles.map((service, index) => (
            <Link key={service.title} href={service.href} className={`figma-service-circle figma-service-circle-${index + 1}`}>
              <span>{service.label}</span>
              <strong>{service.title}</strong>
            </Link>
          ))}
        </div>
      </section>

      <ProjectFeature />
      <MemberStrip />
      <RecruitmentCta />
      <SiteFooter />
    </main>
  );
}
