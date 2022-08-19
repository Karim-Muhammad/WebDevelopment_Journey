// Select the Elements
const slider_number = document.querySelector("#slider-number");
let images = document.querySelectorAll(".slider-container img");
let length_of_images = images.length;
// control elements
const left = document.querySelector(".slider-control .left")
const right = document.querySelector(".slider-control .right")
const indicators = document.querySelector(".slider-control .indicators")

// current slide will be shown
let current_slide = 1;

// Create indicators_list
let indicators_list = document.createElement("ul");
indicators_list.setAttribute("class", "indicators_list")

// Create li depend on length of images
for(let i = 1; i <= length_of_images; i++) {
    // create li
    const litem = document.createElement("li")
    litem.setAttribute("data-slide", i);

    // content of li
    litem.appendChild(document.createTextNode(i))

    // add event
    litem.onclick = function() {
        current_slide = Number(litem.getAttribute("data-slide"));
        showWhen();
    }
    // litem.addEventListener("click", showWhen)

    // append to parent (indicators_list)
    indicators_list.appendChild(litem)
}
indicators.appendChild(indicators_list)

showWhen();
// Functions
function showWhen() {
    removebefore();
    check();
    // show slide dpend on current_slide variable
    images[current_slide - 1].classList.add("active")
    // slide_number shows
    slider_number.textContent = "Slide #" + current_slide;
    // li active
    indicators_list.children[current_slide - 1].classList.add("active")
}
function removebefore() {
    images.forEach((img)=> img.classList.remove("active"))
    Array.from(indicators_list.children).forEach((img)=> img.classList.remove("active"))
}
function check() {
    checkLeft()
    checkRight()
}
function checkLeft() {
    if(current_slide === 1) {
        left.classList.add("disabled")
    }else {
        left.classList.remove("disabled")
    }
}
function checkRight() {
    if(current_slide === images.length) {
        right.classList.add("disabled")
    }else {
        right.classList.remove("disabled")
    }
}

function next() {
    if(current_slide === images.length) {
        return false
    }else {
        current_slide++;
        showWhen();
    }
}
function prev() {
    if(current_slide === 1) {
        return false;
    }else {
        current_slide--;
        showWhen();
    }
}
left.addEventListener("click", prev)
right.addEventListener("click", next)