import React, { useState, useCallback } from "react";

export default function Contact() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mouseProgress, setMouseProgress] = useState(0.5); 
  const ICON_GAP = 26; 
  const icons = [
    {
      name: "Main",
      username: "yourwebsite",
      href: "https://yourwebsite.com/",
      svg: (
        <svg className="w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v13h7v-6h6v6h7V7L12 2z" />\
        </svg>
      ),
    },
    {
      name: "GitHub",
      username: "yourgithub",
      href: "https://github.com/",
      svg: (
        <svg className="w-5 h-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0.5C5.37 0.5 0 5.87 0 12.5c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.263.793-.583 0-.29-.01-1.063-.015-2.088-3.338.726-4.042-1.61-4.042-1.61-.547-1.387-1.335-1.757-1.335-1.757-1.09-.745.082-.73.082-.73 1.204.086 1.84 1.237 1.84 1.237 1.07 1.83 2.81 1.3 3.495.996.108-.777.42-1.3.763-1.6-2.665-.3-5.467-1.334-5.467-5.93 0-1.31.468-2.382 1.235-3.22-.125-.303-.535-1.524.118-3.176 0 0 1.007-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.403c1.02.005 2.05.137 3.003.403 2.29-1.552 3.295-1.23 3.295-1.23.655 1.652.245 2.873.12 3.176.77.838 1.232 1.91 1.232 3.22 0 4.61-2.807 5.625-5.48 5.92.432.372.816 1.103.816 2.222 0 1.605-.015 2.896-.015 3.29 0 .323.19.7.8.58C20.565 22.295 24 17.797 24 12.5c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      username: "yourfacebook",
      href: "https://facebook.com/",
      svg: (
        <svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.676 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24h11.49v-9.294H9.691v-3.622h3.123V8.41c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.098 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.326V1.326C24 .593 23.406 0 22.675 0z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      username: "yourlinkedin",
      href: "https://linkedin.com/",
      svg: (
        <svg className="w-5 h-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.98 3.5C4.98 2.12 6.09 1 7.48 1c1.39 0 2.5 1.12 2.5 2.5S8.87 6 7.48 6 4.98 4.88 4.98 3.5zM2 8.98h4.9v12H2v-12zM9.58 8.98h4.7v1.64h.07c.65-1.23 2.24-2.54 4.6-2.54 4.9 0 5.8 3.23 5.8 7.42v8.48h-4.9v-7.5c0-1.79-.03-4.09-2.5-4.09-2.5 0-2.89 1.95-2.89 3.97v7.62h-4.88v-12z" />
        </svg>
      ),
    },
    {
      name: "Email",
      username: "youremail",
      href: "mailto:example@email.com",
      svg: (
        <svg className="w-5 h-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 13.065L.843 3.99A2 2 0 0 1 2 2h20a2 2 0 0 1 1.157 1.99L12 13.065zM22 6.435v12.13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6.435l10 8.25 10-8.25z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      username: "yourinstagram",
      href: "https://instagram.com/",
      svg: (
        <svg className="w-5 h-5 text-pink-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm8.75 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
        </svg>
      ),
    },
  ];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const progress = (e.clientX - rect.left) / rect.width;
    setMouseProgress(Math.min(1, Math.max(0, progress)));
    setHoveredIndex(index);
  }, []);

  const getTooltipPosition = (progress: number) => {
    const radius = 40;
    const angle = Math.PI * (1 - progress);
    return {
      x: Math.cos(angle) * radius,
      y: -Math.abs(Math.sin(angle)) * radius * 0.6
    };
  };

  return (
    <section id="contact" className="py-10 bg-gradient-to-r from-blue-50 via-blue-100 to-white flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Contact Me</h2>
      <p className="text-sm text-gray-700 mb-8 text-center px-4">
        Reach out to me on any of these platforms.
      </p>

      <div className="relative h-12 mx-auto" style={{ width: `${icons.length * ICON_GAP}px` }}>
        {icons.map((item, index) => {
          const isHovered = hoveredIndex === index;
          const isRight = hoveredIndex !== null && index > hoveredIndex;
          const { x, y } = getTooltipPosition(mouseProgress);

          return (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-300"
              style={{
                left: `${index * ICON_GAP}px`,
                zIndex: isHovered ? 100 : hoveredIndex !== null ? 0 : 10 + index,
                transform: isHovered
                  ? "translateY(-6px)"
                  : isRight
                  ? "translateY(3px)"
                  : "translateY(0px)",
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="transition-transform duration-200 transform hover:scale-110 w-full h-full flex items-center justify-center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
              >
                {item.svg}
              </div>
              {isHovered && (
                <div
                  className="absolute text-xs text-white items-center justify-center bg-black p-1.5 rounded-md will-change-transform"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-100% + ${y}px))`,
                    left: "50%",
                    transition: "transform 0.12s cubic-bezier(0.18, 0.89, 0.32, 1.28)",
                  }}
                >
                  <p className="font-bold text-[16px] leading-tight">{item.name}</p>
                  <p className="text-[12px] leading-tight">{item.username}</p>
                </div>
              )}
            </a>
          );
        })}
      </div>
    </section>
  );
}
