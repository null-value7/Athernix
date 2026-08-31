
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/supabase-server";
import ResetPasswordView from "@/app/resetpassword/page";

export default async function UpdatePasswordPage() {
  const supabase = await createClient();
  const { data: {user} } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <ResetPasswordView />;
}