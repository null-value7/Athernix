'use client';

import { useState } from 'react';
import {
  QuantumNode,
  QUANTUM_NODES,
  QUANTUM_EDGES,
  BRANCH_COLORS,
  STATUS_CONFIG,
} from '@/models/quantumRoadmap';

const F_BE = "'Bebas Neue', 'Plus Jakarta Sans', sans-serif";
const F_MONO = "'Plus Jakarta Sans', monospace";

const NODE_W = 170;
const NODE_H = 64;
const COL_GAP = 230;
const ROW_GAP = 88;
const PADDING_X = 30;
const PADDING_Y = 30;

function nodePixelPos(node: QuantumNode) {
  return {
    x: PADDING_X + node.x * COL_GAP,
    y: PADDING_Y + node.y * ROW_GAP,
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

interface QuantumRoadmapProps {
  onSendToChat?: (prompt: string) => void;
}

export default function QuantumRoadmap({ onSendToChat }: QuantumRoadmapProps) {
  const [selectedNode, setSelectedNode] = useState<QuantumNode | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const nodesById = () => {
    const map: Record<string, QuantumNode> = {};
    QUANTUM_NODES.forEach((n) => (map[n.id] = n));
    return map;
  };

  const maxX = Math.max(...QUANTUM_NODES.map((n) => n.x));
  const maxY = Math.max(...QUANTUM_NODES.map((n) => n.y));
  const minY = Math.min(...QUANTUM_NODES.map((n) => n.y));
  const svgWidth = PADDING_X * 2 + maxX * COL_GAP + NODE_W;
  const svgHeight = PADDING_Y * 2 + (maxY - minY) * ROW_GAP + NODE_H;

  // No GSAP entrance animation — CSS handles fade-in to avoid opacity:0 getting stuck

  const handleNodeClick = (node: QuantumNode) => {
    if (node.status === 'locked') {
      setSelectedNode(node);
      return;
    }
    setSelectedNode(node);
  };

  const handleAskAther = () => {
    if (selectedNode && onSendToChat) {
      onSendToChat(selectedNode.prompt);
    }
  };

  const nMap = nodesById();

  return (
    <div className="relative w-full overflow-x-auto">
      <style>{`
        .qr-node-card {
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
        }
        .qr-node-card:hover {
          transform: translateY(-2px);
        }
        @keyframes qrPulse {
          0%, 100% { box-shadow: 0 0 8px currentColor; }
          50% { box-shadow: 0 0 20px currentColor; }
        }
        .qr-available {
          animation: qrPulse 2.5s ease-in-out infinite;
        }
        @keyframes qrFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .qr-node {
          animation: qrFadeIn 0.4s ease-out backwards;
        }
        @keyframes qrEdgeDraw {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        .qr-edge {
          stroke-dasharray: 1000;
          animation: qrEdgeDraw 0.8s ease-out forwards;
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
          {QUANTUM_EDGES.map((edge, i) => {
            const from = nMap[edge.from];
            const to = nMap[edge.to];
            if (!from || !to) return null;
            const fromPos = nodePixelPos(from);
            const toPos = nodePixelPos(to);
            const path = buildEdgePath(fromPos, toPos);

            const isFromCompleted = from.status === 'completed';
            const isToAvailable = to.status === 'available';
            const isToCompleted = to.status === 'completed';
            const isHovered = hoveredId === edge.from || hoveredId === edge.to;
            const isSelected = selectedNode?.id === edge.from || selectedNode?.id === edge.to;

            let strokeColor = 'rgba(80,80,80,0.3)';
            let strokeWidth = 1.5;
            let opacity = 0.5;

            if (isFromCompleted && isToCompleted) {
              strokeColor = '#00E5A0';
              opacity = 0.7;
              strokeWidth = 2;
            } else if (isFromCompleted && isToAvailable) {
              strokeColor = '#FFD700';
              opacity = 0.8;
              strokeWidth = 2.5;
            } else if (isFromCompleted) {
              strokeColor = 'rgba(255,107,0,0.4)';
              opacity = 0.5;
              strokeWidth = 1.5;
            }

            if (isHovered || isSelected) {
              opacity = 1;
              strokeWidth = 3;
              strokeColor = to.color;
            }

            return (
              <path
                key={`${edge.from}-${edge.to}`}
                className="qr-edge"
                d={path}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                opacity={opacity}
                style={{
                  filter: isHovered || isSelected ? `drop-shadow(0 0 6px ${strokeColor})` : 'none',
                  transition: 'stroke 0.2s, opacity 0.2s, stroke-width 0.2s',
                }}
              />
            );
          })}
        </svg>

        {/* Node cards layer */}
        {QUANTUM_NODES.map((node, nodeIdx) => {
          const pos = nodePixelPos(node);
          const statusCfg = STATUS_CONFIG[node.status];
          const isSelected = selectedNode?.id === node.id;
          const isHovered = hoveredId === node.id;
          const isLocked = node.status === 'locked';
          const isAvailable = node.status === 'available';

          const borderColor = isLocked
            ? 'rgba(80,80,80,0.4)'
            : isSelected
            ? node.color
            : isHovered
            ? `${node.color}aa`
            : `${node.color}55`;

          const bgColor = isLocked
            ? 'rgba(12,8,16,0.6)'
            : 'rgba(18,10,24,0.92)';

          const boxShadow = isSelected
            ? `0 0 24px ${node.color}50, 0 0 1px ${node.color}`
            : isAvailable
            ? `0 0 12px ${node.color}30`
            : 'none';

          return (
            <div
              key={node.id}
              className="qr-node"
              style={{
                position: 'absolute',
                left: pos.x,
                top: pos.y,
                width: NODE_W,
                zIndex: isSelected || isHovered ? 15 : 10,
                animationDelay: `${nodeIdx * 0.06}s`,
              }}
            >
              <div
                className={`qr-node-card rounded-xl border overflow-hidden ${isAvailable ? 'qr-available' : ''} ${isLocked ? '' : 'cursor-pointer'}`}
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
                  opacity: 1,
                }}
                onClick={() => !isLocked && handleNodeClick(node)}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Top row: icon + status */}
                <div className="flex items-center justify-between mb-1">
                  <div
                    className="flex items-center justify-center rounded-lg flex-shrink-0"
                    style={{
                      width: 22,
                      height: 22,
                      background: isLocked ? 'rgba(80,80,80,0.15)' : `${node.color}18`,
                      border: `1px solid ${isLocked ? 'rgba(80,80,80,0.3)' : `${node.color}40`}`,
                      fontSize: 11,
                      color: isLocked ? 'rgba(120,120,120,0.5)' : node.color,
                      filter: isLocked ? 'none' : `drop-shadow(0 0 4px ${node.color}60)`,
                    }}
                  >
                    {isLocked ? '🔒' : node.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: F_MONO,
                      fontSize: 7,
                      letterSpacing: '0.12em',
                      color: isLocked ? 'rgba(100,100,100,0.5)' : statusCfg.color,
                      textTransform: 'uppercase',
                    }}
                  >
                    {statusCfg.label}
                  </span>
                </div>

                {/* Label */}
                <div
                  style={{
                    fontFamily: F_BE,
                    fontSize: 11,
                    color: isLocked ? 'rgba(140,140,140,0.5)' : '#ede0d4',
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

                {/* Level badge */}
                <div
                  style={{
                    fontFamily: F_MONO,
                    fontSize: 7,
                    letterSpacing: '0.1em',
                    color: isLocked ? 'rgba(100,100,100,0.3)' : `${node.color}80`,
                    marginTop: 'auto',
                    textTransform: 'uppercase',
                  }}
                >
                  {node.level}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      {selectedNode && (
        <QuantumNodePanel
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          onAskAther={handleAskAther}
        />
      )}
    </div>
  );
}

function QuantumNodePanel({
  node,
  onClose,
  onAskAther,
}: {
  node: QuantumNode;
  onClose: () => void;
  onAskAther: () => void;
}) {
  const statusCfg = STATUS_CONFIG[node.status];

  const prereqNodes = node.prerequisites
    .map((id) => QUANTUM_NODES.find((n) => n.id === id))
    .filter(Boolean) as QuantumNode[];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
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

        {/* Status + branch */}
        <div className="flex items-center gap-2 mb-4">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '3px 10px',
              borderRadius: 6,
              background: `${statusCfg.color}15`,
              border: `1px solid ${statusCfg.color}40`,
            }}
          >
            <span style={{ fontSize: 10 }}>{statusCfg.icon}</span>
            <span
              style={{
                fontFamily: F_MONO,
                fontSize: 8,
                letterSpacing: '0.15em',
                color: statusCfg.color,
              }}
            >
              {statusCfg.label}
            </span>
          </div>
          <span
            style={{
              fontFamily: F_MONO,
              fontSize: 8,
              letterSpacing: '0.15em',
              color: `${BRANCH_COLORS[node.branch]}aa`,
              textTransform: 'uppercase',
            }}
          >
            RAMA_{node.branch.toUpperCase()}
          </span>
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
            {node.status === 'locked' ? '🔒' : node.icon}
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
              NIVEL: {node.level}
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

        {/* Prerequisites */}
        {prereqNodes.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <span
              style={{
                fontFamily: F_MONO,
                fontSize: 8,
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 6,
              }}
            >
              REQUISITOS
            </span>
            <div className="flex flex-wrap gap-2">
              {prereqNodes.map((p) => (
                <div
                  key={p.id}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '4px 10px',
                    borderRadius: 6,
                    background: `${p.color}12`,
                    border: `1px solid ${p.color}30`,
                  }}
                >
                  <span style={{ fontSize: 10 }}>{p.icon}</span>
                  <span
                    style={{
                      fontFamily: F_MONO,
                      fontSize: 9,
                      color: `${p.color}cc`,
                    }}
                  >
                    {p.shortLabel}
                  </span>
                  {p.status === 'completed' && (
                    <span style={{ color: '#00E5A0', fontSize: 9 }}>✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked warning */}
        {node.status === 'locked' && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              background: 'rgba(255,0,110,0.08)',
              border: '1px solid rgba(255,0,110,0.25)',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 14 }}>🔒</span>
            <span
              style={{
                fontFamily: F_MONO,
                fontSize: 10,
                color: 'rgba(255,0,110,0.7)',
                lineHeight: 1.4,
              }}
            >
              Completa los requisitos previos para desbloquear este tema.
            </span>
          </div>
        )}

        {/* Action button */}
        {node.status !== 'locked' && (
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
        )}

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
