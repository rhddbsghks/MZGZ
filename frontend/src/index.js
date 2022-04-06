import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import Particles from "react-tsparticles";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
      <Particles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "unset",
            },
          },
          particles: {
            number: {
              value: 20,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#ff0000",
            },
            shape: {
              type: "image",
              stroke: {
                width: 0,
                color: "#000000",
              },
              polygon: {
                nb_sides: 5,
              },
              image: {
                src: "https://user-images.githubusercontent.com/70699213/161903715-45a6c685-fa60-43b1-b923-860c944508a4.png",
                width: 100,
                height: 100,
              },
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: {
                enable: true,
                speed: 3,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 20,
              random: true,
              anim: {
                enable: true,
                speed: 20,
                size_min: 0.1,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: ["unset"],
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              attract: {
                enable: false,
              },
            },
            twinkle: {
              particles: {
                enable: true,
                color: ["#fdcf58", "#757676", "#f27d0c", "#800909", "#f07f13"],
                opacity: 1,
              },
            },
          },
          interactivity: {
            detect_on: "window",
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 10,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 20,
                size: 2,
                duration: 2,
                opacity: 0.8,
                speed: 3,
              },
              repulse: {
                distance: 100,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
        }}
      />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
