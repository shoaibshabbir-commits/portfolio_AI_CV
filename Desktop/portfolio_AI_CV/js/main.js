(function () {
  "use strict";

  var SITE = {
    email: "shabbir.shoaib.muhammad@gmail.com",
    github: "https://github.com/shoaib11223344",
    visitorKey: "portfolio-visitor-count",
    visitorBase: 1247,
  };

  var skillData = [
    { title: "AI & Machine Learning", value: 92, color: "linear-gradient(90deg, #8b5cf6, #9333ea)" },
    { title: "Computer Vision", value: 95, color: "linear-gradient(90deg, #06b6d4, #2563eb)" },
    { title: "Medical Imaging", value: 90, color: "linear-gradient(90deg, #10b981, #0d9488)" },
    { title: "Generative AI", value: 88, color: "linear-gradient(90deg, #d946ef, #ec4899)" },
    { title: "Cloud & MLOps", value: 85, color: "linear-gradient(90deg, #f97316, #f59e0b)" },
    { title: "Programming", value: 93, color: "linear-gradient(90deg, #6366f1, #7c3aed)" },
  ];

  /* --- Theme --- */
  function initTheme() {
    var saved = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = saved || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
    updateThemeIcon(theme);
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute("data-theme");
    var next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateThemeIcon(next);
  }

  function updateThemeIcon(theme) {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.innerHTML = theme === "dark"
      ? '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  /* --- Loader --- */
  function hideLoader() {
    setTimeout(function () {
      var loader = document.getElementById("loader");
      if (loader) loader.classList.add("hidden");
    }, 2000);
  }

  /* --- Navbar scroll --- */
  function initNavbar() {
    var navbar = document.getElementById("navbar");
    window.addEventListener("scroll", function () {
      if (window.scrollY > 20) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");

      var doc = document.documentElement;
      var scrollTop = doc.scrollTop || document.body.scrollTop;
      var scrollHeight = doc.scrollHeight - doc.clientHeight;
      var progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      var bar = document.getElementById("scroll-progress");
      if (bar) bar.style.width = progress + "%";
    });
  }

  /* --- Mobile menu --- */
  function initMobileMenu() {
    var toggle = document.getElementById("menu-toggle");
    var menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      menu.classList.toggle("open");
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
      });
    });
  }

  /* --- Smooth scroll --- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var id = this.getAttribute("href");
        if (id === "#") return;
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  /* --- Reveal on scroll --- */
  function initReveal() {
    var elements = document.querySelectorAll(".reveal");
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- Skill charts --- */
  function renderSkillCharts() {
    var container = document.getElementById("skill-charts");
    if (!container) return;

    skillData.forEach(function (skill) {
      var div = document.createElement("div");
      div.className = "skill-chart reveal";
      div.innerHTML =
        "<label><span>" + skill.title + "</span><span>" + skill.value + "%</span></label>" +
        '<div class="skill-bar"><div class="skill-bar-fill" data-value="' + skill.value + '" style="background:' + skill.color + '"></div></div>';
      container.appendChild(div);
    });

    var barObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var fill = entry.target.querySelector(".skill-bar-fill");
            if (fill) fill.style.width = fill.getAttribute("data-value") + "%";
            entry.target.classList.add("visible");
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    container.querySelectorAll(".skill-chart").forEach(function (el) {
      barObserver.observe(el);
    });
  }

  /* --- Visitor counter --- */
  function initVisitorCounter() {
    var el = document.getElementById("visitor-count");
    if (!el) return;

    var stored = localStorage.getItem(SITE.visitorKey);
    var count = stored ? parseInt(stored, 10) : SITE.visitorBase;
    var sessionKey = "portfolio-session-counted";

    if (!sessionStorage.getItem(sessionKey)) {
      count += 1;
      localStorage.setItem(SITE.visitorKey, String(count));
      sessionStorage.setItem(sessionKey, "true");
    }

    el.textContent = count.toLocaleString();
  }

  /* --- GitHub repos --- */
  function loadGitHubRepos() {
    var container = document.getElementById("repos-grid");
    if (!container) return;

    var username = SITE.github.split("/").pop();

    fetch("https://api.github.com/users/" + username + "/repos?sort=updated&per_page=8")
      .then(function (res) {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then(function (repos) {
        container.innerHTML = "";
        repos
          .filter(function (r) {
            return r.name.toLowerCase().indexOf("portfolio") === -1;
          })
          .slice(0, 6)
          .forEach(function (repo) {
            var card = document.createElement("article");
            card.className = "repo-card glass-card reveal";
            card.innerHTML =
              "<div>📦</div>" +
              "<h3><a href=\"" + repo.html_url + "\" target=\"_blank\" rel=\"noopener\">" + repo.name + "</a></h3>" +
              "<p>" + (repo.description || "No description available") + "</p>" +
              "<div class=\"repo-meta\">" +
              (repo.language ? "<span>● " + repo.language + "</span>" : "") +
              "<span>★ " + repo.stargazers_count + "</span>" +
              "<span>⑂ " + repo.forks_count + "</span>" +
              "</div>";
            container.appendChild(card);
            initRevealOnElement(card);
          });
      })
      .catch(function () {
        container.innerHTML =
          '<div class="glass-card reveal" style="padding:2rem;text-align:center;grid-column:1/-1">' +
          "<p style=\"color:var(--muted);margin-bottom:1rem\">Unable to load repositories.</p>" +
          '<a href="' + SITE.github + '" target="_blank" rel="noopener" class="btn btn-primary">View GitHub Profile</a>' +
          "</div>";
      });
  }

  function initRevealOnElement(el) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
  }

  /* --- Contact form --- */
  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]').value.trim();
      var email = form.querySelector('[name="email"]').value.trim();
      var message = form.querySelector('[name="message"]').value.trim();
      var status = document.getElementById("form-status");

      var subject = encodeURIComponent("Portfolio Contact from " + name);
      var body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message);
      window.location.href = "mailto:" + SITE.email + "?subject=" + subject + "&body=" + body;

      if (status) {
        status.textContent = "Opening your email client...";
        status.className = "form-status success";
      }
      form.reset();
    });
  }

  /* --- Init --- */
  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    hideLoader();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initReveal();
    renderSkillCharts();
    initVisitorCounter();
    loadGitHubRepos();
    initContactForm();

    var themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

    var scrollHint = document.getElementById("scroll-hint");
    if (scrollHint) {
      scrollHint.addEventListener("click", function () {
        document.getElementById("about").scrollIntoView({ behavior: "smooth" });
      });
    }
  });
})();
