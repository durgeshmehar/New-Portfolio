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
    SiNextdotjs,
    SiTailwindcss,
    SiNodedotjs,
    SiJavascript,
    SiTypescript,
    SiCplusplus,
    SiRedux,
    SiMongodb,
    // SiPostgresql,
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
      id:"https://drive.google.com/file/d/1znLobhz79qq0zmj-bWv0NEutAAGRTxCR/view?usp=sharing",
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
      name: "React",
      icon: SiReact,
    },
    {
      name: "Next.js ",
      icon: SiNextdotjs,
    },
    {
      name: "Tailwind",
      icon: SiTailwindcss,
    },
    {
      name: "Node JS",
      icon: SiNodedotjs,
    },
    {
      name: "JavaScript",
      icon: SiJavascript,
    },
    {
      name: "Typescript",
      icon: SiTypescript,
    },
    {
      name: "C++ (DSA)",
      icon: SiCplusplus,
    },
    {
      name: "Redux",
      icon: SiRedux,
    },
    {
      name: "MongoDB",
      icon: SiMongodb,
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
        "Started off by learning the basics of HTML and CSS in the 2 month and progressively advanced to more complex concepts later.",
        "Also learned ot make responsive webpages by using frameworks like bootstrap and tailwind.",
        "Created a few projects using html , css and bootstrap such as a Clone of flipkart ,razorpay ,youtube which was taught along the course and are present in my github profile.",
        "Dedicated 2 months on learning the basics of javascript and Jquery and progressively advanced to more complex concepts. Created projects such as Dice Game , Drum-Kit and Simon game.",
      ],
    },
    {
      title: "Backend Technologies",
      company_name: "From Youtube & Web Dev Bootcamp by Angela Yu on Udemy",
      icon: nodejs,
      iconBg: "#E6DEDD",
      date: "Nov 2022 - Jan 2023",
      points: [
        "Started my journey of learning backend technologies by learning Node js and framework such as express js.",
        "Later leaned Git, Github and Version Control and meanwhile created small projects of Whether app.",
        "Moving along the course learned the basics of APIs such as making server-side API requested using Axios and also learned API authentication and REST APIs.",
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
        "E-shop Website is a platform designed to enhance your shopping experience, offering a wide range of products, secure payment options,email notification and efficient order management. You can shop with confidence, knowing that your data is secure and your transactions are handled with care.",
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
        "Introducing Snappy, a real-time chat application developed with React.js and Socket IO, designed to enhance communication among users. Featuring dynamic notification counts for real-time updates on unread messages. Snappy offers a stunning UI, responsive design and best experience.",
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
      "Presenting an AI Chatbot Application ,you can ask any quesions to AI. This project developed with Next.js, Fastapi and Langchain for error-free responses from gemini. The application features storing chat history using PostgreSQL, secure user authentication and a responsive design.",
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
      "Explore our YouTube Clone project, built with React, React Routing, and Material UI. This project showcases seamless API integration, offering essential features such as comments, video player, suggestions, and search functionality.",
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
      "Presenting my latest creation, a stunning 3D Animated Portfolio crafted with React.js, Tailwind CSS, and Three.js. This immersive portfolio project showcases the fusion of technology and design, featuring captivating animations powered by React libraries like Framer Motion.",
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
      "Crypto App is a comprehensive cryptocurrency tracking application built with React and Tailwind CSS, utilizing the CoinGecko API for real-time data. It features a mobile-responsive design, a dynamic crypto tracking graph, and provides detailed information about each coin.",
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
      "Razorpay clone, a meticulously designed application built with HTML and Tailwind, focusing on user design, UI, UX, and responsive design.This is user-friendly and visually appealing platform, ensuring an intuitive and seamless experience across all devices.",
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