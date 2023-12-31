import { useMemo, useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { css } from "@emotion/css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

// styles
import "./styles.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [hideNavbar, setHideNavbar] = useState(true);

  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const closeOffCanvas = useCallback(() => {
    setShowOffCanvas(false);
  }, []);

  const [activeLink, setActiveLink] = useState("#hero");

  useEffect(() => {
    const { hash } = location;
    setActiveLink(hash.length ? hash : activeLink);
    // if ()
  }, [location]);

  const onScroll = useCallback(() => {
    let sec = document.querySelectorAll("section");
    sec.forEach((section) => {
      let top = window.scrollY;
      let offset = section.offsetTop;
      let height = section.offsetHeight;
      let id = section.getAttribute("id");

      if (top >= offset && top < offset + height) {
        setActiveLink(`#${id}`);
        navigate(`#${id}`);
      }
    });
  }, [setActiveLink]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  const { languageState } = useLanguage();

  const { links, callToAction } = useMemo(() => {
    return {
      links: languageState.texts.links,
      callToAction: languageState.texts.callToAction,
    };
  }, [languageState]);

  const printLinks = useCallback(() => {
    return (
      <ul className="flex gap-10">
        {links.map((link) => (
          <li key={link.to}>
            <a
              href={link.to}
              className={`${
                link.to === activeLink ? "text-secondary" : "text-dark-s"
              } transition hover:text-secondary`}
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a className="call-to-action" href={callToAction.to}>
            {callToAction.label}
          </a>
        </li>
      </ul>
    );
  }, [links, callToAction, activeLink]);

  useEffect(() => {
    setTimeout(() => {
      setHideNavbar(false);
    }, 1500);
  }, []);

  return (
    <header
      className={`navbar h-[60px] ${css({
        opacity: hideNavbar ? 0 : 1,
      })}`}
    >
      <Link to="/" className="text-primary font-bold text-xl">
        <h1>{"<Sito />"}</h1>
      </Link>
      <nav className="links">{printLinks()}</nav>
      <button className="text-primary toggle-drawer">
        <FontAwesomeIcon icon={faBars} />
      </button>
    </header>
  );
}

export default Navbar;
