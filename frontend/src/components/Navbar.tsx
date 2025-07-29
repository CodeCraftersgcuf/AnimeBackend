// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-4 py-3 flex gap-6">
      <Link to="/">Home</Link>
      <Link to="/top-airing">Top Airing</Link>
      <Link to="/most-popular">Most Popular</Link>
      <Link to="/completed">Completed</Link>
    </nav>
  );
};

export default Navbar;
