import { useRef, useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import CatWalker from "./modules/CatWalker";

type ProjectCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  githubLink: string;
};

const projectCards: ProjectCardProps[] = [
  {
    title: "Project 1",
    description: "Description of Project 1",
    imageUrl: "./assets/project1.png",
    githubLink: "#",
  },
  {
    title: "Project 2",
    description: "Description of Project 2",
    imageUrl: "./assets/project2.png",
    githubLink: "#",
  },
  {
    title: "Project 3",
    description: "Description of Project 3",
    imageUrl: "./assets/project3.png",
    githubLink: "#",
  },
  {
    title: "Project 4",
    description: "Description of Project 4",
    imageUrl: "./assets/project3.png",
    githubLink: "#",
  },
  {
    title: "Project 5",
    description: "Description of Project 5",
    imageUrl: "./assets/project3.png",
    githubLink: "#",
  },
  {
    title: "Project 6",
    description: "Description of Project 6",
    imageUrl: "./assets/project3.png",
    githubLink: "#",
  },
];

const ProjectCard = memo(({ title, description, imageUrl, githubLink }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((centerY - y) / centerY) * 15;
    const tiltY = ((x - centerX) / centerX) * 15;
    const offsetX = (x - centerX) / 15;
    const offsetY = (y - centerY) / 15;

    cardRef.current.style.transform = `
      perspective(1000px)
      rotateX(${tiltX}deg)
      rotateY(${tiltY}deg)
      translateX(${offsetX}px)
      translateY(${offsetY}px)
    `;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="w-[350px] h-[450px] bg-white rounded-3xl shadow-xl overflow-hidden relative transform-gpu"
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.05,
        transition: {
          type: "spring",
          stiffness: 250,
          damping: 20,
        },
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        willChange: "transform",
      }}
    >
      <div className="w-full h-full p-6 flex flex-col justify-between">
        <h2 className="text-3xl font-semibold text-center mb-4 text-blue-500 transition-all duration-300">
          {title}
        </h2>

        <div className="relative mb-4 rounded-xl overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-500 ease-out transform hover:scale-105"
            loading="lazy"
          />
        </div>

        <p className="text-md text-gray-600 text-center mb-6 transition-transform duration-500 ease-out">
          {description}
        </p>

        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm px-8 py-3 text-white bg-blue-600 rounded-full text-center transition-transform duration-300 hover:bg-blue-700 hover:scale-105 transform"
        >
          View on GitHub
        </a>
      </div>
    </motion.div>
  );
});

function GradientDivWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const idRef = useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newId = idRef.current++;
    setPositions((prev) => [...prev, { x, y, id: newId }]);

    // Remove after 800ms
    setTimeout(() => {
      setPositions((prev) => prev.filter((pos) => pos.id !== newId));
    }, 800);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="border-0 rounded-xl max-w-full mx-auto shadow-slate-950  sm:px-6 lg:px-10 relative overflow-hidden "
    >
      {positions.map((pos) => (
        <div
          key={pos.id}
          className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-60 blur-md pointer-events-none transition-all duration-700"
          style={{
            top: pos.y - 8,
            left: pos.x - 8,
            zIndex: 1,
          }}
        />
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function App() {
  return (
    <section id="projects" className="">
      
      <main className="min-h-screen py-16 px-6 w-full ">
         <GradientDivWrapper>
        <div className="overflow-x-hidden mb-0 ">
          <motion.h1
            className="text-3xl text-center mb-14"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.1,
              color: "#1D4ED8",
              textShadow: "0px 2px 6px rgba(29, 78, 216, 0.5)",
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ color: "#2563EB" }}
          >
            Projects
          </motion.h1>
        </div>
        <h1 className="justify-center text-center text-sm">
          Building innovative and practical applications that solve real-world problems using modern technologies and clean design principles.
        </h1>
        <div className="mb-0 w-full max-w-full">
          <CatWalker />
        </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-y-20 gap-x-[-0px] py-16 mx-44">
            {projectCards.map((card, index) => (
              <ProjectCard key={index} {...card} />
            ))}
          </div>
        </GradientDivWrapper>
      </main>
    </section>
  );
}
