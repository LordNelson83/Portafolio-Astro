const fs = require('fs');
let c = fs.readFileSync('src/components/ThreeDPrintIsland.jsx', 'utf8');

c = c.replace(/import \{ Link \} from "react-router-dom";\n/g, '');
c = c.replace(/import "\.\.\/pagesCSS\/ThreeDPrint\.css";\n/g, '');
c = c.replace(/import \{ useLang \} from "\.\.\/i18n\/LangContext";\n/g, '');
c = c.replace(/import img1 from "\.\.\/assets\/images\/3dprint1\.webp";\n/g, '');
c = c.replace(/import img2 from "\.\.\/assets\/images\/3dprint2\.webp";\n/g, '');
c = c.replace(/import img3 from "\.\.\/assets\/images\/3dprint3\.webp";\n/g, '');
c = c.replace(/import img4 from "\.\.\/assets\/images\/3dprint4\.webp";\n/g, '');
c = c.replace(/import img5 from "\.\.\/assets\/images\/3dprint5\.webp";\n/g, '');
c = c.replace(/import bgPrint from "\.\.\/assets\/images\/3dprinting\.webp";\n/g, '');
c = c.replace(/\[img1, img2, img3, img4, img5\]/g, '["/images/3dprint1.webp", "/images/3dprint2.webp", "/images/3dprint3.webp", "/images/3dprint4.webp", "/images/3dprint5.webp"]');
c = c.replace(/bgPrint/g, '"/images/3dprinting.webp"');
c = c.replace('export default function ThreeDPrint()', 'export default function ThreeDPrintIsland({ td, lang })');
c = c.replace(/  const \{ t, lang \} = useLang\(\);\n/g, '');
c = c.replace(/  const \{ t \} = useLang\(\);\n/g, '');
c = c.replace(/  const td = t\("threed"\);\n/g, '');
c = c.replace(/<Link to="\/grafiskproduktion\/1"/g, '<a href={"/" + lang + "/grafiskproduktion"}');
c = c.replace(/<Link to="\/kontakta"/g, '<a href={"/" + lang + "/kontakta"}');
c = c.replace(/<\/Link>/g, '</a>');

const fixes = [['\u00c2\u00b7','\u00b7'],['\u00c3\u00a5','\u00e5'],['\u00c3\u00a4','\u00e4'],['\u00c3\u00b6','\u00f6']];
fixes.forEach(([bad, good]) => { while(c.includes(bad)) c = c.split(bad).join(good); });

fs.writeFileSync('src/components/ThreeDPrintIsland.jsx', c, 'utf8');
console.log('done');
