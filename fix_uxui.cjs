const fs = require('fs');
let c = fs.readFileSync('src/components/UxUiDesignIsland.jsx', 'utf8');

c = c.replace(/import \{ Link \} from "react-router-dom";\n/g, '');
c = c.replace(/import "\.\.\/pagesCSS\/UxUiDesign\.css";\n/g, '');
c = c.replace(/import \{ useLang \} from "\.\.\/i18n\/LangContext";\n/g, '');
c = c.replace('export default function UxUiDesign()', 'export default function UxUiDesignIsland({ ux, lang })');
c = c.replace(/  const \{ t \} = useLang\(\);\n/g, '');
c = c.replace(/  const ux = t\("uxui"\);\n/g, '');
c = c.replace(/<Link to="\/grafiskproduktion\/1"/g, '<a href={"/" + lang + "/grafiskproduktion"}');
c = c.replace(/<Link to="\/kontakta"/g, '<a href={"/" + lang + "/kontakta"}');
c = c.replace(/<\/Link>/g, '</a>');

const fixes = [['\u00c2\u00b7','\u00b7'],['\u00c3\u00a5','\u00e5'],['\u00c3\u00a4','\u00e4'],['\u00c3\u00b6','\u00f6']];
fixes.forEach(([bad, good]) => { while(c.includes(bad)) c = c.split(bad).join(good); });

fs.writeFileSync('src/components/UxUiDesignIsland.jsx', c, 'utf8');
console.log('done');
