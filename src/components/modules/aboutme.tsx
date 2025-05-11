import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
    "React",
    "TypeScript",
    "Tailwind CSS",
    "React Native",
    "PowerBi",
    "UnReal",
    "Adobe Illustrator",
    "Adobe Photoshop",
    "Canva",
    "Spline",
    "CapCut",
    "SQL",
  ];

  return (
    <div className="relative max-w-5xl mx-auto py-16 px-6 sm:px-8 bg-white rounded-3xl shadow-2xl" id="about-me-section">
      {/* Animated Blobs */}
      <div className="absolute w-[18rem] h-[18rem] bg-purple-300 opacity-40 rounded-full blur-3xl top-[10%] left-[10%] animate-blob1" />
      <div className="absolute w-[15rem] h-[15rem] bg-pink-300 opacity-30 rounded-full blur-3xl bottom-[5%] right-[10%] animate-blob2" />
      <div className="absolute w-[12rem] h-[12rem] bg-blue-300 opacity-30 rounded-full blur-2xl bottom-[10%] left-[15%] animate-blob3" />

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -100 }}
        transition={{ duration: 0.6 }}
        className="relative text-left space-y-10"
      >
        {/* About Me Title */}
        <motion.h2
          className="text-4xl font-extrabold text-blue-600 tracking-tight"
          whileHover={{ scale: 1.05, color: "#1F2937" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          About Me
        </motion.h2>

        {/* About Me Paragraph */}
        <motion.p
          className="text-gray-700 text-lg sm:text-xl leading-relaxed max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          I am a passionate software developer with a solid background in web and mobile development. I enjoy creating innovative, efficient, and user-friendly applications. With my strong problem-solving skills and data-driven mindset, I am always eager to learn new technologies and improve my skill set.
        </motion.p>

        {/* Skills Section */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              className="p-4 bg-gray-50 border border-gray-300 rounded-xl shadow-lg cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl"
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                color: "#2563EB", // Blue hover effect
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
              <motion.span className="text-gray-800 text-sm font-semibold">{skill}</motion.span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutMeSection;
