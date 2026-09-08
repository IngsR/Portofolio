"use client";
import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "./utils";

interface WobbleCardProps {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}

export const WobbleCard: React.FC<WobbleCardProps> = ({
  children,
  containerClassName,
  className,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.section
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1.01, 1.01, 1)`
          : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
        transition: "transform 0.15s ease-out",
      }}
      className={cn(
        "relative rounded-3xl overflow-hidden will-change-transform",
        containerClassName
      )}
    >
      <div
        className={cn(
          "relative h-full w-full",
          className
        )}
      >
        {children}
      </div>
    </motion.section>
  );
};
