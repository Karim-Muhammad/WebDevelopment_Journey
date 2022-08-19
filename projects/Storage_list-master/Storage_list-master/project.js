/** Done With Some Bad Archtecture for ID each Element */

//form
let iform = document.querySelector("form");
iform.addEventListener("click", (e)=> {
    e.preventDefault();
});

// input text
let itext = document.querySelector("form input#textnote");

let btn_submit = document.querySelector("[type='submit']");

let tasks = document.querySelector(".tasks");
// let count = 0; //! take care\
let current = tasks.children.length;

if (localStorage.length !== 0) {
    console.log(Object.keys(localStorage));
    let initArray = Object.keys(localStorage).map((k) => +k);
    let sortedInitArray = initArray.sort((a, b) => a - b);
    current = [...sortedInitArray].reverse()[0];
    console.log(current);
    for (let init = 0; init < sortedInitArray.length; init++) {
        let c = sortedInitArray[init];
        let note = JSON.parse(localStorage.getItem(c));
        let txt = note.title;
        UIElement(txt, note);
    }
    current -= sortedInitArray.length - 1;
}
// console.log(count);
function addE() {
    if (itext.value !== "") {
        // store data in localStorage
        let note = data(itext.value);
        console.log(note);
        console.log(`Get Note : ${note}`);
        // create Element
        UIElement(itext.value, note);
    } else {
        errMsg("Input Is Empty!");
    }
}
btn_submit.addEventListener("click", function (e) {
    e.preventDefault();
});
btn_submit.addEventListener("click", addE);

function UIElement(text, note) {
    // create element
    let task = document.createElement("div");
    task.setAttribute("class", "task");

    // create text
    let txtNode = document.createTextNode(text);

    // add text to task
    task.appendChild(txtNode);

    // add delete span to task
    task.appendChild(UIControl(note));

    // append task to "tasks div"
    tasks.appendChild(task);

    itext.value = "";
}

function UIControl(note) {
    // id
    // id = current;
    id = note["_ID"];
    let delSpan = document.createElement("span");
    delSpan.innerHTML = "delete";
    delSpan.classList.add("delete");
    console.log(`Current: ${id}`);
    console.log(note);
    delSpan.addEventListener("click", function () {
        this.parentElement.remove();
        let id = note["_ID"];
        localStorage.removeItem(id);
    });

    current++;
    return delSpan;
}

function data(text) {
    let _ID = current;
    console.log(`ID: ${_ID}`);
    let symbol = Symbol();
    let object_task = { id: symbol, _ID };
    object_task.title = text;
    localStorage.setItem(`${_ID}`, JSON.stringify(object_task));
    console.log(object_task);
    return object_task;
}

function collection() {}

function errMsg(text) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: text,
        footer: '<a href="">Why do I have this issue?</a>',
    });
}

function del() {
    console.log(`Current Remove: ${id}`);
    localStorage.removeItem(`${id}`);
    this.parentElement.remove();
}
