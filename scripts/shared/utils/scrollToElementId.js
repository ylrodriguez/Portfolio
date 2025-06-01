export default function scrollToElementId(id) {
	const element = document.getElementById(id);

	if (element) {
		window.scrollTo({
			top: element.offsetTop,
			behavior: 'smooth'
		});
	}
}