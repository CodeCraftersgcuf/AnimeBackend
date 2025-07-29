import { Link } from 'react-router-dom';

const SpotlightCarousel = ({ data }: { data: any[] }) => {
  if (!data || data.length === 0) return null;

  const spotlight = data[0];

  return (
    <div className="w-full mb-8">
      <div className="relative rounded-lg overflow-hidden h-60 md:h-80 shadow-md">
        <img
          src={spotlight.poster}
          alt={spotlight.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end">
          <h2 className="text-white text-xl md:text-2xl font-bold">{spotlight.title}</h2>
          <p className="text-white text-sm mt-1 line-clamp-3">{spotlight.synopsis.slice(0, 140)}...</p>
          <Link
            to={`/details/${spotlight.id}`}
            className="text-sm text-blue-400 underline mt-2 inline-block"
          >
            Watch Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpotlightCarousel;
