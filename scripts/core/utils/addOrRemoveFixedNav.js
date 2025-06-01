import { NAVELEMENT } from "../../constants/elements.js";
import state from "../../constants/state.js";

export default function addOrRemoveFixedNav(yOffSet, contentHeight) {
	if (yOffSet >= contentHeight && !state.navElementHasFixedClass) {
		NAVELEMENT.classList.add("fixed");
		NAVELEMENT.classList.remove("hide");
		state.navElementHasFixedClass = true;
	}
	else if (yOffSet < (contentHeight - 60) && state.navElementHasFixedClass) {
		NAVELEMENT.classList.remove("fixed");
		NAVELEMENT.classList.add("hide");
		state.navElementHasFixedClass = false;
	}
}

