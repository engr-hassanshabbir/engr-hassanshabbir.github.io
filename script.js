/* Hassan Shabbir — site interactions (vanilla JS, no dependencies) */
(function () {
  'use strict';
  window.__siteReady = true;

  var doc = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var hasIO = 'IntersectionObserver' in window;
  var now = new Date();
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // ---------- Page-load sequence ----------
  requestAnimationFrame(function () { requestAnimationFrame(function () { doc.classList.add('is-loaded'); }); });

  // ---------- Dates ----------
  $$('[data-year]').forEach(function (el) { el.textContent = String(now.getFullYear()); });
  $$('[data-rev]').forEach(function (el) { el.textContent = MON[now.getMonth()] + ' ' + now.getFullYear(); });

  // ---------- Navigation: scrolled state, progress, quick bar ----------
  var nav = $('#nav');
  var progress = $('.nav__progress span');
  var hero = $('.hero');
  var quickbar = $('.quickbar');
  var contact = $('#contact');
  var contactVisible = false;
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var max = doc.scrollHeight - window.innerHeight;
    var heroBottom = hero ? hero.offsetHeight - 70 : 400;
    nav.classList.toggle('is-scrolled', y > 8);
    if (progress) progress.style.setProperty('--p', max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
    if (quickbar) quickbar.classList.toggle('is-visible', y > heroBottom * 0.7 && !contactVisible);
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  if (hasIO && contact) {
    new IntersectionObserver(function (entries) { contactVisible = entries[0].isIntersecting; onScroll(); }, { rootMargin: '0px 0px -10% 0px' }).observe(contact);
  }

  // ---------- Mobile menu ----------
  var toggle = $('.nav__toggle');
  var menu = $('#menu');
  var menuOpen = false;
  function setMenu(open, returnFocus) {
    menuOpen = open;
    menu.classList.toggle('is-open', open);
    doc.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) {
      var first = $('.menu__link', menu);
      setTimeout(function () { if (first) first.focus({ preventScroll: true }); }, 60);
    } else if (returnFocus) {
      toggle.focus({ preventScroll: true });
    }
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () { setMenu(!menuOpen, true); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false, false); }); });
    document.addEventListener('keydown', function (e) {
      if (!menuOpen) return;
      if (e.key === 'Escape') { setMenu(false, true); return; }
      if (e.key === 'Tab') {
        var f = [toggle].concat($$('a, button', menu));
        var idx = f.indexOf(document.activeElement);
        if (e.shiftKey && idx <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && idx === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
    window.addEventListener('resize', function () { if (menuOpen && window.innerWidth >= 1024) setMenu(false, false); });
  }

  // ---------- Active section indicator ----------
  var navLinks = $$('.nav__link');
  var menuLinks = $$('.menu__link');
  var indicator = $('.nav__indicator');
  var navList = $('.nav__links');
  function setActive(id) {
    navLinks.concat(menuLinks).forEach(function (a) {
      if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
    if (!indicator || !navList) return;
    var active = navLinks.filter(function (a) { return a.getAttribute('href') === '#' + id; })[0];
    if (!active) { indicator.style.opacity = '0'; return; }
    var lr = active.getBoundingClientRect(), pr = navList.getBoundingClientRect();
    indicator.style.width = (lr.width - 26) + 'px';
    indicator.style.transform = 'translateX(' + (lr.left - pr.left + 13) + 'px)';
    indicator.style.opacity = '1';
  }
  if (hasIO) {
    var map = {};
    var current = null;
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var id = map[e.target.id] || e.target.id;
          if (id !== current) { current = id; setActive(id); }
        } else if (e.target.id === 'expertise' && e.boundingClientRect.top > 0) { current = null; setActive(''); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['expertise', 'experience', 'projects', 'credentials', 'contact'].forEach(function (id) { var el = document.getElementById(id); if (el) spy.observe(el); });
    window.addEventListener('resize', function () { if (current) setActive(current); });
  }

  // ---------- Scroll reveals ----------
  var revealEls = $$('[data-reveal]');
  if (hasIO && !reduce) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); revealIO.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    revealEls.forEach(function (el) { revealIO.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  // ---------- Count-up numbers ----------
  var counters = $$('[data-count]');
  if (hasIO && !reduce) {
    counters.forEach(function (el) { el.textContent = '0'; });
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        countIO.unobserve(e.target);
        var el = e.target, target = parseInt(el.getAttribute('data-count'), 10), t0 = null, dur = target > 50 ? 1600 : 1100;
        (function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min(1, (ts - t0) / dur);
          el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        })(performance.now());
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countIO.observe(el); });
  }

  // ---------- Organisations strip: seamless slow marquee ----------
  var orgView = $('.orgs__viewport');
  var orgTrack = $('.orgs__track');
  if (orgView && orgTrack && !reduce) {
    $$('.org', orgTrack).forEach(function (li) {
      var c = li.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      $$('img', c).forEach(function (im) { im.alt = ''; });
      orgTrack.appendChild(c);
    });
    orgView.classList.add('is-marquee');
  }

  // ---------- Add-your-own project photos ----------
  // Upload photos/<key>.jpg (e.g. photos/six-senses.jpg) and it replaces the area photo automatically.
  // The folder ships with 1-pixel placeholder files under those names, which are ignored.
  var probeCache = {};
  function probe(src, cb) {
    if (probeCache[src]) { if (probeCache[src].done) cb(probeCache[src].ok); else probeCache[src].push(cb); return; }
    var list = probeCache[src] = [cb];
    var img = new Image();
    img.onload = function () { var ok = img.naturalWidth > 4; list.done = true; list.ok = ok; list.forEach(function (f) { f(ok); }); };
    img.onerror = function () { list.done = true; list.ok = false; list.forEach(function (f) { f(false); }); };
    img.src = src;
  }
  var photoTargets = $$('[data-photo]');
  function loadOwnPhotos() {
    photoTargets.forEach(function (el) {
      var src = 'photos/' + el.getAttribute('data-photo') + '.jpg';
      probe(src, function (ok) {
        if (!ok) return;
        var area = $('.photo', el);
        if (area) { area.src = src; area.classList.add('is-own'); }
        var tag = $('.art-tag', el); if (tag) tag.textContent = 'Project photo';
      });
    });
  }
  if (hasIO && photoTargets.length) {
    var photoIO = new IntersectionObserver(function (en) {
      if (en.some(function (e) { return e.isIntersecting; })) { photoIO.disconnect(); loadOwnPhotos(); }
    }, { rootMargin: '600px 0px' });
    photoTargets.forEach(function (el) { photoIO.observe(el); });
  } else { loadOwnPhotos(); }

  // ---------- Primavera P6 career schedule ----------
  var p6 = $('.p6');
  if (p6) {
    var grid = $('.p6__grid', p6);
    var months = (now.getFullYear() - 2021) * 12 + now.getMonth() + (now.getDate() - 1) / 31;
    months = Math.max(63.5, months);                         // never before the current role's start
    var span = Math.max(72, Math.ceil((months + 4) / 12) * 12);
    grid.style.setProperty('--dd', months.toFixed(2));
    grid.style.setProperty('--span', String(span));
    var yy = String(now.getFullYear()).slice(2);
    $$('[data-today-short]', p6).forEach(function (el) { el.textContent = MON[now.getMonth()] + '-' + yy; });
    $$('[data-today-long]', p6).forEach(function (el) { el.textContent = ('0' + now.getDate()).slice(-2) + '-' + MON[now.getMonth()] + '-' + yy; });
    var years = $('.p6__years', p6), halves = $('.p6__halves', p6);
    for (var y = 0; y < span / 12; y++) {
      var pos = (y * 12 / span * 100).toFixed(3) + '%';
      var ys = document.createElement('span'); ys.style.left = pos; ys.textContent = String(2021 + y); years.appendChild(ys);
      var yi = document.createElement('i'); yi.style.left = pos; years.appendChild(yi);
      ['H1', 'H2'].forEach(function (h, k) {
        var hp = ((y * 12 + k * 6) / span * 100).toFixed(3) + '%';
        var hs = document.createElement('span'); hs.style.left = hp; hs.textContent = h; halves.appendChild(hs);
        var hi = document.createElement('i'); hi.style.left = hp; halves.appendChild(hi);
      });
    }
    // Select a row, then scroll to the matching role card and flash it
    $$('a.p6__row', p6).forEach(function (row) {
      row.addEventListener('click', function () {
        $$('.p6__row.is-sel', p6).forEach(function (r) { r.classList.remove('is-sel'); });
        row.classList.add('is-sel');
        var target = document.getElementById(row.getAttribute('href').slice(1));
        if (!target) return;
        target.classList.remove('is-flash'); void target.offsetWidth;
        setTimeout(function () { target.classList.add('is-flash'); }, reduce ? 0 : 450);
      });
    });
  }

  // ---------- Project detail dialog ----------
  var dialog = $('#project-modal');
  var projects = $$('.project');
  var activeIdx = -1;
  var lastTrigger = null;
  function fillModal(i, dir) {
    var card = projects[i];
    if (!card || !dialog) return;
    activeIdx = i;
    var art = $('.modal__art', dialog);
    art.innerHTML = '';
    var photo = $('.project__art .photo', card);
    if (photo) { var ph = photo.cloneNode(true); ph.loading = 'eager'; art.appendChild(ph); }
    var region = $('.region', card), tag = $('.art-tag', card);
    if (region) art.appendChild(region.cloneNode(true));
    if (tag) art.appendChild(tag.cloneNode(true));
    $('.modal__cat', dialog).textContent = $('.project__cat', card).textContent;
    $('.modal__title', dialog).textContent = $('.project__open', card).textContent;
    var badgeWrap = $('.modal__badges', dialog);
    badgeWrap.innerHTML = '';
    var badges = $('.badges', card);
    if (badges) badgeWrap.appendChild(badges.cloneNode(true));
    var content = $('.modal__content', dialog);
    content.innerHTML = '';
    var detail = $('.project__detail', card);
    if (detail) Array.prototype.forEach.call(detail.children, function (n) { content.appendChild(n.cloneNode(true)); });
    $('.modal__count', dialog).textContent = (i + 1) + ' / ' + projects.length;
    if (dir && !reduce) {
      content.style.setProperty('--swap-x', dir > 0 ? '14px' : '-14px');
      content.classList.remove('is-swapping'); void content.offsetWidth; content.classList.add('is-swapping');
    }
    $('.modal__scroll', dialog).scrollTop = 0;
  }
  function openModal(i, trigger) {
    if (!dialog || typeof dialog.showModal !== 'function') return;
    lastTrigger = trigger || document.activeElement;
    fillModal(i);
    dialog.showModal();
    doc.classList.add('menu-open');
    requestAnimationFrame(function () { dialog.classList.add('is-open'); });
    var closeBtn = $('.modal__close', dialog);
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  }
  function closeModal() {
    if (!dialog || !dialog.open) return;
    dialog.classList.remove('is-open');
    var done = function () {
      dialog.close();
      doc.classList.remove('menu-open');
      if (lastTrigger && lastTrigger.focus) lastTrigger.focus({ preventScroll: true });
    };
    if (reduce) done(); else setTimeout(done, 300);
  }
  if (dialog) {
    projects.forEach(function (card, i) {
      var btn = $('.project__open', card);
      if (btn) btn.addEventListener('click', function () { openModal(i, btn); });
    });
    $$('[data-open-project]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-open-project');
        var idx = projects.findIndex(function (p) { return p.getAttribute('data-project') === key; });
        if (idx > -1) openModal(idx, btn);
      });
    });
    $$('[data-close]', dialog).forEach(function (b) { b.addEventListener('click', closeModal); });
    $$('[data-step]', dialog).forEach(function (b) {
      b.addEventListener('click', function () {
        var step = parseInt(b.getAttribute('data-step'), 10);
        fillModal((activeIdx + step + projects.length) % projects.length, step);
      });
    });
    dialog.addEventListener('cancel', function (e) { e.preventDefault(); closeModal(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) closeModal(); });
    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') fillModal((activeIdx + 1) % projects.length, 1);
      if (e.key === 'ArrowLeft') fillModal((activeIdx - 1 + projects.length) % projects.length, -1);
    });
  }

  // ---------- Capability matrix ----------
  var matrix = $('#matrix');
  if (matrix) {
    $$('.matrix__row', matrix).forEach(function (row, i) {
      var btn = $('button', row);
      var ev = document.getElementById(btn.getAttribute('aria-controls'));
      var open = i === 0;
      btn.setAttribute('aria-expanded', String(open));
      row.classList.toggle('is-open', open);
      if (ev) ev.hidden = !open;
      btn.addEventListener('click', function () {
        var isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!isOpen));
        row.classList.toggle('is-open', !isOpen);
        if (ev) ev.hidden = isOpen;
      });
    });
    if (finePointer) {
      matrix.addEventListener('pointerover', function (e) {
        var cell = e.target.closest('[data-col]');
        if (cell) matrix.setAttribute('data-hcol', cell.getAttribute('data-col')); else matrix.removeAttribute('data-hcol');
      });
      matrix.addEventListener('pointerleave', function () { matrix.removeAttribute('data-hcol'); });
    }
  }

  // ---------- Copy to clipboard ----------
  var toast = $('.toast');
  var toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-on'); setTimeout(function () { toast.textContent = ''; }, 300); }, 2200);
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy') ? resolve() : reject(); } catch (err) { reject(err); }
      document.body.removeChild(ta);
    });
  }
  $$('[data-copy]').forEach(function (btn) {
    var use = $('use', btn);
    btn.addEventListener('click', function () {
      var label = btn.getAttribute('data-label') || 'Text';
      copyText(btn.getAttribute('data-copy')).then(function () {
        btn.classList.add('is-done');
        if (use) use.setAttribute('href', '#i-check');
        showToast(label + ' copied');
        setTimeout(function () { btn.classList.remove('is-done'); if (use) use.setAttribute('href', '#i-copy'); }, 1800);
      }, function () { showToast('Copy not available — please select the text instead'); });
    });
  });

  onScroll();
})();
