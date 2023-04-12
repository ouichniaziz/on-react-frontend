import { useQueryClient } from "@tanstack/react-query";
export const getSerieQueryData = (id: number) => {
  const queryClient = useQueryClient();

  const queryData = queryClient.getQueryData<SerieShow>(["series", id], {
    exact: true,
  });
  return { show: queryData };
};
