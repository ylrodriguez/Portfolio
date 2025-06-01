export default function isMobile() {
	//Check if user's using phone.
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		return true;
	}
	else {
		let media = window.matchMedia("(max-width: 599px)");
		//If media query is similar to phone
		if (media.matches) {
			return true;
		}
		return false;
	}
}