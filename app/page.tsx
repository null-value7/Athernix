import Image from "next/image";
import AuthForm from '@/controllers/auth/AuthForm';
import RegisterView from "./register/page";
import LoginView from "./login/page";

export default function Home() {
  return (
    <div >
      <RegisterView/>
    </div>
  );
}
