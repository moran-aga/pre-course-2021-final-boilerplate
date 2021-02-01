
// console.log (saveTodoInJsonBin(todoList));

// const saveTodoInJsonBin = async (LIST) => {
// let response = await fetch(`https://api.jsonbin.io/v3/b/60144f46ef99c57c734ba670/latest`);
//     let jsonResponse = await response.json(); 
//     let recordResponse = jsonResponse["record"];
//     LIST = recordResponse["my-todo"];
// await fetch(`https://api.jsonbin.io/v3/b/60144f46ef99c57c734ba670`,{method:"put",headers: {"Content-Type": "application/json",},body: JSON.stringify({"my-todo":todoList})});
// }

// (saveTodoInJsonBin(LIST));
  
  
  
  
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
  