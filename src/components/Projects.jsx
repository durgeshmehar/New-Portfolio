import { useMemo, useState } from "react";
import { projects } from "../constants";
import { ProjectHoverEffect } from "./effects/project-hover-effect";

const filters = ["All", "Django", "NodeJS", "React"];

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const filteredProjects = useMemo(() => filter === "All" ? projects : projects.filter((project) => project.category === filter), [filter]);

  return (
    <section className="site-page-section">
      <div className="page-intro max-w-3xl">
        <p className="section-eyebrow">INDEPENDENT WORK</p>
        <h1 className="page-title">Small products, complete systems, useful experiments.</h1>
        <p className="page-copy">A collection of projects where I explored the full shape of a problem—from the first interaction through the architecture behind it.</p>
      </div>
      <div className="project-filters mt-10" role="group" aria-label="Filter projects">
        {filters.map((item) => <button key={item} type="button" aria-pressed={filter === item} className={filter === item ? "project-filter-active" : ""} onClick={() => setFilter(item)}>{item}</button>)}
      </div>
      <ProjectHoverEffect projects={filteredProjects} className="project-grid-theme mt-10" />
    </section>
  );
};

export default Projects;
