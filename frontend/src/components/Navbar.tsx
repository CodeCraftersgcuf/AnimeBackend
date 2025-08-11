// src/components/Navbar.tsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaDiscord, FaTelegram, FaRedditAlien, FaTwitter, FaSearch } from 'react-icons/fa';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search)}`);
      setSearch('');
    }
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
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white rounded-md overflow-hidden w-full max-w-md mr-4"
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

      {/* Desktop sidebar navigation (optional, if you want to show active tab on desktop too) */}
      {/* 
      <nav className="hidden md:flex gap-2 px-4 py-2 bg-gray-900">
        {sidebarLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`px-3 py-1 rounded ${
              location.pathname === link.to
                ? 'bg-pink-500 text-white font-bold'
                : 'text-white hover:bg-gray-800'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      */}
    </>
  );
};

export default Navbar;
