const username = "lxvrqz";
const container = document.getElementById("project-grid");

fetch(`https://api.github.com/users/${username}/repos`)
  .then(res => res.json())
  .then(repos => {
    repos
      .filter(repo => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .forEach(repo => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
  <div class="project-header">
    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
    <span class="last-updated">${new Date(repo.updated_at).toLocaleDateString()}</span>
  </div>
  <p>${repo.description ? repo.description : "Nothing there."}</p>
  <small>${repo.language || "Language unknown"}</small>
`;

        container.appendChild(card);
      });
  })
  .catch(err => {
    container.innerHTML = "<p>Error</p>";
    console.error(err);
  });
