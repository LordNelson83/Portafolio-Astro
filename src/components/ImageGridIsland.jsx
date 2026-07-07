import { useState } from "react";
import Lightbox from "./Lightbox";

const LB_LABELS = {
  sv: { close: "Stang", prev: "Foregaende bild", next: "Nasta bild", view: "Visa bild i storre format" },
  en: { close: "Close", prev: "Previous image", next: "Next image", view: "View enlarged image" },
  es: { close: "Cerrar", prev: "Imagen anterior", next: "Imagen siguiente", view: "Ver imagen ampliada" },
};

export default function ImageGridIsland({ images, lang, gridClass, wrapClass, imgClass, captionClass }) {
  const [openIndex, setOpenIndex] = useState(null);
  const lbLabels = LB_LABELS[lang] || LB_LABELS.sv;

  return (
    <div className={gridClass}>
      {images.map((img, i) => (
        <div className={wrapClass} key={i}>
          <button type="button" className="pk-gallery__img-btn" onClick={() => setOpenIndex(i)} aria-label={lbLabels.view}>
            <img src={img.src} alt={img.alt} className={imgClass} loading="lazy" />
          </button>
          {img.caption && <p className={captionClass}>{img.caption}</p>}
        </div>
      ))}

      {openIndex !== null && (
        <Lightbox
          images={images}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onPrev={() => setOpenIndex(i => (i - 1 + images.length) % images.length)}
          onNext={() => setOpenIndex(i => (i + 1) % images.length)}
          prevLabel={lbLabels.prev} nextLabel={lbLabels.next} closeLabel={lbLabels.close}
        />
      )}
    </div>
  );
}
