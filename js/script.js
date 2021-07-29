const menuButton = document.querySelector(".menu");
const closeButton = document.querySelector(".close");
const sideBar = document.querySelector("#sidebar");
const pageSize = window.innerWidth;
const todosListName = document.querySelector(".todos-list-name");
const todosListNameButton = document.querySelector(".add-button");
const newTodosListName = document.querySelector("#todo-name-input");
const todos = document.querySelector(".todos");
const todoHeader = document.querySelector(".todo-header");
const searchText = document.querySelector("#search");
const newTodoButton = document.querySelector("#new-todo-button");
const todoInput = document.querySelector("#todo");
let listName = "todo-list-Books";

addExampleData();
addTodoListNameToSideBar();
loadAllTodos("todo-list-Books");
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
  todosListNameButton.addEventListener("click", addNewTodosListName);
  todosListName.addEventListener("click", getTodosListName);
  searchText.addEventListener("keyup", search);
  newTodoButton.addEventListener("click", addNewTodo);
  todos.addEventListener("click", removeTodo);
}
function removeTodo(e) {
  if (e.target.tagName === "LABEL") {
    removeTodoFromLocalStorege(e.target.innerHTML);
    removeTodoFromUI(e);
    addTodoListNameToSideBar();
  }
}
function removeTodoFromUI(e) {
  const element = e.target.parentElement;
  setTimeout(() => {
    element.parentNode.removeChild(element);
  }, 2000);
}
function removeTodoFromLocalStorege(deleteTodo) {
  const allTodo = getAllTodosFromStorege(listName);
  var todoIndex = allTodo.indexOf(deleteTodo);
  if (todoIndex > -1) {
    allTodo.splice(todoIndex, 1);
    localStorage.setItem(listName, JSON.stringify(allTodo));
  }
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
  if (todoInput.value != "") {
    const newTodo = todoInput.value.trim();
    addToLocalStorege(newTodo);
    todoInput.value = "";
    e.preventDefault();
  }
}
function addToLocalStorege(newTodo) {
  const listOfTodos = getAllTodosFromStorege(listName);
  listOfTodos.push(newTodo);
  localStorage.setItem(listName, JSON.stringify(listOfTodos));
  removeElementsFromUI(todos);
  addTodoListNameToSideBar();
  loadAllTodos(listName);
}
function getAllTodosFromStorege(listName) {
  if (localStorage.getItem(listName) === null) {
    listOfTodos = [];
  } else {
    listOfTodos = JSON.parse(localStorage.getItem(listName));
  }
  return listOfTodos;
}
function getTodosListName(e) {
  removeElementsFromUI(todos);
  if (e.target.tagName === "SPAN" || e.target.tagName === "I") {
    listName = "todo-list-" + e.target.parentElement.parentElement.className;
    loadAllTodos(listName);
  } else if (e.target.tagName === "A") {
    listName = "todo-list-" + e.target.parentElement.className;
    loadAllTodos(listName);
  } else {
    listName = "todo-list-" + e.target.className;
    loadAllTodos(listName);
  }
}
function addNewTodosListName() {
  const todoName = "todo-list-" + newTodosListName.value.trim();
  const nullArray = [];
  localStorage.setItem(todoName, JSON.stringify(nullArray));
  addTodoListNameToSideBar();
  newTodosListName.value = "";
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
function removeElementsFromUI(element) {
  if (element.firstChild != null) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}
function addTodoListNameToSideBar() {
  // <li>
  //   <a href="#">
  //    <i class="fas fa-check-double"></i>
  //    <span class="todo-name">Market shopping</span>
  //    <span class="todo-count">9</span>
  //   </a>
  // </li>
  removeElementsFromUI(todosListName);
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

      todosListName.appendChild(listItem);
    }
  }
}
function loadAllTodos(todoName) {
  const todoList = getAllTodosFromStorege(todoName);
  todoHeader.innerHTML = todoName.substring(10);
  todoList.forEach((element) => {
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
