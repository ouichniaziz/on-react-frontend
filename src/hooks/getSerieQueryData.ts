import { useQueryClient } from "@tanstack/react-query";
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
