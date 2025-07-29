import { Link } from 'react-router-dom';

type AnimeCardProps = {
  title: string;
  image: string;
  slug: string;
};

const AnimeCard = ({ title, image, slug }: AnimeCardProps) => {
  return (
    <Link to={`/anime/${slug}`} className="w-40">
      <img src={image} alt={title} className="rounded-md h-56 object-cover" />
      <p className="mt-1 text-sm truncate">{title}</p>
    </Link>
  );
};

export default AnimeCard;
