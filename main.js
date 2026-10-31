/* =========================================================
   Portfolio landing page — main.js (vanilla, no dependencies)
   ========================================================= */
(() => {
  'use strict';

  const root = document.documentElement;
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const reduceMQ = matchMedia('(prefers-reduced-motion: reduce)');
  let reduce = reduceMQ.matches;
  const syncMotionPref = () => {
    reduce = reduceMQ.matches;
    root.classList.toggle('no-motion', reduce);
  };
  syncMotionPref();
  reduceMQ.addEventListener?.('change', syncMotionPref);

  /* ---------------------------------------------------------
     DATA — Education & certifications
     Edit this array; the cards are rendered from it.
     Photos: export each institute photo at 2400w (edu-N.jpg),
     1600w (edu-N-1600.jpg) and 800w (edu-N-800.jpg).
     Until a photo exists, the styled placeholder shows instead.
     score: null shows a full ring with a check mark (for certificates without a grade).
     years: "" hides the year chip.
     --------------------------------------------------------- */
  const education = [
    { type: "Degree", title: "BSc in Computer Science & Engineering",
      institute: "Dhaka International University", location: "Dhaka, Bangladesh", years: "2022 – 2026",
      detail: "Focus: programming, algorithms, software development, web technologies",
      label: "CGPA", score: 3.49, scale: 4.00,
      result: "Graduated April 2026", photo: "images/edu-1.jpg",
      color: "var(--accent)", soft: "var(--accent-soft)", text: "var(--accent-text)" },
    { type: "Diploma", title: "Diploma in Engineering — Computer Technology",
      institute: "Jhenaidah Polytechnic Institute", location: "Jhenaidah, Bangladesh", years: "2017 – 2021",
      detail: "Specialisation: software development, graphic design, data management",
      label: "CGPA", score: 3.55, scale: 4.00,
      result: "4-year engineering diploma", photo: "images/edu-2.jpg",
      color: "var(--lilac)", soft: "var(--lilac-soft)", text: "var(--lilac-text)" },
    { type: "Certification", title: "Google Prompting Essentials",
      institute: "Google · Coursera", location: "Online", years: "Nov 2025",
      detail: "4 courses: writing prompts, everyday work tasks, data analysis & presentations, AI as a creative or expert partner",
      label: "Status", score: null, scale: null,
      result: "Completed · 4 courses", photo: "images/edu-3-certificate.png",
      alt: "Google Prompting Essentials certificate awarded to Md Mostafizur Rahman",
      srcset: false, fit: "contain", link: "images/edu-3-certificate.png",
      color: "var(--mint-deep)", soft: "var(--mint-soft)", text: "var(--mint-text)" }
  ];

  // Scores on a small scale (4.00, 5.00) show two decimals; percentages show integers.
  const decimalsFor = (scale) => (scale <= 10 ? 2 : 0);
  const icon = (id) => `<svg class="icon" aria-hidden="true"><use href="#${id}"/></svg>`;

  function renderEducation() {
    const list = $('#edu-list');
    if (!list) return;

    const html = education.map((e) => {
      const graded = typeof e.score === 'number' && typeof e.scale === 'number';
      const pct = graded ? Math.max(0, Math.min(100, (e.score / e.scale) * 100)) : 100;
      const dec = graded ? decimalsFor(e.scale) : 0;
      const ringInner = graded
        ? `<span class="result-ring__score">${(reduce ? e.score : 0).toFixed(dec)}</span>
           <span class="result-ring__scale">of ${e.scale.toFixed(dec)}</span>`
        : `<svg class="icon result-ring__check" aria-hidden="true"><use href="#i-check"/></svg>`;
      const ringLabel = graded ? `${e.label} ${e.score.toFixed(dec)} of ${e.scale.toFixed(dec)}` : `${e.label}: ${e.result}`;
      const base = e.photo.replace(/\.(jpe?g|webp|png)$/i, '');
      const ext = (e.photo.match(/\.(jpe?g|webp|png)$/i) || ['.jpg'])[0];
      return `
      <article class="card card--float edu-card" data-reveal="right"
               style="--c:${e.color};--soft:${e.soft};--t:${e.text}">
        <span class="edu-dot" aria-hidden="true"></span>

        <figure class="edu-photo${e.fit === 'contain' ? ' edu-photo--contain' : ''}">
          <div class="edu-photo__ph" aria-hidden="true">
            ${icon('i-building')}
            <strong>Institute HQ photo</strong>
            <span>UHD · 16:10 · min 2400 × 1500</span>
          </div>
          ${e.link ? `<a class="edu-photo__link" href="${e.link}" target="_blank" rel="noopener">` : ''}
          <img src="${e.photo}"
               ${e.srcset === false ? '' : `srcset="${base}-800${ext} 800w, ${base}-1600${ext} 1600w, ${e.photo} 2400w"
               sizes="(max-width: 767px) 92vw, 440px"`}
               alt="${e.alt || `${e.institute} main building`}" width="2400" height="1500"
               loading="lazy" decoding="async">
          ${e.link ? `<span class="sr-only"> (opens full size in a new tab)</span></a>` : ''}
        </figure>

        <div class="edu-details">
          <div class="edu-chips">
            <span class="chip" style="--soft:${e.soft};--text:${e.text}">${e.type}</span>
            ${e.years ? `<span class="chip chip--year">${icon('i-calendar')}${e.years}</span>` : ''}
          </div>
          <h3 class="edu-title">${e.title}</h3>
          <p class="edu-row edu-inst">${icon('i-cap')}${e.institute}</p>
          <p class="edu-row edu-loc sm">${icon('i-pin')}${e.location}</p>
          <p class="sm edu-detail">${e.detail}</p>
        </div>

        <div class="edu-result">
          <div class="result-ring" role="img" aria-label="${ringLabel}"
               style="--p:${reduce ? pct : 0}" data-pct="${pct}" data-score="${graded ? e.score : ''}" data-dec="${dec}">
            <div class="result-ring__inner" aria-hidden="true">
              ${ringInner}
            </div>
          </div>
          <div class="edu-result__text">
            <span class="edu-result__label">${e.label}</span>
            <span class="edu-result__line">${e.result}</span>
            <span class="edu-result__line edu-detail-m">${e.detail}</span>
          </div>
        </div>
      </article>`;
    }).join('');

    list.insertAdjacentHTML('beforeend', html);

    // Show the real photo once it loads; drop it (keep the placeholder) if it is missing.
    $$('.edu-photo img', list).forEach((img) => {
      const ok = () => img.classList.add('is-loaded');
      const fail = () => img.remove();
      if (img.complete) { img.naturalWidth ? ok() : null; }
      img.addEventListener('load', ok);
      img.addEventListener('error', fail);
    });
  }
  renderEducation();

  /* ---------------------------------------------------------
     NAV — mobile menu (M11 visuals in CSS)
     --------------------------------------------------------- */
  const header = $('.site-header');
  const toggle = $('.nav__toggle');
  const menu = $('#mobile-menu');

  $$(':scope > *', menu).forEach((el, i) => el.style.setProperty('--i', i));

  const setMenu = (open) => {
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setMenu(!header.classList.contains('menu-open')));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('menu-open')) { setMenu(false); toggle.focus(); }
  });
  document.addEventListener('click', (e) => {
    if (header.classList.contains('menu-open') && !e.target.closest('.nav, .mobile-menu')) setMenu(false);
  });

  /* ---------------------------------------------------------
     SERVICES — chevron cycles the featured card (M8)
     --------------------------------------------------------- */
  const services = $$('.svc');
  const nextBtn = $('.svc-next');
  let featured = 0;
  let chevronTurn = 0;
  nextBtn.addEventListener('click', () => {
    services[featured].classList.remove('is-featured');
    featured = (featured + 1) % services.length;
    const card = services[featured];
    card.classList.add('is-featured');
    card.classList.remove('is-nudge');
    void card.offsetWidth; // restart the nudge animation
    card.classList.add('is-nudge');
    chevronTurn += 180;
    $('.icon', nextBtn).style.transform = `rotate(${chevronTurn}deg)`;
  });
  services.forEach((s) => s.addEventListener('animationend', (e) => {
    if (e.animationName === 'nudge') s.classList.remove('is-nudge');
  }));

  /* ---------------------------------------------------------
     WORK — filter tabs (M19)
     --------------------------------------------------------- */
  const tabsWrap = $('.tabs');
  const track = $('.tabs__track');
  const pill = $('.tabs__pill');
  const tabs = $$('.tab', track);
  const grid = $('.work-grid');
  const items = $$('.work-item', grid);
  let filterToken = 0;
  let heightTimer;

  const placePill = () => {
    const active = tabs.find((t) => t.getAttribute('aria-pressed') === 'true');
    if (!active) return;
    pill.style.width = `${active.offsetWidth}px`;
    pill.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`;
  };
  tabsWrap.classList.add('has-pill');
  placePill();
  requestAnimationFrame(() => requestAnimationFrame(() => pill.classList.add('is-ready')));
  document.fonts?.ready.then(placePill);
  if ('ResizeObserver' in window) new ResizeObserver(placePill).observe(track);

  // "View all work": show the first few projects, expand to show the rest.
  // How many cards show before expanding — change these numbers if you like.
  const WORK_LIMIT = { mobile: 3, tablet: 4, desktop: 3 };
  const mqMobile = matchMedia('(max-width: 767px)');
  const mqTablet = matchMedia('(min-width: 768px) and (max-width: 1023px)');
  const moreBtn = $('.work-more');
  const moreLabel = $('.work-more__label', moreBtn);
  const moreCount = $('.work-more__count', moreBtn);
  let workExpanded = false;

  const workLimit = () => (mqMobile.matches ? WORK_LIMIT.mobile : mqTablet.matches ? WORK_LIMIT.tablet : WORK_LIMIT.desktop);

  // Marks cards past the limit with .is-over (hidden by CSS) and updates the button.
  const applyLimit = () => {
    const limit = workExpanded ? Infinity : workLimit();
    let n = 0;
    items.forEach((it) => {
      if (it.hidden) { it.classList.remove('is-over'); return; }
      it.classList.toggle('is-over', n >= limit);
      n += 1;
    });
    const extra = n - workLimit();
    moreBtn.hidden = extra <= 0;
    moreBtn.setAttribute('aria-expanded', String(workExpanded));
    moreLabel.textContent = workExpanded ? 'Show less' : 'View all work';
    moreCount.textContent = workExpanded ? '' : `+${extra}`;
    moreCount.hidden = workExpanded;
  };

  // Smoothly animates the grid from its old height to its new one.
  const animateGridHeight = (startH, token) => {
    if (reduce) return;
    grid.style.height = '';
    const endH = grid.offsetHeight;
    if (endH === startH) return;
    grid.style.height = `${startH}px`;
    void grid.offsetHeight;
    grid.style.height = `${endH}px`;
    clearTimeout(heightTimer);
    heightTimer = setTimeout(() => { if (token === filterToken) grid.style.height = ''; }, 360);
  };

  const playEnter = (list) => list.forEach((it, i) => {
    it.style.setProperty('--i', i);
    it.classList.remove('is-entering');
    void it.offsetWidth;
    it.classList.add('is-entering');
  });

  moreBtn.addEventListener('click', () => {
    const token = ++filterToken;
    const startH = grid.offsetHeight;
    const shownBefore = new Set(items.filter((it) => !it.hidden && !it.classList.contains('is-over')));
    workExpanded = !workExpanded;
    applyLimit();
    if (workExpanded) {
      playEnter(items.filter((it) => !it.hidden && !it.classList.contains('is-over') && !shownBefore.has(it)));
    } else if (grid.getBoundingClientRect().top < 0) {
      // Collapsing from far down the page: bring the section back into view.
      $('#work').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }
    animateGridHeight(startH, token);
  });

  const onBreakpoint = () => applyLimit();
  mqMobile.addEventListener?.('change', onBreakpoint);
  mqTablet.addEventListener?.('change', onBreakpoint);
  applyLimit();

  const applyFilter = (cat) => {
    const token = ++filterToken;
    const matches = (it) => cat === 'all' || it.dataset.cat === cat;
    const leaving = items.filter((it) => !it.hidden && !matches(it));
    const entering = items.filter((it) => it.hidden && matches(it));
    const startH = grid.offsetHeight;

    leaving.forEach((it) => { it.classList.remove('is-entering'); it.classList.add('is-leaving'); });

    const swap = () => {
      if (token !== filterToken) return;
      leaving.forEach((it) => { it.hidden = true; it.classList.remove('is-leaving'); });
      entering.forEach((it) => { it.hidden = false; });
      playEnter(entering);
      applyLimit();
      animateGridHeight(startH, token);
    };

    if (reduce || leaving.length === 0) swap();
    else setTimeout(swap, 200);
  };

  items.forEach((it) => it.addEventListener('animationend', (e) => {
    if (e.animationName === 'fade-up') it.classList.remove('is-entering');
  }));

  tabs.forEach((tab) => tab.addEventListener('click', () => {
    if (tab.getAttribute('aria-pressed') === 'true') return;
    tabs.forEach((t) => t.setAttribute('aria-pressed', String(t === tab)));
    placePill();
    applyFilter(tab.dataset.filter);
  }));

  /* ---------------------------------------------------------
     CTA — contact form (M21)
     Sends name, email and message to your inbox through FormSubmit (formsubmit.co).
     First use: FormSubmit emails an "Activate form" link to data-to. Click it once.
     --------------------------------------------------------- */
  const form = $('.cta-form');
  const fieldsWrap = $('.cta-form__fields', form);
  const nameIn = $('#cta-name');
  const emailIn = $('#cta-email');
  const msgIn = $('#cta-msg');
  const honey = $('.cta-form__hp', form);
  const errorEl = $('#cta-error');
  const sendBtn = $('.cta-form__send');
  const sendText = $('.cta-form__send-text', sendBtn);
  const success = $('.cta-form__success');
  const successText = $('.cta-form__success-text', success);
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const ENDPOINT = `https://formsubmit.co/ajax/${form.dataset.to}`;
  const inputs = [nameIn, emailIn, msgIn];

  const rules = [
    [nameIn, (v) => v.length >= 2, 'Please enter your name.'],
    [emailIn, (v) => EMAIL_RE.test(v), 'Enter a valid email, like name@company.com'],
    [msgIn, (v) => v.length >= 10, 'Tell me a little about your project (at least 10 characters).'],
  ];

  const markInvalid = (el, on) => {
    el.classList.toggle('is-invalid', on);
    if (on) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
  };
  const shake = (el) => {
    el.classList.remove('is-shaking');
    void el.offsetWidth;
    el.classList.add('is-shaking');
  };
  const showError = (text) => { errorEl.textContent = text; };

  inputs.forEach((el) => {
    el.addEventListener('animationend', () => el.classList.remove('is-shaking'));
    el.addEventListener('input', () => {
      const rule = rules.find((r) => r[0] === el);
      if (el.classList.contains('is-invalid') && rule[1](el.value.trim())) {
        markInvalid(el, false);
        if (!inputs.some((i) => i.classList.contains('is-invalid'))) showError('');
      }
    });
  });

  const setSending = (on) => {
    sendBtn.disabled = on;
    sendBtn.classList.toggle('is-sending', on);
    sendText.textContent = on ? 'Sending…' : 'Send message';
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (sendBtn.disabled) return;

    // Validate every field; focus the first one that is wrong.
    let firstBad = null;
    rules.forEach(([el, ok, text]) => {
      const bad = !ok(el.value.trim());
      markInvalid(el, bad);
      if (bad && !firstBad) firstBad = { el, text };
    });
    if (firstBad) {
      showError(firstBad.text);
      shake(firstBad.el);
      firstBad.el.focus();
      return;
    }
    showError('');

    const name = nameIn.value.trim();
    const email = emailIn.value.trim();
    const message = msgIn.value.trim();

    // Bots fill the hidden field: pretend it worked, send nothing.
    if (honey.value) { finish(name); return; }

    setSending(true);
    sendBtn.classList.add('is-pressed');
    setTimeout(() => sendBtn.classList.remove('is-pressed'), 120);

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name, email, message,
          _subject: `New portfolio inquiry from ${name}`,
          _replyto: email,
          _template: 'table',
          _honey: '',
        }),
      });
      const data = await res.json().catch(() => ({}));
      const ok = res.ok && String(data.success) === 'true';
      if (!ok) throw new Error(data.message || `HTTP ${res.status}`);
      sendBtn.classList.add('is-flying');
      setTimeout(() => finish(name), reduce ? 0 : 400);
    } catch (err) {
      console.warn('Contact form:', err.message);
      setSending(false);
      showError(`Sorry, your message couldn't be sent right now. Please email me directly at ${form.dataset.to}.`);
    }
  });

  function finish(name) {
    fieldsWrap.hidden = true;
    successText.textContent = `Thanks, ${name.split(' ')[0]}! Your message has been sent. I'll get back to you soon.`;
    success.hidden = false;
    success.classList.add('is-shown');
    success.focus();
  }

  /* =========================================================
     ===== MOTION =====
     ========================================================= */

  /* --- Count-up helper (M15, M18) --- */
  const countUp = (el, target, { decimals = 0, prefix = '', suffix = '', duration = 1400, delay = 0, format = null } = {}) => {
    const write = (v) => { el.textContent = prefix + (format ? format(v) : v.toFixed(decimals)) + suffix; };
    if (reduce) { write(target); return; }
    setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        write(target * (1 - Math.pow(1 - t, 3))); // ease-out cubic
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
  };

  /* --- Stagger indices --- */
  $$('[data-stagger]').forEach((group) => {
    $$('[data-reveal]', group).forEach((el, i) => el.style.setProperty('--i', i));
  });

  /* --- Shared reveal observer (adds .is-in once, then fires "inview") --- */
  const onInView = (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('is-in');
      el.dispatchEvent(new CustomEvent('inview'));
      obs.unobserve(el);
    });
  };
  const revealTargets = $$('[data-reveal], [data-inview], [data-count]');
  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver(onInView, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    revealTargets.forEach((el) => revealObs.observe(el));
  } else {
    revealTargets.forEach((el) => { el.classList.add('is-in'); el.dispatchEvent(new CustomEvent('inview')); });
  }

  /* --- Platform logos: endless marquee (static wrapped row under reduced motion / no JS) --- */
  const logoViewport = $('.logos__viewport');
  if (logoViewport && !reduce) {
    const track = $('.logos__track', logoViewport);
    const row = $('.logos__row', track);
    const clone = row.cloneNode(true);           // second copy makes the loop seamless
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelectorAll('.sr-only').forEach((el) => el.remove());
    clone.querySelectorAll('[title]').forEach((el) => el.removeAttribute('title'));
    track.appendChild(clone);
    logoViewport.classList.add('is-marquee');
    // Keep the speed constant (~40px per second) whatever the row width.
    const setSpeed = () => track.style.setProperty('--marquee-dur', `${Math.max(20, row.scrollWidth / 40)}s`);
    setSpeed();
    document.fonts?.ready.then(setSpeed);
  }

  /* --- M0 Hero load sequence --- */
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('is-loaded')));

  /* --- M1 Nav shrink on scroll --- */
  let scrollTicking = false;
  const onScroll = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
      scrollTicking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- M12 Scroll-spy + sliding dot --- */
  const navLinks = $$('.nav__links a');
  const navDot = $('.nav__dot');
  const linkFor = (id) => navLinks.find((a) => a.getAttribute('href') === `#${id}`);
  let activeLink = navLinks[0];

  const placeDot = () => {
    if (!activeLink || !activeLink.offsetWidth) return;
    navDot.style.transform = `translateX(${activeLink.offsetLeft + activeLink.offsetWidth / 2 - 3}px)`;
  };
  const setActive = (link) => {
    if (!link || link === activeLink) return;
    navLinks.forEach((a) => { a.classList.toggle('is-active', a === link); a.removeAttribute('aria-current'); });
    link.setAttribute('aria-current', 'true');
    activeLink = link;
    placeDot();
  };
  placeDot();
  requestAnimationFrame(() => navDot.classList.add('is-ready'));
  document.fonts?.ready.then(placeDot);
  window.addEventListener('resize', placeDot, { passive: true });

  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Sections without their own nav link keep the previous link active.
        if (entry.isIntersecting) setActive(linkFor(entry.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main > section[id]').forEach((s) => spy.observe(s));
  }

  /* --- M13/M15 Education result rings fill + count once each card reveals --- */
  $$('.edu-card').forEach((card) => {
    card.addEventListener('inview', () => {
      const ring = $('.result-ring', card);
      const scoreEl = $('.result-ring__score', card);
      const i = parseFloat(getComputedStyle(card).getPropertyValue('--i')) || 0;
      const delay = i * 150 + 300;
      const pct = parseFloat(ring.dataset.pct);
      if (reduce) { ring.style.setProperty('--p', pct); return; }
      setTimeout(() => ring.style.setProperty('--p', pct), delay);
      if (scoreEl && ring.dataset.score !== '') {
        countUp(scoreEl, parseFloat(ring.dataset.score), { decimals: Number(ring.dataset.dec), duration: 1200, delay });
      }
    }, { once: true });
  });

  /* --- M18 Stat numbers count-up (skipped while still [placeholders]) --- */
  $$('[data-count]').forEach((el) => {
    el.addEventListener('inview', () => {
      const raw = el.dataset.count;
      const target = Number(raw);
      if (raw === '' || Number.isNaN(target)) return; // placeholder: fade in only
      const decimals = (raw.split('.')[1] || '').length;
      countUp(el, target, { decimals, prefix: el.dataset.prefix || '', suffix: el.dataset.suffix || '' });
    }, { once: true });
  });

  /* --- M22 Mobile sticky bar: show once the hero leaves the viewport --- */
  const mobileCta = $('.mobile-cta');
  const hero = $('#home');
  if ('IntersectionObserver' in window && mobileCta && hero) {
    new IntersectionObserver(([entry]) => {
      mobileCta.classList.toggle('is-visible', !entry.isIntersecting);
    }).observe(hero);
  } else if (mobileCta) {
    mobileCta.classList.add('is-visible');
  }

  /* --- Total visitor counter (footer) ---
     Uses Abacus (abacus.jasoncameron.dev), a free no-signup counter service.
     Each browser is counted once per 24 hours; local testing and bots only read the number. */
  const visitsBox = $('.footer__visits');
  if (visitsBox && 'fetch' in window) {
    const VISITS_API = 'https://abacus.jasoncameron.dev';
    const VISITS_NS = 'mostafizur-ai-portfolio';
    const VISITS_KEY = 'visitors';
    const DAY = 24 * 60 * 60 * 1000;
    const numEl = $('[data-visits]', visitsBox);
    const fmt = new Intl.NumberFormat('en-US');

    const isLocal = location.protocol === 'file:' || /^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(location.hostname);
    const isBot = navigator.webdriver || /bot|crawl|spider|slurp|lighthouse|headless/i.test(navigator.userAgent);
    let countedToday = false;
    try { countedToday = Date.now() - Number(localStorage.getItem('mr-visit-at') || 0) < DAY; } catch (e) { /* storage blocked */ }
    const action = isLocal || isBot || countedToday ? 'get' : 'hit';

    fetch(`${VISITS_API}/${action}/${VISITS_NS}/${VISITS_KEY}`, { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data) => {
        const total = Number(data.value);
        if (!Number.isFinite(total) || total < 1) return;
        if (action === 'hit') { try { localStorage.setItem('mr-visit-at', String(Date.now())); } catch (e) { /* ignore */ } }
        numEl.textContent = fmt.format(total);
        visitsBox.setAttribute('aria-label', `${fmt.format(total)} total visitors`);
        visitsBox.hidden = false;
        visitsBox.classList.add('is-shown');
        // Count up once the footer scrolls into view
        if ('IntersectionObserver' in window && !reduce) {
          numEl.textContent = '0';
          const io = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            io.disconnect();
            countUp(numEl, total, { duration: 1600, format: (v) => fmt.format(Math.round(v)) });
          }, { threshold: 0.6 });
          io.observe(visitsBox);
        }
      })
      .catch(() => { /* service unreachable: keep the badge hidden */ });
  }

  /* --- Pause loops: hidden tab + off-screen elements --- */
  document.addEventListener('visibilitychange', () => root.classList.toggle('is-paused', document.hidden));
  if ('IntersectionObserver' in window) {
    const loopObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-offscreen', !entry.isIntersecting));
    }, { rootMargin: '100px 0px' });
    $$('.loop').forEach((el) => loopObs.observe(el));
  }
})();
