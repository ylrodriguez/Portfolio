import { NAVELEMENT } from "../../constants/elements.js";
import state from "../../constants/state.js";

export default function addOrRemoveFixedNav(yOffSet, contentHeight) {
	if (yOffSet >= contentHeight && !state.navElementHasFixedClass) {
		NAVELEMENT.classList.add("fixed");
		state.navElementHasFixedClass = true;
	}
	else if (yOffSet < (contentHeight - 60) && state.navElementHasFixedClass) {
		NAVELEMENT.classList.remove("fixed");
		state.navElementHasFixedClass = false;
	}
}

