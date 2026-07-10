"use client";

import { useRef, useEffect } from "react";

interface OrbProps {
  colors: string[];
  seed: number;
  agentState?: string | null;
}

export function Orb({ colors, seed, agentState }: OrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match container
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 10;

    let animationFrameId: number;
    let time = 0;

    const draw = () => {
      const currentWidth = canvas.width;
      const currentHeight = canvas.height;
      const currentCenterX = currentWidth / 2;
      const currentCenterY = currentHeight / 2;
      const currentRadius = Math.min(currentWidth, currentHeight) / 2 - 10;

      ctx.clearRect(0, 0, currentWidth, currentHeight);

      // Create gradient
      const gradient = ctx.createRadialGradient(
        currentCenterX, currentCenterY, 0,
        currentCenterX, currentCenterY, currentRadius
      );

      const [color1, color2] = colors;
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);

      // Draw orb with animation based on agent state
      const pulseSpeed = agentState === "listening" ? 0.15 : 
                        agentState === "talking" ? 0.25 : 0.05;
      const pulseAmount = Math.sin(time * pulseSpeed) * 8;
      
      ctx.beginPath();
      ctx.arc(currentCenterX, currentCenterY, currentRadius + pulseAmount, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Add glow effect
      ctx.shadowColor = color1;
      ctx.shadowBlur = 25 + pulseAmount * 3;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Add inner highlight
      const highlightGradient = ctx.createRadialGradient(
        currentCenterX - currentRadius * 0.3, currentCenterY - currentRadius * 0.3, 0,
        currentCenterX, currentCenterY, currentRadius
      );
      highlightGradient.addColorStop(0, "rgba(255, 255, 255, 0.4)");
      highlightGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.beginPath();
      ctx.arc(currentCenterX, currentCenterY, currentRadius + pulseAmount, 0, Math.PI * 2);
      ctx.fillStyle = highlightGradient;
      ctx.fill();

      time += 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [colors, seed, agentState]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
}
