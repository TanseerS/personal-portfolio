'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

  applyPagination();

}

// infinite-scroll pagination — show this many active items per page
const PAGE_SIZE = 6;

const applyPagination = function () {
  let shown = 0;
  for (let i = 0; i < filterItems.length; i++) {
    if (filterItems[i].classList.contains("active") && shown < PAGE_SIZE) {
      filterItems[i].classList.add("in-view");
      shown++;
    } else {
      filterItems[i].classList.remove("in-view");
    }
  }
};

const loadMore = function () {
  let added = 0;
  for (let i = 0; i < filterItems.length && added < PAGE_SIZE; i++) {
    const item = filterItems[i];
    if (item.classList.contains("active") && !item.classList.contains("in-view")) {
      item.classList.add("in-view");
      added++;
    }
  }
};

applyPagination();

const loadMoreSentinel = document.querySelector("[data-load-more-sentinel]");
if (loadMoreSentinel && "IntersectionObserver" in window) {
  const sentinelObserver = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) loadMore();
  }, { rootMargin: "200px" });
  sentinelObserver.observe(loadMoreSentinel);
}

let lastClickedBtn = filterBtn[0];

// Helper: bind a desktop filter button to a category slug
const activateFilterBtn = function (btnIndex, categorySlug) {
  filterBtn[btnIndex].addEventListener("click", function () {
    selectValue.innerText = this.innerText;
    filterFunc(categorySlug);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
};

// Helper: bind a mobile select item to a category slug
const activateSelectItem = function (itemIndex, categorySlug) {
  selectItems[itemIndex].addEventListener("click", function () {
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(categorySlug);
  });
};

// "All" — active
activateFilterBtn(0, "all");
activateSelectItem(0, "all");

// Uncomment when projects are added for this category
// activateFilterBtn(1, "aws");
// activateSelectItem(1, "aws");

// Uncomment when projects are added for this category
// activateFilterBtn(2, "terraform");
// activateSelectItem(2, "terraform");

// Uncomment when projects are added for this category
// activateFilterBtn(3, "cicd");
// activateSelectItem(3, "cicd");

// Uncomment when projects are added for this category
// activateFilterBtn(4, "kubernetes");
// activateSelectItem(4, "kubernetes");



// project modal variables
const modalContainer = document.querySelector("[data-modal-container]");
const overlay = document.querySelector("[data-overlay]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const modalTriggers = document.querySelectorAll("[data-modal-trigger]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalCategory = document.querySelector("[data-modal-category]");
const modalDescription = document.querySelector("[data-modal-description]");
const modalGithub = document.querySelector("[data-modal-github]");
const modalLive = document.querySelector("[data-modal-live]");

const projectModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

for (let i = 0; i < modalTriggers.length; i++) {
  modalTriggers[i].addEventListener("click", function (e) {
    e.preventDefault();

    const item = this.closest(".project-item");
    const img = item.querySelector(".project-img img");
    const title = item.querySelector(".project-title");
    const category = item.querySelector(".project-category");

    modalImg.src = img ? img.src : "";
    modalImg.alt = img ? img.alt : "";
    modalTitle.innerText = title ? title.innerText : "";
    modalCategory.innerText = category ? category.innerText : "";
    modalDescription.innerText = item.dataset.description || "";
    modalGithub.href = item.dataset.github || "#";
    modalLive.href = item.dataset.live || "#";

    projectModalFunc();
  });
}

modalCloseBtn.addEventListener("click", projectModalFunc);
overlay.addEventListener("click", projectModalFunc);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modalContainer.classList.contains("active")) {
    projectModalFunc();
  }
});



// ---------- blog aggregator ----------

// AWS Community Builder posts — add manually as you publish.
// NOTE: excerpts and dates below are best-effort placeholders — overwrite with the actual post summary and publish date.
const awsCommunityPosts = [
  {
    title: "Lambda Execution Roles Are Quietly Breaking Your Least Privilege Policy",
    excerpt: "How Lambda execution roles can silently expand beyond their intended least-privilege scope, and what to do about it.",
    url: "https://builder.aws.com/content/3DhPn3H3CpfAjEaq7YsSPcELir0/lambda-execution-roles-are-quietly-breaking-your-least-privilege-policy",
    date: "2025-09-15",
    coverImage: null
  },
  {
    title: "Building a Scalable Reels Upload and Delivery System on AWS Serverless",
    excerpt: "Designing a Reels-style short-video upload and delivery pipeline end-to-end on AWS serverless primitives.",
    url: "https://builder.aws.com/content/3EIC3WEpCyEZbESZhEMXmMC2Abp/building-a-scalable-reels-upload-and-delivery-system-on-aws-serverless",
    date: "2025-10-20",
    coverImage: null
  },
  {
    title: "How to Add a Custom Domain to AWS Cognito Google Login and the Errors Nobody Warns You About",
    excerpt: "Wiring a custom domain into AWS Cognito's Google federated login — including the surprise errors the docs skip over.",
    url: "https://builder.aws.com/content/3EZ8k6dUcgXTHIkBnA5OXBaIwF2/how-to-add-a-custom-domain-to-aws-cognito-google-login-and-the-errors-nobody-warns-you-about",
    date: "2025-11-25",
    coverImage: null
  }
];

const BLOG_PAGE_SIZE = 6;
const BLOG_EXCERPT_LEN = 120;
const BLOG_PLATFORM_LABELS = {
  hashnode: "Hashnode",
  medium: "Medium",
  devto: "DEV.to",
  aws: "AWS Community"
};

const blogPostsList = document.querySelector("[data-blog-posts]");
const blogLoadingEl = document.querySelector("[data-blog-loading]");
const blogEmptyEl = document.querySelector("[data-blog-empty]");
const blogPaginationEl = document.querySelector("[data-blog-pagination]");
const blogPrevBtn = document.querySelector("[data-blog-prev]");
const blogNextBtn = document.querySelector("[data-blog-next]");
const blogPagesContainer = document.querySelector("[data-blog-pages]");
const blogFilterBtns = document.querySelectorAll("[data-blog-filter]");

let allBlogPosts = [];
let currentBlogFilter = "all";
let currentBlogPage = 1;

const blogStripHtml = function (html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html || "";
  return (tmp.textContent || tmp.innerText || "").replace(/\s+/g, " ").trim();
};

const blogEscapeHtml = function (text) {
  const div = document.createElement("div");
  div.textContent = text || "";
  return div.innerHTML;
};

const blogTruncate = function (text, max) {
  if (!text) return "";
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "...";
};

const blogFormatDate = function (input) {
  if (!input) return "";
  const d = new Date(input);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

const fetchHashnodePosts = async function () {
  try {
    const resp = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://devops-aws-cloud.hashnode.dev/rss.xml");
    if (!resp.ok) throw new Error("Hashnode (rss2json) HTTP " + resp.status);
    const json = await resp.json();
    if (json.status !== "ok") throw new Error("Hashnode feed status: " + json.status);
    return (json.items || []).map(function (item) {
      return {
        platform: "hashnode",
        title: item.title,
        excerpt: blogStripHtml(item.description || ""),
        url: item.link,
        date: item.pubDate,
        coverImage: item.thumbnail || null
      };
    });
  } catch (err) {
    console.error("Hashnode fetch failed:", err);
    return [];
  }
};

const fetchDevtoPosts = async function () {
  try {
    const resp = await fetch("https://dev.to/api/articles?username=tanseer&per_page=20");
    if (!resp.ok) throw new Error("DEV.to HTTP " + resp.status);
    const data = await resp.json();
    return data.map(function (a) {
      return {
        platform: "devto",
        title: a.title,
        excerpt: a.description || "",
        url: a.url,
        date: a.published_at,
        coverImage: a.cover_image || null
      };
    });
  } catch (err) {
    console.error("DEV.to fetch failed:", err);
    return [];
  }
};

const fetchMediumPosts = async function () {
  try {
    const resp = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@khantanseer");
    if (!resp.ok) throw new Error("Medium (rss2json) HTTP " + resp.status);
    const json = await resp.json();
    if (json.status !== "ok") throw new Error("Medium feed status: " + json.status);
    return (json.items || []).map(function (item) {
      return {
        platform: "medium",
        title: item.title,
        excerpt: blogStripHtml(item.description || ""),
        url: item.link,
        date: item.pubDate,
        coverImage: item.thumbnail || null
      };
    });
  } catch (err) {
    console.error("Medium fetch failed:", err);
    return [];
  }
};

const renderBlogCard = function (post) {
  const platform = post.platform;
  const label = BLOG_PLATFORM_LABELS[platform] || platform;
  const cover = post.coverImage
    ? '<img src="' + blogEscapeHtml(post.coverImage) + '" alt="' + blogEscapeHtml(post.title) + '" loading="lazy">'
    : '<div class="blog-banner-placeholder" data-platform="' + platform + '">' + blogEscapeHtml(label) + '</div>';
  const isoDate = post.date ? new Date(post.date).toISOString() : "";
  const displayDate = blogFormatDate(post.date);
  const excerpt = blogTruncate(post.excerpt || "", BLOG_EXCERPT_LEN);
  const safeUrl = post.url || "#";
  return (
    '<li class="blog-post-item" data-platform="' + platform + '">' +
      '<a href="' + blogEscapeHtml(safeUrl) + '" target="_blank" rel="noopener noreferrer">' +
        '<figure class="blog-banner-box">' + cover + '</figure>' +
        '<div class="blog-content">' +
          '<div class="blog-meta">' +
            '<span class="blog-platform-badge" data-platform="' + platform + '">' + blogEscapeHtml(label) + '</span>' +
            (displayDate ? '<time datetime="' + blogEscapeHtml(isoDate) + '">' + blogEscapeHtml(displayDate) + '</time>' : '') +
          '</div>' +
          '<h3 class="h3 blog-item-title">' + blogEscapeHtml(post.title) + '</h3>' +
          '<p class="blog-text">' + blogEscapeHtml(excerpt) + '</p>' +
          '<span class="blog-read-more">Read more →</span>' +
        '</div>' +
      '</a>' +
    '</li>'
  );
};

const getFilteredBlogPosts = function () {
  if (currentBlogFilter === "all") return allBlogPosts;
  return allBlogPosts.filter(function (p) { return p.platform === currentBlogFilter; });
};

const renderBlog = function () {
  const filtered = getFilteredBlogPosts();
  const totalPages = Math.max(1, Math.ceil(filtered.length / BLOG_PAGE_SIZE));
  if (currentBlogPage > totalPages) currentBlogPage = totalPages;

  if (filtered.length === 0) {
    blogPostsList.innerHTML = "";
    blogEmptyEl.hidden = false;
    blogPaginationEl.hidden = true;
    return;
  }
  blogEmptyEl.hidden = true;

  const start = (currentBlogPage - 1) * BLOG_PAGE_SIZE;
  const pageItems = filtered.slice(start, start + BLOG_PAGE_SIZE);
  blogPostsList.innerHTML = pageItems.map(renderBlogCard).join("");

  blogPaginationEl.hidden = totalPages <= 1;
  blogPrevBtn.disabled = currentBlogPage <= 1;
  blogNextBtn.disabled = currentBlogPage >= totalPages;
  blogPagesContainer.innerHTML = Array.from({ length: totalPages }, function (_, i) {
    const page = i + 1;
    return '<button class="blog-pagination-page' + (page === currentBlogPage ? " active" : "") + '" data-blog-page="' + page + '">' + page + '</button>';
  }).join("");
};

const loadAllBlogPosts = async function () {
  blogLoadingEl.hidden = false;
  const [hashnode, devto, medium] = await Promise.all([
    fetchHashnodePosts(),
    fetchDevtoPosts(),
    fetchMediumPosts()
  ]);
  const aws = awsCommunityPosts.map(function (p) {
    return {
      platform: "aws",
      title: p.title,
      excerpt: p.excerpt,
      url: p.url,
      date: p.date,
      coverImage: p.coverImage
    };
  });
  allBlogPosts = hashnode.concat(devto, medium, aws)
    .filter(function (p) { return p && p.title && p.date; })
    .sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
  blogLoadingEl.hidden = true;
  renderBlog();
};

const blogSelect = document.querySelector("[data-blog-select]");
const blogSelectValue = document.querySelector("[data-blog-select-value]");
const blogSelectItems = document.querySelectorAll("[data-blog-select-item]");

const applyBlogFilter = function (filterValue, label) {
  for (let j = 0; j < blogFilterBtns.length; j++) {
    blogFilterBtns[j].classList.remove("active");
    if (blogFilterBtns[j].dataset.blogFilter === filterValue) {
      blogFilterBtns[j].classList.add("active");
    }
  }
  if (blogSelectValue) blogSelectValue.innerText = label;
  currentBlogFilter = filterValue;
  currentBlogPage = 1;
  renderBlog();
};

for (let i = 0; i < blogFilterBtns.length; i++) {
  blogFilterBtns[i].addEventListener("click", function () {
    applyBlogFilter(this.dataset.blogFilter, this.innerText);
  });
}

if (blogSelect) {
  blogSelect.addEventListener("click", function () { elementToggleFunc(this); });
}

for (let i = 0; i < blogSelectItems.length; i++) {
  blogSelectItems[i].addEventListener("click", function () {
    elementToggleFunc(blogSelect);
    applyBlogFilter(this.dataset.blogSelectItem, this.innerText);
  });
}

blogPrevBtn.addEventListener("click", function () {
  if (currentBlogPage > 1) {
    currentBlogPage--;
    renderBlog();
  }
});

blogNextBtn.addEventListener("click", function () {
  const totalPages = Math.ceil(getFilteredBlogPosts().length / BLOG_PAGE_SIZE);
  if (currentBlogPage < totalPages) {
    currentBlogPage++;
    renderBlog();
  }
});

blogPagesContainer.addEventListener("click", function (e) {
  const btn = e.target.closest("[data-blog-page]");
  if (!btn) return;
  const page = parseInt(btn.dataset.blogPage, 10);
  if (!isNaN(page)) {
    currentBlogPage = page;
    renderBlog();
  }
});

loadAllBlogPosts();



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formBtnLabel = document.querySelector("[data-form-btn-label]");
const formStatus = document.querySelector("[data-form-status]");

const API_ENDPOINT = "PLACEHOLDER_API_URL"; // Replace with actual API Gateway URL after backend deployment

const setFieldError = function (input, message) {
  const field = input.closest(".form-field");
  if (!field) return;
  const errorEl = field.querySelector("[data-form-error]");
  if (!errorEl) return;
  if (message) {
    errorEl.textContent = message;
    errorEl.classList.add("active");
    input.classList.add("has-error");
  } else {
    errorEl.textContent = "";
    errorEl.classList.remove("active");
    input.classList.remove("has-error");
  }
};

const validateField = function (input) {
  const value = (input.value || "").trim();
  switch (input.name) {
    case "fullname":
      if (!value) return "Please enter your name.";
      return null;
    case "email":
      if (!value) return "Please enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address.";
      return null;
    case "message":
      if (!value) return "Please enter a message.";
      if (value.length < 10) return "Message must be at least 10 characters.";
      return null;
    default:
      return null;
  }
};

// clear inline error and any prior status when a field gains focus
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("focus", function () {
    setFieldError(this, null);
    if (formStatus.classList.contains("active")) {
      formStatus.classList.remove("active", "success", "error");
      formStatus.textContent = "";
    }
  });
}

const setFormStatus = function (kind, message) {
  formStatus.classList.remove("success", "error", "active");
  if (!kind) {
    formStatus.textContent = "";
    return;
  }
  formStatus.textContent = message;
  formStatus.classList.add(kind, "active");
};

const setSubmitting = function (isSubmitting) {
  if (isSubmitting) {
    formBtn.setAttribute("disabled", "");
    formBtn.classList.add("is-submitting");
    formBtnLabel.textContent = "Sending…";
  } else {
    formBtn.removeAttribute("disabled");
    formBtn.classList.remove("is-submitting");
    formBtnLabel.textContent = "Send Message";
  }
};

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  setFormStatus(null);

  let allValid = true;
  for (let i = 0; i < formInputs.length; i++) {
    const err = validateField(formInputs[i]);
    setFieldError(formInputs[i], err);
    if (err) allValid = false;
  }
  if (!allValid) return;

  const payload = {
    name: form.elements.fullname.value.trim(),
    email: form.elements.email.value.trim(),
    message: form.elements.message.value.trim()
  };

  setSubmitting(true);

  try {
    const resp = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    setFormStatus("success", "Thanks for reaching out! I'll get back to you soon.");
    form.reset();
  } catch (err) {
    console.error("Contact form submission failed:", err);
    setFormStatus("error", "Something went wrong. Please try again or email me directly at ktanseer2@gmail.com");
  } finally {
    setSubmitting(false);
  }
});



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}