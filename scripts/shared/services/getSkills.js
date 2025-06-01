import { MYURL } from "../../constants/elements.js";
import state from "../../constants/state.js";
import { printSkills } from "../print/index.js";

export default function getSkills() {
	return fetch(MYURL + "data/skills.json")
		.then(res => res.json())
		.then(data => {
			state.skills = data.skills;
			printSkills();
		})
		.catch(() => {
			console.log("Error retrieving skills.json");
			console.log(MYURL + "data/skills.json");
		})
}