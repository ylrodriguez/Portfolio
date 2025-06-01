import { FAKE_PROJECTS_URL } from "../constants/elements.js";


export default function wakePersonalProjects() {
	// Wake up Projects requesting a fake image.
	for (let projectUrl of FAKE_PROJECTS_URL) {
		var i = document.createElement("img");
		i.src = projectUrl
	}
}