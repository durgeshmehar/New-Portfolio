import { educations } from "../constants";

const Education = () => (
  <section className="site-page-section education-page">
    <div className="page-intro max-w-3xl">
      <p className="section-eyebrow">EDUCATION</p>
      <h1 className="page-title">The foundations that taught me to keep learning.</h1>
      <p className="page-copy">A simple record of the places and milestones that shaped the way I approach difficult problems.</p>
    </div>

    <div className="education-grid mt-14">
      {educations.map((education, index) => (
        <article className="education-entry" key={education.title}>
          <p className="education-entry-index">0{index + 1}</p>
          <p className="education-entry-year">{education.year}</p>
          <h2>{education.title}</h2>
          <p className="education-entry-place">{education.place}</p>
          <p className="education-entry-location">{education.location}</p>
          <p className="education-entry-score">{education.score}</p>
        </article>
      ))}
    </div>
  </section>
);

export default Education;
