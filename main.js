// BIZMARKET — shared site behavior

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var navMain = document.querySelector('.nav-main');

  if (toggle && navMain) {
    toggle.addEventListener('click', function () {
      var isOpen = navMain.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Services dropdown — toggle on tap for mobile, hover handles desktop via CSS
  var dropdownParents = document.querySelectorAll('.has-dropdown');
  dropdownParents.forEach(function (parent) {
    var link = parent.querySelector(':scope > .nav-link');
    if (!link) return;
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 760) {
        e.preventDefault();
        parent.classList.toggle('open');
      }
    });
  });

  // Close mobile menu when a normal link is tapped
  document.querySelectorAll('.nav-main a:not(.has-dropdown > .nav-link)').forEach(function (a) {
    a.addEventListener('click', function () {
      if (window.innerWidth <= 760) {
        navMain.classList.remove('open');
        if (toggle) toggle.classList.remove('open');
      }
    });
  });

  // Contact form (no backend — simulated submit with confirmation)
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      var message = form.querySelector('#message');

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        status.textContent = 'Please fill in your name, email and message before sending.';
        status.style.color = '#b3261e';
        status.classList.add('show');
        return;
      }

      status.textContent = 'Thanks, ' + name.value.trim().split(' ')[0] + ' — your message is in. We reply within one business day.';
      status.style.color = '#111111';
      status.classList.add('show');
      form.reset();
    });
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
