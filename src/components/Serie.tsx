type SerieProps = {
  serie: Serie;
  setMyListIds?: React.Dispatch<React.SetStateAction<SerieIds[] | undefined>>;
  myListIds?: SerieIds[];
  isMyList?: boolean;
  isWatchList?: boolean;
};

export const Serie = ({
  serie,
  setMyListIds,
  myListIds,
  isMyList,
  isWatchList,
}: SerieProps) => {
  const serieYear = serie.show?.premiered?.split("-")[0];
  const seriesIds = myListIds?.map((serie) => serie.id);
  const selectSerieId = myListIds?.find(
    (serieId) => serieId.id === serie.show?.id
  );
  const summary = serie.show?.summary.replace(/<\/?p>/gi, "");

  /**
   * Add serie to my list (default: unselected/false)
   */
  const addSerieToMyList = (): void => {
    if (setMyListIds && serie) {
      setMyListIds((prevIds) => [
        ...(prevIds ?? []),
        { id: serie!.show!.id, selected: false },
      ]);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setMyListIds) {
      setMyListIds((prevIds) => {
        return (
          prevIds &&
          [...prevIds].map((serie) =>
            serie.id === selectSerieId?.id
              ? { ...selectSerieId, selected: event.target.checked }
              : serie
          )
        );
      });
    }
  };

  return (
    <div className={isWatchList ? "bloc__series-watch" : "bloc__series"}>
      <div className="bloc__series-img">
        <img
          src={
            serie.show?.image?.medium ??
            "https://media.istockphoto.com/id/1252582562/cs/vektor/404-internetov%C3%A1-chybov%C3%A1-str%C3%A1nka-nebyla-nalezena-ve-svisl%C3%A9-orientaci-pro-str%C3%A1nku-prohl%C3%AD%C5%BEe%C4%8De.jpg?s=1024x1024&w=is&k=20&c=fuNIj51wyyQeYBRum0_2sHa9r_hiMVxJiupiaFcbdzM="
          }
          alt="show image"
        />
      </div>
      <div className="bloc__series-infos">
        <h3>{serie.show?.name}</h3>
        <p>{serie.show?.runtime || 0} min</p>
        <p>{serie.show?.rating?.average}</p>
        <p>{serieYear}</p>
        {isWatchList ? (
          <p className="bloc__series-infos-summary">{summary}</p>
        ) : null}
      </div>
      {isWatchList ? null : !isMyList ? (
        <button
          className={
            seriesIds?.includes(Number(serie.show?.id) ?? 0) ? "inactive" : ""
          }
          onClick={addSerieToMyList}
          disabled={seriesIds?.includes(Number(serie.show?.id) ?? 0)}
        >
          Ajouter à ma liste
        </button>
      ) : (
        <input
          className="bloc__series-infos-checkbox"
          type="checkbox"
          checked={selectSerieId?.selected}
          onChange={handleCheckboxChange}
        />
      )}
    </div>
  );
};
