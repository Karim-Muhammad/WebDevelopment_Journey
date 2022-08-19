let navbar = document.querySelector("#title .land");
let scrollUP = document.querySelector(".scrollUP");
scrollUP.addEventListener("click", () => {
    window.scrollTo(null, 0);
});
window.addEventListener("scroll", (e) => {
    if (navbar.getBoundingClientRect().bottom <= 0) {
        scrollUP.classList.add("active");
    } else {
        scrollUP.classList.remove("active");
    }
});
