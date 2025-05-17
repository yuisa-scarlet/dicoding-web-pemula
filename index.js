const questions = [
  {
    id: 1,
    title: "Bagaimana cara integrasi React dengan Django?",
    content:
      "Saya sedang belajar membuat aplikasi fullstack dengan backend Django dan frontend React. Bagaimana cara terbaik menghubungkannya?",
    answers: 16,
    tags: ["React", "Fullstack"],
  },
  {
    id: 2,
    title: "Kapan waktu yang tepat menggunakan useReducer?",
    content:
      "Saya sudah terbiasa dengan useState, tapi banyak tutorial yang pakai useReducer. Kapan sebaiknya kita menggunakannya?",
    answers: 8,
    tags: ["React"],
  },
  {
    id: 3,
    title: 'Mengatasi error "Cannot read properties of undefined" di React',
    content:
      "Seringkali muncul error ini saat mengakses objek nested dari API. Apa solusi terbaik untuk menghindarinya?",
    answers: 12,
    tags: ["React", "Tips"],
  },
  {
    id: 4,
    title: "Apa perbedaan React Query dan Redux Toolkit?",
    content:
      "Saya bingung memilih antara React Query dan Redux Toolkit untuk pengelolaan state dan fetching data. Mana yang lebih cocok?",
    answers: 9,
    tags: ["React", "State Management"],
  },
  {
    id: 5,
    title: "Apakah TypeScript wajib dalam proyek React modern?",
    content:
      "Saya baru mulai belajar React dan melihat banyak contoh sekarang memakai TypeScript. Apakah ini benar-benar wajib?",
    answers: 5,
    tags: ["React", "TypeScript"],
  },
  {
    id: 6,
    title: "Saya ingin kontribusi ke proyek open source React",
    content:
      "Bagaimana cara mulai berkontribusi ke proyek open source berbasis React? Ada rekomendasi proyek pemula?",
    answers: 7,
    tags: ["React", "Open Source"],
  },
  {
    id: 7,
    title: "React + Vite vs React + CRA: Mana yang lebih baik?",
    content:
      "Saya sedang mulai proyek baru dan bingung antara menggunakan Vite atau Create React App (CRA). Apa kelebihan dan kekurangannya?",
    answers: 10,
    tags: ["React", "Tools"],
  },
];

let currentFilter = "all";
let searchQuery = "";

function createQuestionElement(question) {
  const tagsHTML = question.tags.map((tag) => tag).join(" · ");
  return `
    <article class="question">
      <h2>${question.title}</h2>
      <p>${question.content}</p>
      <div class="meta">${question.answers} Jawaban · ${tagsHTML}</div>
    </article>
  `;
}

function filterQuestions() {
  return questions.filter((question) => {
    const tagMatch =
      currentFilter === "all" || question.tags.includes(currentFilter);

    const searchMatch =
      searchQuery === "" ||
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.content.toLowerCase().includes(searchQuery.toLowerCase());

    return tagMatch && searchMatch;
  });
}

function renderQuestions() {
  const questionsContainer = document.getElementById("questions-container");
  const loadingElement = document.getElementById("loading");

  if (loadingElement) {
    loadingElement.style.display = "block";
  }

  setTimeout(() => {
    if (loadingElement) {
      loadingElement.style.display = "none";
    }

    const filteredQuestions = filterQuestions();
    questionsContainer.innerHTML = "";
    if (filteredQuestions.length === 0) {
      questionsContainer.innerHTML =
        '<div class="no-results">Tidak ada pertanyaan yang sesuai dengan filter.</div>';
      return;
    }

    filteredQuestions.forEach((question) => {
      const questionHTML = createQuestionElement(question);
      questionsContainer.innerHTML += questionHTML;
    });
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
});
