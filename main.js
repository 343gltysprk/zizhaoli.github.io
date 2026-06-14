// Dark / light theme toggle with persistence + system-preference default.
(function () {
  const root = document.documentElement;
  const KEY = "theme";

  const saved = localStorage.getItem(KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(saved || (prefersDark ? "dark" : "light"));

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.textContent = theme === "dark" ? "☼" : "☽"; // ☼ / ☽
  }

  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    setTheme(root.getAttribute("data-theme")); // sync icon
    btn.addEventListener("click", function () {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem(KEY, next);
      setTheme(next);
    });
  });
})();

// Footer: auto-fill current year and the page's last-modified date.
// On GitHub Pages, document.lastModified reflects the latest deploy time.
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const yearEl = document.getElementById("year");
    const updatedEl = document.getElementById("updated");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    if (updatedEl) {
      const d = new Date(document.lastModified);
      if (!isNaN(d)) {
        updatedEl.textContent = d.toLocaleDateString("en-AU", {
          month: "long",
          year: "numeric",
        });
      }
    }
  });
})();
