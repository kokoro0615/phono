import { ProjectBrowser } from "@/components/phono/interactive";
import { PageHero, SiteFooter } from "@/components/phono/shared";
import { figmaAssets } from "@/data/site";

export default function ProjectsPage() {
  return (
    <main id="main-content" className="projects-list-page">
      <PageHero title="Projects" label="実績紹介" assetSrc={figmaAssets.projects.listHeroWave} assetClassName="projects-list-hero-asset" />
      <div className="site-shell">
        <ProjectBrowser />
      </div>
      <SiteFooter />
    </main>
  );
}
