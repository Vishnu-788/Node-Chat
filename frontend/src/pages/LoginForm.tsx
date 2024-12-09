import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "../store/features/hooks";
import { Login } from "../store/features/userStore";

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Insufficient credientials");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        }
      );
      const { user, token } = response.data;

      dispatch(
        Login({
          user: user.name,
          email: user.email,
          token: token,
          url: user.profileMeta.url,
        })
      );

      setError(null);
      navigate("/");
    } catch (error) {
      console.error("Error occurred");
      if (axios.isAxiosError(error)) {
        // Extract the message if it's an Axios error
        setError(error.response?.data.message || error.message);
      } else {
        // Handle non-Axios errors
        setError(String(error));
      }
    }
  };
  return (
    <div className="bg-slate-700 w-full h-screen flex items-center justify-center p-4">
      <form className="bg-slate-900 p-10 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-8 text-blue-400 text-center">
          Login
        </h2>
        <div className="mb-6">
          {error && (
            <div className="mb-4 p-4 bg-red-800 text-red-300 border border-red-600 rounded-md shadow-sm">
              <p className="text-sm">{error}</p>
            </div>
          )}
          <label
            htmlFor="email"
            className="block text-sm font-medium text-blue-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="mt-2 w-full px-6 py-3 border border-slate-600 bg-slate-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-blue-300"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            className="mt-2 w-full px-6 py-3 border border-slate-600 bg-slate-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300 font-medium"
        >
          Login
        </button>
        <p className="mt-6 text-sm text-center text-blue-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
