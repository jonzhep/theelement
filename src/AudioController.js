import React, { useState, useEffect } from "react";
import ReactHowler from "react-howler";
import gsap from "gsap";

export default function AudioController(props) {
  useEffect(() => {
    if (props.firstInteraction === 1) {
      setPadCPlaying(true);
      setPadFPlaying(true);
      setCasettePlaying(true);
      setArpCPlaying(true);
      gsap.to(padCVolume, {
        delay: 6,
        volume: 0.5,
        duration: 4,
        onUpdate: () => setPadCVolume({ volume: padCVolume.volume }),
      });
      gsap.to(casetteVolume, {
        delay: 4,
        volume: 0.3,
        duration: 3,
        onUpdate: () => setCasetteVolume({ volume: casetteVolume.volume }),
      });
    }
  }, [props.firstInteraction]);

  useEffect(() => {
    if (props.word === "optimistic") {
      gsap.to(padCVolume, {
        volume: 0.5,
        duration: 3,
        onUpdate: () => setPadCVolume({ volume: padCVolume.volume }),
      });
      gsap.to(padFVolume, {
        volume: 0,
        duration: 5,
        onUpdate: () => setPadFVolume({ volume: padFVolume.volume }),
      });
      gsap.to(arpCVolume, {
        volume: 0.5,
        duration: 5,
        onUpdate: () => setArpCVolume({ volume: arpCVolume.volume }),
      });
    }

    if (props.word === "pessimistic") {
      gsap.to(padCVolume, {
        volume: 0,
        duration: 5,
        onUpdate: () => setPadCVolume({ volume: padCVolume.volume }),
      });
      gsap.to(padFVolume, {
        volume: 0.5,
        duration: 5,
        onUpdate: () => setPadFVolume({ volume: padFVolume.volume }),
      });
      gsap.to(arpCVolume, {
        volume: 0,
        duration: 5,
        onUpdate: () => setArpCVolume({ volume: arpCVolume.volume }),
      });
    }
  }, [props.word]);

  const [padCVolume, setPadCVolume] = useState({ volume: 0 });
  const [padFVolume, setPadFVolume] = useState({ volume: 0 });
  const [casetteVolume, setCasetteVolume] = useState({ volume: 0 });
  const [arpCVolume, setArpCVolume] = useState({ volume: 0.5 });
  const [padCPlaying, setPadCPlaying] = useState(false);
  const [padFPlaying, setPadFPlaying] = useState(false);
  const [casettePlaying, setCasettePlaying] = useState(false);
  const [arpCPlaying, setArpCPlaying] = useState(false);

  return (
    <>
      {props.firstInteraction !== 0 && (
        <>
          <ReactHowler
            src="/audio/padC.mp3"
            playing={padCPlaying}
            volume={padCVolume.volume}
            loop={true}
          />
          <ReactHowler
            src={"/audio/padFAndArp.mp3"}
            playing={padFPlaying}
            volume={padFVolume.volume}
            loop={true}
          />
          <ReactHowler
            src={"/audio/casette.mp3"}
            playing={casettePlaying}
            volume={casetteVolume.volume}
            loop={true}
          />
          <ReactHowler
            src={"/audio/arpC.mp3"}
            playing={arpCPlaying}
            volume={arpCVolume.volume}
            loop={true}
          />
        </>
      )}
    </>
  );
}
