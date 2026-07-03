const fs = require('fs');
let c = fs.readFileSync('src/components/GrafiskProduktionIsland.jsx', 'utf8');
c = c.replace(/  const title\s*= t\("grafiskProduktion", "title"\);\n/g, '  const title = gp.title;\n');
c = c.replace(/  const back\s*= t\("grafiskProduktion", "back"\);\n/g, '  const back = gp.back;\n');
c = c.replace(/  const experiences\s*= t\("grafiskProduktion", "experiences"\);\n/g, '  const experiences = gp.experiences;\n');
c = c.replace(/gp\.t\("grafiskProduktion",\s*"(\w+)"\)/g, (m, k) => 'gp.' + k);
fs.writeFileSync('src/components/GrafiskProduktionIsland.jsx', c, 'utf8');
console.log('done');
