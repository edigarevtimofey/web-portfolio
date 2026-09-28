import { useState } from "react";
import { faqs } from "../content";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section" id="faq">
      <div className="wrap faq-layout">
        <div className="section-head">
          <p className="kicker">04 — Вопросы</p>
          <h2>Коротко о работе</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => {
            const expanded = open === index;
            return (
              <article key={item.q} className={expanded ? "is-open" : undefined}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setOpen(expanded ? -1 : index)}
                  >
                    {item.q}
                    <span aria-hidden="true">{expanded ? "–" : "+"}</span>
                  </button>
                </h3>
                {expanded && <p>{item.a}</p>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
