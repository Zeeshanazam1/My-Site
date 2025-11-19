
document.addEventListener('DOMContentLoaded', function () {
  //SERVICES DATA 
  const services = [
    { id: 1, name: "Web Design", summary: "Modern responsive sites", description: "Full website builds using modern standards, responsive layouts, and accessible components.", price_from: 499, duration_days: 7, tags: ["UI/UX", "Responsive"] },
    { id: 2, name: "SEO Setup", summary: "Basic on-page SEO", description: "On-page optimization, sitemap, robots, basic keyword setup, and analytics integration.", price_from: 299, duration_days: 3, tags: ["SEO", "Analytics"] },
    { id: 3, name: "Digital Marketing", summary: "Campaigns & strategy", description: "Paid ads, social strategy, and conversion rate optimisation for scalable growth.", price_from: 399, duration_days: 14, tags: ["Ads", "Strategy"] }
  ];

  // ESCAPE HTML
  function escapeHtml(unsafe) {
    return String(unsafe)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  //RENDER SERVICES GRID
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

  //POPULATE SERVICE MODAL
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

  //CONTACT FORM VALIDATION
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

  //SMOOTH SCROLL
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

 //BACK TO TOP BUTTON
  const backBtn = document.getElementById('backToTop');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      backBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });
    backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  document.querySelectorAll('.navbar-collapse .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const bsCollapseEl = document.querySelector('.navbar-collapse');
      if (bsCollapseEl && bsCollapseEl.classList.contains('show')) {
        const collapse = bootstrap.Collapse.getInstance(bsCollapseEl);
        if (collapse) collapse.hide();
      }
    });
  });

  // THEME TOGGLE
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
// main.js
document.addEventListener("DOMContentLoaded", function() {

  // ===================== SIGN UP =====================
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      let users = JSON.parse(localStorage.getItem("users")) || [];

      if (users.find(u => u.email === email)) {
        alert("Email already registered!");
        return;
      }

      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));

      alert("Signup successful! Redirecting to login page...");
      window.location.href = "login.html";
    });
  }

  // ===================== LOGIN =====================
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
      const errorMsg = document.getElementById("errorMsg");

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.email === email);

      if (!user) {
        errorMsg.textContent = "No account found with this email.";
        return;
      }

      if (user.password !== password) {
        errorMsg.textContent = "Incorrect password.";
        return;
      }

      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert(`Login successful! Welcome, ${user.name}`);
      window.location.href = "index.html";
    });
  }

  // ===================== NAVBAR SWITCH =====================
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const profileNav = document.getElementById("profileNav");

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser && profileNav) {
    // Hide login/signup
    if (loginBtn) loginBtn.style.display = "none";
    if (signupBtn) signupBtn.style.display = "none";

    // Show profile
    profileNav.style.display = "block";
  }
});
//SAVE USER PROFILE
const profileForm = document.getElementById("profileForm");
if (profileForm) {
  profileForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      alert("Please login first.");
      return;
    }

    const name = document.getElementById("profileName").value.trim();
    const bio = document.getElementById("profileBio").value.trim();
    const fileInput = document.getElementById("profileImage");
    let profilePic = user.profilePic || "";

    // If user selected a new picture
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = function () {
        profilePic = reader.result;

        updateProfile(user, name, bio, profilePic);
      };
      reader.readAsDataURL(file);
    } else {
      updateProfile(user, name, bio, profilePic);
    }
  });
}

// Function to update and save profile
function updateProfile(user, name, bio, profilePic) {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // update main user record
  const index = users.findIndex(u => u.email === user.email);
  users[index].name = name;
  users[index].bio = bio;
  users[index].profilePic = profilePic;

  // save
  localStorage.setItem("users", JSON.stringify(users));

  // update logged-in user
  const updatedUser = users[index];
  localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

  alert("Profile updated successfully!");
  window.location.reload();
}
// ===================== LOAD PROFILE DATA =====================
const profileName = document.getElementById("displayProfileName");
const profileBio = document.getElementById("displayProfileBio");
const profilePic = document.getElementById("displayProfilePic");

let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (currentUser && profileName) {
  profileName.textContent = currentUser.name || "No Name";
  profileBio.textContent = currentUser.bio || "No Bio Added";
  profilePic.src = currentUser.profilePic || "assets/img/default-avatar.png";
}
// ===================== CREATE POST =====================
const postForm = document.getElementById("postForm");
if (postForm) {
  postForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      alert("Please login first.");
      return;
    }

    const caption = document.getElementById("postCaption").value.trim();
    const imgInput = document.getElementById("postImage");

    if (imgInput.files.length === 0) {
      alert("Please select an image.");
      return;
    }

    const file = imgInput.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      const postImage = reader.result;
      const newPost = {
        user: user.email,
        caption,
        image: postImage,
        time: Date.now()
      };

      let posts = JSON.parse(localStorage.getItem("posts")) || [];
      posts.push(newPost);
      localStorage.setItem("posts", JSON.stringify(posts));

      alert("Post uploaded!");
      window.location.reload();
    };

    reader.readAsDataURL(file);
  });
}
// ===================== DISPLAY POSTS =====================
const postContainer = document.getElementById("postContainer");

if (postContainer) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.reverse().forEach(post => {
    const div = document.createElement("div");
    div.className = "post-card mt-3 p-3 border rounded";
    div.innerHTML = `
      <img src="${post.image}" class="img-fluid rounded mb-2" />
      <p><strong>${post.caption}</strong></p>
      <small>Posted by: ${post.user}</small>
    `;
    postContainer.appendChild(div);
  });
}
