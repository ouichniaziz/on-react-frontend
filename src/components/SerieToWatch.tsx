import { Serie } from "./Serie";
import { getSerieQueryData } from "../hooks/getSerieQueryData";
import { useState } from "react";
import { SerieIds } from "../types";

type SerieToWatchProps = {
  myListIds: SerieIds[];
};

export const SerieToWatch = ({ myListIds }: SerieToWatchProps) => {
  const selectedSeries =
    myListIds
      ?.filter((serie) => serie.selected)
      .map((selectedSerie) => selectedSerie?.id) || [];
  const [randomSerieIndex, setRandomSerieIndex] = useState(
    Math.floor(Math.random() * selectedSeries?.length)
  );
  const randomSerieId = selectedSeries[randomSerieIndex] || selectedSeries[0];
  /**
   * After page refresh the cache is empty so we don't have a serieData
   */
  const serieData = getSerieQueryData(randomSerieId);

  const randomizeIndex = () => {
    if (selectedSeries.length === 1) return;
    setRandomSerieIndex(Math.floor(Math.random() * selectedSeries?.length));
  };

  return (
    <div className="watch">
      <div className="container-button">
        <button onClick={randomizeIndex}>
          Je vais regarder quoi ce soir ?
        </button>
      </div>
      <div className="container-serie">
        {selectedSeries.length > 0 && serieData.show ? (
          <Serie myListIds={myListIds} serie={serieData} isWatchList />
        ) : null}
      </div>
    </div>
  );
};
