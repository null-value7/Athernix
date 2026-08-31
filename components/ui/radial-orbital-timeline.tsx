// @ts-nocheck
"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap, Sparkles } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export default function RadialOrbitalTimeline({
  timelineData,
}) {
  const [expandedItems, setExpandedItems] = useState({});
  const [viewMode, setViewMode] = useState("orbital");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [centerOffset, setCenterOffset] = useState({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState(null);
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId) => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "completed":
        return "text-white bg-orange-500 border-orange-500";
      case "in-progress":
        return "text-black bg-pink-500 border-pink-500";
      case "pending":
        return "text-white bg-black/40 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden relative"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-pink-500/5 to-purple-500/5 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "1s" }}></div>

      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Center node with enhanced styling */}
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 animate-pulse flex items-center justify-center z-10 shadow-2xl shadow-orange-500/50">
            <div className="absolute w-24 h-24 rounded-full border-2 border-orange-500/30 animate-ping opacity-70"></div>
            <div
              className="absolute w-32 h-32 rounded-full border border-pink-500/20 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-orange-500" />
            </div>
          </div>

          {/* Orbital rings */}
          <div className="absolute w-96 h-96 rounded-full border border-orange-500/20 shadow-lg shadow-orange-500/10"></div>
          <div className="absolute w-[500px] h-[500px] rounded-full border border-pink-500/10 shadow-lg shadow-pink-500/5"></div>
          <div className="absolute w-[600px] h-[600px] rounded-full border border-purple-500/5"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,107,0,0.3) 0%, rgba(255,0,110,0) 70%)`,
                    width: `${item.energy * 0.5 + 50}px`,
                    height: `${item.energy * 0.5 + 50}px`,
                    left: `-${(item.energy * 0.5 + 50 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 50 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-gradient-to-br from-orange-500 to-pink-500 text-white"
                      : isRelated
                      ? "bg-gradient-to-br from-pink-500/50 to-purple-500/50 text-white"
                      : "bg-gradient-to-br from-black/80 to-black/60 text-white"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-orange-400 shadow-2xl shadow-orange-500/50"
                      : isRelated
                      ? "border-pink-400 shadow-lg shadow-pink-500/30 animate-pulse"
                      : "border-white/30 shadow-lg shadow-white/10"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                `}
                >
                  <Icon size={18} />
                </div>

                <div
                  className={`
                  absolute top-14  whitespace-nowrap
                  text-xs font-bold tracking-wider
                  transition-all duration-300
                  ${
                    isExpanded 
                      ? "text-white scale-125 drop-shadow-lg" 
                      : isRelated 
                      ? "text-pink-300 scale-110" 
                      : "text-white/60"
                  }
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-24 left-1/2 -translate-x-1/2 w-72 bg-gradient-to-br from-black/95 via-black/90 to-black/85 backdrop-blur-xl border-orange-500/40 shadow-2xl shadow-orange-500/20 overflow-visible">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gradient-to-b from-orange-500 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-pink-500/5 pointer-events-none"></div>
                    <CardHeader className="pb-3 relative z-10">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-3 py-1 text-xs font-bold border-2 ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status === "completed"
                            ? "COMPLETO"
                            : item.status === "in-progress"
                            ? "EN PROGRESO"
                            : "PENDIENTE"}
                        </Badge>
                        <span className="text-xs font-mono text-orange-400">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-base mt-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/90 relative z-10">
                      <p className="leading-relaxed">{item.content}</p>

                      <div className="mt-5 pt-4 border-t border-orange-500/20">
                        <div className="flex justify-between items-center text-xs mb-2">
                          <span className="flex items-center text-orange-400 font-semibold">
                            <Zap size={12} className="mr-2" />
                            Nivel de Energía
                          </span>
                          <span className="font-mono text-pink-400 font-bold">{item.energy}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-full shadow-lg shadow-orange-500/50"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-orange-500/20">
                          <div className="flex items-center mb-3">
                            <Link size={12} className="text-orange-400 mr-2" />
                            <h4 className="text-xs uppercase tracking-wider font-bold text-orange-400">
                              Nodos Conectados
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-8 px-3 py-0 text-xs rounded-full border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-pink-500/10 hover:from-orange-500/20 hover:to-pink-500/20 text-white/90 hover:text-white transition-all shadow-lg shadow-orange-500/20"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={10}
                                    className="ml-2 text-orange-400"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
