import { Link, useLocation } from 'react-router-dom';

const sidebarLinks = [
  { label: 'Home', to: '/' },
  { label: 'Top Airing', to: '/top-airing' },
  { label: 'Most Popular', to: '/most-popular' },
  { label: 'Most Favorite', to: '/most-favorite' },
  { label: 'Completed', to: '/completed' },
  { label: 'Recently Added', to: '/recently-added' },
  { label: 'Recently Updated', to: '/recently-updated' },
  { label: 'Top Upcoming', to: '/top-upcoming' },
  { label: 'Movies', to: '/movies' },
  { label: 'TV Series', to: '/tv' },
  { label: 'OVAs', to: '/ova' },
  { label: 'ONAs', to: '/ona' },
];

const genreList = [
  'Action', 'Adventure', 'Cars', 'Comedy', 'Dementia', 'Demons', 'Drama', 'Ecchi', 'Fantasy', 'Game',
  'Harem', 'Historical', 'Horror', 'Isekai', 'Josei', 'Kids', 'Magic', 'Martial Arts', 'Mecha', 'Military',
  'Music', 'Mystery', 'Parody', 'Police', 'Psychological', 'Romance', 'Samurai', 'School', 'Sci-Fi', 'Seinen',
  'Shoujo', 'Shoujo Ai', 'Shounen', 'Shounen Ai', 'Slice of Life', 'Space', 'Sports', 'Super Power', 'Supernatural',
  'Thriller', 'Vampire'
];

const genreColors: Record<string, string> = {
  Action: 'text-green-400',
  Adventure: 'text-orange-400',
  Cars: 'text-red-400',
  Drama: 'text-cyan-400',
  Fantasy: 'text-purple-400',
  Isekai: 'text-blue-400',
  Josei: 'text-lime-400',
  Kids: 'text-pink-400',
  Magic: 'text-pink-400',
  Music: 'text-teal-400',
  Mystery: 'text-lime-300',
  Police: 'text-pink-300',
  School: 'text-cyan-300',
  'Sci-Fi': 'text-blue-300',
  Seinen: 'text-pink-400',
  Shoujo: 'text-pink-400',
  'Shounen Ai': 'text-pink-300',
  'Slice of Life': 'text-cyan-300',
  Space: 'text-purple-300',
  Sports: 'text-orange-400',
  'Super Power': 'text-pink-400',
  // fallback for others
};

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const location = useLocation();
  const genreActive = location.pathname.startsWith('/genre/');

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 shadow-lg transform transition-transform ${open ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Sidebar"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          <span className="text-2xl font-bold text-white">
            h<span className="text-pink-400">!</span>anime
          </span>
          <button onClick={onClose} className="text-white text-2xl">&times;</button>
        </div>
        {/* Improved scroll styling */}
        <nav className="flex flex-col gap-2 p-4 overflow-y-auto h-[calc(100vh-72px)] no-scrollbar">
          {sidebarLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded ${
                location.pathname === link.to
                  ? 'bg-pink-500 text-white font-bold'
                  : 'text-white hover:bg-gray-800'
              }`}
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-6">
            <div className="font-bold text-white mb-2">Genre</div>
            <div className="grid grid-cols-2 gap-y-1 gap-x-2">
              {genreList.map(g => (
                <Link
                  key={g}
                  to={`/genre/${encodeURIComponent(g)}`}
                  className={`block font-semibold text-sm hover:underline ${
                    genreActive && decodeURIComponent(location.pathname.split('/').pop() || '') === g
                      ? 'underline'
                      : ''
                  } ${genreColors[g] || 'text-gray-300'}`}
                  onClick={onClose}
                >
                  {g}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
