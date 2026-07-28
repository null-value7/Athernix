
import { redirect } from "next/navigation";
import { createClient, hasSupabaseServerConfig } from "@/lib/supabase/supabase-server";
import ResetPasswordView from "@/app/resetpassword/page";

export default async function UpdatePasswordPage() {
  if (!hasSupabaseServerConfig()) {
    redirect("/login");
  }

  const supabase = await createClient();
  const { data: {user} } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <ResetPasswordView />;
}
