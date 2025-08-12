// src/App.tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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
import RecentlyAdded from './pages/RecentlyAdded';
import TopUpcoming from './pages/TopUpcoming';
import Movies from './pages/Movies';
import TVSeries from './pages/TVSeries';
import OVAs from './pages/OVAs';
import ONAs from './pages/ONAs';
import Footer from './components/Footer';
import AZList from './pages/AZList';
import GenreList from './pages/GenreList';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="bg-gray-900 text-white flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <div className="p-4 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top-airing" element={<TopAiring />} />
          <Route path="/most-popular" element={<MostPopular />} />
          <Route path="/most-favorite" element={<MostFavorite />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/recently-updated" element={<RecentlyUpdated />} />
          <Route path="/search" element={<Search />} />
          <Route path="/details/:id" element={<AnimeDetail />} />
          <Route path="/watch/:slugAndEpisode" element={<WatchEpisode />} />
          <Route path="/recently-added" element={<RecentlyAdded />} />
          <Route path="/top-upcoming" element={<TopUpcoming />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TVSeries />} />
          <Route path="/ova" element={<OVAs />} />
          <Route path="/ona" element={<ONAs />} />
          <Route path="/az-list/:letter" element={<AZList />} />
          <Route path="/genre/:genre" element={<GenreList />} />

          {/* Optional fallback */}
          <Route path="*" element={<div className="text-center mt-10">404: Not Found</div>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
