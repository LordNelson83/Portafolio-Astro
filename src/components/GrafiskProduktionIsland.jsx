
const IMAGES_BY_INDEX = [
  ["/images/magasin.webp"],
  ["/images/oak.webp", "/images/oak-ui.webp"],
  [],
];

export default function GrafiskProduktionIsland({ gp, lang }) {
  const title       = gp.title;
  const back        = gp.back;
  const experiences = gp.experiences;

  return (
    <div className="description-container">
      <h1 className="titel-big">{title}</h1>

      <ul className="ul-container">
        {experiences.map((exp, index) => (
          <li key={index}>
            <h2 className="sub-titel">{exp.school}</h2>
            <h3 className="sub-titel-period">{exp.year}</h3>
            <p className="sub-titel-description">{exp.description}</p>

            {IMAGES_BY_INDEX[index]?.length > 0 && (
              <div className="image-gallery">
                {IMAGES_BY_INDEX[index].map((img, i) => (
                  <img key={i} src={img} alt={`${exp.school} ${i + 1}`} />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      <div>
        <a href={"/" + lang + "/profil"}>
          <button className="back-button">{back}</button>
        </a>
      </div>
    </div>
  );
};


