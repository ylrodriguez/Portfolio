const HOMESECTION = document.querySelector('#home');
const BUTTONSEEMORE = document.querySelector('#see-more');
const NAVELEMENT = document.getElementsByTagName("nav")[0];
const WRAPLINKELEMENT = document.getElementsByClassName("wrap-link")[0];
const NAVANCHORS = document.querySelectorAll(".link a");

const ABOUTMESECTION = document.querySelector('#about-me');

const PROJECTSSECTION = document.querySelector('#projects');

const CONTACTSSECTION = document.querySelector('#contact');


var navElementHasFixedClass = false;
var aboutMeTitleAnimated = false;
var aboutMeHexagonAnimated = false;
var projectsTitleAnimated = false;

var positionActiveNavAnchor;


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

    changeActiveLinkInNav(yOffSet);

    if(!aboutMeTitleAnimated){
        if((BUTTONSEEMORE.offsetTop + BUTTONSEEMORE.offsetHeight) <= yOffSet){
            animateTitleOfASection("#about-me");
            aboutMeTitleAnimated = true;
        }
    }
    if(!aboutMeHexagonAnimated){
        if((BUTTONSEEMORE.offsetTop + BUTTONSEEMORE.offsetHeight + 100) <= yOffSet){
            animateAboutMeElementHexagon();
        }
    }
    if(!projectsTitleAnimated){
        //Se añade un margen de 400 para que inicie la animación antes de llegar a la sección
        var condition = (PROJECTSSECTION.offsetTop - 400);
        if(condition <= yOffSet){
            animateTitleOfASection("#projects");
            projectsTitleAnimated = true;
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
}

function animateAboutMeElementHexagon(){
    var elementHexagon = document.querySelector("#about-me .element.hex");
    elementHexagon.classList.add("show");
    aboutMeHexagonAnimated = true;
}

function changeActiveLinkInNav(yOffSet){
    if(yOffSet < ABOUTMESECTION.offsetTop - 50){
        removeAllActive();
        NAVANCHORS[0].classList.add("active");
    }
    else{
        if(yOffSet < PROJECTSSECTION.offsetTop - 50){
            removeAllActive();
            NAVANCHORS[1].classList.add("active");
        }
        else{
            if(yOffSet < CONTACTSSECTION.offsetTop - 350){
                removeAllActive();
                NAVANCHORS[2].classList.add("active");
            }
            else{
                removeAllActive();
                NAVANCHORS[3].classList.add("active");
            }
        }
    }
}

function removeAllActive(){
    NAVANCHORS.forEach( (element) => {
        element.classList.remove("active");
    })
}

document.querySelector('#cv').addEventListener("click", () => {
    var urlCV = "https://1drv.ms/b/s!AlaKRn08I0M_gvgnoeXaLTesRnOzKQ?e=Dh5LhX";
    window.open(urlCV,"_blank ");
});
