let currentFilter = "all";
let searchQuery = "";

function filterQuestions() {
  const questions = document.querySelectorAll(".question");

  questions.forEach((question) => {
    const tags = question.getAttribute("data-tags").split(",");
    const title = question.querySelector("h2").textContent;
    const content = question.querySelector("p").textContent;

    const tagMatch = currentFilter === "all" || tags.includes(currentFilter);

    const searchMatch =
      searchQuery === "" ||
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.toLowerCase().includes(searchQuery.toLowerCase());

    if (tagMatch && searchMatch) {
      question.style.display = "block";
    } else {
      question.style.display = "none";
    }
  });

  const visibleQuestions = document.querySelectorAll(
    '.question[style="display: block"]'
  );
  const noResultsElement = document.querySelector(".no-results");

  if (noResultsElement) {
    noResultsElement.remove();
  }

  if (visibleQuestions.length === 0) {
    const questionsContainer = document.getElementById("questions-container");
    const noResultsDiv = document.createElement("div");
    noResultsDiv.className = "no-results";
    noResultsDiv.textContent =
      "Tidak ada pertanyaan yang sesuai dengan filter.";
    questionsContainer.appendChild(noResultsDiv);
  }
}

function renderQuestions() {
  const loadingElement = document.getElementById("loading");

  if (loadingElement) {
    loadingElement.style.display = "block";
  }

  setTimeout(() => {
    if (loadingElement) {
      loadingElement.style.display = "none";
    }

    filterQuestions();
  }, 300);
}

document.addEventListener("DOMContentLoaded", () => {
  renderQuestions();

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderQuestions();
    });
  }

  const tagButtons = document.querySelectorAll(".tag-filter");
  tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tagButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      currentFilter = button.getAttribute("data-tag");
      renderQuestions();
    });
  });

  const btnResponsive = document.querySelector(".btn-responsive");
  const navContainer = document.querySelector(".nav-container");

  if (btnResponsive) {
    btnResponsive.addEventListener("click", () => {
      navContainer.classList.toggle("active");
      btnResponsive.classList.toggle("active");
    });
  }

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navContainer.classList.remove("active");
      btnResponsive.classList.remove("active");
    });
  });

  const questions = document.querySelectorAll(".question");
  questions.forEach((question) => {
    question.addEventListener("click", () => {
      const questionId = question.getAttribute("data-id");
      const questionTitle = question.querySelector("h2").textContent;
      alert(`Question ID: ${questionId}\nTitle: ${questionTitle}`);
    });
  });
});
