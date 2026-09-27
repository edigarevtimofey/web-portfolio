import { brand, contacts } from "../content";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  const email = contacts.email.trim();

  return (
    <footer className="footer">
      <div className="wrap footer-bar">
        <Logo />
        <p>
          © {year} {brand.name}. Лендинги, сайты и веб-сервисы.
          {email ? (
            <>
              {" "}
              <a href={`mailto:${email}`}>{email}</a>
            </>
          ) : null}
        </p>
        <a href="#top">Наверх</a>
      </div>
    </footer>
  );
}
