const fs = require('fs');
let c = fs.readFileSync('src/components/OakCaseIsland.jsx', 'utf8');
const lines = c.split('\n');
lines.forEach((line, i) => {
  if (line.includes('t("oakCase"') || line.includes("t('oakCase'") || line.includes('<Link')) {
    console.log((i+1) + ': ' + line.trim());
  }
});
