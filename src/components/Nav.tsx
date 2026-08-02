import { site } from "../data/site";

export default function Nav() {
  return (
    <nav className="nav">
      <a className="nav-mark" href="#top" data-anchor>
        {site.mark}
      </a>
      <ul>
        <li>
          <a href="#about" data-anchor>
            ABOUT
          </a>
        </li>
        <li>
          <a href="#work" data-anchor>
            WORK
          </a>
        </li>
        <li>
          <a href="#contact" data-anchor>
            CONTACT
          </a>
        </li>
      </ul>
    </nav>
  );
}
