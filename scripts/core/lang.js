export default function lang(jsdata) {
	const elements = document.querySelectorAll('[lg-key]');

	elements.forEach(el => {
		const key = el.getAttribute('lg-key');
		const translation = jsdata[key];
		if (translation !== undefined) {
			el.innerHTML = translation;
		}
	});
}