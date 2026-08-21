"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import type { RobotState, RobotAction } from "./RobotCanvas";
import { signInWithCredentials, getRoleDashboardPath } from "@/models/login";
import { createClient } from "@/lib/supabase/client";

/* ─── Schemas de validación Zod ─── */
const loginSchema = z.object({
  email: z.string().min(1, "Email requerido").email("Email inválido"),
  password: z.string().min(1, "Contraseña requerida"),
});
type LoginFormData = z.infer<typeof loginSchema>;

const registerSchema = z
  .object({
    nombre: z.string().min(2, "Nombre requerido"),
    apellido: z.string().min(2, "Apellido requerido"),
    email: z.string().min(1, "Email requerido").email("Email inválido"),
    password: z
      .string()
      .min(1, "Contraseña requerida")
      .refine((val) => {
        let score = 0;
        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;
        return score >= 3;
      }, "Contraseña insegura"),
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
type RegisterFormData = z.infer<typeof registerSchema>;

/* ─── Props ─── */
interface AuthFormProps {
  robotState: RobotState;
  dispatch: (action: RobotAction) => void;
  initialMode?: "login" | "register";
}

/* ─── Componente ─── */
export function AuthForm({ robotState, dispatch, initialMode = "login" }: AuthFormProps) {
  const [authMode, setAuthMode] = useState<"login" | "register">(initialMode);
  const [regStep, setRegStep] = useState(1);
  const [selectedGender, setSelectedGender] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");

  useEffect(() => {
    setAuthMode(initialMode);
  }, [initialMode]);

  /* ─── Formularios react-hook-form ─── */
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  /* ─── Fortaleza de contraseña (reactiva con watch) ─── */
  const passwordValue = registerForm.watch("password");
  const passwordScore = (() => {
    let s = 0;
    if (passwordValue.length >= 8) s++;
    if (/[A-Z]/.test(passwordValue)) s++;
    if (/[0-9]/.test(passwordValue)) s++;
    if (/[^A-Za-z0-9]/.test(passwordValue)) s++;
    return s;
  })();

  const strengthConfig = [
    { label: "FORTALEZA", color: "rgba(255,255,255,0.3)" },
    { label: "DÉBIL", color: "#FF006E" },
    { label: "REGULAR", color: "#FF6B00" },
    { label: "BUENA", color: "#FFD700" },
    { label: "FUERTE", color: "#00FF88" },
  ];

  /* ─── Handlers de modo ─── */
  const handleGoToRegister = useCallback(() => {
    setAuthMode("register");
    setRegStep(1);
    setShowSuccess(false);
    dispatch({ type: "SET_MODE", mode: "register" });
  }, [dispatch]);

  const handleGoToLogin = useCallback(() => {
    setAuthMode("login");
    setShowSuccess(false);
    dispatch({ type: "SET_MODE", mode: "login" });
  }, [dispatch]);

  /* ─── Focus/Blur helpers para robot ─── */
  const handleFocusDance = useCallback(() => {
    dispatch({ type: "SET_FOCUS", focus: "dance" });
  }, [dispatch]);

  const handleFocusSpy = useCallback(() => {
    dispatch({ type: "SET_FOCUS", focus: "spy" });
  }, [dispatch]);

  const handleBlur = useCallback(() => {
    dispatch({ type: "SET_FOCUS", focus: null });
  }, [dispatch]);

  /* ─── Handlers de pasos de registro ─── */
  const handleNextStep1 = useCallback(async () => {
    const valid = await registerForm.trigger(["nombre", "apellido"]);
    if (valid) setRegStep(2);
  }, [registerForm]);

  const handleNextStep2 = useCallback(async () => {
    const valid = await registerForm.trigger(["email"]);
    if (valid) setRegStep(3);
  }, [registerForm]);

  const handleBackStep = useCallback((step: number) => {
    setRegStep(step);
  }, []);

  /* ─── Submit Login ─── */
  const onLoginSubmit = useCallback(
    async (data: LoginFormData) => {
      setLoginError("");
      setIsSubmitting(true);
      dispatch({ type: "TRIGGER_SUBMIT" });

      try {
        const result = await signInWithCredentials({
          email: data.email,
          password: data.password,
        });

        if (result.success) {
          // Redirigir según el rol
          const rolePaths: Record<string, string> = {
            admin: "/dashboard",
            Teacher: "/dashboard/teacher",
            Student: "/dashboard/student",
            Personal: "/home",
          };
          window.location.href = rolePaths[result.role || "Personal"] || "/home";
          return;
        }

        setLoginError(result.error || "Usuario o contraseña incorrectos");
      } catch {
        setLoginError("No se pudo conectar con el servidor");
      } finally {
        setIsSubmitting(false);
      }
    },
    [dispatch]
  );

  /* ─── Submit Registro (Paso 3) ─── */
  const onRegisterSubmit = useCallback(
    async (data: RegisterFormData) => {
      const valid = await registerForm.trigger(["password", "confirmPassword"]);
      if (!valid) return;

      setIsSubmitting(true);
      setRegisterError("");
      dispatch({ type: "TRIGGER_SUBMIT" });

      try {
        const supabase = createClient();
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              full_name: `${data.nombre} ${data.apellido}`.trim(),
            },
          },
        });

        if (authError) {
          // Manejo específico para rate limiting (429)
          if (authError.message.includes("rate limit") || authError.status === 429) {
            setRegisterError("Demasiados intentos de registro. Por favor espera unos minutos antes de intentar nuevamente.");
          } else {
            setRegisterError(authError.message || "No se pudo crear la cuenta");
          }
          dispatch({ type: "SET_GLITCH", glitch: true });
          return;
        }

        if (authData.user) {
          // Crear perfil en la tabla profiles
          const { error: profileError } = await supabase
            .from("profiles")
            .upsert({
              id: authData.user.id,
              nombre: data.nombre,
              apellido: data.apellido,
              email: data.email,
              role: "Personal",
            }, {
              onConflict: "id"
            });

          if (profileError) {
            console.error("Error creando perfil:", profileError);
          }

          setShowSuccess(true);
        }
      } catch (error: any) {
        // Manejo de errores de red
        if (error?.message?.includes("429")) {
          setRegisterError("Demasiados intentos de registro. Por favor espera unos minutos antes de intentar nuevamente.");
        } else {
          setRegisterError("No se pudo conectar con el servidor");
        }
        dispatch({ type: "SET_GLITCH", glitch: true });
      } finally {
        setIsSubmitting(false);
      }
    },
    [registerForm, dispatch]
  );

  /* ─── Clases comunes ─── */
  const mono = "font-[family-name:var(--font-jetbrains)]";
  const bebas = "font-[family-name:var(--font-bebas)]";

  return (
    <>
      {/* ─── Contenedor lateral del formulario ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={authMode}
          initial={{ x: authMode === "register" ? 300 : -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: authMode === "register" ? -300 : 300, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`login-container ${authMode === "register" ? "mode-register" : ""}`}
        >
          <div className="form-wrapper">
            {/* ─── Switcher principal ─── */}
            <div className="auth-switcher">
              <button
                type="button"
                onClick={handleGoToLogin}
                className={authMode === "login" ? "active" : ""}
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                onClick={handleGoToRegister}
                className={authMode === "register" ? "active" : ""}
              >
                Registro
              </button>
            </div>

            {/* ─── Indicador de pasos (solo registro) ─── */}
            {authMode === "register" && !showSuccess && (
              <div className="steps-bar">
                {[
                  { num: 1, label: "PERSONAL" },
                  { num: 2, label: "CONTACTO" },
                  { num: 3, label: "ACCESO" },
                ].map((step, i) => {
                  const isActive = regStep === step.num;
                  const isDone = regStep > step.num;
                  return (
                    <React.Fragment key={step.num}>
                      <div className={`step ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}>
                        <div className="step-dot" />
                        <span>{step.label}</span>
                      </div>
                      {i < 2 && <div className="step-line" />}
                    </React.Fragment>
                  );
                })}
              </div>
            )}

            {/* ─── Título ─── */}
            <AnimatePresence mode="wait">
              {!showSuccess && (
                <motion.h2
                  key={authMode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {authMode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
                </motion.h2>
              )}
            </AnimatePresence>

            {/* ═══════════ LOGIN ═══════════ */}
            {authMode === "login" && (
              <form
                onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                autoComplete="off"
              >
                {/* Email */}
                <div className="input-group">
                  <input
                    type="email"
                    required
                    className={loginForm.formState.errors.email ? "invalid" : ""}
                    {...loginForm.register("email")}
                    onFocus={handleFocusDance}
                    onBlur={handleBlur}
                  />
                  <label className="floater">Email</label>
                  {loginForm.formState.errors.email && (
                    <span className="field-msg err">
                      {loginForm.formState.errors.email.message}
                    </span>
                  )}
                </div>

                {/* Contraseña */}
                <div className="input-group">
                  <input
                    type="password"
                    required
                    className={loginForm.formState.errors.password ? "invalid" : ""}
                    {...loginForm.register("password")}
                    onFocus={handleFocusSpy}
                    onBlur={handleBlur}
                  />
                  <label className="floater">Contraseña</label>
                  {loginForm.formState.errors.password && (
                    <span className="field-msg err">
                      {loginForm.formState.errors.password.message}
                    </span>
                  )}
                </div>

                {loginError && (
                  <span className="field-msg err" style={{ marginBottom: "12px", display: "block" }}>
                    {loginError}
                  </span>
                )}

                <a
                  href="/forgotpassword"
                  className="forgot-password-link"
                  style={{
                    display: "block",
                    width: "fit-content",
                    margin: "-6px 0 14px auto",
                    fontFamily: "'Courier New', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255, 120, 50, 0.7)",
                    textDecoration: "none",
                    transition: "color 0.25s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6020")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 120, 50, 0.7)")}
                >
                  ¿Olvidaste tu contraseña?
                </a>

                <button type="submit" className="btn-login" disabled={isSubmitting}>
                  {isSubmitting ? "Verificando..." : "Ingresar"}
                </button>
              </form>
            )}

            {/* ═══════════ REGISTRO ═══════════ */}
            {authMode === "register" && !showSuccess && (
              <form
                onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                autoComplete="off"
                className="flex flex-col"
              >
                <AnimatePresence mode="wait">
                  {/* ─── Paso 1: Datos personales ─── */}
                  {regStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <div className="input-group">
                          <input
                            type="text"
                            className={registerForm.formState.errors.nombre ? "invalid" : ""}
                            {...registerForm.register("nombre")}
                            onFocus={handleFocusDance}
                            onBlur={handleBlur}
                          />
                          <label className="floater">Nombre *</label>
                          {registerForm.formState.errors.nombre && (
                            <span className="field-msg err">
                              {registerForm.formState.errors.nombre.message}
                            </span>
                          )}
                        </div>
                        <div className="input-group">
                          <input
                            type="text"
                            className={registerForm.formState.errors.apellido ? "invalid" : ""}
                            {...registerForm.register("apellido")}
                            onFocus={handleFocusDance}
                            onBlur={handleBlur}
                          />
                          <label className="floater">Apellido *</label>
                          {registerForm.formState.errors.apellido && (
                            <span className="field-msg err">
                              {registerForm.formState.errors.apellido.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <button type="button" className="btn-login" onClick={handleNextStep1} style={{ marginTop: "10px" }}>
                        Siguiente ›
                      </button>
                    </motion.div>
                  )}

                  {/* ─── Paso 2: Contacto ─── */}
                  {regStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="input-group">
                        <input
                          type="email"
                          className={registerForm.formState.errors.email ? "invalid" : ""}
                          {...registerForm.register("email")}
                          onFocus={handleFocusDance}
                          onBlur={handleBlur}
                        />
                        <label className="floater">Email *</label>
                        {registerForm.formState.errors.email && (
                          <span className="field-msg err">
                            {registerForm.formState.errors.email.message}
                          </span>
                        )}
                      </div>

                      <div className="btn-row">
                        <button type="button" className="btn-back" onClick={() => handleBackStep(1)}>
                          ‹ Volver
                        </button>
                        <button type="button" className="btn-login" onClick={handleNextStep2} style={{ flex: 1 }}>
                          Siguiente ›
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ─── Paso 3: Contraseña ─── */}
                  {regStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Contraseña */}
                      <div className="input-group">
                        <input
                          type="password"
                          className={registerForm.formState.errors.password ? "invalid" : ""}
                          {...registerForm.register("password")}
                          onFocus={handleFocusSpy}
                          onBlur={handleBlur}
                        />
                        <label className="floater">Contraseña *</label>
                        <div className="strength-wrap">
                          <div className="strength-bar">
                            <div
                              className="strength-fill"
                              style={{
                                width: `${(passwordScore / 4) * 100}%`,
                                background: strengthConfig[passwordScore].color,
                              }}
                            />
                          </div>
                          <span
                            className="strength-label"
                            style={{ color: strengthConfig[passwordScore].color }}
                          >
                            {strengthConfig[passwordScore].label}
                          </span>
                        </div>
                        <div className="pass-rules">
                          <div className={passwordValue.length >= 8 ? "rule ok" : ""}>
                            ● Mínimo 8 caracteres
                          </div>
                          <div className={/[A-Z]/.test(passwordValue) ? "rule ok" : ""}>
                            ● Una mayúscula
                          </div>
                          <div className={/[0-9]/.test(passwordValue) ? "rule ok" : ""}>
                            ● Un número
                          </div>
                          <div className={/[^A-Za-z0-9]/.test(passwordValue) ? "rule ok" : ""}>
                            ● Un símbolo
                          </div>
                        </div>
                        {registerForm.formState.errors.password && (
                          <span className="field-msg err">
                            {registerForm.formState.errors.password.message}
                          </span>
                        )}
                      </div>

                      {/* Confirmar contraseña */}
                      <div className="input-group">
                        <input
                          type="password"
                          className={registerForm.formState.errors.confirmPassword ? "invalid" : ""}
                          {...registerForm.register("confirmPassword")}
                        />
                        <label className="floater">Confirmar Contraseña *</label>
                        {registerForm.formState.errors.confirmPassword && (
                          <span className="field-msg err">
                            {registerForm.formState.errors.confirmPassword.message}
                          </span>
                        )}
                      </div>

                      {registerError && (
                        <span className="field-msg err" style={{ marginBottom: "12px", display: "block" }}>
                          {registerError}
                        </span>
                      )}

                      <div className="btn-row">
                        <button type="button" className="btn-back" onClick={() => handleBackStep(2)}>
                          ‹ Volver
                        </button>
                        <button type="submit" className="btn-login" style={{ flex: 1 }} disabled={isSubmitting}>
                          {isSubmitting ? "Creando..." : "Crear Cuenta ✦"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            )}

            {/* ═══════════ ESTADO DE ÉXITO ═══════════ */}
            {authMode === "register" && showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="success-state"
                style={{ display: "block" }}
              >
                <div style={{ fontSize: "3.5rem", color: "#00FF88", marginBottom: "10px" }}>✦</div>
                <h3>✦ ¡CUENTA CREADA! ✦</h3>
                <p style={{ marginBottom: "25px" }}>
                  Hemos enviado un correo de verificación a <strong>{registerForm.watch("email")}</strong>.
                  Por favor verifica tu correo para comenzar a usar tu cuenta.
                </p>
                <button type="button" className="btn-login" onClick={handleGoToLogin}>
                  Ir al Inicio de Sesión ›
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ─── Footer con controles del Robot ─── */}
      <footer className="interactive">
        {[
          { id: "btn-rotation", label: "Rotación", action: () => dispatch({ type: "TOGGLE_ROTATE" }) },
          { id: "btn-light", label: "Luz", action: () => dispatch({ type: "TOGGLE_LIGHT" }) },
          { id: "btn-neon", label: "Neón", action: () => dispatch({ type: "TOGGLE_NEON" }) },
        ].map((btn) => (
          <button
            key={btn.id}
            id={btn.id}
            type="button"
            onClick={btn.action}
            className="btn-minimal"
          >
            {btn.label}
          </button>
        ))}
      </footer>
    </>
  );
}
