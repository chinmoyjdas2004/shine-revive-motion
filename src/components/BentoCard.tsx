import { useRef, ReactNode } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useMousePosition } from "@/hooks/use-mouse-position";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const BentoCard = ({ children, className = "", glowColor = "var(--primary)", onClick }: BentoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { position, isHovering } = useMousePosition(cardRef);

  // Smooth spring animations for tilt
  const rotateX = useSpring(useTransform(() => position.y * -20), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(() => position.x * 20), {
    stiffness: 300,
    damping: 30,
  });

  // Glow position
  const glowX = useSpring(useTransform(() => (position.x + 0.5) * 100), {
    stiffness: 300,
    damping: 30,
  });
  const glowY = useSpring(useTransform(() => (position.y + 0.5) * 100), {
    stiffness: 300,
    damping: 30,
  });

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-3xl bg-card border border-border/50 backdrop-blur-sm transition-colors duration-500 ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      onClick={onClick}
      whileHover={{
        borderColor: "hsl(var(--primary) / 0.3)",
        boxShadow: "0 0 60px -12px hsl(var(--primary) / 0.3)",
      }}
    >
      {/* Animated Glow Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500"
        style={{
          background: useTransform(
            () =>
              `radial-gradient(600px circle at ${glowX.get()}% ${glowY.get()}%, hsl(var(--primary) / 0.15), transparent 40%)`
          ),
          opacity: isHovering ? 1 : 0,
        }}
      />

      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl"
        style={{
          background: useTransform(
            () =>
              `radial-gradient(200px circle at ${glowX.get()}% ${glowY.get()}%, hsl(var(--primary) / 0.1), transparent 50%)`
          ),
          opacity: isHovering ? 1 : 0,
        }}
      />

      {/* Content */}
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
};

export default BentoCard;
