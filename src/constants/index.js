import {
  chatbot ,eshop, koinx , portfolio,razorpay ,snappy , youtube,
    mobile,
    backend,
    creator,
    web,
    cpp,
    reactjs,
    tailwind,
    nodejs,
    mongodb,
    git_Blog,
    mongodb_Blog,
    notify
  } from "../assets";

  import { FaSchool,FaUniversity } from "react-icons/fa";
  import { IoSchoolSharp } from "react-icons/io5";

  import {
    SiReact,
    SiPython,
    SiTailwindcss,
    SiNodedotjs,
    SiJavascript,
    SiCplusplus,
    SiMongodb,
    SiDjango,
    SiDocker, SiKubernetes, SiJenkins, SiAmazonaws,
  } from "react-icons/si";
  
  export const navLinks = [
    {
      id: "#about",
      title: "About",
    },
    {
      id: "#education",
      title: "Education",
    },
    {
      id: "#projects",
      title: "Projects",
    },
    {
      id: "#contact",
      title: "Contact",
    },
    {
      id:"https://drive.google.com/file/d/15E-_4cEhQnmU4g9LvlqmH8My-yYIoGBh/view?usp=drive_link",
      title:"Download CV"
    }
  ];
  
  const services = [
    {
      title: "NodeJS Developer",
      icon: web,
    },
    {
      title: "Django Developer",
      icon: mobile,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
    {
      title: "Web Developer",
      icon: creator,
    },
  ];
  
  const skills = [
    {
      name: "C++",
      icon: SiCplusplus,
    },
    {
      name: "Python",
      icon: SiPython,
    },
    {
      name: "JavaScript",
      icon: SiJavascript,
    },
    {
      name: "React",
      icon: SiReact,
    },
    {
      name: "Node JS",
      icon: SiNodedotjs,
    },
    {
      name: "Django",
      icon: SiDjango,
    },
    {
      name: "Tailwind",
      icon: SiTailwindcss,
    },
    {
      name: "MongoDB",
      icon: SiMongodb,
    },
    {
      name: "Docker",
      icon: SiDocker,
    },
    {
      name: "Kubernetes",
      icon: SiKubernetes,
    },
    {
      name: "Jenkins",
      icon: SiJenkins,
    },
    {
      name: "AWS",
      icon: SiAmazonaws,
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
      place:"Dr. D. Y. Patil College of Engineering",
      year: "2021 - 2025",
      score:"9.23 CGPA",
      location:"Akurdi, Pune",
      icon: FaUniversity,
      iconBg: "#2190FF",
    },
  ];
  
  // const navlist = ["All", "Fullstack", "React"];
  const projects = [
    {
      name: "Notify",
      description:
      "Developed an email notiﬁcation system to manage a high-volume subscriber base. Asynchronously sent a large number of emails.",
      tags: [
        {
          name: "Django,",
          color: "orange-text-gradient",
        },
        {
          name: "Celery",
          color: "blue-text-gradient",
        },
        {
          name: "Google OAuth",
          color: "pink-text-gradient",
        },
      ],
      image: notify,
      source_code_link: "https://github.com/durgeshmehar/Message-Board",
      live_link: "https://github.com/durgeshmehar/Message-Board",
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

  const blogs = [
    {
      title: "Play with Git & Its Command",
      description: "Learn how to use git and its commands in a easy & simplest way",
      image: git_Blog,
      tags: [
        {
          name: "Git",
          color: "green-text-gradient",
        },
        {
          name: "Github",
          color: "orange-text-gradient",
        },
      ],
      bloglink: "https://dblog.hashnode.dev/play-with-git-its-command"
    },
    {
      title: "MongoDB Commands: A Beginner's Guide",
      description: "Learn all important commands of MongoDB in a easy & simplest way",
      image: mongodb_Blog,
      tags: [
        {
          name: "MongoDB",
          color: "green-text-gradient",
        },
        {
          name: "Mongoose",
          color: "orange-text-gradient",
        },
      ],
      bloglink: "https://dblog.hashnode.dev/mongodb-commands-a-beginners-guide-to-talking-to-your-database"
    }
  ]
  
  export { services, skills, educations,blogs, projects };