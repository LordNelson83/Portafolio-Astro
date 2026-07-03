const fs = require('fs');
let c = fs.readFileSync('src/components/ThreeDPrintIsland.jsx', 'utf8');
c = c.replace(/const td = t\("threed"\);/g, '');
c = c.replace(/const td = t\("threedprint"\);/g, '');
fs.writeFileSync('src/components/ThreeDPrintIsland.jsx', c, 'utf8');
console.log('done');
