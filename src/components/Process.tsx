import { steps } from "../content";

export function Process() {
  return (
    <section className="section band" id="process">
      <div className="wrap process-layout">
        <div className="section-head section-head-light">
          <p className="kicker">03 — Процесс</p>
          <h2>Как идёт работа</h2>
        </div>
        <ol className="steps">
          {steps.map((step) => (
            <li key={step.index}>
              <span>{step.index}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
