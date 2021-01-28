const addButton = document.querySelector("#add-button");
const sortButton = document.querySelector("#sort-button");
const list = document.querySelector(".todo-list");
const input = document.querySelector("#text-input");
const priority = document.querySelector("#priority-selector");
const title = document.querySelector("#title");
const today = new Date();
const CHECK = "far fa-check-circle";
const UNCHECK = "far fa-circle";
// const LINETHROUGH ="lineThrough";
let LIST= [];
let id = 0;

function updateCount() {
    const count = list.childElementCount;
    title.innerHTML = `You have ${count} to-do's.`;
}

function addToDo(toDo, id, done, trash) {

    if(trash) { return; }
    const DONE = done ? CHECK : UNCHECK;
    // const LINE = done ? LINETHROUGH : "";

    const item = `<li class="item">
    <i class="${DONE}" job="complete" id="${id}"></i>
    <div class="todo-priority">
    ${priority.value}
    </div>
    <div class="todo-created-at">
    ${today}
    </div>
    <div class="todo-text">
    ${toDo}
    </div>
    <i class="far fa-trash-alt" job="delete" id="${id}"></i>
    </li>`
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);  
}

addButton.addEventListener("click", function(event){
    const toDo = input.value;
    if (toDo) {
        addToDo(toDo, id, false, false);
        LIST.push({
            name: toDo,
            id: id,
            done: false,
            trash: false
        });
        id++;
    } 
    input.value = "";
    updateCount();
})

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);

    LIST[element.id].done =  LIST[element.id].done ? false : true;
}

function removeToDo (element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}


list.addEventListener("click", function(event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob === "complete") {
        completeToDo(element);
    } else if (elementJob === "delete")
        removeToDo(element);

})
// sortButton.addEventListener("click", sortToDo)