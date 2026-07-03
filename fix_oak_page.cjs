const fs = require('fs');
const keys = [
  'back','navTag','heroTitle','heroLead','meta','screens','briefItems',
  'processSteps','needs','quotes','personas','designSystem','iterations',
  'resultStats','a11yPoints','skills','challengeLabel','challengeTitle',
  'challengeP1','challengeP2','briefLabel','processLabel','processTitle',
  'insightsLabel','insightsTitle','insightsIntro','calloutLabel','calloutText',
  'personasLabel','personasTitle','designLabel','designTitle','typoName',
  'typoNote','galleryLabel','prevLabel','nextLabel','dotsLabel','testLabel',
  'testTitle','testP','testStrong','testP2','actionLabel','resultLabel',
  'resultTitle','resultP','a11yLabel','a11yTitle','ctaText','ctaBtn'
];

let c = fs.readFileSync('src/pages/[lang]/projekter/oak-case.astro', 'utf8');

const dataLines = keys.map(k => '  ' + k + ': t("oakCase", "' + k + '"),').join('\n');
c = c.replace('  skills:       t("oakCase", "skills"),', dataLines);

fs.writeFileSync('src/pages/[lang]/projekter/oak-case.astro', c, 'utf8');
console.log('done');
