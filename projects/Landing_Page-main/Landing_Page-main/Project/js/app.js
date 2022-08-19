/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global letiables
*/
let sections      = document.querySelectorAll("section");
let nav           = document.querySelector(".navbar__menu");
let uListSections = document.querySelector("#navbar__list");
let navLiSections = null;
let newSectionBtn = document.querySelector("#newSection"); // button for add new Sections
let fragment      = document.createDocumentFragment();
let numSection    = sections.length;
/*
 * End Global letiables
 * Start Helper Functions
*/
// event click div to reach us top of page
document.querySelector(".toUp").addEventListener("click", (event) => {
    window.scrollTo({
        top:0,
        left: 0,
        behavior: "smooth", // Smooth Here
    })
}) 
// function helper setMultipleAttrs
function setMultipleAttrs(ele, attrs) {
    for(key in attrs) {
        ele.setAttribute(key, attrs[key]);
    }
}
// function to create all links which depend on actuall Sections
function iterateAllSections(sections) {
    for(let section of sections) {
        navLiSections = document.createElement("li");
        navLiSections.style.cssText = "margin-left: 40px;";
        // navLiSections.classList.add("menu-link");
        navLiSections.innerHTML = section.getAttribute("data-nav");
        addScrollIntoView(section, navLiSections);
        // addScrollTo(section, navLiSections); //needed some maintaince...
        fragment.appendChild(navLiSections);
    }
    uListSections.appendChild(fragment);
    nav.appendChild(uListSections);
    document.body.insertAdjacentElement("afterbegin", nav);
}
//add Event Add Section on button.
newSectionBtn.addEventListener("click", function() {
    console.log("Created");
    let frag = document.createDocumentFragment();
    let newDiv = document.createElement("div");
    let new_section = document.createElement("section");
    //add Content of new Section
    newDiv.innerHTML = `
        <h2>Section ${++numSection}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

        <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
    `;
    newDiv.setAttribute("class", "landing__container");
    // Set multiple Attributes to new Sections by helper Function
    setMultipleAttrs(new_section, {"id": `section${numSection}`, "nav-data": `section ${numSection}`, "class" : `section${numSection},`})
    frag.appendChild(newDiv);
    new_section.appendChild(frag);
    document.querySelector("main").insertAdjacentElement("beforeend", new_section);
    // make nav list Item for new Section
    navLiSections = document.createElement("li");
    navLiSections.style.cssText = "margin-left: 40px; font-family: arial";
    navLiSections.innerHTML = `Section ${numSection}`; /*new_section.getAttribute("data-nav") can't work...*/
    addScrollIntoView(new_section, navLiSections);
    fragment.appendChild(navLiSections);
    uListSections.appendChild(fragment);
    // add Event active to New section, Li
    eventScrollforNew(new_section, navLiSections);
    nav.appendChild(uListSections);
})
/*
 * End Helper Functions
 * Begin Main Functions
*/
{
    iterateAllSections(sections);
    eventScroll(sections);
}
// build the nav [done!]
uListSections.style.cssText = "display: flex;list-style-type: none; direction: rtl;";
nav.style.cssText = "position: fixed; top: 0px; right: 0px; width: 100%; background-color: white; color: black; padding: 10px; font-size: 30px; z-index:1000";
// Add class 'active' to section when near top of viewport
// add active for both li, section
function eventScroll(sections) {
    window.addEventListener("scroll", () => {
        sections.forEach( (ele, indx, navLinks) => {
            const topDistance = ele.getBoundingClientRect().top;
            ele.classList.remove("your-active-class");
            navLinks = document.getElementsByTagName("li");
            if (
                (topDistance > 0 && topDistance < 100) ||
                ele.offsetTop <= window.scrollY &&
                ele.offsetTop + ele.offsetHeight > window.scrollY
            ) {
                ele.classList.add("your-active-class");
                navLinks[indx].classList.add("active-item");
            }else {
                ele.classList.remove("your-active-class");
                navLinks[indx].classList.remove("active-item");
            }
        })
        // for display scroll To Up
        if(window.scrollY >= 700) {
            document.querySelector("div.toUp").style.display = "block";
        }else {
            document.querySelector("div.toUp").style.display = "none";
        }
    })
};
function eventScrollforNew(section, link) {
    window.addEventListener("scroll", () => {
        const topDistance = section.getBoundingClientRect().top;
        section.classList.remove("your-active-class");
        if (
            (topDistance > 0 && topDistance < 100) ||
            section.offsetTop <= window.scrollY &&
            section.offsetTop + section.offsetHeight > window.scrollY
        ) {
            section.classList.add("your-active-class");
            link.classList.add("active-item");
        }else {
            section.classList.remove("your-active-class");
            link.classList.remove("active-item");
        }
    })
};
/*Scroll to anchor ID using scrollTO event [done!]*/
// 1- function addScrollTo need some maintaince
function addScrollTo(section, litem) {
    litem.addEventListener("click", function() {
        window.scrollTo({
            top: section.getBoundingClientRect().bottom,
            left:section.getBoundingClientRect().left,
            behavior: `smooth`,
        })
    })
}
// 1# function addScrollIntoView is work!
function addScrollIntoView(section, litem) {
    litem.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        section.scrollIntoView({
            behavior: "smooth", // Smooth here! but doesn't work.
            block: 'start',
            inline: 'start',
        });
    });
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu [done!]
let labelMenu = document.createElement("label");
labelMenu.setAttribute("id", "menu");
labelMenu.innerHTML = `<i class='far fa-arrow-alt-circle-down'></i>`
labelMenu.style.cssText = "position: fixed; right: 10px; top: 10px; color: black; font-size: 30px; float: right; cursor: pointer";
nav.appendChild(labelMenu);
document.getElementById("menu").addEventListener("click", () => {
    document.querySelector("ul").classList.toggle("show");
})
// Scroll to section on link click [done!] scrollIntoView

// Set sections as active [done!]