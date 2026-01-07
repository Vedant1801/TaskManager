import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const path = location.pathname;
  const isDashboard = path === "/dashboard";
  const isAuthPage = path === "/login" || path === "/register";

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setOpen(false);
  };

  return (
    <header className="bg-[#8AA6D9] py-6">
      <nav className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md px-6 py-4 flex items-center justify-between">

        <Link
          to={token ? "/dashboard" : "/"}
          className="text-2xl font-extrabold text-indigo-700 tracking-wide"
        >
          TaskManager
        </Link>

       
        <div className="hidden md:flex items-center gap-8 text-lg font-medium">

          {!isDashboard && !isAuthPage && (
            <>
              <a href="#home" className="text-slate-600 hover:text-indigo-600">
                Home
              </a>
              <a href="#faq" className="text-slate-600 hover:text-indigo-600">
                FAQ
              </a>

              {!token && (
                <>
                  <Link to="/login" className="text-indigo-600 hover:underline">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    Register
                  </Link>
                </>
              )}
            </>
          )}

          {isAuthPage && (
            <Link to="/" className="text-indigo-600 font-semibold hover:underline">
              ← Back to Home
            </Link>
          )}

          {isDashboard && token && (
            <>
              <span className="text-slate-600 font-semibold">Dashboard</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>

     
        <button
          className="md:hidden text-3xl text-indigo-700"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </nav>

      {open && (
        <div className="md:hidden max-w-6xl mx-auto bg-white mt-3 rounded-xl shadow-md px-6 py-4 space-y-4 text-lg font-medium">

          {!isDashboard && !isAuthPage && (
            <>
              <a href="#home" onClick={() => setOpen(false)} className="block text-slate-600">
                Home
              </a>
              <a href="#faq" onClick={() => setOpen(false)} className="block text-slate-600">
                FAQ
              </a>

              {!token && (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="block text-indigo-600">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="block bg-indigo-600 text-white px-4 py-2 rounded-lg text-center"
                  >
                    Register
                  </Link>
                </>
              )}
            </>
          )}

          {isAuthPage && (
            <Link to="/" onClick={() => setOpen(false)} className="block text-indigo-600">
              ← Back to Home
            </Link>
          )}

          {isDashboard && token && (
            <>
              <span className="block text-slate-600">Dashboard</span>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
