/**
 * PORTFOLIO RENDER ENGINE — Revisi 1
 * ---------------------------------------------------------
 * Tetap membaca struktur js/data.js yang sama tanpa perubahan data.
 */

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || "")
    .join("");
}

function renderMetaAndBrand(profile) {
  document.title = `${profile.fullName} — Portfolio`;
  const brandEl = document.getElementById("nav-brand");
  if (brandEl && profile.brandInitials) {
    brandEl.textContent = profile.brandInitials;
  }
}

function renderHero(profile) {
  const heroEl = document.getElementById("hero");
  if (!heroEl) return;

  const statusHtml = profile.statusBadge
    ? `<div class="hero__badge reveal" style="--reveal-delay: 40ms"><span class="hero__badge-dot" aria-hidden="true"></span><span>${escapeHtml(profile.statusBadge)}</span></div>`
    : "";

  const cvButtonHtml = profile.cvUrl
    ? `<a href="${escapeHtml(profile.cvUrl)}" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">Download CV</a>`
    : `<a href="#contact" class="btn btn--secondary">Get in Touch</a>`;

  heroEl.innerHTML = `
    <div class="container">
      <div class="hero__content">
        <div class="hero__orbit-glow" aria-hidden="true"></div>
        ${statusHtml}
        <h1 class="hero__title reveal" style="--reveal-delay: 120ms" translate="no">${escapeHtml(profile.fullName)}</h1>
        <p class="hero__role reveal" style="--reveal-delay: 200ms">${escapeHtml(profile.role)}</p>
        <p class="hero__tagline reveal" style="--reveal-delay: 280ms">${escapeHtml(profile.tagline)}</p>
        <div class="hero__actions reveal" style="--reveal-delay: 360ms">
          <a href="#projects" class="btn btn--primary">Explore Projects</a>
          ${cvButtonHtml}
        </div>
        <a href="#about" class="hero__scroll reveal" style="--reveal-delay: 460ms" aria-label="Scroll to about section">
          <span>Scroll</span>
          <span class="hero__scroll-line"></span>
        </a>
      </div>
    </div>
  `;
}

function renderAbout(profile, skills = []) {
  const container = document.getElementById("about-container");
  if (!container) return;

  const paragraphsHtml = (profile.about || [])
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

  const skillsHtml = skills.length
    ? `
      <div class="skills__grid">
        ${skills
          .map(
            (group, i) => `
          <div class="card skill-card reveal" style="--reveal-delay: ${i * 90}ms">
            <h3 class="skill-card__title">${escapeHtml(group.category)}</h3>
            <ul class="tag-list">
              ${(group.items || [])
                .map((item) => `<li class="tag" translate="no">${escapeHtml(item)}</li>`)
                .join("")}
            </ul>
          </div>
        `
          )
          .join("")}
      </div>
    `
    : "";

  container.innerHTML = `
    <div class="section__header reveal">
      <span class="section__kicker">Overview</span>
      <h2 class="section__title">A bit <em>about</em> me</h2>
    </div>

    <div class="about__grid reveal">
      <div class="card about__bio-card">
        <div>${paragraphsHtml}</div>
        ${
          profile.location
            ? `<div class="about__meta"><span class="about__meta-dot" aria-hidden="true"></span><span>Based in ${escapeHtml(profile.location)}</span></div>`
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

function renderJourney(experience = [], education = []) {
  const container = document.getElementById("journey-container");
  if (!container) return;

  const renderTimelineItems = (items, isEducation = false) =>
    items
      .map(
        (item) => `
      <div class="timeline__node">
        <article class="timeline__item card">
          <div class="timeline__header">
            <div>
              <h3 class="timeline__title">${escapeHtml(isEducation ? item.degree : item.role)}</h3>
              <p class="timeline__org" translate="no">${escapeHtml(isEducation ? item.institution : item.organization)}</p>
            </div>
            <span class="timeline__period">${escapeHtml(item.period)}</span>
          </div>
          <p class="timeline__desc">${escapeHtml(item.description)}</p>
        </article>
      </div>
    `
      )
      .join("");

  container.innerHTML = `
    <div class="section__header reveal">
      <span class="section__kicker">Trajectory</span>
      <h2 class="section__title">Experience & <em>Education</em></h2>
      <p class="section__subtitle">Roles, student initiatives, and academic foundations shaping my work.</p>
    </div>

    <div class="tabs reveal" role="tablist" aria-label="Experience and Education">
      <button class="tabs__btn is-active" type="button" role="tab" aria-selected="true" data-tab="experience">
        Experience
      </button>
      <button class="tabs__btn" type="button" role="tab" aria-selected="false" data-tab="education">
        Education
      </button>
    </div>

    <div class="timeline reveal" data-tab-panel="experience">
      ${renderTimelineItems(experience, false)}
    </div>

    <div class="timeline reveal" data-tab-panel="education" hidden>
      ${renderTimelineItems(education, true)}
    </div>
  `;
}

export function renderProjectCards(projects = [], activeCategory = "All") {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  if (!filtered.length) {
    grid.innerHTML = `<p class="empty-state">No projects found in this category yet.</p>`;
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
            <p class="project-card__desc">${escapeHtml(project.shortDesc)}</p>
            <ul class="tag-list">${stackHtml}</ul>
          </div>
          <div class="project-card__footer">
            <span class="project-card__cta">Inspect Case Study &rarr;</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderProjectsSection(projects = []) {
  const container = document.getElementById("projects-container");
  if (!container) return;

  const categories = ["All", ...new Set(projects.map((p) => p.category).filter(Boolean))];

  const filtersHtml = categories
    .map(
      (cat, idx) => `
      <button
        class="filter-btn ${idx === 0 ? "is-active" : ""}"
        type="button"
        data-filter="${escapeHtml(cat)}"
      >
        ${escapeHtml(cat)}
      </button>
    `
    )
    .join("");

  container.innerHTML = `
    <div class="section__header reveal">
      <span class="section__kicker">Portfolio</span>
      <h2 class="section__title">Selected <em>Work</em></h2>
      <p class="section__subtitle">Click any project card to explore the architecture, role, and source repository.</p>
    </div>

    <div class="filter-bar reveal" role="group" aria-label="Filter projects by category">
      ${filtersHtml}
    </div>

    <div class="projects__grid reveal" id="projects-grid"></div>
  `;

  renderProjectCards(projects, "All");
}

export function renderProjectModal(project) {
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
      ? `<a href="${escapeHtml(project.githubUrl)}" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">Source Code (GitHub)</a>`
      : "",
    project.liveUrl
      ? `<a href="${escapeHtml(project.liveUrl)}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">Live Demo &nearr;</a>`
      : ""
  ]
    .filter(Boolean)
    .join("");

  modalContent.innerHTML = `
    ${mediaHtml}
    <div class="modal__meta">
      <span class="project-card__category">${escapeHtml(project.category)}</span>
      <span class="project-card__year">${escapeHtml(project.year)}</span>
    </div>
    <h3 class="modal__title" id="modal-title" translate="no">${escapeHtml(project.title)}</h3>
    ${project.role ? `<p class="modal__role">Role: <strong>${escapeHtml(project.role)}</strong></p>` : ""}
    <p class="modal__desc">${escapeHtml(project.fullDesc || project.shortDesc)}</p>

    <div class="modal__stack">
      <h4 class="modal__label">Technologies Used</h4>
      <ul class="tag-list">
        ${(project.techStack || [])
          .map((tech) => `<li class="tag" translate="no">${escapeHtml(tech)}</li>`)
          .join("")}
      </ul>
    </div>

    ${linksHtml ? `<div class="modal__actions">${linksHtml}</div>` : ""}
  `;
}

function renderAchievements(achievements = []) {
  const section = document.getElementById("achievements");
  const container = document.getElementById("achievements-container");
  const navLink = document.getElementById("nav-achievements-link");
  if (!section || !container) return;

  if (!achievements.length) {
    section.classList.add("section--hidden");
    if (navLink) navLink.style.display = "none";
    return;
  }

  container.innerHTML = `
    <div class="section__header reveal">
      <span class="section__kicker">Recognition</span>
      <h2 class="section__title">Milestones & <em>Awards</em></h2>
    </div>

    <div class="achievements__grid">
      ${achievements
        .map(
          (item, i) => `
        <article class="card achievement-card reveal" style="--reveal-delay: ${i * 90}ms">
          <div class="achievement-card__top">
            <span class="achievement-card__issuer" translate="no">${escapeHtml(item.issuer)}</span>
            <span class="timeline__period">${escapeHtml(item.year)}</span>
          </div>
          <h3 class="achievement-card__title">${escapeHtml(item.title)}</h3>
          <p class="achievement-card__desc">${escapeHtml(item.description)}</p>
        </article>
      `
        )
        .join("")}
    </div>
  `;
}

function renderContact(profile, contact = {}) {
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
          <label for="contact-name">Name</label>
          <input type="text" id="contact-name" name="name" placeholder="Your name" required />
        </div>
        <div class="form-group">
          <label for="contact-email">Email</label>
          <input type="email" id="contact-email" name="email" placeholder="you@example.com" required />
        </div>
        <div class="form-group">
          <label for="contact-message">Message</label>
          <textarea id="contact-message" name="message" rows="4" placeholder="Tell me about your project or idea..." required></textarea>
        </div>
        <button type="submit" class="btn btn--primary btn--full">Send Message</button>
      </form>
    `
    : "";

  container.innerHTML = `
    <div class="section__header ${hasForm ? "" : "section__header--center"} reveal">
      <span class="section__kicker">Connect</span>
      <h2 class="section__title">${escapeHtml(contact.heading || "Let's Work Together")}</h2>
      <p class="section__subtitle">${escapeHtml(contact.subheading || "")}</p>
    </div>

    <div class="contact__wrapper ${hasForm ? "" : "contact__wrapper--single"}">
      <div class="card contact-card reveal">
        <span class="contact-card__label">Direct Email</span>
        <div class="contact-card__email-row">
          <a href="mailto:${escapeHtml(profile.email)}" class="contact-card__email" translate="no">
            ${escapeHtml(profile.email)}
          </a>
          <button type="button" class="btn btn--secondary btn--sm" id="copy-email-btn" data-email="${escapeHtml(profile.email)}">
            Copy
          </button>
        </div>
        ${socialsHtml ? `<div class="contact-card__socials">${socialsHtml}</div>` : ""}
      </div>
      ${formHtml}
    </div>
  `;
}

function renderFooter(profile) {
  const footer = document.getElementById("footer");
  if (!footer) return;

  const year = new Date().getFullYear();
  footer.innerHTML = `
    <div class="container footer__inner">
      <p class="footer__copy">&copy; ${year} <span translate="no">${escapeHtml(profile.fullName)}</span>.</p>
      <a href="#hero" class="footer__top">Back to top &uarr;</a>
    </div>
  `;
}

export function renderPortfolio(data) {
  renderMetaAndBrand(data.profile);
  renderHero(data.profile);
  renderAbout(data.profile, data.skills);
  renderJourney(data.experience, data.education);
  renderProjectsSection(data.projects);
  renderAchievements(data.achievements);
  renderContact(data.profile, data.contact);
  renderFooter(data.profile);
}