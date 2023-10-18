import { useState } from "react";
import style from "./style.module.scss";
import { Input } from "@mui/material";
import Track from "../../components/Track/Track";
import tracksList from "../../assets/tracks";

export const runSearch = (query) => {
  if (!query) {
    return tracksList;
  }

  const lowerCaseQuery = query.toLowerCase();

  return tracksList.filter(
    (track) =>
      track.title.toLowerCase().includes(lowerCaseQuery) ||
      track.artists.toLowerCase().includes(lowerCaseQuery)
  );
};

const SearchPage = () => {
  const [tracks, setTracks] = useState(tracksList);

  const handleChange = (e) => {
    const foundTracks = runSearch(e.target.value);
    setTracks(foundTracks);
  };

  const SearchResults = () => (
    <div className={style.list}>
      {tracks.map((track) => (
        <Track key={track.id} {...track} />
      ))}
    </div>
  );

  return (
    <div className={style.search}>
      <Input
        onChange={handleChange}
        className={style.input}
        placeholder="Поиск треков"
      />
      <SearchResults />
    </div>
  );
};

export default SearchPage;
