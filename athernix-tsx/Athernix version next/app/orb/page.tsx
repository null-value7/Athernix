"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Orb } from "@/components/ui/orb";

const ORBS = [
  ["#FF6B00", "#FF006E"],
  ["#FFD700", "#00D9FF"],
  ["#FF006E", "#FF6B00"],
];

export default function OrbDemo({ small = false }) {
  const [agent, setAgent] = useState(null);
  const [selectedOrb, setSelectedOrb] = useState(0);

  const displayOrbs = small ? [ORBS[0]] : ORBS;

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#08000a] p-8">
      <div className="bg-[#08000a]/80 backdrop-blur-xl mx-auto w-full max-w-sm rounded-2xl border border-white/10 p-8 shadow-2xl sm:max-w-md md:max-w-lg">
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Agent Orbs</h3>
          <p className="text-white/50 text-sm">
            Interactive orb visualization with agent states
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="relative">
              <div className="bg-gradient-to-br from-white/10 to-white/5 relative h-40 w-40 rounded-full p-2 shadow-[0_0_40px_rgba(255,107,0,0.3),inset_0_2px_8px_rgba(0,0,0,0.3)] sm:h-48 sm:w-48">
                <div className="bg-[#08000a] h-full w-full overflow-hidden rounded-full shadow-[inset_0_0_12px_rgba(0,0,0,0.3)]">
                  <Orb 
                    colors={displayOrbs[selectedOrb]} 
                    seed={(selectedOrb + 1) * 1000} 
                    agentState={agent} 
                  />
                </div>
              </div>
            </div>
          </div>

          {!small && (
            <div className="flex flex-wrap justify-center gap-3">
              {ORBS.map((colors, index) => (
                <Button
                  key={index}
                  size="sm"
                  onClick={() => setSelectedOrb(index)}
                  className={`
                    relative overflow-hidden transition-all duration-300
                    ${selectedOrb === index 
                      ? "text-white border-0 shadow-lg shadow-orange-500/30" 
                      : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30"
                    }
                  `}
                  style={selectedOrb === index ? { 
                    background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
                    boxShadow: `0 0 30px ${colors[0]}40`
                  } : {}}
                >
                  <span className="relative z-10">Orb {index + 1}</span>
                </Button>
              ))}
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              onClick={() => setAgent(null)}
              disabled={agent === null}
              className={`
                relative overflow-hidden transition-all duration-300
                ${agent === null 
                  ? "bg-gradient-to-r from-[#FF6B00] to-[#FF006E] text-white border-0 shadow-lg shadow-orange-500/30" 
                  : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30"
                }
              `}
            >
              <span className="relative z-10">Idle</span>
            </Button>
            <Button
              size="lg"
              onClick={() => setAgent("listening")}
              disabled={agent === "listening"}
              className={`
                relative overflow-hidden transition-all duration-300
                ${agent === "listening" 
                  ? "bg-gradient-to-r from-[#FFD700] to-[#00D9FF] text-white border-0 shadow-lg shadow-yellow-500/30" 
                  : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30"
                }
              `}
            >
              <span className="relative z-10">Listening</span>
            </Button>
            <Button
              size="lg"
              disabled={agent === "talking"}
              onClick={() => setAgent("talking")}
              className={`
                relative overflow-hidden transition-all duration-300
                ${agent === "talking" 
                  ? "bg-gradient-to-r from-[#FF006E] to-[#FF6B00] text-white border-0 shadow-lg shadow-pink-500/30" 
                  : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30"
                }
              `}
            >
              <span className="relative z-10">Talking</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
