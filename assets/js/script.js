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
    const linkAnchors = item.querySelectorAll(".project-links a");

    modalImg.src = img ? img.src : "";
    modalImg.alt = img ? img.alt : "";
    modalTitle.innerText = title ? title.innerText : "";
    modalCategory.innerText = category ? category.innerText : "";
    modalGithub.href = linkAnchors[0] ? linkAnchors[0].href : "#";
    modalLive.href = linkAnchors[1] ? linkAnchors[1].href : "#";

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



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



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