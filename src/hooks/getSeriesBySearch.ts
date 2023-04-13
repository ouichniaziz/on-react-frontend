import { useQuery } from "@tanstack/react-query";
import { delay } from "../helpers/delay";

const getSeriesSearch = async (search: string): Promise<Serie[]> => {
  const res = await fetch(`https://api.tvmaze.com/search/shows?q=${search}`);
  /**
   * This delay is added just for demo purpose
   */
  await delay(1_000);
  return res.json();
};



export const getSeriesBySearch = (search: string) => {
  const query = useQuery({
    queryKey: ["series", "search", search],
    queryFn: () => getSeriesSearch(search),
    enabled: !!search,
  });
  return query;
};
