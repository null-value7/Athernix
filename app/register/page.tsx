"use client";

import React, { useEffect } from "react";

export default function RegisterView() {
  useEffect(() => {
    // Redirigir a la página login combinada con modo register
    window.location.href = "/login?mode=register";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#08000a]">
      <p className="text-white">Redirigiendo...</p>
    </div>
  );
}