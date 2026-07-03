const fs = require('fs');
let c = fs.readFileSync('src/i18n/translations.js', 'utf8');

// Sueco
c = c.replace(
  'heroDesc:   "Jag omvandlar komplexa idéer till intuitiva upplevelser — med djup i research, precision i system och hjärta i varje pixel."',
  'heroDesc:   "Jag designar inte bara gränssnitt — jag hittar de problem som användarna inte vet att de har. Under mina intervjuer med byråchefer på Fortnox sa de inte att de behövde ett dashboard. De sa att de var trötta på att byta skärm hela tiden — mellan Visma, Excel och Fortnox — utan att någonsin få en samlad bild. Det är den typen av dold frustration jag letar efter."'
);

// Inglés
c = c.replace(
  'heroDesc:   "I transform complex ideas into intuitive experiences — with depth in research, precision in systems and heart in every pixel."',
  'heroDesc:   "I don\'t just design interfaces — I find the problems users don\'t know they have. During my interviews with accounting managers at Fortnox, they didn\'t say they needed a dashboard. They said they were tired of constantly switching screens — between Visma, Excel and Fortnox — never getting a complete picture. That\'s the kind of hidden frustration I look for."'
);

// Español
c = c.replace(
  'heroDesc:   "Transformo ideas complejas en experiencias intuitivas — con profundidad en la investigación, precisión en los sistemas y corazón en cada píxel."',
  'heroDesc:   "No solo diseño interfaces — encuentro los problemas que los usuarios no saben que tienen. Durante mis entrevistas con directores de agencias en Fortnox, no dijeron que necesitaban un dashboard. Dijeron que estaban cansados de cambiar de pantalla constantemente — entre Visma, Excel y Fortnox — sin obtener nunca una imagen completa. Ese es el tipo de frustración oculta que busco."'
);

fs.writeFileSync('src/i18n/translations.js', c, 'utf8');
console.log('done');
