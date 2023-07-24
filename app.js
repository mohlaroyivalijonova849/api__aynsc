const API = "https://jsonplaceholder.typicode.com/todos";

const request = new XMLHttpRequest();
request.addEventListener("readystatechange", () => {
  if (request.readyState == 4 && request.status == 200) {
    const data = JSON.parse(request.responseText);
    updateUI(data);

    // Add event listeners to the radio buttons
    const doneRadio = document.querySelector('input[name="done"]');
    const notRadio = document.querySelector('input[name="not"]');
    const allRadio = document.querySelector('input[name="all"]');

    doneRadio.addEventListener("click", () => {
      updateUI(data.filter((todo) => todo.completed === true));
      notRadio.checked = false;
      allRadio.checked = false;
    });

    notRadio.addEventListener("click", () => {
      updateUI(data.filter((todo) => todo.completed === false));
      doneRadio.checked = false;
      allRadio.checked = false;
    });

    allRadio.addEventListener("click", () => {
      updateUI(data);
      doneRadio.checked = false;
      notRadio.checked = false;
    });
  } else if (request.readyState == 4) {
    console.log("Error");
  } else {
    console.log("loading...");
  }
});

request.open("GET", API);
request.send();

const ul = document.querySelector("ul");

function updateUI(data) {
  ul.innerHTML = ""; // Clear the existing list items

  data.slice(0, 20).forEach((todo, i) => {
    ul.innerHTML += `<li class="card ${
      todo.completed ? "active" : "inactive"
    }" >
    <h3>ID: ${todo.id}</h3>
    <h4>Completed: ${todo.completed}</h4>
    <p>${todo.title}</p>
  </li>`;
  });
}
