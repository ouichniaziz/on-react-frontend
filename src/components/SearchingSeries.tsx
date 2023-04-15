import { UseQueryResult } from "@tanstack/react-query";
import LoadingSpinner from "./ui/LoaderSpinner";
import { Serie as SerieType, SerieIds } from "../types";
import { Serie } from "./Serie";

type SearchingSeriesProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchSeriesQuery: UseQueryResult<SerieType[], unknown>;
  search: string;
  myListIds: SerieIds[];
  setMyListIds: React.Dispatch<React.SetStateAction<SerieIds[] | undefined>>;
};

const SearchingSeries = ({
  setSearch,
  searchSeriesQuery,
  search,
  myListIds = [],
  setMyListIds,
}: SearchingSeriesProps) => {
  const handleSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };
  return (
    <div className="bloc">
      <div className="bloc__container">
        <h2 className="">Rechercher</h2>
      </div>
      <div className="bloc__input">
        <input
          type="text"
          placeholder="Recherche Serie"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      {search === "" ? <p className="bloc__label">Pas de recherche</p> : null}
      {searchSeriesQuery.isLoading && search ? (
        <LoadingSpinner />
      ) : (
        searchSeriesQuery.isSuccess &&
        searchSeriesQuery.data?.map((serie) => (
          <Serie
            key={serie?.show!.id}
            serie={serie}
            myListIds={myListIds}
            setMyListIds={setMyListIds}
          />
        ))
      )}
    </div>
  );
};

export default SearchingSeries;
