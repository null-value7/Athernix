// @ts-nocheck
'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const buttonVariants = {
  initial: { gap: 0, paddingLeft: '0.5rem', paddingRight: '0.5rem' },
  animate: (isSelected) => ({
    gap: isSelected ? '0.5rem' : 0,
    paddingLeft: isSelected ? '1rem' : '0.5rem',
    paddingRight: isSelected ? '1rem' : '0.5rem',
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: 'auto', opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: 'spring', bounce: 0, duration: 0.6 };

export default function ExpandableTabs({ tabs, activeColor = '#FF6B00', onChange }) {
  const [selected, setSelected] = useState(null);
  const containerRef = useRef(null);

  // Click outside handler
  const handleClickOutside = useCallback((event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setSelected(null);
      onChange?.(null);
    }
  }, [onChange]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const handleSelect = (index) => {
    setSelected(index);
    onChange?.(index);
  };

  return (
    <div ref={containerRef} className="expandable-tabs">
      {tabs.map((tab, index) => {
        if (tab.type === 'separator') {
          return <div key={`sep-${index}`} className="expandable-tabs-sep" />;
        }

        const Icon = tab.icon;
        const isActive = selected === index;

        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={isActive}
            onClick={() => handleSelect(index)}
            transition={transition}
            className={`expandable-tab-btn ${isActive ? 'expandable-tab-btn--active' : ''}`}
            style={isActive ? { color: activeColor } : undefined}
          >
            <Icon size={20} />
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="expandable-tab-label"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
