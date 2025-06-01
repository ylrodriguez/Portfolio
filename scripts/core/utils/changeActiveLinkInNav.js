import { SKILLSSECTION, CONTACTSSECTION, EXPERIENCESECTION, HOMESECTION, NAVLINKS, PROJECTSSECTION } from "../../constants/elements.js";
import { removeAllActive } from "../../shared/utils/index.js";

export default function changeActiveLinkInNav(yOffSet) {
	// #Home

	if (yOffSet > HOMESECTION.offsetTop) {
		removeAllActive("navs");
		NAVLINKS[0].classList.add("active");
	}
	// #Skills

	if (yOffSet > SKILLSSECTION.offsetTop) {
		removeAllActive("navs");
		NAVLINKS[1].classList.add("active");
	}
	// #Experience

	if (yOffSet > EXPERIENCESECTION.offsetTop) {
		removeAllActive("navs");
		NAVLINKS[2].classList.add("active");
	}
	// #Projects

	if (yOffSet > PROJECTSSECTION.offsetTop) {
		removeAllActive("navs");
		NAVLINKS[3].classList.add("active");
	}
	// #Contact

	if (yOffSet > CONTACTSSECTION.offsetTop || (window.innerHeight + yOffSet - 100) === document.body.clientHeight) {
		removeAllActive("navs");
		NAVLINKS[4].classList.add("active");
	}
}