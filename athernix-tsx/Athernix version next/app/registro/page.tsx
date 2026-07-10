// @ts-nocheck
'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import '../registro.css';

export default function RegistroPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    fecha: '',
    sexo: '',
    email: '',
    prefix: '+503',
    telefono: '',
    password: '',
    confirm: '',
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [strength, setStrength] = useState({ pct: 0, label: 'FORTALEZA', color: 'rgba(255,255,255,0.3)', score: 0 });
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitBtnText, setSubmitBtnText] = useState('✦ CREAR CUENTA ✦');
  
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- Three.js setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#08000a');

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /* Luces */
    scene.add(new THREE.AmbientLight(0x220011, 1));
    const L1 = new THREE.PointLight(0xff006e, 3); L1.position.set(-4, 2, 3); scene.add(L1);
    const L2 = new THREE.PointLight(0xffd700, 2); L2.position.set(4, -2, 4); scene.add(L2);
    const L3 = new THREE.PointLight(0xff6b00, 2.5); L3.position.set(0, 0, -6); scene.add(L3);

    /* Icosaedro central */
    const icoGeo = new THREE.IcosahedronGeometry(2.6, 0);
    const icoMat = new THREE.MeshPhongMaterial({
      color: 0x1a0022, emissive: 0x440011, shininess: 60,
      transparent: true, opacity: 0.55, side: THREE.DoubleSide
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    /* Wireframe icosaedro */
    const wfGeo = new THREE.IcosahedronGeometry(2.65, 1);
    const wfMat = new THREE.MeshBasicMaterial({ color: 0xff006e, wireframe: true, transparent: true, opacity: 0.12 });
    const wf = new THREE.Mesh(wfGeo, wfMat);
    scene.add(wf);

    /* Anillos orbitales */
    function makeRing(r, col, op, thick, rx, ry, rz) {
      const g = new THREE.TorusGeometry(r, thick, 3, 6); // hexagonal
      const m = new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.2, transparent: true, opacity: op });
      const mesh = new THREE.Mesh(g, m);
      mesh.rotation.set(rx, ry, rz);
      return mesh;
    }
    const rings = [
      makeRing(3.5, 0xff006e, 0.25, 0.02, 0.5, 0.2, 0),
      makeRing(4.1, 0xff6b00, 0.18, 0.015, 1.0, 0.4, 0.3),
      makeRing(4.7, 0xffd700, 0.14, 0.012, 0.2, 1.1, 0.7),
      makeRing(5.3, 0xff006e, 0.09, 0.009, 1.4, 0.3, 1.2),
    ];
    rings.forEach(r => scene.add(r));

    /* Campo de partículas */
    const N = 1200;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(N * 3);
    const pCol = new Float32Array(N * 3);
    const palette = [new THREE.Color(0xff006e), new THREE.Color(0xff6b00), new THREE.Color(0xffd700)];
    for (let i = 0; i < N; i++) {
      const r = 5.5 + Math.random() * 4;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(Math.random() * 2 - 1);
      pPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pPos[i * 3 + 2] = r * Math.cos(ph);
      const c = palette[Math.floor(Math.random() * 3)];
      pCol[i * 3] = c.r; pCol[i * 3 + 1] = c.g; pCol[i * 3 + 2] = c.b;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
    const pts = new THREE.Points(pGeo, new THREE.PointsMaterial({
      size: 0.07, vertexColors: true, transparent: true, opacity: 0.75,
      blending: THREE.AdditiveBlending
    }));
    scene.add(pts);

    /* Satélites */
    const sats = [];
    for (let i = 0; i < 20; i++) {
      const sz = 0.08 + Math.random() * 0.15;
      const m = new THREE.Mesh(
        new THREE.OctahedronGeometry(sz),
        new THREE.MeshStandardMaterial({ color: Math.random() > 0.5 ? 0xff006e : 0xffd700, emissive: 0x220000, emissiveIntensity: 0.4 })
      );
      const a = Math.random() * Math.PI * 2, dist = 4 + Math.random() * 2;
      m.position.set(Math.cos(a) * dist, (Math.random() - .5) * 3, Math.sin(a) * dist);
      scene.add(m);
      sats.push({ mesh: m, angle: a, dist, speed: 0.003 + Math.random() * 0.004, height: m.position.y });
    }

    /* Mouse movement interaction */
    let mx = 0, my = 0;
    const handleMouseMove = (e) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener('mousemove', handleMouseMove);

    /* Animate */
    const clock = new THREE.Clock();
    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      ico.rotation.y += 0.004; ico.rotation.x += 0.002;
      wf.rotation.y -= 0.003; wf.rotation.z += 0.002;

      rings[0].rotation.y += 0.004; rings[0].rotation.z += 0.002;
      rings[1].rotation.x += 0.003; rings[1].rotation.y -= 0.003;
      rings[2].rotation.z += 0.005; rings[2].rotation.x -= 0.002;
      rings[3].rotation.y += 0.006; rings[3].rotation.z -= 0.004;

      pts.rotation.y += 0.0003;

      sats.forEach(s => {
        s.angle += s.speed;
        s.mesh.position.x = Math.cos(s.angle) * s.dist;
        s.mesh.position.z = Math.sin(s.angle) * s.dist;
        s.mesh.position.y = s.height + Math.sin(t * 2 + s.angle) * 0.25;
        s.mesh.rotation.y += 0.03;
      });

      camera.position.x += (mx * 1.5 - camera.position.x) * 0.05;
      camera.position.y += (my * 1.0 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      ico.material.opacity = 0.55 + Math.sin(t * 2.5) * 0.05;
      L1.intensity = 3 + Math.sin(t * 1.8) * 0.6;
      L2.intensity = 2 + Math.cos(t * 2.2) * 0.5;

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer) renderer.dispose();
    };
  }, []);

  // Password strength checker
  const evaluatePasswordStrength = (p) => {
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;

    const levels = ['', 'DÉBIL', 'REGULAR', 'BUENA', 'FUERTE'];
    const colors = ['', '#FF006E', '#FF6B00', '#FFD700', '#00FF88'];
    
    setStrength({
      pct: (score / 4) * 100,
      label: levels[score] || 'FORTALEZA',
      color: colors[score] || 'rgba(255,255,255,0.3)',
      score
    });
  };

  const handleInputChange = (field, val) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: val };
      if (field === 'password') {
        evaluatePasswordStrength(val);
      }
      return updated;
    });

    // Real-time validation clear/set
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const validateStep = (currentStepNum) => {
    const newErrors = {};

    if (currentStepNum === 1) {
      if (formData.nombres.trim().length < 2) {
        newErrors.nombres = 'Ingresa tu nombre completo';
      }
      if (formData.apellidos.trim().length < 2) {
        newErrors.apellidos = 'Ingresa tus apellidos';
      }
      if (!formData.fecha) {
        newErrors.fecha = 'Selecciona tu fecha de nacimiento';
      } else {
        const age = Math.floor((Date.now() - new Date(formData.fecha)) / 31557600000);
        if (age < 13) newErrors.fecha = 'Debes tener al menos 13 años';
        if (age > 120) newErrors.fecha = 'Fecha inválida';
      }
      if (!formData.sexo) {
        newErrors.sexo = 'Selecciona una opción';
      }
    }

    if (currentStepNum === 2) {
      const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRx.test(formData.email.trim())) {
        newErrors.email = 'Ingresa un correo válido';
      }
      const phoneDigits = formData.telefono.replace(/\D/g, '');
      if (phoneDigits.length < 7) {
        newErrors.telefono = 'Número inválido';
      }
    }

    if (currentStepNum === 3) {
      if (strength.score < 3) {
        newErrors.password = 'La contraseña no cumple los requisitos';
      }
      if (formData.password !== formData.confirm || !formData.confirm) {
        newErrors.confirm = 'Las contraseñas no coinciden';
      }
      if (!formData.terms) {
        newErrors.terms = 'Debes aceptar los términos y condiciones';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setSubmitBtnText('✦ CREANDO ✦');

    try {
      const payload = {
        username: formData.email.trim(),
        password: formData.password,
        name: `${formData.nombres.trim()} ${formData.apellidos.trim()}`,
        telefono: formData.prefix + formData.telefono.trim(),
        fecha_nacimiento: formData.fecha,
        sexo: formData.sexo
      };

      const resp = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await resp.json();
      if (data.success) {
        setShowSuccess(true);
      } else {
        setSubmitBtnText('✦ CREAR CUENTA ✦');
        alert(data.error || 'Error al crear la cuenta. Por favor intenta de nuevo.');
      }
    } catch (error) {
      console.error('Registration error', error);
      setSubmitBtnText('✦ CREAR CUENTA ✦');
      alert('Error de conexión con el servidor.');
    }
  };

  const togglePasswordVisibility = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.type = el.type === 'password' ? 'text' : 'password';
    }
  };

  return (
    <div className="register-page-wrapper">
      <canvas id="canvas-3d" ref={canvasRef}></canvas>
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>
      <div className="grain-overlay"></div>

      <div className="register-container">
        <div className="glass-register">
          
          {!showSuccess ? (
            <>
              <div className="login-badge">
                <span className="badge-dot"></span>
                <span>✦ CREAR CUENTA ✦</span>
              </div>

              <h1 className="login-title"><span className="gradient">REGISTRO</span></h1>
              <div className="login-subtitle">ÚNETE AL ECOSISTEMA XR</div>

              {/* STEP INDICATOR */}
              <div className="steps-bar">
                <div className={`step ${step === 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`} data-step="1">
                  <div className="step-dot"></div>
                  <span>PERSONAL</span>
                </div>
                <div className="step-line"></div>
                <div className={`step ${step === 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}`} data-step="2">
                  <div className="step-dot"></div>
                  <span>CONTACTO</span>
                </div>
                <div className="step-line"></div>
                <div className={`step ${step === 3 ? 'active' : ''}`} data-step="3">
                  <div className="step-dot"></div>
                  <span>ACCESO</span>
                </div>
              </div>

              <form id="registerForm" onSubmit={handleFormSubmit} noValidate>
                {/* STEP 1: PERSONAL */}
                {step === 1 && (
                  <div className="form-step active" id="step-1">
                    <div className="field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div className="input-group">
                        <label className="input-label">NOMBRES <span className="req">*</span></label>
                        <div className="input-wrap">
                          <input
                            id="nombres"
                            type="text"
                            className={`input-field ${errors.nombres ? 'invalid' : formData.nombres.length >= 2 ? 'valid' : ''}`}
                            placeholder="Ana Sofía"
                            value={formData.nombres}
                            onChange={(e) => handleInputChange('nombres', e.target.value)}
                          />
                          {formData.nombres.length >= 2 && <div className="input-icon valid-icon">✓</div>}
                          <div className="input-line"></div>
                        </div>
                        <span className={`field-msg ${errors.nombres ? 'err' : 'ok'}`}>{errors.nombres || (formData.nombres.length >= 2 && '✓ Perfecto')}</span>
                      </div>
                      <div className="input-group">
                        <label className="input-label">APELLIDOS <span className="req">*</span></label>
                        <div className="input-wrap">
                          <input
                            id="apellidos"
                            type="text"
                            className={`input-field ${errors.apellidos ? 'invalid' : formData.apellidos.length >= 2 ? 'valid' : ''}`}
                            placeholder="García Martínez"
                            value={formData.apellidos}
                            onChange={(e) => handleInputChange('apellidos', e.target.value)}
                          />
                          {formData.apellidos.length >= 2 && <div className="input-icon valid-icon">✓</div>}
                          <div className="input-line"></div>
                        </div>
                        <span className={`field-msg ${errors.apellidos ? 'err' : 'ok'}`}>{errors.apellidos || (formData.apellidos.length >= 2 && '✓ Perfecto')}</span>
                      </div>
                    </div>

                    <div className="field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '14px' }}>
                      <div className="input-group">
                        <label className="input-label">FECHA DE NACIMIENTO <span className="req">*</span></label>
                        <div className="input-wrap">
                          <input
                            id="fecha"
                            type="date"
                            className={`input-field ${errors.fecha ? 'invalid' : formData.fecha ? 'valid' : ''}`}
                            value={formData.fecha}
                            onChange={(e) => handleInputChange('fecha', e.target.value)}
                          />
                          <div className="input-line"></div>
                        </div>
                        <span className={`field-msg ${errors.fecha ? 'err' : 'ok'}`}>{errors.fecha}</span>
                      </div>
                      <div className="input-group">
                        <label className="input-label">SEXO <span className="req">*</span></label>
                        <div className="gender-selector" id="gender-selector" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            className={`gender-btn ${formData.sexo === 'hombre' ? 'active' : ''}`}
                            onClick={() => handleInputChange('sexo', 'hombre')}
                          >
                            <span className="gender-icon">♂</span>
                            <span>HOMBRE</span>
                          </button>
                          <button
                            type="button"
                            className={`gender-btn ${formData.sexo === 'mujer' ? 'active' : ''}`}
                            onClick={() => handleInputChange('sexo', 'mujer')}
                          >
                            <span className="gender-icon">♀</span>
                            <span>MUJER</span>
                          </button>
                          <button
                            type="button"
                            className={`gender-btn ${formData.sexo === 'nd' ? 'active' : ''}`}
                            onClick={() => handleInputChange('sexo', 'nd')}
                          >
                            <span className="gender-icon">◈</span>
                            <span>PREFIERO NO DECIR</span>
                          </button>
                        </div>
                        <span className="field-msg err" id="sexo-msg">{errors.sexo}</span>
                      </div>
                    </div>

                    <button type="button" className="login-btn" style={{ marginTop: '24px' }} onClick={handleNextStep}>
                      <span>CONTINUAR ›</span>
                    </button>
                  </div>
                )}

                {/* STEP 2: CONTACTO */}
                {step === 2 && (
                  <div className="form-step active" id="step-2">
                    <div className="input-group">
                      <label className="input-label">CORREO ELECTRÓNICO <span className="req">*</span></label>
                      <div className="input-wrap">
                        <input
                          id="email"
                          type="email"
                          className={`input-field ${errors.email ? 'invalid' : formData.email ? 'valid' : ''}`}
                          placeholder="ana@dominio.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                        {errors.email ? <div className="input-icon invalid-icon">✕</div> : formData.email && <div className="input-icon valid-icon">✓</div>}
                        <div className="input-line"></div>
                      </div>
                      <span className={`field-msg ${errors.email ? 'err' : 'ok'}`}>{errors.email || (formData.email && '✓ Correo válido')}</span>
                    </div>

                    <div className="input-group" style={{ marginTop: '16px' }}>
                      <label className="input-label">NÚMERO DE TELÉFONO <span className="req">*</span></label>
                      <div className="input-wrap phone-wrap" style={{ display: 'flex', gap: '8px' }}>
                        <div className="phone-prefix" style={{ flexShrink: 0 }}>
                          <select
                            id="prefix"
                            className="prefix-select"
                            value={formData.prefix}
                            onChange={(e) => handleInputChange('prefix', e.target.value)}
                            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '30px', padding: '18px 12px', color: '#fff', fontSize: '12px', outline: 'none' }}
                          >
                            <option value="+503">🇸🇻 +503</option>
                            <option value="+52">🇲🇽 +52</option>
                            <option value="+502">🇬🇹 +502</option>
                            <option value="+504">🇭🇳 +504</option>
                            <option value="+505">🇳🇮 +505</option>
                            <option value="+506">🇨🇷 +506</option>
                            <option value="+507">🇵🇦 +507</option>
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+34">🇪🇸 +34</option>
                          </select>
                        </div>
                        <input
                          id="telefono"
                          type="tel"
                          className={`input-field phone-input ${errors.telefono ? 'invalid' : formData.telefono.length >= 7 ? 'valid' : ''}`}
                          placeholder="7890 1234"
                          value={formData.telefono}
                          onChange={(e) => handleInputChange('telefono', e.target.value.replace(/[^0-9\s\-]/g, ''))}
                          style={{ flex: 1 }}
                        />
                        {formData.telefono.length >= 7 && <div className="input-icon valid-icon">✓</div>}
                        <div className="input-line"></div>
                      </div>
                      <span className={`field-msg ${errors.telefono ? 'err' : 'ok'}`}>{errors.telefono || (formData.telefono.length >= 7 && '✓ Teléfono válido')}</span>
                    </div>

                    <div className="btn-row" style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                      <button type="button" className="back-btn" onClick={handlePrevStep} style={{ flex: 1, padding: '18px', borderRadius: '40px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: '700', fontSize: '15px' }}>‹ VOLVER</button>
                      <button type="button" className="login-btn" onClick={handleNextStep} style={{ flex: 1 }}>CONTINUAR ›</button>
                    </div>
                  </div>
                )}

                {/* STEP 3: CONTRASEÑA */}
                {step === 3 && (
                  <div className="form-step active" id="step-3">
                    <div className="input-group">
                      <label className="input-label">CONTRASEÑA <span className="req">*</span></label>
                      <div className="input-wrap" style={{ position: 'relative' }}>
                        <input
                          id="password"
                          type="password"
                          className={`input-field ${errors.password ? 'invalid' : strength.score >= 3 ? 'valid' : ''}`}
                          placeholder="Mín. 8 caracteres"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                        />
                        <button type="button" className="toggle-pass" onClick={() => togglePasswordVisibility('password')} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', outline: 'none' }}>👁</button>
                        <div className="input-line"></div>
                      </div>
                      {/* Strength meter */}
                      <div className="strength-wrap" style={{ marginTop: '10px' }}>
                        <div className="strength-bar" style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden', marginBottom: '6px' }}>
                          <div className="strength-fill" id="strength-fill" style={{ height: '100%', width: `${strength.pct}%`, background: strength.color, transition: 'width 0.3s' }}></div>
                        </div>
                        <span className="strength-label" id="strength-label" style={{ fontSize: '8px', fontFamily: "'JetBrains Mono',monospace", letterSpacing: '0.1em', color: strength.color }}>{strength.label}</span>
                      </div>
                      <div className="pass-rules" style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '9px', opacity: 0.6, fontFamily: "'JetBrains Mono',monospace" }}>
                        <div className={`rule ${formData.password.length >= 8 ? 'ok' : ''}`} id="rule-len"><span className="rule-dot"></span> Mínimo 8 caracteres</div>
                        <div className={`rule ${/[A-Z]/.test(formData.password) ? 'ok' : ''}`} id="rule-upper"><span className="rule-dot"></span> Una mayúscula</div>
                        <div className={`rule ${/[0-9]/.test(formData.password) ? 'ok' : ''}`} id="rule-num"><span className="rule-dot"></span> Un número</div>
                        <div className={`rule ${/[^A-Za-z0-9]/.test(formData.password) ? 'ok' : ''}`} id="rule-special"><span className="rule-dot"></span> Un símbolo especial</div>
                      </div>
                      <span className="field-msg err">{errors.password}</span>
                    </div>

                    <div className="input-group" style={{ marginTop: '16px' }}>
                      <label className="input-label">CONFIRMAR CONTRASEÑA <span className="req">*</span></label>
                      <div className="input-wrap" style={{ position: 'relative' }}>
                        <input
                          id="confirm"
                          type="password"
                          className={`input-field ${errors.confirm ? 'invalid' : (formData.confirm === formData.password && formData.confirm) ? 'valid' : ''}`}
                          placeholder="Repite tu contraseña"
                          value={formData.confirm}
                          onChange={(e) => handleInputChange('confirm', e.target.value)}
                        />
                        <button type="button" className="toggle-pass" onClick={() => togglePasswordVisibility('confirm')} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', outline: 'none' }}>👁</button>
                        {formData.confirm === formData.password && formData.confirm && <div className="input-icon valid-icon">✓</div>}
                        <div className="input-line"></div>
                      </div>
                      <span className={`field-msg ${errors.confirm ? 'err' : 'ok'}`}>{errors.confirm || (formData.confirm === formData.password && formData.confirm && '✓ Coinciden')}</span>
                    </div>

                    <div className="terms-row" style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                      <label className="remember">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={formData.terms}
                          onChange={(e) => handleInputChange('terms', e.target.checked)}
                          style={{ marginRight: '8px' }}
                        /> Acepto los <a href="#" className="terms-link">Términos de Uso</a> y <a href="#" className="terms-link">Privacidad</a>
                      </label>
                    </div>
                    {errors.terms && <div style={{ color: 'var(--pink)', fontSize: '9px', marginTop: '6px', fontFamily: "'JetBrains Mono',monospace" }}>{errors.terms}</div>}

                    <div className="btn-row" style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                      <button type="button" className="back-btn" onClick={handlePrevStep} style={{ flex: 1, padding: '18px', borderRadius: '40px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: '700', fontSize: '15px' }}>‹ VOLVER</button>
                      <button type="submit" className="login-btn" id="submitBtn" style={{ flex: 1 }}>
                        <span>{submitBtnText}</span>
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </>
          ) : (
            <div className="success-state active" id="success-state">
              <div className="success-icon" style={{ fontSize: '4rem', color: '#00ff88', marginBottom: '24px' }}>✦</div>
              <h2 className="success-title" style={{ fontSize: '2rem', fontWeight: '800', background: 'linear-gradient(135deg, #00ff88, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '12px' }}>¡CUENTA CREADA!</h2>
              <p className="success-sub" style={{ opacity: 0.6, fontSize: '13px', lineHeight: '1.8', marginBottom: '32px' }}>Revisa tu correo para verificar tu cuenta y comenzar la aventura.</p>
              <Link href="/login" className="login-btn" style={{ display: 'block', textPosition: 'center', textDecoration: 'none' }}>
                IR AL LOGIN ›
              </Link>
            </div>
          )}

          <div className="signup-link" id="login-link">
            ¿YA TIENES CUENTA? <Link href="/login">INICIAR SESIÓN</Link>
          </div>

          <div className="light-reflection"></div>
        </div>
      </div>
    </div>
  );
}
