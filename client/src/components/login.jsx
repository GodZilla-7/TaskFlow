import { useState } from "react";
import { useNavigate } from "react-router"; // For navigation

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setSuccess("Loggin U in darling");
      
      localStorage.setItem("token", data.token);


      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp9116802.jpg')" }}
    >
    <div className="card w-96 shadow-lg p-8 rounded-lg bg-opacity-10 backdrop-blur-md ">
        <h2 className="text-2xl font-bold text-center mb-4 text-white">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="form-control w-full flex flex-col gap-1">
            <span className="label-text font-semibold text-white">Email</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="form-control w-full flex flex-col gap-1">
            <span className="label-text font-semibold text-white">Password</span>
            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button className="btn btn-primary w-full">Login</button>
        </form>

        <p className="text-center mt-4 text-sm text-white">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500">Sign Up</a>
        </p>
      </div>

      {/* Success Notification */}
      {success && (
        <div className="fixed bottom-4 left-4 bg-green-500 text-white p-4 rounded-lg shadow-lg animate-slideIn">
          {success}
          <span className="ml-2 loading loading-spinner loading-xs"></span>
        </div>
      )}

      {/* Error Notification */}
      {error && (
        <div className="fixed bottom-4 left-4 bg-red-500 text-white p-4 rounded-lg shadow-lg animate-slideIn">
          {error}
        </div>
      )}
    </div>
  );
}
