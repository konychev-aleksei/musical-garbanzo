import { useState, createContext } from "react";
import moment from "moment";
import tracks from "../assets/tracks";

export const AudioContext = createContext({});

const audio = new Audio();

const defaultTrack = tracks[0];

export const secondsToMMSS = (seconds) =>
  moment.utc(seconds * 1000).format("mm:ss");

const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(defaultTrack);
  const [isPlaying, setPlaying] = useState(false);

  const handleToggleAudio = (track) => {
    if (track.src !== currentTrack.src) {
      setCurrentTrack(track);
      setPlaying(true);

      audio.src = track.src;
      audio.currentTime = 0;
      audio.play();

      return;
    }

    if (isPlaying) {
      setPlaying(false);
      audio.pause();
    } else {
      setPlaying(true);
      audio.play();
    }
  };

  const value = {
    handleToggleAudio,
    isPlaying,
    currentTrack,
    audio,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export default AudioProvider;
