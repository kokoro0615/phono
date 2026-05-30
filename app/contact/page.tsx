import { ContactForm } from "@/components/phono/interactive";
import { FigmaAsset, PageHero, SiteFooter } from "@/components/phono/shared";
import { figmaAssets } from "@/data/site";

export default function ContactPage() {
  return (
    <main id="main-content" className="figma-subpage contact-figma">
      <PageHero title="CONTACT" label="お問い合わせ" assetSrc={figmaAssets.contact.heroWave} assetClassName="contact-hero-asset">
        <p>
          phonoへのお問い合わせは、メールにて承っております。
          ご希望のお問い合わせ方法からお問い合わせください。
          2～3営業日以内に、担当者よりメールにて返信させていただきます。
          ご提供いただきましたお客様の個人情報は、お問い合わせの目的のみで利用します。
        </p>
      </PageHero>
      <section className="contact-section">
        <div className="site-shell contact-shell">
          <FigmaAsset src={figmaAssets.contact.formBackground} alt="" className="contact-form-background-asset" sizes="(max-width: 720px) 100vw, 1080px" />
          <ContactForm />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
