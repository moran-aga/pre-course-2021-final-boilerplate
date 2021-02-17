"use strict"

let LIST = [];
let id = 0;
const spinner = document.getElementById("spinner");

showSpinner();
readDataFromJsonBin();
hideSpinner();

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



async function updatedList (LIST) {
  let data = await readDataFromJsonBin();
  console.log(data);
  if (data) {
    LIST = data["my-todo"];
    id = LIST.length;
    loadList(LIST);
    } else {
        LIST = [];
        id = 0;
    }
}
console.log(LIST);

let data = localStorage.getItem("my-todo");

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
    addToDo(item.text, item.priority, item.date, item.id, item.done);
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

function addToDo(todoText, priority, time, id, done) {

  const DONE = done ? checkIcon : uncheckIcon;
  const LINE = done ? LINETHROUGH : "";

  const todoItem = `<li class="item">
    <i class="${DONE}" data-job="complete" id="${id}"></i>
    <div class="todo-text ${LINE}">
    ${todoText}
    </div>
    <div class="todo-priority">
    ${priority}
    </div>
    <div class="todo-created-at">
    ${time}
    </div>
    <i class="far fa-trash-alt" data-job="delete" id="${id}"></i>
    </li>`;

  const position = "beforeend";

  todoList.insertAdjacentHTML(position, todoItem);
}

addTodoButton.addEventListener("click", function (event) {
  const todoValue = newTodoInput.value;
  if (todoValue) {
    addToDo(todoValue, priority.value, time, id, false);
    LIST.push({
      text: todoValue,
      priority : priority.value,
      date : time,
      id: id,
      done: false,
    });
    localStorage.setItem("my-todo", JSON.stringify(LIST));
    id++;
  }
  newTodoInput.value = "";
  updateCount();

  saveTodoInJsonBin();

});


function completeToDo(element) {
  if (element.classList.value === checkIcon) {
    element.classList.value = uncheckIcon;
  } else {
    element.classList.value = checkIcon;
  }
  element.parentNode.querySelector(".todo-text").classList.toggle(LINETHROUGH);
  LIST[element.id].done = LIST[element.id].done ? false : true;
  saveTodoInJsonBin();
}

function removeToDo(element) {
  let itemTime = element.parentElement.children[3].innerText;
  for (let i = 0; i < LIST.length; i++) {
  if(LIST[i].date === itemTime){
    LIST.splice(i, 1);
    // let myTodo = {'my-todo': LIST};
  element.parentNode.parentNode.removeChild(element.parentNode);
  saveTodoInJsonBin();
  }
}
}


todoList.addEventListener("click", function (event) {
  let element = event.target;
  console.log(element);
  const elementJob = element.dataset["job"];
  console.log(elementJob);

  if (elementJob === "complete") {
    completeToDo(element);
  } else if (elementJob === "delete") 
    removeToDo(element);

    localStorage.setItem("my-todo", JSON.stringify(LIST));
    saveTodoInJsonBin();
   
});


sortButton.addEventListener("click", function() {
LIST = LIST.sort((todoItem1,todoItem2) => todoItem2.priority - todoItem1.priority);
todoList.innerHTML = "";
for (let i =0; i< LIST.length; i++) {
    addToDo(LIST[i].text, LIST[i].priority, LIST[i].date,);
}
localStorage.setItem("my-todo", JSON.stringify(LIST));
saveTodoInJsonBin();
});


 async function readDataFromJsonBin () {
  let response = await fetch('https://api.jsonbin.io/v3/b/6017d548dde2a87f921b9f2b/latest');
  let jsonResponse = await response.json(); 
  let recordResponse = jsonResponse["record"];
  LIST = recordResponse["my-todo"]; 
}


async function saveTodoInJsonBin () {
 await fetch ("https://api.jsonbin.io/v3/b/6017d548dde2a87f921b9f2b",{method : "put", headers : {"content-type" : "application/json"}, body : JSON.stringify({"my-todo": LIST})});
}


function showSpinner() {
  spinner.className = "show";
  setTimeout(() => {
    spinner.className = spinner.className.replace("show", "");
  }, 5000);
}

function hideSpinner() {
  spinner.className = spinner.className.replace("show", "");
}


