"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Gold spectral scroll-progress bar fixed to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="bg-spectral fixed left-0 top-0 z-[70] h-[3px] w-full origin-left"
    />
  );
}
