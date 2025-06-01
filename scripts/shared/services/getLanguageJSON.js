import { MYURL } from "../../constants/elements.js";
import state from "../../constants/state.js";

export default function getLanguageJSON() {
	const enUrl = `${MYURL}data/lang/en.json`;
	const esUrl = `${MYURL}data/lang/es.json`;

	return Promise.all([
		fetch(enUrl).then(res => res.json()),
		fetch(esUrl).then(res => res.json())
	])
		.then(([enJson, esJson]) => {
			state.englishJson = enJson;
			state.spanishJson = esJson;
			state.translations = state.currentLanguage === "en" ? { ...enJson } : { ...esJson };
		})
		.catch((err) => {
			console.log("Error retrieving language JSON files:", err);
			console.log("Tried URLs:", enUrl, esUrl);
		});
}