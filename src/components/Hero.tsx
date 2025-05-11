import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

const jobTitles = [
  "Software Developer",
  "Data Analyst",
  "Frontend Developer",
  "Full Stack Developer",
  "React Developer",
  "React Native Developer",
  "Videographer",
  "Photographer"
];

const name = "Hi, I'm Kanishk";

function Hero() {
  const [index, setIndex] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: false, // ensures that the section is checked every time it comes in view
    threshold: 0.5, // triggers when 50% of the section is in view
  });

  useEffect(() => {
    if (inView) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % jobTitles.length);
      }, 2500);
      return () => clearInterval(timer);
    }
  }, [inView]);

  return (
    <section
      id="home"
      ref={ref} // This will observe the section
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-gradient-radial from-white via-blue-50 to-white"
    >
      {/* Floating Dots Animation */}
      <motion.div
        className="absolute w-10 h-10 bg-yellow-400 rounded-full blur-3xl opacity-50 animate-float1"
        style={{ left: '10%', top: '20%' }}
        key={inView ? 'active' : 'inactive'} // key ensures re-animation
      />
      <motion.div
        className="absolute w-8 h-8 bg-green-400 rounded-full blur-2xl opacity-40 animate-float2"
        style={{ right: '15%', top: '30%' }}
        key={inView ? 'active' : 'inactive'}
      />
      <motion.div
        className="absolute w-6 h-6 bg-pink-400 rounded-full blur-xl opacity-60 animate-float3"
        style={{ left: '30%', bottom: '10%' }}
        key={inView ? 'active' : 'inactive'}
      />

      {/* Blobs */}
      <div className="absolute w-[30rem] h-[30rem] bg-transparent opacity-40 rounded-full blur-3xl top-[-10%] left-[-10%] animate-blob1" />
      <div className="absolute w-[25rem] h-[25rem] bg-transparent opacity-30 rounded-full blur-3xl bottom-[10%] right-[5%] animate-blob2" />
      <div className="absolute w-[20rem] h-[20rem] bg-transparent opacity-30 rounded-full blur-2xl bottom-[20%] left-[10%] animate-blob3" />

      {/* Main Content */}
      <motion.div
        whileHover={{
          scale: 1.05,
          rotateX: 5,
          rotateY: 5,
          transition: { type: "spring", stiffness: 120 }
        }}
        className="text-center px-4 z-10"
      >
        {/* Glowing name ring */}
        <div className="relative flex justify-center mb-4">
          <div className="absolute w-64 h-64 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse z-0" />
          <div className="z-10 text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: -20, rotateX: -30 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className={`inline-block ${char === " " ? "min-w-[0.3rem]" : ""}`}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Interactive Job Title with Hover Effect */}
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-gray-700 text-lg md:text-2xl h-10 mt-2 font-medium transition-all hover:text-blue-500 hover:scale-110 cursor-pointer"
        >
          {jobTitles[index]}
        </motion.p>

        {/* Resume Button with Hover Animation */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-xl shadow relative overflow-hidden cursor-pointer"
        >
          <a
            href="/Kanishk_P.pdf"
            download="Kanishk_P_Resume.pdf"
            target="_blank"
            className="w-full h-full block relative z-10"
          >
            View Resume
          </a>
          <span className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all group-hover:w-full duration-300 z-0"></span>
        </motion.button>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-6 animate-bounce text-blue-400 text-2xl z-10"
        whileHover={{ scale: 1.1, rotate: 45 }}
        transition={{ duration: 0.3 }}
      >
        ↓
      </motion.div>
    </section>
  );
}

export default Hero;
