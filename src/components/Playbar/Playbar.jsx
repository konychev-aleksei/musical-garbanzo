import { useState, useEffect, useContext } from "react";
import { AudioContext } from "../../context/AudioContext";
import { secondsToMMSS } from "../../context/AudioContext";
import style from "./style.module.scss";
import { IconButton, Slider } from "@mui/material";
import { Pause, PlayArrow } from "@mui/icons-material";

const Playbar = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const { audio, currentTrack, handleToggleAudio, isPlaying } =
    useContext(AudioContext);

  const { title, artists, preview, duration } = currentTrack;

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(audio.currentTime);
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  const handleChangeCurrentTime = (_, value) => {
    const time = Math.round((value / 100) * duration);

    setCurrentTime(time);
    audio.currentTime = time;
  };

  const sliderCurrentTime = Math.round((currentTime / duration) * 100);

  const currentTimeFormated = secondsToMMSS(currentTime);
  const durationFormated = secondsToMMSS(duration);

  return (
    <div className={style.playbar}>
      <img className={style.preview} src={preview} alt="" />
      <IconButton onClick={() => handleToggleAudio(currentTrack)}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <div className={style.credits}>
        <h4>{title}</h4>
        <p>{artists}</p>
      </div>
      <div className={style.slider}>
        <p>{currentTimeFormated}</p>
        <Slider
          step={1}
          min={0}
          max={100}
          value={sliderCurrentTime}
          onChange={handleChangeCurrentTime}
        />
        <p>{durationFormated}</p>
      </div>
    </div>
  );
};

export default Playbar;
