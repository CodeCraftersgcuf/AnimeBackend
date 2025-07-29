// src/lib/api.ts
export const fetchEpisodesBySlug = async (slug: string = 'one-piece-100') => {
  const res = await fetch(`http://localhost:3030/api/v1/episodes/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch episodes');
  const json = await res.json();
  return json.data;
};
