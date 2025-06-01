export default function typeText(element, text, speed = 40) {
	return new Promise((resolve) => {
		let i = 0;
		function type() {
			if (i < text.length) {
				element.textContent += text[i];
				i++;
				const delay = speed + Math.random() * 40; // randomness
				setTimeout(() => requestAnimationFrame(type), delay);
			} else {
				resolve();
			}
		}
		type();
	});
}