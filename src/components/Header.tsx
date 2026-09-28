import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { nav } from "../content";
import { Logo } from "./Logo";

export function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActive("");
      return;
    }

    const sections = nav
      .filter((item) => item.hash)
      .map((item) => document.querySelector(item.hash))
      .filter((node): node is HTMLElement => node instanceof HTMLElement);

    const pick = () => {
      const line = Math.min(220, window.innerHeight * 0.35);
      let current = "";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = `#${section.id}`;
      }
      setActive(current);
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => {
    setOpen(false);
    document.body.classList.remove("nav-open");
  };

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap header-bar">
        <Logo />
        <nav id="site-nav" className={`nav${open ? " is-open" : ""}`} aria-label="Разделы">
          {nav.map((item) => {
            const current =
              item.href === "/projects"
                ? location.pathname === "/projects"
                : location.pathname === "/" && active === item.hash;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={current ? "is-active" : undefined}
                aria-current={current ? "page" : undefined}
                onClick={close}
              >
                {item.label}
              </Link>
            );
          })}
          <Link className="button button-small nav-cta" to="/#contact" onClick={close}>
            Обсудить проект
          </Link>
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Закрыть" : "Меню"}
        </button>
      </div>
    </header>
  );
}
