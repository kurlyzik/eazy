"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 1000, mass: 0.2 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovered(
        target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          !!target.closest("a") ||
          !!target.closest("button") ||
          target.dataset.cursor === "hover",
      );
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.img
        src="/cursor.ico"
        alt="Cursor"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full object-contain border border-white md:block"
        style={{
          x,
          y,
          filter:
            "grayscale(100%) drop-shadow(0 0 6px rgba(255, 255, 255, 0.5))",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isClicking ? 0.8 : 1, opacity: 1 }}
        transition={{ duration: 0.1 }}
      />

      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden -translate-x-1/2 -translate-y-1/2 rounded-full border md:block"
        style={{
          x,
          y,
          width: isHovered ? 56 : 28,
          height: isHovered ? 56 : 28,
          borderColor: isHovered
            ? "rgba(255, 255, 255, 0.5)"
            : "rgba(255, 255, 255, 0.2)",
          transition:
            "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
        }}
        animate={{ scale: isClicking ? 0.8 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
