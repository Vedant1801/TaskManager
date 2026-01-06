import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const path = location.pathname;
  const isDashboard = path === "/dashboard";
  const isAuthPage = path === "/login" || path === "/register";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-[#8AA6D9] py-8">
      <nav className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md px-10 py-5 flex items-center justify-between">

       
        <Link
          to={token ? "/dashboard" : "/"}
          className="text-2xl font-extrabold text-indigo-700 tracking-wide"
        >
          TaskManager
        </Link>

        <div className="flex items-center gap-8 text-lg font-medium">

         
          {!isDashboard && !isAuthPage && (
            <>
              <a
                href="#home"
                className="text-slate-600 hover:text-indigo-600 transition"
              >
                Home
              </a>
              <a
                href="#faq"
                className="text-slate-600 hover:text-indigo-600 transition"
              >
                FAQ
              </a>

              {!token && (
                <>
                  <Link
                    to="/login"
                    className="text-indigo-600 hover:underline"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </>
          )}

          {isAuthPage && (
            <Link
              to="/"
              className="text-indigo-600 font-semibold hover:underline"
            >
              ← Back to Home
            </Link>
          )}

    
          {isDashboard && token && (
            <>
              <span className="text-slate-600 font-semibold">
                Dashboard
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
