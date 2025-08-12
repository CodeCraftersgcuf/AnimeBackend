// src/components/Navbar.tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaDiscord, FaTelegram, FaRedditAlien, FaTwitter, FaSearch } from 'react-icons/fa';
import Sidebar from './Sidebar';

interface AnimeItem {
  title: string;
  alternativeTitle: string;
  id: string;
  poster: string;
  episodes: { sub: number; dub: number; eps: number };
  type: string;
  duration: string;
}

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Debounced search effect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim().length > 0) {
        fetchResults(search);
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const fetchResults = async (query: string) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3030/api/v1/search?keyword=${encodeURIComponent(query)}&page=1`);
      const data = await res.json();
      if (data.success && data.data?.response) {
        setResults(data.data.response);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search)}`);
      setSearch('');
      setResults([]);
    }
  };

  const handleResultClick = (id: string) => {
    navigate(`/details/${id}`);
    setSearch('');
    setResults([]);
  };

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <header className="w-full bg-[#232234] px-4 py-2 flex items-center gap-4 relative z-30">
        {/* Sidebar Icon */}
        <button
          className="text-white text-2xl mr-2"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <FaBars />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center text-2xl font-bold mr-4 select-none">
          <span className="text-white">h</span>
          <span className="text-pink-400">!</span>
          <span className="text-white">anime</span>
        </Link>

        {/* Search Bar */}
        <div className="relative w-full max-w-md mr-4">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-white rounded-md overflow-hidden w-full"
          >
            <input
              type="text"
              placeholder="Search anime..."
              className="px-3 py-2 outline-none w-full text-gray-800"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button type="submit" className="px-3 text-gray-700 hover:text-black">
              <FaSearch />
            </button>
            <button
              type="button"
              className="bg-black text-white px-3 py-1 ml-1 rounded"
              tabIndex={-1}
            >
              Filter
            </button>
          </form>

          {/* Search dropdown results */}
          {results.length > 0 && (
            <ul className="absolute left-0 right-0 mt-1 bg-[#232234] shadow-lg rounded-lg max-h-80 overflow-y-auto z-50 border border-pink-400">
              {loading && <li className="p-3 text-gray-300 text-center">Loading...</li>}
              {!loading &&
                results.map((anime) => (
                  <li
                    key={anime.id}
                    onClick={() => handleResultClick(anime.id)}
                    className="flex items-center gap-3 p-2 cursor-pointer hover:bg-pink-400/20 transition"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={anime.poster}
                        alt={anime.title}
                        className="w-12 h-16 object-cover rounded-md border border-gray-700"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-white truncate">{anime.title}</span>
                      <span className="text-xs text-gray-400 truncate">{anime.alternativeTitle}</span>
                      <div className="flex gap-2 mt-1 text-xs">
                        <span className="bg-black/60 text-white px-2 py-0.5 rounded">{anime.type}</span>
                        <span className="bg-black/60 text-white px-2 py-0.5 rounded">{anime.duration}</span>
                        <span className="bg-green-600 text-white px-2 py-0.5 rounded">cc {anime.episodes.sub}</span>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-2 mr-4">
          <a href="https://discord.com/" target="_blank" rel="noopener noreferrer" className="text-[#5865F2] text-xl"><FaDiscord /></a>
          <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="text-[#229ED9] text-xl"><FaTelegram /></a>
          <a href="https://reddit.com/" target="_blank" rel="noopener noreferrer" className="text-[#FF4500] text-xl"><FaRedditAlien /></a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-[#1DA1F2] text-xl"><FaTwitter /></a>
        </div>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-white/90">
          <Link to="#" className="hover:text-pink-400">Watch2gether</Link>
          <Link to="#" className="hover:text-pink-400">Random</Link>
          <Link to="#" className="hover:text-pink-400">Anime Name</Link>
          <Link to="#" className="hover:text-pink-400">News</Link>
          <Link to="#" className="hover:text-pink-400">Community</Link>
        </nav>

        {/* Language Toggle */}
        <div className="flex items-center gap-1 ml-4">
          <span className="bg-pink-400 text-xs px-2 py-1 rounded font-bold">EN</span>
          <span className="bg-gray-700 text-xs px-2 py-1 rounded">JP</span>
        </div>

        {/* Login Button */}
        <Link
          to="/login"
          className="ml-4 bg-pink-200 text-pink-900 font-semibold px-5 py-2 rounded-lg hover:bg-pink-300 transition"
        >
          Login
        </Link>
      </header>
    </>
  );
};

export default Navbar;
