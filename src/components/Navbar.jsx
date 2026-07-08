import { useState, useEffect } from "react";
import { switchLangPath } from "../i18n/utils";

const FlagSE = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15" width="22" height="16"
    style={{ borderRadius: "2px", display: "block" }} aria-hidden="true" focusable="false">
    <rect width="20" height="15" fill="#006AA7"/>
    <rect x="5" width="3" height="15" fill="#FECC02"/>
    <rect y="6" width="20" height="3" fill="#FECC02"/>
  </svg>
);

const FlagGB = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="22" height="16"
    style={{ borderRadius: "2px", display: "block" }} aria-hidden="true" focusable="false">
    <rect width="60" height="30" fill="#012169"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
    <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
    <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
  </svg>
);

const FlagES = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" width="22" height="16"
    style={{ borderRadius: "2px", display: "block" }} aria-hidden="true" focusable="false">
    <rect width="3" height="2" fill="#c60b1e"/>
    <rect y="0.5" width="3" height="1" fill="#ffc400"/>
  </svg>
);

const LANGS = [
  { code: "sv", Flag: FlagSE, label: "Svenska" },
  { code: "en", Flag: FlagGB, label: "English" },
  { code: "es", Flag: FlagES, label: "Espanol" },
];

const Navbar = ({ lang = "sv", currentPath = "/", isHome = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const currentLang = LANGS.find(l => l.code === lang) || LANGS[0];
  const CurrentFlag = currentLang.Flag;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!langOpen) return;
    const close = () => setLangOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [langOpen]);

  return (
    <nav
      className={"navbar " + (isHome ? "navbar--dark" : "navbar--light")}
      aria-label="Huvudnavigation"
    >
      <a href={"/" + lang + "/"} className="navbar-logo" aria-label="Hem - Nelson Peña">
        <img
          className="navbar-logo-img"
          src="/images/npt.webp"
          alt="Nelson Peña logotyp"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </a>

      <div
        id="navbar-links"
        className={"navbar-links " + (menuOpen ? "navbar-links--open" : "")}
      >
        {[
          { to: "/" + lang + "/ommig",    label: lang === "sv" ? "Om mig" : lang === "en" ? "About me" : "Sobre mi" },
          { to: "/" + lang + "/kontakta", label: lang === "sv" ? "Kontakt" : lang === "en" ? "Contact" : "Contacto" },
        ].map(({ to, label }) => (
          <a key={to} href={to} className="nav-link nav-link--dark">
            {label}
          </a>
        ))}

        <div
          className="lang-switcher lang-switcher--mobile lang-switcher--dark"
          onClick={e => { e.stopPropagation(); setLangOpen(o => !o); }}
          role="button"
          tabIndex={0}
          aria-label={"Valj sprak, nuvarande: " + currentLang.label}
          aria-expanded={langOpen}
          aria-haspopup="listbox"
          onKeyDown={e => { if (e.target !== e.currentTarget) return; if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLangOpen(o => !o); } if (e.key === "Escape") setLangOpen(false); }}
        >
          <span className="lang-current" aria-hidden="true">
            <CurrentFlag />
            <span className="lang-arrow">{langOpen ? "▲" : "▼"}</span>
          </span>
          {langOpen && (
            <ul className="lang-dropdown" role="listbox" aria-label="Valj sprak">
              {LANGS.map(l => {
                const LFlag = l.Flag;
                return (
                  <li
                    key={l.code}
                    className={"lang-option " + (l.code === lang ? "lang-option--active" : "")}
                    role="option"
                    aria-selected={l.code === lang}
                  >
                    <a href={switchLangPath(currentPath, l.code)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", color: "inherit" }}>
                      <LFlag />
                      <span className="lang-name">{l.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div
        className="lang-switcher lang-switcher--desktop lang-switcher--dark"
        onClick={e => { e.stopPropagation(); setLangOpen(o => !o); }}
        role="button"
        tabIndex={0}
        aria-label={"Valj sprak, nuvarande: " + currentLang.label}
        aria-expanded={langOpen}
        aria-haspopup="listbox"
        onKeyDown={e => { if (e.target !== e.currentTarget) return; if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLangOpen(o => !o); } if (e.key === "Escape") setLangOpen(false); }}
      >
        <span className="lang-current" aria-hidden="true">
          <CurrentFlag />
          <span className="lang-arrow">{langOpen ? "▲" : "▼"}</span>
        </span>
        {langOpen && (
          <ul className="lang-dropdown" role="listbox" aria-label="Valj sprak">
            {LANGS.map(l => {
              const LFlag = l.Flag;
              return (
                <li
                  key={l.code}
                  className={"lang-option " + (l.code === lang ? "lang-option--active" : "")}
                  role="option"
                  aria-selected={l.code === lang}
                >
                  <a href={switchLangPath(currentPath, l.code)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", color: "inherit" }}>
                    <LFlag />
                    <span className="lang-name">{l.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <button
        className={"navbar-burger " + (menuOpen ? "navbar-burger--open" : "") + " navbar-burger--dark"}
        onClick={() => setMenuOpen(o => !o)}
        aria-label={menuOpen ? "Stang meny" : "Oppna meny"}
        aria-expanded={menuOpen}
        aria-controls="navbar-links"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      {menuOpen && (
        <div
          className="navbar-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navbar;
