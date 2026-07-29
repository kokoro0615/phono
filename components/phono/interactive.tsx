"use client";

import { FormEvent, useMemo, useState } from "react";
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes
} from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Facebook,
  Instagram,
  X
} from "lucide-react";
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

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className={cn("site-header", open && "site-header-open")}>
      <div className="site-header-bar">
        <LogoMark muted={!open} />
        <button
          type="button"
          className="menu-button"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={26} /> : <span className="dot-menu" aria-hidden />}
        </button>
      </div>
      {open ? (
        <div className="nav-overlay">
          <nav className="nav-grid" aria-label="グローバルナビゲーション">
            {navItems.slice(0, 6).map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                <strong>{item.label}</strong>
                <span>{item.sublabel}</span>
                {item.children ? (
                  <small>{item.children.slice(0, 4).map((child) => `- ${child}`).join("  ")}</small>
                ) : null}
              </Link>
            ))}
            <ContactCircle />
          </nav>
          <div className="overlay-social">
            <Link href="https://www.instagram.com/" aria-label="Instagram">
              <Instagram />
            </Link>
            <Link href="https://www.facebook.com/" aria-label="Facebook">
              <Facebook />
            </Link>
          </div>
        </div>
      ) : null}
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
          <ArrowLeft />
        </button>
        <button type="button" aria-label="次のメンバー" onClick={() => setStart((value) => (value + 1) % members.length)}>
          <ArrowRight />
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
        入力内容を確認する <ArrowRight size={22} />
      </PhonoButton>
      {submitted ? (
        <p className="form-complete" role="status">
          <Check size={20} /> 入力内容を確認しました。実送信は環境変数設定後に有効化してください。
        </p>
      ) : null}
    </form>
  );
}
