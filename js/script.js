const menuButton = document.querySelector(".menu");
const closeButton = document.querySelector(".close");
const sideBar = document.querySelector("#sidebar");
const pageSize = window.innerWidth;
const todosList = document.querySelector(".todos-list");
const addTodosNameButton = document.querySelector(".add-button");
const newTodoName = document.querySelector("#todo-name-input");
const todos = document.querySelector(".todos");
const todoHeader = document.querySelector(".todo-header");
const searchText = document.querySelector("#search");
const newTodo = document.querySelector("#new-todo");
const todoInput = document.querySelector("#todo");

addExampleData();
addTodoListToSideBar();
loadAllTodoList("todo-list-Books");
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
  todosList.addEventListener("click", loadAllTodos);
  searchText.addEventListener("keyup", search);
  newTodo.addEventListener("click", addNewTodo);
}
function search(e) {
  const searchKey = e.target.value.toLowerCase();
  const allTodos = document.querySelectorAll(".list-group-item");

  allTodos.forEach((element) => {
    const text = element.childNodes[1].innerHTML.toLowerCase();
    if (text.indexOf(searchKey) === -1) {
      element.setAttribute("style", "display:none !important");
    } else {
      element.setAttribute("style", "display:block");
    }
  });
}
function addNewTodo(e) {
  const addToTodo = todoInput.value.trim();
  addToLocalStorege(addToTodo);
  todoInput.value = "";
  e.preventDefault();
}
function addToLocalStorege(addToTodo) {
  const todoListName = document
    .querySelector(".list-group-item")
    .getAttribute("id");
  const listOfTodos = getAllTodosFromStorege(todoListName);
  listOfTodos.push(addToTodo);
  localStorage.setItem(todoListName, JSON.stringify(listOfTodos));
  removeAllTodosFromUI();
  loadAllTodoList(todoListName);
}
function getAllTodosFromStorege(todosListName) {
  if (localStorage.getItem(todosListName) === null) {
    listOfTodos = [];
  } else {
    listOfTodos = JSON.parse(localStorage.getItem(todosListName));
  }
  return listOfTodos;
}
function loadAllTodos(e) {
  removeAllTodosFromUI();
  if (e.target.tagName === "SPAN" || e.target.tagName === "I") {
    loadAllTodoList(
      "todo-list-" + e.target.parentElement.parentElement.className
    );
  } else if (e.target.tagName === "A") {
    loadAllTodoList("todo-list-" + e.target.parentElement.className);
  } else {
    loadAllTodoList("todo-list-" + e.target.className);
  }
}
function removeAllTodosFromUI() {
  while (todos.firstChild) {
    todos.removeChild(todos.firstChild);
  }
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
  localStorage.setItem("todo-list-Other", JSON.stringify(other));
}
function addTodoListToSideBar() {
  // <li>
  //   <a href="#">
  //    <i class="fas fa-check-double"></i>
  //    <span class="todo-name">Market shopping</span>
  //    <span class="todo-count">9</span>
  //   </a>
  // </li>
  while (todosList.firstChild) {
    todosList.removeChild(todosList.firstChild);
  }
  for (var key in localStorage) {
    if (key.includes("todo-list")) {
      //Create list item
      const listItem = document.createElement("li");
      listItem.className = key.substring(10);

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
      todosList.appendChild(listItem);
    }
  }
}
function loadAllTodoList(todoName) {
  const firstTodoList = JSON.parse(localStorage.getItem(todoName));
  todoHeader.innerHTML = todoName.substring(10);
  firstTodoList.forEach((element) => {
    addTodoToUi(element, todoName);
  });
}
function addTodoToUi(todo, todoName) {
  // <li>
  //   <input id="todo1" name="todo1" type="radio" class="with-font" value="sel" />
  //   <label for="todo1">Radio 1</label>
  // </li>;
  const todoListItem = document.createElement("li");
  todoListItem.className = "list-group-item";
  todoListItem.id = todoName;
  let getLastIdNumber = 1;
  if (todos.lastChild != null) {
    getLastIdNumber = todos.lastChild.lastChild.htmlFor + 1;
  }

  const todoInput = document.createElement("input");
  todoInput.id = getLastIdNumber;
  todoInput.type = "radio";
  todoInput.className = "with-font";
  todoInput.value = "sel";

  const todoLabel = document.createElement("label");
  todoLabel.htmlFor = getLastIdNumber;
  todoLabel.appendChild(document.createTextNode(todo));

  todoListItem.appendChild(todoInput);
  todoListItem.appendChild(todoLabel);

  todos.appendChild(todoListItem);
}
