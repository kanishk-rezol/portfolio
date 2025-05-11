import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const floatingText = [
  "Unagi.",
  "Oh... my... God,Chandler-Bing!",
  "How you doin!!",
  "Guys can fake it? Unbelievable! The one thing that's ours!",
  "Three failed marriages, two illegitimate children... The personal ad writes itself.",
  "Oh, come on tell me. I could use another reason why women won't look at me.",
  "Potato,Potatatoo",
  "Welcome to the real world!"
];

const TorchReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>(
    () => Array(floatingText.length).fill({ x: 0, y: 0 })
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  // Random movement
  useEffect(() => {
    const interval = setInterval(() => {
      const newPositions = floatingText.map(() => ({
        x: Math.random() * 500, // container is 600px wide, leaving some margin
        y: Math.random() * 200, // height: 320px
      }));
      setPositions(newPositions);
    }, 2000); // every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden md:block">
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="relative w-[600px] h-80 bg-transparent overflow-hidden cursor-none mx-auto ml-10"
    >
      {/* Torch Mask */}
      {hovering && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: mousePos.y - 60,
            left: mousePos.x - 60,
            width: "0px",
            height: "0px",
            background:
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)",
            mixBlendMode: "lighten",
            zIndex: 10,
          }}
        />
      )}

      {/* Hidden Text Layer */}
      <div
        className="absolute inset-0 text-4xl font-bold select-none transition-all duration-300"
        style={{
          zIndex: 5,
          opacity: hovering ? 1 : 0,
          maskImage: hovering
            ? `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, white 50px, transparent 100px)`
            : "none",
          WebkitMaskImage: hovering
            ? `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, white 50px, transparent 100px)`
            : "none",
        }}
      >
        {/* Animated Floating Spans */}
        {floatingText.map((text, idx) => (
          <motion.span
            key={idx}
            animate={{ x: positions[idx].x, y: positions[idx].y }}
            transition={{ duration: 2 }}
            style={{
              position: "absolute",
              background: "linear-gradient(to bottom right, #FF0000, #0000FF)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              fontSize: "10px",
              whiteSpace: "nowrap",
            }}
          >
            {text}
          </motion.span>
        ))}

        {/* Static "Hello There!!" */}
        <span
          style={{
            background: "linear-gradient(to bottom right, #FF0000, #0000FF)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            fontSize: "40px",
            position: "absolute",
            left: "180px",
            top: "100px",
          }}
        >
          Hello There!!
        </span>
      </div>
    </div>
    </div>
  );
};

export default TorchReveal;
