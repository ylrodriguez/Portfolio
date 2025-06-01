import { animateAboutMeDiamondList, animateAboutMeElementHexagon, animateAboutMeProgressList, animateContactBeggining, animateProjectsList, animateTitleOfASection } from "./animations.js";
import { BUTTONSEEMORE, CONTACTSSECTION, DIAMONDLIST, HOMESECTION, PROJECTSLIST, Waypoint } from "../constants/elements.js";
import state from "../constants/state.js";
import { animateShortDescription } from "./utils/index.js";

export default function loadWaypoints() {

	/**
	 * Animations
	 */

	// ---> Home Section
	new Waypoint({
		element: document.querySelector('.description__sub'),
		handler: async function (direction) {
			if (direction === "up" && !state.shortDescriptionBlockAnimation) {
				await animateShortDescription();
			}
		},
	});

	new Waypoint({
		element: HOMESECTION,
		handler: async function (direction) {
			if (direction === "down" && !state.shortDescriptionBlockAnimation) {
				await animateShortDescription();
			}
		},
	});

	// ---> About Me Section
	new Waypoint({
		element: BUTTONSEEMORE,
		handler: function (direction) {
			if (direction === "down" && !state.aboutMeTitleAnimated) {
				animateTitleOfASection("#about-me", "right");
				state.aboutMeTitleAnimated = true;
			}
		}
	});

	new Waypoint({
		element: BUTTONSEEMORE,
		handler: function (direction) {
			if (direction === "down" && !state.aboutMeHexagonAnimated) {
				animateAboutMeElementHexagon();
				animateAboutMeProgressList();
				state.aboutMeHexagonAnimated = true;
			}
		},
		offset: -200
	});

	new Waypoint({
		element: DIAMONDLIST,
		handler: function (direction) {
			if (direction === "down" && !state.aboutMeDiamondListAnimated) {
				animateAboutMeDiamondList();
				state.aboutMeDiamondListAnimated = true;
			}
		},
		offset: "80%"
	});

	new Waypoint({
		element: document.querySelector('#cv'),
		handler: function (direction) {
			if (direction === "down" && !state.aboutMeCvButtonAnimated) {

				/** @type {HTMLElement} */
				var buttonCV = document.querySelector('#cv');

				buttonCV.style = "animation-delay: 0.5s; animation-timing-function: ease-in-out;";
				buttonCV.classList.add("slide-to-left");
				state.aboutMeCvButtonAnimated = true;
			}
		},
		offset: "80%"
	});

	// ---> Experience Section
	new Waypoint({
		element: document.querySelector('#experience'),
		handler: function (direction) {
			if (direction === "down" && !state.experienceTitleAnimated) {
				animateTitleOfASection("#experience", "left");
				state.experienceTitleAnimated = true;
			}
		},
		offset: "80%"
	});

	// ---> Projects Section
	new Waypoint({
		element: document.querySelector('#projects'),
		handler: function (direction) {
			if (direction === "down" && !state.projectsTitleAnimated) {
				animateTitleOfASection("#projects", "right");
				state.projectsTitleAnimated = true;
			}
		},
		offset: "80%"
	});

	new Waypoint({
		element: PROJECTSLIST,
		handler: function (direction) {
			if (direction === "down" && !state.projectsListAnimated) {
				animateProjectsList();
				state.projectsListAnimated = true;
			}
		},
		offset: "80%"
	});

	//---> Contact Section
	new Waypoint({
		element: CONTACTSSECTION,
		handler: function (direction) {
			if (direction === "down" && !state.contactTitleAnimated) {
				animateTitleOfASection("#contact", "left");
				animateContactBeggining();
				state.contactTitleAnimated = true;
			}
		},
		offset: "60%"
	});

	new Waypoint({
		element: document.getElementById("link-wrapper"),
		handler: function (direction) {
			if (direction === "down" && !state.contactSocialNetworksAnimated) {

				//En caso de que el viewport no tenga más scroll y no se haya animado anteriormente.
				if (!state.contactTitleAnimated) {
					animateTitleOfASection("#contact", "right");
					animateContactBeggining();
					state.contactTitleAnimated = true;
				}


				var squareAll = document.querySelectorAll(".square.link");
				var delayTime = 0;

				squareAll.forEach((/** @type {HTMLElement} */ element) => {
					element.classList.add("flip-element");
					element.style = "animation-delay: " + delayTime + "s";
					delayTime += 0.5;
				})
				state.contactSocialNetworksAnimated = true;
			}
		},
		offset: "bottom-in-view"
	});
}