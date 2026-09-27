import { useState, type FormEvent } from "react";
import { contacts, taskOptions } from "../content";
import { useSelection } from "../selection";

type Status = { type: "ok" | "error"; text: string } | null;

export function Contact() {
  const { task, setTask } = useSelection();
  const [name, setName] = useState("");
  const [reach, setReach] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>(null);
  const [ready, setReady] = useState("");

  const telegram = contacts.telegram.trim();
  const email = contacts.email.trim();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanReach = reach.trim();
    const cleanMessage = message.trim();

    if (cleanName.length < 2) {
      setReady("");
      setStatus({ type: "error", text: "Напишите, как к вам обращаться." });
      return;
    }
    if (cleanReach.length < 3) {
      setReady("");
      setStatus({ type: "error", text: "Оставьте телефон, почту или Telegram." });
      return;
    }
    if (cleanMessage.length < 10) {
      setReady("");
      setStatus({ type: "error", text: "Опишите задачу чуть подробнее — хотя бы пару предложений." });
      return;
    }

    const brief = [
      "Заявка с сайта Kane13",
      `Имя: ${cleanName}`,
      `Связь: ${cleanReach}`,
      `Задача: ${task}`,
      "",
      cleanMessage,
    ].join("\n");

    setReady(brief);

    if (email) {
      const subject = encodeURIComponent(`Заявка: ${task}`);
      const body = encodeURIComponent(brief);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      setStatus({ type: "ok", text: "Открываю письмо с текстом заявки." });
      return;
    }

    try {
      await navigator.clipboard.writeText(brief);
      setStatus({
        type: "ok",
        text: telegram
          ? "Текст заявки скопирован. Отправьте его в Telegram."
          : "Текст заявки скопирован. Его также можно выделить ниже.",
      });
    } catch {
      setStatus({
        type: "ok",
        text: "Заявка собрана. Скопируйте текст ниже и отправьте его.",
      });
    }
  };

  return (
    <section className="section" id="contact">
      <div className="wrap contact-grid">
        <div>
          <p className="kicker">05 — Контакт</p>
          <h2>Расскажите, какой сайт нужен</h2>
          <p className="section-note">
            Достаточно пары абзацев: что продаёте, какая страница нужна и к какому
            сроку. Ответим с оценкой объёма.
          </p>
          <div className="contact-links">
            {telegram && (
              <a className="button button-ghost" href={telegram} target="_blank" rel="noreferrer">
                {contacts.telegramLabel || "Написать в Telegram"}
              </a>
            )}
            {email && (
              <a className="text-link" href={`mailto:${email}`}>
                {email}
              </a>
            )}
          </div>
        </div>
        <form className="form" onSubmit={onSubmit} noValidate>
          <label>
            Имя
            <input
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Как к вам обращаться"
            />
          </label>
          <label>
            Как связаться
            <input
              name="contact"
              autoComplete="email"
              value={reach}
              onChange={(event) => setReach(event.target.value)}
              placeholder="Телефон, почта или Telegram"
            />
          </label>
          <label>
            Тип задачи
            <select name="task" value={task} onChange={(event) => setTask(event.target.value as typeof task)}>
              {taskOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label>
            О задаче
            <textarea
              name="message"
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Что нужно сделать, для кого сайт и есть ли срок"
            />
          </label>
          <button className="button" type="submit">
            {email ? "Отправить заявку" : "Скопировать заявку"}
          </button>
          {status && (
            <p className={`form-status is-${status.type}`} role="status">
              {status.text}
            </p>
          )}
          {ready && <pre className="brief">{ready}</pre>}
        </form>
      </div>
    </section>
  );
}
