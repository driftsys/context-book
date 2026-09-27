// Adds an EN/FR switch to the menu bar that keeps the reader on the same page.
(function () {
  var root = new URL(typeof path_to_root !== "undefined" ? path_to_root : "./", location.href);
  var rel = location.href.slice(root.href.length);
  var isFr = document.documentElement.lang === "fr";
  var target = isFr ? new URL("../" + rel, root) : new URL("fr/" + rel, root);
  var bar = document.querySelector(".right-buttons");
  if (!bar) return;
  var a = document.createElement("a");
  a.href = target.href;
  a.textContent = isFr ? "EN" : "FR";
  a.title = isFr ? "Read in English" : "Lire en français";
  a.setAttribute("aria-label", a.title);
  a.style.cssText = "font-weight:600;margin-inline-start:0.5em;text-decoration:none;";
  bar.insertBefore(a, bar.firstChild);
})();
