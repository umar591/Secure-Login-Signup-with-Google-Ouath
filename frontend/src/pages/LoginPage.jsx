import AuthForm from "../components/Auth";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 ">
      <div>
        <AuthForm type="login" />
        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
