import React, { useEffect, useState, useRef } from "react";
import { Howl } from "howler";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [startingAnimate, setStartingAnimate] = useState(false);
  const [animationLoadingEnd, setAnimationLoadingEnd] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMusicLoaded, setIsMusicLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const soundRef = useRef(null);

  useEffect(() => {
    // Initialize Howler instance for audio
    soundRef.current = new Howl({
      src: [process.env.PUBLIC_URL + "/musics/mainTheme1.mp3"],
      onload: () => {
        setIsMusicLoaded(true);
      },
    });
  }, []);

  // Divide useEffect to not disturbed music player
  useEffect(() => {
    // Get all section pictures to animate
    const animatedPictures = document.querySelectorAll(".animatedPic");
    if (startingAnimate) {
      // Loop on each picture to add animation
      for (let i = 0; i < animatedPictures.length; i++) {
        setTimeout(() => {
          // Add animation on TV / Controllers and Console
          if (i < animatedPictures.length - 1) {
            animatedPictures[i].classList.add("bounceAnimation");
          } else {
            setTimeout(() => {
              // Add animation on the TvScreen
              animatedPictures[i].classList.add("rotateCenter");
              animatedPictures[i].style.opacity = 1;
              setTimeout(() => {
                // Change the state at the end of the animation
                setAnimationLoadingEnd(true);
              }, 2000);
            }, 2000);
          }
          // Delay the next animation by i
        }, i * 1000);
      }
    }
  }, [startingAnimate]);

  // Apparition of the couple after the switch of the screen
  if (animationLoadingEnd) {
    const anibusTeam = document.querySelectorAll(".anibusTeam");
    anibusTeam.forEach((element) => {
      element.style.opacity = 1;
    });
  }

  const handleStartingAnimate = () => {
    const playButton = document.querySelector(".playButton");
    const musicButton = document.querySelector(".musicButton");
    togglePlay();
    setStartingAnimate(true);
    playButton.style.display = "none";
    playButton.firstChild.style.display = "none";
    musicButton.style.opacity = 1;
  };

  // Function to play music
  function togglePlay() {
    if (soundRef.current.playing()) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
    setIsMuted((prevState) => !prevState);
  }

  return (
    <div className="body">
      <div className="playButton" onClick={handleStartingAnimate}>
        <span className="textBlink">PLAY</span>
      </div>
      <img
        src={process.env.PUBLIC_URL + "/images/background.jpg"}
        className="background"
        alt="Salon en dessin"
      />
      <section id="firstAct">
        <img
          src={process.env.PUBLIC_URL + "/images/tv.png"}
          className="tvPic animatedPic"
          alt="Télévision"
        />
        <img
          src={process.env.PUBLIC_URL + "/images/console.png"}
          className="console animatedPic"
          alt="Console de jeux"
        />
        <img
          src={process.env.PUBLIC_URL + "/images/controllers.png"}
          className="controllers animatedPic"
          alt="Manette de console"
        />
        <img
          src={process.env.PUBLIC_URL + "/images/bg.jpg"}
          className="tvScreen animatedPic"
          alt="Paysage en pixel art couleur pastel"
        />
        <img
          src={process.env.PUBLIC_URL + "/images/anibus/rightWalk/1.png"}
          className="anibus anibusTeam"
          alt="Personnage masculin"
        />
        <img
          src={process.env.PUBLIC_URL + "/images/anibus/leftWalk/1.png"}
          className="hardile anibusTeam"
          alt="Personnage féminin"
        />
      </section>
      <FontAwesomeIcon
        className="musicButton"
        icon={isMuted ? faVolumeHigh : faVolumeMute}
        onClick={togglePlay}
      />
    </div>
  );
}

export default App;
