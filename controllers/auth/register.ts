"use client";
// ============================================================
// CONTROLLER — registerController.ts
// Importa la Server Action desde su archivo dedicado.
// ============================================================

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  type RegisterFormData,
  type RegisterFormErrors,
  validateRegisterForm,
  registerWithGoogle,
  registerWithGitHub,
} from "@/models/register";
import { registerWithEmailAction } from "@/controllers/auth/AuthAction";

// ── Estado ───────────────────────────────────────────────────
interface RegisterState {
  formData: RegisterFormData;
  errors: RegisterFormErrors;
  isLoading: boolean;
  isOAuthLoading: "google" | "github" | null;
  showPassword: boolean;
  success: boolean;
}

const initialFormData: RegisterFormData = {
  nombre: "",
  apellido: "",
  email: "",
  password: "",
};

// ── Hook principal ───────────────────────────────────────────
export function useRegisterController() {
  const router = useRouter();

  const [state, setState] = useState<RegisterState>({
    formData: initialFormData,
    errors: {},
    isLoading: false,
    isOAuthLoading: null,
    showPassword: false,
    success: false,
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  // ── Actualizar campo ─────────────────────────────────────
  const handleChange =
    (field: keyof RegisterFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({
        ...prev,
        formData: { ...prev.formData, [field]: e.target.value },
        errors: { ...prev.errors, [field]: undefined, general: undefined },
      }));
    };

  // ── Toggle password ──────────────────────────────────────
  const togglePasswordVisibility = useCallback(() => {
    setState((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  }, []);

  // ── Submit ───────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateRegisterForm(state.formData);
    if (Object.keys(errors).length > 0) {
      setState((prev) => ({ ...prev, errors }));
      return;
    }

    console.log("➡ Llamando action con:", state.formData);

    setState((prev) => ({ ...prev, isLoading: true, errors: {} }));

    // Llama al archivo separado con "use server" al tope
    const { user, error } = await registerWithEmailAction(state.formData);

    console.log(error)
    
    if (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        errors: { general: mapSupabaseError(error) },
      }));
      return;
    }

    if (user) {
      setState((prev) => ({ ...prev, isLoading: false, success: true }));
      setTimeout(() => router.push("/dashboard"), 1800);
    }
  };

  // ── OAuth Google ─────────────────────────────────────────
  const handleGoogleRegister = useCallback(async () => {
    setState((prev) => ({ ...prev, isOAuthLoading: "google" }));
    const { error } = await registerWithGoogle();
    if (error) {
      setState((prev) => ({
        ...prev,
        isOAuthLoading: null,
        errors: { general: mapSupabaseError(error) },
      }));
    }
  }, []);

  // ── OAuth GitHub ─────────────────────────────────────────
  const handleGitHubRegister = useCallback(async () => {
    setState((prev) => ({ ...prev, isOAuthLoading: "github" }));
    const { error } = await registerWithGitHub();
    if (error) {
      setState((prev) => ({
        ...prev,
        isOAuthLoading: null,
        errors: { general: mapSupabaseError(error) },
      }));
    }
  }, []);

  return {
    state,
    formRef,
    handleChange,
    handleSubmit,
    handleGoogleRegister,
    handleGitHubRegister,
    togglePasswordVisibility,
  };
}

// ── Mapeo errores Supabase → español ─────────────────────────
function mapSupabaseError(error: string): string {
  const map: Record<string, string> = {
    "User already registered": "Este email ya está registrado",
    "Email rate limit exceeded": "Demasiados intentos. Espera un momento",
    "Invalid email": "El formato del email no es válido",
    "Password should be at least 6 characters":
      "La contraseña debe tener al menos 6 caracteres",
    "signup is disabled": "El registro está deshabilitado temporalmente",
    "Email link is invalid or has expired": "El enlace expiró, intenta de nuevo",
  };
  return map[error] ?? "Error al registrar. Intenta de nuevo";
}