import gsap from "gsap";

// Helper function to split text into characters for animation
function splitTextIntoChars(selector: string | string[]) {
  const selectors = Array.isArray(selector) ? selector : [selector];
  selectors.forEach((sel) => {
    const elements = document.querySelectorAll(sel);
    elements.forEach((el) => {
      const text = el.textContent || "";
      el.innerHTML = text
        .split("")
        .map(
          (char) =>
            `<span class="char" style="display: inline-block;">${char === " " ? "&nbsp;" : char}</span>`
        )
        .join("");
    });
  });
}

export function initialFX() {
  document.body.style.overflowY = "auto";
  document.getElementsByTagName("main")[0].classList.add("main-active");
  
  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  // Split text into characters for landing text
  splitTextIntoChars([
    ".landing-info h3",
    ".landing-intro h2",
    ".landing-intro h1",
  ]);

  gsap.fromTo(
    ".landing-info h3 .char, .landing-intro h2 .char, .landing-intro h1 .char",
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  // Split landing h2 info text
  splitTextIntoChars('.landing-h2-info');

  gsap.fromTo(
    ".landing-h2-info .char",
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  // Split additional text elements
  splitTextIntoChars(['.landing-h2-info-1', '.landing-h2-1', '.landing-h2-2']);

  LoopText(".landing-h2-info .char", ".landing-h2-info-1 .char");
  LoopText(".landing-h2-1 .char", ".landing-h2-2 .char");
}

function LoopText(selector1: string, selector2: string) {
  var tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    selector2,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      selector1,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      selector1,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      selector2,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
