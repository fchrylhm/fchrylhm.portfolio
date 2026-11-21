import { portfolioData } from "./data.js";
import { initStarfield } from "./starfield.js";
import {
  renderPortfolio,
  renderProjectCards,
  renderProjectModal,
  t
} from "./render.js";

const STORAGE_LANG_KEY = "portfolio_lang";
const appState = {
  lang: localStorage.getItem(STORAGE_LANG_KEY) === "id" ? "id" : "en",
  activeTab: "experience",
  activeAwardTab: "awards",
  activeCategory: "All"
};

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

/* --- Global Listeners (Dipasang Sekali) --- */
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

function initModalControls() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("no-scroll");
  };

  modal.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });
}

/* Shared Lightbox (Adaptif: 1 foto polos, >1 foto otomatis jadi carousel + swipe) */
function initLightbox() {
  const lightbox = document.getElementById("lightbox-modal");
  const dialog = document.getElementById("lightbox-dialog");
  const imgEl = document.getElementById("lightbox-img");
  const captionEl = document.getElementById("lightbox-caption");
  const counterEl = document.getElementById("lightbox-counter");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");
  if (!lightbox || !imgEl || !captionEl) return;

  let gallery = [];
  let currentIdx = 0;

  const renderSlide = () => {
    const item = gallery[currentIdx];
    if (!item) return;

    imgEl.src = item.src;
    imgEl.alt = item.caption || "Preview";
    captionEl.textContent = item.caption || "";
    captionEl.hidden = !item.caption;

    const isMulti = gallery.length > 1;
    if (prevBtn) prevBtn.hidden = !isMulti;
    if (nextBtn) nextBtn.hidden = !isMulti;
    if (counterEl) {
      counterEl.hidden = !isMulti;
      counterEl.textContent = isMulti ? `${currentIdx + 1} / ${gallery.length}` : "";
    }
  };

  const openGallery = (items, startIdx = 0) => {
    if (!items.length) return;
    gallery = items;
    currentIdx = startIdx;
    renderSlide();
    lightbox.hidden = false;
    document.body.classList.add("no-scroll");
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    imgEl.src = "";
    gallery = [];
    document.body.classList.remove("no-scroll");
  };

  const stepSlide = (delta) => {
    if (gallery.length <= 1) return;
    currentIdx = (currentIdx + delta + gallery.length) % gallery.length;
    renderSlide();
  };

  /* Delegasi klik untuk galeri Experience (multi) dan Sertifikat (single) */
  document.addEventListener("click", (e) => {
    const expThumb = e.target.closest("[data-exp-index]");
    if (expThumb) {
      const expIdx = Number(expThumb.dataset.expIndex);
      const photoIdx = Number(expThumb.dataset.photoIndex) || 0;
      const rawPhotos = portfolioData.experience[expIdx]?.photos || [];
      const items = rawPhotos.map((p) =>
        typeof p === "string"
          ? { src: p, caption: "" }
          : { src: p.src, caption: t(p.caption, appState.lang) }
      );
      openGallery(items, photoIdx);
      return;
    }

    const singleTrigger = e.target.closest("[data-lightbox-src]");
    if (singleTrigger) {
      openGallery(
        [{ src: singleTrigger.dataset.lightboxSrc, caption: singleTrigger.dataset.lightboxCaption || "" }],
        0
      );
    }
  });

  prevBtn?.addEventListener("click", () => stepSlide(-1));
  nextBtn?.addEventListener("click", () => stepSlide(1));

  lightbox.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepSlide(-1);
    if (e.key === "ArrowRight") stepSlide(1);
  });

  /* Dukungan swipe horizontal untuk layar sentuh */
  let touchStartX = 0;
  dialog?.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].clientX;
    },
    { passive: true }
  );

  dialog?.addEventListener(
    "touchend",
    (e) => {
      const diffX = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diffX) > 45) stepSlide(diffX < 0 ? 1 : -1);
    },
    { passive: true }
  );
}

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

/* --- Dynamic Section Listeners (Dipasang Ulang Tiap Render) --- */
function initJourneyTabs() {
  const tabButtons = document.querySelectorAll("[data-tab]");
  const panels = document.querySelectorAll("[data-tab-panel]");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      appState.activeTab = target;

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

function initAwardTabs() {
  const tabButtons = document.querySelectorAll("[data-award-tab]");
  const panels = document.querySelectorAll("[data-award-panel]");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.awardTab;
      appState.activeAwardTab = target;

      tabButtons.forEach((b) => {
        const active = b.dataset.awardTab === target;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-selected", String(active));
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.awardPanel !== target;
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
      appState.activeCategory = category;
      filterBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
      renderProjectCards(portfolioData.projects, category, portfolioData.ui, appState.lang);
    });
  });

  if (!grid || !modal) return;

  const openModal = (projectId) => {
    const project = portfolioData.projects.find((p) => p.id === projectId);
    if (!project) return;
    renderProjectModal(project, portfolioData.ui, appState.lang);
    modal.hidden = false;
    document.body.classList.add("no-scroll");
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
}

function initCopyEmail() {
  const copyBtn = document.getElementById("copy-email-btn");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", async () => {
    const email = copyBtn.dataset.email;
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      showToast(t(portfolioData.ui.contact.copiedToast, appState.lang));
    } catch {
      showToast(t(portfolioData.ui.contact.copyErrorToast, appState.lang));
    }
  });
}

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

function initScrollReveal(immediate = false) {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (immediate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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

function bindDynamicSections(immediateReveal = false) {
  initJourneyTabs();
  initAwardTabs();
  initProjects();
  initCopyEmail();
  initProjectTilt();
  initScrollReveal(immediateReveal);
}

/* --- Liquid Glass Language Toggle (EN | ID) --- */
function initLanguageToggle() {
  const toggleBtn = document.getElementById("lang-toggle");
  if (!toggleBtn) return;

  const syncToggleUI = () => {
    toggleBtn.dataset.lang = appState.lang;
    toggleBtn.setAttribute(
      "aria-label",
      appState.lang === "en" ? "Switch to Indonesian" : "Ganti ke Bahasa Inggris"
    );
  };

  syncToggleUI();

  toggleBtn.addEventListener("click", () => {
    appState.lang = appState.lang === "en" ? "id" : "en";
    localStorage.setItem(STORAGE_LANG_KEY, appState.lang);
    syncToggleUI();

    renderPortfolio(portfolioData, appState.lang, appState);
    bindDynamicSections(true);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initStarfield();
  renderPortfolio(portfolioData, appState.lang, appState);
  bindDynamicSections(false);

  initCardSpotlight();
  initNavbar();
  initModalControls();
  initLightbox();
  initScrollProgress();
  initLanguageToggle();
});