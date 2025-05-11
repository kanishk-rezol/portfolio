import { useRef, memo } from "react";
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
    imageUrl: "./assets/project1.png", // Local path to image
    githubLink: "#",
  },
  {
    title: "Project 2",
    description: "Description of Project 2",
    imageUrl: "./assets/project2.png", // Local path to image
    githubLink: "#",
  },
  {
    title: "Project 3",
    description: "Description of Project 3",
    imageUrl: "./assets/project3.png", // Local path to image
    githubLink: "#",
  },
  // Add more project cards as needed
];

// Use memoization to avoid unnecessary re-renders
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
        scale: 1.05,  // Slightly larger scale for a more noticeable effect
        transition: {
          type: "spring",  // Smooth spring transition
          stiffness: 250,  // Moderate stiffness for smoother bounce
          damping: 20,  // Smooth damping for a realistic feel
        }
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        willChange: "transform"  // Hint to the browser to optimize for transforms
      }}
    >
      <div className="w-full h-full p-6 flex flex-col justify-between">
        <h2 className="text-3xl font-semibold text-center mb-4 text-blue-500 transition-all duration-300">
          {title}
        </h2>

        <div className="relative mb-4 rounded-xl overflow-hidden">
          <img
            src={imageUrl} // Local path to image
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-500 ease-out transform hover:scale-105"
            loading="lazy"  // Lazy load the images
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

export default function App() {
  return (
    <section id="projects">
      <main className="min-h-screen py-16 px-6 ">
        {/* Interactive Heading with animation */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-14 text-blue-600"    >
          Projects
        </h1>
        <div className="mb-18">
          <CatWalker />
        </div>
        {/* Grid layout for project cards */}
        <div className="px-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
          {projectCards.map((card, index) => (
            <ProjectCard key={index} {...card} />
          ))}
        </div>
        </div>
      </main>
    </section>
  );
}
