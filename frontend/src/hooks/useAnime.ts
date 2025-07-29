import { useQuery } from '@tanstack/react-query';
import { fetchEpisodesById, fetchAnimeDetails, fetchStreamSource } from '../api/anime';

export const useAnimeDetails = (id: string) =>
  useQuery({
    queryKey: ['anime-details', id],
    queryFn: () => fetchAnimeDetails(id),
    enabled: !!id,
  });

export const useEpisodes = (id: string) =>
  useQuery({
    queryKey: ['episodes', id],
    queryFn: () => fetchEpisodesById(id),
    enabled: !!id,
  });

export const useStreamSource = (episodeId: string) =>
  useQuery({
    queryKey: ['stream', episodeId],
    queryFn: () => fetchStreamSource(episodeId),
    enabled: !!episodeId,
  });
