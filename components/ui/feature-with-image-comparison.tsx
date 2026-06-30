// @ts-nocheck
import { useState } from "react";
import { Badge } from "./badge";
import { GripVertical } from "lucide-react";

export default function FeatureWithImageComparison() {
  const [inset, setInset] = useState(50);
  const [onMouseDown, setOnMouseDown] = useState(false);

  const onMouseMove = (e) => {
    if (!onMouseDown) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;

    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = e.clientX - rect.left;
    }
    
    const percentage = (x / rect.width) * 100;
    setInset(percentage);
  };

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-4">
          <div>
            <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20">Plataforma</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500">
              Experiencia Inmersiva
            </h2>
            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-neutral-300">
              Explora el ecosistema Athernix con realidad virtual y aumentada.
            </p>
          </div>
          <div className="pt-12 w-full">
            <div
              className="relative aspect-video w-full h-full overflow-hidden rounded-2xl select-none"
              onMouseMove={onMouseMove}
              onMouseUp={() => setOnMouseDown(false)}
              onTouchMove={onMouseMove}
              onTouchEnd={() => setOnMouseDown(false)}
            >
              <div
                className="bg-neutral-800 h-full w-1 absolute z-20 top-0 -ml-1 select-none"
                style={{
                  left: inset + "%",
                }}
              >
                <button
                  className="bg-neutral-800 rounded hover:scale-110 transition-all w-5 h-10 select-none -translate-y-1/2 absolute top-1/2 -ml-2 z-30 cursor-ew-resize flex justify-center items-center border border-orange-500/30"
                  onTouchStart={(e) => {
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                  onMouseDown={(e) => {
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                  onTouchEnd={() => setOnMouseDown(false)}
                  onMouseUp={() => setOnMouseDown(false)}
                >
                  <GripVertical className="h-4 w-4 select-none text-orange-500" />
                </button>
              </div>
              <div
                className="absolute left-0 top-0 z-10 w-full h-full aspect-video rounded-2xl select-none border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-pink-500/20"
                style={{
                  clipPath: "inset(0 0 0 " + inset + "%)",
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🏛️</div>
                    <p className="text-orange-400 font-bold">Modo VR</p>
                  </div>
                </div>
              </div>
              <div className="absolute left-0 top-0 w-full h-full aspect-video rounded-2xl select-none border border-pink-500/20 bg-gradient-to-br from-pink-500/20 to-purple-500/20">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🌍</div>
                    <p className="text-pink-400 font-bold">Modo AR</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { FeatureWithImageComparison };
