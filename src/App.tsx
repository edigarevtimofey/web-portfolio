import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Navigate, Route, Routes, useLocation, type Location } from "react-router-dom";
import { Contact } from "./components/Contact";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Portfolio } from "./components/Portfolio";
import { Process } from "./components/Process";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { Tasks } from "./components/Tasks";

function scrollToLocation(location: Location, opening: boolean, samePage = false) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = opening || reduce ? "instant" : "smooth";

  if (location.hash === "#top") {
    window.scrollTo({ top: 0, left: 0, behavior });
    return;
  }

  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) {
      target.scrollIntoView({ behavior });
      return;
    }
  }

  window.scrollTo({ top: 0, left: 0, behavior: samePage ? behavior : "instant" });
}

function PageTransition({ location }: { location: Location }) {
  const [routeLocation, setRouteLocation] = useState(location);
  const displayed = useRef(location);
  const firstVisit = useRef(true);
  const pendingScroll = useRef<{ location: Location; opening: boolean } | null>(null);

  useLayoutEffect(() => {
    const previous = displayed.current;
    const opening = firstVisit.current;
    firstVisit.current = false;

    if (!opening && previous.key === location.key) return;
    displayed.current = location;

    const toProjects = !opening && previous.pathname !== "/projects" && location.pathname === "/projects";
    const toHome = !opening && previous.pathname === "/projects" && location.pathname === "/";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const samePage = previous.pathname === location.pathname;
    const direction = toProjects ? "projects" : toHome ? "home" : "";
    const canTransition =
      direction !== "" &&
      !reduce &&
      typeof document.startViewTransition === "function";

    if (canTransition) {
      const root = document.documentElement;
      root.dataset.nav = direction;
      const transition = document.startViewTransition(() => {
        flushSync(() => setRouteLocation(location));
        if (direction === "home" && location.hash) {
          scrollToLocation(location, true);
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
      });
      transition.finished.finally(() => {
        if (root.dataset.nav === direction) delete root.dataset.nav;
      });
      return;
    }

    if (!samePage && !opening) {
      pendingScroll.current = { location, opening: false };
      setRouteLocation(location);
      return;
    }

    scrollToLocation(location, opening, samePage);
  }, [location]);

  useLayoutEffect(() => {
    const pending = pendingScroll.current;
    if (!pending || routeLocation.key !== pending.location.key) return;
    pendingScroll.current = null;
    scrollToLocation(pending.location, pending.opening);
  }, [routeLocation]);

  return (
    <Routes location={routeLocation}>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function Home() {
  return (
    <main className="home">
      <a className="skip" href="#services">
        К услугам
      </a>
      <Hero />
      <Services />
      <Tasks />
      <Process />
      <Portfolio />
      <Faq />
      <Contact />
    </main>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <PageTransition location={location} />
      <Footer />
    </>
  );
}
