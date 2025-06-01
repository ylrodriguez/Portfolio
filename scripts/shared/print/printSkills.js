import { PROGRESSLIST } from "../../constants/elements.js";
import state from "../../constants/state.js";

export default function printSkills() {
	for (let skillItem of state.skills) {

		let progressBg = document.createElement("div");
		let progressBar = document.createElement("div");
		let progressTag = document.createElement("div");
		let progressPercentage = document.createElement("div");

		progressBg.classList.add("progress-bg");
		progressBar.classList.add("progress-bar", "flex");
		progressPercentage.classList.add("progress-percentage");
		progressTag.classList.add("progress-tag", "flex");

		if ('lg-key' in skillItem) {
			progressTag.setAttribute("lg-key", skillItem["lg-key"]);

			progressTag.innerHTML = state.translations[skillItem["lg-key"]]

		} else {
			progressTag.innerHTML = skillItem.skillName;
		}

		progressBar.appendChild(progressTag);
		progressBar.appendChild(progressPercentage);
		progressBg.appendChild(progressBar);
		PROGRESSLIST.appendChild(progressBg);
	}
}