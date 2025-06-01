import { MYURL } from "../../constants/elements.js";
import state from "../../constants/state.js";
import { printProjects } from "../print/index.js";

export default function getProjects() {
	return fetch(MYURL + "data/projects.json")
		.then(res => res.json())
		.then(data => {
			state.projects = data.projects;
			printProjects();
		})
		.catch((err) => {
			console.log("Error retrieving projects.json", err);
			console.log(MYURL + "data/projects.json");
		})
}