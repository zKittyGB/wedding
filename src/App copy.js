import React, { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    let currentPositionX = 0;
    let currentPositionY = 0;
    let moveInterval;
    let spriteNum = 1;
    function handleMovementPress(event) {
      if (event.key === "ArrowRight" && !moveInterval) {
        moveInterval = setInterval(() => {
          currentPositionX += 4;
          const anibus = document.querySelector(".anibus");

          if (anibus) {
            anibus.style.transition = "transform 0.1s ease-in-out";
            anibus.style.transform = `translate(${currentPositionX}px, ${currentPositionY}px)`;
            anibus.src =
              process.env.PUBLIC_URL +
              "/images/anibus/rightWalk/" +
              spriteNum +
              ".png";
            if (spriteNum < 8) {
              spriteNum++;
            } else {
              spriteNum = 1;
            }
          }
        }, 100);
      }
      if (event.key === "ArrowLeft" && !moveInterval) {
        moveInterval = setInterval(() => {
          currentPositionX -= 4;
          const anibus = document.querySelector(".anibus");

          if (anibus) {
            anibus.style.transition = "transform 0.1s ease-in-out";
            anibus.style.transform = `translate(${currentPositionX}px, ${currentPositionY}px)`;
            anibus.src =
              process.env.PUBLIC_URL +
              "/images/anibus/leftWalk/" +
              spriteNum +
              ".png";
            if (spriteNum < 7) {
              spriteNum++;
            } else {
              spriteNum = 1;
            }
          }
        }, 100);
      }
      if (event.key === "ArrowDown" && !moveInterval) {
        moveInterval = setInterval(() => {
          currentPositionY += 4;
          const anibus = document.querySelector(".anibus");

          if (anibus) {
            anibus.style.transition = "transform 0.1s ease-in-out";
            anibus.style.transform = `translate(${currentPositionX}px, ${currentPositionY}px)`;
            anibus.src =
              process.env.PUBLIC_URL +
              "/images/anibus/botWalk/" +
              spriteNum +
              ".png";
            if (spriteNum < 8) {
              spriteNum++;
            } else {
              spriteNum = 1;
            }
          }
        }, 100);
      }
      if (event.key === "ArrowUp" && !moveInterval) {
        moveInterval = setInterval(() => {
          currentPositionY -= 4;
          const anibus = document.querySelector(".anibus");

          if (anibus) {
            anibus.style.transition = "transform 0.1s ease-in-out";
            anibus.style.transform = `translate(${currentPositionX}px, ${currentPositionY}px)`;
            anibus.src =
              process.env.PUBLIC_URL +
              "/images/anibus/upWalk/" +
              spriteNum +
              ".png";
            if (spriteNum < 8) {
              spriteNum++;
            } else {
              spriteNum = 1;
            }
          }
        }, 100);
      }
    }

    function handleMovementStop(event) {
      if (
        (event.key === "ArrowRight" && moveInterval) ||
        (event.key === "ArrowLeft" && moveInterval) ||
        (event.key === "ArrowDown" && moveInterval) ||
        (event.key === "ArrowUp" && moveInterval)
      ) {
        clearInterval(moveInterval);
        moveInterval = null;
        const anibus = document.querySelector(".anibus");

        if (anibus) {
          anibus.style.transition = "";
        }
      }
    }

    // Ajoute un écouteur d'événements lors du montage du composant
    document.addEventListener("keydown", handleMovementPress);
    document.addEventListener("keyup", handleMovementStop);

    // Nettoie l'écouteur d'événements lors du démontage du composant
    return () => {
      document.removeEventListener("keydown", handleMovementPress);
      document.removeEventListener("keyup", handleMovementStop);
    };
  }, []); // Les crochets vides signifient que cette fonction s'exécute uniquement lors du montage et du démontage du composant

  return (
    <div className="App">
      <img
        src={process.env.PUBLIC_URL + "/images/anibus/rightWalk/1.png"}
        className="anibus"
        alt="Walking Right"
      />
    </div>
  );
}

export default App;
