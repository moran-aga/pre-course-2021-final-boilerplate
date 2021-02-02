"use strict"

const addTodoButton = document.querySelector("#add-button");
const sortButton = document.querySelector("#sort-button");
const todoList = document.querySelector(".todo-list");
const newTodoInput = document.querySelector("#text-input");
const priority = document.querySelector("#priority-selector");
const todoTasksCounter = document.querySelector("#counter");
const clearLocalStorage = document.querySelector(".clear");
const dateElement = document.querySelector("#todayDate");

const checkIcon = "far fa-check-circle";
const uncheckIcon = "far fa-circle";
const LINETHROUGH ="lineThrough";

const options = {weekday : "long", month : "short", year : "numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

let time = new Date();
let timeValue = document.createElement("div"); 
time = time.toTimeString().split(" ")[0];     
timeValue.textContent = time;

let LIST = [];
let id = 0;

let data = localStorage.getItem("TODO");

if(data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

function loadList (array) {
  array.forEach(function (item) {
    addToDo(item.name, item.priority, item.date, item.id, item.done, item.trash);
    updateCount();
  });
}

clearLocalStorage.addEventListener("click", function(){
  localStorage.clear();
  location.reload();
});

function updateCount() {
  const count = todoList.childElementCount;
  todoTasksCounter.innerHTML = count;
}

function addToDo(todoText, priority, time, id, done, trash) {
   
  if (trash) {return; }
  const DONE = done ? checkIcon : uncheckIcon;
  const LINE = done ? LINETHROUGH : "";

  const todoItem = `<li class="item">
    <i class="${DONE}" job="complete" id="${id}"></i>
    <div class="todo-text ${LINE}">
    ${todoText}
    </div>
    <div class="todo-priority">
    ${priority}
    </div>
    <div class="todo-created-at">
    ${time}
    </div>
    <i class="far fa-trash-alt" job="delete" id="${id}"></i>
    </li>`;

  const position = "beforeend";

  todoList.insertAdjacentHTML(position, todoItem);
}

addTodoButton.addEventListener("click", function (event) {
  const todoValue = newTodoInput.value;
  if (todoValue) {
    addToDo(todoValue, priority.value, time, id, false, false);
    LIST.push({
      name: todoValue,
      priority : priority.value,
      date : time,
      id: id,
      done: false,
      trash: false
    });

    localStorage.setItem("TODO", JSON.stringify(LIST));
    id++;
  }
  newTodoInput.value = "";
  updateCount();

  // (saveTodoInJsonBin(LIST));
});

function completeToDo(element) {
  if (element.classList.value === checkIcon) {
    element.classList.value = uncheckIcon;
  } else {
    element.classList.value = checkIcon;
  }
  element.parentNode.querySelector(".todo-text").classList.toggle(LINETHROUGH);
  LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

todoList.addEventListener("click", function (event) {
  let element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob === "complete") {
    completeToDo(element);
  } else if (elementJob === "delete") 
    removeToDo(element);

    localStorage.setItem("TODO", JSON.stringify(LIST));
});

sortButton.addEventListener("click", function() {
LIST.sort((todoItem1,todoItem2) => todoItem2.priority - todoItem1.priority);
todoList.innerHTML = "";
for (let i =0; i< LIST.length; i++) {
    addToDo(LIST[i].name, LIST[i].priority, LIST[i].date,);
}
localStorage.setItem("TODO", JSON.stringify(LIST));
});