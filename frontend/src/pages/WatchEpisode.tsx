// src/pages/WatchEpisode.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const WatchEpisode = () => {
  const { slug, episode } = useParams<{ slug: string; episode: string }>();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug || !episode) return;

    const fetchEpisode = async () => {
      try {
        const res = await fetch(`http://localhost:3030/api/v1/stream/${slug}?ep=${episode}`);
        const json = await res.json();
        setVideoUrl(json?.data?.sources?.[0]?.url || null);
      } catch (err) {
        console.error('❌ Error loading stream:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisode();
  }, [slug, episode]);

  if (loading) return <div className="text-white text-center mt-10">Loading episode...</div>;
  if (!videoUrl) return <div className="text-red-500 text-center mt-10">Episode not available</div>;

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <video controls autoPlay className="w-full max-w-5xl rounded-lg shadow-lg">
        <source src={videoUrl} type="application/x-mpegURL" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default WatchEpisode;
