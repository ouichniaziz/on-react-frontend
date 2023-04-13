import { useQueries } from "@tanstack/react-query";

export const getSerie = async (id: number): Promise<Serie[]> => {
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
