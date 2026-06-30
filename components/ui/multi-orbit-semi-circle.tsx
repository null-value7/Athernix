// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { 
  Star, 
  Circle, 
  Square, 
  Triangle,
  Hexagon,
  Diamond,
  Zap,
  Sparkles,
  Sun,
  Moon,
  Cloud,
  Flame,
  Heart,
  ArrowUp
} from "lucide-react";

const ICONS = [
  { icon: Star, name: "Estrella" },
  { icon: Circle, name: "Círculo" },
  { icon: Square, name: "Cuadrado" },
  { icon: Triangle, name: "Triángulo" },
  { icon: Hexagon, name: "Hexágono" },
  { icon: Diamond, name: "Diamante" },
  { icon: Zap, name: "Energía" },
  { icon: Sparkles, name: "Brillos" },
  { icon: Sun, name: "Sol" },
  { icon: Moon, name: "Luna" },
  { icon: Cloud, name: "Nube" },
  { icon: Flame, name: "Fuego" },
  { icon: Heart, name: "Corazón" },
  { icon: ArrowUp, name: "Flecha" },
];

function SemiCircleOrbit({ radius, centerX, centerY, count, iconSize, rotationOffset = 0 }) {
  return (
    <>
      {/* Semi-circle glow background */}
      <div className="absolute inset-0 flex justify-center">
        <div
          className="
            w-[1000px] h-[1000px] rounded-full 
            bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.15),transparent_70%)]
            blur-3xl 
            -mt-40 
            pointer-events-none
            animate-pulse
          "
          style={{ zIndex: 0 }}
        />
      </div>

      {/* Orbit icons */}
      {Array.from({ length: count }).map((_, index) => {
        const angle = (index / (count - 1)) * 180 + rotationOffset;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);
        const iconData = ICONS[index % ICONS.length];
        const Icon = iconData.icon;

        // Tooltip positioning — above or below based on angle
        const tooltipAbove = angle > 90;

        return (
          <div
            key={index}
            className="absolute flex flex-col items-center group"
            style={{
              left: `${centerX + x - iconSize / 2}px`,
              top: `${centerY - y - iconSize / 2}px`,
              zIndex: 5,
            }}
          >
            <div 
              className="relative cursor-pointer transition-transform duration-200 ease-out hover:scale-110"
              style={{ minWidth: iconSize, minHeight: iconSize }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-200"></div>
              <div className="relative bg-black/80 backdrop-blur-sm rounded-full p-3 border border-orange-500/30 group-hover:border-orange-400 transition-colors duration-200">
                <Icon 
                  size={iconSize * 0.6} 
                  className="text-orange-400 group-hover:text-orange-300 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Tooltip */}
            <div
              className={`absolute ${
                tooltipAbove ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]"
              } hidden group-hover:block w-28 rounded-lg bg-black/90 backdrop-blur-sm border border-orange-500/30 px-3 py-2 text-xs text-white shadow-lg shadow-orange-500/20 text-center transition-opacity duration-200 ease-out`}
            >
              {iconData.name}
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-black/90 border border-orange-500/30 ${
                  tooltipAbove ? "top-full border-t-0 border-l-0" : "bottom-full border-b-0 border-r-0"
                }`}
              ></div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default function MultiOrbitSemiCircle() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const baseWidth = Math.min(size.width * 0.8, 700);
  const centerX = baseWidth / 2;
  const centerY = baseWidth * 0.5;

  const iconSize =
    size.width < 480
      ? Math.max(24, baseWidth * 0.05)
      : size.width < 768
      ? Math.max(28, baseWidth * 0.06)
      : Math.max(32, baseWidth * 0.07);

  return (
    <section className="py-12 relative min-h-screen w-full overflow-hidden">
      <div className="relative flex flex-col items-center text-center z-10">
        <h1 className="my-6 text-4xl font-bold lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400">
          Integraciones
        </h1>
        <p className="mb-12 max-w-2xl text-gray-300 lg:text-xl">
          Conecta tus aplicaciones favoritas a tu flujo de trabajo.
        </p>

        <div
          className="relative"
          style={{ width: baseWidth, height: baseWidth * 0.6 }}
        >
          <SemiCircleOrbit radius={baseWidth * 0.22} centerX={centerX} centerY={centerY} count={6} iconSize={iconSize} rotationOffset={0} />
          <SemiCircleOrbit radius={baseWidth * 0.36} centerX={centerX} centerY={centerY} count={8} iconSize={iconSize} rotationOffset={15} />
          <SemiCircleOrbit radius={baseWidth * 0.5} centerX={centerX} centerY={centerY} count={10} iconSize={iconSize} rotationOffset={30} />
        </div>
      </div>
    </section>
  );
}
