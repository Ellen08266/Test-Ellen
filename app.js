const exchangeRate = 25; // 1 EUR = 25 Kč

function updatePricesToCurrency(lang) {
  const prices = document.querySelectorAll(".price");
  prices.forEach(el => {
    const kc = parseFloat(el.dataset.kc);
    if (lang === "cz") {
      el.textContent = kc + " Kč";
    } else if (lang === "en") {
      const eur = (kc / exchangeRate).toFixed(2);
      el.textContent = "€" + eur;
    }
  });
}

function setLanguage(lang, translations = {}) {
  localStorage.setItem("language", lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute("placeholder", translations[lang][key]);
    }
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const key = el.getAttribute("data-i18n-alt");
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute("alt", translations[lang][key]);
    }
  });

  updatePricesToCurrency(lang);
}

// Pomocná funkce pro přeložení nově načteného obsahu (např. po kliknutí)
function prelozitTexty() {
  const lang = localStorage.getItem("language") || "cz";
  if (typeof preklady !== "undefined") {
    setLanguage(lang, preklady);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language") || "cz";

  // Překlad po načtení
  if (typeof preklady !== "undefined") {
    setLanguage(savedLang, preklady);
  }

  // Přepínač jazyků
  document.querySelectorAll(".lang-menu div").forEach((div) => {
    div.addEventListener("click", () => {
      const lang = div.getAttribute("data-lang");
      if (typeof preklady !== "undefined") {
        setLanguage(lang, preklady);
      }
    });
  });

  // Formulář odeslání
  const form = document.getElementById('rezervacni-formular');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const data = new FormData(form);

      fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          form.reset();
          document.getElementById('uspech').style.display = 'block';
          prelozitTexty(); // přeloží úspěšnou hlášku po odeslání
          setTimeout(() => {
            document.getElementById('uspech').style.display = 'none';
          }, 5000);
        } else {
          alert('Odeslání se nezdařilo. Zkuste to prosím znovu.');
        }
      }).catch(() => {
        alert('Došlo k chybě při odesílání formuláře.');
      });
    });
  }
});



