// Import the workbox window module, the editor module, the database module, and the CSS file.
import { Workbox } from "workbox-window";
import Editor from "./editor";
import "./database";
import "../css/style.css";
// This variable is used to select the main element from the index.html file.
const main = document.querySelector("#main");
// This function is used to clear the main element.
main.innerHTML = "";
// This function is used to load the spinner.
const loadSpinner = () => {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};
// This variable is used to create a new instance of the editor.
const editor = new Editor();
// This function is used to load the spinner if the editor is undefined.
if (typeof editor === "undefined") {
  loadSpinner();
}

// Check if service workers are supported
if ("serviceWorker" in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox("/src-sw.js");
  workboxSW.register();
} else {
  console.error("Service workers are not supported in this browser.");
}
