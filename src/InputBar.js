import React from "react";
import { useState, useEffect } from "react";
import { Howl } from "howler";
import { Center, ActionIcon } from "@mantine/core";
import useStore from "./store";
import { useSpring } from "@react-spring/web";
import gsap from "gsap";
import { isMobile } from "react-device-detect";
import { VscArrowSmallRight } from "react-icons/vsc";
import AudioController from "./AudioController";

export default function InputBar(props) {
  const changeInput = useStore((state) => state.changeInput);

  const [playing, setPlaying] = useState(false);
  const [currentNote, setCurrentNote] = useState(0);
  const [entered, setEntered] = useState(false);
  const keySound = new Howl({
    src: [`/audio/${currentNote}.mp3`],
    volume: 0.9,
  });
  const enterSound = new Howl({
    src: [`/audio/enter.mp3`],
    volume: 0.9,
  });

  const handleKeyPress = (event) => {
    setFirstInteraction(firstInteraction + 1);
    if (isMobile) {
      if (event.key === "Enter") {
        setEntered(true);
      }
    } else {
      if (event.key === " ") {
        setPlaying(true);
      } else if (playing) {
        keySound.play();
        setCurrentNote((currentNote + 1) % 22);
        setPlaying(false);
      }
      if (event.key === "Enter") {
        enterSound.play();
        setEntered(true);
      }
    }
  };
  const inputElement = document.querySelector(".theInput");

  useEffect(() => {
    if (entered) {
      gsap.to(inputElement, {
        delay: 0.0,
        opacity: 0,
        duration: 2,
        onComplete: () => {
          setInputValue("");
        },
      });
      gsap.to(inputElement, {
        delay: 2.0,
        opacity: 1,
        duration: 2,
      });
      changeInput(inputValue);

      api.start({
        from: {
          opacity: 1,
        },
        to: {
          opacity: 0,
        },
        duration: 3000,
      });
      setEntered(false);
    }
  }, [entered]);

  const [inputValue, setInputValue] = useState("");

  const [springs, api] = useSpring(() => ({
    from: { opacity: 1 },
  }));

  const [firstInteraction, setFirstInteraction] = useState(0);

  return (
    <>
      <Center>
        {isMobile ? (
          <>
            <div
              style={{
                position: "absolute",
                zIndex: 1,
                bottom: 70,
                border: "1px solid #ffffffeb",
                borderRadius: "3px",
                width: "60%",
                
                
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  spellCheck="false"
                  autoFocus
                  type="text"
                  className="theInput"
                  style={{
                    caretColor: "white",
                    fontSize: 20,
                    textAlign: "left",
                    width: "100%",

                    height: "25px",
                    
                  }}
                  
                  onKeyDown={handleKeyPress}
                />
                <ActionIcon onClick={() => setEntered(true)}>
                  <VscArrowSmallRight style={{ fill: "#ffffffeb",  }} size={100} />
                </ActionIcon>
              </div>
            </div>
          </>
        ) : (
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            spellCheck="false"
            autoFocus
            type="text"
            className="theInput"
            style={{
              caretColor: "white",
              fontSize: 35,
              textAlign: "center",
              width: "50vw",
              height: "70px",
              bottom: 80,
              position: "absolute",
              zIndex: 1,
            }}
            onKeyDown={handleKeyPress}
            enterkeyhint="done"

          />
        )}
      </Center>
      {!isMobile && (
        <AudioController
          firstInteraction={firstInteraction}
          word={props.word}
        />
      )}
    </>
  );
}
