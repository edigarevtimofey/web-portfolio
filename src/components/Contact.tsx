import { contacts } from "../content";

export function Contact() {
  const email = contacts.email.trim();
  const telegram = contacts.telegram.trim();
  const telegramLabel = contacts.telegramLabel.trim() || "Telegram";

  return (
    <section className="section" id="contact">
      <div className="wrap contact-grid">
        <div>
          <p className="kicker">05 — Контакт</p>
          <h2>Напишите напрямую</h2>
          <p className="section-note">
            Telegram или почта. Коротко опишите задачу — ответим с оценкой объёма.
          </p>
        </div>
        <ul className="contact-list">
          {telegram ? (
            <li>
              <a href={telegram} target="_blank" rel="noreferrer">
                <span>Telegram</span>
                <strong>{telegramLabel}</strong>
              </a>
            </li>
          ) : null}
          {email ? (
            <li>
              <a href={`mailto:${email}`}>
                <span>Почта</span>
                <strong>{email}</strong>
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </section>
  );
}
