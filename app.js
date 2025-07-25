const exchangeRate = 25; // 1 EUR = 25 Kč

        function updatePricesToCurrency(currency) {
            const prices = document.querySelectorAll(".price");
            prices.forEach(el => {
                const kc = parseFloat(el.dataset.kc);
                if (currency === "cz") {
                    el.textContent = kc + " Kč";
                } else if (currency === "en") {
                    const eur = (kc / exchangeRate).toFixed(2);
                    el.textContent = "€" + eur;
                }
            });
        }

function setLanguage(lang, translations) {
  localStorage.setItem("language", lang);

  //Textové překlady
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  //Placeholdery
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang][key]) {
      el.setAttribute("placeholder", translations[lang][key]);
    }
  });

  //Alt texty obrázků
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const key = el.getAttribute("data-i18n-alt");
    if (translations[lang] && translations[lang][key]) {
        el.setAttribute("alt", translations[lang][key]);
    }
  });
}

  document.querySelectorAll(".price").forEach(el => {
    const kc = parseFloat(el.dataset.kc);
    if (lang === "cz") {
      el.textContent = kc + " Kč";
    } else if (lang === "en") {
      el.textContent = "€" + (kc / exchangeRate).toFixed(2);
    }
  });


document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language") || "cz";
  setLanguage(savedLang);

  if (typeof preklady !== "undefined") {
    setLanguage(savedLang, preklady);
  }

  document.querySelectorAll(".lang-menu div").forEach((div) => {
    div.addEventListener("click", () => {
      const lang = div.getAttribute("data-lang");
      setLanguage(lang);
    });
  });

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

