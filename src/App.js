import React, { useEffect, useState, useRef } from "react";
import { Howl } from "howler";
import "./css/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import Act2 from "./components/SecondAct.js";
import { TypeAnimation } from "react-type-animation";

function App() {
	const [playClicked, setplayClicked] = useState(false);
	const [animFirstDial, setAnimFirstDial] = useState(false);
	const [animFirstDialEnded, setAnimFirstDialEnded] = useState(false);
	const [animationDefragmentEnded, setanimationDefragmentEnded] =
		useState(false);
	const [firstActEnded, setFirstActEnd] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [isLogged, setIsLogged] = useState(false);
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [submitClicked, setSubmitClicked] = useState(false);
	const [firstname, setFirstName] = useState("");
	const [isVIP, setIsVIP] = useState("");
	const [isParent, setIsParent] = useState(false);
	const [hasKnownPartner, setHasKnownPartner] = useState("");
	const [hasAnswered, setHasAnswered] = useState("");
	const [guessSex, setGuessSex] = useState("");

	const soundRef = useRef(null);

	useEffect(() => {
		// Initialize Howler instance for audio
		soundRef.current = new Howl({
			src: [process.env.PUBLIC_URL + "/musics/steamMusique.mp3"],
		});
	}, []);

	// Son de clavier premier dialog
	useEffect(() => {
		if (animFirstDial) {
			setTimeout(() => {
				setTimeout(() => {
					setTimeout(() => {
						setTimeout(() => {
							const comContainer = document.querySelector(".comContainer");
							const dialog = comContainer.querySelector(".pFirstDial");
							const avatar = document.querySelector(".avatar");
							avatar.classList.add("avatarDisappear");
							dialog.innerHTML = "";
							setAnimFirstDialEnded(true);
						}, 5000);
					}, 4000);
				}, 1000);
			}, 4000);
		}
	}, [animFirstDial]);

	// 2 eme discussion
	useEffect(() => {
		if (animFirstDialEnded) {
			const avatar = document.querySelector(".avatar");
			const comContainer = document.querySelector(".comContainer");
			const dialog = comContainer.querySelector(".pSecondDial");

			avatar.src = "/images/hardile/hardileAvatar.png";
			avatar.classList.remove("avatarDisappear");
			avatar.classList.add("avatarAppear");

			comContainer.addEventListener("animationend", (event) => {
				// Vérifie que l'animation soit bien celle de début de la discussion
				if (event.animationName === "avatarAppear") {
					setTimeout(() => {
						const firstActContainer = document.querySelector("#firstAct");
						const comText = document.querySelector(".comText");

						dialog.classList.add("dialogTurnOff");
						dialog.innerHTML = "";
						comText.classList.remove("openDialAnimation");
						comText.classList.add("closeDialAnimation");
						comText.addEventListener("animationend", (event) => {
							// Vérifie que l'animation soit bien celle de début de la discussion
							if (event.animationName === "closeDial") {
								comContainer.classList.remove("dialogTurnOn");
								comContainer.classList.add("dialogTurnOff");
							}
						});
						firstActContainer.classList.add("backgroundBlink");
						const tvScreen = document.querySelector(".tvScreen");
						tvScreen.classList.remove(
							"screenTurnOn",
							"animatedPic",
							"blinkScreen"
						);
						tvScreen.style.opacity = 0;
						setTimeout(() => {
							const pictToDefragment =
								document.querySelector(".pictToDefragment");
							pictToDefragment.style.opacity = 1;
							defragmentPic();
							firstActContainer.classList.remove("backgroundBlink");
							setFirstActEnd(true);
						}, 2000);
					}, 14000);
				}
			});
		}
	}, [animFirstDialEnded]);

	useEffect(() => {
		if (playClicked) {
			const background = document.querySelector(".background");
			const pictToDefragment = document.querySelector(".pictToDefragment");
			pictToDefragment.style.opacity = 1;
			background.style.opacity = 0;

			// Déclenche l'allumage de l'écran
			const tvScreen = document.querySelector(".tvScreen");
			setTimeout(() => {
				tvScreen.classList.add("screenTurnOn");
				tvScreen.style.opacity = 1;
				// Détecte la fin d'animation
				tvScreen.addEventListener("animationend", (event) => {
					// Vérifie que l'animation soit bien celle d'allumage de l'écran
					if (event.animationName === "screenTurnOn") {
						tvScreen.classList.add("blinkScreen");
						setTimeout(() => {
							const comContainer = document.querySelector(".dialogUi");
							const comText = document.querySelector(".comText");
							comContainer.classList.add("dialogTurnOn");
							comText.classList.add("openDialAnimation");
							comContainer.addEventListener("animationend", (event) => {
								// Vérifie que l'animation soit bien celle de début de la discussion
								if (event.animationName === "openDial") {
									const avatar = document.querySelector(".avatar");
									avatar.style.opacity = 1;
									setAnimFirstDial(true);
								}
							});
						}, 3000);
					}
				});
			}, 1000);
		}
	}, [playClicked]);

	// Fonction cachant l'affichage du text PLAY et déclenche la musique
	const handleplayClicked = () => {
		const playButton = document.querySelector(".playButton");
		const musicButton = document.querySelector(".musicButton");

		activateFullscreen();

		setplayClicked(true);
		playButton.remove();
		playButton.firstChild.style.display = "none";
		musicButton.style.opacity = 1;

		// SKip option
		const skipButton = document.querySelector(".skip");
		skipButton.style.opacity = 1;

		skipButton.addEventListener("click", () => {
			const pictToDefragment = document.querySelector(".pictToDefragment");
			pictToDefragment.style.backgroundImage = 'url("/images/bgAct2vf.jpg")';

			setFirstActEnd(true);
			setanimationDefragmentEnded(true);
		});
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

	// Création de l'image qui se défragmente
	const numberOfRows = 25;
	const numberOfColumns = 50;
	const totalBlocks = numberOfRows * numberOfColumns;

	const blocks = Array.from({ length: totalBlocks }, (_, index) => {
		const xPosition = (index % numberOfColumns) / numberOfColumns;
		const yPosition = Math.floor(index / numberOfColumns) / numberOfRows;

		const blockStyle = {
			left: `${xPosition * 100}%`,
			top: `${yPosition * 100}%`,
			width: `${100 / numberOfColumns}%`,
			height: `${100 / numberOfRows}%`,
			backgroundPosition: `${xPosition * 100}% ${yPosition * 100}%`,
		};

		return (
			<div className="blockToDefragment" style={blockStyle} key={index}></div>
		);
	});

	function defragmentPic() {
		const allPictureBlocks = document.querySelectorAll(".blockToDefragment");
		const bg1 = document.querySelector(".background");
		const pictToDefragment = document.querySelector(".pictToDefragment");
		const tvScreen = document.querySelector(".tvScreen");
		tvScreen.classList.remove("screenTurnOn");

		const pictureBlocksArray = Array.from(allPictureBlocks);
		pictToDefragment.style.backgroundImage = 'url("/images/bgAct2vf.jpg")';
		bg1.style.opacity = 0;

		// Mélanger l'ordre des éléments dans le tableau
		for (let i = pictureBlocksArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[pictureBlocksArray[i], pictureBlocksArray[j]] = [
				pictureBlocksArray[j],
				pictureBlocksArray[i],
			];
		}

		let delay = 0; // Initialiser le délai
		const animationDuration = 1300; // Durée de l'animation en ms
		const additionalDelay = 5; // Délai supplémentaire pour chaque élément

		pictureBlocksArray.forEach((block, index) => {
			setTimeout(() => {
				block.classList.add("pictureFall");
			}, delay);

			delay += additionalDelay; // Ajouter une durée supplémentaire pour chaque élément
		});

		// Attendre que toutes les animations soient terminées avant de mettre à jour l'état
		const totalAnimationTime = delay + animationDuration;
		setTimeout(() => {
			setanimationDefragmentEnded(true);
		}, totalAnimationTime);
	}
	useEffect(() => {
		if (submitClicked) {
			const formData = new FormData();
			formData.append("login", login);
			formData.append("password", password);

			fetch("https://axelnell-wedding.fr/backend/login.php", {
				method: "POST",
				body: formData,
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.success) {
						setFirstName(data.user.firstname);
						setIsVIP(data.user.isVIP == 0 ? false : true);
						setHasAnswered(data.user.hasAnswered == 1 ? true : false);
						setGuessSex(data.user.sexe);
						setIsLogged(true);
						setIsParent(data.user.hasChild != null ? true : false);
						setHasKnownPartner(data.user.partnerFirstName != null ? data.user.partnerFirstName : false);
					} else {
						const errors = Array.isArray(data.errors) ? data.errors : ["Erreur inconnue"];
						alert("Envoie échoué : " + errors.join(", ")); // Affichez les erreurs dans l'alerte
					}
				})
				.catch((error) => {
					console.error("Error:", error);
				});

			setSubmitClicked(false);
		}
	}, [submitClicked, login, password, setIsLogged]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (login.length > 0 && password.length > 0) {
			setSubmitClicked(true);
		}
	};

	function activateFullscreen() {
		const element = document.documentElement; // Sélectionne l'élément racine (body)
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.mozRequestFullScreen) {
			/* Firefox */
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullscreen) {
			/* Chrome, Safari & Opera */
			element.webkitRequestFullscreen();
		} else if (element.msRequestFullscreen) {
			/* IE/Edge */
			element.msRequestFullscreen();
		}
	}

	return (
		<div className="body">
			{isLogged ? (
				<>
					<div className="playButton" onClick={handleplayClicked}>
						<span className="textBlink">PLAY</span>
					</div>
				</>
			) : (
				<></>
			)}
			<img
				src={process.env.PUBLIC_URL + "/images/bgAct1.jpg"}
				className="background"
				alt="Image d'un salon avec un téléviseur"
			/>

			<section id="firstAct">
				{!isLogged ? (
					<>
						<div className="loginContainer">
							<form onSubmit={handleSubmit} autoComplete="off">
								<label htmlFor="login">Login :</label>
								<input
									type="text"
									id="login"
									name="login"
									value={login}
									onChange={(e) => setLogin(e.target.value)}
									autoComplete="off"
									autoCorrect="off"
									spellCheck="false"
								/>

								<label htmlFor="password">Password :</label>
								<input
									type="password"
									id="password"
									name="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									autoComplete="new-password"
									autoCorrect="off"
									spellCheck="false"
								/>

								<button type="submit">Connexion</button>
							</form>
						</div>

						<div className="pictToDefragment">
							<Act2
								firstActEnded={firstActEnded}
								animationDefragmentEnded={animationDefragmentEnded}
								guessName={firstname}
								isVIP={isVIP}
								isParent={isParent}
								hasKnownPartner={hasKnownPartner}
								login={login}
								guessSex={guessSex}
								hasAnswered={hasAnswered}
							/>
							{blocks}
						</div>

						<div className="tvScreenContainer">
							<img
								src={process.env.PUBLIC_URL + "/images/tvPic3.jpg"}
								className="tvScreen animatedPic"
								alt="Image de ville steampunk"
							/>
						</div>
					</>
				) : (
					<>
						<div className="pictToDefragment">
							<Act2
								firstActEnded={firstActEnded}
								animationDefragmentEnded={animationDefragmentEnded}
								guessName={firstname}
								isVIP={isVIP}
								isParent={isParent}
								hasKnownPartner={hasKnownPartner}
								login={login}
								guessSex={guessSex}
								hasAnswered={hasAnswered}
							/>
							{blocks}
						</div>

						<div className="tvScreenContainer">
							<img
								src={process.env.PUBLIC_URL + "/images/tvPic3.jpg"}
								className="tvScreen animatedPic"
								alt="Image de ville steampunk"
							/>
						</div>
						<div className="comContainer dialogUi">
							<div className="hideItem ">
								<img
									src={process.env.PUBLIC_URL + `/images/dialogSteampunk.png`}
									className="comText"
									alt="Avatar d'Hardile"
								/>
							</div>

							<img
								src={process.env.PUBLIC_URL + `/images/comDevice.png`}
								className="comAvatar"
								alt="Avatar d'Hardile"
							/>
							<img
								src={process.env.PUBLIC_URL + `/images/anibus/anibusAvatar.png`}
								className="comAvatar avatar"
								alt="Avatar d'Hardile"
							/>

							<p className="pFirstDial">
								{" "}
								{animFirstDial ? (
									<>
										<TypeAnimation
											sequence={[
												`Axel : \n\n Nell, tu m'entends ? Je crois que ${hasKnownPartner ? firstname+ " et " + hasKnownPartner + " sont " : firstname + " est "} enfin connecté.`,
												1000,
												`Axel : \n\n Est-ce que tu peux ${hasKnownPartner ? "les ramener" : "le ramener"} avec nous s'il-te-plait ? On va avoir besoin ${
													guessSex === "M" ? "de lui" : (guessSex === "F" ? "d'elle" : "d'eux")
												} !`,
											]}
											speed={50}
										/>{" "}
									</>
								) : (
									""
								)}
							</p>
							<p className="pSecondDial">
								{animFirstDialEnded ? (
									<>
										<TypeAnimation
											sequence={[
												`Nell : \n\n Oui, je t'entends très bien.`,
												1000,
												`Nell : \n\n D'accord, j'initialise la séquence de transfert de matière`,
												1000,
												`Nell : \n\n Accrochez vos ceintures !`,
											]}
											speed={50}
										/>{" "}
									</>
								) : (
									""
								)}
							</p>
						</div>
					</>
				)}
			</section>
			<div className="skip">SKIP</div>

			<FontAwesomeIcon
				className="musicButton"
				icon={isMuted ? faVolumeHigh : faVolumeMute}
				onClick={togglePlay}
			/>
		</div>
	);
}

export default App;
