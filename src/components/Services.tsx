import { useState } from "react";
import { services } from "../content";
import { useSelection } from "../selection";

export function Services() {
  const [current, setCurrent] = useState(0);
  const { setTask } = useSelection();
  const service = services[current];

  const discuss = (task: (typeof services)[number]["task"]) => {
    setTask(task);
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">01 — Услуги</p>
          <h2>Что можно заказать</h2>
        </div>
        <div className="services">
          <div className="service-list" role="listbox" aria-label="Список услуг">
            {services.map((item, index) => (
              <button
                key={item.title}
                type="button"
                role="option"
                aria-selected={index === current}
                className={index === current ? "is-active" : undefined}
                onClick={() => setCurrent(index)}
              >
                <span>{item.index}</span>
                <strong>{item.title}</strong>
                <em>{item.term}</em>
              </button>
            ))}
          </div>
          <article className="service-detail" key={service.title}>
            <p className="kicker">
              {service.index} · {service.term}
            </p>
            <h3>{service.title}</h3>
            <p>{service.summary}</p>
            <ul>
              {service.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <button className="button" type="button" onClick={() => discuss(service.task)}>
              Обсудить услугу
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
