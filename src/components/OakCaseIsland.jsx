import { useEffect, useRef, useState } from "react";
import Lightbox from "./Lightbox";

const LB_LABELS = {
  sv: { close: "Stang", prev: "Foregaende bild", next: "Nasta bild", view: "Visa bild i storre format" },
  en: { close: "Close", prev: "Previous image", next: "Next image", view: "View enlarged image" },
  es: { close: "Cerrar", prev: "Imagen anterior", next: "Imagen siguiente", view: "Ver imagen ampliada" },
};


const IMGS = ["/images/oak_1.webp", "/images/oak_2.webp", "/images/oak_3.webp", "/images/oak_4.webp", "/images/oak_5.webp"];

export default function OakCaseIsland({ oakData, lang }) {
  const heroRef  = useRef(null);
  const sectRefs = useRef([]);
  const [activeScreen, setActiveScreen] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const lbLabels = LB_LABELS[lang] || LB_LABELS.sv;
  const [isPaused, setIsPaused]         = useState(false);

  useEffect(() => {
    // rootMargin negativo activa la animación antes de que la sección llegue
    // al borde inferior de la pantalla, así un scroll rápido no la deja a
    // medio camino con opacity: 0 (efecto "pantalla en negro").
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("oc-visible")),
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );
    const targets = [heroRef.current, ...sectRefs.current].filter(Boolean);
    targets.forEach(el => obs.observe(el));
    const fallback = setTimeout(() => targets.forEach(el => el.classList.add("oc-visible")), 1200);
    return () => { obs.disconnect(); clearTimeout(fallback); };
  }, []);

  useEffect(() => {
    if (isPaused || lightboxOpen) return;
    const timer = setInterval(() => setActiveScreen(i => (i + 1) % IMGS.length), 3800);
    return () => clearInterval(timer);
  }, [isPaused, lightboxOpen]);

  const addRef = (el, i) => { sectRefs.current[i] = el; };

  const meta         = oakData.meta;
  const screens      = oakData.screens;
  const briefItems   = oakData.briefItems;
  const processSteps = oakData.processSteps;
  const needs        = oakData.needs;
  const quotes       = oakData.quotes;
  const personas     = oakData.personas;
  const designSystem = oakData.designSystem;
  const iterations   = oakData.iterations;
  const resultStats  = oakData.resultStats;
  const a11yPoints   = oakData.a11yPoints;
  const skills       = oakData.skills;

  return (
    <div className="oc-page">
      <div className="oc-grain" aria-hidden="true" />

      {/* â”€â”€ NAV â”€â”€ */}
      <nav className="oc-nav" aria-label="Sidnavigation">
        <a href={"/" + lang + "/grafiskproduktion"} className="oc-back">
          <span className="oc-back__arrow" aria-hidden="true">←</span>
          <span>{oakData.back}</span>
        </a>
        <span className="oc-nav__tag">{oakData.navTag}</span>
      </nav>

      {/* â”€â”€ HERO â”€â”€ */}
      <header className="oc-hero" ref={heroRef}>
        <div className="oc-hero__eyebrow">
          <span>OAK Equipments</span>
          <span className="oc-hero__dot" aria-hidden="true" />
          <span>Chas Academy</span>
        </div>
        <h1 className="oc-hero__title">{oakData.heroTitle}</h1>
        <p className="oc-hero__lead">{oakData.heroLead}</p>

        <div className="oc-meta" role="list">
          {meta.map(m => (
            <div key={m.label} className="oc-meta__item" role="listitem">
              <span className="oc-meta__value">{m.value}</span>
              <span className="oc-meta__label">{m.label}</span>
            </div>
          ))}
        </div>

        <div className="oc-hero__line" aria-hidden="true" />
      </header>

      {/* â”€â”€ UTMANING â”€â”€ */}
      <section className="oc-section" ref={el => addRef(el, 0)} aria-label={oakData.challengeLabel}>
        <div className="oc-section__label">{oakData.challengeLabel}</div>
        <h2 className="oc-section__title">{oakData.challengeTitle}</h2>
        <div className="oc-section__body oc-section__body--2col">
          <div>
            <p className="oc-text">{oakData.challengeP1}</p>
            <p className="oc-text">{oakData.challengeP2}</p>
          </div>
          <div className="oc-brief-box">
            <p className="oc-brief-box__label">{oakData.briefLabel}</p>
            <div className="oc-brief-box__items">
              {briefItems.map((item, i) => (
                <div key={i} className="oc-brief-item">
                  <span className="oc-brief-item__icon" aria-hidden="true">â—‹</span>
                  <span><strong>{item.strong}</strong>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ PROCESS â”€â”€ */}
      <section className="oc-section" ref={el => addRef(el, 1)} aria-label={oakData.processLabel}>
        <div className="oc-section__label">{oakData.processLabel}</div>
        <h2 className="oc-section__title">{oakData.processTitle}</h2>
        <div className="oc-process" role="list">
          {processSteps.map((s, i) => (
            <div key={s.num} className="oc-process__step" role="listitem" style={{ "--i": i }}>
              <span className="oc-process__num" aria-hidden="true">{s.num}</span>
              <span className="oc-process__label">{s.label}</span>
              <span className="oc-process__detail">{s.detail}</span>
            </div>
          ))}
        </div>
      </section>

      {/* â”€â”€ INSIKTER â”€â”€ */}
      <section className="oc-section" ref={el => addRef(el, 2)} aria-label={oakData.insightsLabel}>
        <div className="oc-section__label">{oakData.insightsLabel}</div>
        <h2 className="oc-section__title">{oakData.insightsTitle}</h2>
        <p className="oc-text oc-text--intro">{oakData.insightsIntro}</p>

        <div className="oc-needs" role="list">
          {needs.map(n => (
            <div key={n.label} className="oc-need" role="listitem">
              <span className="oc-need__score">{n.score}</span>
              <p className="oc-need__label">{n.label}</p>
              <p className="oc-need__desc">{n.desc}</p>
            </div>
          ))}
        </div>

        <div className="oc-quotes" role="list">
          {quotes.map((q, i) => (
            <blockquote key={i} className="oc-quote" style={{ "--i": i }} role="listitem">
              <p className="oc-quote__type">{q.type}</p>
              <p className="oc-quote__text">"{q.quote}"</p>
              <footer className="oc-quote__footer">
                <span className="oc-quote__persona">— {q.persona}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="oc-insight-callout">
          <p className="oc-insight-callout__label">{oakData.calloutLabel}</p>
          <p className="oc-insight-callout__text">{oakData.calloutText}</p>
        </div>
      </section>

      {/* â”€â”€ BETEENDETYPER â”€â”€ */}
      <section className="oc-section" ref={el => addRef(el, 3)} aria-label={oakData.personasLabel}>
        <div className="oc-section__label">{oakData.personasLabel}</div>
        <h2 className="oc-section__title">{oakData.personasTitle}</h2>
        <div className="oc-personas">
          {personas.map(p => (
            <div key={p.name} className="oc-persona">
              <p className="oc-persona__name">{p.name}</p>
              <p className="oc-persona__tagline">{p.tagline}</p>
              <p className="oc-persona__desc">{p.desc}</p>
              <div className="oc-persona__need">{p.need}</div>
            </div>
          ))}
        </div>
      </section>

      {/* â”€â”€ DESIGN â”€â”€ */}
      <section className="oc-section" ref={el => addRef(el, 4)} aria-label={oakData.designLabel}>
        <div className="oc-section__label">{oakData.designLabel}</div>
        <h2 className="oc-section__title">{oakData.designTitle}</h2>

        <div className="oc-ds">
          <div className="oc-ds__colors" role="list" aria-label={oakData.designLabel}>
            {designSystem.map(c => (
              <div key={c.hex} className="oc-ds__color" role="listitem">
                <div
                  className="oc-ds__swatch"
                  style={{ background: c.hex }}
                  aria-label={`${c.label} ${c.name}, hex ${c.hex}`}
                />
                <span className="oc-ds__hex">{c.hex}</span>
                <span className="oc-ds__name">{c.name}</span>
              </div>
            ))}
          </div>
          <div className="oc-ds__typo">
            <p className="oc-ds__typo-label">Typografi</p>
            <p className="oc-ds__typo-name">{oakData.typoName}</p>
            <p className="oc-ds__typo-note">{oakData.typoNote}</p>
          </div>
        </div>

        <div
          className="oc-gallery"
          aria-label={oakData.galleryLabel}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setIsPaused(false); }}
        >
          <div className="oc-gallery__main" aria-live="polite" aria-atomic="true">
            {IMGS.map((img, i) => (
              <div
                key={i}
                className={`oc-gallery__slide${i === activeScreen ? " oc-gallery__slide--active" : ""}`}
                aria-hidden={i !== activeScreen}
              >
                <button type="button" className="pk-gallery__img-btn" tabIndex={i === activeScreen ? 0 : -1} onClick={() => setLightboxOpen(true)} aria-label={lbLabels.view}>
                  <img src={img} alt={screens[i]?.alt ?? ""} className="oc-gallery__img" loading="lazy" />
                </button>
                <p className="oc-gallery__caption" aria-hidden="true">{screens[i]?.label ?? ""}</p>
              </div>
            ))}
            <span className="oc-gallery__counter" aria-hidden="true">
              {String(activeScreen + 1).padStart(2, "0")} / {String(IMGS.length).padStart(2, "0")}
            </span>
            <button
              className="oc-gallery__nav oc-gallery__nav--prev"
              onClick={() => setActiveScreen(i => (i - 1 + IMGS.length) % IMGS.length)}
              aria-label={oakData.prevLabel}
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              className="oc-gallery__nav oc-gallery__nav--next"
              onClick={() => setActiveScreen(i => (i + 1) % IMGS.length)}
              aria-label={oakData.nextLabel}
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>
          <div className="oc-gallery__dots" role="tablist" aria-label={oakData.dotsLabel}>
            {IMGS.map((_, i) => (
              <button
                key={i}
                role="tab"
                className={`oc-gallery__dot${i === activeScreen ? " oc-gallery__dot--active" : ""}`}
                onClick={() => setActiveScreen(i)}
                aria-label={`${i + 1}: ${screens[i]?.label ?? ""}`}
                aria-selected={i === activeScreen}
              />
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ TEST & ITERATIONER â”€â”€ */}
      <section className="oc-section" ref={el => addRef(el, 5)} aria-label={oakData.testLabel}>
        <div className="oc-section__label">{oakData.testLabel}</div>
        <h2 className="oc-section__title">{oakData.testTitle}</h2>
        <p className="oc-text">
          {oakData.testP} <strong>{oakData.testStrong}</strong> {oakData.testP2}
        </p>

        <div className="oc-iterations" role="list">
          {iterations.map((it, i) => (
            <div key={i} className="oc-iteration" role="listitem" style={{ "--oak-accent": "#90a590" }}>
              <div className="oc-iteration__header">
                <span className="oc-iteration__score">{it.num}</span>
                <p className="oc-iteration__problem">{it.problem}</p>
              </div>
              <div className="oc-iteration__solution">
                <span className="oc-iteration__solution-label" aria-hidden="true">{oakData.actionLabel}</span>
                <p>{it.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* â”€â”€ RESULTAT â”€â”€ */}
      <section className="oc-section oc-section--result" ref={el => addRef(el, 6)} aria-label={oakData.resultLabel}>
        <div className="oc-section__label">{oakData.resultLabel}</div>
        <h2 className="oc-section__title">{oakData.resultTitle}</h2>
        <p className="oc-text">{oakData.resultP}</p>
        <div className="oc-result-stats" role="list">
          {resultStats.map(r => (
            <div key={r.label} className="oc-result-stat" role="listitem">
              <span className="oc-result-stat__value">{r.value}</span>
              <span className="oc-result-stat__label">{r.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* â”€â”€ ACCESSIBILITY â”€â”€ */}
      <section className="oc-section" ref={el => addRef(el, 7)} aria-label={oakData.a11yTitle}>
        <div className="oc-section__label">{oakData.a11yLabel}</div>
        <h2 className="oc-section__title">{oakData.a11yTitle}</h2>
        <ul className="oc-a11y-list" aria-label={oakData.a11yTitle}>
          {a11yPoints.map((point, i) => (
            <li key={i} className="oc-a11y-item">{point}</li>
          ))}
        </ul>
      </section>

      {/* â”€â”€ SKILLS â”€â”€ */}
      <section className="oc-section" ref={el => addRef(el, 8)} aria-label="Skills">
        <div className="oc-skills" role="list">
          {skills.map(sk => (
            <span key={sk} className="oc-skill" role="listitem">{sk}</span>
          ))}
        </div>
      </section>

      {/* â”€â”€ CTA â”€â”€ */}
      <footer className="oc-cta" aria-label="Kontakt">
        <p className="oc-cta__text">{oakData.ctaText}</p>
        <a href={"/" + lang + "/kontakta"} className="oc-cta__btn">{oakData.ctaBtn}</a>
      </footer>

      {lightboxOpen && (
        <Lightbox
          images={IMGS.map((src, i) => ({ src, alt: screens[i]?.alt || "" }))}
          index={activeScreen}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setActiveScreen(i => (i - 1 + IMGS.length) % IMGS.length)}
          onNext={() => setActiveScreen(i => (i + 1) % IMGS.length)}
          prevLabel={lbLabels.prev} nextLabel={lbLabels.next} closeLabel={lbLabels.close}
        />
      )}

    </div>
  );
}


