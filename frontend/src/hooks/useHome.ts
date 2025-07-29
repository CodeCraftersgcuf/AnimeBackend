import { useQuery } from "@tanstack/react-query";
import api from "../api/client";

export const useHome = () =>
  useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      const res = await api.get("/home");
      if (!res.data) throw new Error("Failed to fetch home data");
      console.log("Fetched home data:", res.data);
      return res.data;
    },
  });
