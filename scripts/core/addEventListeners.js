import { ABOUTMESECTION, BUTTONSEEMORE, HOMESECTION, MYURL, NAVELEMENT, NAVLINKS, WRAPLINKELEMENT } from "../constants/elements.js";
import state from "../constants/state.js";
import { removeAllActive, scrollToElementId, showInfoExperience } from "../shared/utils/index.js";
import lang from "./lang.js";

function checkMediaQueryForSmallDevices(media) {

	if (media.matches) { // If media query matches
		NAVELEMENT.classList.add("fixed");
		state.navElementHasFixedClass = true;
	}
	else {
		NAVELEMENT.classList.remove("fixed");
		state.navElementHasFixedClass = false;
		removeAllActive("projects");
	}
}

export default function addEventListeners() {
	// Listener Media Query
	var media = window.matchMedia("(max-width: 599px)");
	checkMediaQueryForSmallDevices(media);
	media.addListener(checkMediaQueryForSmallDevices);

	//Listener to links located on the nav

	for (let link of NAVLINKS) {
		link.addEventListener("click", () => {
			let attr = link.getAttribute("go");
			let section = document.getElementById(attr);


			WRAPLINKELEMENT.classList.remove("visible");
			document.querySelector(".overlay").classList.remove("open");
			scrollToElementId(attr)
			section.focus();
		})
	}

	//Listener Language Settings
	document.getElementById("span-en").addEventListener("click", () => {
		state.currentLanguage = "en";
		state.translations = { ...state.englishJson };
		document.getElementById("span-en").classList.add("active");
		document.getElementById("span-es").classList.remove("active");
		lang(state.englishJson);
		showInfoExperience(0);
	})
	document.getElementById("span-es").addEventListener("click", () => {
		state.currentLanguage = "es";
		state.translations = { ...state.spanishJson };
		document.getElementById("span-es").classList.add("active");
		document.getElementById("span-en").classList.remove("active");
		lang(state.spanishJson);
		showInfoExperience(0);
	})

	//Listener to hamburguer element
	document.getElementsByClassName("fa-bars")[0].addEventListener("click", () => {
		document.getElementsByClassName("wrap-link")[0].classList.toggle("visible");
		document.querySelector(".overlay").classList.toggle("open");
	});

	//Listener button see more
	BUTTONSEEMORE.addEventListener("click", () => {
		scrollToElementId('about-me')
		ABOUTMESECTION.focus();
	})

	//Listener up button
	document.querySelector('#up-button').addEventListener("click", () => {
		scrollToElementId('home')
		HOMESECTION.focus();
	})

	//Listener overlay
	document.querySelector(".overlay").addEventListener("click", () => {
		document.querySelector(".overlay").classList.remove("open");

		WRAPLINKELEMENT.classList.remove("visible");
	})

	document.querySelector('.email-button').addEventListener("mouseover", () => {
		var textoTooltip = document.querySelector('.email-wrapper .tooltiptext');
		/** @type {HTMLElement} */
		var emailWrapper = document.querySelector('.email-wrapper');

		textoTooltip.innerHTML = state.translations["tooltip-copy"];
		textoTooltip.classList.remove("flip-element");
		emailWrapper.classList.remove("minimize-and-expand");
		emailWrapper.style = "opacity: 1";
	});

	document.querySelector('.email-button').addEventListener("click", () => {
		var textArea = document.createElement("textarea");
		var textoTooltip = document.querySelector('.email-wrapper .tooltiptext');
		var emailWrapper = document.querySelector('.email-wrapper');

		textArea.value = "ylrodriguez024@gmail.com";
		textArea.style = "font-size: 1px; display: block; width: 10px; height: 5px;";
		emailWrapper.appendChild(textArea);
		textArea.focus();
		textArea.select();
		document.execCommand('copy');
		emailWrapper.removeChild(textArea);


		textoTooltip.innerHTML = state.translations["tooltip-copied"]
		emailWrapper.classList.remove("slide-to-bottom");
		textoTooltip.classList.add("flip-element");
		emailWrapper.classList.add("minimize-and-expand");
	});

	document.querySelector('#cv').addEventListener("click", () => {
		// var tempurl = "https://1drv.ms/b/s!AlaKRn08I0M_g4R_5zWK_EhmIeUQAA?e=fnMyCB";
		var tempurl = `${MYURL}data/CV - Yojhan Rodriguez.pdf`;

		window.open(tempurl, "_blank ");
	});

	document.querySelector('#link-git').addEventListener("click", () => {
		var tempurl = "https://github.com/ylrodriguez";
		window.open(tempurl, "_blank ");
	});

	document.querySelector('#link-linkedin').addEventListener("click", () => {
		var tempurl = "https://www.linkedin.com/in/ylrodriguez";
		window.open(tempurl, "_blank ");
	});

	document.querySelector('#link-mail').addEventListener("click", () => {
		window.location.href = 'mailto:ylrodriguez024@gmail.com';
	});
}