document.addEventListener("DOMContentLoaded", function (event) {
    loadEventHandlers()
});

function loadEventHandlers(){
    document.getElementsByClassName("fa-bars")[0].addEventListener("click", () => {
        document.getElementsByClassName("wrap-link")[0].classList.toggle("visible")
    });
}