
const HOMESECTION = document.querySelector('#home');
const BUTTONSEEMORE = document.querySelector('#see-more');
const NAVELEMENT = document.getElementsByTagName("nav")[0];
const WRAPLINKELEMENT = document.getElementsByClassName("wrap-link")[0];
const NAVLINKS = document.querySelectorAll("nav .link");

const ABOUTMESECTION = document.querySelector('#about-me');
const PROJECTSSECTION = document.querySelector('#projects');
const EXPERIENCESECTION = document.querySelector('#experience');
const PROGRESSLIST = document.querySelector('.progress-list');
const PROJECTSLIST = document.querySelector('.projects-list');
const EXPERIENCELIST = document.querySelector('.experience-list');
const DIAMONDLIST = document.querySelector(".diamond-list");

const CONTACTSSECTION = document.querySelector('#contact');

const MYURL = "https://ylrodriguez.github.io/Portfolio/";
// const MYURL = "http://127.0.0.1:5500/";
const HEROKUPROJECTSURL = [
	`https://deepcart-app.herokuapp.com/fake/${Date.now()}.jpg`,
	`https://deepcartapi-env.herokuapp.com/fake/${Date.now()}.jpg`,
	`https://luker-demo.herokuapp.com/fake/${Date.now()}.jpg`,
	`https://heim-realestateapi.herokuapp.com/fake/${Date.now()}.jpg`,
	`https://heim-realestate.herokuapp.com/fake/${Date.now()}.jpg`,
	`http://weather-yrapp.herokuapp.com/fake/${Date.now()}.jpg`
]

var navElementHasFixedClass = false;
var aboutMeTitleAnimated = false;
var aboutMeHexagonAnimated = false;
var aboutMeDiamondListAnimated = false;
var projectsTitleAnimated = false;
var projectsListAnimated = false;
var experienceTitleAnimated = false;
var experienceListAnimated = false;
var aboutMeCvButtonAnimated = false;
var contactTitleAnimated = false;
var contactSocialNetworksAnimated = false;

var skills = [];
var projects = [];
var experience = [];
var currentLanguage = "en";
var englishJson;
var spanishJson;


$('document').ready(function () {

	$('#current-year').text(`©${new Date().getFullYear()}`);

	$('.loader').show();
	//Get english object array
	$.getJSON('data/lang/en.json', (json) => {
		englishJson = json;
		//Get spanish object array
		$.getJSON('data/lang/es.json', (json) => {
			spanishJson = json;
			// Simulate API calls to get data
			getSkills()
				.then(() => getProjects())
				.then(() => getExperience())
				.then(() => {
					loadWaypoints();
					wakeHerokuProjects();
					translateWebPage(englishJson);
					$('.loader').hide();
					$('#see-more').removeClass('hide');
				}).catch(() => {
					console.log("Error Loading.");
					translateWebPage(englishJson);
					loadWaypoints();
					$('.loader').hide();
					$('#see-more').removeClass('hide');
				})
		});
	});

	addEventListeners();
});

function addEventListeners() {
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
		currentLanguage = "en";
		document.getElementById("span-en").classList.add("active");
		document.getElementById("span-es").classList.remove("active");
		translateWebPage(englishJson);
		showInfoExperience(0);
	})
	document.getElementById("span-es").addEventListener("click", () => {
		currentLanguage = "es";
		document.getElementById("span-es").classList.add("active");
		document.getElementById("span-en").classList.remove("active");
		translateWebPage(spanishJson);
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
		var emailWrapper = document.querySelector('.email-wrapper');
		textoTooltip.innerHTML = currentLanguage === "es" ? spanishJson["tooltip-copy"] : englishJson["tooltip-copy"];
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

		textoTooltip.innerHTML = currentLanguage === "es" ? spanishJson["tooltip-copied"] : englishJson["tooltip-copied"];
		emailWrapper.classList.remove("slide-to-bottom");
		textoTooltip.classList.add("flip-element");
		emailWrapper.classList.add("minimize-and-expand");
	});

	document.querySelector('#cv').addEventListener("click", () => {
		var tempurl = "https://1drv.ms/b/s!AlaKRn08I0M_g4R_5zWK_EhmIeUQAA?e=fnMyCB";
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

function checkMediaQueryForSmallDevices(media) {

	if (media.matches) { // If media query matches
		NAVELEMENT.classList.add("fixed");
		navElementHasFixedClass = true;
	}
	else {
		NAVELEMENT.classList.remove("fixed");
		navElementHasFixedClass = false;
		removeAllActive("projects");
	}
}

function getSkills() {
	return fetch(MYURL + "data/skills.json")
		// return fetch("data/skills.json")
		.then(res => res.json())
		.then(data => {
			skills = data.skills;
			printSkills();
		})
		.catch(() => {
			console.log("Error retrieving skills.json");
			console.log(MYURL + "data/skills.json");
		})
}

function wakeHerokuProjects() {
	// Wake up Heroku Projects requesting a fake image.
	for (let projectUrl of HEROKUPROJECTSURL) {
		var i = document.createElement("img");
		i.src = projectUrl
	}
}

function getProjects() {
	return fetch(MYURL + "data/projects.json")
		.then(res => res.json())
		.then(data => {
			projects = data.projects;
			printProjects();
		})
		.catch(() => {
			console.log("Error retrieving projects.json");
			console.log(MYURL + "data/projects.json");
		})
}

function getExperience() {
	return fetch(MYURL + "data/experience.json")
		.then(res => res.json())
		.then(data => {
			experience = data.experience;
			printExperience();
		})
		.catch(() => {
			console.log("Error retrieving experience.json");
			console.log(MYURL + "data/experience.json");
		})
}

function printSkills() {
	for (let skillItem of skills) {

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

			progressTag.innerHTML = currentLanguage === "es"
				? spanishJson[skillItem["lg-key"]]
				: englishJson[skillItem["lg-key"]];

		} else {
			progressTag.innerHTML = skillItem.skillName;
		}

		progressBar.appendChild(progressTag);
		progressBar.appendChild(progressPercentage);
		progressBg.appendChild(progressBar);
		PROGRESSLIST.appendChild(progressBg);
	}
}

function printExperience() {
	let i = 0;
	let tabList = EXPERIENCELIST.querySelector(".tablist");
	for (const exp of experience) {
		// Create tabs
		let buttonTabExp = document.createElement("button");
		let textTabExp = document.createElement("span");
		textTabExp.innerHTML = exp.companyName;

		buttonTabExp.dataset.index = i;

		buttonTabExp.appendChild(textTabExp);
		tabList.appendChild(buttonTabExp);

		//Listener experience nav
		buttonTabExp.addEventListener("click", ev => {
			showInfoExperience(ev.currentTarget.dataset.index)
		});

		i++;
	}
	// Loads default
	showInfoExperience(0);
}

function showInfoExperience(index) {
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

		const EXPERIENCE_DATA = experience[index];
		// Found chosen button
		element.classList.add('selected');
		let key = currentLanguage === "es" ? 'esp' : 'eng';
		let companyRef = experienceInfo.querySelector(".company-name>a")
		let titleJob = experienceInfo.querySelector(".company-name>span");
		let descriptionUl = experienceInfo.querySelector('ul');
		let range = experienceInfo.querySelector(".range");
		let startDate = dateRangeExperience(EXPERIENCE_DATA.startDate);
		let endDate = EXPERIENCE_DATA.endDate
			? `${dateRangeExperience(EXPERIENCE_DATA.endDate)}`
			: `${currentLanguage === "es" ? 'Presente' : 'Present'}`

		titleJob.innerHTML = EXPERIENCE_DATA[`position_${key}`];
		companyRef.innerHTML = `@ ${EXPERIENCE_DATA.companyName}`;
		companyRef.href = EXPERIENCE_DATA.link;
		range.innerHTML = `${startDate} - ${endDate}`;

		$(descriptionUl).empty();
		for (const item of EXPERIENCE_DATA[`descriptions_${key}`]) {
			let li = document.createElement("li");
			li.innerHTML = item;
			descriptionUl.appendChild(li);
		}
	});
}

function dateRangeExperience(dateString) {
	let date = new Date(dateString.split('-'));
	let options = { year: 'numeric', month: 'long' };
	return date.toLocaleDateString(currentLanguage === "es" ? 'es-CO' : 'en-US', options);
}

function printProjects() {
	let gradient = 'linear-gradient(rgba(6, 16, 41, 0.6), rgba(6, 16, 41, 0.6)),'
	for (let project of projects) {
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
		button.innerHTML = currentLanguage === "es"
			? spanishJson["see-more"]
			: englishJson["see-more"];
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

function addOrRemoveFixedNav(yOffSet, contentHeight) {
	if (yOffSet >= contentHeight && !navElementHasFixedClass) {
		NAVELEMENT.classList.add("fixed");
		navElementHasFixedClass = true;
	}
	else if (yOffSet < (contentHeight - 60) && navElementHasFixedClass) {
		NAVELEMENT.classList.remove("fixed");
		navElementHasFixedClass = false;
	}
}

/**
 * --- Animations
 */
function animateTitleOfASection(section, direction) {
	var title = document.querySelector(section + " .title");
	var titleBar = document.querySelector(section + " .title-bar");

	title.classList.add("slide-to-" + direction);
	titleBar.style = "animation-delay: 0.5s";
	titleBar.classList.add("slide-to-" + direction);
}

function animateAboutMeElementHexagon() {
	var elementHexagon = document.querySelector("#about-me .element.hex");
	elementHexagon.classList.add("show");
}

function animateAboutMeProgressList() {
	PROGRESSLIST.style = "animation-delay: 1s;"
	PROGRESSLIST.classList.add("slide-to-left");

	let progressBars = document.querySelectorAll('.progress-bar');
	let progressPercentages = document.querySelectorAll('.progress-percentage');
	var timeDelay = 0.7;
	var i = 0;

	for (let item of progressBars) {
		item.classList.add("fill-width");
		item.style = `
            width: ${skills[i].progress}%; 
            animation-delay: ${timeDelay}s;`
		timeDelay += 0.7;
		i++;
	}

	i = 0;
	timeDelay = 600; // animateValueProgress requires values in ms

	for (let item of progressPercentages) {
		let start = 0;
		let end = skills[i].progress;
		let duration = 4500; // animateValueProgress requires values in ms

		animateValueProgress(item, start, end, duration, timeDelay)
		timeDelay += 700;
		i++;
	}


}

function animateAboutMeDiamondList() {
	var animateElementDiamondList = document.querySelectorAll(".diamond-list .element");
	var delayTime = 0.5;

	animateElementDiamondList.forEach((element) => {
		element.children[0].classList.add("flip-element");
		element.children[0].style = "animation-delay: " + delayTime + "s";
		element.children[0].style = "animation-duration: 5s";
		delayTime += 0.2;
	})

	animateElementDiamondList.forEach((element) => {
		element.children[1].style = "animation-delay: " + delayTime + "s";
		element.children[1].classList.add("slide-to-bottom");
		delayTime += 0.2;
	})
}

function animateContactBeggining() {
	var paragraphContact = document.querySelector("#text-goodbye");
	paragraphContact.classList.add("slide-to-left");

	var emailWrapper = document.querySelector(".email-wrapper");
	emailWrapper.classList.add("slide-to-bottom");
}

function animateProjectsList() {

	var animateElementProjectList = document.querySelectorAll('.projects-list .project-item');
	var delayTime = 0.5;

	animateElementProjectList.forEach((element) => {
		element.classList.add("slide-to-top");
		element.style = "animation-delay: " + delayTime + "s";
		delayTime += 0.3;
	})
}

/**
 * --- End Animations
 */

function changeActiveLinkInNav(yOffSet) {
	// #Home
	if (yOffSet > HOMESECTION.offsetTop) {
		removeAllActive("navs");
		NAVLINKS[0].classList.add("active");
	}
	// #About Me
	if (yOffSet > ABOUTMESECTION.offsetTop) {
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

function removeAllActive(type) {

	if (type == "navs") {
		NAVLINKS.forEach((element) => {
			element.classList.remove("active");
		})
	}

	if (type == "projects") {
		let projects = document.querySelectorAll('.projects-list .project-item');
		for (let item of projects) {
			item.classList.remove("active");
		}
	}
}

window.onscroll = (e) => {
	var yOffSet = window.pageYOffset;

	if (!isMobile()) {
		addOrRemoveFixedNav(Math.ceil(yOffSet), HOMESECTION.offsetHeight);
	}

	changeActiveLinkInNav((yOffSet + 100));

}

function loadWaypoints() {

	/**
	 * Animations
	 */

	// ---> About Me Section
	new Waypoint({
		element: BUTTONSEEMORE,
		handler: function (direction) {
			if (direction === "down" && !aboutMeTitleAnimated) {
				animateTitleOfASection("#about-me", "right");
				aboutMeTitleAnimated = true;
			}
		}
	});

	new Waypoint({
		element: BUTTONSEEMORE,
		handler: function (direction) {
			if (direction === "down" && !aboutMeHexagonAnimated) {
				animateAboutMeElementHexagon();
				animateAboutMeProgressList();
				aboutMeHexagonAnimated = true;
			}
		},
		offset: -200
	});

	new Waypoint({
		element: DIAMONDLIST,
		handler: function (direction) {
			if (direction === "down" && !aboutMeDiamondListAnimated) {
				animateAboutMeDiamondList();
				aboutMeDiamondListAnimated = true;
			}
		},
		offset: "80%"
	});

	new Waypoint({
		element: document.querySelector('#cv'),
		handler: function (direction) {
			if (direction === "down" && !aboutMeCvButtonAnimated) {

				var buttonCV = document.querySelector('#cv');
				buttonCV.style = "animation-delay: 0.5s; animation-timing-function: ease-in-out;";
				buttonCV.classList.add("slide-to-left");
				aboutMeCvButtonAnimated = true;
			}
		},
		offset: "80%"
	});

	// ---> Experience Section
	new Waypoint({
		element: document.querySelector('#experience'),
		handler: function (direction) {
			if (direction === "down" && !experienceTitleAnimated) {
				animateTitleOfASection("#experience", "left");
				experienceTitleAnimated = true;
			}
		},
		offset: "80%"
	});

	// ---> Projects Section
	new Waypoint({
		element: document.querySelector('#projects'),
		handler: function (direction) {
			if (direction === "down" && !projectsTitleAnimated) {
				animateTitleOfASection("#projects", "right");
				projectsTitleAnimated = true;
			}
		},
		offset: "80%"
	});

	new Waypoint({
		element: PROJECTSLIST,
		handler: function (direction) {
			if (direction === "down" && !projectsListAnimated) {
				animateProjectsList();
				projectsListAnimated = true;
			}
		},
		offset: "80%"
	});

	//---> Contact Section
	new Waypoint({
		element: CONTACTSSECTION,
		handler: function (direction) {
			if (direction === "down" && !contactTitleAnimated) {
				animateTitleOfASection("#contact", "left");
				animateContactBeggining();
				contactTitleAnimated = true;
			}
		},
		offset: "60%"
	});

	new Waypoint({
		element: document.getElementById("link-wrapper"),
		handler: function (direction) {
			if (direction === "down" && !contactSocialNetworksAnimated) {

				//En caso de que el viewport no tenga más scroll y no se haya animado anteriormente.
				if (!contactTitleAnimated) {
					animateTitleOfASection("#contact", "right");
					animateContactBeggining();
					contactTitleAnimated = true;
				}

				var squareAll = document.querySelectorAll(".square.link");
				var delayTime = 0;

				squareAll.forEach((element) => {
					element.classList.add("flip-element");
					element.style = "animation-delay: " + delayTime + "s";
					delayTime += 0.5;
				})
				contactSocialNetworksAnimated = true;
			}
		},
		offset: "bottom-in-view"
	});
}

function animateValueProgress(item, start, end, duration, delay) {
	var range = end - start;
	var current = start;
	var increment = end > start ? 1 : -1;
	var stepTime = Math.abs(Math.floor(duration / range));

	setTimeout(() => {
		var timer = setInterval(() => {
			current += increment;
			item.innerHTML = current + '%';
			if (current == end) {
				clearInterval(timer);
			}
		}, stepTime);
	}, delay);
}

function isMobile() {
	//Check if user's using phone.
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		return true;
	}
	else {
		let media = window.matchMedia("(max-width: 599px)");
		//If media query is similar to phone
		if (media.matches) {
			return true;
		}
		return false;
	}
}

function scrollToElementId(id) {
	const $element = $('#' + id);

	if ($element.length) {
		$('html, body').animate({
			scrollTop: $element.offset().top
		}, 700);
	}
}