import { useQueryClient } from "@tanstack/react-query";
import { SerieShow } from "../types";
export const getSerieQueryData = (id: number) => {
  const queryClient = useQueryClient();

  const queryData = queryClient.getQueryData<SerieShow | undefined>(
    ["series", id],
    {
      exact: true,
    }
  );
  return { show: queryData };
};
