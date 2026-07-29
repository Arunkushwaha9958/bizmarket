// BIZMARKET — shared site behavior

document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var navMain = document.querySelector(".nav-main");

  if (toggle && navMain) {
    toggle.addEventListener("click", function () {
      var isOpen = navMain.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Services dropdown — toggle on tap for mobile, hover handles desktop via CSS
  var dropdownParents = document.querySelectorAll(".has-dropdown");
  dropdownParents.forEach(function (parent) {
    var link = parent.querySelector(":scope > .nav-link");
    if (!link) return;
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 760) {
        e.preventDefault();
        parent.classList.toggle("open");
      }
    });
  });

  // Close mobile menu when a normal link is tapped
  document
    .querySelectorAll(".nav-main a:not(.has-dropdown > .nav-link)")
    .forEach(function (a) {
      a.addEventListener("click", function () {
        if (window.innerWidth <= 760) {
          navMain.classList.remove("open");
          if (toggle) toggle.classList.remove("open");
        }
      });
    });

  // Contact form — sends data to the BizMarket API (which stores it in MongoDB Atlas)
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  var CONTACT_API_URL = "https://bizmarket-api.vercel.app/api/contact";

  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#name");
      var email = form.querySelector("#email");
      var message = form.querySelector("#message");

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        status.textContent =
          "Please fill in your name, email and message before sending.";
        status.style.color = "#b3261e";
        status.classList.add("show");
        return;
      }

      var payload = {
        name: name.value.trim(),
        email: email.value.trim(),
        phone: form.querySelector("#phone").value.trim(),
        service: form.querySelector("#service").value,
        message: message.value.trim(),
      };

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
          if (data && data.success) {
            status.textContent =
              "Thanks, " +
              payload.name.split(" ")[0] +
              " — your message is in. We reply within one business day.";
            status.style.color = "#111111";
            status.classList.add("show");
            form.reset();
          } else {
            status.textContent =
              (data && data.error) ||
              "Something went wrong — please try again or email us directly.";
            status.style.color = "#b3261e";
            status.classList.add("show");
          }
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
          status.textContent =
            "Could not reach the server — please try again or email us directly.";
          status.style.color = "#b3261e";
          status.classList.add("show");
        });
    });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
