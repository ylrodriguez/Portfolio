import { MYURL } from "../../constants/elements.js";
import state from "../../constants/state.js";
import { printExperience } from "../print/index.js";


export default function getExperience() {
	return fetch(MYURL + "data/experience.json")
		.then(res => res.json())
		.then(data => {
			state.experience = data.experience;
			printExperience();
		})
		.catch((err) => {
			console.log("Error retrieving experience.json", err);
			console.log(MYURL + "data/experience.json");
		})
}


