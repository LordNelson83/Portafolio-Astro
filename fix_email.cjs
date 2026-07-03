const fs = require("fs");
const path = require("path");

const translationsPath = path.join(__dirname, "src/i18n/translations.js");
const kontaktaPath = path.join(__dirname, "src/pages/[lang]/kontakta.astro");

let t = fs.readFileSync(translationsPath, "utf8");
t = t.split("\n").filter(line => !/^\s*email:\s*"nelsonpenna83@gmail\.com",\s*\r?$/.test(line)).join("\n");

const cvSubPattern = /( {6}cvSub:\s*"[^"]*",\r?\n)/g;
const matches = t.match(cvSubPattern);

if (!matches || matches.length !== 3) {
  console.error("Se esperaban 3 coincidencias de cvSub, se encontraron: " + (matches ? matches.length : 0));
  process.exit(1);
}

const inserts = [
  "      email:      \"E-post\",\n      emailSub:   \"nelsonpenna83@gmail.com\",\n",
  "      email:      \"Email\",\n      emailSub:   \"nelsonpenna83@gmail.com\",\n",
  "      email:      \"Correo\",\n      emailSub:   \"nelsonpenna83@gmail.com\",\n",
];

let i = 0;
t = t.replace(cvSubPattern, (match) => match + inserts[i++]);
fs.writeFileSync(translationsPath, t, "utf8");
console.log("translations.js actualizado (sv, en, es)");

let k = fs.readFileSync(kontaktaPath, "utf8");
const emailLinkPattern = /<a href=\{"mailto:" \+ t\("contact", "email"\)\} class="kt-link kt-link--email js-reveal">\s*<span class="kt-link__icon"[^>]*>.*?<\/span>\s*<span class="kt-link__label">\{t\("contact", "email"\)\}<\/span>\s*<span class="kt-link__arrow"[^>]*>.*?<\/span>\s*<\/a>/s;

if (!emailLinkPattern.test(k)) {
  console.error("No encontre el bloque del link de email en kontakta.astro.");
  process.exit(1);
}

k = k.replace(emailLinkPattern,
`<a href={"mailto:" + t("contact", "emailSub")} class="kt-link kt-link--email js-reveal">
          <span class="kt-link__label">{t("contact", "email")}</span>
          <span class="kt-link__sub">{t("contact", "emailSub")}</span>
          <span class="kt-link__arrow" aria-hidden="true">↗</span>
        </a>`);

fs.writeFileSync(kontaktaPath, k, "utf8");
console.log("kontakta.astro actualizado");
