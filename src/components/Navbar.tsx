import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) setMenuOpen(false);
      ScrollSmoother.refresh(true);
    });
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          AS
        </a>
        <a
          href="mailto:ashwinsuresh43@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          ashwinsuresh43@gmail.com
        </a>
        <button
          className={`hamburger${menuOpen ? " hamburger-open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          data-cursor="disable"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={menuOpen ? "nav-open" : ""}>
          <li>
            <a data-href="#about" href="#about" onClick={closeMenu}>
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work" onClick={closeMenu}>
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact" onClick={closeMenu}>
              <HoverLinks text="CONTACT" />
            </a>
          </li>
          <li className="mobile-resume-link">
            <a
              href="https://docs.google.com/document/d/19ySPB84XX2aVm2zBxcQQsIXCMK4Ry8mg/edit?usp=drive_link&ouid=107189634774300891725&rtpof=true&sd=true"
              target="_blank"
              onClick={closeMenu}
            >
              <HoverLinks text="RESUME" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
