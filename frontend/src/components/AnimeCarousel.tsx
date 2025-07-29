import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import AnimeCard from './AnimeCard';

type Anime = {
  title: string;
  image: string;
  slug: string;
};

type Props = {
  title: string;
  animes: Anime[];
};

const AnimeCarousel = ({ title, animes }: Props) => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 6, spacing: 15 },
  });

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <div ref={ref} className="keen-slider">
        {animes.map((anime, index) => (
          <div className="keen-slider__slide" key={index}>
            <AnimeCard {...anime} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeCarousel;
