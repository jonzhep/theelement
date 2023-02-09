import "./styles.css";
import { Canvas } from "@react-three/fiber";
import useStore from "./store";
import { useSpring, animated } from "@react-spring/web";
import { PulseLoader } from "react-spinners";
import InputBar from "./InputBar";
import AudioController from "./AudioController";
import { Configuration, OpenAIApi } from "openai";
import {
  Image,
  Text,
  Group,
  Center as CenterMantine,
  Container,
  ActionIcon,
  Stack,
  Modal,
} from "@mantine/core";
import { useState, useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import { VscTwitter, VscQuestion } from "react-icons/vsc";
import { BsFillArrowRightCircleFill, BsWordpress } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import Env from "./Env";
import Scene from "./Scene";
import Postproduction from "./Postproduction";
import TypeIt from "typeit-react";
import { Perf } from 'r3f-perf'
import { Leva } from 'leva'

function App() {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const [colorOne, setColorOne] = useState("#000000");
  const [colorTwo, setColorTwo] = useState("#150050");
  const [colorThree, setColorThree] = useState("#3F0071");
  const [colorFour, setColorFour] = useState("#000000");
  const [colorFive, setColorFive] = useState("#000000");

 
  const [word, setWord] = useState("");

  const [finalPrompt, setFinalPrompt] = useState(
    "The following is a conversation with an extremely rude and pesimistic AI Philosopher. The philosopher is really mean, creative, clever, depressed, gives japanese haiku's in kanji randomly, and asks deep questions.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. Why are you here? "
  );
  const [firstClick, setFirstClick] = useState(0);
  const [aiOutput, setAiOutput] = useState();
  const inputStore = useStore((state) => state.inputStore);
  const [firstInput, setFirstInput] = useState(false);
  const [inputHeaderText, setInputHeaderText] = useState("");
  const [enterIncrement, setEnterIncrement] = useState(0);
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [about, setAbout] = useState(false);
  const [modalSize, setModalSize] = useState("25%");
  const [modalFont, setModalFont] = useState(20);
  const [typeIts, setTypeIts] = useState([]);

  const generateResponse2 = async (inputt) => {
    setFirstClick(firstClick + 1);
    const combined = finalPrompt + "\nHuman:" + inputt + "\nAI:";

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: combined,
      temperature: 0.9,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0.76,
      presence_penalty: 0.75,
      stop: [" Human:", " AI:"],
    });
    const response2 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Five different hex value colors that are a color palette for " +
        inputt +
        " , and then on a new line describe that sentiment as either optimistic or pessimistic: \n\n",
      temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: [";"],
    });

    setAiOutput(response.data.choices[0].text);
    api4.start({
      delay: 200,

      from: {
        opacity: 1,
      },
      to: {
        opacity: 0,
      },
      config: {
        duration: 1500,
      },
      onResolve: () => {
        setLoading(false);
      },
    });

    api3.start({
      delay: 1000,

      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
      config: {
        duration: 1000,
      },
    });
    let split = response2.data.choices[0].text
      .split(",")
      .map((color) => color.split("#")[1]);
    console.log(response2.data.choices[0].text);

    setColorOne("#" + split[0].slice(0, 6));
    setColorTwo("#" + split[1].slice(0, 6));
    setColorThree("#" + split[2].slice(0, 6));
    setColorFour("#" + split[3].slice(0, 6));
    setColorFive("#" + split[4].slice(0, 6));
    if (
      split[4].trim().includes("Optimistic") ||
      split[4].trim().includes("optimistic")
    ) {
      setWord("optimistic");
    }
    if (
      split[4].trim().includes("Pessimistic") ||
      split[4].trim().includes("pessimistic")
    ) {
      setWord("pessimistic");
    }
    const appended = combined + response.data.choices[0].text;
    setFinalPrompt(appended);
  };

  useEffect(() => {
    if (aiOutput === undefined) return;
    const newTypeIt = (
      <TypeIt
        className="theResponse"
        options={{
          afterComplete: () => {
            document.querySelector(".ti-cursor").style.display = "none";
          },
          speed: 60,
        }}
      >
        {aiOutput}
      </TypeIt>
    );

    setTypeIts([...typeIts, newTypeIt]);
  }, [aiOutput]);

  useEffect(() => {
    setEnterIncrement(enterIncrement + 1);
    if (inputStore.length > 0) {
      setLoading(true);

      api.start({
        delay: 100,

        from: {
          opacity: 1,
        },
        to: {
          opacity: 0,
        },
        config: {
          duration: 2000,
        },
        onResolve: () => {
          setFirstInput(true);
        },
      });
      api2.start({
        delay: 100,

        from: {
          opacity: 1,
        },
        to: {
          opacity: 0,
        },
        config: {
          duration: 2000,
        },
        onResolve: () => {
          setInputHeaderText(inputStore);
        },
      });
      api2.start({
        delay: 2000,

        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
        config: {
          duration: 2000,
        },
      });
      api3.start({
        delay: 0,

        from: {
          opacity: 1,
        },
        to: {
          opacity: 0,
        },
        config: {
          duration: 1000,
        },
      });
      api4.start({
        delay: 1500,

        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
        config: {
          duration: 1500,
        },
      });

      generateResponse2(inputStore);
    }
  }, [inputStore]);

  const [springs, api] = useSpring(() => ({
    from: { opacity: 0 },
  }));
  const [springs2, api2] = useSpring(() => ({
    from: { opacity: 0 },
  }));
  const [springs3, api3] = useSpring(() => ({
    from: { opacity: 1 },
  }));
  const [springs4, api4] = useSpring(() => ({
    from: { opacity: 1 },
  }));
  const [springs5, api5] = useSpring(() => ({
    from: { opacity: 0 },
  }));

  useEffect(() => {
    api.start({
      delay: 1000,

      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
      config: {
        duration: 7000,
      },
    });
    api5.start({
      delay: 1000,

      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
      config: {
        duration: 3000,
      },
    });
  }, []);

  useEffect(() => {
    if (isMobile) {
      setOpened(true);
      setModalSize("100%");
      setModalFont(18);
    }
  }, [isMobile]);

  return (
    <>
      {/* Wordmark and Question Mark */}
      {/* <Image
        className="wordmark"
        sx={{
          position: "absolute",
          zIndex: 1,
          bottom: 0,
          margin: "2rem",
        }}
        src={"/wordmark.svg"}
        width={200}
      /> */}
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          bottom: 0,
          right: 0,
          padding: "1.5rem",
        }}
      >
        <Group>
          <ActionIcon color={"dark"} variant="transparent">
            <VscQuestion
              onClick={() => setAbout(true)}
              className="questionIcon"
              size={25}
              style={{ fill: "black" }}
            />
          </ActionIcon>
        </Group>
      </div>

      {/* Header */}
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          padding: "1rem",
          width: "100%",
          textAlign: "center",
        }}
      >
        <CenterMantine>
          <Stack mt={60}>
            {firstInput ? (
              <Container>
                <animated.div style={springs2}>
                  <Text className="theHeaderInput">{inputHeaderText}</Text>
                </animated.div>
              </Container>
            ) : (
              <animated.div style={springs}>
                <TypeIt
                  className="theHeader"
                  options={{
                    afterComplete: () => {
                      document.querySelector(".ti-cursor").style.display =
                        "none";
                    },
                  }}
                >
                  Hello, why are you here?
                </TypeIt>
              </animated.div>
            )}
            <Container mt={40}>
              {loading ? (
                <animated.div style={springs4}>
                  <PulseLoader
                    color={"#ffffffb7"}
                    loading={true}
                    size={10}
                    speedMultiplier={0.5}
                  />
                </animated.div>
              ) : (
                <animated.div style={springs3}>
                  {typeIts.map((typeIt, index) => {
                    if (index === typeIts.length - 1) {
                      return <div key={index}>{typeIt}</div>;
                    }
                  })}
                </animated.div>
              )}
            </Container>
          </Stack>
        </CenterMantine>
      </div>

      {/* Input Bar */}
      <animated.div style={springs5}>
        <InputBar word={word} />
      </animated.div>

      {/* About  */}
      <Modal
        size={modalSize}
        overlayOpacity={0.5}
        overlayBlur={5}
        overlayColor="#000000"
        centered
        opened={about}
        onClose={() => setAbout(false)}
        transition="fade"
        transitionDuration={2000}
        transitionTimingFunction="ease"
        exitTransitionDuration={2000}
      >
        <CenterMantine mt={-30}>
          <Stack spacing="l" align="center">
            <Image src="/kanji.svg" width={100} mb={20} />

            <div style={{ fontSize: modalFont }} className="mobileModal">
              Let The Alchemist take you on a reflective journey
            </div>
            {"\n"}
            <div style={{ width: "50%" }}>
              <div style={{ fontSize: 14 }} className="mobileModal">
                Created by Charm
              </div>
              <CenterMantine mt={10} mb={20}>
                <Group spacing={30}>
                  
                  <ActionIcon
                    onClick={() =>
                      window.open("https://twitter.com/EmpireofCHARM", "_blank")
                    }
                  >
                    <VscTwitter size={30} style={{ fill: "#ffffffa3" }} />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() =>
                      window.open(
                        "https://discord.gg/KfhCscmcF7",
                        "_blank"
                      )
                    }
                  >
                    <FaDiscord size={30} style={{ fill: "#ffffffa3" }} />
                  </ActionIcon>
                </Group>
              </CenterMantine>
            </div>
           
          </Stack>
        </CenterMantine>
      </Modal>

      {/* Modal to display if user is on mobile */}
      {isMobile && (
        <Modal
          overlayOpacity={0.55}
          overlayBlur={3}
          withCloseButton={false}
          centered
          opened={opened}
          onClose={() => setOpened(false)}
          transition="fade"
          transitionDuration={600}
          transitionTimingFunction="ease"
          exitTransitionDuration={600}
        >
          <CenterMantine>
            <Stack align="center">
              <div className="mobileModal">
                For the full audio-immersive experience visit The Element on desktop
              </div>
              <BsFillArrowRightCircleFill
                onClick={() => setOpened(false)}
                style={{ fill: "#a88fa3" }}
                size={10}
              />
            </Stack>
          </CenterMantine>
        </Modal>
      )}

      {/* React Three Fiber Canvas */}
      <Leva collapsed />
      <Canvas
      
        shadows
        camera={{ position: [0, 0, 6.5], fov: 50 }}
        gl={{ antialias: false }}
      >
        <group position={[0.2, -1.5, 0]}>
          <Scene
            firstClick={firstClick}
            colorOne={colorOne}
            colorTwo={colorTwo}
            colorThree={colorThree}
            colorFour={colorFour}
            colorFive={colorFive}
          />
        </group>
        <Env enterIncrement={enterIncrement} />
        {!isMobile && <Postproduction />}
        <Perf position="top-left" />
      </Canvas>
    </>
  );
}

export default App;
