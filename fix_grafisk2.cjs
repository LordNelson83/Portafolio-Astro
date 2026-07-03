const fs = require('fs');
let c = fs.readFileSync('src/components/GrafiskProduktionIsland.jsx', 'utf8');
c = c.replace('<Link to="/Profil">', '<a href={"/" + lang + "/profil"}>');
c = c.replace(/<\/Link>/g, '</a>');
fs.writeFileSync('src/components/GrafiskProduktionIsland.jsx', c, 'utf8');
console.log('done');
