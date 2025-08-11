import { useNavigate, useLocation } from 'react-router-dom';

const azList = [
  { label: 'All', value: 'all' },
  { label: '#', value: 'symbol' },
  { label: '0-9', value: '0-9' },
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => ({ label: l, value: l.toLowerCase() })),
];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract current letter from URL if on /az-list/:letter
  const match = location.pathname.match(/^\/az-list\/([^/]+)/);
  const current = match ? match[1] : 'all';

  const handleNav = (val: string) => {
    if (val === 'all') navigate('/az-list/all');
    else if (val === 'symbol') navigate('/az-list/symbol');
    else if (val === '0-9') navigate('/az-list/0-9');
    else navigate(`/az-list/${val}`);
  };

  return (
    <footer className="bg-[#232234] text-white py-8 px-2 mt-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="font-bold text-lg mr-2">A-Z LIST</span>
          <span className="text-gray-300">Searching anime order by alphabet name A to Z.</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {azList.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => handleNav(value)}
              className={`px-4 py-2 rounded font-semibold transition ${
                current === value
                  ? 'bg-pink-500 text-white'
                  : 'bg-[#2c2c3a] text-white hover:bg-pink-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-6 text-gray-400 text-sm mb-2">
          <a href="#" className="hover:text-pink-400">Terms of service</a>
          <a href="#" className="hover:text-pink-400">DMCA</a>
          <a href="#" className="hover:text-pink-400">Contact</a>
          <a href="#" className="hover:text-pink-400">HiAnime App</a>
        </div>
        <div className="text-xs text-gray-500 mb-1">
          HiAnime does not store any files on our server, we only linked to the media which is hosted on 3rd party services.
        </div>
        <div className="text-xs text-gray-500">
          © HiAnime.to. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
