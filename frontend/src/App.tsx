// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TopAiring from './pages/TopAiring';
import MostPopular from './pages/MostPopular';
import MostFavorite from './pages/MostFavorite';
import Completed from './pages/Completed';
import RecentlyUpdated from './pages/RecentlyUpdated';
import Search from './pages/Search';
import AnimeDetail from './pages/AnimeDetail';
import WatchEpisode from './pages/WatchEpisode';
import Watch from './pages/Watch';

function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top-airing" element={<TopAiring />} />
          <Route path="/most-popular" element={<MostPopular />} />
          <Route path="/most-favorite" element={<MostFavorite />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/recently-updated" element={<RecentlyUpdated />} />
          <Route path="/search" element={<Search />} />
          <Route path="/details/:id" element={<AnimeDetail />} />
          <Route path="/watch/:slug/:episode" element={<Watch />} />

          <Route path="/watch/:slug/:episode" element={<WatchEpisode />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
