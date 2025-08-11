import { useEffect, useState } from 'react';
import AnimeCardGrid from '../components/AnimeCardGrid';
import type { Anime } from '../components/AnimeCardGrid';

type PageInfo = {
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
};

const TVSeries = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({ totalPages: 1, currentPage: 1, hasNextPage: false });
  const [loading, setLoading] = useState(true);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3030/api/v1/animes/tv?page=${page}`);
      const json = await res.json();
      setAnimes(json.data.response);
      setPageInfo(json.data.pageInfo);
    } catch {
      setAnimes([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const handlePage = (page: number) => {
    fetchData(page);
  };

  return (
    <div>
      <h1 className="text-blue-400 text-2xl font-bold mb-6">Anime TV Series</h1>
      {loading ? (
        <div className="text-white text-center mt-10">Loading...</div>
      ) : (
        <>
          <AnimeCardGrid animes={animes} />
          <div className="flex justify-center gap-4 mt-8">
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={pageInfo.currentPage <= 1}
              onClick={() => handlePage(pageInfo.currentPage - 1)}
            >
              Prev
            </button>
            <span className="text-white px-2 py-2">
              Page {pageInfo.currentPage} / {pageInfo.totalPages}
            </span>
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={!pageInfo.hasNextPage}
              onClick={() => handlePage(pageInfo.currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TVSeries;
