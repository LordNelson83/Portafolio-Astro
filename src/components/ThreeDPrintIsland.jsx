import { useEffect, useRef, useState } from "react";


const IMG_SRCS = ["/images/3dprint1.webp", "/images/3dprint2.webp", "/images/3dprint3.webp", "/images/3dprint4.webp", "/images/3dprint5.webp"];
const IMG_ALTS = [
  "3D-modell skapad i CAD",
  "3D-utskrift i process",
  "Detalj av 3D-utskrivet objekt",
  "Ekologiska material för 3D-print",
  "Färdigt 3D-printat projekt",
];

export default function ThreeDPrintIsland({ td, lang }) {

  const statsRef   = useRef([]);
  const sectionRef = useRef(null);
  const galleryRef = useRef([]);
  const [activeImg, setActiveImg] = useState(0);
  const [isPaused, setIsPaused]   = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.08 }
    );
    [...statsRef.current, ...galleryRef.current, sectionRef.current]
      .filter(Boolean)
      .forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => setActiveImg(i => (i + 1) % IMG_SRCS.length), 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div className="td-page">
      <div className="td-grain" aria-hidden="true" />
      <div className="td-bg-image" style={{ backgroundImage: `url(${"/images/3dprinting.webp"})` }} aria-hidden="true" />
      <div className="td-bg-word" aria-hidden="true">3D</div>

      {/* HERO */}
      <header className="td-hero">
        <p className="td-hero__eyebrow">{td.eyebrow}</p>
        <h1 className="td-hero__h1">
          <span>{td.h1a}</span>
          <span><em>{td.h1b}</em></span>
        </h1>
        <p className="td-hero__sub">{td.sub}</p>
        <div className="td-hero__line" aria-hidden="true" />
      </header>

      {/* STATS */}
      <div className="td-stats" role="list">
        {td.stats.map((s, i) => (
          <div
            key={s.value}
            className="td-stat"
            role="listitem"
            ref={el => statsRef.current[i] = el}
            style={{ "--delay": `${i * 0.1}s` }}
          >
            <span className="td-stat__value">{s.value}</span>
            <span className="td-stat__label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* BODY */}
      <div className="td-body">

        {/* Galería */}
        <div
          className="td-gallery"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="td-gallery__main">
            {IMG_SRCS.map((src, i) => (
              <div
                key={i}
                className={`td-gallery__slide ${i === activeImg ? "td-gallery__slide--active" : ""}`}
              >
                <img src={src} alt={IMG_ALTS[i]} className="td-gallery__img" />
                <div className="td-gallery__caption">
                  <span className="td-gallery__caption-tag">{td.gallery[i]?.caption}</span>
                  <span className="td-gallery__caption-curiosity">{td.gallery[i]?.curiosity}</span>
                </div>
              </div>
            ))}
            <div className="td-gallery__counter" aria-hidden="true">
              {String(activeImg + 1).padStart(2, "0")} / {String(IMG_SRCS.length).padStart(2, "0")}
            </div>
            <button className="td-gallery__nav td-gallery__nav--prev"
              onClick={() => setActiveImg(i => (i - 1 + IMG_SRCS.length) % IMG_SRCS.length)}
              aria-label="Föregående bild">‹</button>
            <button className="td-gallery__nav td-gallery__nav--next"
              onClick={() => setActiveImg(i => (i + 1) % IMG_SRCS.length)}
              aria-label="Nästa bild">›</button>
            <div className="td-gallery__dots" role="tablist">
              {IMG_SRCS.map((_, i) => (
                <button
                  key={i}
                  className={`td-gallery__dot ${i === activeImg ? "td-gallery__dot--active" : ""}`}
                  onClick={() => setActiveImg(i)}
                  role="tab"
                  aria-selected={i === activeImg}
                  aria-label={`Bild ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="td-gallery__thumbs" role="tablist">
            {IMG_SRCS.map((src, i) => (
              <button
                key={i}
                className={`td-gallery__thumb ${i === activeImg ? "td-gallery__thumb--active" : ""}`}
                onClick={() => setActiveImg(i)}
                role="tab"
                aria-selected={i === activeImg}
                ref={el => galleryRef.current[i] = el}
                style={{ "--delay": `${0.2 + i * 0.08}s` }}
              >
                <img src={src} alt={IMG_ALTS[i]} />
              </button>
            ))}
          </div>

          <a
            href="https://es.pinterest.com/NP3Design/3d-design-3dprint/"
            target="_blank"
            rel="noopener noreferrer"
            className="td-gallery__cta"
          >
            <div className="td-gallery__cta-text">
              <span className="td-gallery__cta-label">{td.ctaLabel}</span>
              <span className="td-gallery__cta-sub">{td.ctaSub}</span>
            </div>
            <span className="td-gallery__cta-arrow" aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Artículo */}
        <article className="td-article" ref={sectionRef}>
          <div className="td-article__header">
            <p className="td-article__eyebrow">{td.artEyebrow}</p>
            <div className="td-article__title-row">
              <div>
                <p className="td-article__school">{td.school}</p>
                <h2 className="td-article__title">{td.artTitle}</h2>
              </div>
              <span className="td-article__period">{td.period}</span>
            </div>
            <div className="td-article__divider" aria-hidden="true" />
          </div>
          <div className="td-article__body">
            {td.paragraphs.map((p, i) => (
              <p key={i} className={`td-article__para${p.lead ? " td-article__para--lead" : ""}`}>
                {p.text}
              </p>
            ))}
          </div>
          <div className="td-article__highlight">
            <p className="td-article__highlight-text">"{td.highlight}"</p>
          </div>
          <span className="td-article__tag">{td.tag}</span>
        </article>
      </div>

      {/* CTA */}
      <section className="td-cta">
        <div className="td-cta__left">
          <p className="td-cta__eyebrow">{td.ctaEyebrow}</p>
          <h2 className="td-cta__title">
            {td.ctaTitle} <em>{td.ctaEm}</em>
          </h2>
        </div>
        <a href={"/" + lang + "/kontakta"} className="td-cta__btn">{td.ctaBtn}</a>
      </section>
    </div>
  );
}
