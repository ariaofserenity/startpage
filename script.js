function updateTime() {
  const now = new Date();
  document.getElementById("time").textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.toggle("active", page.id === pageId);
  });
  document.querySelectorAll(".page-toggle button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.page === pageId);
  });
}

function renderCategories(container, sectionData) {
  const categories = sectionData.categories;

  container.style.display = "grid";
  container.style.gridTemplateColumns = `repeat(2, 1fr)`;
  container.style.gap = "2em";

  for (const category of Object.keys(categories)) {
    const links = categories[category];
    if (!links) continue;

    const section = document.createElement("section");

    const heading = document.createElement("h2");
    heading.textContent = category;
    section.appendChild(heading);

    const ul = document.createElement("ul");
    ul.style.display = "block";

    for (const { name, url } of links) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = name;
      li.appendChild(a);
      ul.appendChild(li);
    }

    section.appendChild(ul);
    container.appendChild(section);
  }
}

(function init() {
  const pageToggleContainer = document.getElementById("page-toggle");
  const pagesContainer = document.getElementById("pages-container");

  pageToggleContainer.innerHTML = "";
  pagesContainer.innerHTML = "";

  let firstPageId = null;

  for (const [pageId, pageData] of Object.entries(LINKS)) {
    if (!firstPageId) firstPageId = pageId;

    const btn = document.createElement("button");
    btn.textContent = pageId;
    btn.dataset.page = pageId;
    btn.onclick = () => showPage(pageId);
    pageToggleContainer.appendChild(btn);

    const pageDiv = document.createElement("main");
    pageDiv.classList.add("page");
    pageDiv.id = pageId;

    const categoriesDiv = document.createElement("div");
    categoriesDiv.classList.add("categories");
    pageDiv.appendChild(categoriesDiv);

    pagesContainer.appendChild(pageDiv);

    renderCategories(categoriesDiv, pageData);
  }

  if (firstPageId) showPage(firstPageId);
})();