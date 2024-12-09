import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/features/hooks";
import { Login } from "../store/features/userStore";
import axios from "axios";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profileImage, setProfileImage] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const formdata = new FormData();

  const handleImageUpload = (e: any): void => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      const file: File = e.target.files[0];
      setProfileImage(file);
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      console.log("FIle that is being uploaded", file);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (profileImage) {
      formdata.append("picture", profileImage);
    }
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { user, token } = response.data;
      console.log(user, token);

      dispatch(
        Login({
          user: user.name,
          email: user.email,
          token: token,
          url: user.profileMeta.url,
        })
      );

      console.log("Signup Successfull", response.data);

      setError(null);
      navigate("/");
    } catch (error) {
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
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-10 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-3xl font-bold mb-8 text-blue-400 text-center">
          Sign Up
        </h2>
        <div className="profile relative mb-6">
          {error && (
            <div className="mb-4 p-4 bg-red-800 text-red-300 border border-red-600 rounded-md shadow-sm">
              <p className="text-sm">{error}</p>
            </div>
          )}
          <div className="w-24 h-24 mx-auto bg-blue-300 rounded-full flex items-center justify-center overflow-hidden relative">
            <input
              type="file"
              name="picture"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <img
              src={imagePreview} // Replace with a placeholder or state for the image preview
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <label className="mt-4 block text-blue-400 text-sm text-center">
            Click the circle to upload your profile picture
          </label>
        </div>

        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-blue-300"
          >
            Username
          </label>
          <input
            type="text"
            id="text"
            name="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Username"
            className="mt-2 w-full px-6 py-3 border border-slate-600 bg-slate-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-blue-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-2 w-full px-6 py-3 border border-slate-600 bg-slate-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-blue-300"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mt-2 w-full px-6 py-3 border border-slate-600 bg-slate-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-6 mt-2 rounded-md hover:bg-blue-600 transition duration-300 font-medium"
        >
          Sign Up
        </button>
        <p className="mt-6 text-sm text-center text-blue-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;
