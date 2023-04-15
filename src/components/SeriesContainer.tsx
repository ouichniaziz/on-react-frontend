import { useState } from "react";
import { getSeriesBySearch } from "../hooks/getSeriesBySearch";
import SearchingSeries from "./SearchingSeries";
import { SeriesList } from "./SeriesList";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { SerieToWatch } from "./SerieToWatch";
import { SerieIds } from "../types";

export const SeriesContainer = () => {
  const [search, setSearch] = useState("");
  const searchSeriesQuery = getSeriesBySearch(search);
  const [myListIds, setMyListIds] = useLocalStorage<SerieIds[]>(
    "seriesIds",
    []
  );

  return (
    <div className="container">
      <SearchingSeries
        setSearch={setSearch}
        search={search}
        searchSeriesQuery={searchSeriesQuery}
        myListIds={myListIds}
        setMyListIds={setMyListIds}
      />
      <SeriesList myListIds={myListIds} setMyListIds={setMyListIds} />
      <SerieToWatch myListIds={myListIds} />
    </div>
  );
};
