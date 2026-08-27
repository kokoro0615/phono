import { Fragment } from "react";
import Link from "next/link";
import { FigmaAsset, SiteFooter } from "@/components/phono/shared";
import { figmaAssets } from "@/data/site";
import {
  benefitRows,
  careerBody,
  careerCards,
  careerLead,
  eligibilityItems,
  entryCta,
  faqQuestions,
  hospitalityRows,
  occupations,
  partnerPolicies,
  recruitmentFlow,
  recruitmentSections,
  scheduleBars,
  scheduleGridCount,
  scheduleMonths,
  scheduleYears,
  stanceBody,
  stanceLead,
  styleCards,
  styleNote,
  supportItems
} from "@/data/recruitment";

const recruit = figmaAssets.recruitment;
const sectionOf = (id: (typeof recruitmentSections)[number]["id"]) =>
  recruitmentSections.find((section) => section.id === id)!;

/** A two-layer multiplied blob with its Futura number, shared by 1:2906 / 1:3359. */
function NumberMark({ mark, value }: { mark: number; value: number }) {
  const layers = figmaAssets.numberMarks[mark - 1];
  return (
    <span className={`rc-mark rc-mark-${mark}`}>
      <FigmaAsset src={layers[0]} className="rc-mark-layer rc-mark-layer-a" sizes="142px" />
      <FigmaAsset src={layers[1]} className="rc-mark-layer rc-mark-layer-b" sizes="142px" />
      <span className="rc-mark-number tabular-nums" aria-hidden>
        {value}
      </span>
    </span>
  );
}

function Lines({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={line + index}>
          {index > 0 ? <br /> : null}
          {line}
        </Fragment>
      ))}
    </>
  );
}

export default function RecruitmentPage() {
  return (
    <main id="main-content" className="recruitment-page">
      {/* 1:2872 has no visible page title — the crest is the whole hero — so the
          document heading is exposed to assistive tech only. */}
      <h1 className="visually-hidden">Recruitment 採用情報</h1>

      <div className="rc-canvas">
        <FigmaAsset src={recruit.heroWave} className="rc-hero-wave" sizes="3509px" priority />
        <FigmaAsset src={recruit.occupationWave} className="rc-occupation-wave" sizes="1938px" />

        {/* ── Stance — 1:2882 ─────────────────────────────────────────────── */}
        <section className="rc-stance" aria-labelledby="rc-stance-title">
          <div className="rc-head rc-head-stance">
            <h2 id="rc-stance-title">{sectionOf("stance").title}</h2>
            <p>{sectionOf("stance").label}</p>
          </div>
          <FigmaAsset src={recruit.stanceRing} className="rc-stance-ring" sizes="657px" />
          <p className="rc-stance-lead">
            <Lines lines={stanceLead} />
          </p>
          <div className="rc-stance-body">
            {stanceBody.map((group) => (
              <p key={group[0]}>
                <Lines lines={group} />
              </p>
            ))}
          </div>
        </section>

        {/* ── Partner Policy — 1:2897 ─────────────────────────────────────── */}
        <section className="rc-partner" aria-labelledby="rc-partner-title">
          <div className="rc-head rc-head-partner">
            <h2 id="rc-partner-title">{sectionOf("partner").title}</h2>
            <p>{sectionOf("partner").label}</p>
          </div>
          <ol className="rc-partner-list">
            {partnerPolicies.map((policy, index) => (
              <li key={policy.title.join("")} className={`rc-partner-card rc-partner-card-${index + 1}`}>
                <NumberMark mark={policy.mark} value={index + 1} />
                <h3>
                  <Lines lines={policy.title} />
                </h3>
                <p>
                  <Lines lines={policy.body} />
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Schedule — 1:3032 ───────────────────────────────────────────── */}
        <section className="rc-schedule" aria-labelledby="rc-schedule-title">
          <div className="rc-head rc-head-schedule">
            <h2 id="rc-schedule-title">{sectionOf("schedule").title}</h2>
            <p>{sectionOf("schedule").label}</p>
          </div>
          <div className="rc-gantt">
            {scheduleYears.map((year, index) => (
              <span key={year.label} className={`rc-gantt-year rc-gantt-year-${index + 1} tabular-nums`}>
                {year.label}
              </span>
            ))}
            {scheduleMonths.map((month, index) => (
              <span key={month} className={`rc-gantt-month rc-gantt-month-${index + 1} tabular-nums`}>
                {month}
              </span>
            ))}
            {Array.from({ length: scheduleGridCount }, (_, index) => (
              <FigmaAsset
                key={index}
                src={recruit.scheduleGridline}
                className={`rc-gantt-rule rc-gantt-rule-${index + 1}`}
                sizes="2px"
              />
            ))}
            {scheduleBars.map((bar) => (
              <Fragment key={bar.key}>
                <FigmaAsset
                  src={recruit.scheduleBars[bar.key as keyof typeof recruit.scheduleBars]}
                  className={`rc-gantt-bar rc-gantt-bar-${bar.key}`}
                  sizes="720px"
                />
                <span className={`rc-gantt-label rc-gantt-label-${bar.key}`}>{bar.label}</span>
              </Fragment>
            ))}
          </div>
        </section>

        {/* ── Flow — 1:2998 ──────────────────────────────────────────────── */}
        <section className="rc-flow" aria-labelledby="rc-flow-title">
          <div className="rc-head rc-head-flow">
            <h2 id="rc-flow-title">{sectionOf("flow").title}</h2>
            <p>{sectionOf("flow").label}</p>
          </div>
          <FigmaAsset src={recruit.flowCircles} className="rc-flow-circles" sizes="1340px" />
          <ol className="rc-flow-list">
            {recruitmentFlow.map((step, index) => (
              <li key={step} className={`rc-flow-step rc-flow-step-${index + 1}`}>
                <span className="rc-flow-number tabular-nums" aria-hidden>
                  {index + 1}
                </span>
                <span className="rc-flow-label">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Eligibility — 1:3346 ───────────────────────────────────────── */}
        <section className="rc-eligibility" aria-labelledby="rc-eligibility-title">
          <div className="rc-head rc-head-eligibility">
            <h2 id="rc-eligibility-title">{sectionOf("eligibility").title}</h2>
            <p>{sectionOf("eligibility").label}</p>
          </div>
          <ol className="rc-eligibility-list">
            {eligibilityItems.map((item, index) => (
              <li key={item.title} className={`rc-eligibility-row rc-eligibility-row-${index + 1}`}>
                <NumberMark mark={item.mark} value={index + 1} />
                <h3>{item.title}</h3>
                <p>
                  <Lines lines={item.body} />
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Occupation — 1:3505 ────────────────────────────────────────── */}
        <section className="rc-occupation" aria-labelledby="rc-occupation-title">
          <div className="rc-head rc-head-occupation">
            <h2 id="rc-occupation-title">{sectionOf("occupation").title}</h2>
            <p>{sectionOf("occupation").label}</p>
          </div>
          <ul className="rc-occupation-list">
            {occupations.map((occupation, index) => (
              <li key={occupation} className={`rc-occupation-item rc-occupation-item-${index + 1}`}>
                <Link href="/contact">
                  <FigmaAsset src={recruit.occupationPill} className="rc-occupation-pill" sizes="561px" />
                  <FigmaAsset src={recruit.occupationChevron} className="rc-occupation-chevron" sizes="15px" />
                  <span className="rc-occupation-label">{occupation}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Hospitality — 1:3084 ───────────────────────────────────────── */}
        <section className="rc-hospitality" aria-labelledby="rc-hospitality-title">
          <div className="rc-head rc-head-hospitality">
            <h2 id="rc-hospitality-title">{sectionOf("hospitality").title}</h2>
            <p>{sectionOf("hospitality").label}</p>
          </div>
          <dl className="rc-rows">
            {hospitalityRows.map((row) => (
              <div key={row.term} className="rc-row">
                <dt>{row.term}</dt>
                <FigmaAsset src={recruit.rowBullet} className="rc-row-bullet" sizes="29px" />
                <dd>
                  <Lines lines={row.lines} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Style — 1:3296 / 1:3299 ────────────────────────────────────── */}
        <section className="rc-style" aria-labelledby="rc-style-title">
          <div className="rc-head rc-head-style">
            <h2 id="rc-style-title">{sectionOf("style").title}</h2>
            <p>{sectionOf("style").label}</p>
          </div>
          {styleCards.map((card, index) => (
            <article key={card.letter} className={`rc-style-card rc-style-card-${index + 1}`}>
              <FigmaAsset src={recruit.styleCircles[index]} className="rc-style-disc" sizes="537px" />
              <p className="rc-style-badge">
                <span>{card.badge}</span>
                <strong>{card.letter}</strong>
              </p>
              <h3 className="rc-style-title">
                <Lines lines={card.title} />
              </h3>
              <p className="rc-style-lead">
                <Lines lines={card.lead} />
              </p>
              <p className="rc-style-body">
                <Lines lines={card.body} />
              </p>
            </article>
          ))}
          <p className="rc-style-note">{styleNote}</p>
        </section>

        {/* ── Benefits — 1:3188 ──────────────────────────────────────────── */}
        <section className="rc-benefits" aria-labelledby="rc-benefits-title">
          <div className="rc-head rc-head-benefits">
            <h2 id="rc-benefits-title">{sectionOf("benefits").title}</h2>
            <p>{sectionOf("benefits").label}</p>
          </div>
          <dl className="rc-rows">
            {benefitRows.map((row) => (
              <div key={row.term} className="rc-row">
                <dt>{row.term}</dt>
                <FigmaAsset src={recruit.rowBullet} className="rc-row-bullet" sizes="29px" />
                <dd>
                  <Lines lines={row.lines} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Support — 1:3315 ───────────────────────────────────────────── */}
        <section className="rc-support" aria-labelledby="rc-support-title">
          <div className="rc-head rc-head-support">
            <h2 id="rc-support-title">{sectionOf("support").title}</h2>
            <p>{sectionOf("support").label}</p>
          </div>
          <ul className="rc-support-list">
            {supportItems.map((item, index) => (
              <li key={item.title.join("")} className={`rc-support-item rc-support-item-${index + 1}`}>
                <FigmaAsset src={recruit.supportCircles[index]} className="rc-support-disc" sizes="253px" />
                <h3>
                  <Lines lines={item.title} />
                </h3>
                <p>
                  <Lines lines={item.body} />
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── FAQ — 1:3410 ───────────────────────────────────────────────── */}
        <section className="rc-faq" aria-labelledby="rc-faq-title">
          <div className="rc-head rc-head-faq">
            <h2 id="rc-faq-title">{sectionOf("faq").title}</h2>
            <p>{sectionOf("faq").label}</p>
          </div>
          <ul className="rc-faq-list">
            {faqQuestions.map((question, index) => (
              <li key={question} className={`rc-faq-item rc-faq-item-${index + 1}`}>
                <FigmaAsset src={recruit.faqMark} className="rc-faq-mark" sizes="88px" />
                <span className="rc-faq-q" aria-hidden>
                  Q
                </span>
                <span className="rc-faq-text">{question}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Career up — 1:3474… + Entry 1:3502 ─────────────────────────── */}
        <section className="rc-career" aria-labelledby="rc-career-title">
          <div className="rc-head rc-head-career">
            <h2 id="rc-career-title">{sectionOf("career").title}</h2>
            <p>{sectionOf("career").label}</p>
          </div>
          <p className="rc-career-lead">
            <Lines lines={careerLead} />
          </p>
          <p className="rc-career-body">
            <Lines lines={careerBody} />
          </p>
          <ul className="rc-career-list">
            {careerCards.map((card, index) => (
              <li key={card.join("")} className={`rc-career-item rc-career-item-${index + 1}`}>
                <FigmaAsset src={recruit.careerCircles[index]} className="rc-career-disc" sizes="301px" />
                <h3>
                  <Lines lines={card} />
                </h3>
                <FigmaAsset src={recruit.careerChevron} className="rc-career-chevron" sizes="29px" />
              </li>
            ))}
          </ul>
          <Link href="/contact" className="rc-entry-button">
            <FigmaAsset src={recruit.entryButton} className="rc-entry-shape" sizes="346px" />
            <span className="rc-entry-label">{entryCta.label}</span>
          </Link>
          <p className="rc-entry-links">
            {entryCta.links.map((link) => (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            ))}
          </p>
        </section>
      </div>

      {/* 1:3558 — the crest that runs behind the footer, off the left edge. */}
      <div className="rc-footer-wrap">
        <FigmaAsset src={recruit.footerWave} className="rc-footer-wave" sizes="3026px" />
        <SiteFooter />
      </div>
    </main>
  );
}
