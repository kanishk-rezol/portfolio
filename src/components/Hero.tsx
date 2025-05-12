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

type GradientBlob = {
  id: number;
  position: {
    top: string;
    left: string;
  };
  colorStart: string;
  direction: string;
};

function Hero() {
  const [index, setIndex] = useState(0);
  const { ref} = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % jobTitles.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const gradients = [
    "linear-gradient(to right, #FF6B6B, #FFD93D)",
    "linear-gradient(to right, #6BCB77, #4D96FF)",
    "linear-gradient(to right, #FF6B81, #845EC2)",
    "linear-gradient(to right, #FFC75F, #F9F871)",
    "linear-gradient(to right, #00C9A7, #845EC2)",
    "linear-gradient(to right, #F14668, #F0C987)"
  ];

  const directions = [
    "top", "top right", "right", "bottom right",
    "bottom", "bottom left", "left", "top left"
  ];

  const [floatingGradients, setFloatingGradients] = useState<GradientBlob[]>([]);

  useEffect(() => {
    const blobs: GradientBlob[] = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      position: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`
      },
      colorStart: gradients[Math.floor(Math.random() * gradients.length)],
      direction: directions[Math.floor(Math.random() * directions.length)],
    }));
    setFloatingGradients(blobs);

    const handleScroll = (e: WheelEvent) => {
      const currentScroll = window.scrollY;
      const heroSection = document.getElementById('home');
      const heroHeight = heroSection?.offsetHeight || 0;
      
      if (currentScroll === 0 && e.deltaY > 0) {
        e.preventDefault();
        window.scrollTo({
          top: heroHeight,
          behavior: 'smooth'
        });
      }
      // If we're at the top of the next section and scrolling up
      else if (currentScroll > 0 && currentScroll < heroHeight && e.deltaY < 0) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);

  const getRandomPosition = () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
  });

  const getRandomGradient = () => gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-gradient-radial from-white via-blue-50 to-white"
    >
      {floatingGradients.map((item) => (
        <motion.div
          key={item.id}
          className="absolute w-[400px] h-[400px] rounded-full pointer-events-none mix-blend-multiply filter blur-3xl opacity-20"
          style={{
            top: item.position.top,
            left: item.position.left,
            backgroundImage: item.colorStart.replace("to right", `to ${item.direction}`),
          }}
          animate={{
            opacity: [0, 0.25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.id * 1.5,
          }}
        />
      ))}

      {[...Array(6)].map((_, idx) => (
        <motion.div
          key={idx}
          className="absolute w-32 h-32 rounded-full opacity-20"
          style={{
            left: getRandomPosition().left,
            top: getRandomPosition().top,
            background: getRandomGradient(),
          }}
          animate={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: getRandomGradient(),
          }}
          whileHover={{
            left: `calc(${Math.random() * 100}% + 15%)`,
            top: `calc(${Math.random() * 100}% + 15%)`,
            opacity: 0.05,
            transition: { type: "spring", stiffness: 150, damping: 25 }
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
            repeatDelay: 0
          }}
        />
      ))}

      <motion.div
        whileHover={{
          scale: 1.05,
          rotateX: 5,
          rotateY: 5,
          transition: { type: "spring", stiffness: 120 }
        }}
        className="text-center px-4 z-10"
      >
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
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-gray-700 text-lg md:text-2xl h-10 mt-2 font-medium transition-all hover:text-blue-500 hover:scale-110 cursor-pointer"
        >
          {jobTitles[index]}
        </motion.p>
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