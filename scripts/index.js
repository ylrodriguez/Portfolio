const ABOUTMESECTION = document.querySelector('#about-me');
const HOMESECTION = document.querySelector('#home');
const BUTTONSEEMORE = document.querySelector('.see-more');
const NAVELEMENT = document.getElementsByTagName("nav")[0];
var navElementHasFixedClass = false;


document.getElementsByClassName("fa-bars")[0].addEventListener("click", () => {
    document.getElementsByClassName("wrap-link")[0].classList.toggle("visible")
});

BUTTONSEEMORE.addEventListener("click", () => {
    ABOUTMESECTION.scrollIntoView({
        behavior: "smooth"
    });
    ABOUTMESECTION.focus();
})

window.onscroll = (e) => {
    // Se recoge la posición top del botón y
     //se le suma la altura total del boton y 100 de margen adicional
    //var contentHeight = BUTTONSEEMORE.offsetTop + BUTTONSEEMORE.offsetHeight + 100;
    var contentHeight = HOMESECTION.offsetHeight;
    var yOffSet = window.pageYOffset;

    if(yOffSet >= contentHeight && !navElementHasFixedClass){
        NAVELEMENT.classList.add("fixed");
        navElementHasFixedClass = true;
    }
    else if(yOffSet < (contentHeight-60) && navElementHasFixedClass){
        NAVELEMENT.classList.remove("fixed");
        navElementHasFixedClass = false;
    }

}
