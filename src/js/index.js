import { getUser } from "../js/services/user.js";
import { getRepositories } from "../js/services/repositories.js";

import { user } from "../js/objects/user.js";

import { screen } from "../js/objects/screen.js";

function validateEmptyInput(username) {
  if (username.length === 0) {
    alert("Preencha o campo com o nome do usuário do GitHub");
    return true;
  }
}

document.getElementById("btn-search").addEventListener("click", () => {
  const username = document.getElementById("input-search").value;
  if (validateEmptyInput(username)) return;
  getUserData(username);
});

document.getElementById("input-search").addEventListener("keyup", (e) => {
  const username = e.target.value;
  const key = e.which || e.keyCode;
  const isEnterKeyPress = key === 13;

  if (isEnterKeyPress) {
    if (validateEmptyInput(username)) return;
    getUserData(username);
  }
});

async function getUserData(username) {
  const userResponse = await getUser(username);
  if (userResponse.message === "Not found") {
    screen.renderNotFound();
    return;
  }
  const repositoriesResponse = await getRepositories(username);

  user.setInfo(userResponse);
  user.setRepositories(repositoriesResponse);

  screen.renderUser(user);
}
