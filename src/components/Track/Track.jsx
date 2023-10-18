import { useContext } from "react";
import { AudioContext } from "../../context/AudioContext";
import { secondsToMMSS } from "../../context/AudioContext";
import { IconButton } from "@mui/material";
import { Pause, PlayArrow } from "@mui/icons-material";
import style from "./style.module.scss";
import cn from "classnames";

const Track = (track) => {
  const { src, preview, title, artists } = track;

  const { currentTrack, handleToggleAudio, isPlaying } =
    useContext(AudioContext);

  const isCurrentTrackPlaying = currentTrack.src === src;

  const duration = secondsToMMSS(track.duration);

  return (
    <div className={cn(style.track, isCurrentTrackPlaying && style.playing)}>
      <IconButton onClick={() => handleToggleAudio(track)}>
        {isCurrentTrackPlaying && isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <img className={style.preview} src={preview} alt="" />
      <div className={style.credits}>
        <b>{title}</b>
        <p>{artists}</p>
      </div>
      <p>{duration}</p>
    </div>
  );
};

export default Track;
