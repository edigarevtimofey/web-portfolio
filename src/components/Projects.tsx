import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { projects } from "../content";

const homeTitle = "Kane13 — лендинги, сайты и веб-разработка";

const shearThreads = Array.from({ length: 8 }, (_, index) => {
  const angle = (18 + (index % 5) * 12) * (Math.PI / 180);
  const speed = 28 + (index % 4) * 10;
  return {
    dx: -Math.round(Math.cos(angle) * speed),
    dy: -Math.round(Math.sin(angle) * speed),
    delay: Number(((index * 0.09) % 0.4).toFixed(2)),
  };
});

const sawDust = Array.from({ length: 72 }, (_, index) => {
  const angle = (32 + (index % 10) * 4) * (Math.PI / 180);
  const speed = 120 + (index % 6) * 22;
  return {
    x: (index % 7) * 3 - 8,
    y: (index % 3) * 2,
    dx: -Math.round(Math.cos(angle) * speed),
    dy: -Math.round(Math.sin(angle) * speed),
    rot: -30 - (index % 9) * 16,
    delay: Number(((index * 0.027) % 0.55).toFixed(2)),
    duration: Number((0.66 + (index % 5) * 0.1).toFixed(2)),
  };
});

export function Projects() {
  useEffect(() => {
    document.title = "Проекты — Kane13";
    return () => {
      document.title = homeTitle;
    };
  }, []);

  return (
    <main className="projects-page" id="top">
      <section className="section">
        <div className="wrap">
          <p className="kicker">Проекты</p>
          <h1>
            Примеры
            <br />
            <em>работ</em>
          </h1>
          <p className="lead">
            Магазины «Детальня» и «Хурма» ещё собираем, рядом лендинг «Каркас».
            В каждом примере задача, состав и экраны сайта.
          </p>
          <nav className="project-jump" aria-label="Примеры проектов">
            {projects.map((project) => (
              <a key={project.slug} href={`#${project.slug}`}>
                {project.index} {project.title}
              </a>
            ))}
          </nav>
          <div className="project-list">
            {projects.map((project) => (
              <ProjectCard project={project} key={project.slug} />
            ))}
          </div>
          <div className="project-end">
            <p>Нужен похожий сайт — опишите задачу, и мы оценим объём.</p>
            <Link className="button" to="/#contact">
              Обсудить похожий проект
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ScissorsGate({
  onTravelEnd,
  onOpenEnd,
}: {
  onTravelEnd: () => void;
  onOpenEnd: () => void;
}) {
  return (
    <div aria-hidden="true" className="fabric-gate">
      <div
        className="fabric-sheet fabric-sheet-top"
        onAnimationEnd={(event) => {
          if (event.animationName !== "sheet-up") return;
          onOpenEnd();
        }}
      />
      <div className="fabric-sheet fabric-sheet-bottom" />
      <div className="fabric-lane">
        <div
          className="shears"
          onAnimationEnd={(event) => {
            if (event.animationName !== "shear-travel") return;
            onTravelEnd();
          }}
        >
          <svg className="shears-svg" viewBox="0 0 380 180">
            <g className="shear-blade shear-blade-lower">
              <circle cx="84" cy="58" r="20" />
              <path d="M102 68 L208 80" />
              <path className="shear-edge" d="M206 80 L350 92 L334 104 L206 90 Z" />
            </g>
            <g className="shear-blade shear-blade-upper">
              <circle cx="64" cy="108" r="22" />
              <path d="M86 96 L208 82" />
              <path className="shear-edge" d="M206 74 L354 60 L338 76 L206 86 Z" />
            </g>
            <circle className="shear-screw" cx="210" cy="80" r="7" />
            <circle className="shear-screw-dot" cx="210" cy="80" r="2.5" />
          </svg>
          <span className="shear-threads">
            {shearThreads.map((thread, index) => (
              <i
                key={index}
                style={
                  {
                    "--dx": `${thread.dx}px`,
                    "--dy": `${thread.dy}px`,
                    animationDelay: `${thread.delay}s`,
                  } as CSSProperties
                }
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

const nailStrikes = [
  { at: "8%", delay: "0.25s" },
  { at: "30%", delay: "0.74s" },
  { at: "52%", delay: "1.24s" },
  { at: "74%", delay: "1.73s" },
  { at: "96%", delay: "2.23s" },
];

const nailSparks = [
  { dx: -16, dy: -28, rot: -20 },
  { dx: 14, dy: -24, rot: 30 },
  { dx: -4, dy: -34, rot: 10 },
  { dx: 22, dy: -12, rot: 50 },
];

function HammerGate({
  onDriveEnd,
  onOpenEnd,
}: {
  onDriveEnd: () => void;
  onOpenEnd: () => void;
}) {
  return (
    <div aria-hidden="true" className="nail-gate">
      <div
        className="nail-sheet nail-sheet-top"
        onAnimationEnd={(event) => {
          if (event.animationName !== "sheet-up") return;
          onOpenEnd();
        }}
      />
      <div className="nail-sheet nail-sheet-bottom" />
      <div className="nail-lane">
        {nailStrikes.map((strike) => (
          <div className="nail-spot" key={strike.at} style={{ left: strike.at }}>
            <span className="nail-clip">
              <span className="nail" style={{ animationDelay: strike.delay }}>
                <i className="nail-head" />
                <i className="nail-shaft" />
              </span>
            </span>
            <span className="nail-sparks">
              {nailSparks.map((spark, index) => (
                <i
                  key={index}
                  style={
                    {
                      "--dx": `${spark.dx}px`,
                      "--dy": `${spark.dy}px`,
                      "--rot": `${spark.rot}deg`,
                      animationDelay: strike.delay,
                    } as CSSProperties
                  }
                />
              ))}
            </span>
          </div>
        ))}
        <div
          className="hammer"
          onAnimationEnd={(event) => {
            if (event.animationName !== "hammer-drive") return;
            onDriveEnd();
          }}
        >
          <img alt="" className="hammer-photo" src="/hammer/body.png?v=4" />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const intro = reduceMotion ? undefined : project.intro;
  const gated = intro === "saw" || intro === "scissors" || intro === "hammer";
  const articleRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<"wait" | "cut" | "open" | "done">(gated ? "wait" : "done");

  useEffect(() => {
    if (!gated || phase !== "wait") return;
    const article = articleRef.current;
    if (!article) return;

    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    const cutLine = () => article.getBoundingClientRect().top + 330;

    const passed = () => cutLine() < 64;

    const reached = () => {
      const top = article.getBoundingClientRect().top;
      const line = top + 330;
      return top < 220 && line > 64 && line < window.innerHeight - 48;
    };

    if (passed()) {
      setPhase("done");
      return;
    }

    if (window.scrollY > 80 && reached()) {
      setPhase("cut");
      return;
    }

    const onScroll = () => {
      if (passed()) {
        setPhase("done");
        window.removeEventListener("scroll", onScroll);
        return;
      }
      if (reached()) {
        setPhase("cut");
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [phase, gated]);

  const playing = phase === "cut" || phase === "open";

  useEffect(() => {
    if (!playing) return;
    const y = window.scrollY;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousOverscroll = root.style.overscrollBehavior;
    root.style.overflow = "hidden";
    root.style.overscrollBehavior = "none";
    window.scrollTo({ top: y, left: 0, behavior: "instant" });

    const stopWheel = (event: WheelEvent) => {
      event.preventDefault();
    };
    const stopTouch = (event: TouchEvent) => {
      event.preventDefault();
    };
    const stopKey = (event: KeyboardEvent) => {
      if (!["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
        return;
      }
      const target = event.target;
      if (target instanceof HTMLElement && target.closest("input, textarea, select, button, a")) {
        return;
      }
      event.preventDefault();
    };
    const stopAnchor = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a");
      if (!(link instanceof HTMLAnchorElement)) return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("#")) event.preventDefault();
    };
    let pinning = false;
    const pin = () => {
      if (pinning || window.scrollY === y) return;
      pinning = true;
      window.scrollTo({ top: y, left: 0, behavior: "instant" });
      pinning = false;
    };
    const hold = () => {
      pin();
      frame = requestAnimationFrame(hold);
    };
    let frame = requestAnimationFrame(hold);

    window.addEventListener("wheel", stopWheel, { passive: false });
    window.addEventListener("touchmove", stopTouch, { passive: false });
    window.addEventListener("keydown", stopKey);
    document.addEventListener("click", stopAnchor, true);
    window.addEventListener("scroll", pin);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", stopWheel);
      window.removeEventListener("touchmove", stopTouch);
      window.removeEventListener("keydown", stopKey);
      document.removeEventListener("click", stopAnchor, true);
      window.removeEventListener("scroll", pin);
      root.style.overflow = previousOverflow;
      root.style.overscrollBehavior = previousOverscroll;
      window.scrollTo({ top: y, left: 0, behavior: "instant" });
    };
  }, [playing]);

  return (
    <article
      className={[
        "project",
        project.shots ? "project-case" : "",
        gated ? "has-gate" : "",
        intro === "saw" ? "has-saw" : "",
        intro === "scissors" ? "has-scissors" : "",
        intro === "hammer" ? "has-hammer" : "",
        phase === "cut" ? "is-cut" : "",
        phase === "open" ? "is-open" : "",
        phase === "done" ? "is-done" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      id={project.slug}
      ref={articleRef}
    >
      {intro === "saw" && phase !== "done" ? (
        <div aria-hidden="true" className="saw-gate">
          <div
            className="saw-sheet saw-sheet-top"
            onAnimationEnd={(event) => {
              if (event.animationName !== "sheet-up") return;
              setPhase("done");
            }}
          />
          <div className="saw-sheet saw-sheet-bottom" />
          <div className="saw-lane">
            <div
              className="saw"
              onAnimationEnd={(event) => {
                if (event.animationName !== "saw-travel") return;
                setPhase("open");
              }}
            >
              <span className="saw-tool">
                <img alt="" className="saw-body" src="/saw/body.png" />
                <span className="saw-dust">
                  {sawDust.map((chip, index) => (
                    <i
                      key={index}
                      style={
                        {
                          left: `${chip.x}px`,
                          top: `${chip.y}px`,
                          "--dx": `${chip.dx}px`,
                          "--dy": `${chip.dy}px`,
                          "--rot": `${chip.rot}deg`,
                          animationDelay: `${chip.delay}s`,
                          animationDuration: `${chip.duration}s`,
                        } as CSSProperties
                      }
                    />
                  ))}
                </span>
              </span>
            </div>
          </div>
        </div>
      ) : null}
      {intro === "scissors" && phase !== "done" ? (
        <ScissorsGate
          onTravelEnd={() => setPhase("open")}
          onOpenEnd={() => setPhase("done")}
        />
      ) : null}
      {intro === "hammer" && phase !== "done" ? (
        <HammerGate
          onDriveEnd={() => setPhase("open")}
          onOpenEnd={() => setPhase("done")}
        />
      ) : null}
      <div className="project-body" inert={phase === "done" ? undefined : true}>
        <div>
          <p className="kicker">
            {project.index} · {project.type}
          </p>
          <div className="project-heading">
            <h2>{project.title}</h2>
            {project.status ? <p className="project-status">{project.status}</p> : null}
          </div>
          <p>{project.summary}</p>
          <dl className="project-meta">
            <div>
              <dt>Задача</dt>
              <dd>{project.task}</dd>
            </div>
            <div>
              <dt>Состав</dt>
              <dd>{project.scope}</dd>
            </div>
          </dl>
          <ul>
            {project.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        {project.shots ? (
          <ProjectShots shots={project.shots} />
        ) : (
          <ProjectScreen kind={project.kind} title={project.title} />
        )}
      </div>
    </article>
  );
}

function ProjectShots({
  shots,
}: {
  shots: NonNullable<(typeof projects)[number]["shots"]>;
}) {
  return (
    <div className="shot-grid">
      {shots.map((shot) => (
        <figure className={shot.wide ? "shot-wide" : undefined} key={shot.src}>
          <img src={shot.src} alt={shot.alt} />
          <figcaption>{shot.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function ProjectScreen({ kind, title }: { kind: (typeof projects)[number]["kind"]; title: string }) {
  return (
    <div className={`screen screen-${kind}`} aria-hidden="true">
      <div className="screen-bar">
        <i />
        <i />
        <i />
        <span>{title}</span>
      </div>
      {kind === "landing" && (
        <div className="screen-body">
          <small>Набор открыт</small>
          <strong>Четыре недели практики, одна группа</strong>
          <p>Программа, формат и заявка на одной странице.</p>
          <b>Оставить заявку</b>
        </div>
      )}
      {kind === "company" && (
        <div className="screen-body">
          <div className="screen-nav">
            <span>Работы</span>
            <span>Подход</span>
            <span>Контакт</span>
          </div>
          <strong>Мастерская частных домов</strong>
          <div className="screen-tiles">
            <i>Дом у воды</i>
            <i>Двор</i>
            <i>Мастерская</i>
            <i>Сад</i>
          </div>
        </div>
      )}
      {kind === "shop" && (
        <div className="screen-body">
          <div className="screen-nav">
            <span>Каталог</span>
            <span>Корзина</span>
          </div>
          <div className="screen-goods">
            <i>
              <b />
              Поле
            </i>
            <i>
              <b />
              Север
            </i>
            <i>
              <b />
              Тишь
            </i>
            <i>
              <b />
              Край
            </i>
          </div>
        </div>
      )}
    </div>
  );
}
