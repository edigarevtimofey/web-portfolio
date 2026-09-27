import { principles, tasks } from "../content";

export function Tasks() {
  return (
    <section className="section section-tight" id="approach">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">02 — Задачи</p>
          <h2>Для каких запросов это подходит</h2>
        </div>
        <div className="task-grid">
          {tasks.map((task) => (
            <article key={task.index}>
              <span>{task.index}</span>
              <h3>{task.title}</h3>
              <p>{task.text}</p>
            </article>
          ))}
        </div>
        <div className="principles">
          {principles.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
