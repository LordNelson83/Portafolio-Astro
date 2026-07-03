import { useEffect, useRef } from "react";
import "../pagesCSS/crossMedia.css";


export default function CrossMediaIsland({ cm, lang }) {

  const statsRef   = useRef([]);
  const contentRef = useRef(null);
  const imageRef   = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (e) => e.forEach(en => en.isIntersecting && en.target.classList.add("is-visible")),
      { threshold: 0.08 }
    );
    [...statsRef.current, contentRef.current, imageRef.current]
      .filter(Boolean)
      .forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="cm-page">
      <div className="cm-grain" aria-hidden="true" />
      <div className="cm-bg-word" aria-hidden="true">Cross</div>

      {/* HERO */}
      <header className="cm-hero">
        <p className="cm-hero__eyebrow">{cm.eyebrow}</p>
        <h1 className="cm-hero__h1">
          <span>{cm.h1a}</span>
          <span><em>{cm.h1b}</em></span>
        </h1>
        <div className="cm-hero__meta">
          <p className="cm-hero__school">{cm.school}</p>
          <span className="cm-hero__sep" aria-hidden="true">·</span>
          <p className="cm-hero__period">{cm.period}</p>
        </div>
        <div className="cm-hero__line" aria-hidden="true" />
      </header>

      {/* STATS */}
      <div className="cm-stats" role="list">
        {cm.stats.map((s, i) => (
          <div
            key={s.value}
            className="cm-stat"
            role="listitem"
            ref={el => statsRef.current[i] = el}
            style={{ "--delay": `${i * 0.1}s` }}
          >
            <span className="cm-stat__value">{s.value}</span>
            <span className="cm-stat__label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* OPENING */}
      <div className="cm-opening">
        <p className="cm-opening__text">{cm.opening}</p>
        <div className="cm-opening__rule" aria-hidden="true" />
      </div>

      {/* BODY */}
      <div className="cm-body">

        {/* Columna texto */}
        <article className="cm-article" ref={contentRef}>
          <div className="cm-article__header">
            <p className="cm-article__eyebrow">{cm.artEyebrow}</p>
            <h2 className="cm-article__title">{cm.artTitle}</h2>
            <div className="cm-article__divider" aria-hidden="true" />
          </div>
          <div className="cm-article__body">
            {cm.paragraphs.map((p, i) => (
              <p key={i} className="cm-article__para">{p}</p>
            ))}
          </div>
          <blockquote className="cm-article__blockquote">
            <p>"{cm.quote}"</p>
          </blockquote>
          <p className="cm-article__closing">{cm.closing}</p>
          <div className="cm-article__skills">
            {["Typografi", "Layout", "Illustration", "Photoshop", "Illustrator", "InDesign"].map(skill => (
              <span key={skill} className="cm-article__skill">{skill}</span>
            ))}
          </div>
          <span className="cm-article__tag">{cm.tag}</span>
        </article>

        {/* Columna imagen */}
        <div className="cm-visual" ref={imageRef}>
          <figure className="cm-visual__figure">
            <div className="cm-visual__img-wrap">
              <img
                src={"/images/magasin.webp"}
                alt="Tidningsmagasin — Fridhems Folkhögskola 2007–2009"
                className="cm-visual__img"
              />
              <div className="cm-visual__overlay">
                <span className="cm-visual__overlay-tag">Tidningsmagasin</span>
                <span className="cm-visual__overlay-year">2007–2009</span>
              </div>
            </div>
            <figcaption className="cm-visual__caption">{cm.imgCaption}</figcaption>
          </figure>

          <a
            href="/Magasin.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="cm-visual__link"
          >
            <div className="cm-visual__link-content">
              <div className="cm-visual__link-texts">
                <span className="cm-visual__link-label">{cm.linkLabel}</span>
                <span className="cm-visual__link-sub">{cm.linkSub}</span>
              </div>
              <span className="cm-visual__link-arrow" aria-hidden="true">↗</span>
            </div>
            <div className="cm-visual__link-bar" aria-hidden="true" />
          </a>

          <div className="cm-visual__context">
            <div className="cm-visual__context-item">
              <span className="cm-visual__context-num">{cm.ctxNum1}</span>
              <span className="cm-visual__context-desc">{cm.ctxDesc1}</span>
            </div>
            <div className="cm-visual__context-divider" aria-hidden="true" />
            <div className="cm-visual__context-item">
              <span className="cm-visual__context-num">{cm.ctxNum2}</span>
              <span className="cm-visual__context-desc">{cm.ctxDesc2}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="cm-cta">
        <div className="cm-cta__left">
          <p className="cm-cta__eyebrow">{cm.ctaEyebrow}</p>
          <h2 className="cm-cta__title">
            {cm.ctaTitle} <em>{cm.ctaEm}</em>
          </h2>
        </div>
        <a href={"/" + lang + "/kontakta"} className="cm-cta__btn">{cm.ctaBtn}</a>
      </section>
    </div>
  );
}
