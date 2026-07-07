import { useEffect, useRef, useState } from "react";

const DIPLOM_PDF = "/diplom-ixnfb-jnquj-295287-6380-xpc2.pdf";

const StarRating = ({ score }) => (
  <div className="om-stars" aria-label={score + " av 5"}>
    {[1, 2, 3, 4, 5].map(n => (
      <svg key={n} className={"om-star " + (n <= score ? "om-star--on" : "om-star--off")}
        viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.436.59 3.44L7 8.885l-3.09 1.626.59-3.44L2 4.635l3.455-.505z" />
      </svg>
    ))}
  </div>
);

const SKILLS = [
  { src: "/images/Acrobat.webp",            alt: "Acrobat",      score: 3 },
  { src: "/images/Indesign.webp",           alt: "InDesign",     score: 3 },
  { src: "/images/Photoshop.webp",          alt: "Photoshop",    score: 3 },
  { src: "/images/Illustrator.webp",        alt: "Illustrator",  score: 2 },
  { src: "/images/Figma.webp",              alt: "Figma",        score: 4 },
  { src: "/images/CSS.webp",               alt: "CSS3",         score: 3 },
  { src: "/images/Javascript.webp",         alt: "JavaScript",   score: 2 },
  { src: "/images/HTLM.webp",              alt: "HTML5",        score: 3 },
  { src: "/images/React.webp",             alt: "React",        score: 2 },
  { src: "/images/Github.webp",            alt: "GitHub",       score: 2 },
  { src: "/images/Mailchimp.webp",         alt: "Mailchimp",    score: 2 },
  { src: "/images/microsoft_netlify.webp", alt: "MS / Netlify", score: 2 },
  { src: "/images/Shapr3d.webp",           alt: "Shapr3D",      score: 4 },
];

const AI_SKILLS = [
  { src: "/images/Claude.webp",  alt: "Claude AI", score: 3 },
  { src: "/images/Gemini.webp",  alt: "Gemini",    score: 3 },
];

function DiplomModal({ onClose }) {
  const closeBtnRef = useRef(null);
  const modalRef = useRef(null);
  const triggerRef = useRef(document.activeElement);

  useEffect(() => {
    closeBtnRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    };
  }, [onClose]);

  return (
    <div className="om-diplom-backdrop" onClick={onClose}
      role="dialog" aria-modal="true" aria-label="Diplom">
      <div className="om-diplom-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <button ref={closeBtnRef} className="om-diplom-close" onClick={onClose} aria-label="Stang diplom">x</button>
        <div className="om-diplom-viewer">
          <iframe src={DIPLOM_PDF + "#toolbar=0&navpanes=0"}
            title="Diplom - Digital tillganglighet"
            className="om-diplom-frame" />
        </div>
      </div>
    </div>
  );
}

export default function OmMigIsland({ aboutData }) {
  const skillsRef = useRef([]);
  const aiRef = useRef([]);
  const [showDiplom, setShowDiplom] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("skill--visible")),
      { threshold: 0.08 }
    );
    [...skillsRef.current, ...aiRef.current].forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const about = aboutData;
  const legend = about.legend || [];

  return (
    <main className="om-main">
      <div className="om-left">
        <section className="om-hero">
          <h1 className="om-h1">
            {about.greeting}<br />
            <span className="om-h1-accent">{about.h1a} Nelson</span>
          </h1>
          <h2 className="om-h2">{about.sub}</h2>
          <p className="om-paragraph">{about.p1}</p>
          <p className="om-paragraph">{about.p2}</p>
          <p className="om-paragraph">{about.p3}</p>

          <button className="om-cert" onClick={() => setShowDiplom(true)}
            aria-label={about.certLabel + " - visa diplom"}>
            <span className="om-cert__icon" aria-hidden="true">✓</span>
            <div className="om-cert__body">
              <p className="om-cert__title">{about.certTitle}</p>
              <p className="om-cert__label">{about.certLabel}</p>
              <p className="om-cert__date">{about.certDate}</p>
            </div>
            <span className="om-cert__cta" aria-hidden="true">Visa diplom →</span>
          </button>

          <div className="om-legend">
            <p className="om-legend__title">{about.legendTitle}</p>
            <div className="om-legend__rows">
              {legend.map((label, i) => (
                <div key={i} className="om-legend__row">
                  <StarRating score={i + 1} />
                  <span className="om-legend__label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="om-right">
        <section className="om-skills-section">
          <p className="om-skills-eyebrow">{about.skillsTitle}</p>
          <div className="om-skills-grid">
            {SKILLS.map((sk, i) => (
              <div key={sk.alt} className="om-skill-cell"
                ref={el => skillsRef.current[i] = el}
                style={{ "--delay": (i * 0.05) + "s" }}>
                <div className="om-skill-badge">
                  <img src={sk.src} alt={sk.alt} className="om-skill-icon" loading="lazy" />
                </div>
                <span className="om-skill-name">{sk.alt}</span>
                <StarRating score={sk.score} />
              </div>
            ))}
          </div>

          <p className="om-skills-eyebrow om-skills-eyebrow--ai" style={{ marginTop: "2rem" }}>{about.aiTitle}</p>
          <div className="om-skills-grid om-skills-grid--ai">
            {AI_SKILLS.map((sk, i) => (
              <div key={sk.alt} className="om-skill-cell"
                ref={el => aiRef.current[i] = el}
                style={{ "--delay": (i * 0.05) + "s" }}>
                <div className="om-skill-badge">
                  <img src={sk.src} alt={sk.alt} className="om-skill-icon" loading="lazy" />
                </div>
                <span className="om-skill-name">{sk.alt}</span>
                <StarRating score={sk.score} />
              </div>
            ))}
          </div>
        </section>
      </div>

      {showDiplom && <DiplomModal onClose={() => setShowDiplom(false)} />}
    </main>
  );
}
