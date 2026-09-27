// Breakthrough Author Live — small progressive-enhancement behaviors
// (mobile nav toggle, sticky mobile CTA, placeholder video button)

(function () {
  "use strict";

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
