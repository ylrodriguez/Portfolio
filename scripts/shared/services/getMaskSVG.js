import { MYURL } from "../../constants/elements.js";
import { animateHomeMask } from "../../core/utils/index.js";

export default function getMaskSVG() {
	return fetch(MYURL + "img/stars.svg")
		.then(response => response.text())
		.then(svg => {
			document.querySelector('.home-container__mask').innerHTML = svg;
			animateHomeMask();
		});
}