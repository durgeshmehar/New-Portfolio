import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { experiences } from "../constants";

const Experience = () => (
  <section className="site-page-section">
    <div className="page-intro max-w-3xl">
      <p className="section-eyebrow">EXPERIENCE</p>
      <h2 className="page-title">Building useful systems, one meaningful constraint at a time.</h2>
      <p className="page-copy">A progression from community leadership to production healthcare systems—always guided by clarity, reliability, and the person using the product on the other side.</p>
    </div>

    <div className="experience-list mt-14">
      {experiences.map((experience) => (
        <article className="experience-entry" key={`${experience.company_name}-${experience.title}-${experience.date}`}>
          <div className="experience-entry-meta"><p>{experience.date}</p><p>{experience.location}</p></div>
          <div>
            <p className="section-eyebrow">{experience.company_name}</p>
            <h2>{experience.title}</h2>
            <ul>{experience.points.map((point) => <li key={point}>{point}</li>)}</ul>
          </div>
        </article>
      ))}
    </div>

    <Link to="/projects" className="text-link mt-12">Explore independent projects <FaArrowRight aria-hidden="true" /></Link>
  </section>
);

export default Experience;
