import { NAVLINKS } from "../../constants/elements.js";

export default function removeAllActive(type) {

	if (type == "navs") {
		NAVLINKS.forEach((element) => {
			element.classList.remove("active");
		})
	}

	if (type == "projects") {
		let projects = document.querySelectorAll('.projects-list .project-item');
		// @ts-ignore
		for (let item of projects) {
			item.classList.remove("active");
		}
	}
}
