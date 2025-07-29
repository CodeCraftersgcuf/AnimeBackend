import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AnimeDetails = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/api/v1/anime/${id}`)
      .then((res) => {
        setAnime(res.data?.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (!anime) return <div className="text-red-500 text-center mt-10">Anime not found</div>;

  return (
    <div className="text-white">
      {/* Banner */}
      <div className="relative h-60 md:h-80 w-full overflow-hidden">
        <img src={anime.poster} alt={anime.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      </div>

      <div className="p-4 max-w-6xl mx-auto">
        {/* Main Details */}
        <div className="flex gap-6 flex-col md:flex-row">
          <img
            src={anime.poster}
            alt={anime.title}
            className="w-48 h-72 object-cover rounded shadow-md"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-1">{anime.title}</h1>
            <h2 className="text-md text-gray-400 italic mb-2">{anime.alternativeTitle}</h2>

            <div className="flex flex-wrap gap-2 text-sm text-gray-300 mb-3">
              <span className="bg-gray-700 px-2 py-1 rounded">Type: {anime.type}</span>
              <span className="bg-gray-700 px-2 py-1 rounded">Status: {anime.status}</span>
              <span className="bg-gray-700 px-2 py-1 rounded">Duration: {anime.duration}</span>
              <span className="bg-gray-700 px-2 py-1 rounded">Aired: {anime.aired?.from}</span>
              <span className="bg-gray-700 px-2 py-1 rounded">Rating: {anime.rating}</span>
              {anime.premiered && (
                <span className="bg-gray-700 px-2 py-1 rounded">Season: {anime.premiered}</span>
              )}
            </div>

            {/* Genres */}
            {anime.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs text-white mb-4">
                {anime.genres.map((genre: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-indigo-700 px-2 py-1 rounded-full whitespace-nowrap"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-line">
              {anime.synopsis}
            </p>

            {/* Watch */}
            <div className="mt-5 flex gap-3">
              {anime.episodes?.sub > 0 && (
                <button className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition">
                  Watch Sub ({anime.episodes.sub})
                </button>
              )}
              {anime.episodes?.dub > 0 && (
                <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
                  Watch Dub ({anime.episodes.dub})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* More Seasons */}
        {anime.moreSeasons?.length > 1 && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-3">More Seasons</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {anime.moreSeasons.map((season: any) => (
                <Link
                  to={`/details/${season.id}`}
                  key={season.id}
                  className={`w-28 flex-shrink-0 ${
                    season.isActive ? 'border-2 border-pink-500' : ''
                  }`}
                >
                  <img
                    src={season.poster}
                    alt={season.title}
                    className="w-full h-36 object-cover rounded"
                  />
                  <p className="text-xs mt-1 text-center">{season.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Most Popular */}
        {anime.mostPopular?.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-3">Most Popular</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {anime.mostPopular.map((item: any) => (
                <Link to={`/details/${item.id}`} key={item.id} className="hover:scale-105 transition">
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="rounded object-cover w-full h-48"
                  />
                  <p className="text-xs mt-1">{item.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recommended */}
        {anime.recommended?.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-3">Recommended</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {anime.recommended.map((item: any) => (
                <Link to={`/details/${item.id}`} key={item.id} className="hover:scale-105 transition">
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="rounded object-cover w-full h-48"
                  />
                  <p className="text-xs mt-1">{item.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeDetails;
