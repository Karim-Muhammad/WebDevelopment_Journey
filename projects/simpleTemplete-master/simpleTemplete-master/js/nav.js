let links_bar = document.querySelector(".icon");
let links_list = document.querySelector(".links-list");
let links = document.querySelector(".links");
links.addEventListener("click", ()=> {
    links_list.classList.toggle("active");
    links_bar.classList.toggle("active");
/*
    if(links_list.classList.contains("active")) {
        links_bar.style.cssText="transform: scale(0.8);";
    }else {
        links_bar.style.cssText="transform: scale(1);";
    }
*/
})