import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Lightbox({ images, index, onClose, onPrev, onNext, prevLabel, nextLabel, closeLabel }) {
  const closeBtnRef = useRef(null);
  const modalRef = useRef(null);
  const triggerRef = useRef(document.activeElement);

  useEffect(() => {
    closeBtnRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowLeft") { onPrev(); return; }
      if (e.key === "ArrowRight") { onNext(); return; }
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    };
  }, [onClose, onPrev, onNext]);

  const current = images[index];

  return createPortal(
    <div className="lightbox-backdrop" onClick={onClose}
      role="dialog" aria-modal="true" aria-label={current?.alt || ""}>
      <div className="lightbox-modal" onClick={(e) => e.stopPropagation()} ref={modalRef}>
        <button ref={closeBtnRef} className="lightbox-close" onClick={onClose} aria-label={closeLabel}>×</button>
        <button className="lightbox-nav lightbox-nav--prev" onClick={onPrev} aria-label={prevLabel}>
          <span aria-hidden="true">‹</span>
        </button>
        <img src={current?.src} alt={current?.alt || ""} className="lightbox-img" />
        <button className="lightbox-nav lightbox-nav--next" onClick={onNext} aria-label={nextLabel}>
          <span aria-hidden="true">›</span>
        </button>
        <p className="lightbox-caption" aria-live="polite">{current?.alt || ""}</p>
      </div>
    </div>,
    document.body
  );
}
