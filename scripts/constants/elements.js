// @ts-nocheck
const Waypoint = window.Waypoint;

/** @type {HTMLElement} */
const HOMESECTION = document.querySelector('#home');
const BUTTONSEEMORE = document.querySelector('#see-more');
const NAVELEMENT = document.getElementsByTagName("nav")[0];
const WRAPLINKELEMENT = document.getElementsByClassName("wrap-link")[0];
/** @type {HTMLElement[]} */
const NAVLINKS = document.querySelectorAll("nav .link");

/** @type {HTMLElement} */
const ABOUTMESECTION = document.querySelector('#about-me');
/** @type {HTMLElement} */
const SKILLSSECTION = document.querySelector('#skills');
/** @type {HTMLElement} */
const PROJECTSSECTION = document.querySelector('#projects');
/** @type {HTMLElement} */
const EXPERIENCESECTION = document.querySelector('#experience');
/** @type {HTMLElement} */
const PROGRESSLIST = document.querySelector('.progress-list');
const PROJECTSLIST = document.querySelector('.projects-list');
const EXPERIENCELIST = document.querySelector('.experience-list');
const DIAMONDLIST = document.querySelector(".diamond-list");
/** @type {HTMLElement} */
const CONTACTSSECTION = document.querySelector('#contact');

// const MYURL = "https://ylrodriguez.github.io/Portfolio/";
const MYURL = "http://127.0.0.1:5500/";

const FAKE_PROJECTS_URL = [
	`https://deepcart-app.netlify.app/fake/${Date.now()}.jpg`,
	`https://deepcartapi-env.fly.dev/fake/${Date.now()}.jpg`,
	`https://luker-talent.netlify.app/fake/${Date.now()}.jpg`,
	`https://heim-realestateapi.fly.dev/fake/${Date.now()}.jpg`,
	`https://heim-realestate.netlify.app/fake/${Date.now()}.jpg`,
	`https://weather-yr-app.netlify.app/fake/${Date.now()}.jpg`
]

export {
	Waypoint,
	HOMESECTION,
	BUTTONSEEMORE,
	NAVELEMENT,
	WRAPLINKELEMENT,
	NAVLINKS,
	ABOUTMESECTION,
	PROJECTSSECTION,
	EXPERIENCESECTION,
	PROGRESSLIST,
	PROJECTSLIST,
	EXPERIENCELIST,
	DIAMONDLIST,
	CONTACTSSECTION,
	MYURL,
	FAKE_PROJECTS_URL,
	SKILLSSECTION
}