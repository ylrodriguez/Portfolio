
const HOMESECTION = document.querySelector('#home');
const BUTTONSEEMORE = document.querySelector('#see-more');
const NAVELEMENT = document.getElementsByTagName("nav")[0];
const WRAPLINKELEMENT = document.getElementsByClassName("wrap-link")[0];
const NAVLINKS = document.querySelectorAll("nav .link");

const ABOUTMESECTION = document.querySelector('#about-me');
const PROGRESSLIST = document.querySelector('.progress-list');
const DIAMONDLIST = document.querySelector(".diamond-list");

// const PROJECTSSECTION = document.querySelector('#projects');

const CONTACTSSECTION = document.querySelector('#contact');

const MYURL = "https://ylrodriguez.github.io/Portfolio/";


var navElementHasFixedClass = false;
var aboutMeTitleAnimated = false;
var aboutMeHexagonAnimated = false;
var aboutMeDiamondListAnimated = false;
// var projectsTitleAnimated = false;
var aboutMeCvButtonAnimated = false;
var contactTitleAnimated = false;
var contactSocialNetworksAnimated = false;

var isMobile = false;
var skills = [];
var currentLanguage = "es";
var englishJson;
var spanishJson;


$('document').ready(function () {
    //Check if user's using phone.
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }

    //Get english object array
    $.getJSON('data/lang/en.json', (json) => {
        englishJson = json;
        //Get spanish object array
        $.getJSON('data/lang/es.json', (json) => {
            spanishJson = json;
            //Simulate api call to get data.
            getSkills()
                .then(() => {
                    loadWaypoints();
                })
                .catch(() => {
                    console.log("Error Loading.");
                    loadWaypoints();
                })
        });
    });

    addEventListeners();
});


function addEventListeners() {
    // Listener Media Query
    var media = window.matchMedia("(max-width: 599px)");
    checkMediaQueryForSmallDevices(media);
    media.addListener(checkMediaQueryForSmallDevices);

    //Listener to links located on the nav
    for (let link of NAVLINKS) {
        link.addEventListener("click", () => {
            let attr = link.getAttribute("go");
            let section = document.getElementById(attr);

            WRAPLINKELEMENT.classList.remove("visible");
            document.querySelector(".overlay").classList.remove("open");
            section.scrollIntoView({
                behavior: "smooth"
            });
            section.focus();
        })
    }

    //Listener Language Settings
    document.getElementById("span-en").addEventListener("click", () => {
        currentLanguage = "en";
        document.getElementById("span-en").classList.add("active");
        document.getElementById("span-es").classList.remove("active");
        translateWebPage(englishJson);
    })
    document.getElementById("span-es").addEventListener("click", () => {
        currentLanguage = "es";
        document.getElementById("span-es").classList.add("active");
        document.getElementById("span-en").classList.remove("active");
        translateWebPage(spanishJson);
    })

    //Listener to hamburguer element
    document.getElementsByClassName("fa-bars")[0].addEventListener("click", () => {
        document.getElementsByClassName("wrap-link")[0].classList.toggle("visible");
        document.querySelector(".overlay").classList.toggle("open");
    });

    //Listener button see more
    BUTTONSEEMORE.addEventListener("click", () => {
        ABOUTMESECTION.scrollIntoView({
            behavior: "smooth"
        });
        ABOUTMESECTION.focus();
    })

    //Listener up button
    document.querySelector('#up-button').addEventListener("click", () => {
        HOMESECTION.scrollIntoView({
            behavior: "smooth"
        });
        HOMESECTION.focus();
    })

    //Listener overlay
    document.querySelector(".overlay").addEventListener("click", () => {
        document.querySelector(".overlay").classList.remove("open");
        WRAPLINKELEMENT.classList.remove("visible");
    })
}

function checkMediaQueryForSmallDevices(media) {
    if (media.matches) { // If media query matches
        NAVELEMENT.classList.add("fixed");
        isMobile = true;
        navElementHasFixedClass = true;
    }
    else {
        NAVELEMENT.classList.remove("fixed");
        isMobile = false;
        navElementHasFixedClass = false;
    }
}

function getSkills() {
    return fetch(MYURL + "data/skills.json")
        // return fetch("data/skills.json")
        .then(res => res.json())
        .then(data => {
            skills = data.skills;
            printSkills();
        })
        .catch(() => {
            console.log("Error retrieving skills.json");
            console.log(MYURL + "data/skills.json");
        })
}

function printSkills() {
    for (let skillItem of skills) {

        let progressBg = document.createElement("div");
        let progressBar = document.createElement("div");
        let progressTag = document.createElement("div");
        let progressPercentage = document.createElement("div");

        progressBg.classList.add("progress-bg");
        progressBar.classList.add("progress-bar", "flex");
        progressPercentage.classList.add("progress-percentage");
        progressTag.classList.add("progress-tag", "flex");

        if ('lg-key' in skillItem) {
            progressTag.setAttribute("lg-key", skillItem["lg-key"]);

            progressTag.innerHTML = currentLanguage === "es"
                ? spanishJson[skillItem["lg-key"]]
                : englishJson[skillItem["lg-key"]];

        } else {
            progressTag.innerHTML = skillItem.skillName;
        }

        progressBar.appendChild(progressTag);
        progressBar.appendChild(progressPercentage);
        progressBg.appendChild(progressBar);
        PROGRESSLIST.appendChild(progressBg);
    }
}

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
    titleBar.style = "animation-delay: 0.5s";
    titleBar.classList.add("slide-to-" + direction);
}

function animateAboutMeElementHexagon() {
    var elementHexagon = document.querySelector("#about-me .element.hex");
    elementHexagon.classList.add("show");
}

function animateAboutMeProgressList() {
    PROGRESSLIST.style = "animation-delay: 1s;"
    PROGRESSLIST.classList.add("slide-to-left");

    let progressBars = document.querySelectorAll('.progress-bar');
    let progressPercentages = document.querySelectorAll('.progress-percentage');
    var timeDelay = 0.7;
    var i = 0;

    for (let item of progressBars) {
        item.classList.add("fill-width");
        item.style = `
            width: ${skills[i].progress}%; 
            animation-delay: ${timeDelay}s;`
        timeDelay += 0.7;
        i++;
    }

    i = 0;
    timeDelay = 600; // animateValueProgress requires values in ms

    for (let item of progressPercentages) {
        let start = 0;
        let end = skills[i].progress;
        let duration = 4500; // animateValueProgress requires values in ms

        animateValueProgress(item, start, end, duration, timeDelay)
        timeDelay += 700;
        i++;
    }


}

function animateAboutMeDiamondList() {
    var animateElementDiamondList = document.querySelectorAll(".diamond-list .element");
    var delayTime = 0.5;

    animateElementDiamondList.forEach((element) => {
        element.children[0].classList.add("flip-element");
        element.children[0].style = "animation-delay: " + delayTime + "s";
        element.children[0].style = "animation-duration: 5s";
        delayTime += 0.2;
    })

    animateElementDiamondList.forEach((element) => {
        element.children[1].style = "animation-delay: " + delayTime + "s";
        element.children[1].classList.add("slide-to-bottom");
        delayTime += 0.2;
    })
}

function animateContactBeggining() {
    var paragraphContact = document.querySelector("#text-goodbye");
    paragraphContact.classList.add("slide-to-left");

    var emailWrapper = document.querySelector(".email-wrapper");
    emailWrapper.classList.add("slide-to-bottom");
}

function changeActiveLinkInNav(yOffSet) {
    // #Home
    if (yOffSet > HOMESECTION.offsetTop) {
        removeAllActive();
        NAVLINKS[0].classList.add("active");
    }
    // #About Me
    if (yOffSet > ABOUTMESECTION.offsetTop) {
        removeAllActive();
        NAVLINKS[1].classList.add("active");
    }
    // #Contact
    if (yOffSet > CONTACTSSECTION.offsetTop || (window.innerHeight + yOffSet - 100) === document.body.clientHeight) {
        removeAllActive();
        NAVLINKS[2].classList.add("active");
    }
}

function removeAllActive() {
    NAVLINKS.forEach((element) => {
        element.classList.remove("active");
    })
}

document.querySelector('#cv').addEventListener("click", () => {
    var tempurl = "https://1drv.ms/b/s!AlaKRn08I0M_gvgnoeXaLTesRnOzKQ?e=Dh5LhX";
    window.open(tempurl, "_blank ");
});

document.querySelector('.email-button').addEventListener("mouseover", () => {
    var textoTooltip = document.querySelector('.email-wrapper .tooltiptext');
    var emailWrapper = document.querySelector('.email-wrapper');
    textoTooltip.innerHTML = currentLanguage === "es" ? spanishJson["tooltip-copy"] : englishJson["tooltip-copy"];
    textoTooltip.classList.remove("flip-element");
    emailWrapper.classList.remove("minimize-and-expand");
    emailWrapper.style = "opacity: 1";
});

document.querySelector('.email-button').addEventListener("click", () => {
    var textArea = document.createElement("textarea");
    var textoTooltip = document.querySelector('.email-wrapper .tooltiptext');
    var emailWrapper = document.querySelector('.email-wrapper');

    textArea.value = "ylrodriguez024@gmail.com";
    textArea.style = "font-size: 1px; display: block; width: 10px; height: 5px;";
    emailWrapper.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    emailWrapper.removeChild(textArea);

    textoTooltip.innerHTML = currentLanguage === "es" ? spanishJson["tooltip-copied"] : englishJson["tooltip-copied"];
    emailWrapper.classList.remove("slide-to-bottom");
    textoTooltip.classList.add("flip-element");
    emailWrapper.classList.add("minimize-and-expand");
});

document.querySelector('#link-git').addEventListener("click", () => {
    var tempurl = "https://github.com/ylrtests";
    window.open(tempurl, "_blank ");
});

document.querySelector('#link-linkedin').addEventListener("click", () => {
    var tempurl = "https://www.linkedin.com/in/yojhan-leonardo-rodriguez-877680186/";
    window.open(tempurl, "_blank ");
});

document.querySelector('#link-mail').addEventListener("click", () => {
    window.location.href = 'mailto:ylrodriguez024@gmail.com';
});

window.onscroll = (e) => {
    var yOffSet = window.pageYOffset;

    if (!isMobile) {
        addOrRemoveFixedNav(Math.ceil(yOffSet), HOMESECTION.offsetHeight);
    }

    changeActiveLinkInNav((yOffSet + 100));

}

function loadWaypoints() {

    /**
     * Animations
     */

    let waypointAboutMeTitle = new Waypoint({
        element: BUTTONSEEMORE,
        handler: function (direction) {
            if (direction === "down" && !aboutMeTitleAnimated) {
                animateTitleOfASection("#about-me", "right");
                aboutMeTitleAnimated = true;
            }
        }
    });

    let waypointAboutMeHexagon = new Waypoint({
        element: BUTTONSEEMORE,
        handler: function (direction) {
            if (direction === "down" && !aboutMeHexagonAnimated) {
                animateAboutMeElementHexagon();
                animateAboutMeProgressList();
                aboutMeHexagonAnimated = true;
            }
        },
        offset: -200
    });

    let waypointAboutMeDiamondList = new Waypoint({
        element: DIAMONDLIST,
        handler: function (direction) {
            if (direction === "down" && !aboutMeDiamondListAnimated) {
                animateAboutMeDiamondList();
                aboutMeDiamondListAnimated = true;
            }
        },
        offset: "80%"
    });

    let waypointAboutMeCvButton = new Waypoint({
        element: document.querySelector('#cv'),
        handler: function (direction) {
            if (direction === "down" && !aboutMeCvButtonAnimated) {

                var buttonCV = document.querySelector('#cv');
                buttonCV.style = "animation-delay: 0.5s; animation-timing-function: ease-in-out;";
                buttonCV.classList.add("slide-to-left");
                aboutMeCvButtonAnimated = true;
            }
        },
        offset: "80%"
    });

    let waypointContactTitle = new Waypoint({
        element: CONTACTSSECTION,
        handler: function (direction) {
            if (direction === "down" && !contactTitleAnimated) {
                animateTitleOfASection("#contact", "right");
                animateContactBeggining();
                contactTitleAnimated = true;
            }
        },
        offset: "60%"
    });

    let waypointContactSocialNetworks = new Waypoint({
        element: document.getElementById("link-wrapper"),
        handler: function (direction) {
            if (direction === "down" && !contactSocialNetworksAnimated) {

                //En caso de que el viewport no tenga más scroll y no se haya animado anteriormente.
                if (!contactTitleAnimated) {
                    animateTitleOfASection("#contact", "right");
                    animateContactBeggining();
                    contactTitleAnimated = true;
                }

                var squareAll = document.querySelectorAll(".square.link");
                var delayTime = 0;

                squareAll.forEach((element) => {
                    element.classList.add("flip-element");
                    element.style = "animation-delay: " + delayTime + "s";
                    delayTime += 0.5;
                })
                contactSocialNetworksAnimated = true;
            }
        },
        offset: "bottom-in-view"
    });
}

function animateValueProgress(item, start, end, duration, delay) {
    var range = end - start;
    var current = start;
    var increment = end > start ? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    
    setTimeout( ()=> { 
        var timer = setInterval( () => {
            current += increment;
            item.innerHTML = current+'%';
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }, delay);
}
