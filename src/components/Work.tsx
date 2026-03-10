import { useState, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "CloudGuard",
    category: "Cybersecurity Dashboard",
    tools: "React, Flask, Socket.IO, Tailwind CSS, SQLite, Python, Kafka",
    image: "/images/cloudguard.png",
    link: "https://github.com/ashwinsureshh/CloudGuard",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(1);

  const goToSlide = useCallback(
    (index: number, dir = 1) => {
      if (isAnimating) return;
      setDirection(dir);
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex, -1);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex, 1);
  }, [currentIndex, goToSlide]);

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: "easeOut" as const },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" as const },
    }),
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          My <span>Work</span>
        </motion.h2>

        <motion.div
          className="carousel-wrapper"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 }}
        >
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                className="carousel-slide"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="carousel-content">
                  <div className="carousel-info">
                    <div className="carousel-number">
                      <h3>0{currentIndex + 1}</h3>
                    </div>
                    <div className="carousel-details">
                      <h4>{projects[currentIndex].title}</h4>
                      <p className="carousel-category">
                        {projects[currentIndex].category}
                      </p>
                      <div className="carousel-tools">
                        <span className="tools-label">Tools & Features</span>
                        <p>{projects[currentIndex].tools}</p>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    className="carousel-image-wrapper"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  >
                    <WorkImage
                      image={projects[currentIndex].image}
                      alt={projects[currentIndex].title}
                      link={projects[currentIndex].link}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""}`}
                onClick={() => goToSlide(index, index > currentIndex ? 1 : -1)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Work;
