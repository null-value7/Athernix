'use client';

import { useState } from 'react';
import {
  Hash, Divide, ListOrdered, Percent, Variable, Type, Equal,
  Grid3x3, Square, Triangle, Angle, SquareSigma, SquareDot,
  Pi, Spline, Waves, Circle, Radar, Plus,
  Slash, TrendingUp, ArrowRight, Infinity as InfinityIcon,
  Sigma, BarChart3, Calculator, type LucideIcon,
} from 'lucide-react';
import {
  MathNode,
  MATH_NODES,
  MATH_EDGES,
  MATH_LEVEL_COLORS,
} from '@/models/mathRoadmap';

const ICON_MAP: Record<string, LucideIcon> = {
  '🔢': Hash,
  '➗': Divide,
  '📋': ListOrdered,
  '％': Percent,
  '𝑥': Variable,
  '🔤': Type,
  '＝': Equal,
  '⊞': Grid3x3,
  '📐': Triangle,
  '⬜': Square,
  '△': Triangle,
  '∠': Angle,
  '²': SquareSigma,
  '√': SquareDot,
  '∏': Pi,
  'ƒ': Spline,
  '∿': Waves,
  'θ': Circle,
  '○': Circle,
  '⊕': Plus,
  '✛': Plus,
  '╱': Slash,
  'eˣ': TrendingUp,
  '㏒': Calculator,
  '〰': Waves,
  '→': ArrowRight,
  'd/dx': Sigma,
  '∂': Sigma,
  '📈': BarChart3,
  '∫': InfinityIcon,
  '∮': InfinityIcon,
  '∬': InfinityIcon,
};

function NodeIcon({ icon, size = 14 }: { icon: string; size?: number }) {
  const IconComp = ICON_MAP[icon];
  if (IconComp) return <IconComp size={size} />;
  return <span style={{ fontSize: size }}>{icon}</span>;
}

const F_BE = "'Bebas Neue', 'Plus Jakarta Sans', sans-serif";
const F_MONO = "'Plus Jakarta Sans', monospace";

const NODE_W = 175;
const NODE_H = 66;
const COL_GAP = 245;
const ROW_GAP = 92;
const PADDING_X = 30;
const PADDING_Y = 30;

function nodePixelPos(node: MathNode) {
  return {
    x: PADDING_X + node.x * COL_GAP,
    y: PADDING_Y + (node.y - 1) * ROW_GAP,
  };
}

function buildEdgePath(
  from: { x: number; y: number },
  to: { x: number; y: number }
): string {
  const x1 = from.x + NODE_W;
  const y1 = from.y + NODE_H / 2;
  const x2 = to.x;
  const y2 = to.y + NODE_H / 2;
  const dx = x2 - x1;
  const cx1 = x1 + dx * 0.5;
  const cx2 = x2 - dx * 0.5;
  return `M ${x1} ${y1} C ${cx1} ${y1}, ${cx2} ${y2}, ${x2} ${y2}`;
}

interface MathRoadmapProps {
  onSendToChat?: (prompt: string) => void;
}

export default function MathRoadmap({ onSendToChat }: MathRoadmapProps) {
  const [selectedNode, setSelectedNode] = useState<MathNode | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const nodesById = () => {
    const map: Record<string, MathNode> = {};
    MATH_NODES.forEach((n) => (map[n.id] = n));
    return map;
  };

  const maxX = Math.max(...MATH_NODES.map((n) => n.x));
  const maxY = Math.max(...MATH_NODES.map((n) => n.y));
  const minY = Math.min(...MATH_NODES.map((n) => n.y));
  const svgWidth = PADDING_X * 2 + maxX * COL_GAP + NODE_W;
  const svgHeight = PADDING_Y * 2 + (maxY - minY) * ROW_GAP + NODE_H;

  const handleNodeClick = (node: MathNode) => {
    setSelectedNode(node);
  };

  const handleAskAther = () => {
    if (selectedNode && onSendToChat) {
      onSendToChat(selectedNode.prompt);
    }
  };

  const nMap = nodesById();

  return (
    <div className="relative w-full">
      <style>{`
        .mr-node-card {
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
        }
        .mr-node-card:hover {
          transform: translateY(-2px);
        }
        @keyframes mrPulse {
          0%, 100% { box-shadow: 0 0 8px currentColor; }
          50% { box-shadow: 0 0 20px currentColor; }
        }
        .mr-available {
          animation: mrPulse 2.5s ease-in-out infinite;
        }
        @keyframes mrFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mr-node {
          animation: mrFadeIn 0.4s ease-out backwards;
        }
        @keyframes mrEdgeDraw {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        .mr-edge {
          stroke-dasharray: 1000;
          animation: mrEdgeDraw 0.8s ease-out forwards;
        }
      `}</style>

      <div className="relative" style={{ width: svgWidth, minWidth: svgWidth, height: svgHeight }}>
        {/* SVG edges layer */}
        <svg
          width={svgWidth}
          height={svgHeight}
          className="absolute top-0 left-0 pointer-events-none"
          style={{ zIndex: 1 }}
        >
          {MATH_EDGES.map((edge, i) => {
            const from = nMap[edge.from];
            const to = nMap[edge.to];
            if (!from || !to) return null;
            const fromPos = nodePixelPos(from);
            const toPos = nodePixelPos(to);
            const path = buildEdgePath(fromPos, toPos);

            const isHovered = hoveredId === edge.from || hoveredId === edge.to;
            const isSelected = selectedNode?.id === edge.from || selectedNode?.id === edge.to;

            let strokeColor = to.color;
            let strokeWidth = 2;
            let opacity = 0.55;

            if (isHovered || isSelected) {
              opacity = 1;
              strokeWidth = 3.5;
              strokeColor = to.color;
            }

            return (
              <path
                key={`${edge.from}-${edge.to}`}
                className="mr-edge"
                d={path}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                opacity={opacity}
                style={{
                  filter: isHovered || isSelected ? `drop-shadow(0 0 8px ${strokeColor})` : `drop-shadow(0 0 3px ${strokeColor}50)`,
                  transition: 'stroke 0.2s, opacity 0.2s, stroke-width 0.2s, filter 0.2s',
                }}
              />
            );
          })}
        </svg>

        {/* Node cards layer */}
        {MATH_NODES.map((node, nodeIdx) => {
          const pos = nodePixelPos(node);
          const isSelected = selectedNode?.id === node.id;
          const isHovered = hoveredId === node.id;
          const levelColor = MATH_LEVEL_COLORS[node.level];

          const borderColor = isSelected
            ? node.color
            : isHovered
            ? `${node.color}aa`
            : `${node.color}55`;

          const bgColor = 'rgba(18,10,24,0.92)';

          const boxShadow = isSelected
            ? `0 0 24px ${node.color}50, 0 0 1px ${node.color}`
            : `0 0 12px ${node.color}20`;

          return (
            <div
              key={node.id}
              className="mr-node"
              style={{
                position: 'absolute',
                left: pos.x,
                top: pos.y,
                width: NODE_W,
                zIndex: isSelected || isHovered ? 15 : 10,
                animationDelay: `${nodeIdx * 0.035}s`,
              }}
            >
              <div
                className="mr-node-card mr-available rounded-xl border overflow-hidden cursor-pointer"
                style={{
                  width: NODE_W,
                  height: NODE_H,
                  background: bgColor,
                  borderColor,
                  boxShadow,
                  color: node.color,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '8px 10px',
                  backdropFilter: 'blur(6px)',
                }}
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Top row: icon + level */}
                <div className="flex items-center justify-between mb-1">
                  <div
                    className="flex items-center justify-center rounded-lg flex-shrink-0"
                    style={{
                      width: 22,
                      height: 22,
                      background: `${node.color}18`,
                      border: `1px solid ${node.color}40`,
                      fontSize: 11,
                      color: node.color,
                      filter: `drop-shadow(0 0 4px ${node.color}60)`,
                    }}
                  >
                    {node.icon && <NodeIcon icon={node.icon} size={11} />}
                  </div>
                  <span
                    style={{
                      fontFamily: F_MONO,
                      fontSize: 7,
                      letterSpacing: '0.12em',
                      color: levelColor,
                      textTransform: 'uppercase',
                      padding: '1px 5px',
                      borderRadius: 3,
                      background: `${levelColor}12`,
                      border: `1px solid ${levelColor}30`,
                    }}
                  >
                    {node.level}
                  </span>
                </div>

                {/* Label */}
                <div
                  style={{
                    fontFamily: F_BE,
                    fontSize: 11,
                    color: '#ede0d4',
                    letterSpacing: '0.03em',
                    lineHeight: 1.15,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {node.label}
                </div>

                {/* Branch label */}
                <div
                  style={{
                    fontFamily: F_MONO,
                    fontSize: 7,
                    letterSpacing: '0.1em',
                    color: node.optional ? '#26a69a' : `${node.color}80`,
                    marginTop: 'auto',
                    textTransform: 'uppercase',
                  }}
                >
                  {node.optional ? 'OPCIONAL' : node.branch.toUpperCase()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      {selectedNode && (
        <MathNodePanel
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          onAskAther={handleAskAther}
        />
      )}
    </div>
  );
}

function MathNodePanel({
  node,
  onClose,
  onAskAther,
}: {
  node: MathNode;
  onClose: () => void;
  onAskAther: () => void;
}) {
  const levelColor = MATH_LEVEL_COLORS[node.level];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 210,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(440px, 90vw)',
          maxHeight: '80vh',
          overflowY: 'auto',
          background: 'rgba(14,8,20,0.96)',
          border: `1px solid ${node.color}40`,
          borderRadius: 16,
          padding: 24,
          boxShadow: `0 16px 64px ${node.color}20, 0 0 1px ${node.color}30`,
          position: 'relative',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.4)',
            cursor: 'pointer',
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {/* Level + branch badges */}
        <div className="flex items-center gap-2 mb-4">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '3px 10px',
              borderRadius: 6,
              background: `${levelColor}15`,
              border: `1px solid ${levelColor}40`,
            }}
          >
            <span style={{ fontSize: 10, display: 'flex', alignItems: 'center' }}>
              <Circle size={8} fill="currentColor" />
            </span>
            <span
              style={{
                fontFamily: F_MONO,
                fontSize: 8,
                letterSpacing: '0.15em',
                color: levelColor,
              }}
            >
              {node.level.toUpperCase()}
            </span>
          </div>
          <span
            style={{
              fontFamily: F_MONO,
              fontSize: 8,
              letterSpacing: '0.15em',
              color: `${node.color}aa`,
              textTransform: 'uppercase',
            }}
          >
            RAMA_{node.branch.toUpperCase()}
          </span>
          {node.optional && (
            <span
              style={{
                fontFamily: F_MONO,
                fontSize: 8,
                letterSpacing: '0.15em',
                color: '#26a69a',
                textTransform: 'uppercase',
                padding: '3px 10px',
                borderRadius: 6,
                background: '#26a69a15',
                border: '1px solid #26a69a40',
              }}
            >
              OPCIONAL
            </span>
          )}
        </div>

        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-4">
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: `${node.color}18`,
              border: `1px solid ${node.color}50`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              color: node.color,
              flexShrink: 0,
              filter: `drop-shadow(0 0 8px ${node.color}50)`,
            }}
          >
            {node.icon && <NodeIcon icon={node.icon} size={22} />}
          </div>
          <div>
            <h3
              style={{
                fontFamily: F_BE,
                fontSize: 18,
                color: '#ede0d4',
                letterSpacing: '0.03em',
                lineHeight: 1.1,
              }}
            >
              {node.label}
            </h3>
            <span
              style={{
                fontFamily: F_MONO,
                fontSize: 9,
                color: `${node.color}80`,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              MATEMÁTICAS
            </span>
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: F_MONO,
            fontSize: 11,
            color: 'rgba(200,170,150,0.65)',
            lineHeight: 1.6,
            marginBottom: 16,
          }}
        >
          {node.desc}
        </p>

        {/* Action button */}
        <button
          onClick={onAskAther}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold tracking-wider"
          style={{
            background: `${node.color}20`,
            border: `2px solid ${node.color}50`,
            color: node.color,
            fontFamily: F_MONO,
            fontSize: 11,
            letterSpacing: '0.12em',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseMove={(e) => {
            e.currentTarget.style.background = `${node.color}30`;
            e.currentTarget.style.boxShadow = `0 0 16px ${node.color}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `${node.color}20`;
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
          </svg>
          PREGUNTAR A ATHER IA
        </button>

        {/* Scanline */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${node.color}50, transparent)`,
          }}
        />
      </div>
    </div>
  );
}
