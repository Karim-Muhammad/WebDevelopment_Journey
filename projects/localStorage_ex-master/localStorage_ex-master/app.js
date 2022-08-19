let input = document.getElementById("inputKey");
let inputValue = document.getElementById("inputValue");
let control_spans = document.querySelectorAll(".control-content > span");
let resultDiv = document.querySelector(".result-content .result");
let popup_msg = document.querySelector(".popup-msg");
let popup_msg_btn = document.querySelector(".popup-msg button"); 
popup_msg.addEventListener("keypress", function(e){
    if(e.key === "Enter") {
        console.log("enter")
        this.style.cssText = " display: none ";
    }
})
popup_msg_btn.addEventListener("click", function(){
    console.log("click")
    this.parentNode.parentNode.style.cssText = " display: none ";
})
control_spans.forEach((span)=> {
    if(span.classList.contains("add")) {
        span.addEventListener("click", add);
    }else if (span.classList.contains("delete")) {
        span.addEventListener("click", delete_item);
    } else if(span.classList.contains("check")) {
        span.addEventListener("click", check);
    }else if(span.classList.contains("show")) {
        span.addEventListener("click", show);
    }
})

function add() {
    if(isEmpty()){
        pop();
    }else {
        resultDiv.innerHTML = `the item <span> ${input.value} </span> is added`
        localStorage.setItem(input.value, inputValue.value)
    }
}

function delete_item() {
    if(isEmpty()){
        pop();
    }else if(localStorage.getItem(input.value)) {
        resultDiv.innerHTML = `the item <span> ${input.value} </span> is removed!`
        localStorage.removeItem(input.value)
    }else {
        pop("item not found to remove it");
    }
}

function check() {
    if(isEmpty()) {
        pop();
    }else {
        if(localStorage.getItem(input.value)) {
            resultDiv.innerHTML = `the found item is <span> ${input.value}=> ${localStorage.getItem(input.value)} </span>`
        }else {
            resultDiv.innerHTML = `No item is called <span> ${input.value} </span>`
        }
    }

}

function show() {
    if(localStorage.length) {
        let content = '';
        resultDiv.innerHTML = ` There are ${localStorage.length} in local storage`
        // for (let el in localStorage) {
        //     let span = `<span> ${el}=> ${localStorage[el]} </span>`
        //     content += span;
        // }
        for(let [key, value] of Object.entries(localStorage)) {
            let span = `<br/> <span> ${key}=> ${value} </span>`
            content += span;
        }
        resultDiv.innerHTML += content;
    }else {
        resultDiv.innerHTML = ` There are not any element in local storage`
    }
}

function isEmpty() {
    let isEmpty = input.value === ''? true : false;
    return isEmpty;
}

function pop(text) {
    popup_msg.querySelector(".msg-content").childNodes[0].textContent = text;
    popup_msg.style.cssText = "display: block; animation-play-state: running";
    popup_msg_btn.focus();
}

/**

control_spans.forEach((span)=> {
    // let classListSpan = span.classList;
    // console.log(classListSpan)
    // switch(classListSpan) {
    //     case classListSpan.contains("add"):
    //         console.log("I'm add");
    //         break;
    //     case classListSpan.contains("delete"):
    //         console.log("I'm delete");
    //         break;
    //     case classListSpan.contains("check"):
    //         console.log("I'm check");
    //         break;
    //     case classListSpan.contains("show"):
    //         console.log("I'm show");
    //         break;
    // }
    if()
})

*/