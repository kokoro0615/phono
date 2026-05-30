import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { PhonoTabs, ProjectCard } from "@/components/phono/interactive";
import { ArrowLink, ContactCircle, FigmaAsset, LogoMark, SiteFooter } from "@/components/phono/shared";
import { figmaAssets, members, navItems, projects, serviceCircles, statementCopy } from "@/data/site";

const projectCategories = ["All", "事業開発", "サービス開発", "ブランディング", "プロモーション・PR", "資金調達サポート"];
const featuredProjects = projects.slice(0, 5);
const featuredMembers = members.slice(0, 4);

function TopNav() {
  return (
    <nav className="figma-top-nav" aria-label="TOPグローバルナビゲーション">
      {navItems.slice(0, 6).map((item) => (
        <Link key={item.href} href={item.href} className="figma-nav-item">
          <strong>{item.label}</strong>
          <span>{item.sublabel}</span>
          {item.children ? (
            <small>
              {item.children.slice(0, 5).map((child) => (
                <em key={child}>- {child}</em>
              ))}
            </small>
          ) : null}
        </Link>
      ))}
      <ContactCircle className="figma-nav-contact" />
      <div className="figma-social">
        <Link href="https://www.instagram.com/" aria-label="Instagram">
          <Instagram size={19} strokeWidth={1.7} />
        </Link>
        <Link href="https://www.facebook.com/" aria-label="Facebook">
          <Facebook size={19} strokeWidth={1.7} />
        </Link>
      </div>
    </nav>
  );
}

function ProjectFeature() {
  return (
    <section className="figma-projects" aria-labelledby="home-projects-title">
      <FigmaAsset src={figmaAssets.top.decorativeCluster} className="figma-project-wave" />
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
      <span className="figma-member-wave" aria-hidden />
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
      <span className="figma-recruitment-wave" aria-hidden />
      <div className="figma-recruitment-title">
        <h2 id="home-recruitment-title">Recruitment</h2>
        <span>採用情報</span>
      </div>
      <ArrowLink href="/recruitment" label="View More" sublabel="詳細を見る" className="figma-arrow-link" />
      <div className="figma-recruitment-copy">
        <h3>phonoは一緒に働く<br />仲間を探しています。</h3>
        <p>
          このテキストエリアにはボディコピーや本文、説明文や詳細記事などが入ってきます。
          ここには簡単な説明や、補足情報などの文章が記載される予定です。
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main id="main-content" className="home-top">
      <section className="figma-hero" aria-labelledby="home-hero-title">
        <FigmaAsset src={figmaAssets.top.heroGradientWave} className="figma-hero-gradient-wave" priority />
        <FigmaAsset src={figmaAssets.top.lowerWaveGroup} className="figma-hero-side-wave" priority />
        <TopNav />
        <div className="figma-hero-brand">
          <LogoMark muted priority />
          <h1 id="home-hero-title">ありのまま原理主義。</h1>
        </div>
        <div className="figma-scroll">Scroll</div>
      </section>

      <section className="figma-statement" aria-label="phonoステートメント">
        <div>
          {statementCopy.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="figma-services" aria-label="TOP導線とサービス">
        <div className="figma-service-links">
          <ArrowLink href="/about" label="About" sublabel="phonoとは？" className="figma-arrow-link" />
          <ArrowLink href="/services" label="Services" sublabel="事業内容" className="figma-arrow-link" />
        </div>
        <div className="figma-service-circles">
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
