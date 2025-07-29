import { useParams } from 'react-router-dom';
import { useEpisodes, useStreamSource } from '../hooks/useAnime';
import { useState } from 'react';

const Watch = () => {
  const { id } = useParams(); // episode id like "one-piece-100::ep=213"
  const [currentEpisodeId, setCurrentEpisodeId] = useState(id || '');

  const { data: episodeData, isLoading: loadingEpisodes } = useEpisodes(currentEpisodeId.split('::')[0]);
  const { data: streamData, isLoading: loadingStream } = useStreamSource(currentEpisodeId);

  if (loadingEpisodes || loadingStream) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Now Playing</h1>

      {/* Video Player */}
      {streamData?.sources ? (
        <video controls autoPlay className="w-full max-w-4xl mx-auto rounded shadow-lg mb-6">
          <source src={streamData.sources[0].url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div>No stream found</div>
      )}

      {/* Episode List */}
      <h2 className="text-xl font-semibold mb-2">Episodes</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {episodeData?.episodes?.map((ep: any) => (
          <button
            key={ep.id}
            onClick={() => setCurrentEpisodeId(ep.id)}
            className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded"
          >
            {ep.number || ep.id}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Watch;
