const grid = document.getElementById("bookGrid");
const searchInput = document.getElementById("searchInput");
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
          alt="${escapeHtml(book.title)}"
        >
      `
      : `
        <div class="book-cover cover-placeholder">
          📘
        </div>
      `;

    const hasChapters =
      Array.isArray(book.chapters);

    const openUrl = hasChapters
      ? `book.html?id=${encodeURIComponent(book.id)}`
      : `viewer.html?file=${encodeURIComponent(book.file)}&title=${encodeURIComponent(book.title)}`;

    const buttonText = hasChapters
      ? "查看章节"
      : "打开教材";

    const description = hasChapters
      ? `${book.chapters.length} Chapters`
      : "完整教材 PDF";

    return `
      <article class="book-card">

        ${cover}

        <div class="book-info">

          <h2>
            ${escapeHtml(book.title)}
          </h2>

          <div class="meta">
            ${description}
          </div>

          <div class="tags">
            <span class="tag">
              ${description}
            </span>
          </div>

          <div class="actions">

            <a
              class="btn btn-primary"
              href="${openUrl}"
            >
              ${buttonText}
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
