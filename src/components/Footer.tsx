import { Link } from "react-router-dom";
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
        <Link
          to="#top"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({ top: 0, left: 0, behavior: reduce ? "instant" : "smooth" });
          }}
        >
          Наверх
        </Link>
      </div>
    </footer>
  );
}
