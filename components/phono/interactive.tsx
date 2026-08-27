"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes
} from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { figmaAssets, members, navItems, projects } from "@/data/site";
import type { Project } from "@/data/site";
import { cn } from "@/lib/cn";
import { ContactCircle, FigmaAsset, LogoMark, VisualTile } from "./shared";

type PhonoButtonProps = {
  children: ReactNode;
  loading?: boolean;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

export function PhonoButton({
  children,
  disabled = false,
  loading = false,
  type = "button",
  className,
  ...props
}: PhonoButtonProps) {
  return (
    <button
      type={type}
      className={cn("submit-button", className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {children}
    </button>
  );
}

type PhonoInputProps = {
  label?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  className?: string;
  multiline?: false;
} & InputHTMLAttributes<HTMLInputElement>;

type PhonoTextareaProps = {
  label?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  className?: string;
  multiline: true;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function PhonoInput({
  label,
  helper,
  error,
  className,
  multiline,
  ...props
}: PhonoInputProps | PhonoTextareaProps) {
  const fieldId = props.id ?? (typeof props.name === "string" ? `phono-${props.name}` : undefined);
  const helperId = fieldId && helper ? `${fieldId}-helper` : undefined;
  const errorId = fieldId && error ? `${fieldId}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <label className={className}>
      {label ? <span>{label}</span> : null}
      {multiline ? (
        <textarea
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
      ) : (
        <input
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
      )}
      {helper ? <small id={helperId}>{helper}</small> : null}
      {error ? (
        <small id={errorId} role="alert">
          {error}
        </small>
      ) : null}
    </label>
  );
}

type PhonoCheckboxProps = {
  children: ReactNode;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function PhonoCheckbox({
  children,
  className,
  ...props
}: PhonoCheckboxProps) {
  return (
    <label className={cn("check-row", className)}>
      <input type="checkbox" {...props} />
      <span>{children}</span>
    </label>
  );
}

export type PhonoTabItem<T extends string = string> = {
  value: T;
  label: ReactNode;
};

type PhonoTabsProps<T extends string = string> = {
  tabs: PhonoTabItem<T>[];
  activeTab?: T;
  onChange?: (value: T) => void;
  ariaLabel: string;
  className?: string;
};

export function PhonoTabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  ariaLabel,
  className
}: PhonoTabsProps<T>) {
  if (!onChange) {
    return (
      <ul className={className} aria-label={ariaLabel}>
        {tabs.map((tab) => (
          <li key={tab.value}>{tab.label}</li>
        ))}
      </ul>
    );
  }

  return (
    <div className={className} role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.value}
          className={activeTab === tab.value ? "active" : ""}
          onClick={onChange ? () => onChange(tab.value) : undefined}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

type PhonoBadgeProps = {
  children: ReactNode;
  variant?: "tag";
  className?: string;
};

export function PhonoBadge({ children, variant = "tag", className }: PhonoBadgeProps) {
  void variant;

  return <small className={className}>→ {children}</small>;
}

type ProjectCardProps = {
  title: string;
  description: string;
  href: string;
  tags: string[];
  number?: string;
  client?: string;
  palette?: string;
  image?: ReactNode;
  className?: string;
  // Opt-in layout for the /projects listing (Figma 1:1944): square visual on
  // top, tag row directly beneath it, then client name + copy + "more". The
  // default (undefined) keeps the horizontal home-page card untouched.
  variant?: "list";
};

export function ProjectCard({
  title,
  description,
  href,
  tags,
  number,
  client,
  palette,
  image,
  className,
  variant
}: ProjectCardProps) {
  const visual = image ?? (number ? <VisualTile label={number} palette={palette} /> : null);
  const tagRow = (
    <div className="tag-row">
      {tags.map((tag) => (
        <PhonoBadge key={tag}>{tag}</PhonoBadge>
      ))}
    </div>
  );

  if (variant === "list") {
    return (
      <article className={cn("project-list-card", "project-list-card-figma", className)}>
        {visual}
        {tagRow}
        <div className="project-list-card-body">
          {client ? <p className="project-list-card-client">{client}</p> : null}
          <span>{description}</span>
          <Link href={href}>→ more</Link>
        </div>
      </article>
    );
  }

  return (
    <article className={cn("project-list-card", className)}>
      {visual}
      <div>
        {number ? <p>{number}</p> : null}
        {client ? <h3>{client}</h3> : null}
        <strong>{title}</strong>
        <span>{description}</span>
        {tagRow}
        <Link href={href}>more ↗</Link>
      </div>
    </article>
  );
}

/* The Figma TOP frame (1:2) is captured with the menu *open* — 1:308 is the
   nav "modal" and 1:252 is the gradient wave it rides on. The shipped default
   is therefore the closed state: only the 21x21 dot glyph (1:87) sits at
   (1389, 26), and pressing it flows the wave curtain down before the columns
   settle underneath it. */

function MenuGlyph() {
  return (
    <>
      {/* Closed — Figma 1:87: nine 3px squares on a 9px pitch, 21x21 total. */}
      {/* 1:87 — the nine 3px squares on a 9px pitch, as exported. */}
      <span className="menu-glyph menu-glyph-dots" aria-hidden>
        <FigmaAsset src={figmaAssets.menuDots} className="menu-dots-asset" sizes="21px" />
      </span>
      {/* Open — the white cross inside a hairline ring, concentric with the
          dot grid at (1399.5, 36.5). */}
      <span className="menu-glyph menu-glyph-close" aria-hidden>
        <svg viewBox="0 0 32 32" fill="none" focusable="false">
          <circle cx="16" cy="16" r="15.1" stroke="currentColor" strokeWidth="1.4" />
          <path d="M11.4 11.4 20.6 20.6M20.6 11.4 11.4 20.6" stroke="currentColor" strokeWidth="2.4" />
        </svg>
      </span>
    </>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const navigationId = "site-navigation";
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    // Captured for the cleanup: both nodes outlive the open state.
    const panel = panelRef.current;
    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panel) {
        return;
      }

      // The panel covers the page while it is open, so keep Tab inside it.
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled]):not([tabindex='-1'])")
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    panel?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      toggle?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={cn("site-header", open && "site-header-open")}>
      <div className="site-header-bar">
        <LogoMark muted={!open} />
        <button
          ref={toggleRef}
          type="button"
          className="menu-button"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls={navigationId}
          onClick={() => setOpen((value) => !value)}
        >
          <MenuGlyph />
        </button>
      </div>

      {/* Redundant click-away target. Escape and the close mark are the real
          affordances, so this stays out of the tab order and the a11y tree. */}
      <div aria-hidden className="nav-scrim" onClick={close} />

      <div id={navigationId} ref={panelRef} className="nav-overlay" inert={!open}>
        {/* Figma 1:252 is a single 1440x615 wave. Three offset copies of it give
            the crest something to break against as it drops, so the reveal
            reads as water rather than a sliding panel. */}
        <div className="nav-curtain" aria-hidden>
          <span className="nav-curtain-layer nav-curtain-layer-a">
            <span className="nav-curtain-wave" />
          </span>
          <span className="nav-curtain-layer nav-curtain-layer-b">
            <span className="nav-curtain-wave" />
          </span>
          <span className="nav-curtain-layer nav-curtain-layer-c">
            <span className="nav-curtain-wave" />
          </span>
        </div>

        <nav className="figma-top-nav" aria-label="グローバルナビゲーション">
          {navItems.slice(0, 6).map((item) => (
            /* The child labels are real destinations (Figma draws them as text,
               but `/services/subsidy` is only reachable through one of them), so
               the item can no longer be a single anchor wrapping them. */
            <div key={item.href} className="figma-nav-item">
              <Link href={item.href} className="figma-nav-item-head" onClick={close}>
                <strong>{item.label}</strong>
                <span>{item.sublabel}</span>
              </Link>
              {item.children ? (
                <small>
                  {item.children.map((child) => (
                    <Link key={child.label} href={child.href} className="figma-nav-child" onClick={close}>
                      {child.label}
                    </Link>
                  ))}
                </small>
              ) : null}
            </div>
          ))}
          <ContactCircle className="figma-nav-contact" />
          {/* Figma 1:315 — the two social marks under the Contact circle. */}
          {/* 1:315 — one 103.88x40 export; each link shows its half of it. */}
          <div className="figma-social">
            <Link href="https://www.instagram.com/" aria-label="Instagram" onClick={close} />
            <Link href="https://www.facebook.com/" aria-label="Facebook" onClick={close} />
          </div>
          {/* Figma 1:363 — privacy link under the social marks. */}
          <Link href="/contact" className="figma-nav-privacy" onClick={close}>
            プライバシーポリシー
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function MemberCarousel() {
  const [start, setStart] = useState(0);
  const visibleMembers = useMemo(
    () => Array.from({ length: 4 }, (_, index) => members[(start + index) % members.length]),
    [start]
  );

  return (
    <div className="member-carousel">
      <div className="carousel-controls">
        <button type="button" aria-label="前のメンバー" onClick={() => setStart((value) => (value - 1 + members.length) % members.length)}>
          <FigmaAsset src={figmaAssets.pagerChevron} className="pager-chevron pager-chevron-prev" sizes="18px" />
        </button>
        <button type="button" aria-label="次のメンバー" onClick={() => setStart((value) => (value + 1) % members.length)}>
          <FigmaAsset src={figmaAssets.pagerChevron} className="pager-chevron" sizes="18px" />
        </button>
      </div>
      <div className="member-track">
        {visibleMembers.map((member, index) => (
          <article key={`${member.name}-${start}-${index}`} className="member-card">
            <FigmaAsset
              src={figmaAssets.top.memberVisuals[(start + index) % figmaAssets.top.memberVisuals.length]}
              alt=""
              className="member-portrait"
              sizes="(max-width: 720px) 70vw, 286px"
            />
            <h3>{member.name}</h3>
            <p>{member.quote}</p>
            <small>{member.role}</small>
            <strong>{member.jp}</strong>
          </article>
        ))}
      </div>
    </div>
  );
}

const categories = ["All", "事業開発", "サービス開発", "ブランディング", "プロモーション・PR", "資金調達サポート"] as const;
const contactTargets = [
  { value: "company", label: "企業の方" },
  { value: "recruit", label: "採用について" }
] as const satisfies PhonoTabItem<"company" | "recruit">[];
const contactFields = [
  { name: "company", label: "会社名・店舗名・屋号＊", required: true },
  { name: "name", label: "お名前＊", required: true },
  { name: "role", label: "役職" },
  { name: "department", label: "部署名" },
  { name: "phone", label: "電話番号＊", required: true, inputMode: "tel" as const },
  { name: "email", label: "メールアドレス＊", required: true, type: "email" },
  { name: "emailConfirm", label: "メールアドレス確認＊", helper: "※確認のためもう一度ご入力ください。", required: true, type: "email" }
] as const;
const contactCategories = [
  "事業開発",
  "サービス開発",
  "商品開発",
  "ブランディング（ロゴ、名刺、パンフレット、Webサイト、店舗·内装設計など）",
  "プロモーション（動画）",
  "補助金·助成金の活用",
  "その他"
] as const;
const projectsPageSize = 15;
const projectsPageCount = 7;

export function ProjectBrowser() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [page, setPage] = useState(0);
  const filtered = category === "All" ? projects : projects.filter((project) => project.tags.includes(category) || project.category === category);
  const figmaAllPattern = [projects[0], projects[1], projects[0]];
  const pageProjects = Array.from({ length: projectsPageSize }, (_, slotIndex) => {
    if (category === "All") {
      return figmaAllPattern[slotIndex % figmaAllPattern.length];
    }

    const filteredIndex = (page * projectsPageSize + slotIndex) % filtered.length;
    return filtered[filteredIndex];
  });

  function selectCategory(nextCategory: (typeof categories)[number]) {
    setCategory(nextCategory);
    setPage(0);
  }

  return (
    <section className="project-browser">
      <PhonoTabs
        tabs={categories.map((item) => ({ value: item, label: item }))}
        activeTab={category}
        onChange={selectCategory}
        ariaLabel="実績カテゴリ"
        className="filter-row"
      />
      <div className="project-grid">
        {pageProjects.map((project: Project, slotIndex) => {
          const thumbnailIndex = (page * projectsPageSize + slotIndex) % figmaAssets.projects.thumbnails.length;

          return (
            <ProjectCard
              key={`${project.slug}-${page}-${slotIndex}`}
              variant="list"
              title={project.title}
              description={project.summary}
              href={`/projects/${project.slug}`}
              tags={project.tags}
              number={project.number}
              client={project.client}
              palette={project.palette}
              image={
                <Link href={`/projects/${project.slug}`} className="project-card-asset-link">
                  <FigmaAsset
                    src={figmaAssets.projects.thumbnails[thumbnailIndex]}
                    alt=""
                    className="project-card-asset"
                    sizes="(max-width: 720px) 100vw, 33vw"
                  />
                </Link>
              }
            />
          );
        })}
      </div>
      <nav className="pagination" aria-label="実績ページ送り">
        <button type="button" disabled={page === 0} onClick={() => setPage((value) => Math.max(0, value - 1))}>
          prev
        </button>
        <ol className="pagination-pages" aria-label={`${projectsPageCount}ページ中${page + 1}ページ目`}>
          {Array.from({ length: projectsPageCount }, (_, index) => (
            <li key={index}>
              <button
                type="button"
                aria-current={index === page ? "page" : undefined}
                className={index === page ? "pagination-page-active" : undefined}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "1" : String.fromCharCode(0xff11 + index)}
              </button>
            </li>
          ))}
          <li className="pagination-ellipsis" aria-hidden>・・・</li>
        </ol>
        <button type="button" disabled={page >= projectsPageCount - 1} onClick={() => setPage((value) => Math.min(projectsPageCount - 1, value + 1))}>
          next
        </button>
      </nav>
    </section>
  );
}

export function ContactForm() {
  const [target, setTarget] = useState<"company" | "recruit">("company");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <PhonoTabs
        tabs={contactTargets}
        activeTab={target}
        onChange={setTarget}
        ariaLabel="お問い合わせ種別"
        className="contact-tabs"
      />
      <input type="hidden" name="target" value={target} />
      <div className="form-grid">
        {contactFields.map((field) => (
          <PhonoInput key={field.name} {...field} />
        ))}
      </div>
      <fieldset>
        <legend>お問い合わせ内容＊ <small>※複数選択可</small></legend>
        <div className="checkbox-grid">
          {contactCategories.map((item) => (
            <PhonoCheckbox key={item} name="category" value={item}>
              {item}
            </PhonoCheckbox>
          ))}
        </div>
      </fieldset>
      <PhonoInput name="site" type="url" label="サイトURL" />
      <PhonoInput required multiline name="message" rows={8} label="お問い合わせ詳細＊" className="wide-field" />
      <PhonoButton type="submit">
        入力内容を確認する
        <FigmaAsset src={figmaAssets.submitChevron} className="submit-chevron" sizes="9px" />
      </PhonoButton>
      {submitted ? (
        <p className="form-complete" role="status">
          <Check size={20} /> 入力内容を確認しました。実送信は環境変数設定後に有効化してください。
        </p>
      ) : null}
    </form>
  );
}

/**
 * Figma 1:1494 / 1:1503 draw a prev/next pair beside each "ご提案できる…" title
 * and cut the third card off at the frame edge. On a live page that card has to
 * be reachable, so the arrows page the row instead of decorating it.
 */
export function SubsidyDetailCarousel({
  label,
  children,
  className
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const [page, setPage] = useState(0);
  const lastPage = 1;

  return (
    <div className={cn("subsidy-carousel", className)} data-page={page}>
      <button
        type="button"
        className="subsidy-detail-arrow subsidy-detail-arrow-prev"
        onClick={() => setPage((value) => Math.max(0, value - 1))}
        disabled={page === 0}
        aria-label={`${label}を前に戻す`}
      />
      <button
        type="button"
        className="subsidy-detail-arrow subsidy-detail-arrow-next"
        onClick={() => setPage((value) => Math.min(lastPage, value + 1))}
        disabled={page === lastPage}
        aria-label={`${label}を次に送る`}
      />
      {children}
    </div>
  );
}
