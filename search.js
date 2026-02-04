const PIPED_INSTANCES = [
  "https://piped.video",
  "https://piped.projectsegfau.lt",
  "https://piped.adminforge.de"
];

async function searchVideos() {
  const query = document.getElementById("searchInput").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Searching...";

  for (const instance of PIPED_INSTANCES) {
    try {
      const res = await fetch(
        `${instance}/api/v1/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      renderResults(data.items, instance);
      return;
    } catch (e) {
      console.warn(`Failed instance: ${instance}`);
    }
  }

  resultsDiv.innerHTML = "All instances failed.";
}

function renderResults(items, instance) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  items.forEach(video => {
    const div = document.createElement("div");
    div.innerHTML = `
      <a href="${instance}/watch?v=${video.id}" target="_blank">
        <img src="${video.thumbnail}" width="160">
        <p>${video.title}</p>
        <small>${video.uploaderName}</small>
      </a>
      <hr>
    `;
    resultsDiv.appendChild(div);
  });
}
