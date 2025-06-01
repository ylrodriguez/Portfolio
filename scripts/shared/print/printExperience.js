import { EXPERIENCELIST } from "../../constants/elements.js";
import state from "../../constants/state.js";
import { showInfoExperience } from "../utils/index.js";

export default function printExperience() {
	let i = 0;
	let tabList = EXPERIENCELIST.querySelector(".tablist");
	for (const exp of state.experience) {
		// Create tabs
		let buttonTabExp = document.createElement("button");
		let textTabExp = document.createElement("span");
		textTabExp.innerHTML = exp.companyName;

		// @ts-ignore
		buttonTabExp.dataset.index = i;

		buttonTabExp.appendChild(textTabExp);
		tabList.appendChild(buttonTabExp);

		//Listener experience nav
		buttonTabExp.addEventListener("click", ev => {
			// @ts-ignore
			showInfoExperience(ev.currentTarget.dataset.index)
		});

		i++;
	}
	// Loads default
	showInfoExperience(0);
}