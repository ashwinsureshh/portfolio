import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My education <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech Computer Science</h4>
                <h5>Reva University</h5>
              </div>
              <h3>2023–2027</h3>
            </div>
            <p>Currently pursuing a Bachelor of Technology in Computer Science, focusing on frontend development, UI/UX design, and software engineering fundamentals.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
