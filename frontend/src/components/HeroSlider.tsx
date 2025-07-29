import { useKeenSlider } from 'keen-slider/react';
import { Link } from 'react-router-dom';

type Slide = {
  title: string;
  image: string;
  slug: string;
};

const HeroSlider = ({ slides }: { slides: Slide[] }) => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    created: slider => {
      setInterval(() => slider.next(), 5000);
    },
  });

  return (
    <div ref={ref} className="keen-slider h-72 md:h-[400px] overflow-hidden rounded-lg">
      {slides.map((anime, index) => (
        <div
          key={index}
          className="keen-slider__slide relative bg-black text-white"
          style={{
            backgroundImage: `url(${anime.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="bg-black/60 p-4 absolute bottom-0 w-full">
            <h2 className="text-xl md:text-2xl font-bold">{anime.title}</h2>
            <Link
              to={`/anime/${anime.slug}`}
              className="mt-2 inline-block bg-white text-black px-3 py-1 rounded text-sm"
            >
              Watch Now
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSlider;
