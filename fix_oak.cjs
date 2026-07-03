const fs = require('fs');
let c = fs.readFileSync('src/components/OakCaseIsland.jsx', 'utf8');

// Reemplazar todas las llamadas t("oakCase", "key") con oakData.key
c = c.replace(/t\("oakCase",\s*"(\w+)"\)/g, (match, key) => 'oakData.' + key);

fs.writeFileSync('src/components/OakCaseIsland.jsx', c, 'utf8');
console.log('done');
