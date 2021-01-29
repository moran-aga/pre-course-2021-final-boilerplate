const addTodoButton = document.querySelector("#add-button");
const sortButton = document.querySelector("#sort-button");
const todoList = document.querySelector(".todo-list");
const newTodoInput = document.querySelector("#text-input");
const priority = document.querySelector("#priority-selector");
const title = document.querySelector("#title");
const today = new Date();

const checkIcon = "far fa-check-circle";
const uncheckIcon = "far fa-circle";

// const LINETHROUGH ="lineThrough";
let LIST = [];
let id = 0;

function updateCount() {
  const count = todoList.childElementCount;
  title.innerHTML = `You have ${count} to-do's.`;
}

function addToDo(todoText, priority, today, id, done) {
  
  const DONE = done ? checkIcon : uncheckIcon;
  // const LINE = done ? LINETHROUGH : "";

  const todoItem = `<li class="item">
    <i class="${DONE}" job="complete" id="${id}"></i>
    <div class="todo-priority">
    ${priority}
    </div>
    <div class="todo-created-at">
    ${today}
    </div>
    <div class="todo-text">
    ${todoText}
    </div>
    <i class="far fa-trash-alt" job="delete" id="${id}"></i>
    </li>`;

  const position = "beforeend";

  todoList.insertAdjacentHTML(position, todoItem);
}

addTodoButton.addEventListener("click", function (event) {
  const todoValue = newTodoInput.value;
  if (todoValue) {
    addToDo(todoValue, priority.value, today, id, false);
    LIST.push({
      name: todoValue,
      priority : priority.value,
      date : today,
      id: id,
      done: false,
    });
    id++;
  }
  newTodoInput.value = "";
  updateCount();
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


// ##################################### JS BIN
const saveTodoInJsonBin = async (todoList) => {
  //     let req = new XMLHttpRequest();
  // req.onreadystatechange = () => {
  //   if (req.readyState == XMLHttpRequest.DONE) {
  //     console.log(req.responseText);
  //   }
  // };
  // req.open("POST", "https://api.jsonbin.io/b", true);
  // req.setRequestHeader("Content-Type", "application/json");
  // req.setRequestHeader("secret-key", "<SECRET_KEY>");
  // req.send('{"Sample": "Hello World"}');

  const url = `https://api.jsonbin.io/b`;
  const secretKey =
    "$2b$10$LoUxYgccdNGEGfOHMu8ETOpoo2Rmk4gLRrxwH827xE.NNk/7ni9Sm";
  const jsonBinSaveRequest = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "secret-key": secretKey,
    },
    body: JSON.stringify(todoList),
  });

  console.log("data saved in js bin");
};

const readDataFromJsBin = async (binId) => {
  const url = `https://api.jsonbin.io/b/${binId}`;
  const secretKey =
    "$2b$10$LoUxYgccdNGEGfOHMu8ETOpoo2Rmk4gLRrxwH827xE.NNk/7ni9Sm";

  const request = await fetch(url, {
    method: "GET",
    headers: {
      "secret-key": secretKey,
    },
  });

  const myTodoListFromJsBinJsonFormat = await request.json();
  return myTodoListFromJsBinJsonFormat;
};

const jsbinSubmitButton = document.querySelector("#submit-jsbin");
jsbinSubmitButton.addEventListener("click", async () => {
  const res = await saveTodoInJsonBin(LIST);
});

// APPLICATION LOAD EVENT
window.addEventListener("load", async () => {
  //const todoList = await readDataFromJsBin("6012cfd8500b216d079962d9");
});

const jsbinIdUserInput = document.querySelector("#jsbin-id-input");
const jsbinFetchDataFromServerBtn = document.querySelector("#fetch-jsbin-btn");

// Fetch from server on click my darling
jsbinFetchDataFromServerBtn.addEventListener("click", async () => {
  const userJsBinId = jsbinIdUserInput.value;
  const todoListForJsBinId = await readDataFromJsBin(userJsBinId);

  todoListForJsBinId.forEach(todo => {
    addToDo(todo.name, todo.id, todo.done);
  });
});
