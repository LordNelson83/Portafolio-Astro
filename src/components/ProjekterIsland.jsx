import { useEffect, useRef, useState } from "react";




const AHR_IMGS = ["/images/ahr_1.webp", "/images/ahr_2.webp", "/images/ahr_3.webp"];
const OAK_IMGS = ["/images/oak_1.webp", "/images/oak_2.webp", "/images/oak_3.webp", "/images/oak_4.webp", "/images/oak_5.webp"];

const PROJECT_IMAGES  = ["/images/oak.webp", "/images/solenia.webp", "/images/magasin.webp"];
const PROJECT_COLORS  = ["#90a590", "#ffa205", "#ffa205"];
const PROJECT_IDS     = ["oak", "ehandel", "magasin"];
const PROJECT_LINKS   = [
  [{ url: "/OAK-UX.pdf", external: false }, { url: "/OAK-UI.pdf", external: false }, { url: "/projekter/oak-case", external: false, internal: true }],
  [{ url: "https://solenia.netlify.app/", external: true }, { url: "https://github.com/LordNelson83/Nelson_Portfolio", external: true }],
  [{ url: "/Magasin.pdf", external: false }],
];
const PROJECT_SKILLS  = [
  ["Figma", "UX Research", "Lo-Fi", "HiFi", "Maze", "Personas"],
  ["React", "JavaScript", "HTML", "CSS", "GitHub", "API", "Figma"],
  ["Photoshop", "Illustrator", "InDesign", "Typografi", "Layout"],
];

const AHR_ACCENT = "#00a6b4";

export default function ProjekterIsland({ pk, lang }) {

  const heroRef  = useRef(null);
  const statsRef = useRef([]);
  const projRefs = useRef([]);
  const ahrRef   = useRef(null);

  const [activeScreen,    setActiveScreen]    = useState(0);
  const [activeAhrScreen, setActiveAhrScreen] = useState(0);
  const [isPaused,        setIsPaused]        = useState(false);
  const [isAhrPaused,     setIsAhrPaused]     = useState(false);

  const ahrScreens = pk.ahrScreens || [];
  const oakScreens = pk.oakScreens || [];
  const lbl        = pk.labels     || {};
  const ahr        = pk.ahr        || {};
  const oak        = pk.oak        || {};

  useEffect(() => {
    // rootMargin negativo activa la animaciÃ³n antes de que la secciÃ³n llegue
    // al borde inferior de la pantalla, asÃ­ un scroll rÃ¡pido no la deja a
    // medio camino con opacity: 0 (efecto "pantalla en negro").
    const obs = new IntersectionObserver(
      (e) => e.forEach(en => en.isIntersecting && en.target.classList.add("is-visible")),
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );
    const targets = [heroRef.current, ahrRef.current, ...statsRef.current, ...projRefs.current].filter(Boolean);
    targets.forEach(el => obs.observe(el));
    const fallback = setTimeout(() => targets.forEach(el => el.classList.add("is-visible")), 1200);
    return () => { obs.disconnect(); clearTimeout(fallback); };
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => setActiveScreen(i => (i + 1) % OAK_IMGS.length), 3800);
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    if (isAhrPaused) return;
    const timer = setInterval(() => setActiveAhrScreen(i => (i + 1) % AHR_IMGS.length), 4200);
    return () => clearInterval(timer);
  }, [isAhrPaused]);

  return (
    <main id="main-content" className="pk-page" aria-label="Projekt">

      <div className="pk-grain"   aria-hidden="true" />
      <div className="pk-bg-word" aria-hidden="true">Projekt</div>

      <header className="pk-hero" ref={heroRef}>
        <p className="pk-hero__eyebrow" aria-hidden="true">{pk.eyebrow}</p>
        <h1 className="pk-hero__h1"><span>{pk.h1}</span></h1>
        <p className="pk-hero__sub">{pk.sub}</p>
        <div className="pk-hero__line" aria-hidden="true" />
      </header>

      <div className="pk-stats" role="list" aria-label={pk.statsLabel}>
        {pk.stats.map((s, i) => (
          <div key={s.value} className="pk-stat" role="listitem"
            ref={el => statsRef.current[i] = el}
            style={{ "--delay": `${i * 0.1}s` }}>
            <span className="pk-stat__value" aria-hidden="true">{s.value}</span>
            <span className="pk-stat__label">{s.label}: {s.value}</span>
          </div>
        ))}
      </div>

      <div className="pk-projects">

        {/* 01 AHR-Motor */}
        <section className="pk-project pk-project--ahr" ref={ahrRef}
          style={{ "--accent": AHR_ACCENT }}
          aria-label="Projekt 01 â€” ByrÃ¥analys, Fortnox och Chas Academy">

          <div className="pk-project__header">
            <span className="pk-project__num" aria-hidden="true">01</span>
            <div className="pk-project__meta">
              <p className="pk-project__school">Fortnox · Chas Academy</p>
              <h2 className="pk-project__title">ByrÃ¥analys</h2>
              <div className="pk-project__row">
                <span className="pk-project__period">2025â€“2026</span>
                <span className="pk-project__tag pk-project__tag--wip">
                  <span aria-hidden="true">âš™</span> {pk.ahrWip}
                </span>
              </div>
            </div>
            <div className="pk-project__divider" aria-hidden="true" />
          </div>

          <p className="pk-project__lead">{pk.ahrLead}</p>

          <div className="pk-project__body pk-project__body--ahr">

            <div className="pk-gallery" aria-label={pk.galleryAhr}
              onMouseEnter={() => setIsAhrPaused(true)}
              onMouseLeave={() => setIsAhrPaused(false)}>
              <div className="pk-gallery__main" aria-live="polite" aria-atomic="true">
                {AHR_IMGS.map((src, i) => (
                  <div key={i}
                    className={`pk-gallery__slide${i === activeAhrScreen ? " pk-gallery__slide--active" : ""}`}
                    aria-hidden={i !== activeAhrScreen}>
                    <img src={src} alt={ahrScreens[i]?.alt || ""} className="pk-gallery__img" />
                    <div className="pk-gallery__caption" aria-hidden="true">{ahrScreens[i]?.label}</div>
                  </div>
                ))}
                <span className="pk-gallery__counter" aria-hidden="true">
                  {String(activeAhrScreen + 1).padStart(2, "0")} / {String(AHR_IMGS.length).padStart(2, "0")}
                </span>
                <button className="pk-gallery__nav pk-gallery__nav--prev"
                  onClick={() => setActiveAhrScreen(i => (i - 1 + AHR_IMGS.length) % AHR_IMGS.length)}
                  aria-label={pk.galleryPrev}><span aria-hidden="true">‹</span></button>
                <button className="pk-gallery__nav pk-gallery__nav--next"
                  onClick={() => setActiveAhrScreen(i => (i + 1) % AHR_IMGS.length)}
                  aria-label={pk.galleryNext}><span aria-hidden="true">›</span></button>
              </div>
              <div className="pk-gallery__dots" role="tablist" aria-label={pk.gallerySelect}>
                {AHR_IMGS.map((_, i) => (
                  <button key={i} role="tab"
                    className={`pk-gallery__dot${i === activeAhrScreen ? " pk-gallery__dot--active" : ""}`}
                    onClick={() => setActiveAhrScreen(i)}
                    aria-label={`${i + 1}: ${ahrScreens[i]?.alt || ""}`}
                    aria-selected={i === activeAhrScreen} />
                ))}
              </div>
            </div>

            <div className="pk-project__content">
              <div className="pk-ahr-block">
                <p className="pk-ahr-block__label">{lbl.utmaning}</p>
                <p className="pk-ahr-block__text">{ahr.utmaning}</p>
              </div>
              <div className="pk-ahr-block">
                <p className="pk-ahr-block__label">{lbl.metod}</p>
                <p className="pk-ahr-block__text">{ahr.metod}</p>
              </div>
              <div className="pk-ahr-block">
                <p className="pk-ahr-block__label">{lbl.objective}</p>
                <p className="pk-ahr-block__text">{ahr.objective}</p>
              </div>
              <div className="pk-ahr-block">
                <p className="pk-ahr-block__label">{lbl.bakgrund}</p>
                <p className="pk-ahr-block__text">{ahr.bakgrund}</p>
              </div>
              <div className="pk-ahr-block">
                <p className="pk-ahr-block__label">{lbl.forslag}</p>
                <p className="pk-ahr-block__text">{ahr.forslag}</p>
              </div>
              <div className="pk-ahr-block">
                <p className="pk-ahr-block__label">{lbl.resultat}</p>
                <p className="pk-ahr-block__text">{ahr.resultat}</p>
              </div>

              <div className="pk-skills" role="list" aria-label={pk.skillsLabel}>
                {(["UX Research", "POM", "OST", "Figma", "Teresa Torres", "Marty Cagan", "Fortnox"]).map(sk => (
                  <span key={sk} className="pk-skill" role="listitem">{sk}</span>
                ))}
              </div>

              <div className="pk-links">
                <a href="https://www.fortnox.se" target="_blank" rel="noopener noreferrer"
                  className="pk-link" aria-label="Fortnox">
                  <span className="pk-link__label">Fortnox</span>
                  <span className="pk-link__icon" aria-hidden="true">â†—</span>
                  <div className="pk-link__bar" aria-hidden="true" />
                </a>
                  <a href={"/" + lang + "/projekter/byraanalys"} className="pk-link">
                  <span className="pk-link__label">{pk.ahrCaseLink}</span>
                  <span className="pk-link__icon" aria-hidden="true">↗</span>
                  <div className="pk-link__bar" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 02-04 OAK, Solenia, Magasin */}
        {pk.projects.map((proj, pi) => {
          const id    = PROJECT_IDS[pi];
          const color = PROJECT_COLORS[pi];
          const image = PROJECT_IMAGES[pi];
          const links = PROJECT_LINKS[pi];
          const num   = String(pi + 2).padStart(2, "0");

          return (
            <section key={id} className="pk-project"
              ref={el => projRefs.current[pi] = el}
              style={{ "--accent": color }}
              aria-label={`Projekt ${num} â€” ${proj.title}`}>

              <div className="pk-project__header">
                <span className="pk-project__num" aria-hidden="true">{num}</span>
                <div className="pk-project__meta">
                  <p className="pk-project__school">{proj.school}</p>
                  <h2 className="pk-project__title">{proj.title}</h2>
                  <div className="pk-project__row">
                    <span className="pk-project__period">{proj.year}</span>
                    <span className="pk-project__tag">{proj.tag}</span>
                  </div>
                </div>
                <div className="pk-project__divider" aria-hidden="true" />
              </div>

              <p className="pk-project__lead">{proj.lead}</p>

              <div className={`pk-project__body${id === "oak" ? " pk-project__body--oak" : ""}`}>

                {id === "oak" ? (
                  <div className="pk-gallery" aria-label={pk.galleryOak}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}>
                    <div className="pk-gallery__main" aria-live="polite" aria-atomic="true">
                      {OAK_IMGS.map((src, i) => (
                        <div key={i}
                          className={`pk-gallery__slide${i === activeScreen ? " pk-gallery__slide--active" : ""}`}
                          aria-hidden={i !== activeScreen}>
                          <img src={src} alt={oakScreens[i]?.alt || ""} className="pk-gallery__img" />
                          <div className="pk-gallery__caption" aria-hidden="true">{oakScreens[i]?.label}</div>
                        </div>
                      ))}
                      <span className="pk-gallery__counter" aria-hidden="true">
                        {String(activeScreen + 1).padStart(2, "0")} / {String(OAK_IMGS.length).padStart(2, "0")}
                      </span>
                      <button className="pk-gallery__nav pk-gallery__nav--prev"
                        onClick={() => setActiveScreen(i => (i - 1 + OAK_IMGS.length) % OAK_IMGS.length)}
                        aria-label={pk.galleryPrev}><span aria-hidden="true">‹</span></button>
                      <button className="pk-gallery__nav pk-gallery__nav--next"
                        onClick={() => setActiveScreen(i => (i + 1) % OAK_IMGS.length)}
                        aria-label={pk.galleryNext}><span aria-hidden="true">›</span></button>
                    </div>
                    <div className="pk-gallery__dots" role="tablist" aria-label={pk.gallerySelect}>
                      {OAK_IMGS.map((_, i) => (
                        <button key={i} role="tab"
                          className={`pk-gallery__dot${i === activeScreen ? " pk-gallery__dot--active" : ""}`}
                          onClick={() => setActiveScreen(i)}
                          aria-label={`${i + 1}: ${oakScreens[i]?.alt || ""}`}
                          aria-selected={i === activeScreen} />
                      ))}
                    </div>
                  </div>
                ) : image ? (
                  <div className="pk-visual">
                    <div className="pk-visual__img-wrap">
                      <img src={image} alt={proj.title} className="pk-visual__img" />
                      <div className="pk-visual__overlay" aria-hidden="true">
                        <span className="pk-visual__overlay-tag">{proj.tag}</span>
                        <span className="pk-visual__overlay-year">{proj.year}</span>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="pk-project__content">
                  <p className="pk-project__desc">{proj.description}</p>

                  {id === "oak" && (
                    <>
                      <div className="pk-ahr-block">
                        <p className="pk-ahr-block__label">{lbl.utmaning}</p>
                        <p className="pk-ahr-block__text">{oak.utmaning}</p>
                      </div>
                      <div className="pk-ahr-block">
                        <p className="pk-ahr-block__label">{lbl.metod}</p>
                        <p className="pk-ahr-block__text">{oak.metod}</p>
                      </div>
                    </>
                  )}

                  {proj.uxRole && (
                    <div className="pk-roles">
                      <div className="pk-role">
                        <p className="pk-role__title">{proj.uxRoleTitle}</p>
                        <ul className="pk-role__list">
                          {proj.uxRole.map(r => <li key={r}>{r}</li>)}
                        </ul>
                      </div>
                      <div className="pk-role">
                        <p className="pk-role__title">{proj.uiRoleTitle}</p>
                        <ul className="pk-role__list">
                          {proj.uiRole.map(r => <li key={r}>{r}</li>)}
                        </ul>
                      </div>
                    </div>
                  )}

                  {proj.results && (
                    <div className="pk-results">
                      <p className="pk-results__title">{proj.resultsTitle}</p>
                      <div className="pk-results__grid" role="list">
                        {proj.results.map(r => (
                          <div key={r.score} className="pk-result" role="listitem">
                            <span className="pk-result__score" aria-hidden="true">{r.score}</span>
                            <span className="pk-result__text">{r.score} â€” {r.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {id === "oak" && (
                    <div className="pk-ahr-block">
                      <p className="pk-ahr-block__label">{lbl.resultat}</p>
                      <p className="pk-ahr-block__text">{oak.resultat}</p>
                    </div>
                  )}

                  <div className="pk-skills" role="list" aria-label={pk.skillsLabel}>
                    {PROJECT_SKILLS[pi].map(sk => (
                      <span key={sk} className="pk-skill" role="listitem">{sk}</span>
                    ))}
                  </div>

                  {proj.links && (
                    <div className="pk-links">
                      {proj.links.map((lnk, li) => {
                        const lnkData = links[li];
                        if (lnkData?.internal) {
                          return (
                            <a key={li} href={"/" + lang + "/" + (lnkData?.url || "")} className="pk-link" aria-label={lnk.label}>
                              <span className="pk-link__label">{lnk.label}</span>
                              <span className="pk-link__icon" aria-hidden="true">{lnk.icon}</span>
                              <div className="pk-link__bar" aria-hidden="true" />
                            </a>
                          );
                        }
                        return (
                          <a key={li} href={lnkData?.url || "#"}
                            target={lnkData?.external ? "_blank" : undefined}
                            rel={lnkData?.external ? "noopener noreferrer" : undefined}
                            className="pk-link"
                            aria-label={lnk.label}>
                            <span className="pk-link__label">{lnk.label}</span>
                            <span className="pk-link__icon" aria-hidden="true">{lnk.icon}</span>
                            <div className="pk-link__bar" aria-hidden="true" />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <footer className="pk-cta" aria-label="Kontakt">
        <div className="pk-cta__left">
          <p className="pk-cta__eyebrow" aria-hidden="true">{pk.ctaEyebrow}</p>
          <h2 className="pk-cta__title">{pk.ctaTitle} <em>{pk.ctaEm}</em></h2>
        </div>
        <a href={"/" + lang + "/kontakta"} className="pk-cta__btn">{pk.ctaBtn}</a>
      </footer>

    </main>
  );
}




