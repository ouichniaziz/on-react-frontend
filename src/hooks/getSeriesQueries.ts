import { useQueries } from "@tanstack/react-query";
import { SerieShow } from "../types";

export const getSerie = async (id: number): Promise<SerieShow> => {
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  return res.json();
};

export const getSeriesQueries = (seriesIds: number[]) =>
  useQueries({
    queries: seriesIds?.map((id: number) => {
      return {
        queryKey: ["series", id],
        queryFn: () => getSerie(id),
      };
    }),
  });
