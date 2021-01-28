const addButton = document.querySelector("#add-button");
const sortButton = document.querySelector("#sort-button");
const list = document.querySelector(".todo-list");
const input = document.querySelector("#text-input");
const priority = document.querySelector("#priority-selector");
const title = document.querySelector("#title");

function updateCount() {
    const count = list.childElementCount;
    title.innerHTML = `You have ${count} to-dos.`;
}

addButton.addEventListener("click", function(event){
    const toDo = input.value;
    if (toDo) {
        addToDo(toDo);
    } 
    input.value = "";
    updateCount();
})

function addToDo(toDo) {
    const text = `<li class="item">
    <i class="far fa-circle" job="complete"></i>
    <div class="todo-priority">
    ${priority.value}
    </div>
    <div class="todo-created-at">
    2020-06-18 11:51:12
    </div>
    <div class="todo-text">
    ${toDo}
    </div>
    <i class="far fa-trash-alt" job="delete"></i>
    </li>`
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, text);
    
}

let LIST=[];

// todoList.addEventListener("click", deleteCheck)
// sortButton.addEventListener("click", sortToDo)