import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaMobileAlt,
  FaDatabase,
  FaPaintBrush,
  FaVideo,
  FaJs,
  FaCss3Alt
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiTailwindcss,
  SiUnrealengine,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiCanva
} from 'react-icons/si';
import { BiCodeAlt } from 'react-icons/bi';
const AboutMeSection = () => {
  const [isInView, setIsInView] = useState(false);

  const handleScroll = () => {
    const section = document.getElementById('about-me-section');
    const rect = section?.getBoundingClientRect();
    if (rect?.top && rect.top <= window.innerHeight / 1.5) {
      setIsInView(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const skills = [
    { name: "React", icon: <FaReact className="text-[#61DAFB]" size={24} /> },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" size={24} /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" size={24} /> },
    { name: "React Native", icon: <FaMobileAlt className="text-[#61DAFB]" size={24} /> },
    { name: "PowerBi", icon: <FaDatabase className="text-[#F2C811]" size={24} /> },
    { name: "UnReal", icon: <SiUnrealengine className="text-[#0E1C3F]" size={24} /> },
    { name: "Adobe Illustrator", icon: <SiAdobeillustrator className="text-[#FF9A00]" size={24} /> },
    { name: "Adobe Photoshop", icon: <SiAdobephotoshop className="text-[#31A8FF]" size={24} /> },
    { name: "Canva", icon: <SiCanva className="text-[#00C4CC]" size={24} /> },
    { name: "Spline", icon: <FaPaintBrush className="text-[#6E56CF]" size={24} /> },
    { name: "CapCut", icon: <FaVideo className="text-[#FF0050]" size={24} /> },
    { name: "SQL", icon: <BiCodeAlt className="text-[#00758F]" size={24} /> },
  ];

  return (
    <div className="relative max-w-5xl mx-auto py-16 px-6 sm:px-8 bg-white rounded-3xl shadow-2xl" id="about-me-section">

      <div className="absolute w-[18rem] h-[18rem] bg-purple-300 opacity-40 rounded-full blur-3xl top-[10%] left-[10%] animate-blob1" />
      <div className="absolute w-[15rem] h-[15rem] bg-pink-300 opacity-30 rounded-full blur-3xl bottom-[5%] right-[10%] animate-blob2" />
      <div className="absolute w-[12rem] h-[12rem] bg-blue-300 opacity-30 rounded-full blur-2xl bottom-[10%] left-[15%] animate-blob3" />

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -100 }}
        transition={{ duration: 0.6 }}
        className="relative text-left space-y-10"
      >
        <motion.h2
          className="text-4xl font-extrabold text-blue-600 tracking-tight"
          whileHover={{ scale: 1.05, color: "#1F2937" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          About Me
        </motion.h2>
        <motion.p
          className="text-gray-700 text-lg sm:text-xl leading-relaxed max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          I am a passionate software developer with a solid background in web and mobile development. I enjoy creating innovative, efficient, and user-friendly applications. With my strong problem-solving skills and data-driven mindset, I am always eager to learn new technologies and improve my skill set.
        </motion.p>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="p-4 bg-transparent cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center gap-2"
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                color: "#2563EB",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
              }}
            >
              <div className="text-2xl">
                {skill.icon}
              </div>
              <motion.span className="text-gray-800 text-sm font-semibold text-center">
                {skill.name}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutMeSection;