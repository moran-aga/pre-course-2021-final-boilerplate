const addButton = document.querySelector("#add-button");
const sortButton = document.querySelector("#sort-button");
const list = document.querySelector(".todo-list");
const input = document.querySelector("#text-input");
const priority = document.querySelector("#priority-selector")

addButton.addEventListener("click", addToDo)
// todoList.addEventListener("click", deleteCheck)
// sortButton.addEventListener("click", sortToDo)

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
addToDo("bla");