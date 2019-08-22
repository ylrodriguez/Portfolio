const HOMESECTION = document.querySelector('#home');
const BUTTONSEEMORE = document.querySelector('#see-more');
const NAVELEMENT = document.getElementsByTagName("nav")[0];

const ABOUTMESECTION = document.querySelector('#about-me');

const WRAPLINKELEMENT = document.getElementsByClassName("wrap-link")[0];

var navElementHasFixedClass = false;
var aboutMeTitleAnimated = false;
var aboutMeHexagonAnimated = false;


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
    WRAPLINKELEMENT.classList.remove("visible");
    var yOffSet = window.pageYOffset;

    addOrRemoveFixedNav(yOffSet, HOMESECTION.offsetHeight);

    if(!aboutMeTitleAnimated){
        if((BUTTONSEEMORE.offsetTop + BUTTONSEEMORE.offsetHeight) <= yOffSet){
            animateTitleOfASection("#about-me");
        }
    }

    if(!aboutMeHexagonAnimated){
        if((BUTTONSEEMORE.offsetTop + BUTTONSEEMORE.offsetHeight + 100) <= yOffSet){
            animateAboutMeElementHexagon();
        }
    }
}

function addOrRemoveFixedNav(yOffSet, contentHeight){
    if(yOffSet >= contentHeight && !navElementHasFixedClass){
        NAVELEMENT.classList.add("fixed");
        navElementHasFixedClass = true;
    }
    else if(yOffSet < (contentHeight-60) && navElementHasFixedClass){
        NAVELEMENT.classList.remove("fixed");
        navElementHasFixedClass = false;
    }
}

function animateTitleOfASection(section){
    var title = document.querySelector(section+" .title");
    var titleBar = document.querySelector(section+" .title-bar");

    title.classList.add("slide-to-left");
    titleBar.style = "animation-delay: 0.5s"
    titleBar.classList.add("slide-to-left");

    aboutMeTitleAnimated = true;
}

function animateAboutMeElementHexagon(){
    var elementHexagon = document.querySelector("#about-me .element.hex");
    elementHexagon.classList.add("show");
    aboutMeHexagonAnimated = true;
}

document.querySelector('#cv').addEventListener("click", () => {
    var urlCV = "https://1drv.ms/b/s!AlaKRn08I0M_gvgnoeXaLTesRnOzKQ?e=Dh5LhX";
    window.open(urlCV,"_blank ");
});
