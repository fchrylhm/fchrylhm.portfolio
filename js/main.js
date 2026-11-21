import { portfolioData } from "./data.js";
import { initStarfield } from "./starfield.js";
import {
  renderPortfolio,
  renderProjectCards,
  renderProjectModal
} from "./render.js";

let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("is-visible");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2400);
}

/* --- Glossy Cursor Spotlight pada setiap .card --- */
function initCardSpotlight() {
  document.addEventListener(
    "mousemove",
    (e) => {
      const card = e.target.closest(".card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    },
    { passive: true }
  );
}

/* --- Navbar Scroll, Active Section & Mobile Menu --- */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".navbar__link[href^='#']");

  const handleScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle("is-scrolled", window.scrollY > 30);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Sorot tautan menu sesuai section yang sedang dilihat
  const sections = document.querySelectorAll("main section[id]");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          const isMatch = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("is-active", isMatch && !link.classList.contains("navbar__cta"));
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  sections.forEach((sec) => sectionObserver.observe(sec));

  if (!toggle || !menu) return;

  const closeMenu = () => {
    toggle.classList.remove("is-open");
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

function initJourneyTabs() {
  const tabButtons = document.querySelectorAll("[data-tab]");
  const panels = document.querySelectorAll("[data-tab-panel]");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      tabButtons.forEach((b) => {
        const active = b.dataset.tab === target;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-selected", String(active));
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.tabPanel !== target;
      });
    });
  });
}

function initProjects() {
  const filterBtns = document.querySelectorAll("[data-filter]");
  const grid = document.getElementById("projects-grid");
  const modal = document.getElementById("project-modal");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
      renderProjectCards(portfolioData.projects, category);
    });
  });

  if (!grid || !modal) return;

  const openModal = (projectId) => {
    const project = portfolioData.projects.find((p) => p.id === projectId);
    if (!project) return;
    renderProjectModal(project);
    modal.hidden = false;
    document.body.classList.add("no-scroll");
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("no-scroll");
  };

  grid.addEventListener("click", (e) => {
    const card = e.target.closest("[data-project-id]");
    if (card) openModal(card.dataset.projectId);
  });

  grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest("[data-project-id]");
    if (card) {
      e.preventDefault();
      openModal(card.dataset.projectId);
    }
  });

  modal.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });
}

function initCopyEmail() {
  const copyBtn = document.getElementById("copy-email-btn");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", async () => {
    const email = copyBtn.dataset.email;
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied to clipboard");
    } catch {
      showToast("Unable to copy automatically");
    }
  });
}

function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -24px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

/* --- Cosmic Top Scroll Progress Bar (GPU scaleX) --- */
function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;

  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* --- Micro 3D Tilt pada Project Cards (Khusus Desktop Pointer) --- */
function initProjectTilt() {
  const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!isFinePointer || reducedMotion) return;

  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  let activeCard = null;
  const maxTilt = 2.8;

  const resetCard = (card) => {
    if (!card) return;
    card.classList.remove("is-tilting");
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  };

  grid.addEventListener(
    "mousemove",
    (e) => {
      const card = e.target.closest(".project-card");
      if (card !== activeCard) {
        resetCard(activeCard);
        activeCard = card;
      }
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      card.classList.add("is-tilting");
      card.style.setProperty("--tilt-x", `${(-py * maxTilt * 2).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(px * maxTilt * 2).toFixed(2)}deg`);
    },
    { passive: true }
  );

  grid.addEventListener("mouseleave", () => {
    resetCard(activeCard);
    activeCard = null;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initStarfield();
  renderPortfolio(portfolioData);
  initCardSpotlight();
  initNavbar();
  initJourneyTabs();
  initProjects();
  initCopyEmail();
  initScrollReveal();
  initScrollProgress();
  initProjectTilt();
});