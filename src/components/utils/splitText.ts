import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Helper function to split text into words or characters
function createTextSpans(
  element: HTMLElement,
  type: "words" | "chars"
): HTMLElement[] {
  const text = element.textContent || "";
  const elements: HTMLElement[] = [];

  if (type === "chars") {
    element.innerHTML = text
      .split("")
      .map(
        (char) =>
          `<span class="char" style="display: inline-block;">${char === " " ? "&nbsp;" : char}</span>`
      )
      .join("");
    elements.push(...(element.querySelectorAll(".char") as any));
  } else if (type === "words") {
    element.innerHTML = text
      .split(/\s+/)
      .map((word) => `<span class="word" style="display: inline-block;">${word}</span>`)
      .join(" ");
    elements.push(...(element.querySelectorAll(".word") as any));
  }

  return elements;
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const paras = document.querySelectorAll(".para");
  const titles = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  // Split paragraph text
  paras.forEach((para) => {
    para.classList.add("visible");

    // Kill existing animation if any
    const existingAnim = (para as any).anim;
    if (existingAnim) {
      existingAnim.progress(1).kill();
    }

    // Split text into words
    const words = createTextSpans(para as HTMLElement, "words");
    const anim = gsap.fromTo(
      words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
    (para as any).anim = anim;
  });

  // Split title text
  titles.forEach((title) => {
    const existingAnim = (title as any).anim;
    if (existingAnim) {
      existingAnim.progress(1).kill();
    }

    // Split text into characters
    const chars = createTextSpans(title as HTMLElement, "chars");
    const anim = gsap.fromTo(
      chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
    (title as any).anim = anim;
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
