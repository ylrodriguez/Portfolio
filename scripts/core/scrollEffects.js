import { HOMESECTION } from "../constants/elements.js";
import { isMobile } from "../shared/utils/index.js";
import { addOrRemoveFixedNav, changeActiveLinkInNav } from "./utils/index.js";

export default function scrollEffects() {
	window.onscroll = function () {
		let yOffSet = window.pageYOffset;

		if (!isMobile()) {
			addOrRemoveFixedNav(Math.ceil(yOffSet), HOMESECTION.offsetHeight);
		}

		changeActiveLinkInNav((yOffSet + 100));
	}
}