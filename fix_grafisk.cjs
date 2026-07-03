const fs = require('fs');
let c = fs.readFileSync('src/components/GrafiskProduktionIsland.jsx', 'utf8');

c = c.replace(/import React from "react";\n/g, '');
c = c.replace(/import \{ Link \} from "react-router-dom";\n/g, '');
c = c.replace(/import "\.\.\/pagesCSS\/crossMedia\.css";\n/g, '');
c = c.replace(/import \{ useLang \} from "\.\.\/i18n\/LangContext";\n/g, '');
c = c.replace(/import magasin from "\.\.\/assets\/images\/magasin\.webp";\n/g, '');
c = c.replace(/import oak from "\.\.\/assets\/images\/oak\.webp";\n/g, '');
c = c.replace(/import oakui from "\.\.\/assets\/images\/oak-ui\.webp";\n/g, '');

c = c.replace(/\bmagasin\b/g, '"/images/magasin.webp"');
c = c.replace(/\boak\b/g, '"/images/oak.webp"');
c = c.replace(/\boakui\b/g, '"/images/oak-ui.webp"');

c = c.replace('const GrafiskProduktion = () => {', 'export default function GrafiskProduktionIsland({ gp, lang }) {');
c = c.replace('export default GrafiskProduktion;', '');
c = c.replace(/  const \{ t, lang \} = useLang\(\);\n/g, '');
c = c.replace(/  const \{ t \} = useLang\(\);\n/g, '');

c = c.replace(/<Link to="\/projekter\/byraanalys"/g, '<a href={"/" + lang + "/projekter/byraanalys"}');
c = c.replace(/<Link to="\/projekter\/oak-case"/g, '<a href={"/" + lang + "/projekter/oak-case"}');
c = c.replace(/<Link to="\/kontakta"/g, '<a href={"/" + lang + "/kontakta"}');
c = c.replace(/<\/Link>/g, '</a>');

c = c.replace(/t\("grafisk",\s*"(\w+)"\)/g, (m, k) => 'gp.' + k);
c = c.replace(/t\("grafiskProduktion",\s*"(\w+)"\)/g, (m, k) => 'gp.' + k);

const fixes = [['\u00c2\u00b7','\u00b7'],['\u00c3\u00a5','\u00e5'],['\u00c3\u00a4','\u00e4'],['\u00c3\u00b6','\u00f6']];
fixes.forEach(([bad, good]) => { while(c.includes(bad)) c = c.split(bad).join(good); });

fs.writeFileSync('src/components/GrafiskProduktionIsland.jsx', c, 'utf8');
console.log('done');
