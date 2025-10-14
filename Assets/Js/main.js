// assets/js/main.js
document.addEventListener('DOMContentLoaded', function () {
  // ---------- Services data (Phase 5) ----------
  const services = [
    { id: 1, name: "Web Design", summary: "Modern responsive sites", description: "Full website builds using modern standards, responsive layouts, and accessible components.", price_from: 499, duration_days: 7, tags: ["UI/UX", "Responsive"] },
    { id: 2, name: "SEO Setup", summary: "Basic on-page SEO", description: "On-page optimization, sitemap, robots, basic keyword setup, and analytics integration.", price_from: 299, duration_days: 3, tags: ["SEO", "Analytics"] },
    { id: 3, name: "Digital Marketing", summary: "Campaigns & strategy", description: "Paid ads, social strategy, and conversion rate optimisation for scalable growth.", price_from: 399, duration_days: 14, tags: ["Ads", "Strategy"] }
  ];

  // ---------- Render services cards (services.html) ----------
  const servicesGrid = document.getElementById('servicesGrid');
  if (servicesGrid) {
    services.forEach(s => {
      const col = document.createElement('div');
      col.className = 'col-md-6 col-lg-4';
      col.innerHTML = `
        <div class="card h-100 shadow-sm" id="service-${s.id}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${escapeHtml(s.name)}</h5>
            <p class="card-text text-muted">${escapeHtml(s.summary)}</p>
            <div class="mt-auto">
              ${s.tags.map(t => `<span class="badge bg-secondary me-1">${escapeHtml(t)}</span>`).join('')}
              <div class="mt-3">
                <button class="btn btn-outline-primary btn-sm me-2" data-service-id="${s.id}" data-bs-toggle="modal" data-bs-target="#serviceModal">Read More</button>
                <a href="contact.html" class="btn btn-primary btn-sm">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      `;
      servicesGrid.appendChild(col);
    });
  }

  // ---------- Populate Modal on Read More click ----------
  const serviceModal = document.getElementById('serviceModal');
  if (serviceModal) {
    serviceModal.addEventListener('show.bs.modal', function (event) {
      const btn = event.relatedTarget;
      const id = Number(btn.getAttribute('data-service-id'));
      const service = services.find(s => s.id === id);
      if (!service) return;
      const label = serviceModal.querySelector('#serviceModalLabel');
      const desc = serviceModal.querySelector('#serviceModalDesc');
      const price = serviceModal.querySelector('#serviceModalPrice');
      const duration = serviceModal.querySelector('#serviceModalDuration');
      const tags = serviceModal.querySelector('#serviceModalTags');
      const contactLink = serviceModal.querySelector('#serviceModalContact');

      label.textContent = service.name;
      desc.textContent = service.description;
      price.textContent = `$${service.price_from}`;
      duration.textContent = service.duration_days;
      tags.innerHTML = service.tags.map(t => `<span class="badge bg-secondary me-1">${escapeHtml(t)}</span>`).join('');
      contactLink.href = `contact.html?service=${encodeURIComponent(service.name)}`;
    });
  }

  // ---------- Simple form validation & fake submit (contact.html) ----------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }
      // Fake "submit" - show success alert with timestamp
      const alert = document.getElementById('formAlert');
      const now = new Date();
      alert.className = 'alert alert-success';
      alert.textContent = `Thanks! Your message was sent on ${now.toLocaleString()}. (This is a demo submission.)`;
      alert.classList.remove('d-none');
      contactForm.reset();
      contactForm.classList.remove('was-validated');
      // Optionally scroll to alert
      alert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, false);
  }

  // ---------- Smooth scrolling for internal anchors ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // For accessibility: focus the target
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  // ---------- Back to top ----------
  const backBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (!backBtn) return;
    if (window.scrollY > 300) backBtn.style.display = 'block'; else backBtn.style.display = 'none';
  });
  if (backBtn) {
    backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---------- Collapse nav on link click (mobile) ----------
  document.querySelectorAll('.navbar-collapse .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const bsCollapse = document.querySelector('.navbar-collapse');
      if (bsCollapse && bsCollapse.classList.contains('show')) {
        const collapse = bootstrap.Collapse.getInstance(bsCollapse);
        if (collapse) collapse.hide();
      }
    });
  });

  // Escape HTML helper for safety (very small)
  function escapeHtml(unsafe) {
    return String(unsafe)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }
});
