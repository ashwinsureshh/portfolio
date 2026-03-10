import { motion, type Variants } from "framer-motion";
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const boxVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          Contact
        </motion.h3>
        <div className="contact-flex">
          <motion.div
            className="contact-box"
            custom={0}
            variants={boxVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h4>Email</h4>
            <p>
              <a href="mailto:ashwinsuresh43@gmail.com" data-cursor="disable">
                ashwinsuresh43@gmail.com
              </a>
            </p>
            <h4>Education</h4>
            <p>B.Tech in Computer Science</p>
          </motion.div>
          <motion.div
            className="contact-box"
            custom={1}
            variants={boxVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h4>Social</h4>
            <a
              href="https://github.com/ashwinsureshh"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/ashwin-s-646780294"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
          </motion.div>
          <motion.div
            className="contact-box"
            custom={2}
            variants={boxVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>
              Designed and Developed <br /> by <span>Ashwin S</span>
            </h2>
            <h5>
              <MdCopyright /> 2025
            </h5>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
