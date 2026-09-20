const grid = document.getElementById("bookGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const bookCount = document.getElementById("bookCount");
const emptyState = document.getElementById("emptyState");

function escapeHtml(text = "") {
  return text.replace(/[&<>"']/g, m => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[m]));
}

function getCategories() {
  return [...new Set(BOOKS.map(book => book.category).filter(Boolean))].sort();
}

function initCategories() {
  getCategories().forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function renderBooks() {
  const keyword = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  const filtered = BOOKS.filter(book => {
    const haystack = [
      book.title,
      book.author,
      book.category,
      book.course,
      ...(book.tags || [])
    ].join(" ").toLowerCase();

    const matchKeyword = !keyword || haystack.includes(keyword);
    const matchCategory = category === "all" || book.category === category;
    return matchKeyword && matchCategory;
  });

  bookCount.textContent = `${filtered.length} 本教材`;
  emptyState.classList.toggle("hidden", filtered.length !== 0);

  grid.innerHTML = filtered.map(book => {
    const cover = book.cover
      ? `<img class="book-cover" src="${escapeHtml(book.cover)}" alt="${escapeHtml(book.title)} 封面">`
      : `<div class="book-cover cover-placeholder">📘</div>`;

    const tags = (book.tags || [])
      .map(tag => `<span class="tag">${escapeHtml(tag)}</span>`)
      .join("");

    const viewerUrl = `viewer.html?file=${encodeURIComponent(book.file)}&title=${encodeURIComponent(book.title)}`;

    return `
      <article class="book-card">
        ${cover}
        <div class="book-info">
          <h2>${escapeHtml(book.title)}</h2>
          <div class="meta">
            ${book.author ? escapeHtml(book.author) : ""}
            ${book.course ? `<br>${escapeHtml(book.course)}` : ""}
          </div>
          <div class="tags">${tags}</div>
          <div class="actions">
            <a class="btn btn-primary" href="${viewerUrl}">在线预览</a>
            <a class="btn btn-secondary" href="${escapeHtml(book.file)}" download>下载 PDF</a>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

searchInput.addEventListener("input", renderBooks);
categoryFilter.addEventListener("change", renderBooks);

initCategories();
renderBooks();
