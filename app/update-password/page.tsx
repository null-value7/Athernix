import ResetPasswordView from "@/app/resetpassword/page";

// La protección de esta ruta (sesión o código de recuperación) la hace el middleware.
// Mantener la página estática evita una edge function de ~2.7 MiB en el Worker.
export default function UpdatePasswordPage() {
  return <ResetPasswordView />;
}