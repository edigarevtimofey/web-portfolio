import { useLayoutEffect, useRef, useState } from "react";
import { marquee } from "../content";

function Marquee() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const [repeat, setRepeat] = useState(2);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const set = setRef.current;
    if (!viewport || !set) return;

    const fit = () => {
      const one = set.scrollWidth / repeat;
      if (one < 1) return;
      const next = Math.max(2, Math.ceil(viewport.clientWidth / one) + 1);
      setRepeat((current) => (current === next ? current : next));
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(viewport);
    observer.observe(set);
    return () => observer.disconnect();
  }, [repeat]);

  const renderSet = (copy: string, ref?: typeof setRef) => (
    <div className="marquee-set" ref={ref}>
      {Array.from({ length: repeat }, (_, loop) =>
        marquee.map((item) => (
          <span key={`${copy}-${loop}-${item}`}>
            {item}
            <i />
          </span>
        )),
      )}
    </div>
  );

  return (
    <div className="marquee" aria-hidden="true" ref={viewportRef}>
      <div className="marquee-track" style={{ animationDuration: `${32 * repeat}s` }}>
        {renderSet("a", setRef)}
        {renderSet("b")}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="kicker">Услуги веб-разработки</p>
          <h1>
            Лендинги
            <br />
            и сайты,
            <br />
            которые
            <br />
            <em>приводят заявки</em>
          </h1>
          <p className="lead">
            Собираем страницы и сайты под ключ: структура, дизайн, вёрстка и запуск.
            Для рекламы, компании или небольшого веб-сервиса — без конструктора и
            чужого шаблона.
          </p>
          <div className="hero-actions">
            <a className="button" href="#contact">
              Обсудить проект
            </a>
            <a className="text-link" href="#services">
              Смотреть услуги
            </a>
          </div>
        </div>
        <div className="mock" aria-hidden="true">
          <div className="mock-chrome">
            <span />
            <span />
            <span />
            <i>новый-продукт.site</i>
          </div>
          <div className="mock-body">
            <small>Запуск</small>
            <strong>Страница, которая объясняет продукт за один экран</strong>
            <p>Короткий оффер, доказательства и понятный следующий шаг.</p>
            <div className="mock-row">
              <b>Оставить заявку</b>
              <em>12 экранов не нужно</em>
            </div>
            <ul>
              <li>
                <span>01</span>Оффер
              </li>
              <li>
                <span>02</span>Доверие
              </li>
              <li>
                <span>03</span>Заявка
              </li>
            </ul>
          </div>
        </div>
      </div>
      <dl className="wrap facts">
        <div>
          <dt>Формат</dt>
          <dd>Ведём проект целиком: от структуры до публикации</dd>
        </div>
        <div>
          <dt>Срок лендинга</dt>
          <dd>Ориентир 7–14 дней после брифа и согласованных блоков</dd>
        </div>
        <div>
          <dt>Результат</dt>
          <dd>Адаптивный сайт, форма заявки и понятная передача доступов</dd>
        </div>
      </dl>
      <Marquee />
    </section>
  );
}
