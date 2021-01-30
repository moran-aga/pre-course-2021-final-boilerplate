const addTodoButton = document.querySelector("#add-button");
const sortButton = document.querySelector("#sort-button");
const todoList = document.querySelector(".todo-list");
const newTodoInput = document.querySelector("#text-input");
const priority = document.querySelector("#priority-selector");
const title = document.querySelector("#title");

let time = new Date();
let timeValue = document.createElement("div"); 
time = time.toISOString().split('T')[0] + " " + time.toTimeString().split(" ")[0];     
timeValue.textContent = time;

const checkIcon = "far fa-check-circle";
const uncheckIcon = "far fa-circle";

// const LINETHROUGH ="lineThrough";
let LIST = [];
let id = 0;

function updateCount() {
  const count = todoList.childElementCount;
  title.innerHTML = `You have ${count} to-do's.`;
}

function addToDo(todoText, priority, time, done) {
  
  const DONE = done ? checkIcon : uncheckIcon;
  // const LINE = done ? LINETHROUGH : "";

  const todoItem = `<li class="item">
    <i class="${DONE}" job="complete" id="${id}"></i>
    <div class="todo-text">
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
    addToDo(todoValue, priority.value, time, id, false);
    LIST.push({
      name: todoValue,
      priority : priority.value,
      date : time,
      id: id,
      done: false,
    });
    id++;
  }
  newTodoInput.value = "";
  updateCount();

  (saveTodoInJsonBin(LIST));
});

function completeToDo(element) {
  if (element.classList.value === checkIcon) {
    element.classList.value = uncheckIcon;
  } else {
    element.classList.value = checkIcon;
  }
  LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
}

todoList.addEventListener("click", function (event) {
  console.log(event);
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob === "complete") {
    completeToDo(element);
  } else if (elementJob === "delete") removeToDo(element);
});

sortButton.addEventListener("click", function() {
LIST.sort((todoItem1,todoItem2) => todoItem1.priority - todoItem2.priority);
todoList.innerHTML = "";
for (let i =0; i< LIST.length; i++) {
    addToDo(LIST[i].name, LIST[i].priority, LIST[i].date,);
}
});

// const saveTodoInJsonBin = async (todoList) => {
//   const url = `https://api.jsonbin.io/v3/b/60144f46ef99c57c734ba670`;
//   const API_KEY = "$2b$10$K5A7Ayrm2fDiQPeke9Ps1.LJY0kzYeAXwZzLm8qbiBv0r5gfskzI.";
//   const jsonBinSaveRequest = await fetch(url, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       "X-Master-Key": API_KEY,
//     },
//     body: JSON.stringify({"my-todo": [todoList]}),
// });
// console.log("data saved in js bin");
// }

// console.log (saveTodoInJsonBin(todoList));

const saveTodoInJsonBin = async (LIST) => {
let response = await fetch(`https://api.jsonbin.io/v3/b/60144f46ef99c57c734ba670/latest`);
    let jsonResponse = await response.json(); 
    let recordResponse = jsonResponse["record"];
    LIST = recordResponse["my-todo"];
await fetch(`https://api.jsonbin.io/v3/b/60144f46ef99c57c734ba670`,{method:"put",headers: {"Content-Type": "application/json",},body: JSON.stringify({"my-todo":todoList})});
}

(saveTodoInJsonBin(LIST));