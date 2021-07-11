const menuButton = document.querySelector(".menu");
const closeButton = document.querySelector(".close");
const sideBar = document.querySelector("#sidebar");
const pageSize = window.innerWidth;
const todos = document.querySelector(".todos-list");
const addTodosNameButton = document.querySelector(".add-button");
const newTodoName = document.querySelector("#todo-name-input");
addExampleData();
addTodoListToSideBar();
eventListeners();
function eventListeners() {
  menuButton.addEventListener(
    "click",
    function () {
      sideBarStatus("inline");
    },
    false
  );
  closeButton.addEventListener(
    "click",
    function () {
      sideBarStatus("none");
    },
    false
  );
  window.addEventListener("resize", displayWindowSize);
  addTodosNameButton.addEventListener("click", addNewTodosNAme);
}
function addNewTodosNAme() {
  const todoName = "todo-list-" + newTodoName.value.trim();
  const nullArray = [];
  console.log(todoName);
  localStorage.setItem(todoName, JSON.stringify(nullArray));
  addTodoListToSideBar();
  newTodoName.value = "";
}
function displayWindowSize(e) {
  if (e.currentTarget.innerWidth > 500) {
    sideBarStatus("inline");
  } else {
    sideBarStatus("none");
  }
}
function sideBarStatus(displayMode) {
  console.log("burdaim");
  sideBar.style.display = `${displayMode}`;
}
function addExampleData() {
  for (var key in localStorage) {
    if (key.includes("todo-list")) {
      return;
    }
  }
  const market = ["Banan", "Bread", "Egg", "Drink"];
  const work = [
    "Add new function",
    "Add other new function",
    "Add other new function",
    "Add last function",
  ];
  const books = ["Harry Potter", "C#", "javaScript", "HTML", "CSS"];
  const other = ["Hello World"];
  localStorage.setItem("todo-list-Market", JSON.stringify(market));
  localStorage.setItem("todo-list-Work", JSON.stringify(work));
  localStorage.setItem("todo-list-Books", JSON.stringify(books));
  localStorage.setItem("todo-list.Other", JSON.stringify(other));
}
function addTodoListToSideBar() {
  // <li>
  //   <a href="#">
  //    <i class="fas fa-check-double"></i>
  //    <span class="todo-name">Market shopping</span>
  //    <span class="todo-count">9</span>
  //   </a>
  // </li>
  while (todos.firstChild) {
    todos.removeChild(todos.firstChild);
  }
  for (var key in localStorage) {
    if (key.includes("todo-list")) {
      //Create list item
      const listItem = document.createElement("li");

      //Create link item
      const link = document.createElement("a");
      link.href = "#";

      //Create icon
      const icon = document.createElement("i");
      icon.className = "fas fa-check-double";

      //Create list name item
      const todoName = document.createElement("span");
      todoName.className = "todo-name";
      todoName.appendChild(document.createTextNode(key.substring(10)));

      //Create list count badge
      const todoCount = document.createElement("span");
      todoCount.className = "todo-count";
      todoCount.appendChild(
        document.createTextNode(JSON.parse(localStorage.getItem(key)).length)
      );

      link.appendChild(icon);
      link.appendChild(todoName);
      link.appendChild(todoCount);
      listItem.appendChild(link);
      todos.appendChild(listItem);
    }
  }
}
