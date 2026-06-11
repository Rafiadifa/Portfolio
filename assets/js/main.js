/* Rafi — Portfolio · small interaction layer (no dependencies) */
(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  var navToggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".menu");
  if (navToggle && menu) {
    navToggle.addEventListener("click", function () {
      menu.classList.toggle("open");
    });
  }

  /* ---- Dropdown menus (click on desktop, tap on mobile) ---- */
  var dropParents = Array.prototype.slice.call(document.querySelectorAll(".menu li.has-dropdown"));
  dropParents.forEach(function (li) {
    var trigger = li.querySelector(".menu-trigger");
    if (!trigger) return;
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      var wasOpen = li.classList.contains("open");
      dropParents.forEach(function (o) { o.classList.remove("open"); });
      if (!wasOpen) li.classList.add("open");
    });
    // hover-open on desktop
    li.addEventListener("mouseenter", function () {
      if (window.matchMedia("(min-width: 761px)").matches) li.classList.add("open");
    });
    li.addEventListener("mouseleave", function () {
      if (window.matchMedia("(min-width: 761px)").matches) li.classList.remove("open");
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".menu")) {
      dropParents.forEach(function (o) { o.classList.remove("open"); });
    }
  });

  /* ---- Reveal on scroll ---- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Footer year ---- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
