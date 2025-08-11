import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AnimeCardGrid from '../components/AnimeCardGrid';
import type { Anime } from '../components/AnimeCardGrid';

type PageInfo = {
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
};

const genreColors: Record<string, string> = {
  Action: 'text-green-400',
  Adventure: 'text-orange-400',
  Cars: 'text-red-400',
  Comedy: 'text-gray-300',
  Dementia: 'text-gray-300',
  Demons: 'text-gray-300',
  Drama: 'text-cyan-400',
  Ecchi: 'text-gray-300',
  Fantasy: 'text-purple-400',
  Game: 'text-gray-300',
  Harem: 'text-gray-300',
  Historical: 'text-gray-300',
  Horror: 'text-gray-300',
  Isekai: 'text-blue-400',
  Josei: 'text-lime-400',
  Kids: 'text-pink-400',
  Magic: 'text-pink-400',
  'Martial Arts': 'text-gray-300',
  Mecha: 'text-gray-300',
  Military: 'text-gray-300',
  Music: 'text-teal-400',
  Mystery: 'text-lime-300',
  Parody: 'text-gray-300',
  Police: 'text-pink-300',
  Psychological: 'text-gray-300',
  Romance: 'text-gray-300',
  Samurai: 'text-gray-300',
  School: 'text-cyan-300',
  'Sci-Fi': 'text-blue-300',
  Seinen: 'text-pink-400',
  Shoujo: 'text-pink-400',
  'Shoujo Ai': 'text-gray-300',
  Shounen: 'text-gray-300',
  'Shounen Ai': 'text-pink-300',
  'Slice of Life': 'text-cyan-300',
  Space: 'text-purple-300',
  Sports: 'text-orange-400',
  'Super Power': 'text-pink-400',
  Supernatural: 'text-gray-300',
  Thriller: 'text-gray-300',
  Vampire: 'text-gray-300',
};

const genreList = [
  'Action', 'Adventure', 'Cars', 'Comedy', 'Dementia', 'Demons', 'Drama', 'Ecchi', 'Fantasy', 'Game',
  'Harem', 'Historical', 'Horror', 'Isekai', 'Josei', 'Kids', 'Magic', 'Martial Arts', 'Mecha', 'Military',
  'Music', 'Mystery', 'Parody', 'Police', 'Psychological', 'Romance', 'Samurai', 'School', 'Sci-Fi', 'Seinen',
  'Shoujo', 'Shoujo Ai', 'Shounen', 'Shounen Ai', 'Slice of Life', 'Space', 'Sports', 'Super Power', 'Supernatural',
  'Thriller', 'Vampire'
];

const GenreList = () => {
  const { genre = 'Action' } = useParams<{ genre: string }>();
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({ totalPages: 1, currentPage: 1, hasNextPage: false });
  const [loading, setLoading] = useState(true);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3030/api/v1/animes/genre/${genre}?page=${page}`);
      const json = await res.json();
      setAnimes(json.data.response);
      setPageInfo(json.data.pageInfo);
    } catch {
      setAnimes([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(1);
    // eslint-disable-next-line
  }, [genre]);

  const handlePage = (page: number) => {
    fetchData(page);
  };

  return (
    <div>
      <h1 className="text-pink-300 text-2xl font-bold mb-6">Genre: {genre}</h1>
      <div className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-2 gap-x-6">
          {genreList.map(g => (
            <a
              key={g}
              href={`/genre/${encodeURIComponent(g)}`}
              className={`block font-semibold hover:underline ${
                genre === g ? 'underline ' : ''
              }${genreColors[g] || 'text-gray-300'}`}
            >
              {g}
            </a>
          ))}
        </div>
      </div>
      {loading ? (
        <div className="text-white text-center mt-10">Loading...</div>
      ) : (
        <>
          <AnimeCardGrid animes={animes} />
          <div className="flex justify-center gap-4 mt-8">
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={pageInfo.currentPage <= 1}
              onClick={() => handlePage(pageInfo.currentPage - 1)}
            >
              Prev
            </button>
            <span className="text-white px-2 py-2">
              Page {pageInfo.currentPage} / {pageInfo.totalPages}
            </span>
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={!pageInfo.hasNextPage}
              onClick={() => handlePage(pageInfo.currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default GenreList;
