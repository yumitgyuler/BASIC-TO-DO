const menuButton = document.querySelector(".menu");
const closeButton = document.querySelector(".close");
const sideBar = document.querySelector("#sidebar");
const pageSize = window.innerWidth;
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
