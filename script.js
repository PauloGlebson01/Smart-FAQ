/* ===============================
   ACCORDION FAQ
================================ */
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    const answer = button.nextElementSibling;

    item.classList.toggle("active");

    if (item.classList.contains("active")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = null;
    }
  });
});

/* ===============================
   BUSCA FAQ + DESTAQUE
================================ */
const searchInput = document.getElementById("faqSearch");
const clearBtn = document.getElementById("clearSearch");
const faqCategories = document.querySelectorAll(".faq-category");

/* Remove destaque anterior */
function removeHighlights(element) {
  element.innerHTML = element.innerHTML.replace(
    /<span class="highlight">(.*?)<\/span>/gi,
    "$1"
  );
}

/* Aplica destaque */
function highlightText(element, term) {
  if (!term) return;
  const regex = new RegExp(`(${term})`, "gi");
  element.innerHTML = element.innerHTML.replace(
    regex,
    `<span class="highlight">$1</span>`
  );
}

function filterFAQ() {
  const term = searchInput.value.toLowerCase().trim();

  faqCategories.forEach(category => {
    let categoryVisible = false;
    const items = category.querySelectorAll(".faq-item");

    items.forEach(item => {
      const questionEl = item.querySelector(".faq-question");
      const answerEl = item.querySelector(".faq-answer");

      /* Limpa destaques antigos */
      removeHighlights(questionEl);
      removeHighlights(answerEl);

      const questionText = questionEl.innerText.toLowerCase();
      const answerText = answerEl.innerText.toLowerCase();

      if (questionText.includes(term) || answerText.includes(term)) {
        item.style.display = "block";
        item.classList.remove("hidden");
        categoryVisible = true;

        /* Destaca texto */
        highlightText(questionEl, term);
        highlightText(answerEl, term);
      } else {
        item.classList.add("hidden");
        setTimeout(() => {
          item.style.display = "none";
        }, 200);
      }
    });

    category.style.display = categoryVisible ? "block" : "none";
  });

  clearBtn.style.display = term ? "block" : "none";
}

/* Busca em tempo real */
searchInput.addEventListener("input", filterFAQ);

/* Buscar com Enter */
searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    filterFAQ();
  }
});

/* Limpar busca */
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  filterFAQ();
  searchInput.focus();
});
