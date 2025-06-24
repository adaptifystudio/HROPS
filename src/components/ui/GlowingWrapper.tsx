"use client";
import React, { useEffect, useRef, useState, CSSProperties } from "react";

interface GlowingWrapperProps {
  children: React.ReactNode;
  borderSize?: number;
  borderRadius?: number;
  firstColor?: string;
  secondColor?: string;
}

export const GlowingWrapper: React.FC<GlowingWrapperProps> = ({
  children,
  borderSize = 2,
  borderRadius = 20,
  firstColor = "#ff8c00",      // 🔶 orange
  secondColor = "#ffc107",     // 🟡 yellow-orange
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      if (ref.current) {
        setDimensions({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const style: CSSProperties = {
    "--border-size": `${borderSize}px`,
    "--border-radius": `${borderRadius}px`,
    "--first-color": firstColor,
    "--second-color": secondColor,
    "--glow-width": `${dimensions.width + borderSize * 2}px`,
    "--glow-height": `${dimensions.height + borderSize * 2}px`,
    "--glow-blur": `${dimensions.width / 3}px`,
  } as CSSProperties;

  return (
    <div ref={ref} style={style} className="relative z-10">
      {/* glowing layers */}
      <div className="absolute -inset-[var(--border-size)] -z-10 rounded-[var(--border-radius)] bg-[linear-gradient(0deg,var(--first-color),var(--second-color))] blur-[var(--glow-blur)] opacity-60 animate-background-position-spin" />
      <div className="absolute -inset-[var(--border-size)] -z-20 rounded-[var(--border-radius)] bg-[linear-gradient(0deg,var(--first-color),var(--second-color))] opacity-50 animate-background-position-spin" />
      
      {children}
    </div>
  );
};
