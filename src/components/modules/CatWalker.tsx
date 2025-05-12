import { useEffect, useRef, useState } from "react";

const CatWalker = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLImageElement>(null);
  const progressRef = useRef(0);
  const [direction, setDirection] = useState<"right" | "left">("right");
  const isAnimating = useRef(false);
  const lastScrollY = useRef(0);
  const [hasWalkedRight, setHasWalkedRight] = useState(false);
  const [hasWalkedLeft, setHasWalkedLeft] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !catRef.current) return;

      const { top, height } = containerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollDirection = scrollY > lastScrollY.current ? "down" : "up";
      lastScrollY.current = scrollY;

      if (top < window.innerHeight && top > -height) {
        if (scrollDirection === "down" && !hasWalkedRight) {
          animateCat(1, "right");
          setHasWalkedRight(true);
          setHasWalkedLeft(false);
        } else if (scrollDirection === "up" && !hasWalkedLeft) {
          animateCat(0, "left");
          setHasWalkedLeft(true);
          setHasWalkedRight(false);
        }
      }
    };

    const animateCat = (targetProgress: number, animateDirection: "right" | "left") => {
      isAnimating.current = true;
      setDirection(animateDirection);

      const duration = 3000;
      const startTime = performance.now();
      const startProgress = progressRef.current;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const t = Math.min(elapsed / duration, 1);
        const currentProgress = startProgress + (targetProgress - startProgress) * t;
        progressRef.current = currentProgress;

        if (catRef.current) {
          catRef.current.style.left = `${currentProgress * 100}%`;
        }

        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          isAnimating.current = false;
        }
      };

      requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: false });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasWalkedRight, hasWalkedLeft]);

  return (
    <div ref={containerRef} className="relative h-[20vh] w-[88%] mx-auto">
      <img
        ref={catRef}
        src="/assets/cat.gif"
        alt="Walking cat"
        className="absolute bottom-0 h-24 sm:h-28 md:h-36"
        style={{
          left: `${progressRef.current * 100}%`,
          transform: `translateX(-50%) scaleX(${direction === "right" ? 1 : -1})`,
        }}
      />
    </div>
  );
};

export default CatWalker;
