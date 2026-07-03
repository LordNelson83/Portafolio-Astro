const fs = require('fs');
let c = fs.readFileSync('src/components/OakCaseIsland.jsx', 'utf8');
c = c.replace('<Link to="/kontakta" className="oc-cta__btn">', '<a href={"/" + lang + "/kontakta"} className="oc-cta__btn">');
c = c.replace('</Link>', '</a>');
fs.writeFileSync('src/components/OakCaseIsland.jsx', c, 'utf8');
console.log('done');
