import { MYURL, PROJECTSLIST } from "../../constants/elements.js";
import state from "../../constants/state.js";
import { isMobile, removeAllActive } from "../utils/index.js";

export default function printProjects() {
	let gradient = 'linear-gradient(rgba(6, 16, 41, 0.6), rgba(6, 16, 41, 0.6)),'
	for (let project of state.projects) {
		//Create elements
		let projectItem = document.createElement("div");
		let projectImg = document.createElement("div");
		let projectText = document.createElement("div");
		let textBold = document.createElement("div");
		let textHighlight = document.createElement("span");
		let button = document.createElement("div");
		// Add classes
		projectItem.classList.add("project-item");
		projectImg.classList.add("project-img");
		projectText.classList.add("text");
		textBold.classList.add("bold");
		textHighlight.classList.add("highlight");
		button.classList.add("button", "transparent");
		// Add additional style and set lg-key
		projectImg.style.backgroundImage = `${gradient}url('${MYURL}${project.imgUrl}')`;
		projectImg.style.backgroundSize = 'cover';
		projectImg.style.backgroundPosition = 'center';

		button.setAttribute("lg-key", "see-more");
		//Configure inner html and listeners
		button.innerHTML = state.currentLanguage === "es"
			? state.spanishJson["see-more"]
			: state.englishJson["see-more"];
		textBold.innerHTML = project.name;
		textHighlight.innerHTML = project.tools;
		button.addEventListener("click", () => {
			window.open(project.link);
		})

		projectItem.addEventListener("click", () => {
			if (isMobile()) {
				if (projectItem.classList.contains("active")) {
					removeAllActive("projects");
				}
				else {
					removeAllActive("projects");
					projectItem.classList.add("active");
				}
			}
			else {
				removeAllActive("projects");
			}
		})

		//Append elements correctly
		projectText.appendChild(textBold);
		projectText.appendChild(textHighlight);
		projectItem.appendChild(projectImg);
		projectItem.appendChild(projectText);
		projectItem.appendChild(button);
		PROJECTSLIST.appendChild(projectItem);
	}
	//Add i-elements to fill space if needed in flex container
	for (let i = 0; i < 5; i++) {
		let ielement = document.createElement("i");
		ielement.setAttribute("aria-hidden", "true");
		PROJECTSLIST.appendChild(ielement);
	}
}