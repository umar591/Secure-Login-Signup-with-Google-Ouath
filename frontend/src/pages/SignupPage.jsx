import AuthForm from "../components/Auth";
import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div>
        <AuthForm type="signup" />
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
