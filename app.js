// Překlad a jazykový přepínač
document.addEventListener("DOMContentLoaded", () => {
  const preklady = window.preklady;

  function setLanguage(lang) {
    localStorage.setItem("language", lang);

    // Přeložit texty
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (preklady[lang] && preklady[lang][key]) {
        el.textContent = preklady[lang][key];
      }
    });

    // Přeložit placeholdery
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (preklady[lang] && preklady[lang][key]) {
        el.setAttribute("placeholder", preklady[lang][key]);
      }
    });

    // Pokud máme ceny, můžeme aktualizovat zde (není třeba na podmínkách)
  }

  // Načíst uložený jazyk nebo výchozí
  const savedLang = localStorage.getItem("language") || "cz";
  setLanguage(savedLang);

  // Nastavit posluchače na jazykové volby
  document.querySelectorAll(".lang-menu div").forEach(div => {
    div.addEventListener("click", () => {
      const lang = div.getAttribute("data-lang");
      setLanguage(lang);
    });
  });
});
