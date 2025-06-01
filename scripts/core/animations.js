// @ts-nocheck
import { PROGRESSLIST } from "../constants/elements.js";
import state from "../constants/state.js";

export function animateTitleOfASection(section, direction) {
	var title = document.querySelector(section + " .title");
	var titleBar = document.querySelector(section + " .title-bar");

	title.classList.add("slide-to-" + direction);
	titleBar.style = "animation-delay: 0.5s";
	titleBar.classList.add("slide-to-" + direction);
}

export function animateAboutMeElementHexagon() {
	var elementHexagon = document.querySelector("#about-me .element.hex");
	elementHexagon.classList.add("show");
}

export function animateValueProgress(item, start, end, duration, delay) {
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


export function animateAboutMeProgressList() {
	PROGRESSLIST.style = "animation-delay: 1s;"
	PROGRESSLIST.classList.add("slide-to-left");

	let progressBars = document.querySelectorAll('.progress-bar');
	let progressPercentages = document.querySelectorAll('.progress-percentage');
	var timeDelay = 0.7;
	var i = 0;

	for (let item of progressBars) {
		item.classList.add("fill-width");
		item.style = `
            width: ${state.skills[i].progress}%; 
            animation-delay: ${timeDelay}s;`
		timeDelay += 0.7;
		i++;
	}

	i = 0;
	timeDelay = 600; // animateValueProgress requires values in ms

	for (let item of progressPercentages) {
		let start = 0;
		let end = state.skills[i].progress;
		let duration = 4500; // animateValueProgress requires values in ms

		animateValueProgress(item, start, end, duration, timeDelay)
		timeDelay += 700;
		i++;
	}


}

export function animateAboutMeDiamondList() {
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

export function animateContactBeggining() {
	var paragraphContact = document.querySelector("#text-goodbye");
	paragraphContact.classList.add("slide-to-left");
}

export function animateProjectsList() {

	var animateElementProjectList = document.querySelectorAll('.projects-list .project-item');
	var delayTime = 0.5;

	animateElementProjectList.forEach((element) => {
		element.classList.add("slide-to-top");
		element.style = "animation-delay: " + delayTime + "s";
		delayTime += 0.3;
	})
}