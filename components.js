class SiteNav extends HTMLElement {
  connectedCallback() {
    const current = this.getAttribute('current') || '';

    const links = [
      { href: 'index.html#about', label: 'About', key: 'about' },
      { href: 'projects.html', label: 'Projects', key: 'projects' },
      { href: 'index.html#testimonials', label: 'References', key: 'references' },
      { href: 'index.html#contact', label: 'Contact', key: 'contact' },
    ];

    const linkMarkup = links
      .map((link) => {
        const active =
          current === link.key ||
          (current === 'home' && link.key === 'about') ||
          (current === 'projects' && link.key === 'projects');

        return `<li><a href="${link.href}"${active ? ' class="active" aria-current="page"' : ''}>${link.label}</a></li>`;
      })
      .join('');

    this.innerHTML = `
      <header class="navbar" id="navbar">
        <div class="container nav-container">
          <a href="index.html" class="logo" aria-label="Jacob Britten home">JACOB BRITTEN</a>
          <nav aria-label="Main navigation">
            <button type="button" class="menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Toggle navigation menu">
              <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
            </button>
            <ul class="nav-links" id="nav-links">
              ${linkMarkup}
              <li class="nav-social">
                <a href="https://github.com/fuzmaster" target="_blank" rel="noopener noreferrer" aria-label="Jacob Britten on GitHub" class="nav-icon-link">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/jacob-britten-a3b52026/" target="_blank" rel="noopener noreferrer" aria-label="Jacob Britten on LinkedIn" class="nav-icon-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </li>
              <li><a class="resume-btn" href="Resume.pdf" download aria-label="Download resume as PDF">Resume</a></li>
            </ul>
          </nav>
        </div>
      </header>
    `;
  }
}

class SectionLabel extends HTMLElement {
  connectedCallback() {
    const text = this.getAttribute('text') || '';
    this.innerHTML = `
      <div class="section-label">
        <span class="label-line" aria-hidden="true"></span>
        <span>${text}</span>
      </div>
    `;
  }
}

class MetricCard extends HTMLElement {
  connectedCallback() {
    const label = this.getAttribute('label') || '';
    const value = this.getAttribute('value') || '';
    const detail = this.getAttribute('detail') || '';

    this.innerHTML = `
      <article class="metric-card" role="listitem">
        <p class="metric-label">${label}</p>
        <p class="metric-value">${value}</p>
        <p class="metric-detail">${detail}</p>
      </article>
    `;
  }
}

class TestimonialCard extends HTMLElement {
  connectedCallback() {
    const quote = this.getAttribute('quote') || '';
    const name = this.getAttribute('name') || '';
    const role = this.getAttribute('role') || '';

    this.innerHTML = `
      <article class="testimonial-card">
        <p class="testimonial-quote">\"${quote}\"</p>
        <p class="testimonial-name">${name}</p>
        <p class="testimonial-role">${role}</p>
      </article>
    `;
  }
}

customElements.define('site-nav', SiteNav);
customElements.define('section-label', SectionLabel);
customElements.define('metric-card', MetricCard);
customElements.define('testimonial-card', TestimonialCard);
