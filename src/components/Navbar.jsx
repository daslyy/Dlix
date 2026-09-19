import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const debounceRef = useRef(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      onSearch?.(query);
    }, 350);

    return () => clearTimeout(debounceRef.current);
  }, [query, onSearch]);

  async function handleLogout() {
    try {
      await logout();
      setMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  } 

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

  const initial = displayName?.[0]?.toUpperCase() || "?";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-void/95 backdrop-blur-sm shadow-lg shadow-black/40"
          : "bg-linear-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-8 py-3">
        <div className="flex items-center gap-8">
          <span className="font-display text-3xl tracking-wide text-ember select-none">
            DLIX
          </span>

          <div className="hidden md:flex gap-6 text-sm font-medium text-fog">
            <a href="/" className="hover:text-paper transition-colors">
              Browse
            </a>

            <a href="/" className="hover:text-paper transition-colors">
              My List
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* search */}
          <div className="flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              placeholder="Titles, people, genres"
              className={`bg-charcoal/90 text-sm text-paper placeholder:text-fog border border-charcoal-light rounded-full outline-none transition-all duration-300 focus:border-ember ${
                searchOpen
                  ? "w-40 sm:w-64 px-4 py-1.5 opacity-100"
                  : "w-0 px-0 py-1.5 opacity-0 border-transparent"
              }`}
            />

            <button
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Toggle search"
              className="text-paper p-2 hover:text-ember transition-colors"
            >
              <SearchIcon />
            </button>
          </div>

          {/* user menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen((m) => !m)}
              className="w-8 h-8 rounded bg-ember-deep flex items-center justify-center text-sm font-semibold uppercase"
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                initial
              )}
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-charcoal border border-charcoal-light rounded-md shadow-xl py-2 text-sm">
                <div className="px-4 py-2  border-b border-charcoal-light">
                  <p className="text-paper font-medium truncate">
                    {displayName}
                  </p>

                  <p className="text-fog text-xs truncate mt-1">
                    {user?.email}
                  </p>                  
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-charcoal-light transition-colors"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="film-strip" />
    </nav>
  );
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
