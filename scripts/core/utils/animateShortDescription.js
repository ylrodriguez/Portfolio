import state from "../../constants/state.js";
import { typeEffect } from "../utils/index.js";

export default async function animateShortDescription() {
	state.shortDescriptionBlockAnimation = true
	const descriptionSub = document.querySelector('.description__sub-position');
	const span1 = document.querySelector('.description__sub-main');
	const span2 = document.querySelector('.description__sub-secondary');
	const langDiv = document.querySelector('.lang-div');
	span1.textContent = '';
	span2.textContent = '';
	descriptionSub.classList.remove('hide');
	// @ts-ignore
	langDiv.style.opacity = 0;
	await typeEffect(span1, state.translations["short-description-main"]);
	await typeEffect(span2, state.translations["short-description-secondary"]);
	state.shortDescriptionBlockAnimation = false
	// @ts-ignore
	langDiv.style.opacity = 1;

}