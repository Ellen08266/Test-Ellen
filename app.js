function setLanguage(lang, translations) {
  localStorage.setItem("language", lang);

  // Textové překlady
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Placeholdery
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute("placeholder", translations[lang][key]);
    }
  });

  // Alt texty obrázků
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const key = el.getAttribute("data-i18n-alt");
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute("alt", translations[lang][key]);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language") || "cz";

  if (typeof preklady !== "undefined") {
    setLanguage(savedLang, preklady);
  }

  document.querySelectorAll(".lang-menu div").forEach((div) => {
    div.addEventListener("click", () => {
      const lang = div.getAttribute("data-lang");
      if (typeof preklady !== "undefined") {
        setLanguage(lang, preklady);
      }
    });
  });
});

