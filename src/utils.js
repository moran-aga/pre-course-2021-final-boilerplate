// const API_KEY = ""; // Assign this variable to your JSONBIN.io API key if you choose to use it.
const DB_NAME = "my-todo";
// const API_KEY = "$2b$10$LoUxYgccdNGEGfOHMu8ETOpoo2Rmk4gLRrxwH827xE.NNk/7ni9Sm";

// Gets data from persistent storage by the given key and returns it
// async function main () {

async function getPersistent() {
  let url = 'https://api.jsonbin.io/v3/b/6017d548dde2a87f921b9f2b/latest';
  const request = await fetch(url);
  console.log(request);
  const myTodoListFromJsBinJsonFormat = await request.json()
  console.log(myTodoListFromJsBinJsonFormat.record);
    return myTodoListFromJsBinJsonFormat.record;
}

getPersistent();

// const myTodoListFromJsBinJsonFormat = await getPersistent(API_KEY);

// // Saves the given data into persistent storage by the given key.
// // Returns 'true' on success.

async function setPersistent(data) {
  await fetch ("https://api.jsonbin.io/v3/b/6017d548dde2a87f921b9f2b",{method : "put", headers : {"content-type" : "application/json"}, body : JSON.stringify({"my-todo": LIST})});
}

console.log(setPersistent("TASK"));

// async function readDataFromJsonBin () {
//   let response = await fetch('https://api.jsonbin.io/v3/b/6017d548dde2a87f921b9f2b/latest');
//   let jsonResponse = await response.json(); 
//   let LIST = jsonResponse["record"];
//   return LIST["my-todo"]; 
// }

// async function saveTodoInJsonBin () {
//  await fetch ("https://api.jsonbin.io/v3/b/6017d548dde2a87f921b9f2b",{method : "put", headers : {"content-type" : "application/json"}, body : JSON.stringify({"my-todo": LIST})});
// }

