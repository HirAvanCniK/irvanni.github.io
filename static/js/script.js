document.addEventListener("DOMContentLoaded", function () {
  // Initialize Particles.js
  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#64ffda" },
      shape: { type: "circle", stroke: { width: 0, color: "#000000" }, polygon: { nb_sides: 5 } },
      opacity: { value: 0.5, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
      size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
      line_linked: { enable: true, distance: 150, color: "#64ffda", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } },
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 1 } },
        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 },
      },
    },
    retina_detect: true,
  });

  // Toggle navigation menu for mobile
  const linksBtn = document.getElementById("linksBtn");
  const navLinks = document.querySelector(".right");

  linksBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    linksBtn.classList.toggle("fa-times");
    linksBtn.classList.toggle("fa-bars");
  });

  // Close navigation menu when a link is clicked
  document.querySelectorAll(".link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      linksBtn.classList.remove("fa-times");
      linksBtn.classList.add("fa-bars");
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      const navbarHeight = document.getElementById("navbar").offsetHeight;

      window.scrollTo({
        top: targetElement.offsetTop - navbarHeight - 20,
        behavior: "smooth",
      });
    });
  });

  // Add fade-in animation to sections
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => section.classList.add("fade-in"));

  // Create and update scroll progress bar
  const progressContainer = document.createElement("div");
  progressContainer.className = "progress-container";
  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  progressContainer.appendChild(progressBar);
  document.body.appendChild(progressContainer);

  function updateProgressBar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / height) * 100;
    progressBar.style.width = scrolled + "%";
  }

  // Check visibility of sections and add animations
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 && rect.bottom >= 0;
  }

  function checkVisibility() {
    sections.forEach((section) => {
      if (isInViewport(section)) section.classList.add("visible");
    });
  }

  window.addEventListener("scroll", () => {
    checkVisibility();
    updateProgressBar();
  });

  checkVisibility();
  updateProgressBar();

  // Hover effects for project items
  const projectItems = document.querySelectorAll(".project-item");
  projectItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "translateY(-10px) scale(1.03)";
      const thumbnail = item.querySelector(".project-thumbnail i");
      if (thumbnail) {
        thumbnail.style.transform = "scale(1.2) rotate(10deg)";
        thumbnail.style.opacity = "1";
      }
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "";
      const thumbnail = item.querySelector(".project-thumbnail i");
      if (thumbnail) {
        thumbnail.style.transform = "";
        thumbnail.style.opacity = "";
      }
    });
  });

  // Hover effects for skills
  const skills = document.querySelectorAll(".pSkill");
  skills.forEach((skill) => {
    skill.addEventListener("mouseenter", () => {
      skill.style.transform = "translateY(-10px) rotate(5deg) scale(1.2)";
    });

    skill.addEventListener("mouseleave", () => {
      skill.style.transform = "";
    });
  });

  // Typewriter effect for about section
  const aboutText = document.querySelector("#about p");
  const originalText = aboutText.innerHTML;

  if (window.innerWidth > 768) {
    aboutText.innerHTML = "";

    let currentPosition = 0;
    let htmlContent = "";
    let isOpenTag = false;
    let isCloseTag = false;
    let currentTag = "";

    function typeNextChar() {
      if (currentPosition < originalText.length) {
        const char = originalText[currentPosition];

        if (char === "<") {
          isOpenTag = true;
          currentTag = "<";
        } else if (char === ">" && (isOpenTag || isCloseTag)) {
          currentTag += ">";
          htmlContent += currentTag;
          isOpenTag = false;
          isCloseTag = false;
          currentTag = "";
        } else if (isOpenTag || isCloseTag) {
          currentTag += char;
          if (char === "/" && currentTag === "</") {
            isOpenTag = false;
            isCloseTag = true;
          }
        } else {
          htmlContent += char;
          aboutText.innerHTML = htmlContent;
        }

        currentPosition++;

        const isInTag = isOpenTag || isCloseTag;
        const typingSpeed = isInTag ? 0 : Math.floor(Math.random() * 20) + 10;

        if (!isOpenTag && !isCloseTag) aboutText.innerHTML = htmlContent;

        setTimeout(typeNextChar, typingSpeed);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && currentPosition === 0) setTimeout(typeNextChar, 100);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(document.getElementById("about"));
  }

  // Intersection observer for certifications
  const certItems = document.querySelectorAll(".cert-item");
  const observeCerts = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observeCerts.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  certItems.forEach((item) => observeCerts.observe(item));

  // Hover effects for prize items
  const prizeItems = document.querySelectorAll(".prize-item");
  prizeItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const badge = item.querySelector(".prize-badge i, .prize-icon i");
      if (badge) {
        badge.style.transform = "scale(1.2) rotate(10deg)";
        badge.style.opacity = "1";
      }
    });

    item.addEventListener("mouseleave", () => {
      const badge = item.querySelector(".prize-badge i, .prize-icon i");
      if (badge) {
        badge.style.transform = "";
        badge.style.opacity = "";
      }
    });
  });

  // View more projects button
  const addViewMoreButton = () => {
    const projectsSection = document.getElementById("projects");
    const projectsGrid = document.querySelector(".projects-grid");
    const projectItems = projectsGrid.querySelectorAll(".project-item");
    let visibleCount = 3;

    if (projectItems.length > visibleCount) {
      for (let i = visibleCount; i < projectItems.length; i++) {
        projectItems[i].style.display = "none";
        projectItems[i].classList.add("hidden-project");
      }

      const viewMoreContainer = document.createElement("div");
      viewMoreContainer.className = "view-more-container";
      viewMoreContainer.style.textAlign = "center";
      viewMoreContainer.style.marginTop = "30px";

      const viewMoreBtn = document.createElement("button");
      viewMoreBtn.className = "btn";
      viewMoreBtn.textContent = "View More Projects";

      viewMoreBtn.addEventListener("click", () => {
        const hiddenProjects = document.querySelectorAll(".hidden-project");
        hiddenProjects.forEach((project) => {
          project.style.display = "flex";
          project.classList.remove("hidden-project");
          setTimeout(() => {
            project.style.opacity = "1";
            project.style.transform = "translateY(0)";
          }, 100);
        });

        viewMoreContainer.style.display = "none";
      });

      viewMoreContainer.appendChild(viewMoreBtn);
      projectsSection.appendChild(viewMoreContainer);
    }
  };

  addViewMoreButton();

  // Expansion functionality for certifications
  certItems.forEach((item) => {
    const header = document.createElement("div");
    header.className = "cert-header";

    const title = item.querySelector("h3");
    const date = item.querySelector(".cert-date");

    const titleContainer = document.createElement("div");
    titleContainer.appendChild(title.cloneNode(true));
    titleContainer.appendChild(date.cloneNode(true));

    title.remove();
    date.remove();

    const expandIndicator = document.createElement("i");
    expandIndicator.className = "fas fa-chevron-down expand-indicator";

    header.appendChild(titleContainer);
    header.appendChild(expandIndicator);

    const certContent = item.querySelector(".cert-content");
    certContent.insertBefore(header, certContent.firstChild);

    item.addEventListener("click", () => {
      certItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("expanded")) {
          otherItem.classList.remove("expanded");
        }
      });

      item.classList.toggle("expanded");
    });
  });

  // Expansion functionality for prizes
  prizeItems.forEach((item) => {
    const header = document.createElement("div");
    header.className = "prize-header";

    const title = item.querySelector("h3");
    const date = item.querySelector(".prize-date");

    const titleContainer = document.createElement("div");
    titleContainer.appendChild(title.cloneNode(true));
    titleContainer.appendChild(date.cloneNode(true));

    title.remove();
    date.remove();

    const expandIndicator = document.createElement("i");
    expandIndicator.className = "fas fa-chevron-down expand-indicator";

    header.appendChild(titleContainer);
    header.appendChild(expandIndicator);

    const prizeContent = item.querySelector(".prize-content");
    prizeContent.insertBefore(header, prizeContent.firstChild);

    item.addEventListener("click", () => {
      prizeItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("expanded")) {
          otherItem.classList.remove("expanded");
        }
      });

      item.classList.toggle("expanded");
    });
  });

  // Open the first certification and the first default award
  if (certItems.length > 0) {
    certItems[0].classList.add("expanded");
  }

  if (prizeItems.length > 0) {
    prizeItems[0].classList.add("expanded");
  }
});