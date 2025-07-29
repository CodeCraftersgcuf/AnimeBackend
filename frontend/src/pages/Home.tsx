import { useHome } from '../hooks/useHome';
import SpotlightCarousel from '../components/SpotlightCarousel';
import AnimeSlider from '../components/AnimeSlider';

const Home = () => {
  const { data, isLoading, isError } = useHome();

  if (isLoading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (isError) return <div className="text-red-500 text-center mt-10">Error loading homepage</div>;

  const homeData = data?.data?.data; // 👈 FIXED

  return (
    <main className="p-4">
      <SpotlightCarousel data={homeData.spotlight} />

      <AnimeSlider title="Top Airing" data={homeData.topAiring} />
      <AnimeSlider title="Trending" data={homeData.trending} />
      <AnimeSlider title="Most Popular" data={homeData.mostPopular} />
      <AnimeSlider title="Most Favorite" data={homeData.mostFavorite} />
      <AnimeSlider title="Newly Added" data={homeData.newAdded} />
      <AnimeSlider title="Latest Completed" data={homeData.latestCompleted} />
      <AnimeSlider title="Latest Episodes" data={homeData.latestEpisode} />
      <AnimeSlider title="Top Upcoming" data={homeData.topUpcoming} />
    </main>
  );
};

export default Home;
