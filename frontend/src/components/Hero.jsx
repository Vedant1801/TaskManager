import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="min-h-[70vh] flex flex-col items-center justify-center bg-[#8AA6D9] text-white text-center px-4"
    >
     
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 drop-shadow-md">
        Organize Your Tasks,  
        <span className="block text-indigo-900">
          Boost Your Productivity
        </span>
      </h1>

      
      <p className="text-base sm:text-lg max-w-2xl opacity-90 mb-8">
        TaskManager helps you plan, track, and manage your daily work with a
        clean interface, secure authentication, and seamless performance.
      </p>

     
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/register")}
          className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
        >
          Get Started
        </button>

        <button
          onClick={() => navigate("/login")}
          className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-700 transition"
        >
          Login
        </button>
      </div>
    </section>
  );
}
