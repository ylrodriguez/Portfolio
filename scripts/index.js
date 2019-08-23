const HOMESECTION = document.querySelector('#home');
const BUTTONSEEMORE = document.querySelector('#see-more');
const NAVELEMENT = document.getElementsByTagName("nav")[0];
const WRAPLINKELEMENT = document.getElementsByClassName("wrap-link")[0];
const NAVANCHORS = document.querySelectorAll(".link a");

const ABOUTMESECTION = document.querySelector('#about-me');

// const PROJECTSSECTION = document.querySelector('#projects');

const CONTACTSSECTION = document.querySelector('#contact');


var navElementHasFixedClass = false;
var aboutMeTitleAnimated = false;
var aboutMeHexagonAnimated = false;
// var projectsTitleAnimated = false;
var contactTitleAnimated = false;

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

document.querySelector('#up-button').addEventListener("click", () => {
    HOMESECTION.scrollIntoView({
        behavior: "smooth"
    });
    HOMESECTION.focus();
})

function addOrRemoveFixedNav(yOffSet, contentHeight) {
    if (yOffSet >= contentHeight && !navElementHasFixedClass) {
        NAVELEMENT.classList.add("fixed");
        navElementHasFixedClass = true;
    }
    else if (yOffSet < (contentHeight - 60) && navElementHasFixedClass) {
        NAVELEMENT.classList.remove("fixed");
        navElementHasFixedClass = false;
    }
}

function animateTitleOfASection(section, direction) {
    var title = document.querySelector(section + " .title");
    var titleBar = document.querySelector(section + " .title-bar");

    title.classList.add("slide-to-" + direction);
    titleBar.style = "animation-delay: 0.5s"
    titleBar.classList.add("slide-to-" + direction);
}

function animateAboutMeElementHexagon() {
    var elementHexagon = document.querySelector("#about-me .element.hex");
    elementHexagon.classList.add("show");
}

// Esta función incluye proyectos.
// function changeActiveLinkInNav(yOffSet) {
//     if (yOffSet < ABOUTMESECTION.offsetTop - 300) {
//         removeAllActive();
//         NAVANCHORS[0].classList.add("active");
//     }
//     else {
//         if (yOffSet < PROJECTSSECTION.offsetTop - 300) {
//             removeAllActive();
//             NAVANCHORS[1].classList.add("active");
//         }
//         else {
//             if (yOffSet < CONTACTSSECTION.offsetTop - 350) {
//                 removeAllActive();
//                 NAVANCHORS[2].classList.add("active");
//             }
//             else {
//                 removeAllActive();
//                 NAVANCHORS[3].classList.add("active");
//             }
//         }
//     }
// }

//Esta función es temporal y no incluye proyectos
function changeActiveLinkInNav(yOffSet) {
    if (yOffSet < ABOUTMESECTION.offsetTop - 300) {
        removeAllActive();
        NAVANCHORS[0].classList.add("active");
    }
    else {
        if (yOffSet < CONTACTSSECTION.offsetTop - 300) {
            removeAllActive();
            NAVANCHORS[1].classList.add("active");
        }
        else {
            removeAllActive();
            NAVANCHORS[2].classList.add("active");
        }
    }
}

function removeAllActive() {
    NAVANCHORS.forEach((element) => {
        element.classList.remove("active");
    })
}

document.querySelector('#cv').addEventListener("click", () => {
    var url = "https://1drv.ms/b/s!AlaKRn08I0M_gvgnoeXaLTesRnOzKQ?e=Dh5LhX";
    window.open(url, "_blank ");
});


document.querySelector('.email-button').addEventListener("mouseover", () => {
    var textoTooltip = document.querySelector('.email-wrapper .tooltiptext');
    var emailWrapper = document.querySelector('.email-wrapper');
    textoTooltip.innerHTML = "Copiar correo";
    textoTooltip.classList.remove("flip-element");
    emailWrapper.classList.remove("minimize-and-expand");
    emailWrapper.style = "opacity: 1";
});

document.querySelector('.email-button').addEventListener("click", () => {
    var textArea = document.createElement("textarea");
    var textoTooltip = document.querySelector('.email-wrapper .tooltiptext');
    var emailWrapper = document.querySelector('.email-wrapper');

    textArea.value = "ylrodriguez024@gmail.com";
    textArea.style = "font-size: 1px; display: block; width: 10px; height: 5px;"
    emailWrapper.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    emailWrapper.removeChild(textArea);

    textoTooltip.innerHTML = "Copiado";
    emailWrapper.classList.remove("slide-to-bottom");
    textoTooltip.classList.add("flip-element");
    emailWrapper.classList.add("minimize-and-expand");
});

document.querySelector('#link-git').addEventListener("click", () => {
    var url = "https://github.com/ylrtests";
    window.open(url, "_blank ");
});

document.querySelector('#link-linkedin').addEventListener("click", () => {
    var url = "https://www.linkedin.com/in/yojhan-leonardo-rodriguez-877680186/";
    window.open(url, "_blank ");
});

document.querySelector('#link-mail').addEventListener("click", () => {
    window.location.href = 'mailto:ylrodriguez024@gmail.com';
});


window.onscroll = (e) => {
    WRAPLINKELEMENT.classList.remove("visible");
    var yOffSet = window.pageYOffset;

    addOrRemoveFixedNav(yOffSet, HOMESECTION.offsetHeight);

    changeActiveLinkInNav(yOffSet);

    if (!aboutMeTitleAnimated) {
        if ((BUTTONSEEMORE.offsetTop + BUTTONSEEMORE.offsetHeight) <= yOffSet) {
            animateTitleOfASection("#about-me", "left");
            aboutMeTitleAnimated = true;
        }
    }
    if (!aboutMeHexagonAnimated) {
        if ((BUTTONSEEMORE.offsetTop + BUTTONSEEMORE.offsetHeight + 100) <= yOffSet) {
            animateAboutMeElementHexagon();
            var animateElementDiamondList = document.querySelectorAll(".diamond-list .element");
            var delayTime = 1;

            animateElementDiamondList.forEach((element) => {
                element.children[0].classList.add("flip-element");
                element.children[0].style = "animation-delay: " + delayTime + "s"
                delayTime += 0.5;
            })

            animateElementDiamondList.forEach((element) => {
                element.children[1].style = "animation-delay: " + delayTime + "s"
                element.children[1].classList.add("slide-to-bottom");
                delayTime += 0.5;
            })

            aboutMeHexagonAnimated = true;
        }
    }
    // if (!projectsTitleAnimated) {
    //     //Se añade un margen de 400 para que inicie la animación antes de llegar a la sección
    //     var condition = (PROJECTSSECTION.offsetTop - 400);
    //     if ((condition - 200) <= yOffSet) {
    //         var buttonCV = document.querySelector('#cv');
    //         buttonCV.style = "animation-delay: 0.5s; animation-timing-function: ease-in-out;";
    //         buttonCV.classList.add("slide-to-left");
    //     }

    //     if (condition <= yOffSet) {
    //         animateTitleOfASection("#projects", "right");
    //         projectsTitleAnimated = true;
    //     }
    // }
    if (!contactTitleAnimated) {
        //Se añade un margen de 400 para que inicie la animación antes de llegar a la sección
        // var condition = (CONTACTSSECTION.offsetTop - 300);
        var condition = (CONTACTSSECTION.offsetTop - 400);
        //El siguiente if es usado porque no está la sección project. Cuando se ponga se quitará
        if ((condition - 200) <= yOffSet) {
            var buttonCV = document.querySelector('#cv');
            buttonCV.style = "animation-delay: 0.5s; animation-timing-function: ease-in-out;";
            buttonCV.classList.add("slide-to-left");
        }
        if (condition <= yOffSet) {
            animateTitleOfASection("#contact", "left");

            var paragraphContact = document.querySelector("#text-goodbye");
            paragraphContact.classList.add("slide-to-right");

            var emailWrapper = document.querySelector(".email-wrapper");
            emailWrapper.classList.add("slide-to-bottom");

            var squareAll = document.querySelectorAll(".square.link");
            var delayTime = 1;

            squareAll.forEach((element) => {
                element.classList.add("flip-element");
                element.style = "animation-delay: " + delayTime + "s";
                delayTime += 0.5;
            })


            contactTitleAnimated = true;
        }
    }
}