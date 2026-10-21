// Samsun Rehberi - interactions and custom Google Analytics 4 events.
// Page views, scroll depth and outbound clicks are collected by GA4 Enhanced Measurement.
// The events below add site-specific signals.

(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Send an event only when gtag has been loaded on the page.
  function track(eventName, params) {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params || {});
    }
  }

  // ------------------------------------------------------------ analytics events

  // open_map: visitor opens a place on Google Maps.
  document.querySelectorAll("[data-track='open_map']").forEach(function (link) {
    link.addEventListener("click", function () {
      track("open_map", {
        place_name: link.dataset.place || "unknown",
        page_section: link.dataset.section || document.body.dataset.contentGroup || "unknown"
      });
    });
  });

  // cta_click: visitor clicks a call-to-action button or card.
  document.querySelectorAll("[data-track='cta_click']").forEach(function (button) {
    button.addEventListener("click", function () {
      track("cta_click", {
        cta_label: button.dataset.label || button.textContent.trim(),
        cta_target: button.getAttribute("href") || ""
      });
    });
  });

  // select_district: visitor jumps to a district from the chip navigation.
  document.querySelectorAll("[data-track='select_district']").forEach(function (chip) {
    chip.addEventListener("click", function () {
      track("select_district", {
        district_name: chip.dataset.district || chip.textContent.trim()
      });
    });
  });

  // faq_open: visitor expands a question.
  document.querySelectorAll(".faq details").forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        var summary = item.querySelector("summary");
        track("faq_open", {
          question: summary ? summary.textContent.trim() : "unknown"
        });
      }
    });
  });

  // read_complete: visitor reaches the end of the main content. Fires once per page view.
  var sentinel = document.querySelector("[data-read-end]");
  if (sentinel && "IntersectionObserver" in window) {
    var readObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          track("read_complete", {
            content_group: document.body.dataset.contentGroup || "unknown"
          });
          readObserver.disconnect();
        }
      });
    });
    readObserver.observe(sentinel);
  }

  // ------------------------------------------------------------ images

  // If a remote photo fails, show a styled label instead of a broken icon.
  document.querySelectorAll(".photo img").forEach(function (img) {
    var figure = img.closest(".photo");
    function markBroken() {
      if (figure) {
        figure.classList.add("is-broken");
      }
    }
    if (img.complete && img.naturalWidth === 0) {
      markBroken();
    } else {
      img.addEventListener("error", markBroken);
    }
  });

  // Hide a marquee item whose photo fails, so the strip has no empty tiles.
  document.querySelectorAll(".marquee-item img").forEach(function (img) {
    function hide() {
      var item = img.closest(".marquee-item");
      if (item) {
        item.style.display = "none";
      }
    }
    if (img.complete && img.naturalWidth === 0) {
      hide();
    } else {
      img.addEventListener("error", hide);
    }
  });

  // ------------------------------------------------------------ header and menu

  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Menüyü aç" : "Menüyü kapat");
      nav.classList.toggle("is-open", !open);
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });
  }

  // ------------------------------------------------------------ scroll reveal

  var revealItems = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealItems.forEach(function (el) { revealObserver.observe(el); });
  }

  // ------------------------------------------------------------ hero slideshow

  document.querySelectorAll("[data-hero]").forEach(function (hero) {
    var slides = Array.prototype.slice.call(hero.querySelectorAll(".hero-slide"));
    var dots = Array.prototype.slice.call(hero.querySelectorAll(".hero-dot"));
    var whenLabel = hero.querySelector("[data-hero-when]");
    var credit = hero.querySelector("[data-hero-credit]");
    if (slides.length < 2) {
      return;
    }

    var current = 0;
    var timer = null;
    var interval = 7000;

    // Skip slides whose photo failed to load.
    slides.forEach(function (img) {
      img.addEventListener("error", function () { img.dataset.failed = "1"; });
    });

    function show(index) {
      var next = index;
      for (var tries = 0; tries < slides.length; tries++) {
        if (!slides[next].dataset.failed) {
          break;
        }
        next = (next + 1) % slides.length;
      }
      slides[current].classList.remove("is-active");
      if (dots[current]) { dots[current].classList.remove("is-active"); }
      current = next;
      slides[current].classList.add("is-active");
      if (dots[current]) { dots[current].classList.add("is-active"); }
      if (whenLabel) { whenLabel.textContent = slides[current].dataset.when || ""; }
      if (credit) {
        credit.href = slides[current].dataset.credit || credit.href;
        credit.textContent = "Foto: " + (slides[current].dataset.source || "");
      }
    }

    function start() {
      stop();
      timer = window.setInterval(function () {
        show((current + 1) % slides.length);
      }, interval);
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        show(i);
        start();
      });
    });

    // Pause when the tab is hidden so slides do not pile up.
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { stop(); } else { start(); }
    });

    start();
  });
})();
