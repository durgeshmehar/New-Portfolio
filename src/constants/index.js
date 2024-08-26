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
    mongodb_Blog
  } from "../assets";

  import {
    SiReact,
    SiPython,
    SiTailwindcss,
    SiNodedotjs,
    SiJavascript,
    SiCplusplus,
    SiRedux,
    SiMongodb,
    SiDjango,
    SiDocker, SiKubernetes, SiJenkins, SiAmazonaws
  } from "react-icons/si";
  
  export const navLinks = [
    {
      id: "#about",
      title: "About",
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
      title: "Web Developer",
      icon: web,
    },
    {
      title: "Frontend Developer",
      icon: mobile,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
    {
      title: "Blog Writer",
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
  
  const experiences = [
    {
      title: "Data Structures & Algorithms",  
      company_name: "From Love babbar tutorials & documentation",
      icon: cpp,
      iconBg: "#242424",
      date: "March 2022 - Aug 2022",
      points: [
        "Started with C as first programming language then moved to C++ and learned the basics of Data Structures and Algorithms.",
        "Also learned the OOPs and STL and later moved to more complex concepts such as Graphs, Trees, Dynamic Programming and Bit Manipulation.",
        "I have also started doing problems on Leetcode and GeeksforGeeks and also participated in coding contests.",
      ],
    },
    {
      title: "Frontend Technologies",
      company_name: "From CodeWithHarry, Youtube tutorials & documentation",
      icon: tailwind,
      iconBg: "#383E56",
      date: "Aug 2022 - Nov 2022",
      points: [
        "Learned HTML and CSS in the 2 month and progressively advanced to more complex concepts later.",
        "Also learned ot make responsive webpages by using frameworks like bootstrap and tailwind.",
        "Created a few projects Clone of flipkart ,razorpay ,youtube which was taught along the course and are present in my github profile.",
        "Dedicated 2 months on learning the javascript and Jquery. Created projects such as Dice Game , Drum-Kit and Simon game.",
      ],
    },
    {
      title: "Backend Technologies",
      company_name: "From Youtube & Web Dev Bootcamp by Angela Yu on Udemy",
      icon: nodejs,
      iconBg: "#E6DEDD",
      date: "Nov 2022 - Jan 2023",
      points: [
        "Started my journey of learning backend technologies by Node js and express js framework.",
        "Later leaned Git, Github and meanwhile created projects of Whether app.",
        "Moving the course learned the APIs such as making server-side API request, API authentication and REST APIs.",
      ],
    },
    {
      title: "Database Technologies",
      company_name: "From Youtube & Web Dev Bootcamp by Angela Yu on Udemy",
      icon: mongodb,
      iconBg: "#383E56",
      date: "Jan 2023 - Feb 2023",
      points: [
        "Developed a fully functional E-commerce site, demonstrating advanced database management skills in database schema design, complex queries, and efficient data handling.",
        "Created a AI Chatbot application in which stores user data , history in postgres database.",
      ],
    },
    {
      title: "React, Redux, PassportJs, JWT Oauth",
      company_name: "From Youtube & Web Dev Bootcamp by Angela Yu on Udemy",
      icon: reactjs,
      iconBg: "#383E56",
      date: "Feb 2023",
      points: [
        "Started learning about Authentication and Security : concepts such as hashing , salting , bcrypt.",
        "Learned about creating and handling cookies ,JWT token and sessions using passportJs.",
        "Implementing all knowledge to create a fully functional projects such as E-commerce site , Realtime chat App and AI Chatbot.",
      ],
    },
  ];
  
  // const navlist = ["All", "Fullstack", "React"];
  const projects = [
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
      category: "Fullstack"
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
      category: "Fullstack"
    },
    {
      name: "AI Chatbot",
      description:
      "Presenting an AI Chatbot app ,you can ask any quesions to AI. This project developed with Next.js, Fastapi, Langchain for responses from gemini and PostgreSQL for store chat history.",
      tags: [
        {
          name: "Next.js",
          color: "blue-text-gradient",
        },
        {
          name: "Fastapi",
          color: "orange-text-gradient",
        },
        {
          name: "PostgreSQL",
          color: "pink-text-gradient",
        },
      ],
      image: chatbot,
      source_code_link: "https://github.com/durgeshmehar/Chatbot",
      live_link: "https://durgeshbot.vercel.app/",
      category: "Fullstack"
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
      category: "Fullstack"
    },
    {
      name: "Portfolio Project",
      description:
      "Presenting my latest creation, a stunning 3D Animated Portfolio crafted with React.js, Tailwind CSS, and Three.js. This immersive portfolio project showcases the fusion of technology and design, featuring animations by Framer Motion.",
      tags: [
        {
          name: "React",
          color: "blue-text-gradient",
        },
        {
          name: "Tailwind",
          color: "green-text-gradient",
        },
        {
          name: "ThreeJs",
          color: "pink-text-gradient",
        },
      ],
      image: portfolio,
      source_code_link: "https://github.com/durgeshmehar/New-Portfolio",
      live_link: "durgeshmehar.vercel.app",
      category: "React"
    },
     
    {
      name: "Crypto App",
      description:
      "Crypto App is a cryptocurrency tracking app built with React and Tailwind CSS. Utilizing the CoinGecko API for real-time data. Project showcase mobile-responsive design, a dynamic crypto tracking graph, and provides detailed information about each coin.",
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
    {
      name: "Razorpay Clone",
      description:
      "Razorpay clone, a meticulously designed application built with HTML and Tailwind. Focusing on UI/UX and responsive design.This is visually appealing platform ensuring an intuitive and seamless experience across all devices.",
      tags: [
        {
          name: "HTML",
          color: "blue-text-gradient",
        },
        {
          name: "Tailwind",
          color: "green-text-gradient",
        },
      ],
      image: razorpay,
      source_code_link: "https://github.com/durgeshmehar/Razorpay",
      live_link: "http://durgeshrazorpay.netlify.com/",
      category: "React"
    },
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
  
  export { services, skills, experiences,blogs, projects };