import { useQueries } from "@tanstack/react-query";
import { getSerie } from "../hooks/getSeriesBySearch";
import { Serie } from "./Serie";

type SerieListProps = {
  myListIds: SerieIds[];
  setMyListIds: React.Dispatch<React.SetStateAction<SerieIds[] | undefined>>;
};

export const SeriesList = ({
  myListIds = [],
  setMyListIds,
}: SerieListProps) => {
  const seriesIds = myListIds.map((serie) => serie.id);
  const seriesQueries = useQueries({
    queries: seriesIds?.map((id) => {
      return {
        queryKey: ["series", id],
        queryFn: () => getSerie(id),
      };
    }),
  });
  const seriesQueriesData = seriesQueries.map((serie: any) => ({
    show: serie.data,
  }));

  const clearMyList = (): void => {
    if (myListIds.length === 0) return;
    setMyListIds([]);
  };

  return (
    <div className="bloc">
      <div className="bloc__container list">
        <h2 className="">Ma Liste</h2>
        <button onClick={clearMyList}>Vider ma liste</button>
      </div>
      {seriesIds.length === 0 ? (
        <p className="bloc__label">Liste vide</p>
      ) : null}
      {seriesQueriesData
        ? seriesQueriesData.map((serie) => (
            <Serie
              key={serie?.show?.id}
              serie={serie}
              myListIds={myListIds}
              setMyListIds={setMyListIds}
              isMyList
            />
          ))
        : null}
    </div>
  );
};
