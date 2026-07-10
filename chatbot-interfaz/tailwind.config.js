/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        'fade-in-up': 'fadeInUp 0.3s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'slide-in': 'slideIn 0.4s ease-out',
        'glitch': 'glitch 4s linear infinite',
        'signal': 'signal 3s linear infinite',
        'voice-in': 'voiceIn 0.28s ease-out',
        'voice-bg-in': 'voiceBgIn 0.25s ease-out',
        'orb-ring': 'orbRing 1.4s ease-out infinite',
        'orb-bar': 'orbBar 0.7s ease-in-out infinite',
      },
      keyframes: {
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(8px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        glowPulse: {
          "0%, 100%": {
            boxShadow: "0 0 8px rgba(192, 96, 255, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 20px rgba(192, 96, 255, 0.6)",
          },
        },
        slideIn: {
          "0%": {
            opacity: "0",
            transform: "translateX(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        glitch: {
          "0%": {
            opacity: "0.6",
            transform: "scaleX(0.4) translateX(-60%)",
          },
          "50%": {
            opacity: "1",
            transform: "scaleX(1) translateX(0%)",
          },
          "100%": {
            opacity: "0",
            transform: "scaleX(0.4) translateX(60%)",
          },
        },
        signal: {
          "to": {
            left: "120%",
          },
        },
        voiceIn: {
          "from": {
            opacity: "0",
            transform: "scale(0.96) translateY(12px)",
          },
          "to": {
            opacity: "1",
            transform: "scale(1) translateY(0)",
          },
        },
        voiceBgIn: {
          "from": {
            opacity: "0",
          },
          "to": {
            opacity: "1",
          },
        },
        orbRing: {
          "0%": {
            transform: "scale(1)",
            opacity: "0.8",
          },
          "100%": {
            transform: "scale(1.5)",
            opacity: "0",
          },
        },
        orbBar: {
          "0%, 100%": {
            height: "4px",
          },
          "50%": {
            height: "18px",
          },
        },
      },
    },
  },
  plugins: [],
};
