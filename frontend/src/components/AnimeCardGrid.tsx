import { Link } from 'react-router-dom';

type Anime = {
  title: string;
  alternativeTitle: string;
  id: string;
  poster: string;
  episodes: { sub: number; dub: number; eps: number };
  type: string;
  duration: string;
};
export type { Anime };

interface Props {
  animes: Anime[];
}

const AnimeCardGrid = ({ animes }: Props) => (
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {animes.map(anime => (
      <Link
        to={`/details/${anime.id}`}
        key={anime.id}
        className="bg-[#232234] rounded-lg overflow-hidden shadow-md hover:scale-[1.03] transition-transform"
      >
        <div className="relative">
          <img src={anime.poster} alt={anime.title} className="w-full h-60 object-cover" />
          {/* Episode count badge */}
          <span className="absolute bottom-2 left-2 bg-green-600 text-xs text-white px-2 py-1 rounded">
            cc {anime.episodes.sub}
          </span>
          {/* Type badge */}
          <span className="absolute top-2 left-2 bg-black/80 text-xs text-white px-2 py-1 rounded">
            {anime.type}
          </span>
          {/* Duration badge */}
          <span className="absolute bottom-2 right-2 bg-black/80 text-xs text-white px-2 py-1 rounded">
            {anime.duration}
          </span>
        </div>
        <div className="p-3">
          <div className="font-semibold text-white truncate">{anime.title}</div>
          <div className="text-xs text-gray-400 truncate">{anime.alternativeTitle}</div>
        </div>
      </Link>
    ))}
  </div>
);

export default AnimeCardGrid;
