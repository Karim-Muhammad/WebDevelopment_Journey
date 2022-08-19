/** tasks structure
    <span class="task">
        task1
        <span class="delete">delete</span>
    </span>
    <span class="task">
        task2
        <span class="delete">delete</span>
    </span>
*/

//** Let get started */
let input = document.querySelector(".tasks-add input");
let add = document.querySelector(".tasks-add .plus");
let content_tasks = document.querySelector(".tasks-content");
let no_task_msg = document.querySelector(".tasks-content .no-tasks");
let tasks_counter = document.querySelector(".tasks-stats .tasks-counter span")
let tasks_completed = document.querySelector(".tasks-stats .tasks-completed span")

// all tasks here
const tasks = [];
// const tasksEL = []
// functions
// Focus on input when page is loaded
window.onload = function() {
    input.focus();
}
// function check first
function isFull() {
    let isFull = input.value!== ''? true : false;
    return isFull;
}
// add task
function add_task() {
    if(isFull()) { // if i typed like this isFull without ()?
        if(duplicate()) {
            alertDuplicate();
        }else {
            tasks.push(input.value)
            UITask(input.value);
            tasks_counter.textContent = tasks.length;
            no_task_msg.remove();
        }
    }else {
        alertNoTaskMsg();
    }
    input.value = "";
    input.focus();
}
function UITask(text) {
    let task = document.createElement("span");
    task.setAttribute("class", "task");
    task.appendChild(document.createTextNode(text));
    task.appendChild(UIControl());
    stats_tasks();
    task.addEventListener("click", function(ev) {
        ev.target.classList.toggle("done");
        stats_tasks();
    })
    content_tasks.appendChild(task);
}
// parent param i add it yiu can delete and use another solution
function UIControl() {
    let delbtn = document.createElement("span")
    delbtn.setAttribute("class", "delete");
    delbtn.textContent = "delete";
    // delbtn.addEventListener("click", remove_task)
    delbtn.onclick = remove_task;
    return delbtn;
}
function duplicate() {
    if( tasks.includes(input.value) ) {
        return true;
    }else {
        return false;
    }
}
add.addEventListener("click", add_task)

// delete functions
function remove_task() {
    let task = this.parentElement;
    task.remove();
    // console.log(task)
    let textTask = task.childNodes[0].wholeText
    // let textTask = task.childNodes[0].data
    // console.log(textTask)
    const findThis = (el)=> el === textTask
    // console.log(tasks)
    let indexTask = tasks.findIndex(findThis);
    // console.log(indexTask)
    tasks.splice(indexTask, 1)
    // content_tasks.children.childElementCount === 0
    if(content_tasks.children.length === 0) {
        content_tasks.appendChild(no_task_msg);
    }
}
function alertNoTaskMsg() {
    Swal.fire({
        title: 'Error!',
        text: 'No Tasks You Add',
        icon: 'error',
        confirmButtonText: 'Cool',
    })
}
function alertDuplicate() {
    Swal.fire({
        title: 'Error!',
        text: 'You Have this Task AlReady!',
        icon: 'error',
        confirmButtonText: 'Cool',
    })
}

// add task by enter key
input.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        add.click();
    }
})

function stats_tasks() {

    tasks_counter.textContent = tasks.length; 
    
    // task must be element no text
    // tasks_completed.textContent = tasks.filter((task)=> {
    //     console.log(task)
    //     console.log( task.classList.contains("done") );
    // }).length

    tasks_completed.textContent = document.querySelectorAll(".tasks-content .task.done").length

}

/** features
    - Adding Focus on Button Sweet Alert

    - add algorithm to know index of specfic element to remove
    from array

    - prevent whitespace in begining input

    - add modify button

    - add Delete All

    - Done All Tasks

    - add Done Button

    - Add Tasks to Local Storage

*/