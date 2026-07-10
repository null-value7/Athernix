"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import createGlobe from "cobe";

interface Marker {
  location: [number, number];
  size: number;
  name: string;
  description: string;
  info: string;
  image: string;
  flag: string;
  stats: { label: string; value: string }[];
  color?: [number, number, number];
}

const locations: Marker[] = [
  {
    location: [40.7128, -74.0060],
    size: 0.09,
    name: "Nueva York",
    description: "La Ciudad que Nunca Duerme",
    info: "Centro tecnológico y creativo del mundo occidental. Hogar de Silicon Alley y Wall Street, donde la innovación y las finanzas convergen creando un ecosistema único de oportunidades digitales.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=400&fit=crop",
    flag: "🇺🇸",
    stats: [
      { label: "Población", value: "8.4M" },
      { label: "Startups", value: "9,000+" },
      { label: "Tech Hubs", value: "25+" },
    ],
    color: [1, 0.55, 0.1],
  },
  {
    location: [35.6762, 139.6503],
    size: 0.09,
    name: "Tokio",
    description: "La Capital del Futuro",
    info: "Epicentro de innovación y cultura digital. Desde Akihabara hasta Shibuya, Tokio representa la vanguardia tecnológica fusionada con tradiciones milenarias.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=400&fit=crop",
    flag: "🇯🇵",
    stats: [
      { label: "Población", value: "37.4M" },
      { label: "Startups", value: "15,000+" },
      { label: "Tech Hubs", value: "30+" },
    ],
    color: [1, 0.3, 0.05],
  },
  {
    location: [51.5074, -0.1278],
    size: 0.09,
    name: "Londres",
    description: "Puerta de la Creatividad",
    info: "Cuna de la experiencia digital y el arte moderno. Londres combina su rica historia con una escena tech vibrante, desde Shoreditch hasta Canary Wharf.",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=400&fit=crop",
    flag: "🇬🇧",
    stats: [
      { label: "Población", value: "9.0M" },
      { label: "Startups", value: "12,000+" },
      { label: "Tech Hubs", value: "20+" },
    ],
    color: [1, 0.65, 0.15],
  },
  {
    location: [-33.8688, 151.2093],
    size: 0.09,
    name: "Sídney",
    description: "Horizonte del Pacífico",
    info: "Ventana hacia nuevas perspectivas y experiencias. El hub tecnológico del hemisferio sur, donde la creatividad florece entre playas icónicas y arquitectura futurista.",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=400&fit=crop",
    flag: "🇦🇺",
    stats: [
      { label: "Población", value: "5.3M" },
      { label: "Startups", value: "5,000+" },
      { label: "Tech Hubs", value: "15+" },
    ],
    color: [1, 0.75, 0.2],
  },
  {
    location: [52.5200, 13.4050],
    size: 0.09,
    name: "Berlín",
    description: "Alma de la Creatividad",
    info: "Punto de encuentro de culturas y expresiones artísticas. Berlín es el epicentro europeo de startups, arte digital y movimientos contraculturales.",
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&h=400&fit=crop",
    flag: "🇩🇪",
    stats: [
      { label: "Población", value: "3.6M" },
      { label: "Startups", value: "7,000+" },
      { label: "Tech Hubs", value: "18+" },
    ],
    color: [1, 0.7, 0.1],
  },
  {
    location: [25.2048, 55.2708],
    size: 0.09,
    name: "Dubái",
    description: "Oasis del Futuro",
    info: "Donde la imaginación se construye en el desierto. Dubái representa la ambición humana llevada al límite, con proyectos que desafían las leyes de la física y la arquitectura.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=400&fit=crop",
    flag: "🇦🇪",
    stats: [
      { label: "Población", value: "3.3M" },
      { label: "Startups", value: "3,000+" },
      { label: "Tech Hubs", value: "10+" },
    ],
    color: [1, 0.45, 0.05],
  },
  {
    location: [19.4326, -99.1332],
    size: 0.09,
    name: "Ciudad de México",
    description: "Corazón Latinoamericano",
    info: "Una de las metrópolis más grandes del continente, mezcla milenaria de culturas prehispánicas con un ecosistema tech en plena expansión y una escena creativa imparable.",
    image: "https://images.unsplash.com/photo-1518659526054-190340b28dc9?w=800&h=400&fit=crop",
    flag: "🇲🇽",
    stats: [
      { label: "Población", value: "22.0M" },
      { label: "Startups", value: "6,500+" },
      { label: "Tech Hubs", value: "14+" },
    ],
    color: [1, 0.5, 0.08],
  },
  {
    location: [1.3521, 103.8198],
    size: 0.09,
    name: "Singapur",
    description: "Puerta de Asia",
    info: "Ciudad-estado futurista y uno de los principales hubs financieros y tecnológicos del sudeste asiático, con una infraestructura digital de vanguardia.",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=400&fit=crop",
    flag: "🇸🇬",
    stats: [
      { label: "Población", value: "5.9M" },
      { label: "Startups", value: "4,500+" },
      { label: "Tech Hubs", value: "12+" },
    ],
    color: [1, 0.6, 0.12],
  },
  {
    location: [-23.5505, -46.6333],
    size: 0.09,
    name: "São Paulo",
    description: "Motor de Sudamérica",
    info: "La ciudad más poblada del hemisferio sur y el mayor centro financiero y de startups de Latinoamérica, con una vibrante escena cultural y gastronómica.",
    image: "https://images.unsplash.com/photo-1543059080-f9b1272213d5?w=800&h=400&fit=crop",
    flag: "🇧🇷",
    stats: [
      { label: "Población", value: "12.3M" },
      { label: "Startups", value: "8,000+" },
      { label: "Tech Hubs", value: "16+" },
    ],
    color: [1, 0.35, 0.05],
  },
  {
    location: [55.7558, 37.6173],
    size: 0.09,
    name: "Moscú",
    description: "Cruce entre Europa y Asia",
    info: "Capital histórica que combina arquitectura monumental con un creciente ecosistema de innovación digital y desarrollo de software.",
    image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&h=400&fit=crop",
    flag: "🇷🇺",
    stats: [
      { label: "Población", value: "12.6M" },
      { label: "Startups", value: "5,000+" },
      { label: "Tech Hubs", value: "13+" },
    ],
    color: [1, 0.42, 0.06],
  },
  {
    location: [28.6139, 77.2090],
    size: 0.09,
    name: "Nueva Delhi",
    description: "Pulso Digital de la India",
    info: "Capital de uno de los ecosistemas tech de más rápido crecimiento del mundo, con millones de desarrolladores y una industria de software en auge.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=400&fit=crop",
    flag: "🇮🇳",
    stats: [
      { label: "Población", value: "32.9M" },
      { label: "Startups", value: "20,000+" },
      { label: "Tech Hubs", value: "22+" },
    ],
    color: [1, 0.58, 0.1],
  },
  {
    location: [37.5665, 126.9780],
    size: 0.09,
    name: "Seúl",
    description: "Innovación al Máximo Nivel",
    info: "Capital surcoreana reconocida mundialmente por su conectividad, cultura pop digital y liderazgo en tecnología de consumo y videojuegos.",
    image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=400&fit=crop",
    flag: "🇰🇷",
    stats: [
      { label: "Población", value: "9.7M" },
      { label: "Startups", value: "10,000+" },
      { label: "Tech Hubs", value: "19+" },
    ],
    color: [1, 0.48, 0.07],
  },
  {
    location: [30.0444, 31.2357],
    size: 0.09,
    name: "El Cairo",
    description: "Cuna de Civilizaciones",
    info: "Puerta de entrada al continente africano en materia digital, con un ecosistema de startups en rápido crecimiento junto a milenios de historia.",
    image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&h=400&fit=crop",
    flag: "🇪🇬",
    stats: [
      { label: "Población", value: "10.0M" },
      { label: "Startups", value: "2,500+" },
      { label: "Tech Hubs", value: "8+" },
    ],
    color: [1, 0.53, 0.09],
  },
  {
    location: [-34.6037, -58.3816],
    size: 0.09,
    name: "Buenos Aires",
    description: "Alma Creativa del Sur",
    info: "Ciudad de fuerte identidad cultural y una de las capitales tecnológicas más dinámicas de Latinoamérica, cuna de varios unicornios digitales.",
    image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&h=400&fit=crop",
    flag: "🇦🇷",
    stats: [
      { label: "Población", value: "15.2M" },
      { label: "Startups", value: "4,000+" },
      { label: "Tech Hubs", value: "11+" },
    ],
    color: [1, 0.62, 0.14],
  },
];

export function GlobeCdn() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [isVirtualizing, setIsVirtualizing] = useState(false);
  const globeRef = useRef<any>(null);
  const animationFrameRef = useRef<number>();
  const clickTimeoutRef = useRef<NodeJS.Timeout>();
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const markerIconRefs = useRef<(HTMLDivElement | null)[]>([]);

  const currentPhiRef = useRef(0);
  const currentThetaRef = useRef(0);
  const targetPhiRef = useRef(0);
  const targetThetaRef = useRef(0);
  const currentZoomRef = useRef(1);
  const targetZoomRef = useRef(1);
  const isAnimatingRef = useRef(false);
  const autoRotateRef = useRef(true);

  const handleCanvasClick = useCallback((event: MouseEvent) => {
    if (isAnimatingRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const phi = currentPhiRef.current;
    const theta = currentThetaRef.current;

    let closestMarker: Marker | null = null;
    let closestDistance = 0.15;

    locations.forEach((marker) => {
      const [lat, lon] = marker.location;
      const latRad = (lat * Math.PI) / 180;
      const lonRad = (lon * Math.PI) / 180;

      const mx = Math.cos(latRad) * Math.sin(lonRad - phi);
      const my =
        Math.sin(latRad) * Math.cos(theta) -
        Math.cos(latRad) * Math.sin(theta) * Math.cos(lonRad - phi);
      const mz =
        Math.sin(latRad) * Math.sin(theta) +
        Math.cos(latRad) * Math.cos(theta) * Math.cos(lonRad - phi);

      if (mz > 0) {
        const projX = mx / (2 + mz);
        const projY = my / (2 + mz);
        const distance = Math.sqrt((projX - x) ** 2 + (projY - y) ** 2);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestMarker = marker;
        }
      }
    });

    if (closestMarker) {
      handleMarkerClick(closestMarker);
    }
  }, []);

  const updateMarkerIcons = useCallback((phi: number, theta: number, scale: number) => {
    const container = globeContainerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    locations.forEach((marker, i) => {
      const el = markerIconRefs.current[i];
      if (!el) return;

      const [lat, lon] = marker.location;
      const latRad = (lat * Math.PI) / 180;
      const lonRad = (lon * Math.PI) / 180;

      const mx = Math.cos(latRad) * Math.sin(lonRad - phi);
      const my =
        Math.sin(latRad) * Math.cos(theta) -
        Math.cos(latRad) * Math.sin(theta) * Math.cos(lonRad - phi);
      const mz =
        Math.sin(latRad) * Math.sin(theta) +
        Math.cos(latRad) * Math.cos(theta) * Math.cos(lonRad - phi);

      // Solo mostrar el icono si el punto está mirando hacia la cámara
      // y suficientemente centrado (no en el borde/perfil del globo)
      if (mz > 0.15) {
        const projX = (mx / (2 + mz)) * scale;
        const projY = (my / (2 + mz)) * scale;

        const px = w / 2 + projX * (w / 2);
        const py = h / 2 - projY * (h / 2);

        // Un poco de fade cerca del borde del globo
        const edgeFade = Math.min(1, (mz - 0.15) / 0.25);

        el.style.transform = `translate(${px}px, ${py}px) translate(-50%, -100%)`;
        el.style.opacity = String(edgeFade);
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    });
  }, []);

  useEffect(() => {
    let phi = 0;
    let theta = 0.3;

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: 1000 * 2,
      height: 1000 * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 28000,
      mapBrightness: 7,
      baseColor: [0.35, 0.14, 0.04],
      // Marcadores resaltados: color y brillo más intensos por defecto
      markerColor: [1, 0.65, 0.15],
      glowColor: [1, 0.45, 0.08],
      markers: locations.map((m) => ({
        location: m.location,
        // tamaño aumentado para que resalten más sobre el globo
        size: m.size * 1.6,
        color: m.color || [1, 0.65, 0.15],
      })),
      onRender: (state) => {
        currentPhiRef.current = state.phi;
        currentThetaRef.current = state.theta;
        currentZoomRef.current = state.scale || 1;
      },
    });

    globeRef.current = globe;
    targetPhiRef.current = 0;
    targetThetaRef.current = 0.3;
    currentZoomRef.current = 1;
    targetZoomRef.current = 1;
    isAnimatingRef.current = false;
    autoRotateRef.current = true;

    const animate = () => {
      if (autoRotateRef.current && !isAnimatingRef.current) {
        phi += 0.002;
        targetPhiRef.current = phi;
      } else if (isAnimatingRef.current) {
        const lerpFactor = 0.06;
        phi += (targetPhiRef.current - phi) * lerpFactor;
        theta += (targetThetaRef.current - theta) * lerpFactor;
        currentZoomRef.current +=
          (targetZoomRef.current - currentZoomRef.current) * lerpFactor;

        const phiDiff = Math.abs(targetPhiRef.current - phi);
        const thetaDiff = Math.abs(targetThetaRef.current - theta);
        const zoomDiff = Math.abs(targetZoomRef.current - currentZoomRef.current);

        if (phiDiff < 0.005 && thetaDiff < 0.005 && zoomDiff < 0.005) {
          isAnimatingRef.current = false;
          setIsAnimating(false);

          if (targetZoomRef.current > 1) {
            if (clickTimeoutRef.current) {
              clearTimeout(clickTimeoutRef.current);
            }
            clickTimeoutRef.current = setTimeout(() => {
              setShowModal(true);
            }, 400);
          } else {
            autoRotateRef.current = true;
            setIsZoomedIn(false);
          }
        }
      }

      globe.update({
        phi,
        theta,
        scale: currentZoomRef.current,
      });

      updateMarkerIcons(phi, theta, currentZoomRef.current);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("click", handleCanvasClick);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      if (canvas) {
        canvas.removeEventListener("click", handleCanvasClick);
      }
      globe.destroy();
    };
  }, [handleCanvasClick]);

  const handleMarkerClick = useCallback((marker: Marker) => {
    const [lat, lon] = marker.location;

    const targetPhi = (lon * Math.PI) / 180;
    const targetTheta = (lat * Math.PI) / 180;

    targetPhiRef.current = targetPhi;
    targetThetaRef.current = targetTheta;
    targetZoomRef.current = 2.2;

    autoRotateRef.current = false;
    isAnimatingRef.current = true;
    setSelectedMarker(marker);
    setIsAnimating(true);
    setIsZoomedIn(true);
    setShowModal(false);
    setIsClosing(false);
    setIsVirtualizing(false);
  }, []);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    setIsVirtualizing(false);

    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
    }, 500);
  }, []);

  const zoomOut = useCallback(() => {
    setIsClosing(true);
    setIsVirtualizing(false);

    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
      setSelectedMarker(null);

      targetZoomRef.current = 1;
      targetThetaRef.current = 0.3;
      isAnimatingRef.current = true;
      setIsAnimating(true);
    }, showModal ? 500 : 0);
  }, [showModal]);

  const handleStartVirtualization = useCallback(() => {
    if (!selectedMarker) return;
    setIsVirtualizing(true);
    // Punto de enganche: aquí se puede disparar la lógica real de
    // virtualización (navegación, API call, etc.) usando selectedMarker.
  }, [selectedMarker]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#0a0005",
      }}
    >
      {/* Fondos animados */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <div
          className="gc-bg-pulse"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(900px, 100vw)",
            height: "min(900px, 100vw)",
            borderRadius: "9999px",
            filter: "blur(120px)",
            background:
              "linear-gradient(90deg, rgba(127,29,29,0.3), rgba(124,45,18,0.25), rgba(113,63,18,0.3))",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(67,20,7,0.3), rgba(69,10,10,0.2), transparent)",
          }}
        />
      </div>

      {/* Contenedor del Globo — SIEMPRE cuadrado */}
      <div
        ref={globeContainerRef}
        style={{
          position: "relative",
          width: "min(100vw, 100vh)",
          height: "min(100vw, 100vh)",
          zIndex: 1,
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            cursor: isAnimating ? "default" : "pointer",
          }}
        />

        {/* Íconos de ubicación sobre cada punto clickeable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          {locations.map((marker, i) => (
            <div
              key={marker.name}
              ref={(el) => (markerIconRefs.current[i] = el)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                display: "none",
                transition: "opacity 0.15s ease",
                pointerEvents: "none",
              }}
            >
              <div
                className="gc-pin-float"
                style={{
                  transform: "translateY(-6px)",
                  filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.5))",
                }}
              >
                <svg
                  width="20"
                  height="24"
                  viewBox="0 0 24 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 0C5.9 0 1 4.9 1 11c0 8.25 11 17 11 17s11-8.75 11-17c0-6.1-4.9-11-11-11z"
                    fill="url(#gc-pin-gradient)"
                    stroke="#fff7ed"
                    strokeWidth="1"
                  />
                  <circle cx="12" cy="11" r="4" fill="#1c0a02" />
                  <defs>
                    <linearGradient id="gc-pin-gradient" x1="0" y1="0" x2="24" y2="28" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#facc15" />
                      <stop offset="0.5" stopColor="#f97316" />
                      <stop offset="1" stopColor="#dc2626" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {isAnimating && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div style={{ position: "relative", width: 80, height: 80 }}>
              <div
                className="gc-spin"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "9999px",
                  border: "4px solid rgba(249,115,22,0.2)",
                  borderTopColor: "#f97316",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  className="gc-ping"
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "9999px",
                    background: "#f97316",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Botón de retroceder zoom */}
      {(isZoomedIn || selectedMarker) && (
        <button
          onClick={zoomOut}
          aria-label="Alejar zoom"
          className="gc-close-btn"
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            zIndex: 60,
            width: 46,
            height: 46,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "9999px",
            border: "1px solid rgba(249,115,22,0.4)",
            background: "rgba(0,0,0,0.5)",
            color: "#fdba74",
            cursor: "pointer",
            backdropFilter: "blur(4px)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
        </button>
      )}

      {/* Modal Holograma */}
      {showModal && selectedMarker && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: 16,
          }}
        >
          <div
            onClick={closeModal}
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.9), rgba(67,20,7,0.8), rgba(0,0,0,0.9))",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              transition: "opacity 0.5s ease",
              opacity: isClosing ? 0 : 1,
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="gc-particle"
                style={{
                  position: "absolute",
                  width: 4,
                  height: 4,
                  borderRadius: "9999px",
                  background: "rgba(249,115,22,0.3)",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 1024,
              transition: "all 0.5s ease",
              transform: isClosing
                ? "scale(0.95) translateY(10px)"
                : "scale(1) translateY(0)",
              opacity: isClosing ? 0 : 1,
            }}
          >
            <div
              className="gc-frame-pulse"
              style={{
                position: "absolute",
                inset: -8,
                borderRadius: 32,
                background:
                  "linear-gradient(90deg, #ca8a04, #ea580c, #dc2626)",
                opacity: 0.75,
                filter: "blur(20px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: -4,
                borderRadius: 32,
                background:
                  "linear-gradient(90deg, rgba(249,115,22,0.5), rgba(239,68,68,0.5), rgba(234,179,8,0.5))",
                filter: "blur(8px)",
              }}
            />

            <div
              style={{
                position: "relative",
                background:
                  "linear-gradient(135deg, rgba(3,7,18,0.95), rgba(17,24,39,0.98), rgba(0,0,0,0.95))",
                border: "2px solid rgba(249,115,22,0.3)",
                borderRadius: 32,
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6)",
                overflow: "hidden",
                backdropFilter: "blur(4px)",
              }}
            >
              <button
                onClick={closeModal}
                aria-label="Cerrar"
                className="gc-close-btn"
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  zIndex: 30,
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "9999px",
                  border: "1px solid rgba(249,115,22,0.4)",
                  background: "rgba(0,0,0,0.4)",
                  color: "#fdba74",
                  cursor: "pointer",
                  backdropFilter: "blur(4px)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {[
                { top: 0, left: 0, borderWidth: "4px 0 0 4px", borderRadius: "16px 0 0 0" },
                { top: 0, right: 0, borderWidth: "4px 4px 0 0", borderRadius: "0 16px 0 0" },
                { bottom: 0, left: 0, borderWidth: "0 0 4px 4px", borderRadius: "0 0 0 16px" },
                { bottom: 0, right: 0, borderWidth: "0 4px 4px 0", borderRadius: "0 0 16px 0" },
              ].map((pos, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: 64,
                    height: 64,
                    borderStyle: "solid",
                    borderColor: "rgba(249,115,22,0.6)",
                    pointerEvents: "none",
                    ...pos,
                  }}
                />
              ))}

              <div
                className="gc-scanline"
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: 2,
                  background:
                    "linear-gradient(90deg, transparent, #fdba74, transparent)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                }}
                className="gc-modal-grid"
              >
                <div
                  style={{
                    position: "relative",
                    minHeight: 320,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(90deg, rgba(234,88,12,0.2), rgba(220,38,38,0.2))",
                      zIndex: 1,
                    }}
                  />
                  <img
                    src={selectedMarker.image}
                    alt={selectedMarker.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      inset: 0,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: 32,
                      zIndex: 3,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.85), transparent 70%)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 8,
                      }}
                    >
                      <span style={{ fontSize: 36 }}>{selectedMarker.flag}</span>
                      <h2
                        style={{
                          fontSize: 42,
                          fontWeight: 900,
                          color: "white",
                          margin: 0,
                          textShadow: "0 2px 12px rgba(0,0,0,0.6)",
                        }}
                      >
                        {selectedMarker.name}
                      </h2>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div
                        className="gc-dot-pulse"
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "9999px",
                          background: "#f97316",
                        }}
                      />
                      <p
                        style={{
                          color: "#fdba74",
                          fontSize: 18,
                          fontWeight: 300,
                          letterSpacing: 1,
                          margin: 0,
                        }}
                      >
                        {selectedMarker.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: 32,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 12,
                      marginBottom: 28,
                    }}
                  >
                    {selectedMarker.stats.map((stat, index) => (
                      <div
                        key={index}
                        style={{
                          background: "rgba(249,115,22,0.05)",
                          border: "1px solid rgba(249,115,22,0.2)",
                          borderRadius: 12,
                          padding: 14,
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 22,
                            fontWeight: 900,
                            background:
                              "linear-gradient(90deg, #facc15, #f97316)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {stat.value}
                        </div>
                        <div
                          style={{
                            color: "rgba(253,186,116,0.7)",
                            fontSize: 11,
                            fontWeight: 500,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                            marginTop: 4,
                          }}
                        >
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      background: "rgba(249,115,22,0.05)",
                      border: "1px solid rgba(249,115,22,0.2)",
                      borderRadius: 12,
                      padding: 24,
                      position: "relative",
                      overflow: "hidden",
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 4,
                        height: "100%",
                        background:
                          "linear-gradient(180deg, #eab308, #f97316, #dc2626)",
                      }}
                    />
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background:
                            "linear-gradient(135deg, #eab308, #ea580c)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          boxShadow: "0 8px 20px rgba(249,115,22,0.2)",
                        }}
                      >
                        <span style={{ fontSize: 18 }}>💡</span>
                      </div>
                      <p
                        style={{
                          color: "#d1d5db",
                          lineHeight: 1.7,
                          fontSize: 17,
                          margin: 0,
                        }}
                      >
                        {selectedMarker.info}
                      </p>
                    </div>
                  </div>

                  {/* Botón Iniciar Virtualización */}
                  <button
                    onClick={handleStartVirtualization}
                    disabled={isVirtualizing}
                    className="gc-virtualize-btn"
                    style={{
                      width: "100%",
                      padding: "16px 24px",
                      borderRadius: 14,
                      border: "1px solid rgba(249,115,22,0.5)",
                      background: isVirtualizing
                        ? "linear-gradient(90deg, rgba(234,179,8,0.3), rgba(220,38,38,0.3))"
                        : "linear-gradient(90deg, #eab308, #f97316, #dc2626)",
                      color: "white",
                      fontSize: 16,
                      fontWeight: 800,
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                      cursor: isVirtualizing ? "default" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      boxShadow: "0 10px 30px rgba(249,115,22,0.35)",
                      transition: "transform 0.15s ease, box-shadow 0.15s ease",
                    }}
                  >
                    {isVirtualizing ? (
                      <>
                        <div
                          className="gc-spin"
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: "9999px",
                            border: "3px solid rgba(255,255,255,0.3)",
                            borderTopColor: "#fff",
                          }}
                        />
                        Virtualizando…
                      </>
                    ) : (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        Iniciar Virtualización
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: 32,
                  right: 32,
                  display: "flex",
                  justifyContent: "space-between",
                  color: "rgba(249,115,22,0.3)",
                  fontSize: 11,
                  fontFamily: "monospace",
                  letterSpacing: 1,
                  pointerEvents: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span>
                    COORD: {selectedMarker.location[0].toFixed(4)}°N,{" "}
                    {selectedMarker.location[1].toFixed(4)}°E
                  </span>
                  <div
                    className="gc-dot-pulse"
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "9999px",
                      background: "#22c55e",
                    }}
                  />
                  <span>SYS::ONLINE</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span>NODE::ACTIVE</span>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="gc-bar-pulse"
                        style={{
                          width: 4,
                          height: 12,
                          borderRadius: "9999px",
                          background: "rgba(249,115,22,0.5)",
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes gc-pulse-anim {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        .gc-bg-pulse,
        .gc-frame-pulse,
        .gc-dot-pulse,
        .gc-bar-pulse {
          animation: gc-pulse-anim 2.5s ease-in-out infinite;
        }

        @keyframes gc-spin-anim {
          to {
            transform: rotate(360deg);
          }
        }
        .gc-spin {
          animation: gc-spin-anim 1s linear infinite;
        }

        @keyframes gc-ping-anim {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%,
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        .gc-ping {
          animation: gc-ping-anim 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes gc-float-anim {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) scale(1.5);
            opacity: 0.6;
          }
        }
        .gc-particle {
          animation-name: gc-float-anim;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes gc-scan-anim {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        .gc-scanline {
          animation: gc-scan-anim 3.5s ease-in-out infinite;
        }

        @keyframes gc-pin-float-anim {
          0%,
          100% {
            transform: translateY(-6px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .gc-pin-float {
          animation: gc-pin-float-anim 1.8s ease-in-out infinite;
        }

        .gc-close-btn:hover {
          background: rgba(249, 115, 22, 0.2) !important;
          border-color: rgba(249, 115, 22, 0.7) !important;
        }

        .gc-virtualize-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(249, 115, 22, 0.5);
        }

        .gc-modal-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .gc-modal-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}