// @ts-nocheck
'use client';

import React from 'react';

function DisplayCard({
  icon = '✦',
  title = 'Featured',
  description = 'Discover amazing content',
  date = 'Just now',
  iconColor = '#FF6B00',
  titleColor = '#FF6B00',
  cardClass = '',
}) {
  return (
    <div className={`display-card ${cardClass}`}>
      <div className="display-card-header">
        <span className="display-card-icon" style={{ background: iconColor + '33', color: iconColor }}>
          {icon}
        </span>
        <p className="display-card-title" style={{ color: titleColor }}>{title}</p>
      </div>
      <p className="display-card-desc">{description}</p>
      <p className="display-card-date mono">{date}</p>
    </div>
  );
}

export default function DisplayCards({ cards }) {
  const defaultCards = [
    {
      icon: '🏛️',
      title: 'HISTORIA VIVA VR',
      description: 'Explora Joya de Cerén en inmersión total',
      date: 'MÓDULO ACTIVO',
      iconColor: '#FF006E',
      titleColor: '#FF006E',
      cardClass: 'display-card--back',
    },
    {
      icon: '🌍',
      title: 'SVIRTUAL TOURS',
      description: 'Recorridos turísticos con guías IA',
      date: '3 GUÍAS DISPONIBLES',
      iconColor: '#FF6B00',
      titleColor: '#FF6B00',
      cardClass: 'display-card--mid',
    },
    {
      icon: '🧠',
      title: 'MENTELIBRE VR',
      description: 'Biofeedback y terapia inmersiva',
      date: 'COHERENCIA: 98%',
      iconColor: '#FFD700',
      titleColor: '#FFD700',
      cardClass: 'display-card--front',
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="display-cards-stack">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
