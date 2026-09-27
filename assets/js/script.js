// Breakthrough Author Live — small progressive-enhancement behaviors
// (mobile nav toggle, sticky mobile CTA, placeholder video button, theme toggle)

(function () {
  "use strict";

  // ---- Light / dark theme toggle ----
  // index.html has an inline head script that applies the saved theme
  // before first paint (avoids a flash of the wrong mode); this just
  // wires up the button and keeps localStorage in sync from here on.
  var THEME_KEY = "bal-theme";
  var htmlEl = document.documentElement;
  var themeToggle = document.getElementById("themeToggle");

  function applyTheme(theme) {
    var isLight = theme === "light";
    if (isLight) {
      htmlEl.setAttribute("data-theme", "light");
    } else {
      htmlEl.removeAttribute("data-theme");
    }
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    }
  }

  if (themeToggle) {
    // Sync the button's state with whatever the inline head script applied.
    applyTheme(htmlEl.getAttribute("data-theme") === "light" ? "light" : "dark");

    themeToggle.addEventListener("click", function () {
      var nextTheme = htmlEl.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(nextTheme);
      try {
        localStorage.setItem(THEME_KEY, nextTheme);
      } catch (e) {
        // localStorage unavailable (privacy mode, etc.) — theme still applies for this session
      }
    });
  }

  // ---- Mobile nav toggle ----
  var navToggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    // Close mobile menu after tapping a link
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  // ---- Sticky mobile CTA: show after hero, hide near footer ----
  var stickyCta = document.getElementById("stickyCta");
  var footer = document.querySelector(".site-footer");

  if (stickyCta) {
    var showThreshold = 480;

    function updateStickyCta() {
      var scrollY = window.scrollY || window.pageYOffset;
      var nearFooter = false;

      if (footer) {
        var footerTop = footer.getBoundingClientRect().top;
        nearFooter = footerTop < window.innerHeight;
      }

      var shouldShow = scrollY > showThreshold && !nearFooter;
      stickyCta.classList.toggle("visible", shouldShow);
      stickyCta.setAttribute("aria-hidden", String(!shouldShow));
    }

    window.addEventListener("scroll", updateStickyCta, { passive: true });
    window.addEventListener("resize", updateStickyCta);
    updateStickyCta();
  }

  // ---- Placeholder video "play" button ----
  var playBtn = document.querySelector(".play-btn");
  if (playBtn) {
    playBtn.addEventListener("click", function () {
      var caption = document.querySelector(".video-caption");
      if (caption) {
        caption.textContent = "Video coming soon — add your VSL embed here";
      }
    });
  }
})();
