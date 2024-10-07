import React, { useEffect, useState, useRef } from "react";
import "../css/SecondAct.css";
import { TypeAnimation } from "react-type-animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCalendar,
	faCircleInfo,
	faEnvelope,
	faHouse,
} from "@fortawesome/free-solid-svg-icons";

export default function SecondAct(props) {
	const {
		firstActEnded,
		animationDefragmentEnded,
		guessName,
		isVIP,
		isParent,
		hasKnownPartner,
		login,
		hasAnswered
	} = props;

	const [animationMenuAppearEnded, setanimationMenuAppearEnded] =
		useState(false);

	const helice = document.querySelector(".helice");
	const dirigeable = document.querySelector(".dirigeable");
	const nuages = document.querySelectorAll(".nuage");
	const menu = document.querySelector(".menu");
	const homeRef = useRef(null);
	const calendarRef = useRef(null);
	const infoRef = useRef(null);
	const mailRef = useRef(null);
	const [formSented, setFormSented] = useState(false);

	const [isComing, setIsComing] = useState(false);
	const [isSleeping, setIsSleeping] = useState(false);
	const [isComingVIP, setIsComingVIP] = useState(false);
	const [partnerIsComing, setPartnerIsComing] = useState(false);
	const [partnerIsSleeping, setPartnerIsSleeping] = useState(false);
	const [partnerIsComingVIP, setPartnerIsComingVIP] = useState(false);
	const [kidsComing, setKidsComing] = useState(0);



	function lightboxSwap() {
		const lightbox = document.querySelector(".lightbox");
		const lightboxPic = lightbox.querySelectorAll("img");

		let index = 1;
		let previousIndex = 2;
		setInterval(() => {
			lightboxPic[previousIndex].classList.remove("fade-in");
			lightboxPic[previousIndex].classList.add("fade-out");
			lightboxPic[index].classList.remove("fade-out");
			lightboxPic[index].classList.add("fade-in");
			previousIndex = index;
			index++;
			if (index > 2) {
				index = 0;
			}
		}, 4000);
	}

	useEffect(() => {
		// Déclenchement du feu d'artifice
		const blueFireworks = document.querySelectorAll(".blueFireworks");
		if (firstActEnded && animationDefragmentEnded) {
			const blockToDefragment = document.querySelectorAll(".blockToDefragment");
			const skip = document.querySelector(".skip");
			skip.remove();
			blockToDefragment.forEach((block) => {
				block.remove();
			});
			lightboxSwap();

			let i = 0;

			function updateBlueFirework() {
				if (i < 82) {
					blueFireworks.forEach((firework) => {
						firework.src =
							process.env.PUBLIC_URL + `/images/act2/fireworks/blue/${i}.png`;
					});
					if (i === 81) {
						setTimeout(() => {
							i = 0;
							setTimeout(updateBlueFirework, 30); // Recommence l'animation après 10 secondes
						}, 2000);
					} else {
						i++;
						setTimeout(updateBlueFirework, 30); // Délais entre chaque image
					}
				}
			}

			updateBlueFirework(); // Start the sequence
		}
	}, [firstActEnded, animationDefragmentEnded, isParent, hasKnownPartner]);

	useEffect(() => {
		// Déclenchement du feu d'artifice
		const greenFireworks = document.querySelectorAll(".greenFireworks");
		if (firstActEnded || animationDefragmentEnded) {
			let i = 0;

			function updateGreenFirework() {
				if (i < 58) {
					greenFireworks.forEach((firework) => {
						firework.src =
							process.env.PUBLIC_URL + `/images/act2/fireworks/green/${i}.png`;
					});
					if (i === 57) {
						setTimeout(() => {
							i = 0;
							setTimeout(updateGreenFirework, 30); // Recommence l'animation après 10 secondes
						}, 2000);
					} else {
						i++;
						setTimeout(updateGreenFirework, 40); // Délais entre chaque image
					}
				}
			}

			updateGreenFirework(); // Start the sequence
		}
	}, [firstActEnded, animationDefragmentEnded]);

	useEffect(() => {
		// Déclenchement du feu d'artifice
		const yelloFireworks = document.querySelectorAll(".yellowFireworks");
		if (firstActEnded || animationDefragmentEnded) {
			let i = 0;

			function updateYellowFirework() {
				if (i < 60) {
					yelloFireworks.forEach((firework) => {
						firework.src =
							process.env.PUBLIC_URL + `/images/act2/fireworks/yellow/${i}.png`;
					});

					if (i === 59) {
						setTimeout(() => {
							i = 0;
							setTimeout(updateYellowFirework, 30); // Recommence l'animation après 10 secondes
						}, 2000);
					} else {
						i++;
						setTimeout(updateYellowFirework, 40); // Délais entre chaque image
					}
				}
			}

			updateYellowFirework(); // Start the sequence
		}
	}, [firstActEnded, animationDefragmentEnded]);

	useEffect(() => {
		// Déclenche l'apparition des personnages
		if (firstActEnded) {
			helice.style.opacity = 1;
			dirigeable.style.opacity = 1;
			nuages.forEach((nuage) => {
				nuage.style.opacity = 1;
			});
		}
		if (animationDefragmentEnded) {
			//Force le skip
			const tvScreenContainer = document.querySelector(".tvScreenContainer");
			const blockToDefragment = document.querySelectorAll(".blockToDefragment");
			const dialogUi = document.querySelector(".dialogUi");

			tvScreenContainer.style.opacity = 0;
			dialogUi.style.opacity = 0;
			blockToDefragment.forEach((block) => {
				block.style.opacity = 0;
			});

			//Reprend le traitement classique
			menu.classList.add("appearMenu");
			//Attend la fin de l'apparition du menu
			menu.addEventListener("animationend", (event) => {
				if (event.animationName === "appearMenu") {
					setanimationMenuAppearEnded(true);
				}
			});
		}

		const iconMenus = document.querySelectorAll(".iconMenu");
		let lastMenuOpen = "homeText";
		iconMenus.forEach((icon) => {
			icon.addEventListener("click", (e) => {
				let target = e.target;

				if (target.tagName !== "div") {
					target = target.closest("div");
				}

				const newMenuToOpen = target.dataset.icon + "Text";

				document.querySelector(`.${lastMenuOpen}`).style.opacity = 0;
				document.querySelector(`.${lastMenuOpen}`).style.zIndex = 0;
				document.querySelector(`.${newMenuToOpen}`).style.opacity = 1;
				document.querySelector(`.${newMenuToOpen}`).style.zIndex = 999;

				lastMenuOpen = newMenuToOpen;
			});
		});
	}, [firstActEnded, animationDefragmentEnded]);

	const handleSubmitParticipation = (e) => {
		e.preventDefault();
		// Créer un objet FormData
		const eData = new FormData(e.target);
		
		// Récupérer les valeurs des champs avec .get()
		eData.get('isComing') === "on" ? setIsComing(true) : setIsComing(false);
		eData.get('isSleeping') === "on" ? setIsSleeping(true) : setIsSleeping(false);
		eData.get('isComingVIP') === "on" ? setIsComingVIP(true) : setIsComingVIP(false)
		eData.get('partnerIsComing') === "on" ? setPartnerIsComing(true) : setPartnerIsComing(false);
		eData.get('partnerIsSleeping') === "on" ? setPartnerIsSleeping(true) : setPartnerIsSleeping(false);
		eData.get('partnerIsComingVIP') === "on" ? setPartnerIsComingVIP(true) : setPartnerIsComingVIP(false);
		setKidsComing(parseInt(eData.get('kidsComing'))); 
		setFormSented(true);
	};

	useEffect(() => {
		if (formSented) {
			const formData = new FormData();
			formData.append("isComing", isComing); // Utilisez 'on' ou 'off' pour les cases à cocher
			formData.append("isSleeping", isSleeping);
			formData.append("isComingVIP", isComingVIP);
			formData.append("partnerIsComing", partnerIsComing);
			formData.append("partnerIsSleeping", partnerIsSleeping);
			formData.append("partnerIsComingVIP", partnerIsComingVIP);
			formData.append("kidsComing", kidsComing);

			formData.append("login", login);

			fetch("https://axelnell-wedding.fr/backend/participations.php", {
				method: "POST",
				body: formData,
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.success) {
						const mailText = document.querySelector(".mailText");
						const formParticipation = document.querySelector(".guessFeedback")
						formParticipation.remove();

						const H1 = document.createElement("h1");
						H1.textContent = `Bravo ${hasKnownPartner ? " vous avez " : " tu as "} répondu au Gondor !`

						mailText.appendChild(H1);
						
					} else {
						const errors = data.errors;
						alert("Envoie échoué : " + errors.join(", ")); // Affichez les erreurs dans l'alerte
					}
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}
	}, [formSented, login]);

	return (
		<section id="secondAct">
			{Array.from({ length: 10 }, (_, index) => (
				<img
					key={index}
					src={process.env.PUBLIC_URL + `/images/act2/nuages/${index + 1}.webp`}
					className={`nuage${index + 1} animatedOnce nuage`}
					alt={`nuage ${index + 1}`}
				/>
			))}
			{Array.from({ length: 10 }, (_, index) => (
				<img
					key={index}
					src={process.env.PUBLIC_URL + `/images/act2/nuages/${index + 1}.webp`}
					className={`nuage${index + 1} nuage${index + 1}Infini nuage`}
					alt={`nuage ${index + 1}`}
				/>
			))}
			<img
				src={process.env.PUBLIC_URL + `/images/act2/fireworks/blue/0.png`}
				className="blueFireworks"
				alt="feu d'artifice bleu"
			/>
			<img
				src={process.env.PUBLIC_URL + `/images/act2/fireworks/blue/0.png`}
				className="blueFireworks blueBis"
				alt="feu d'artifice bleu bis"
			/>
			<img
				src={process.env.PUBLIC_URL + `/images/act2/fireworks/blue/0.png`}
				className="blueFireworks blueTris"
				alt="feu d'artifice bleu tris"
			/>
			<img
				src={process.env.PUBLIC_URL + `/images/act2/fireworks/green/0.png`}
				className="greenFireworks"
				alt="feu d'artifice vert"
			/>
			<img
				src={process.env.PUBLIC_URL + `/images/act2/fireworks/green/0.png`}
				className="greenFireworks greenBis"
				alt="feu d'artifice vert bis"
			/>
			<img
				src={process.env.PUBLIC_URL + `/images/act2/fireworks/yellow/0.png`}
				className="yellowFireworks"
				alt="feu d'artifice jaune"
			/>
			<img
				src={process.env.PUBLIC_URL + `/images/act2/fireworks/yellow/0.png`}
				className="yellowFireworks yellowBis"
				alt="feu d'artifice jaune bis"
			/>
			<img
				src={process.env.PUBLIC_URL + `/images/act2/fireworks/yellow/0.png`}
				className="yellowFireworks yellowTris"
				alt="feu d'artifice jaune tris"
			/>
			<div className="dirigeableContainer">
				<img
					src={
						process.env.PUBLIC_URL +
						"/images/act2/dirigeable/dirigeable1/dirigeable1.png"
					}
					className="dirigeable"
					alt="dirigeable"
				/>
				<img
					src={
						process.env.PUBLIC_URL +
						"/images/act2/dirigeable/dirigeable1/helice.png"
					}
					className="helice"
					alt="helice"
				/>
			</div>
			<div className="menu">
				<div className="menuHeader">
					<div ref={homeRef} data-icon="home" className="iconMenu">
						{" "}
						<FontAwesomeIcon icon={faHouse} />
					</div>
					<div ref={calendarRef} data-icon="calendar" className="iconMenu">
						{" "}
						<FontAwesomeIcon icon={faCalendar} />
					</div>
					<div ref={infoRef} data-icon="info" className="iconMenu">
						{" "}
						<FontAwesomeIcon icon={faCircleInfo} />
					</div>
					<div ref={mailRef} data-icon="mail" className="iconMenu">
						{" "}
						<FontAwesomeIcon icon={faEnvelope} />
					</div>
				</div>
				<div className="homeText fontMenu">
					<h1>🎉 Manal et Axel 🎉</h1>
					<h2>⚙️ VICTORIEN & STEAMPUNK ⚙️</h2>
					<p>
						Cher {hasKnownPartner ? guessName + " et " + hasKnownPartner : guessName},<br />
						<br />
						C'est avec une joie incommensurable et un brin de folie que nous 
						{hasKnownPartner ? " vous annonçons " : " t'annonçons "} notre prochaine union.
						<br />
						<br />
						Oui, nous allons sceller nos chemins, et nous souhaiterions
						ardemment {hasKnownPartner ? "vos " : "ta "} présences pour agrémenter cette occasion de {hasKnownPartner ? "votre " : "ta "} "charmante" compagnie.
						<br />
						<br />
						Nous {hasKnownPartner ? "vous " : "te "} promettons des discours élégants, des danses gracieuses,
						et peut-être même quelques mésaventures amusantes.
						<br />
						<br />
						{hasKnownPartner ? "Veuillez revêtir vos " : "Revêts tes "} plus beaux atours et {hasKnownPartner ? "préparez vos " : "prépare tes "} meilleures
						anecdotes, car une journée exceptionnelle sur la thématique <b>Victorien & Steampunk</b>  {hasKnownPartner ? "vous attend" : "t'attends"}. Nous nous excusons par avance si
						l'extase et la joie seront présents.
						<br /> <br />
						Dans l'attente de célébrer ce jour avec  {hasKnownPartner ? "vous" : "toi"},
						<br />
						<br />
						Avec nos amitiés les plus sincères, <br />
						<br />
						Axel & Manal,
					</p>
				</div>
				<div className="calendarText fontMenu">
					<div className="lightbox">
						<img
							src={process.env.PUBLIC_URL + "/images/act2/lightbox/1.jpg"}
							className="fade-in"
							alt="salle mariage 1"
						/>
						<img
							src={process.env.PUBLIC_URL + "/images/act2/lightbox/2.jpg"}
							className="fade-out"
							alt="salle mariage 2"
						/>
						<img
							src={process.env.PUBLIC_URL + "/images/act2/lightbox/3.jpg"}
							className="fade-out"
							alt="salle mariage 3"
						/>
					</div>
					<h1>🎉 La salle de réception 🎉</h1>
					<h2>Le Domaine de Marin</h2>
					<h3>Marin LIEU-DIT, 49340 Trémentines</h3>
					<p>
						Niché aux portes de la charmante ville de Cholet, situé à 45 minutes
						de la mairie de Nantes, dans la magnifique région des Pays de la
						Loire, se trouve un écrin de verdure enchanteur : Le Domaine de
						Marin. Ce lieu de réception idyllique, est le cadre parfait pour
						célébrer notre mariage.
					</p>
					<p>
						Entouré de vastes étendues verdoyantes et d'arbres centenaires, le
						domaine offre un havre de paix où la nature règne en maîtresse. En
						se promenant dans les allées fleuries, on peut apercevoir quelques
						petits animaux, comme des poules, qui se baladent en toute liberté,
						ajoutant une touche champêtre et authentique à l'atmosphère. Nous
						sommes ravis de vous accueillir dans ce cadre bucolique pour
						partager ce moment unique et inoubliable.
					</p>
				</div>

				<div className="infoText fontMenu">
					<h1>Informations générales</h1>

					<h2>Lieu et date de la cérémonie</h2>
					<p>
						<b>Date de la cérémonie :</b> Le 28 mai 2025
						<br />
						<b>Heure de rendez-vous :</b> 14h00
						<br />
						<b>Heure de la cérémonie :</b> 14h20
						<br />
						<b>Lieu de la cérémonie : </b> Mairie centrale de Nantes
						<br />
						<b>Adresse de rendez-vous :</b> 6 rue de la commune, Nantes, 44000,
						France
						<br />
						<b>Autre indication :</b> L'entrée est une grande grille noire
						<br />
						<b>Thématique :</b> Victorien / Steampunk
						<br />
					</p>

					<h2>Lieu de la salle de réception</h2>
					<p>
						<b>Nom du domaine :</b> Le Domaine de Marin
						<br />
						<b>Adresse du domaine :</b> Marin LIEU-DIT, 49340 Trémentines <br />
					</p>

					<h2>Sur place</h2>
					<p>
						<b>Dress code :</b> <br />
						Nous vous invitons à vous apprêter pour l'occasion et à plonger avec
						nous dans l'univers captivant de l'époque victorienne et du
						steampunk ! Pour ajouter une touche de magie et de cohérence à notre
						thème, nous vous demandons de faire un petit effort vestimentaire.
						Messieurs et dames, parez-vous de vos plus belles tenues
						d'inspiration victorienne, avec une touche de modernité mécanique.
						Nous vous demanderons d'aborder au <b>MINIMUM</b> un chapeau
						haut-de-forme <b>OU</b> une montre à gousset pour compléter votre
						look. Laissez libre cours à votre créativité et rejoignez-nous dans
						cette aventure unique et enchanteresse !<br />
						<br />
						<b>Possibilité de dormir :</b> <br />
						Il sera possible à toutes et tous de dormir sous condition d'avoir
						prévenu à l'avance lors de votre réponse au formulaire de présence.{" "}
						<br />
					</p>

					<h2>Questions diverses</h2>
					<p>
						<b>Animaux de compagnie :</b> <br />
						Les animaux de compagnie sont autorisés sous la responsabilité de
						leur(s) maître(s). Cependant, en raison de la présence d'animaux de
						ferme en liberté sur le domaine, nous vous encourageons vivement à
						ne pas venir accompagnés d'eux si cela vous est possible. Nous
						tenons à préserver la quiétude et la sécurité de tous les animaux
						présents. En cas de problème, nous ne pourrons être tenus
						responsables des incidents. Merci de votre compréhension.
						<br />
						<br />
						<b>Perte d'enfants :</b>
						<br />
						Nous vous informons que, bien que nous soyons à seulement une heure
						de la Vendée, nous ne serons en aucun cas responsables en cas de
						perte d'enfants. Après tout, avec la légendaire Bête Faramine rôdant
						dans les parages, mieux vaut garder un œil sur vos petits
						aventuriers ! Soyez vigilants, car même les créatures mythiques ont
						parfois un petit creux... 😉
					</p>
				</div>
				<div className="mailText fontMenu">
					{animationMenuAppearEnded && !hasAnswered ? (
						<>
							<form
								className="guessFeedback"
								onSubmit={handleSubmitParticipation}
								autoComplete="off"
							>
								<h1>Répondre à l'appel du Gondor</h1>
								<p>
									Pour nous indiquer votre présence il vous suffit de répondre à
									se formulaire !
								</p>
								<table>
									<thead>
										<tr>
											<th></th>
											<th className="shown">Présent à la cérémonie</th>
											<th className="shown">Dormira sur place</th>
											{isVIP && ( 
												<th>
													Présent à la semaine "V.I.P"
												</th>
											)}
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>{guessName}</td>
											<td>
												<div>
													<input
														type="checkbox"
														className="checkboxToggle"
														id="isComing"
														name="isComing"
													></input>
													<label
														htmlFor="isComing"
														className="labelToggle"
													></label>
												</div>
											</td>
											<td>
												<div>
													<input
														type="checkbox"
														className="checkboxToggle"
														id="isSleeping"
														name="isSleeping"
													></input>
													<label
														htmlFor="isSleeping"
														className="labelToggle"
													></label>
												</div>
											</td>
											{isVIP && ( 

												<td>
													<div>
														<input
															type="checkbox"
															className="checkboxToggle"
															id="isComingVIP"
															name="isComingVIP"
														></input>
														<label
															htmlFor="isComingVIP"
															className="labelToggle"
														></label>
													</div>
												</td>
											)}
										</tr>
										<tr>
											<td>
												{hasKnownPartner ? hasKnownPartner : "Conjoint(e)"}
											</td>
											<td>
												<div>
													<input
														type="checkbox"
														className="checkboxToggle"
														id="partnerIsComing"
														name="partnerIsComing"
													></input>
													<label
														htmlFor="partnerIsComing"
														className="labelToggle"
													></label>
												</div>
											</td>
											<td>
												<div>
													<input
														type="checkbox"
														className="checkboxToggle"
														id="partnerIsSleeping"
														name="partnerIsSleeping"
													></input>
													<label
														htmlFor="partnerIsSleeping"
														className="labelToggle"
													></label>
												</div>
											</td>
											{isVIP && ( 

											<td>
												<div>
													<input
														type="checkbox"
														className="checkboxToggle"
														id="partnerIsComingVIP"
														name="partnerIsComingVIP"
													></input>
													<label
														htmlFor="partnerIsComingVIP"
														className="labelToggle"
													></label>
												</div>
											</td>
											)}
										</tr>
										<tr className={isParent ? "" : "hidden"}>
											<td>Enfant(s)</td>
											<td colSpan={isVIP ? 3 : 2}>
												<div>
													<select id="kidsComing" name="kidsComing">
														<option value="0">0</option>
														<option value="1">1</option>
														<option value="2">2</option>
														<option value="3">3</option>
													</select>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
								<button type="submitParticipation">Envoyer ma réponse</button>
								<fieldset className={isVIP ? "visible vip" : "hidden vip"}>
									<legend>Qu'est-ce que le "V.I.P" :</legend>
									<div>
										Chers ami(e)s VIP,
										<br />
										<br />
										Nous avons une proposition que vous ne pourrez pas refuser !{" "}
										<br />
										<br />
										Du lundi au vendredi, rejoignez-nous pour une semaine
										inoubliable entre amis. <br />
										<br />
										Pas de célébration de mariage ici, mais plutôt une occasion
										de créer ensemble des souvenirs mémorables. Préparez-vous à
										vivre des moments de musique, de danse endiablée, de rires
										et de jeux sans fin !<br />
										<br />
										Nous avons pensé à tout pour que vous profitiez pleinement :
										nourriture, logement, des occupations ! <br />
										<br />
										Pour nous permettre d'organiser au mieux cette escapade de
										rêve, nous demandons une contribution de 30 € par personne
										ainsi que de ramener ce que vous souhaiteriez boire durant
										cette semaine. Nous allons prévoir de l'alcool également,
										mais pour 15 personnes sur 5 jours, ça ne sera pas possible.
										Pour finir, ramenez votre bonne humeur et votre envie de
										faire la fête. <br />
										On compte sur vous pour rendre cette semaine spéciale aussi
										épique que possible !<br />
										<br />
										Avec toute notre amitié,
										<br />
										<br />
										Axel & Nell
									</div>
								</fieldset>
							</form>
						</>
					) : (
						<>
							<h1 className="">{hasKnownPartner ? "Vous avez répondu à l'appel du Gondor !" : "Tu as répondu à l'appel du Gondor !"}</h1>
							<fieldset className={isVIP ? "visible vip" : "hidden vip"}>
									<legend>Qu'est-ce que le "V.I.P" :</legend>
									<div>
										Chers ami(e)s VIP,
										<br />
										<br />
										Nous avons une proposition que vous ne pourrez pas refuser !{" "}
										<br />
										<br />
										Du lundi au vendredi, rejoignez-nous pour une semaine
										inoubliable entre amis. <br />
										<br />
										Pas de célébration de mariage ici, mais plutôt une occasion
										de créer ensemble des souvenirs mémorables. Préparez-vous à
										vivre des moments de musique, de danse endiablée, de rires
										et de jeux sans fin !<br />
										<br />
										Nous avons pensé à tout pour que vous profitiez pleinement :
										nourriture, logement, des occupations ! <br />
										<br />
										Pour nous permettre d'organiser au mieux cette escapade de
										rêve, nous demandons une contribution de 30 € par personne
										ainsi que de ramener ce que vous souhaiteriez boire durant
										cette semaine. Nous allons prévoir de l'alcool également,
										mais pour 15 personnes sur 5 jours, ça ne sera pas possible.
										Pour finir, ramenez votre bonne humeur et votre envie de
										faire la fête. <br />
										On compte sur vous pour rendre cette semaine spéciale aussi
										épique que possible !<br />
										<br />
										Avec toute notre amitié,
										<br />
										<br />
										Axel & Nell
									</div>
								</fieldset>
						</>
					)}
				</div>
			</div>
		</section>
	);
}
