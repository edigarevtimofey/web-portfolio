import { Link } from "react-router-dom";
import { projects } from "../content";

export function Portfolio() {
  return (
    <section className="section portfolio-invite" aria-labelledby="portfolio-invite-title">
      <div className="wrap">
        <div className="portfolio-invite-card">
          <div>
            <p className="kicker">Портфолио</p>
            <h2 id="portfolio-invite-title">
              Посмотрите работы
              <em>прежде чем обсуждать задачу</em>
            </h2>
            <p className="portfolio-invite-lead">
              Магазины «Детальня» и «Хурма» и лендинг «Каркас».
              <br />
              В каждом примере — задача, состав и экраны сайта.
            </p>
            <Link className="button" to="/projects">
              Смотреть портфолио
            </Link>
          </div>
          <ol>
            {projects.map((project) => (
              <li key={project.slug}>
                <span>{project.index}</span>
                <strong>{project.title}</strong>
                <em>{project.type}</em>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
