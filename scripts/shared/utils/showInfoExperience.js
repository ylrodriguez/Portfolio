import { EXPERIENCELIST } from "../../constants/elements.js";
import state from "../../constants/state.js";

function dateRangeExperience(dateString) {
	let date = new Date(dateString.split('-'));
	let options = { year: 'numeric', month: 'long' };
	// @ts-ignore
	return date.toLocaleDateString(state.currentLanguage === "es" ? 'es-CO' : 'en-US', options);
}

export default function showInfoExperience(index) {
	let tabList = EXPERIENCELIST.querySelector(".tablist");
	let tabListButtons = tabList.querySelectorAll('button');
	let experienceInfo = EXPERIENCELIST.querySelector(".experience-info");

	// Removes selected Item
	tabListButtons.forEach((element) => {
		element.classList.remove("selected");
	});

	// Adds new selected Item
	tabListButtons.forEach((element) => {
		if (element.dataset.index != index) return;

		const EXPERIENCE_DATA = state.experience[index];
		// Found chosen button
		element.classList.add('selected');
		let key = state.currentLanguage === "es" ? 'esp' : 'eng';
		let companyRef = experienceInfo.querySelector(".company-name>a")
		let titleJob = experienceInfo.querySelector(".company-name>span");
		let descriptionUl = experienceInfo.querySelector('ul');
		let range = experienceInfo.querySelector(".range");
		let startDate = dateRangeExperience(EXPERIENCE_DATA.startDate);
		let endDate = EXPERIENCE_DATA.endDate
			? `${dateRangeExperience(EXPERIENCE_DATA.endDate)}`
			: `${state.currentLanguage === "es" ? 'Presente' : 'Present'}`

		titleJob.innerHTML = EXPERIENCE_DATA[`position_${key}`];
		companyRef.innerHTML = `@ ${EXPERIENCE_DATA.companyName}`;
		// @ts-ignore
		companyRef.href = EXPERIENCE_DATA.link;
		range.innerHTML = `${startDate} - ${endDate}`;

		descriptionUl.innerHTML = '';

		for (const item of EXPERIENCE_DATA[`descriptions_${key}`]) {
			const li = document.createElement("li");
			li.innerHTML = item;
			descriptionUl.appendChild(li);
		}
	});
}