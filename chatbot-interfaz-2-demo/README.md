# AI Chatbot with 3D Robot - Next.js Integration

This project integrates a React component bundle featuring an interactive AI chatbot with a 3D animated robot visualization into a Next.js application.

## Features

- Interactive chat interface with AI assistant
- 3D animated robot using Three.js and React Three Fiber
- Smooth animations with Framer Motion
- Modern UI with shadcn/ui components
- Dark mode support
- Responsive design

## Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Three.js helpers for React
- **Framer Motion** - Animations
- **Radix UI** - Accessible UI components
- **Lucide React** - Icons

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles with Tailwind CSS variables
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main chatbot component
├── components/
│   └── ui/
│       ├── avatar.tsx       # Avatar component
│       ├── button.tsx       # Button component
│       ├── card.tsx         # Card component
│       ├── input.tsx        # Input component
│       └── scroll-area.tsx  # Scroll area component
├── lib/
│   └── utils.ts             # Utility functions (cn helper)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── postcss.config.js
```

## Component Overview

### Main Component (app/page.tsx)
- `ChatbotWith3D` - Main chatbot component with 3D robot
- `AnimatedRobot` - 3D robot with animations
- `Scene` - Three.js scene setup

### UI Components (components/ui/)
- Reusable shadcn/ui components adapted for this project
- All components use the "use client" directive for Next.js compatibility

### Styling
- Tailwind CSS v3 with custom CSS variables for theming
- Light and dark mode support
- Custom animations and transitions

## Customization

### Modify Colors
Edit the CSS variables in `app/globals.css` to customize the color scheme.

### Modify Robot Appearance
Edit the `AnimatedRobot` component in `app/page.tsx` to change the robot's appearance and animations.

### Add Bot Responses
Modify the `botResponses` array in the `handleSendMessage` function to customize bot responses.

## Build for Production

```bash
npm run build
npm start
```

## Notes

- The 3D robot is only visible on larger screens (lg breakpoint and above)
- The chatbot uses simulated responses - integrate with an actual AI API for real functionality
- All components are client-side rendered due to Three.js requirements
