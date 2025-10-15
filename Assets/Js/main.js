// assets/js/main.js
document.addEventListener('DOMContentLoaded', function () {
  /* ---------- SERVICES DATA ---------- */
  const services = [
    { id: 1, name: "Web Design", summary: "Modern responsive sites", description: "Full website builds using modern standards, responsive layouts, and accessible components.", price_from: 499, duration_days: 7, tags: ["UI/UX", "Responsive"] },
    { id: 2, name: "SEO Setup", summary: "Basic on-page SEO", description: "On-page optimization, sitemap, robots, basic keyword setup, and analytics integration.", price_from: 299, duration_days: 3, tags: ["SEO", "Analytics"] },
    { id: 3, name: "Digital Marketing", summary: "Campaigns & strategy", description: "Paid ads, social strategy, and conversion rate optimisation for scalable growth.", price_from: 399, duration_days: 14, tags: ["Ads", "Strategy"] }
  ];

  /* ---------- ESCAPE HTML ---------- */
  function escapeHtml(unsafe) {
    return String(unsafe)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  /* ---------- RENDER SERVICES GRID ---------- */
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

  /* ---------- POPULATE SERVICE MODAL ---------- */
  const serviceModal = document.getElementById('serviceModal');
  if (serviceModal) {
    serviceModal.addEventListener('show.bs.modal', function (event) {
      const btn = event.relatedTarget;
      if (!btn) return;
      const id = Number(btn.getAttribute('data-service-id'));
      const service = services.find(s => s.id === id);
      if (!service) return;
      serviceModal.querySelector('#serviceModalLabel').textContent = service.name;
      serviceModal.querySelector('#serviceModalDesc').textContent = service.description;
      serviceModal.querySelector('#serviceModalPrice').textContent = `$${service.price_from}`;
      serviceModal.querySelector('#serviceModalDuration').textContent = service.duration_days;
      serviceModal.querySelector('#serviceModalTags').innerHTML = service.tags.map(t => `<span class="badge bg-secondary me-1">${escapeHtml(t)}</span>`).join('');
      serviceModal.querySelector('#serviceModalContact').href = `contact.html?service=${encodeURIComponent(service.name)}`;
    });
  }

  /* ---------- CONTACT FORM VALIDATION ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }
      const alert = document.getElementById('formAlert');
      const now = new Date();
      alert.className = 'alert alert-success';
      alert.textContent = `Thanks! Your message was sent on ${now.toLocaleString()}. (Demo submission)`;
      alert.classList.remove('d-none');
      contactForm.reset();
      contactForm.classList.remove('was-validated');
      alert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, false);
  }

  /* ---------- SMOOTH SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  /* ---------- BACK TO TOP BUTTON ---------- */
  const backBtn = document.getElementById('backToTop');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      backBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });
    backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- COLLAPSE NAVBAR ON MOBILE ---------- */
  document.querySelectorAll('.navbar-collapse .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const bsCollapseEl = document.querySelector('.navbar-collapse');
      if (bsCollapseEl && bsCollapseEl.classList.contains('show')) {
        const collapse = bootstrap.Collapse.getInstance(bsCollapseEl);
        if (collapse) collapse.hide();
      }
    });
  });

  /* ---------- THEME TOGGLE ---------- */
  const themeToggleButtons = document.querySelectorAll('#themeToggle');
  const body = document.body;
  const applyToggleIcon = (btn, dark) => { if (btn) btn.textContent = dark ? '☀️' : '🌙'; };

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme === 'dark';
  if (isDark) body.classList.add('dark-theme');
  themeToggleButtons.forEach(btn => applyToggleIcon(btn, isDark));

  // Handle toggle
  themeToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      body.classList.toggle('dark-theme');
      const dark = body.classList.contains('dark-theme');
      localStorage.setItem('theme', dark ? 'dark' : 'light');
      themeToggleButtons.forEach(b => applyToggleIcon(b, dark));
    });
  });
});
