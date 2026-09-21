const grid = document.getElementById("bookGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const bookCount = document.getElementById("bookCount");
const emptyState = document.getElementById("emptyState");

function escapeHtml(text = "") {
  return String(text).replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m]));
}

function renderBooks() {

  const keyword =
    searchInput.value
      .trim()
      .toLowerCase();

  const filtered = BOOKS.filter(book => {

    return (
      !keyword ||
      book.title.toLowerCase().includes(keyword) ||
      (book.author || "")
        .toLowerCase()
        .includes(keyword)
    );

  });

  bookCount.textContent =
    `${filtered.length} 本教材`;

  emptyState.classList.toggle(
    "hidden",
    filtered.length !== 0
  );

  grid.innerHTML = filtered.map(book => {

    const cover = book.cover
      ? `
        <img
          class="book-cover"
          src="${escapeHtml(book.cover)}"
        >
      `
      : `
        <div class="book-cover cover-placeholder">
          📘
        </div>
      `;

    return `
      <article class="book-card">

        ${cover}

        <div class="book-info">

          <h2>
            ${escapeHtml(book.title)}
          </h2>

          <div class="meta">

            ${
              book.author
                ? escapeHtml(book.author)
                : ""
            }

            <br>

            ${book.chapters.length} Chapters

          </div>

          <div class="tags">

            <span class="tag">
              ${book.chapters.length} Chapters
            </span>

          </div>

          <div class="actions">

            <a
              class="btn btn-primary"
              href="book.html?id=${encodeURIComponent(book.id)}"
            >
              打开教材
            </a>

          </div>

        </div>

      </article>
    `;

  }).join("");
}

searchInput.addEventListener(
  "input",
  renderBooks
);

renderBooks();
