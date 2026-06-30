// @ts-nocheck
'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const defaultSignals = [
  { label: 'VR SYNC', value: '98%', color: '#FF006E' },
  { label: 'TOUR NODES', value: '247', color: '#FF6B00' },
  { label: 'BIOFEEDBACK', value: 'LIVE', color: '#FFD700' },
];

export default function SectionWithMockup({
  title,
  description,
  reverseLayout = false,
  eyebrow = '[ INTERFAZ_OPERATIVA ]',
  signals = defaultSignals,
}) {
  return (
    <section className={`mockup-section ${reverseLayout ? 'mockup-section--reverse' : ''}`}>
      <div className="mockup-section-inner">
        <motion.div
          className="mockup-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div className="mockup-copy" variants={itemVariants}>
            <p className="exp-section-label mono">{eyebrow}</p>
            <h2 className="mockup-title">{title}</h2>
            <p className="mockup-description">{description}</p>
          </motion.div>

          <motion.div className="mockup-visual" variants={itemVariants}>
            <motion.div
              className="mockup-shadow-panel"
              initial={{ y: reverseLayout ? 0 : 0 }}
              whileInView={{ y: reverseLayout ? -18 : -28 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="mockup-orbit-ring" />
              <div className="mockup-orbit-ring mockup-orbit-ring--small" />
              <div className="mockup-shadow-readout mono">ATHERNIX_OS / XR-READY</div>
            </motion.div>

            <motion.div
              className="mockup-device"
              initial={{ y: 0 }}
              whileInView={{ y: reverseLayout ? 24 : 32 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="mockup-device-top">
                <span />
                <span />
                <span />
                <p className="mono">LIVE_PREVIEW</p>
              </div>
              <div className="mockup-device-hero">
                <div className="mockup-hologram">
                  <span className="mockup-holo-core" />
                  <span className="mockup-holo-ring" />
                  <span className="mockup-holo-ring mockup-holo-ring--two" />
                </div>
                <div>
                  <p className="mono">MODELO FBX</p>
                  <h3>Athernixito</h3>
                </div>
              </div>
              <div className="mockup-signal-grid">
                {signals.map((signal) => (
                  <div className="mockup-signal" key={signal.label}>
                    <span style={{ background: signal.color }} />
                    <p className="mono">{signal.label}</p>
                    <strong>{signal.value}</strong>
                  </div>
                ))}
              </div>
              <div className="mockup-progress">
                <div />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
