"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * TiltCard — buttery 3D perspective tilt that follows the mouse.
 * Wrap any card to give it physical depth (rotateX/rotateY + lift + zoom).
 * Pointer-fine devices only; harmless static wrapper everywhere else.
 */
export default function TiltCard({
  children,
  className,
  innerClassName,
  max = 9,
  lift = 8,
  zoom = 1.015,
  perspective = 1000,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** max tilt in degrees */
  max?: number;
  /** hover lift in px */
  lift?: number;
  zoom?: number;
  perspective?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); // -0.5 … 0.5
  const my = useMotionValue(0);
  const hover = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), {
    stiffness: 200,
    damping: 20,
    mass: 0.5,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), {
    stiffness: 200,
    damping: 20,
    mass: 0.5,
  });
  const y = useSpring(useTransform(hover, [0, 1], [0, -lift]), {
    stiffness: 220,
    damping: 22,
  });
  const scale = useSpring(useTransform(hover, [0, 1], [1, zoom]), {
    stiffness: 220,
    damping: 22,
  });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleEnter = () => hover.set(1);
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
    hover.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        y,
        scale,
        transformPerspective: perspective,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(0)" }} className={innerClassName}>
        {children}
      </div>
    </motion.div>
  );
}
