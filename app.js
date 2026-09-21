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


// =============================
// 创建分类
// =============================

function initCategories() {

  if (!categoryFilter) return;

  const categories = [

    ...new Set(

      BOOKS
        .map(book => book.category)
        .filter(category =>
          category &&
          category.trim() !== ""
        )

    )

  ];


  categories.forEach(category => {

    const option =
      document.createElement("option");

    option.value = category;

    option.textContent = category;

    categoryFilter.appendChild(option);

  });

}


// =============================
// 显示教材
// =============================

function renderBooks() {

  const keyword =
    searchInput
      ? searchInput.value.trim().toLowerCase()
      : "";


  const selectedCategory =
    categoryFilter
      ? categoryFilter.value
      : "all";


  const filtered = BOOKS.filter(book => {

    const searchText = [

      book.title || "",
      book.author || "",
      book.category || "",
      book.course || ""

    ]
      .join(" ")
      .toLowerCase();


    const matchesSearch =
      !keyword ||
      searchText.includes(keyword);


    const matchesCategory =
      selectedCategory === "all" ||
      book.category === selectedCategory;


    return (
      matchesSearch &&
      matchesCategory
    );

  });


  // =============================
  // 数量
  // =============================

  if (bookCount) {

    bookCount.textContent =
      `${filtered.length} 本教材`;

  }


  if (emptyState) {

    emptyState.classList.toggle(
      "hidden",
      filtered.length !== 0
    );

  }


  // =============================
  // 创建教材卡片
  // =============================

  grid.innerHTML = filtered.map(book => {


    // -----------------------------
    // 判断是不是章节型教材
    // -----------------------------

    const hasChapters =
      Array.isArray(book.chapters) &&
      book.chapters.length > 0;


    // -----------------------------
    // 封面
    // -----------------------------

    const cover = book.cover
      ? `
          <img
            class="book-cover"
            src="${escapeHtml(book.cover)}"
            alt="${escapeHtml(book.title)}"
          >
        `
      : `
          <div
            class="book-cover cover-placeholder"
          >
            📘
          </div>
        `;


    // -----------------------------
    // 打开地址
    // -----------------------------

    let openUrl = "#";


    if (hasChapters) {

      // 多章节教材
      openUrl =
        `book.html?id=${encodeURIComponent(book.id)}`;

    } else if (book.file) {

      // 单 PDF 教材
      openUrl =
        `viewer.html?file=${encodeURIComponent(book.file)}` +
        `&title=${encodeURIComponent(book.title)}`;

    }


    // -----------------------------
    // 显示说明
    // -----------------------------

    const description = hasChapters
      ? `${book.chapters.length} Chapters`
      : "完整教材 PDF";


    const buttonText = hasChapters
      ? "查看章节"
      : "打开教材";


    // =============================
    // 返回卡片
    // =============================

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

            ${
              book.course
                ? `<br>${escapeHtml(book.course)}`
                : ""
            }

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


// =============================
// 搜索
// =============================

if (searchInput) {

  searchInput.addEventListener(
    "input",
    renderBooks
  );

}


// =============================
// 分类
// =============================

if (categoryFilter) {

  categoryFilter.addEventListener(
    "change",
    renderBooks
  );

}


// =============================
// 初始化
// =============================

initCategories();

renderBooks();
