import {
  chatbot ,eshop, koinx , portfolio,razorpay ,snappy , youtube,
    mobile,
    backend,
    creator,
    web,
    notify,
    ingredientCheck,
    git_Blog,
    mongodb_Blog,
  } from "../assets";

  import { FaSchool,FaUniversity, FaBriefcase } from "react-icons/fa";
  import { IoSchoolSharp } from "react-icons/io5";
  import { TbBrain } from "react-icons/tb";
  import {
    HiHome,
    HiUser,
    HiBriefcase,
    HiAcademicCap,
    HiCode,
    HiPencilAlt,
    HiMail,
  } from "react-icons/hi";
  import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
  import { SiLeetcode } from "react-icons/si";

  import {
    SiPython,
    SiGo,
    SiJavascript,
    SiCplusplus,
    SiMongodb,
    SiDjango,
    SiFastapi,
    SiPostgresql,
    SiRedis,
    SiElasticsearch,
    SiAmazonaws,
    SiDocker,
    SiCelery,
    SiOpenai,
  } from "react-icons/si";
  
  export const navLinks = [
    {
      id: "/",
      title: "Home",
      icon: HiHome,
    },
    {
      id: "/about",
      title: "About",
      icon: HiUser,
    },
    {
      id: "/experience",
      title: "Experience",
      icon: HiBriefcase,
    },
    {
      id: "/education",
      title: "Education",
      icon: HiAcademicCap,
    },
    {
      id: "/projects",
      title: "Projects",
      icon: HiCode,
    },
    {
      id: "/blog",
      title: "Blog",
      icon: HiPencilAlt,
    },
    {
      id: "/contact",
      title: "Contact",
      icon: HiMail,
    },
  ];

  export const downloadCvLink = "https://drive.google.com/file/d/15E-_4cEhQnmU4g9LvlqmH8My-yYIoGBh/view?usp=drive_link";

  export const socialLinks = [
    {
      icon: FaEnvelope,
      label: "Email",
      href: "mailto:durgeshmehar2002@gmail.com",
    },
    {
      icon: FaGithub,
      label: "GitHub",
      href: "https://github.com/durgeshmehar-dev",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/durgeshmehar/",
    },
    {
      icon: SiLeetcode,
      label: "LeetCode",
      href: "https://leetcode.com/u/durgeshmehar/",
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      href: "https://www.instagram.com/durgeshmehar77/",
    },
  ];

  export const contactInfo = {
    location: "Bangalore, India",
    email: "durgeshmehar2002@gmail.com",
    responseTime: "Usually within 24 hours",
  };

  export const aboutIntro =
    "I'm a backend engineer who genuinely loves the craft — not just shipping features, but understanding why systems work the way they do. Outside of my day-to-day at EkaCare, I spend a lot of time going deeper: reading the papers behind the tools I use, picking apart how large-scale platforms are built, and tracing ideas back to their first principles.";

  export const aboutPillars = [
    {
      title: "Architecture Deep-Dives",
      description:
        "I like deconstructing how big-tech backends are actually built — the scale tradeoffs, the cost decisions, the parts that don't make it into the marketing blog posts.",
      illustration: "architecture",
    },
    {
      title: "Engineering Whitepapers",
      description:
        "Papers like Amazon's DynamoDB paper are some of my favorite reading. There's no substitute for going to the source when you want to actually understand distributed systems internals.",
      illustration: "whitepaper",
    },
    {
      title: "First-Principles Learning",
      description:
        "I trace complex ideas back to their origins rather than memorizing the abstraction on top. It's slower, but it's the only way concepts actually stick.",
      illustration: "foundation",
    },
  ];

  export const aboutClosing =
    "I've worked across 4+ distinct microservices and I'm framework-agnostic by necessity — Python (FastAPI, Django) or Go, whatever the system demands. Whether you're a recruiter, a fellow engineer, or just someone who nerds out about distributed systems, I'm always happy to connect, collaborate, and learn together.";

  const services = [
    {
      title: "Backend Engineer",
      icon: backend,
    },
    {
      title: "Django & FastAPI",
      icon: mobile,
    },
    {
      title: "Distributed Systems",
      icon: web,
    },
    {
      title: "AI/LLM Integration",
      icon: creator,
    },
  ];

  const skills = [
    {
      name: "Python",
      icon: SiPython,
    },
    {
      name: "Go",
      icon: SiGo,
    },
    {
      name: "C++",
      icon: SiCplusplus,
    },
    {
      name: "JavaScript",
      icon: SiJavascript,
    },
    {
      name: "Django",
      icon: SiDjango,
    },
    {
      name: "FastAPI",
      icon: SiFastapi,
    },
    {
      name: "PostgreSQL",
      icon: SiPostgresql,
    },
    {
      name: "MongoDB",
      icon: SiMongodb,
    },
    {
      name: "Redis",
      icon: SiRedis,
    },
    {
      name: "Elasticsearch",
      icon: SiElasticsearch,
    },
    {
      name: "AWS",
      icon: SiAmazonaws,
    },
    {
      name: "Docker",
      icon: SiDocker,
    },
    {
      name: "Celery",
      icon: SiCelery,
    },
    {
      name: "LangChain",
      icon: TbBrain,
    },
    {
      name: "OpenAI API",
      icon: SiOpenai,
    },
  ];

  const experiences = [
    {
      title: "Backend Developer",
      company_name: "EkaCare",
      icon: FaBriefcase,
      iconBg: "#2190FF",
      date: "May 2025 - Present",
      location: "Bangalore, India",
      points: [
        "Own the Assessment platform, serving doctor-facing fill assessments, project team creation, and AI creation; cut API response time by 60x (30ms to 0.5ms) via Redis caching, reducing PostgreSQL queries by 96% (10K to 400) and DB resource usage by 40%, with a SQL fallback for resilience.",
        "Spearhead Autosuggest Medical Concepts, a Go-based search API spanning 84 Elasticsearch indices and 711 shards with async ingestion pipelines and AWS SQS queues for low-latency autosuggestion.",
        "Built integrations surfacing 10+ business partners' custom medical data in autosuggest responses within their EMR tools (e.g., eVital, FLabs).",
        "Own and extend the EkaScribe backend, a voice-to-prescription platform serving 300+ doctors daily, generating structured prescriptions and FHIR-compliant clinical notes from consultations.",
      ],
    },
    {
      title: "Backend Developer Intern",
      company_name: "EkaCare",
      icon: FaBriefcase,
      iconBg: "#2190FF",
      date: "Oct 2024 - May 2025",
      location: "Bangalore, India",
      points: [
        "Designed and executed a comprehensive Stripe subscription integration, overseeing webhook handlers, retry mechanisms, and the end-to-end transaction lifecycle.",
        "Collaborated with cross-functional teams to standardize healthcare data to FHIR and NRCES (NDHM) standards, integrating ABHA linking across microservices, REST APIs, dashboards, and SDK data flows.",
        "Built and automated a validation and serialization framework on Pydantic and FastAPI, achieving an 80% performance gain with strict type safety and 99% unit test coverage.",
      ],
    },
    {
      title: "Technical Head",
      company_name: "ITESA",
      icon: FaBriefcase,
      iconBg: "#2190FF",
      date: "Jul 2023 - Nov 2024",
      location: "Pune/Pimpri-Chinchwad Area",
      points: [
        "Led and managed all technical aspects of the college club.",
        "Organized and managed coding competitions, hackathons, and technical events to support student growth and development.",
      ],
    },
  ];
  
  const educations = [
    {
      title: "SSC",
      place:"Z.P. High School & Jr. College",
      year: "2018",
      score:"91.80 %",
      location:"Andhalgaon, Bhandara",
      icon: FaSchool,
      iconBg: "#2190FF",
    },
    { 
      title: "HSC",
      place:"Nanaji Joshi Jr. College",
      year: "2020",
      score:"85.23 %",
      location:"Shahapur, Bhandara",
      icon: IoSchoolSharp,
      iconBg: "#2190FF",

     
    },
    {
      title: "B.E Information technology",
      place:"D.Y. Patil College of Engineering",
      year: "2021 - 2025",
      score:"9.25 CGPA",
      location:"Akurdi, Pune",
      icon: FaUniversity,
      iconBg: "#2190FF",
    },
  ];
  
  // const navlist = ["All", "Fullstack", "React"];
  const projects = [
    {
      name: "IngredientCheck",
      description:
      "A personalized nutrition platform that scans product images to extract ingredients and generate user-tailored health reports. Integrated ChatGroq (LLaMA 3) to flag harmful ingredients and recommend safer alternatives based on users' health conditions, diseases, and allergies.",
      tags: [
        {
          name: "Django REST Framework",
          color: "orange-text-gradient",
        },
        {
          name: "Paddle-OCR",
          color: "blue-text-gradient",
        },
        {
          name: "Docker",
          color: "green-text-gradient",
        },
        {
          name: "PostgreSQL",
          color: "pink-text-gradient",
        },
      ],
      image: ingredientCheck,
      source_code_link: "https://github.com/durgeshmehar/Ingredient-Check",
      category: "Django"
    },
    {
      name: "Notify",
      description:
      "An email notification system built with Celery, Redis, Django ORM, and PostgreSQL, handling bulk delivery across large subscriber bases via async task processing. Optimized throughput with multi-threading and queue-based workers, distributing notification jobs across concurrent consumers.",
      tags: [
        {
          name: "Django",
          color: "orange-text-gradient",
        },
        {
          name: "Celery",
          color: "blue-text-gradient",
        },
        {
          name: "Redis",
          color: "pink-text-gradient",
        },
      ],
      image: notify,
      source_code_link: "https://github.com/durgeshmehar/Message-Board",
      live_link: "https://message-board-production-e730.up.railway.app/",
      category: "Django"
    },
    {
      name: "AI Chatbot",
      description:
      "Developed an application enabling users to upload PDFs and receive precise answers to their queries using advanced AI technologies.",
      tags: [
        {
          name: "Fastapi",
          color: "orange-text-gradient",
        },
        {
          name: "Next.js",
          color: "blue-text-gradient",
        },
        {
          name: "ChatGPT-4o",
          color: "pink-text-gradient",
        },
      ],
      image: chatbot,
      source_code_link: "https://github.com/durgeshmehar/Chatbot",
      live_link: "https://durgeshbot.vercel.app/",
      category: "Django"
    },   
    {
      name: "E-shop Ecommerce",
      description:
        "E-shop Website is a platform designed to enhance your shopping experience, offering a wide range of products, secure payment options,email notification and efficient order management.",
      tags: [
        {
          name: "Redux",
          color: "orange-text-gradient",
        },
        {
          name: "NodeJs",
          color: "pink-text-gradient",
        },
        {
          name: "mongodb",
          color: "green-text-gradient",
        },
      ],
      image: eshop,
      source_code_link: "https://github.com/durgeshmehar/E-commerce-Website",
      live_link: "https://durgesheshop.vercel.app/login",
      category: "NodeJS"
    },
    {
      name: "Snappy Chat Website",
      description:
        "Introducing Snappy, a real-time chat app developed with React and Socket IO to enhance communication. Featuring dynamic notification for real-time updates on unread messages.",
      tags: [
        {
          name: "Styled-Cp",
          color: "blue-text-gradient",
        },
        {
          name: "Socket IO,",
          color: "green-text-gradient",
        },
        {
          name: "NodeJs",
          color: "pink-text-gradient",
        },
      ],
      image: snappy,
      source_code_link: "https://github.com/durgeshmehar/Live-Chat-Website",
      live_link: "https://chat-app-2893.onrender.com/",
      category: "NodeJS"
    },

    {
      name: "YouTube Clone",
      description:
      "Explore our YouTube Clone project, built with React and Material UI. This project showcases seamless API integration offering essential features such as comments, video player and search functionality.",
      tags: [
        {
          name: "React",
          color: "blue-text-gradient",
        },
        {
          name: "React Routing",
          color: "green-text-gradient",
        },
        {
          name: "Material UI",
          color: "pink-text-gradient",
        },
      ],
      image: youtube,
      source_code_link: "https://github.com/durgeshmehar/YouTube",
      live_link: "https://durgeshyoutube.netlify.app/",
      category: "NodeJS"
    },
    // {
    //   name: "Portfolio Project",
    //   description:
    //   "Presenting my latest creation, a stunning 3D Animated Portfolio crafted with React.js, Tailwind CSS, and Three.js. This immersive portfolio project showcases the fusion of technology and design, featuring animations by Framer Motion.",
    //   tags: [
    //     {
    //       name: "React",
    //       color: "blue-text-gradient",
    //     },
    //     {
    //       name: "Tailwind",
    //       color: "green-text-gradient",
    //     },
    //     {
    //       name: "ThreeJs",
    //       color: "pink-text-gradient",
    //     },
    //   ],
    //   image: portfolio,
    //   source_code_link: "https://github.com/durgeshmehar/New-Portfolio",
    //   live_link: "durgeshmehar.vercel.app",
    //   category: "React"
    // },
     
    {
      name: "Crypto App",
      description:
      "Crypto App is a cryptocurrency tracking app, Utilizing the CoinGecko API for real-time data. Project showcase responsive design, a dynamic crypto tracking graph, and provides detailed information about each coin.",
      tags: [
        {
          name: "React",
          color: "blue-text-gradient",
        },
        {
          name: "Tailwind",
          color: "green-text-gradient",
        },
      ],
      image: koinx,
      source_code_link: "https://github.com/durgeshmehar/koinx-task",
      live_link: "https://durgeshcrypto.vercel.app/",
      category: "React"
    },
    // {
    //   name: "Razorpay Clone",
    //   description:
    //   "Razorpay clone, a meticulously designed application built with HTML and Tailwind. Focusing on UI/UX and responsive design.This is visually appealing platform ensuring an intuitive and seamless experience across all devices.",
    //   tags: [
    //     {
    //       name: "HTML",
    //       color: "blue-text-gradient",
    //     },
    //     {
    //       name: "Tailwind",
    //       color: "green-text-gradient",
    //     },
    //   ],
    //   image: razorpay,
    //   source_code_link: "https://github.com/durgeshmehar/Razorpay",
    //   live_link: "http://durgeshrazorpay.netlify.com/",
    //   category: "React"
    // },
  ];

  const externalBlogs = [
    {
      key: "play-with-git-its-command",
      title: "Play with Git & Its Command",
      excerpt: "Learn how to use git and its commands in a easy & simplest way",
      image: git_Blog,
      tags: ["Git", "Github"],
      date: "2024-03-14",
      bloglink: "https://dblog.hashnode.dev/play-with-git-its-command",
    },
    {
      key: "mongodb-commands-a-beginners-guide",
      title: "MongoDB Commands: A Beginner's Guide",
      excerpt: "Learn all important commands of MongoDB in a easy & simplest way",
      image: mongodb_Blog,
      tags: ["MongoDB", "Mongoose"],
      date: "2024-03-14",
      bloglink: "https://dblog.hashnode.dev/mongodb-commands-a-beginners-guide-to-talking-to-your-database",
    },
  ];

  export { services, skills, educations, experiences, projects, externalBlogs };