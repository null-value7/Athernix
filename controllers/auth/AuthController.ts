"use client";
// ============================================================
// CONTROLLER — authController.ts
// Hooks para signOut, forgot password y reset password
// ============================================================

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  type ForgotPasswordFormData,
  type ForgotPasswordErrors,
  type ResetPasswordFormData,
  type ResetPasswordErrors,
  validateForgotPasswordForm,
  validateResetPasswordForm,
  mapAuthError,
} from "@/models/AuthModel";
import {
  signOutAction,
  forgotPasswordAction,
  resetPasswordAction,
} from "./AuthAction";

// ============================================================
// HOOK: useSignOut
// Usado en cualquier botón de cerrar sesión (navbar, dashboard)
// ============================================================
export function useSignOut() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = useCallback(async () => {
    setIsLoading(true);
    await signOutAction();
    // signOutAction hace redirect, no necesita setState posterior
  }, []);

  return { isLoading, handleSignOut };
}

// ============================================================
// HOOK: useForgotPassword
// Pantalla donde el usuario ingresa su email para recuperar
// ============================================================
export type ForgotStatus = "idle" | "loading" | "email_sent";

export function useForgotPasswordController() {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: "",
  });
  const [errors, setErrors] = useState<ForgotPasswordErrors>({});
  const [status, setStatus] = useState<ForgotStatus>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: e.target.value });
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForgotPasswordForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    const { error } = await forgotPasswordAction(formData.email);

    if (error) {
      setErrors({ general: mapAuthError(error) });
      setStatus("idle");
      return;
    }

    // Siempre mostrar éxito aunque el email no exista
    // (práctica de seguridad: no revelar si el email existe)
    setStatus("email_sent");
  };

  return {
    formData,
    errors,
    status,
    handleChange,
    handleSubmit,
  };
}

// ============================================================
// HOOK: useResetPassword
// Pantalla /update-password — usuario llegó desde el email
// ============================================================
export type ResetStatus = "idle" | "loading" | "success";

export function useResetPasswordController() {
  const router = useRouter();
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ResetPasswordErrors>({});
  const [status, setStatus] = useState<ResetStatus>("idle");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange =
    (field: keyof ResetPasswordFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }));
    };

  const toggleShowPassword = () => setShowPassword((p) => !p);
  const toggleShowConfirm = () => setShowConfirm((p) => !p);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateResetPasswordForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    const { error } = await resetPasswordAction(formData.password);

    if (error) {
      setErrors({ general: mapAuthError(error) });
      setStatus("idle");
      return;
    }

    setStatus("success");
    setTimeout(() => router.push("/login"), 2000);
  };

  return {
    formData,
    errors,
    status,
    showPassword,
    showConfirm,
    handleChange,
    handleSubmit,
    toggleShowPassword,
    toggleShowConfirm,
  };
}