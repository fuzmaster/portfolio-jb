const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => (
    {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[char]
  ));

class SiteNav extends HTMLElement {
  connectedCallback() {
    const current = this.getAttribute('current') || '';

    const links = [
      { href: 'index.html#about', label: 'About', key: 'about' },
      { href: 'lab.html', label: 'The Lab', key: 'lab' },
      { href: 'index.html#testimonials', label: 'References', key: 'references' },
      { href: 'index.html#contact', label: 'Contact', key: 'contact' },
    ];
    const socialLinks = [
      { href: 'https://github.com/fuzmaster', label: 'GitHub' },
      { href: 'https://www.linkedin.com/in/jacob-britten-a3b52026/', label: 'LinkedIn' },
    ];

    const linkMarkup = links
      .map((link) => {
        const active =
          current === link.key ||
          (current === 'home' && link.key === 'about') ||
          (current === 'lab' && link.key === 'lab') ||
          ((current === 'projects' || current === 'work') && link.key === 'lab');

        return `<li><a href="${escapeHtml(link.href)}"${active ? ' class="active"' : ''}>${escapeHtml(link.label)}</a></li>`;
      })
      .join('');
    const socialMarkup = socialLinks
      .map((link) => (
        `<li><a class="nav-social-link" href="${escapeHtml(link.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a></li>`
      ))
      .join('');

    this.innerHTML = `
      <header class="navbar" id="navbar">
        <div class="container nav-container">
          <a href="index.html" class="logo" aria-label="Jacob Britten home">JACOB BRITTEN</a>
          <button type="button" class="menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Toggle navigation">
            <span></span><span></span><span></span>
          </button>
          <ul class="nav-links" id="nav-links">
            ${linkMarkup}
            ${socialMarkup}
            <li><a class="resume-btn" href="Resume.pdf" download>Resume</a></li>
          </ul>
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
        <span>${escapeHtml(text)}</span>
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
        <p class="metric-label">${escapeHtml(label)}</p>
        <p class="metric-value">${escapeHtml(value)}</p>
        <p class="metric-detail">${escapeHtml(detail)}</p>
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
        <p class="testimonial-quote">"${escapeHtml(quote)}"</p>
        <p class="testimonial-name">${escapeHtml(name)}</p>
        <p class="testimonial-role">${escapeHtml(role)}</p>
      </article>
    `;
  }
}

if (!customElements.get('site-nav')) {
  customElements.define('site-nav', SiteNav);
}

if (!customElements.get('section-label')) {
  customElements.define('section-label', SectionLabel);
}

if (!customElements.get('metric-card')) {
  customElements.define('metric-card', MetricCard);
}

if (!customElements.get('testimonial-card')) {
  customElements.define('testimonial-card', TestimonialCard);
}
