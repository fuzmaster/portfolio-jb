document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollReveal();
  initVideoModal();
  initHeroSlider();
  initLatestActivity();
  initContactForm();
});

function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!menuToggle || !navLinks) {
    return;
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initScrollReveal() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll('.section, .project-card, .metric-card, .testimonial-card, .testimonial-card-ui, .stack-card, .activity-card, [data-inview]');

  if (!revealTargets.length) {
    return;
  }

  if (reduced || !('IntersectionObserver' in window)) {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  revealTargets.forEach((target) => observer.observe(target));
}

function initHeroSlider() {
  const slider = document.querySelector('.hero-slider');

  if (!slider) {
    return;
  }

  const slides = Array.from(slider.querySelectorAll('.slide'));
  const dots = Array.from(slider.querySelectorAll('.dot'));

  if (slides.length < 2 || slides.length !== dots.length) {
    slides[0]?.classList.add('active');
    dots[0]?.classList.add('active');
    return;
  }

  let currentSlide = Math.max(0, slides.findIndex((slide) => slide.classList.contains('active')));
  let slideInterval;

  const goToSlide = (index) => {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  };

  const resetInterval = () => {
    window.clearInterval(slideInterval);
    slideInterval = window.setInterval(() => {
      goToSlide((currentSlide + 1) % slides.length);
    }, 4000);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetInterval();
    });
  });

  resetInterval();
}

function initVideoModal() {
  const openBtn = document.getElementById('open-video');
  const closeBtn = document.getElementById('close-video');
  const modal = document.getElementById('video-modal');
  const video = document.getElementById('demo-video');

  if (!openBtn || !closeBtn || !modal || !video) {
    return;
  }

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    video.pause();
  };

  openBtn.addEventListener('click', () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    video.play().catch(() => {
      // Browser policy may block autoplay; controls are available for manual start.
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

function initLatestActivity() {
  const list = document.getElementById('github-activity-list');

  if (!list) {
    return;
  }

  const repoLabels = {
    'srt-fixer': 'SRT Fixer',
    'real-estate-reels': 'Real Estate Reels',
    'artist-alley-break-even': 'Artist Alley Break-Even',
    'peabody-ready-hub': 'Peabody Ready Hub',
    'dehumidifier-sizing-calculator': 'Dehumidifier Calculator',
    'caitlin-portfolio': 'Caitlin Portfolio',
    'portfolio-jb': 'Portfolio',
    'new-portfolio-jbritten': 'Portfolio',
    'max-reels-project': 'Genera Reels',
  };

  const formatRepoName = (name = '') => {
    const slug = String(name).replace(/^fuzmaster\//, '');
    return repoLabels[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()) || 'GitHub';
  };

  const cleanCommitMessage = (message = '') => {
    const firstLine = String(message).split('\n')[0].trim();

    if (!firstLine) {
      return 'Build update';
    }

    return firstLine.length > 72 ? `${firstLine.slice(0, 69)}...` : firstLine;
  };

  const formatDate = (value) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return 'Recently';
    }

    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatEvent = (event) => {
    const repo = formatRepoName(event.repo?.name);
    const payload = event.payload || {};

    if (event.type === 'PushEvent') {
      const count = payload.commits?.length || 1;
      const headline = cleanCommitMessage(payload.commits?.[0]?.message);
      return {
        title: `${repo}: ${headline}`,
        detail: `${count} commit${count === 1 ? '' : 's'} pushed`,
      };
    }

    if (event.type === 'CreateEvent') {
      return {
        title: `${repo}: Created ${payload.ref_type || 'item'}`,
        detail: 'Repository activity',
      };
    }

    if (event.type === 'PullRequestEvent') {
      return {
        title: `${repo}: ${capitalize(payload.action || 'Updated')} pull request`,
        detail: payload.pull_request?.title || 'Pull request activity',
      };
    }

    if (event.type === 'IssuesEvent') {
      return {
        title: `${repo}: ${capitalize(payload.action || 'Updated')} issue`,
        detail: payload.issue?.title || 'Issue activity',
      };
    }

    if (event.type === 'WatchEvent') {
      return {
        title: `${repo}: Starred repository`,
        detail: 'Discovery signal',
      };
    }

    return {
      title: `${repo}: ${event.type?.replace(/Event$/, '') || 'Updated activity'}`,
      detail: 'Public GitHub activity',
    };
  };

  const renderEmpty = (message) => {
    list.replaceChildren();
    const item = document.createElement('li');
    item.className = 'activity-empty';
    item.textContent = message;
    list.append(item);
  };

  fetch('https://api.github.com/users/fuzmaster/events/public?per_page=5', {
    headers: { Accept: 'application/vnd.github+json' },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('GitHub activity could not be loaded.');
      }

      return response.json();
    })
    .then((events) => {
      const publicEvents = Array.isArray(events) ? events.slice(0, 4) : [];

      if (!publicEvents.length) {
        renderEmpty('Recent public GitHub activity will appear here.');
        return;
      }

      list.replaceChildren();
      publicEvents.forEach((event) => {
        const content = formatEvent(event);
        const item = document.createElement('li');
        item.className = 'activity-item';

        const title = document.createElement('span');
        title.className = 'activity-title';
        title.textContent = content.title;

        const meta = document.createElement('span');
        meta.className = 'activity-meta';
        meta.textContent = `${content.detail} / ${formatDate(event.created_at)}`;

        item.append(title, meta);
        list.append(item);
      });
    })
    .catch(() => {
      renderEmpty('Open GitHub for the latest public activity.');
    });
}

function capitalize(value) {
  const text = String(value || '').trim();
  return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : '';
}

function initContactForm() {
  const form = document.getElementById('contact-form');

  if (!form) {
    return;
  }

  const feedback = document.getElementById('form-feedback');
  const submitButton = form.querySelector('button[type="submit"]');

  const setFeedback = (message, state = '') => {
    if (!feedback) {
      return;
    }

    feedback.textContent = message;
    feedback.className = `form-feedback ${state}`.trim();
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      setFeedback('Please complete the required fields.', 'error');
      return;
    }

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      company: String(formData.get('company') || '').trim(),
    };

    submitButton?.setAttribute('disabled', 'true');
    setFeedback('Sending...', 'pending');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'Message failed to send.');
      }

      form.reset();
      setFeedback('Thanks. Your message was sent.', 'success');
    } catch (error) {
      setFeedback(error.message || 'Message failed to send. Please try again.', 'error');
    } finally {
      submitButton?.removeAttribute('disabled');
    }
  });
}
