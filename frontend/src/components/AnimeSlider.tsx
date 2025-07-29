import { Link } from 'react-router-dom';

interface AnimeSliderProps {
  title: string;
  data: any[];
}

const AnimeSlider = ({ title, data }: AnimeSliderProps) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="text-lg md:text-xl font-semibold text-white mb-3 px-1">{title}</h2>
      <div className="flex gap-4 overflow-x-auto px-1 no-scrollbar">
        {data.map((anime) => (
          <Link
            to={`/details/${anime.id}`}
            key={anime.id}
            className="min-w-[140px] md:min-w-[160px] hover:scale-[1.05] transition-transform duration-200"
          >
            <div className="rounded overflow-hidden shadow-md">
              <img
                src={anime.poster}
                alt={anime.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <p className="text-xs text-white mt-1 text-center line-clamp-2 px-1">{anime.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AnimeSlider;
