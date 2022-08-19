// window start game
let startbtn = document.querySelector(".control-start #start");
startbtn.onclick = function () {
    console.log("hey!");
    let username = prompt("What is your name: ");
    username = username ? username : "unknown";
    document.querySelector("#username").textContent = username;

    this.parentElement.remove();
};


//* count init tries
const maxTries = 40;
let tries = 0;
let tryBox = document.querySelector("#tries");
tryBox.textContent = tries;
function countTry() {
    // if(tries !== maxTries) {
    //     tries++;
    //     tryBox.textContent = tries;
    // }else {
    //     endGAME();
    // }
    tries++;
    tryBox.textContent = tries;
}


//* maximum cards to match
let MatchingCards = [];


// set face image
const faceImg = document.createElement("img");
faceImg.setAttribute(
    "src",
    "images/question-mark-icon-glow-dark-3d-illustration_103740-348.jpg"
);

// set back image
function matchImg(type_js) {
    let image = document.createElement("img");
    switch (type_js) {
        case "js":
            image.setAttribute("src", "images/js.jpg");
            return image;
        case "angular":
            image.setAttribute("src", "images/angularjs.jpg");
            return image;
        case "ember":
            image.setAttribute("src", "images/emberjs.jpg");
            return image;
        case "vue":
            image.setAttribute("src", "images/vuejs.png");
            return image;
        case "react":
            image.setAttribute("src", "images/reactjs.png");
            return image;
        case "pug":
            image.setAttribute("src", "images/pugjs.png");
            return image;
        case "meter":
            image.setAttribute("src", "images/meteorjs.png");
            return image;
        case "mithril":
            image.setAttribute("src", "images/mithriljs.png");
            return image;
        case "node":
            image.setAttribute("src", "images/nodejs.png");
            return image;
    }
}

// get container block game
let containerGAME = document.querySelector(".container-block-cards");

// get all block games
let blocks = document.querySelectorAll(".container-block-cards .block-card");


// get range for random order blocks [new syntax maybe(Learn)]
let rangeBlocks = [...Array(blocks.length).keys()];
// Test
console.log(rangeBlocks)
shuffle(rangeBlocks);
console.log(rangeBlocks)


// place images within blocks
blocks.forEach((block, index, arr) => {
    // front img
    let cloneimg = faceImg.cloneNode(true);
    block.querySelector(".front").appendChild(cloneimg);

    // back img
    let jsImg = matchImg(block.getAttribute("data-framew")).cloneNode(true);
    block.querySelector(".back").appendChild(jsImg)

    //order block
    block.style.order = rangeBlocks[index];
});

// start add functionality
blocks.forEach((block) => {
    block.addEventListener("click", flip);
});


function flip() {
    this.classList.add("active");
    this.classList.add("stop-click");

    matching(this);
    if(MatchingCards.length === 2) {
        // I want understand how to excute these statments
        // how to manage this
        stopClicking();

        // setTimeout(function() {
        //     isCorrect();
        // }, 1000)
        isCorrect();


        setTimeout(()=> {
            reset();
        }, 1000)
    }
}
function stopClicking() {
    containerGAME.classList.add("stop-click")

    setTimeout(()=> { // how this excute after function "reset" above??!
        containerGAME.classList.remove("stop-click")
    }, 1000)
}

function isCorrect() {
    let role1 = MatchingCards[0].getAttribute("data-framew");
    let role2 = MatchingCards[1].getAttribute("data-framew");

    if( role1 === role2 ) {
        console.log("You Win!")
        MatchingCards[0].classList.add("has-match")
        MatchingCards[1].classList.add("has-match")
        document.querySelector("#success").play();
    }else {
        MatchingCards[0].classList.remove("stop-click")
        MatchingCards[1].classList.remove("stop-click")
        document.querySelector("#fail").play();
        console.log("You Lose!")
        countTry();
    }
}

// added thing "except_role", just delete it to undo
function reset() {
    removeAllActive();
    counterFlipped = 0;
    MatchingCards.length = 0;
}

function removeAllActive() {
    blocks.forEach((block) => block.classList.remove("active"));
}


function matching(that) {
    // 1#

    // 2#
    // matchArr =  blocks.filter((block)=> {
    //     block.classList.contains("active")
    // })

    // 3#
    MatchingCards.push(that)
}

function shuffle(array) {

    // current variable refer to from last element
    let current = blocks.length,
        temp, // used in swapping
        random;
    while(current > 0) {
        // generate random variable
        random = Math.floor(Math.random() * current)
        
        // decrease current
        current--;

        //swap algorithm
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
        // with last step, no redundant values in array
    }
    return array;
}
// current array [1,2,3,4,5,6,7,8,9,0]
// new array [1,2,3,4,5,6,7,8,9,0]


function endGAME() {
    let isStart = window.confirm("Do You Want Again ? ");
    if(isStart) {
        window.location.reload();
    }else {
        alert("Game Over");
    }
}