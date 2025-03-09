import { useState } from "react";
import { useNavigate } from "react-router"; // Ensure correct import

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [countdown, setCountdown] = useState(5);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
        }

        // Save username in localStorage
        localStorage.setItem("username", formData.username);

        setSuccess("Registration successful! Redirecting in ");
        let timer = 3;

        const interval = setInterval(() => {
            timer -= 1;
            setCountdown(timer);
            if (timer === 0) {
                clearInterval(interval);
                navigate("/login");
            }
        }, 1000);
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

        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="form-control w-full">
            <span className="label-text font-semibold">Username</span>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              className="input input-bordered w-full"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-control w-full flex flex-col gap-1">
            <span className="label-text font-semibold text-white">Email</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-control w-full flex flex-col gap-1">
          <span className="label-text font-semibold text-white">Password</span>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <button className="btn btn-primary w-full">Register</button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400">Login</a>
        </p>
      </div>

      {/* Success Toast */}
      {success && (
        <div className="fixed bottom-4 left-4 bg-green-500 text-white p-4 rounded-lg shadow-lg animate-slideIn">
          {success} {countdown > 0 && ` ${countdown}s...`}
          <span className="ml-2 loading loading-spinner loading-xs"></span>
        </div>
      )}

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-4 left-4 bg-red-500 text-white p-4 rounded-lg shadow-lg animate-slideIn">
          {error}
        </div>
      )}
    </div>
  );
}

export default Register;
