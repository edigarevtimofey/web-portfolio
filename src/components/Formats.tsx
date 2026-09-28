import { formats } from "../content";

export function Formats() {
  const discuss = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("contact")?.scrollIntoView({ behavior: reduce ? "instant" : "smooth" });
  };

  return (
    <section className="section" id="formats">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">04 — Форматы</p>
          <h2>Три понятных объёма</h2>
          <p className="section-note">
            Стоимость называем после короткого брифа: она зависит от числа страниц,
            сценариев и интеграций. Сроки на карточках услуг — ориентир, не договор.
          </p>
        </div>
        <div className="format-grid">
          {formats.map((format) => (
            <article key={format.name}>
              <p>{format.for}</p>
              <h3>{format.name}</h3>
              <ul>
                {format.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <button className="text-link" type="button" onClick={discuss}>
                Обсудить формат
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
