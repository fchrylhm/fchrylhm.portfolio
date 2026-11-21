function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function t(value, lang = "en") {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[lang] ?? value.en ?? "";
  }
  return value ?? "";
}

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || "")
    .join("");
}

function renderMetaAndNavbar(profile, ui, lang) {
  document.documentElement.lang = lang;
  document.title = `${profile.fullName} — Portfolio`;

  const brandEl = document.getElementById("nav-brand");
  if (brandEl && profile.brandInitials) {
    brandEl.textContent = profile.brandInitials;
  }

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const keys = el.dataset.i18n.split(".");
    const entry = keys.reduce((acc, k) => acc?.[k], ui);
    if (entry) el.textContent = t(entry, lang);
  });
}

function renderHero(profile, ui, lang) {
  const heroEl = document.getElementById("hero");
  if (!heroEl) return;

  const badgeText = t(profile.statusBadge, lang);
  const statusHtml = badgeText
    ? `<div class="hero__badge reveal" style="--reveal-delay: 40ms"><span class="hero__badge-dot" aria-hidden="true"></span><span>${escapeHtml(badgeText)}</span></div>`
    : "";

  const cvButtonHtml = profile.cvUrl
    ? `<a href="${escapeHtml(profile.cvUrl)}" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">${escapeHtml(t(ui.hero.cvBtn, lang))}</a>`
    : `<a href="#contact" class="btn btn--secondary">${escapeHtml(t(ui.hero.touchBtn, lang))}</a>`;

  heroEl.innerHTML = `
    <div class="container">
      <div class="hero__content">
        <div class="hero__orbit-glow" aria-hidden="true"></div>
        ${statusHtml}
        <h1 class="hero__title reveal" style="--reveal-delay: 120ms" translate="no">${escapeHtml(profile.fullName)}</h1>
        <p class="hero__role reveal" style="--reveal-delay: 200ms">${escapeHtml(t(profile.role, lang))}</p>
        <p class="hero__tagline reveal" style="--reveal-delay: 280ms">${escapeHtml(t(profile.tagline, lang))}</p>
        <div class="hero__actions reveal" style="--reveal-delay: 360ms">
          <a href="#projects" class="btn btn--primary">${escapeHtml(t(ui.hero.exploreBtn, lang))}</a>
          ${cvButtonHtml}
        </div>
        <a href="#about" class="hero__scroll reveal" style="--reveal-delay: 460ms" aria-label="Scroll to about section">
          <span>${escapeHtml(t(ui.hero.scroll, lang))}</span>
          <span class="hero__scroll-line"></span>
        </a>
      </div>
    </div>
  `;
}

function renderAbout(profile, skills = {}, ui, lang) {
  const container = document.getElementById("about-container");
  if (!container) return;

  const aboutList = Array.isArray(profile.about)
    ? profile.about
    : profile.about?.[lang] || profile.about?.en || [];

  const paragraphsHtml = aboutList
    .map((text) => `<p class="about__paragraph">${escapeHtml(text)}</p>`)
    .join("");

  const initials = getInitials(profile.fullName);

  const mediaHtml = profile.avatarUrl
    ? `
      <div class="about__avatar-frame">
        <img
          src="${escapeHtml(profile.avatarUrl)}"
          alt="${escapeHtml(profile.avatarAlt || profile.fullName)}"
          class="about__avatar-img"
          loading="lazy"
          onerror="this.parentElement.classList.add('is-fallback'); this.remove();"
        />
        <div class="about__avatar-fallback" translate="no">
          <span class="about__avatar-monogram">${escapeHtml(initials)}</span>
        </div>
      </div>
    `
    : `
      <div class="about__avatar-frame is-fallback" aria-label="${escapeHtml(profile.fullName)}">
        <div class="about__avatar-fallback" translate="no">
          <span class="about__avatar-monogram">${escapeHtml(initials)}</span>
        </div>
      </div>
    `;

  const buildPills = (items = []) =>
    items
      .map(
        (item) => `
        <li class="skill-pill" translate="no">
          <img
            src="${escapeHtml(item.icon)}"
            alt="${escapeHtml(item.name)}"
            class="skill-pill__icon${item.invert ? " skill-pill__icon--invert" : ""}"
            loading="lazy"
            onerror="this.style.display='none'"
          />
          <span class="skill-pill__name">${escapeHtml(item.name)}</span>
        </li>`
      )
      .join("");

  const buildRow = (items = [], direction) =>
    items.length
      ? `
        <div class="marquee__row marquee__row--${direction}">
          <div class="marquee__track">
            <ul class="marquee__group">${buildPills(items)}</ul>
            <ul class="marquee__group" aria-hidden="true">${buildPills(items)}</ul>
          </div>
        </div>`
      : "";

  const hasOrbitalSkills = skills?.orbitTop?.length || skills?.orbitBottom?.length;
  const skillsHtml = hasOrbitalSkills
    ? `
      <div class="skills__grid orbital-marquee reveal">
        ${buildRow(skills.orbitTop, "left")}
        ${buildRow(skills.orbitBottom, "right")}
      </div>
    `
    : "";

  const locationText = t(profile.location, lang);

  container.innerHTML = `
    <div class="section__header reveal">
      <span class="section__kicker">${escapeHtml(t(ui.about.kicker, lang))}</span>
      <h2 class="section__title">${t(ui.about.titleHtml, lang)}</h2>
    </div>

    <div class="about__grid reveal">
      <div class="card about__bio-card">
        <div>${paragraphsHtml}</div>
        ${
          locationText
            ? `<div class="about__meta"><span class="about__meta-dot" aria-hidden="true"></span><span>${escapeHtml(t(ui.about.basedIn, lang))} ${escapeHtml(locationText)}</span></div>`
            : ""
        }
      </div>
      <div class="about__media">
        ${mediaHtml}
      </div>
    </div>

    ${skillsHtml}
  `;
}

function renderJourney(experience = [], education = [], ui, lang, activeTab = "experience") {
  const container = document.getElementById("journey-container");
  if (!container) return;

  const MAX_VISIBLE_THUMBS = 3;

  const renderPhotos = (photos = [], expIdx) => {
    if (!photos.length) return "";

    const visible = photos.slice(0, MAX_VISIBLE_THUMBS);
    const remaining = photos.length - MAX_VISIBLE_THUMBS;

    return `
      <div class="exp-gallery">
        ${visible
          .map((photo, photoIdx) => {
            const src = typeof photo === "string" ? photo : photo.src;
            const caption = typeof photo === "string" ? "" : t(photo.caption, lang);
            const isOverflowTile = photoIdx === MAX_VISIBLE_THUMBS - 1 && remaining > 0;

            return `
              <button
                type="button"
                class="exp-thumb"
                data-exp-index="${expIdx}"
                data-photo-index="${photoIdx}"
                aria-label="${escapeHtml(caption || `View photo ${photoIdx + 1} of ${photos.length}`)}"
              >
                <img src="${escapeHtml(src)}" alt="${escapeHtml(caption || "Experience documentation")}" loading="lazy" />
                ${isOverflowTile ? `<span class="exp-thumb__more">+${remaining}</span>` : ""}
              </button>
            `;
          })
          .join("")}
      </div>
    `;
  };

  const renderTimelineItems = (items, isEducation = false) =>
    items
      .map(
        (item, idx) => `
      <div class="timeline__node">
        <article class="timeline__item card">
          <div class="timeline__header">
            <div>
              <h3 class="timeline__title">${escapeHtml(t(isEducation ? item.degree : item.role, lang))}</h3>
              <p class="timeline__org" translate="no">${escapeHtml(isEducation ? item.institution : item.organization)}</p>
            </div>
            <span class="timeline__period">${escapeHtml(t(item.period, lang))}</span>
          </div>
          <p class="timeline__desc">${escapeHtml(t(item.description, lang))}</p>
          ${!isEducation ? renderPhotos(item.photos, idx) : ""}
        </article>
      </div>
    `
      )
      .join("");

  const isExp = activeTab === "experience";

  container.innerHTML = `
    <div class="section__header reveal">
      <span class="section__kicker">${escapeHtml(t(ui.journey.kicker, lang))}</span>
      <h2 class="section__title">${t(ui.journey.titleHtml, lang)}</h2>
      <p class="section__subtitle">${escapeHtml(t(ui.journey.subtitle, lang))}</p>
    </div>

    <div class="tabs reveal" role="tablist" aria-label="Experience and Education">
      <button class="tabs__btn ${isExp ? "is-active" : ""}" type="button" role="tab" aria-selected="${isExp}" data-tab="experience">
        ${escapeHtml(t(ui.journey.tabExperience, lang))}
      </button>
      <button class="tabs__btn ${!isExp ? "is-active" : ""}" type="button" role="tab" aria-selected="${!isExp}" data-tab="education">
        ${escapeHtml(t(ui.journey.tabEducation, lang))}
      </button>
    </div>

    <div class="timeline reveal" data-tab-panel="experience" ${isExp ? "" : "hidden"}>
      ${renderTimelineItems(experience, false)}
    </div>

    <div class="timeline reveal" data-tab-panel="education" ${!isExp ? "" : "hidden"}>
      ${renderTimelineItems(education, true)}
    </div>
  `;
}

export function renderProjectCards(projects = [], activeCategory = "All", ui, lang = "en") {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  if (!filtered.length) {
    grid.innerHTML = `<p class="empty-state">${escapeHtml(t(ui.projects.empty, lang))}</p>`;
    return;
  }

  grid.innerHTML = filtered
    .map((project) => {
      const thumbHtml = project.image
        ? `
          <div class="project-card__media">
            <img
              src="${escapeHtml(project.image)}"
              alt="${escapeHtml(project.title)} preview"
              class="project-card__img"
              loading="lazy"
              onerror="this.parentElement.classList.add('is-fallback'); this.remove();"
            />
            <div class="project-card__placeholder" translate="no">
              <span class="project-card__placeholder-label">${escapeHtml(project.category)}</span>
            </div>
          </div>
        `
        : `
          <div class="project-card__media is-fallback">
            <div class="project-card__placeholder" translate="no">
              <span class="project-card__placeholder-label">${escapeHtml(project.category)}</span>
            </div>
          </div>
        `;

      const stackHtml = (project.techStack || [])
        .slice(0, 4)
        .map((tech) => `<li class="tag tag--sm" translate="no">${escapeHtml(tech)}</li>`)
        .join("");

      return `
        <article class="card project-card" data-project-id="${escapeHtml(project.id)}" tabindex="0" role="button" aria-label="View details for ${escapeHtml(project.title)}">
          ${thumbHtml}
          <div class="project-card__body">
            <div class="project-card__meta">
              <span class="project-card__category">${escapeHtml(project.category)}</span>
              <span class="project-card__year">${escapeHtml(project.year)}</span>
            </div>
            <h3 class="project-card__title" translate="no">${escapeHtml(project.title)}</h3>
            <p class="project-card__desc">${escapeHtml(t(project.shortDesc, lang))}</p>
            <ul class="tag-list">${stackHtml}</ul>
          </div>
          <div class="project-card__footer">
            <span class="project-card__cta">${escapeHtml(t(ui.projects.inspectCta, lang))} &rarr;</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderProjectsSection(projects = [], ui, lang, activeCategory = "All") {
  const container = document.getElementById("projects-container");
  if (!container) return;

  const categories = ["All", ...new Set(projects.map((p) => p.category).filter(Boolean))];

  const filtersHtml = categories
    .map((cat) => {
      const label = cat === "All" ? t(ui.projects.filterAll, lang) : cat;
      return `
        <button
          class="filter-btn ${cat === activeCategory ? "is-active" : ""}"
          type="button"
          data-filter="${escapeHtml(cat)}"
        >
          ${escapeHtml(label)}
        </button>
      `;
    })
    .join("");

  container.innerHTML = `
    <div class="section__header reveal">
      <span class="section__kicker">${escapeHtml(t(ui.projects.kicker, lang))}</span>
      <h2 class="section__title">${t(ui.projects.titleHtml, lang)}</h2>
      <p class="section__subtitle">${escapeHtml(t(ui.projects.subtitle, lang))}</p>
    </div>

    <div class="filter-bar reveal" role="group" aria-label="Filter projects by category">
      ${filtersHtml}
    </div>

    <div class="projects__grid reveal" id="projects-grid"></div>
  `;

  renderProjectCards(projects, activeCategory, ui, lang);
}

export function renderProjectModal(project, ui, lang = "en") {
  const modalContent = document.getElementById("modal-content");
  if (!modalContent || !project) return;

  const mediaHtml = project.image
    ? `
      <div class="modal__media">
        <img
          src="${escapeHtml(project.image)}"
          alt="${escapeHtml(project.title)}"
          class="modal__img"
          onerror="this.parentElement.remove();"
        />
      </div>
    `
    : "";

  const linksHtml = [
    project.githubUrl
      ? `<a href="${escapeHtml(project.githubUrl)}" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">${escapeHtml(t(ui.projects.modalGithub, lang))}</a>`
      : "",
    project.liveUrl
      ? `<a href="${escapeHtml(project.liveUrl)}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">${escapeHtml(t(ui.projects.modalLive, lang))} &nearr;</a>`
      : ""
  ]
    .filter(Boolean)
    .join("");

  const roleText = t(project.role, lang);

  modalContent.innerHTML = `
    ${mediaHtml}
    <div class="modal__meta">
      <span class="project-card__category">${escapeHtml(project.category)}</span>
      <span class="project-card__year">${escapeHtml(project.year)}</span>
    </div>
    <h3 class="modal__title" id="modal-title" translate="no">${escapeHtml(project.title)}</h3>
    ${roleText ? `<p class="modal__role">${escapeHtml(t(ui.projects.modalRole, lang))}: <strong>${escapeHtml(roleText)}</strong></p>` : ""}
    <p class="modal__desc">${escapeHtml(t(project.fullDesc || project.shortDesc, lang))}</p>

    <div class="modal__stack">
      <h4 class="modal__label">${escapeHtml(t(ui.projects.modalStack, lang))}</h4>
      <ul class="tag-list">
        ${(project.techStack || [])
          .map((tech) => `<li class="tag" translate="no">${escapeHtml(tech)}</li>`)
          .join("")}
      </ul>
    </div>

    ${linksHtml ? `<div class="modal__actions">${linksHtml}</div>` : ""}
  `;
}

function renderAchievements(achievements = [], certifications = [], ui, lang, activeAwardTab = "awards") {
  const section = document.getElementById("achievements");
  const container = document.getElementById("achievements-container");
  const navLink = document.getElementById("nav-achievements-link");
  if (!section || !container) return;

  if (!achievements.length && !certifications.length) {
    section.classList.add("section--hidden");
    if (navLink) navLink.style.display = "none";
    return;
  }

  const renderCards = (items) =>
    items
      .map((item, i) => {
        const titleText = t(item.title, lang);
        const actions = [
          item.image
            ? `<button type="button" class="credential-btn" data-lightbox-src="${escapeHtml(item.image)}" data-lightbox-caption="${escapeHtml(titleText)} — ${escapeHtml(item.issuer)}">${escapeHtml(t(ui.achievements.viewCert, lang))} &nearr;</button>`
            : "",
          item.credentialUrl
            ? `<a href="${escapeHtml(item.credentialUrl)}" class="credential-btn" target="_blank" rel="noopener noreferrer">${escapeHtml(t(ui.achievements.verifyCert, lang))} &nearr;</a>`
            : ""
        ]
          .filter(Boolean)
          .join("");

        return `
          <article class="card achievement-card credential-card reveal" style="--reveal-delay: ${i * 80}ms">
            <div class="achievement-card__top">
              <span class="achievement-card__issuer" translate="no">${escapeHtml(item.issuer)}</span>
              <span class="timeline__period">${escapeHtml(item.year)}</span>
            </div>
            <h3 class="achievement-card__title">${escapeHtml(titleText)}</h3>
            <p class="achievement-card__desc">${escapeHtml(t(item.description, lang))}</p>
            ${actions ? `<div class="credential-card__footer">${actions}</div>` : ""}
          </article>
        `;
      })
      .join("");

  const hasBothTabs = achievements.length > 0 && certifications.length > 0;
  const isAwards = activeAwardTab === "awards" || !certifications.length;

  const tabsHtml = hasBothTabs
    ? `
      <div class="tabs reveal" role="tablist" aria-label="Awards and Certifications">
        <button class="tabs__btn ${isAwards ? "is-active" : ""}" type="button" role="tab" aria-selected="${isAwards}" data-award-tab="awards">
          ${escapeHtml(t(ui.achievements.tabAwards, lang))}
        </button>
        <button class="tabs__btn ${!isAwards ? "is-active" : ""}" type="button" role="tab" aria-selected="${!isAwards}" data-award-tab="certifications">
          ${escapeHtml(t(ui.achievements.tabCertifications, lang))}
        </button>
      </div>
    `
    : "";

  container.innerHTML = `
    <div class="section__header reveal">
      <span class="section__kicker">${escapeHtml(t(ui.achievements.kicker, lang))}</span>
      <h2 class="section__title">${t(ui.achievements.titleHtml, lang)}</h2>
    </div>

    ${tabsHtml}

    <div class="achievements__grid" data-award-panel="awards" ${isAwards ? "" : "hidden"}>
      ${renderCards(achievements)}
    </div>

    ${
      certifications.length
        ? `<div class="achievements__grid" data-award-panel="certifications" ${!isAwards ? "" : "hidden"}>${renderCards(certifications)}</div>`
        : ""
    }
  `;
}

function renderContact(profile, contact = {}, ui, lang) {
  const container = document.getElementById("contact-container");
  if (!container) return;

  const hasForm = Boolean(contact.formspreeEndpoint);
  const socialsHtml = (profile.socials || [])
    .filter((s) => s.url)
    .map(
      (s) => `
      <a href="${escapeHtml(s.url)}" class="social-pill" target="_blank" rel="noopener noreferrer" translate="no">
        ${escapeHtml(s.label)} &nearr;
      </a>
    `
    )
    .join("");

  const formHtml = hasForm
    ? `
      <form class="card contact-form reveal" action="${escapeHtml(contact.formspreeEndpoint)}" method="POST">
        <div class="form-group">
          <label for="contact-name">${escapeHtml(t(ui.contact.nameLabel, lang))}</label>
          <input type="text" id="contact-name" name="name" placeholder="${escapeHtml(t(ui.contact.namePlaceholder, lang))}" required />
        </div>
        <div class="form-group">
          <label for="contact-email">Email</label>
          <input type="email" id="contact-email" name="email" placeholder="you@example.com" required />
        </div>
        <div class="form-group">
          <label for="contact-message">${escapeHtml(t(ui.contact.messageLabel, lang))}</label>
          <textarea id="contact-message" name="message" rows="4" placeholder="${escapeHtml(t(ui.contact.messagePlaceholder, lang))}" required></textarea>
        </div>
        <button type="submit" class="btn btn--primary btn--full">${escapeHtml(t(ui.contact.sendBtn, lang))}</button>
      </form>
    `
    : "";

  container.innerHTML = `
    <div class="section__header ${hasForm ? "" : "section__header--center"} reveal">
      <span class="section__kicker">${escapeHtml(t(ui.contact.kicker, lang))}</span>
      <h2 class="section__title">${escapeHtml(t(contact.heading, lang))}</h2>
      <p class="section__subtitle">${escapeHtml(t(contact.subheading, lang))}</p>
    </div>

    <div class="contact__wrapper ${hasForm ? "" : "contact__wrapper--single"}">
      <div class="card contact-card reveal">
        <span class="contact-card__label">${escapeHtml(t(ui.contact.directEmail, lang))}</span>
        <div class="contact-card__email-row">
          <a href="mailto:${escapeHtml(profile.email)}" class="contact-card__email" translate="no">
            ${escapeHtml(profile.email)}
          </a>
          <button type="button" class="btn btn--secondary btn--sm" id="copy-email-btn" data-email="${escapeHtml(profile.email)}">
            ${escapeHtml(t(ui.contact.copy, lang))}
          </button>
        </div>
        ${socialsHtml ? `<div class="contact-card__socials">${socialsHtml}</div>` : ""}
      </div>
      ${formHtml}
    </div>
  `;
}

function renderFooter(profile, ui, lang) {
  const footer = document.getElementById("footer");
  if (!footer) return;

  const year = new Date().getFullYear();
  footer.innerHTML = `
    <div class="container footer__inner">
      <p class="footer__copy">&copy; ${year} <span translate="no">${escapeHtml(profile.fullName)}</span>.</p>
      <a href="#hero" class="footer__top">${escapeHtml(t(ui.footer.backToTop, lang))} &uarr;</a>
    </div>
  `;
}

export function renderPortfolio(data, lang = "en", state = {}) {
  renderMetaAndNavbar(data.profile, data.ui, lang);
  renderHero(data.profile, data.ui, lang);
  renderAbout(data.profile, data.skills, data.ui, lang);
  renderJourney(data.experience, data.education, data.ui, lang, state.activeTab);
  renderProjectsSection(data.projects, data.ui, lang, state.activeCategory);
  renderAchievements(data.achievements, data.certifications, data.ui, lang, state.activeAwardTab);
  renderContact(data.profile, data.contact, data.ui, lang);
  renderFooter(data.profile, data.ui, lang);
}