// Custom Google Analytics 4 events for the Samsun guide.
// Page views, scroll depth and outbound clicks are already collected by
// GA4 Enhanced Measurement. The events below add site-specific signals.

(function () {
  "use strict";

  // Send an event only when gtag has been loaded on the page.
  function track(eventName, params) {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params || {});
    }
  }

  // open_map: visitor opens a place on Google Maps.
  document.querySelectorAll("[data-track='open_map']").forEach(function (link) {
    link.addEventListener("click", function () {
      track("open_map", {
        place_name: link.dataset.place || "unknown",
        page_section: link.dataset.section || document.body.dataset.contentGroup || "unknown"
      });
    });
  });

  // cta_click: visitor clicks a call-to-action button.
  document.querySelectorAll("[data-track='cta_click']").forEach(function (button) {
    button.addEventListener("click", function () {
      track("cta_click", {
        cta_label: button.dataset.label || button.textContent.trim(),
        cta_target: button.getAttribute("href") || ""
      });
    });
  });

  // faq_open: visitor expands a question on the practical info page.
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

  // select_district: visitor jumps to a district from the chip navigation.
  document.querySelectorAll("[data-track='select_district']").forEach(function (chip) {
    chip.addEventListener("click", function () {
      track("select_district", {
        district_name: chip.dataset.district || chip.textContent.trim()
      });
    });
  });

  // Image fallback: if a remote photo fails, show a styled label instead.
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

  // read_complete: visitor reaches the end of the main content.
  // Fires once per page view.
  var sentinel = document.querySelector("[data-read-end]");
  if (sentinel && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          track("read_complete", {
            content_group: document.body.dataset.contentGroup || "unknown"
          });
          observer.disconnect();
        }
      });
    });
    observer.observe(sentinel);
  }
})();

// Mobile navigation toggle.
(function () {
  "use strict";
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) {
    return;
  }
  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.setAttribute("aria-label", open ? "Menüyü aç" : "Menüyü kapat");
    nav.classList.toggle("is-open", !open);
  });
  // Close the menu after choosing an in-page link.
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  });
})();
