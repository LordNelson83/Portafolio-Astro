import React, { useEffect, useRef } from "react";
const SOLENIA_LABELS = {
  sv: "Se live på Solenia",
  en: "See Solenia live",
  es: "Ver Solenia en vivo",
};

const VIDEO_LABELS = {
  sv: { eyebrow: "OAK 3D Gymplanerare", title: "Fran Figma-prototyp till interaktivt flode", caption: "Skarminspelning av det interaktiva Hi-Fi-prototypet, byggt i Figma. Visar rumskonfiguration, produktkatalog och 3D-visualisering." },
  en: { eyebrow: "OAK 3D Gymplanerare", title: "From Figma prototype to interactive flow", caption: "Screen recording of the interactive Hi-Fi prototype, built in Figma. Shows room configuration, product catalog, and 3D visualization." },
  es: { eyebrow: "OAK 3D Gymplanerare", title: "De prototipo en Figma a flujo interactivo", caption: "Grabacion de pantalla del prototipo interactivo Hi-Fi, construido en Figma. Muestra la configuracion de sala, el catalogo de productos y la visualizacion 3D." },
};

export default function UxUiDesignIsland({ ux, lang }) {
  const videoLabels = VIDEO_LABELS[lang] || VIDEO_LABELS.sv;
  const soleniaLabel = SOLENIA_LABELS[lang] || SOLENIA_LABELS.sv;

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
          <React.Fragment key={sec.num}>
            <article
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
                {i === 1 && (
                  <a href={"/" + lang + "/grafiskproduktion#ehandel"} className="profil-section__link">
                    {soleniaLabel} →
                  </a>
                )}
              </div>
            </article>

            {i === 0 && (
              <section className="profil-video" aria-label={videoLabels.title}>
                <p className="profil-video__eyebrow">{videoLabels.eyebrow}</p>
                <h2 className="profil-video__title">{videoLabels.title}</h2>
                <div className="profil-video__frame">
                  <video
                    ref={(el) => { if (el) el.muted = true; }}
                    className="profil-video__player"
                    src="/gymplanerare-demo.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label={videoLabels.caption}
                  />
                </div>
                <p className="profil-video__caption">{videoLabels.caption}</p>
              </section>
            )}
          </React.Fragment>
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
