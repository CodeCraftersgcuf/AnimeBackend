// components/EpisodeList.tsx
import { Link } from 'react-router-dom';

type EpisodeListProps = {
  episodes: {
    number: string;
    slug: string;
  }[];
  animeSlug: string;
};

const EpisodeList = ({ episodes, animeSlug }: EpisodeListProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {episodes.map((ep, i) => (
        <Link
          to={`/watch/${animeSlug}/${ep.slug}`}
          key={i}
          className="bg-white text-black text-center py-2 rounded hover:bg-gray-200"
        >
          Episode {ep.number}
        </Link>
      ))}
    </div>
  );
};

export default EpisodeList;
