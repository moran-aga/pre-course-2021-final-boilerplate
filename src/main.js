const addButton = document.querySelector("#add-button");
const sortButton = document.querySelector("#sort-button");
const list = document.querySelector(".todo-list");
const input = document.querySelector("#text-input");
const priority = document.querySelector("#priority-selector");
const title = document.querySelector("#title");
const today = new Date();

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINETHROUGH ="lineThrough";
 
function updateCount() {
    const count = list.childElementCount;
    title.innerHTML = `You have ${count} to-do's.`;
}

function addToDo(toDo, id) {
    const item = `<li class="item">
    <i class="far fa-circle" job="complete" id="${id}"></i>
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
        addToDo(toDo);
    } 
    input.value = "";
    updateCount();
})

let LIST=[];
let id = 0;



// todoList.addEventListener("click", deleteCheck)
// sortButton.addEventListener("click", sortToDo)