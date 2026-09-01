import { Link } from "react-router-dom";
import { FaArrowRight, FaCreditCard, FaFileWaveform, FaMagnifyingGlass, FaSitemap } from "react-icons/fa6";

const featuredWork = [
  {
    number: "01",
    icon: FaFileWaveform,
    title: "EkaScribe",
    label: "Voice-to-prescription platform",
    impact: "Used by 300+ doctors daily",
    description: "I own and extend the backend that turns consultations into structured prescriptions and FHIR-compliant clinical notes—helping clinicians stay present in the conversation instead of in the paperwork.",
  },
  {
    number: "02",
    icon: FaSitemap,
    title: "Assessments",
    label: "Internal management & workflow platform",
    impact: "Designed for operational clarity",
    description: "I own the Assessment platform used internally for management workflows: filling assessments, project-team creation, and AI creation. I also built Django Admin tooling for reliable assessment pre-processing and post-processing.",
  },
  {
    number: "03",
    icon: FaMagnifyingGlass,
    title: "Medical autosuggest",
    label: "Go search API & ingestion pipelines",
    impact: "84 indices · 711 Elasticsearch shards",
    description: "I spearheaded a low-latency search experience with asynchronous ingestion and AWS SQS queues, then connected 10+ partners’ medical data directly into EMR autosuggest results.",
  },
  {
    number: "04",
    icon: FaCreditCard,
    title: "Stripe subscriptions",
    label: "End-to-end payments integration",
    impact: "Designed for a complete transaction lifecycle",
    description: "I designed the subscription flow from webhook handlers through retries, covering the details that make payments dependable when real customers and real money are involved.",
  },
];

const ImpactStory = () => (
  <section id="impact" className="portfolio-section portfolio-section-tight">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="section-eyebrow">WHAT I’VE BEEN BUILDING</p>
          <h2 className="section-title mt-4">Work with real stakes, told in the order that matters.</h2>
        </div>
        <Link to="/experience" className="text-link shrink-0">Read the full experience <FaArrowRight aria-hidden="true" /></Link>
      </div>

      <div className="work-sequence mt-12">
        {featuredWork.map(({ number, icon: Icon, title, label, impact, description }) => (
          <article key={title} className="work-sequence-item">
            <div className="work-sequence-index"><span>{number}</span><Icon aria-hidden="true" /></div>
            <div>
              <p className="work-sequence-label">{label}</p>
              <h3>{title}</h3>
              <p className="work-sequence-description">{description}</p>
            </div>
            <p className="work-sequence-impact">{impact}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactStory;
