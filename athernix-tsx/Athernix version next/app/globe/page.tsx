"use client";

import { GlobeCdn } from "../../components/ui/cobe-globe-cdn";

export default function GlobeCdnDemo() {
  return (
    <div style={{ 
      width: "100vw", 
      height: "100vh", 
      backgroundColor: "#08000a", 
      overflow: "scroll", 
      position: "relative" 
    }}>
      <GlobeCdn />
    </div>
  );
}