"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LoginFormState,
  initialLoginFormState,
  signInWithCredentials,
  signInWithGoogle,
  signInWithGithub,
  getRoleDashboardPath,
} from "@/models/login";

export function useLoginController() {
  const router = useRouter();
  const [formState, setFormState] = useState<LoginFormState>(
    initialLoginFormState
  );

  const setField = useCallback(
    <K extends keyof LoginFormState>(key: K, value: LoginFormState[K]) => {
      setFormState((prev) => ({ ...prev, [key]: value, error: null }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formState.email || !formState.password) {
        setFormState((prev) => ({
          ...prev,
          error: "Por favor completa todos los campos.",
        }));
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formState.email)) {
        setFormState((prev) => ({
          ...prev,
          error: "Ingresa un correo electrónico válido.",
        }));
        return;
      }

      setFormState((prev) => ({ ...prev, isLoading: true, error: null }));

      const result = await signInWithCredentials({
        email: formState.email,
        password: formState.password,
        rememberSession: formState.rememberSession,
      });

      if (!result.success) {
        setFormState((prev) => ({
          ...prev,
          isLoading: false,
          error: result.error ?? "Error al iniciar sesión.",
        }));
        return;
      }

      const path = getRoleDashboardPath(result.role ?? "Personal");
      router.push(path);
    },
    [formState, router]
  );

  const handleGoogleLogin = useCallback(async () => {
    setFormState((prev) => ({ ...prev, isLoading: true, error: null }));
    const result = await signInWithGoogle();
    if (!result.success) {
      setFormState((prev) => ({
        ...prev,
        isLoading: false,
        error: result.error ?? "Error con Google.",
      }));
    }
  }, []);

  const handleGithubLogin = useCallback(async () => {
    setFormState((prev) => ({ ...prev, isLoading: true, error: null }));
    const result = await signInWithGithub();
    if (!result.success) {
      setFormState((prev) => ({
        ...prev,
        isLoading: false,
        error: result.error ?? "Error con GitHub.",
      }));
    }
  }, []);

  const handleForgotPassword = useCallback(() => {
    router.push("/forgotpassword");
  }, [router]);

  const handleRegister = useCallback(() => {
    router.push("/register");
  }, [router]);

  return {
    formState,
    setField,
    handleSubmit,
    handleGoogleLogin,
    handleGithubLogin,
    handleForgotPassword,
    handleRegister,
  };
}