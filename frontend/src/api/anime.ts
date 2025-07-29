import api from "./client";

export const fetchAnimeDetails = async (id: string) => {
  const { data } = await api.get(`/anime/${id}`);
  if (!data) throw new Error("Failed to fetch anime details");
  console.log(`Fetched anime details for ID: ${id}`, data);
  return data;
};

export const fetchEpisodesById = async (id: string) => {
  const { data } = await api.get(`/episodes/${id}`);
  if (!data) throw new Error("Failed to fetch episodes");
  console.log(`Fetched episodes for anime ID: ${id}`, data);
  return data;
};

export const fetchStreamSource = async (episodeId: string) => {
  const { data } = await api.get(`/stream`, {
    params: {
      id: episodeId,
      type: "sub",
      server: "hd-2",
    },
  });
  if (!data) throw new Error("Failed to fetch stream source");
  console.log(`Fetched stream source for episode ID: ${episodeId}`, data);  
  return data;
};
