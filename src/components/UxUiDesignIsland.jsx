import { useEffect, useRef } from "react";

export default function UxUiDesignIsland({ ux, lang }) {

  const statsRef    = useRef([]);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.1 }
    );
    [...statsRef.current, ...sectionsRef.current].forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="profil-page">
      <div className="profil-grain"   aria-hidden="true" />
      <div className="profil-bg-word" aria-hidden="true">UX</div>

      {/* HERO */}
      <header className="profil-hero">
        <p className="profil-hero__eyebrow">{ux.eyebrow}</p>
        <h1 className="profil-hero__h1">
          <span>{ux.h1a}</span>
          <span><em>{ux.h1b}</em></span>
        </h1>
        <p className="profil-hero__sub">{ux.sub}</p>
        <div className="profil-hero__accent-line" aria-hidden="true" />
      </header>

      {/* STATS */}
      <div className="profil-stats" role="list">
        {ux.stats.map((s, i) => (
          <div
            key={s.value}
            className="profil-stat"
            role="listitem"
            ref={el => statsRef.current[i] = el}
            style={{ "--delay": `${i * 0.1}s` }}
          >
            <span className="profil-stat__value">{s.value}</span>
            <span className="profil-stat__label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* SECCIONES */}
      <div className="profil-sections">
        {ux.sections.map((sec, i) => (
          <article
            key={sec.num}
            className="profil-section"
            ref={el => sectionsRef.current[i] = el}
            style={{ "--delay": `${i * 0.15}s` }}
          >
            <div className="profil-section__left">
              <span className="profil-section__num">{sec.num}</span>
              <div className="profil-section__header">
                <p className="profil-section__eyebrow">{sec.eyebrow}</p>
                <div className="profil-section__title-group">
                  <p className="profil-section__institution">{sec.institution}</p>
                  <h2 className="profil-section__title">{sec.title}</h2>
                </div>
                <div className="profil-section__divider" aria-hidden="true" />
              </div>
            </div>
            <div className="profil-section__right">
              {sec.paragraphs.map((p, j) => (
                <p key={j} className={`profil-section__para${j === 0 ? " profil-section__para--lead" : ""}`}>
                  {p}
                </p>
              ))}
              <span className="profil-section__tag">{sec.tag}</span>
            </div>
          </article>
        ))}
      </div>

      {/* CTA */}
      <section className="profil-cta">
        <div className="profil-cta__left">
          <p className="profil-cta__eyebrow">{ux.ctaEyebrow}</p>
          <h2 className="profil-cta__title">
            {ux.ctaTitle} <em>{ux.ctaEm}</em>
          </h2>
        </div>
        <a href={"/" + lang + "/kontakta"} className="profil-cta__btn">{ux.ctaBtn}</a>
      </section>
    </div>
  );
}
