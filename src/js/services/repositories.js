import { baseUrl, repositoriesQtt } from "../variables.js";

async function getRepositories(username) {
  const response = await fetch(
    `${baseUrl}${username}/repos?per_page=${repositoriesQtt}`
  );
  return await response.json();
}

export { getRepositories };
