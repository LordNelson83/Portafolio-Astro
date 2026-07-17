const fs = require("fs");
const path = require("path");

const full = path.join(__dirname, "src/components/UxUiDesignIsland.jsx");
let content = fs.readFileSync(full, "utf8");

const old = "src=\"/Gymplanerare_web.mp4\"";
const nuevo = "src=\"/gymplanerare-demo.mp4\"";

if (content.includes(old)) {
  content = content.replace(old, nuevo);
  fs.writeFileSync(full, content, "utf8");
  console.log("Referencia del video actualizada al nuevo nombre de archivo");
} else {
  console.error("AVISO: no encontre la referencia exacta.");
}
