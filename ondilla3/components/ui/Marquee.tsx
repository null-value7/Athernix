import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Marquesina infinita en CSS puro (se pausa al pasar el cursor).
 * El contenido se duplica para lograr el bucle perfecto.
 */
export default function Marquee({
  children,
  className,
  duration = 32,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  return (
    <div className={cn("marquee-mask", className)}>
      <div className="marquee-track" style={{ "--marquee-duration": `${duration}s` } as CSSProperties}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
