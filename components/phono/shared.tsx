import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight, Facebook, Instagram } from "lucide-react";
import { figmaAssets, navItems } from "@/data/site";
import { cn } from "@/lib/cn";

type WaveFieldProps = {
  variant?: "hero" | "section" | "deep" | "footer";
  className?: string;
  assetSrc?: string;
  assetClassName?: string;
};

export function FigmaAsset({
  src,
  alt = "",
  className,
  imageClassName,
  priority = false,
  sizes = "100vw"
}: {
  src: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <span className={cn("figma-asset", className)} aria-hidden={alt ? undefined : true}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        unoptimized={src.toLowerCase().endsWith(".svg")}
        sizes={sizes}
        className={cn("figma-asset-image", imageClassName)}
      />
    </span>
  );
}

export function WaveField({
  variant = "section",
  className,
  assetSrc,
  assetClassName
}: WaveFieldProps) {
  if (assetSrc) {
    return (
      <div aria-hidden className={cn("wave-field", `wave-${variant}`, "wave-field-asset", className)}>
        <FigmaAsset src={assetSrc} className={assetClassName} />
      </div>
    );
  }

  return (
    <div aria-hidden className={cn("wave-field", `wave-${variant}`, className)}>
      <span className="wave-layer wave-layer-a" />
      <span className="wave-layer wave-layer-b" />
      <span className="wave-layer wave-layer-c" />
    </div>
  );
}

export function LogoMark({ muted = false, priority = false }: { muted?: boolean; priority?: boolean }) {
  return (
    <Link href="/" className={cn("logo-mark", muted && "logo-mark-muted")} aria-label="phono top">
      <Image
        src={figmaAssets.headerLogo}
        alt=""
        width={420}
        height={131}
        priority={priority}
        unoptimized
        className="logo-mark-asset"
      />
    </Link>
  );
}

export function ContactCircle({ className }: { className?: string }) {
  return (
    <Link href="/contact" className={cn("contact-circle", className)}>
      <ArrowDown aria-hidden size={28} strokeWidth={1.2} />
      <strong>Contact</strong>
      <span>お問合せ</span>
    </Link>
  );
}

export function SectionHeading({
  title,
  label,
  align = "left",
  className,
  level = 2
}: {
  title: string;
  label: string;
  align?: "left" | "right" | "center";
  className?: string;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <div className={cn("section-heading", `section-heading-${align}`, className)}>
      <Heading>{title}</Heading>
      <p>{label}</p>
    </div>
  );
}

export function ArrowLink({
  href,
  label,
  sublabel,
  className
}: {
  href: string;
  label: string;
  sublabel: string;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("arrow-link", className)}>
      <span className="arrow-line" />
      <span>
        <strong>{label}</strong>
        <small>{sublabel}</small>
      </span>
      <ArrowRight aria-hidden size={24} strokeWidth={1.2} />
    </Link>
  );
}

export function PageHero({
  title,
  label,
  children,
  assetSrc,
  assetClassName
}: {
  title: string;
  label: string;
  children?: React.ReactNode;
  assetSrc?: string;
  assetClassName?: string;
}) {
  return (
    <section className="page-hero">
      <WaveField variant="hero" assetSrc={assetSrc} assetClassName={assetClassName} />
      <div className="site-shell page-hero-inner">
        <SectionHeading title={title} label={label} level={1} />
        {children ? <div className="page-hero-copy">{children}</div> : null}
      </div>
    </section>
  );
}

export function VisualTile({
  label,
  palette = "violet",
  className
}: {
  label: string;
  palette?: string;
  className?: string;
}) {
  return (
    <div className={cn("visual-tile", `visual-${palette}`, className)}>
      <span />
      <strong>{label}</strong>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-grid">
        {navItems.slice(0, 6).map((item) => (
          <div key={item.href} className="footer-column">
            <Link href={item.href}>
              <strong>{item.label}</strong>
              <span>{item.sublabel}</span>
            </Link>
            {item.children ? (
              <ul>
                {item.children.map((child) => (
                  <li key={child}>- {child}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
        <ContactCircle />
      </div>
      <div className="footer-brand">
        <div className="footer-wave" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <LogoMark />
        <div className="social-row" aria-label="social links">
          <Link href="https://www.instagram.com/" aria-label="Instagram">
            <Instagram size={34} strokeWidth={2.1} />
          </Link>
          <Link href="https://www.facebook.com/" aria-label="Facebook">
            <Facebook size={34} strokeWidth={2.1} />
          </Link>
        </div>
      </div>
      <div className="footer-bottom site-shell">
        <Link href="/contact">プライバシーポリシー</Link>
        <span>© 2023 phono Co.,Ltd.</span>
      </div>
    </footer>
  );
}
