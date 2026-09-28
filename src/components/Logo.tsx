import { Link } from "react-router-dom";
import { brand } from "../content";

export function Logo() {
  return (
    <Link
      className="logo"
      to="/"
      aria-label={`${brand.name}, на главную`}
      onMouseDown={(event) => event.preventDefault()}
    >
      <span className="logo-mark" aria-hidden="true">
        K
      </span>
      <span>
        <strong>{brand.name}</strong>
        <small>{brand.role}</small>
      </span>
    </Link>
  );
}
