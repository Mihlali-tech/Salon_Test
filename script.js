/* ============================================================
   ROOTED & RADIANT — site behaviour
   ============================================================ */

/* ---------- 1. SERVICES DATA --------------------------------
   Edit this list to add/remove a style, change a price, or
   adjust which length options / add-ons apply.
   weekday: true  -> can be booked Mon-Fri as well as weekends
   weekday: false -> weekends only (longer, unhurried styles)
   comingSoon: true -> shown on the menu but not yet bookable
-------------------------------------------------------------- */
const SERVICES = [
  {
    id: "knotless", name: "Knotless Braids", category: "knotless", weekday: false,
    blurb: "Sleek, lightweight knotless braids with a clean, comfortable finish — no tension, no knots.",
    basePrice: 430, depositRate: 0.3, ownHairDiscount: 90,
    sizeLabel: "Fullness", sizeOptions: [ {label:"Small", add:0}, {label:"Medium", add:10}, {label:"Full", add:20} ],
    lengthLabel: "Length", lengthOptions: [ {label:"Shoulder", add:0}, {label:"Bra-strap", add:20}, {label:"Mid-back", add:40}, {label:"Waist & beyond", add:60} ]
  },
  {
    id: "tribal", name: "Tribal Braids", category: "tribal", weekday: false,
    blurb: "Bold, statement tribal braids with clean parting and a beautifully finished style from root to tip.",
    basePrice: 320, depositRate: 0.3, ownHairDiscount: 90,
    sizeLabel: "Fullness", sizeOptions: [ {label:"Small", add:0}, {label:"Medium", add:10}, {label:"Full", add:20} ],
    lengthLabel: "Length", lengthOptions: [ {label:"Shoulder", add:0}, {label:"Bra-strap", add:20}, {label:"Mid-back", add:40}, {label:"Waist & beyond", add:60} ]
  },
  {
    id: "cornrows", name: "Cornrows (Feed-Ins)", category: "cornrows", weekday: true,
    blurb: "Clean, precise feed-in cornrows — a quick, polished style that's kind to your schedule and your edges.",
    basePrice: 250, depositRate: 0.3, ownHairDiscount: 50,
    sizeLabel: "Fullness", sizeOptions: [ {label:"Small", add:0}, {label:"Medium", add:10}, {label:"Full", add:20} ],
    lengthLabel: "Length", lengthOptions: [ {label:"Short", add:0}, {label:"Medium", add:20}, {label:"Long", add:40}, {label:"Extra long", add:60} ]
  },
  {
    id: "freehand", name: "Free Hand", category: "freehand", weekday: true,
    blurb: "Free hand cornrow designs and patterns, styled without a comb for a soft, natural finish. Design details are discussed together when I arrive.",
    basePrice: 120, depositRate: 0.3
  },
  {
    id: "faux-locs", name: "Faux Locs", category: "fauxlocs", weekday: false,
    blurb: "Soft, natural-looking faux locs finished from root to tip — a low-maintenance protective style.",
    basePrice: 200, depositRate: 0.3,
    sizeLabel: "Fullness", sizeOptions: [ {label:"Small", add:0}, {label:"Medium", add:10}, {label:"Full", add:20} ],
    lengthLabel: "Length", lengthOptions: [ {label:"Short", add:0}, {label:"Medium", add:20}, {label:"Long", add:40}, {label:"Extra long", add:60} ]
  },
  {
    id: "weave", name: "Weave Install", category: "weave", weekday: true,
    blurb: "A neat, natural-looking weave install, fitted and blended with care for a seamless finish.",
    basePrice: 350, depositRate: 0.3
  },
  {
    id: "silk-press", name: "Silk Press", category: "silkpress", weekday: true,
    blurb: "Cleanse, blow-dry and silk press for smooth, healthy movement. Deep conditioning is available as an add-on if your hair needs a little extra love.",
    basePrice: 150, depositRate: 0.3,
    addonOptions: [ {label:"Deep conditioning treatment", add:30} ]
  },
  {
    id: "treatment", name: "Hair Treatment, Wash & Blow Dry", category: "treatment", weekday: true,
    blurb: "A restorative wash and treatment followed by a smooth blow dry — healthy hair, ready for your next style.",
    basePrice: 100, depositRate: 0.3
  },
  {
    id: "bridal", name: "The Bridal Home Experience", category: "bridal", comingSoon: true,
    blurb: "A private bridal styling experience, held entirely at your home. Still being developed — details and pricing are coming soon."
  },
];

const WEEKEND_SLOTS = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];
const WEEKDAY_SLOTS = ["07:00","08:00","17:00","18:00","19:00"]; // before/after typical work hours

const fmtR = n => 'R' + Math.round(n).toLocaleString('en-ZA');

/* ============================================================
   2. NAV
============================================================ */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

/* ============================================================
   3. SCROLL REVEAL
============================================================ */
document.querySelectorAll('.section, .hero, .page-hero').forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ============================================================
   4. SERVICES (EXPERIENCES) PAGE RENDER
============================================================ */
const servicesGrid = document.getElementById('servicesGrid');
if (servicesGrid) {
  SERVICES.forEach(s => {
    const card = document.createElement('div');
    card.className = 'service-card';

    if (s.comingSoon) {
      card.innerHTML = `
        <div class="service-top">
          <h3>${s.name}</h3>
          <span class="badge">Coming Soon</span>
        </div>
        <p style="color:var(--brown-soft); font-size:.92rem; margin:0;">${s.blurb}</p>
      `;
      servicesGrid.appendChild(card);
      return;
    }

    const customNote = (s.sizeOptions || s.lengthOptions)
      ? `<div class="service-custom-note">${[s.sizeLabel, s.lengthLabel].filter(Boolean).join(' & ')} refined with you when you reserve.</div>`
      : (s.addonOptions ? `<div class="service-custom-note">Optional add-ons available when you reserve.</div>` : '');
    card.innerHTML = `
      <div class="service-top">
        <h3>${s.name}</h3>
      </div>
      <p style="color:var(--brown-soft); font-size:.92rem; margin:0;">${s.blurb}</p>
      ${customNote}
      <div class="service-price">
        <span class="amount">From ${fmtR(s.basePrice)}</span>
        <span class="dep">deposit from ${fmtR(s.basePrice * s.depositRate)}</span>
      </div>
      <a href="book.html?style=${s.id}" class="btn btn-ghost">Reserve this style</a>
    `;
    servicesGrid.appendChild(card);
  });
}

/* ============================================================
   5. GALLERY / PORTFOLIO (localStorage-backed)
   Item shape: { id, type:'photo'|'video', src, category, source:'mywork'|'inspiration', label }
   - 'src' for photos/inspiration-images is either a data URL (uploaded)
     or a hotlinked image URL (pasted). For videos it's always a link
     (YouTube / Instagram / Drive etc.) — we link out rather than embed,
     so any platform works without extra setup.
   - Only the studio owner can add/remove items. Everyone else can
     only browse and open the lightbox / video links.
============================================================ */
const galleryGrid = document.getElementById('galleryGrid');
const GALLERY_KEY = 'rr_gallery_v2';
const OWNER_KEY = 'rr_owner_mode';

function getGallery() {
  try { return JSON.parse(localStorage.getItem(GALLERY_KEY)) || []; }
  catch { return []; }
}
function saveGallery(items) { localStorage.setItem(GALLERY_KEY, JSON.stringify(items)); }
function isOwner() { return localStorage.getItem(OWNER_KEY) === '1'; }

const styleTools = document.getElementById('styleFilterRow');
const sourceTools = document.getElementById('sourceFilterRow');
const ownerBar = document.getElementById('ownerBar');
const ownerSignIn = document.getElementById('ownerSignIn');

let activeStyleFilter = 'all';
let activeSourceFilter = 'all';

if (styleTools) {
  // Build style filter chips from the real service list, plus "All"
  const chips = [{ id: 'all', name: 'All' }, ...SERVICES.map(s => ({ id: s.category, name: s.name }))];
  chips.forEach((c, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'filter-chip' + (idx === 0 ? ' active' : '');
    btn.dataset.filter = c.id;
    btn.textContent = c.name;
    btn.addEventListener('click', () => {
      styleTools.querySelectorAll('.filter-chip').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      activeStyleFilter = c.id;
      renderGallery();
    });
    styleTools.appendChild(btn);
  });
}
if (sourceTools) {
  [{ id: 'all', name: 'Everything' }, { id: 'mywork', name: 'My Work' }, { id: 'inspiration', name: 'Style Inspiration' }].forEach((c, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'filter-chip' + (idx === 0 ? ' active' : '');
    btn.dataset.source = c.id;
    btn.textContent = c.name;
    btn.addEventListener('click', () => {
      sourceTools.querySelectorAll('.filter-chip').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      activeSourceFilter = c.id;
      renderGallery();
    });
    sourceTools.appendChild(btn);
  });
}

function renderOwnerBar() {
  if (!ownerBar) return;
  if (isOwner()) {
    ownerBar.innerHTML = `
      <span style="font-size:.8rem; color: var(--sage-deep); width:100%;">Studio view — you can add &amp; remove items.</span>
      <button type="button" class="upload-btn" id="addMyPhotoBtn">+ Add my photos</button>
      <button type="button" class="upload-btn" id="addMyVideoBtn">+ Add my video link</button>
      <button type="button" class="upload-btn" id="addInspoPhotoBtn">+ Add inspiration photo</button>
      <button type="button" class="upload-btn" id="addInspoVideoBtn">+ Add inspiration video</button>
      <button type="button" class="upload-btn" id="signOutBtn">Sign out</button>
      <input type="file" id="galleryFileInput" accept="image/*" multiple style="display:none">
    `;
    document.getElementById('signOutBtn').addEventListener('click', () => {
      localStorage.removeItem(OWNER_KEY);
      renderOwnerBar();
    });
    // Photo upload MUST happen as the very first thing on click, with no
    // prompt() calls beforehand — some browsers (Safari especially) silently
    // block a file picker from opening if a dialog like prompt() ran first
    // in the same click. So we open the picker immediately, then ask for
    // the style/label afterwards, once files are already chosen.
    document.getElementById('addMyPhotoBtn').addEventListener('click', () => openPhotoPicker('mywork'));
    document.getElementById('addMyVideoBtn').addEventListener('click', () => addVideoFlow('mywork'));
    document.getElementById('addInspoPhotoBtn').addEventListener('click', () => addInspirationPhotoFlow());
    document.getElementById('addInspoVideoBtn').addEventListener('click', () => addVideoFlow('inspiration'));
  } else {
    ownerBar.innerHTML = `<button type="button" class="upload-btn" id="ownerSignInBtn">Studio sign-in</button>`;
    document.getElementById('ownerSignInBtn').addEventListener('click', () => {
      const pass = prompt('Studio password:');
      if (pass === null) return;
      if (window.CONFIG && pass === CONFIG.OWNER_PASSCODE) {
        localStorage.setItem(OWNER_KEY, '1');
        renderOwnerBar();
      } else {
        alert('That password doesn\'t match. Please try again.');
      }
    });
  }
}
renderOwnerBar();

function styleCategoryList() { return SERVICES.map(s => s.category); }

function askCategoryAndLabel() {
  const categories = styleCategoryList();
  const category = (prompt(`Which style is this for?\n(${categories.join(', ')})`, categories[0]) || categories[0]).trim().toLowerCase();
  const label = prompt('Optional short label (e.g. "Knotless braids, mid-back")', '') || '';
  return { category, label };
}

function openPhotoPicker(source) {
  const fileInput = document.getElementById('galleryFileInput');
  fileInput.onchange = e => {
    const files = Array.from(e.target.files);
    e.target.value = '';
    if (!files.length) return;
    // Ask which style/label AFTER the files are chosen, so nothing
    // interrupts the browser's own file-picker gesture.
    const { category, label } = askCategoryAndLabel();
    let pending = files.length;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        const items = getGallery();
        items.push({ id: 'g' + Date.now() + Math.random().toString(16).slice(2), type: 'photo', src: ev.target.result, category, source, label });
        saveGallery(items);
        pending--;
        if (pending === 0) renderGallery();
      };
      reader.readAsDataURL(file);
    });
  };
  fileInput.click();
}

function addVideoFlow(source) {
  const url = prompt(source === 'mywork'
    ? 'Paste your video link (YouTube, Instagram, Google Drive, etc.):'
    : 'Paste the inspiration video link:');
  if (!url) return;
  const { category, label } = askCategoryAndLabel();
  const items = getGallery();
  items.push({ id: 'g' + Date.now() + Math.random().toString(16).slice(2), type: 'video', src: url, category, source, label });
  saveGallery(items);
  renderGallery();
}

function addInspirationPhotoFlow() {
  const url = prompt('Paste the image link (e.g. a Pinterest pin image URL):');
  if (!url) return;
  const { category, label } = askCategoryAndLabel();
  const items = getGallery();
  items.push({ id: 'g' + Date.now() + Math.random().toString(16).slice(2), type: 'photo', src: url, category, source: 'inspiration', label });
  saveGallery(items);
  renderGallery();
}

function renderGallery() {
  if (!galleryGrid) return;
  const items = getGallery();
  const shown = items.filter(i =>
    (activeStyleFilter === 'all' || i.category === activeStyleFilter) &&
    (activeSourceFilter === 'all' || i.source === activeSourceFilter)
  );
  galleryGrid.innerHTML = '';

  if (shown.length === 0) {
    galleryGrid.innerHTML = `
      <div class="gallery-empty">
        <strong>Nothing here yet</strong>
        ${isOwner() ? 'Use "Add my work" or "Add style inspiration" above to start filling this in.' : 'Please check back soon — new work is added regularly.'}
      </div>`;
    return;
  }
  shown.forEach(item => {
    const el = document.createElement('div');
    el.className = 'gallery-item';
    const tagText = `${item.label || item.category}${item.source === 'inspiration' ? ' · Inspiration' : ''}`;
    if (item.type === 'video') {
      el.innerHTML = `
        <div style="aspect-ratio:4/5; background:var(--panel-alt); display:flex; align-items:center; justify-content:center; flex-direction:column; gap:10px; padding:20px; text-align:center;">
          <span style="font-size:2rem;">▶</span>
          <span style="font-size:.82rem; color:var(--brown-soft);">${item.label || 'Watch video'}</span>
        </div>
        <span class="tag">${tagText}</span>
        ${isOwner() ? '<button type="button" class="remove" aria-label="Remove">✕</button>' : ''}
      `;
      el.addEventListener('click', () => window.open(item.src, '_blank', 'noopener'));
    } else {
      el.innerHTML = `
        <img src="${item.src}" alt="${item.label || 'Work by Rooted & Radiant'}">
        <span class="tag">${tagText}</span>
        ${isOwner() ? '<button type="button" class="remove" aria-label="Remove">✕</button>' : ''}
      `;
      el.querySelector('img').addEventListener('click', () => openLightbox(item.src));
    }
    if (isOwner()) {
      el.querySelector('.remove').addEventListener('click', ev => {
        ev.stopPropagation();
        saveGallery(getGallery().filter(g => g.id !== item.id));
        renderGallery();
      });
    }
    galleryGrid.appendChild(el);
  });
}

const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lightboxImg = document.getElementById('lightboxImg');
  window.openLightbox = src => { lightboxImg.src = src; lightbox.classList.add('open'); };
  document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });
}
function openLightbox(src) { if (window.openLightbox) window.openLightbox(src); }

renderGallery();

/* ============================================================
   8. CONTACT PAGE — consultation / query form
============================================================ */
const emailTrigger = document.getElementById('emailTrigger');
const consultForm = document.getElementById('consultForm');
if (emailTrigger && consultForm) {
  emailTrigger.addEventListener('click', e => {
    e.preventDefault();
    consultForm.style.display = 'block';
    consultForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  document.getElementById('cCancel').addEventListener('click', () => { consultForm.style.display = 'none'; });

  document.getElementById('consultFormEl').addEventListener('submit', async e => {
    e.preventDefault();
    const first = document.getElementById('cName').value.trim();
    const surname = document.getElementById('cSurname').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const queryType = document.getElementById('cQueryType').value;
    const message = document.getElementById('cMessage').value.trim();
    const msgBox = document.getElementById('consultMsg');

    if (!first || !surname || !email) {
      msgBox.textContent = 'Please fill in your name, surname and email.';
      msgBox.className = 'form-msg show error';
      return;
    }
    msgBox.textContent = 'Sending your message…';
    msgBox.className = 'form-msg show loading';

    try {
      await fetch(`https://formsubmit.co/ajax/${CONFIG.STYLIST_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `Contact form: ${queryType} — ${first} ${surname}`,
          name: `${first} ${surname}`, email, queryType, message: message || '—'
        })
      });
      msgBox.textContent = "Thank you — I'll be in touch within 48 hours.";
      msgBox.className = 'form-msg show ok';
      document.getElementById('consultFormEl').reset();
    } catch (err) {
      msgBox.textContent = "That didn't send. Please try again, or email me directly.";
      msgBox.className = 'form-msg show error';
    }
  });
}
/* ============================================================
   6. BOOKING FLOW (book.html only)
============================================================ */
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {

  let booking = {
    style: null, lengthIdx: null, addons: [],
    date: '', time: '', location: '', lat: null, lng: null,
    hairpiece: 'Londie London (standard)', notes: '', refNumber: null
  };
  let currentStep = 1;

  /* --- experience grid --- */
  const styleGrid = document.getElementById('styleGrid');
  SERVICES.filter(s => !s.comingSoon).forEach(s => {
    const opt = document.createElement('div');
    opt.className = 'style-option';
    opt.dataset.id = s.id;
    opt.innerHTML = `<div class="nm">${s.name}</div><div class="meta">From ${fmtR(s.basePrice)}</div>`;
    opt.addEventListener('click', () => selectStyle(s.id));
    styleGrid.appendChild(opt);
  });

  const customizePanel = document.getElementById('customizePanel');
  const customizeTitle = document.getElementById('customizeTitle');
  const sizeWrap = document.getElementById('sizeOptionsWrap');
  const sizeRow = document.getElementById('sizeOptionsRow');
  const lengthWrap = document.getElementById('lengthOptionsWrap');
  const lengthRow = document.getElementById('lengthOptionsRow');
  const addonWrap = document.getElementById('addonOptionsWrap');
  const addonRow = document.getElementById('addonOptionsRow');
  const livePrice = document.getElementById('livePrice');
  const liveDeposit = document.getElementById('liveDeposit');

  function selectStyle(id) {
    booking.style = SERVICES.find(s => s.id === id);
    booking.sizeIdx = booking.style.sizeOptions ? 0 : null; // default: "Small"
    booking.lengthIdx = booking.style.lengthOptions ? 0 : null; // default: shortest/first option
    booking.addons = [];
    document.querySelectorAll('.style-option').forEach(o => o.classList.toggle('selected', o.dataset.id === id));
    renderCustomizePanel();
    renderDayNoteAndSlots();
  }

  function renderCustomizePanel() {
    const s = booking.style;
    if (!s) { customizePanel.style.display = 'none'; return; }
    customizePanel.style.display = 'block';
    customizeTitle.textContent = `Customise your ${s.name}`;

    if (s.sizeOptions) {
      sizeWrap.style.display = 'block';
      document.getElementById('sizeOptionsLabel').textContent = s.sizeLabel || 'Fullness';
      sizeRow.innerHTML = '';
      s.sizeOptions.forEach((opt, idx) => {
        const pill = document.createElement('div');
        pill.className = 'option-pill' + (idx === booking.sizeIdx ? ' selected' : '');
        pill.innerHTML = `${opt.label}<span class="op-price">${opt.add > 0 ? '+' + fmtR(opt.add) : 'included'}</span>`;
        pill.addEventListener('click', () => { booking.sizeIdx = idx; renderCustomizePanel(); });
        sizeRow.appendChild(pill);
      });
    } else { sizeWrap.style.display = 'none'; }

    if (s.lengthOptions) {
      lengthWrap.style.display = 'block';
      document.getElementById('lengthOptionsLabel').textContent = s.lengthLabel || 'Length';
      lengthRow.innerHTML = '';
      s.lengthOptions.forEach((opt, idx) => {
        const pill = document.createElement('div');
        pill.className = 'option-pill' + (idx === booking.lengthIdx ? ' selected' : '');
        pill.innerHTML = `${opt.label}<span class="op-price">${opt.add > 0 ? '+' + fmtR(opt.add) : 'included'}</span>`;
        pill.addEventListener('click', () => { booking.lengthIdx = idx; renderCustomizePanel(); });
        lengthRow.appendChild(pill);
      });
    } else { lengthWrap.style.display = 'none'; }

    if (s.addonOptions) {
      addonWrap.style.display = 'block';
      addonRow.innerHTML = '';
      s.addonOptions.forEach((opt, idx) => {
        const pill = document.createElement('div');
        const on = booking.addons.includes(idx);
        pill.className = 'option-pill' + (on ? ' selected' : '');
        pill.innerHTML = `${opt.label}<span class="op-price">+${fmtR(opt.add)}</span>`;
        pill.addEventListener('click', () => {
          booking.addons = on ? booking.addons.filter(i => i !== idx) : [...booking.addons, idx];
          renderCustomizePanel();
        });
        addonRow.appendChild(pill);
      });
    } else { addonWrap.style.display = 'none'; }

    const { total, deposit } = computeTotals();
    livePrice.textContent = fmtR(total);
    liveDeposit.textContent = `deposit due now: ${fmtR(deposit)}`;
  }

  function computeTotals() {
    const s = booking.style;
    if (!s) return { total: 0, deposit: 0, hairpieceDiscount: 0, balance: 0 };
    let total = s.basePrice;
    if (s.sizeOptions && booking.sizeIdx !== null) total += s.sizeOptions[booking.sizeIdx].add;
    if (s.lengthOptions && booking.lengthIdx !== null) total += s.lengthOptions[booking.lengthIdx].add;
    if (s.addonOptions) booking.addons.forEach(idx => { total += s.addonOptions[idx].add; });
    const deposit = Math.round((total * s.depositRate) / 10) * 10;
    // Deposit is always based on the full price — it secures the slot regardless
    // of hairpiece. The discount for bringing your own hair comes off what's
    // left to pay in person (the balance), not off the deposit itself.
    const bringingOwnHair = !booking.hairpiece.startsWith('Londie');
    const hairpieceDiscount = (bringingOwnHair && s.ownHairDiscount) ? s.ownHairDiscount : 0;
    const balance = total - deposit - hairpieceDiscount;
    return { total, deposit, hairpieceDiscount, balance };
  }

  /* --- step navigation --- */
  const stepLabels = { 1: 'lbl1', 2: 'lbl2', 3: 'lbl3', 4: 'lbl4' };
  function goToStep(n) {
    currentStep = n;
    document.querySelectorAll('.step-panel').forEach(p => p.classList.toggle('active', +p.dataset.step === n));
    [1,2,3,4].forEach(i => {
      document.getElementById('segFill' + i).style.width = i <= n ? '100%' : '0%';
      document.getElementById(stepLabels[i]).classList.toggle('active', i === n);
    });
    if (n === 3) renderHairpieceNote();
    if (n === 4) buildSummary();
    document.querySelector('.booking-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  document.getElementById('toStep2').addEventListener('click', () => {
    if (!booking.style) { alert('Please choose an experience first.'); return; }
    booking.notes = document.getElementById('styleNotes').value;
    goToStep(2);
  });
  document.getElementById('toStep3').addEventListener('click', () => {
    if (!booking.date || !booking.time) { alert('Please choose an available date and time.'); return; }
    goToStep(3);
  });
  document.getElementById('toStep4').addEventListener('click', () => {
    if (!booking.location) { alert('Please enter your address.'); return; }
    goToStep(4);
  });
  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => goToStep(+btn.dataset.back));
  });

  /* --- date & time logic --- */
  const dateInput = document.getElementById('bookingDate');
  const dayNote = document.getElementById('dayNote');
  const timeGrid = document.getElementById('timeGrid');
  const today = new Date();
  dateInput.min = today.toISOString().split('T')[0];

  dateInput.addEventListener('change', () => {
    booking.date = dateInput.value;
    booking.time = '';
    renderDayNoteAndSlots();
  });

  function renderDayNoteAndSlots() {
    timeGrid.innerHTML = '';
    if (!booking.style) {
      dayNote.textContent = 'Choose your experience first to see available days.';
      dayNote.classList.remove('warn');
      return;
    }
    if (!booking.date) {
      dayNote.textContent = `${booking.style.name} — choose a date to see available times.`;
      dayNote.classList.remove('warn');
      return;
    }
    const day = new Date(booking.date + 'T00:00:00').getDay();
    const isWeekend = (day === 0 || day === 6);

    dayNote.classList.remove('warn');
    if (!isWeekend && !booking.style.weekday) {
      dayNote.classList.add('warn');
      dayNote.textContent = `This style is usually booked on weekends. Happy to consider a weekday if it suits you better — just mention it in the notes box in Step 1 and I'll confirm with you.`;
    } else {
      dayNote.textContent = isWeekend
        ? 'Weekend availability shown below.'
        : 'Early-morning and evening availability shown below, suited to a working week.';
    }

    const slots = isWeekend ? WEEKEND_SLOTS : WEEKDAY_SLOTS;
    const isToday = booking.date === today.toISOString().split('T')[0];
    const nowHour = today.getHours();

    slots.forEach(t => {
      const slotHour = +t.split(':')[0];
      const disabled = isToday && slotHour <= nowHour;
      const el = document.createElement('div');
      el.className = 'time-slot' + (disabled ? ' disabled' : '');
      el.textContent = t;
      if (!disabled) {
        el.addEventListener('click', () => {
          booking.time = t;
          document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
          el.classList.add('selected');
        });
      }
      timeGrid.appendChild(el);
    });
  }

  /* --- hairpiece pills --- */
  function renderHairpieceNote() {
    const note = document.getElementById('hairpieceNote');
    const s = booking.style;
    const bringingOwnHair = !booking.hairpiece.startsWith('Londie');
    if (bringingOwnHair && s && s.ownHairDiscount) {
      note.style.display = 'block';
      note.classList.remove('warn');
      note.textContent = `Bringing your own hair for ${s.name} takes R${s.ownHairDiscount} off your balance on the day.`;
    } else {
      note.style.display = 'none';
    }
  }
  document.querySelectorAll('input[name="hairpiece"]').forEach(r => {
    r.addEventListener('change', () => {
      booking.hairpiece = r.value;
      document.getElementById('hpLondiePill').classList.toggle('selected', r.value.startsWith('Londie'));
      document.getElementById('hpOwnPill').classList.toggle('selected', !r.value.startsWith('Londie'));
      renderHairpieceNote();
    });
  });

  /* --- location + Google Maps --- */
  const locationInput = document.getElementById('locationInput');
  const mapBox = document.getElementById('mapBox');
  locationInput.addEventListener('input', () => { booking.location = locationInput.value; });

  function initMapsFallback() {
    mapBox.innerHTML = 'Live map preview needs a Google Maps API key — add one in <code>config.js</code>. Your address still works as plain text above.';
  }

  (function loadGoogleMaps() {
    if (!window.CONFIG || CONFIG.GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY' || !CONFIG.GOOGLE_MAPS_API_KEY) {
      initMapsFallback();
      return;
    }
    window.initAutocomplete = function () {
      mapBox.innerHTML = '<div id="map-canvas"></div>';
      const map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: { lat: -25.7479, lng: 28.2293 }, // Pretoria
        zoom: 11,
        disableDefaultUI: true,
        styles: [{ elementType: 'geometry', stylers: [{ color: '#F4EFE4' }] }]
      });
      const marker = new google.maps.Marker({ map });
      const autocomplete = new google.maps.places.Autocomplete(locationInput, {
        componentRestrictions: { country: 'za' },
        fields: ['formatted_address', 'geometry', 'name']
      });
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;
        map.setCenter(place.geometry.location);
        map.setZoom(15);
        marker.setPosition(place.geometry.location);
        booking.location = place.formatted_address || locationInput.value;
        booking.lat = place.geometry.location.lat();
        booking.lng = place.geometry.location.lng();
      });
    };
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${CONFIG.GOOGLE_MAPS_API_KEY}&libraries=places&callback=initAutocomplete`;
    script.async = true;
    script.onerror = initMapsFallback;
    document.head.appendChild(script);
  })();

  function generateRefNumber() {
    const d = new Date();
    const ymd = String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `RR-${ymd}-${rand}`;
  }

  /* --- summary --- */
  function buildSummary() {
    if (!booking.refNumber) booking.refNumber = generateRefNumber();
    const box = document.getElementById('summaryBox');
    const s = booking.style;
    const { total, deposit, hairpieceDiscount, balance } = computeTotals();
    const parts = [];
    if (s.sizeOptions) parts.push(s.sizeOptions[booking.sizeIdx].label + ' fullness');
    if (s.lengthOptions) parts.push(s.lengthOptions[booking.lengthIdx].label);
    if (s.addonOptions) booking.addons.forEach(idx => parts.push(s.addonOptions[idx].label));
    box.innerHTML = `
      <div class="summary-row"><span>Reference number</span><span>${booking.refNumber}</span></div>
      <div class="summary-row"><span>Style</span><span>${s ? s.name : '—'}</span></div>
      ${parts.length ? `<div class="summary-row"><span>Preference</span><span>${parts.join(' · ')}</span></div>` : ''}
      <div class="summary-row"><span>Date</span><span>${booking.date || '—'}</span></div>
      <div class="summary-row"><span>Time</span><span>${booking.time || '—'}</span></div>
      <div class="summary-row"><span>Location</span><span>${booking.location || '—'}</span></div>
      <div class="summary-row"><span>Hairpiece</span><span>${booking.hairpiece}</span></div>
      ${hairpieceDiscount > 0 ? `<div class="summary-row"><span>Own-hair discount</span><span>-${fmtR(hairpieceDiscount)}</span></div>` : ''}
      <div class="summary-row"><span>Deposit due now (30%)</span><span>${fmtR(deposit)}</span></div>
      <div class="summary-row"><span>Balance due on the day</span><span>${fmtR(balance)}</span></div>
    `;
  }

  /* --- preselect experience from services.html?style=id --- */
  (function preselectFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const styleId = params.get('style');
    if (styleId && SERVICES.some(s => s.id === styleId)) selectStyle(styleId);
  })();

  /* ============================================================
     7. SUBMIT: email booking details, then redirect to PayFast
  ============================================================ */
  const formMsg = document.getElementById('formMsg');
  const payBtn = document.getElementById('payBtn');

  function showMsg(text, type) {
    formMsg.textContent = text;
    formMsg.className = 'form-msg show ' + type;
  }

  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const email = document.getElementById('clientEmail').value.trim();

    if (!booking.style || !booking.date || !booking.time || !booking.location) {
      showMsg('Please complete every step before securing your deposit.', 'error'); return;
    }
    if (!name || !phone || !email) {
      showMsg('Please fill in your name, cell number and email.', 'error'); return;
    }

    const { total, deposit, hairpieceDiscount, balance } = computeTotals();
    const s = booking.style;
    if (!booking.refNumber) booking.refNumber = generateRefNumber();
    const prefBits = [];
    if (s.sizeOptions) prefBits.push(s.sizeOptions[booking.sizeIdx].label + ' fullness');
    if (s.lengthOptions) prefBits.push(s.lengthOptions[booking.lengthIdx].label + ' length');
    if (s.addonOptions) booking.addons.forEach(idx => prefBits.push(s.addonOptions[idx].label));

    payBtn.disabled = true;
    showMsg('Sending your reservation details…', 'loading');

    const bookingSummary =
      `New reservation request\n\n` +
      `Reference number: ${booking.refNumber}\n` +
      `Client: ${name}\n` +
      `Phone: ${phone}\n` +
      `Email: ${email}\n` +
      `Style: ${s.name}\n` +
      `Preferences: ${prefBits.join(', ') || '—'}\n` +
      `Total: ${fmtR(total)} (deposit ${fmtR(deposit)}${hairpieceDiscount ? `, own-hair discount -${fmtR(hairpieceDiscount)}` : ''})\n` +
      `Balance due on the day: ${fmtR(balance)}\n` +
      `Date: ${booking.date}\n` +
      `Time: ${booking.time}\n` +
      `Location: ${booking.location}\n` +
      `Hairpiece: ${booking.hairpiece}\n` +
      `Notes: ${booking.notes || '—'}`;

    try {
      // Email the reservation to the studio via formsubmit.co (no backend needed).
      await fetch(`https://formsubmit.co/ajax/${CONFIG.STYLIST_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `New reservation ${booking.refNumber}: ${name} — ${s.name} on ${booking.date} ${booking.time}`,
          reference: booking.refNumber,
          name, phone, email,
          style: s.name,
          preferences: prefBits.join(', ') || '—',
          total: fmtR(total), deposit: fmtR(deposit),
          date: booking.date, time: booking.time,
          location: booking.location, hairpiece: booking.hairpiece,
          notes: booking.notes || '—', message: bookingSummary
        })
      });
    } catch (err) {
      console.warn('Reservation email failed to send:', err);
    }

    showMsg(`Reference ${booking.refNumber} — please save this. Redirecting you to PayFast to secure your deposit…`, 'ok');
    setTimeout(() => redirectToPayfast(total, deposit), 1400);
  });

  function redirectToPayfast(total, deposit) {
    const s = booking.style;
    const action = CONFIG.PAYFAST_MODE === 'live'
      ? 'https://www.payfast.co.za/eng/process'
      : 'https://sandbox.payfast.co.za/eng/process';

    const fields = {
      merchant_id: CONFIG.PAYFAST_MERCHANT_ID,
      merchant_key: CONFIG.PAYFAST_MERCHANT_KEY,
      return_url: CONFIG.PAYFAST_RETURN_URL,
      cancel_url: CONFIG.PAYFAST_CANCEL_URL,
      notify_url: CONFIG.PAYFAST_NOTIFY_URL,
      name_first: document.getElementById('clientName').value.trim(),
      email_address: document.getElementById('clientEmail').value.trim(),
      m_payment_id: booking.refNumber,
      amount: deposit.toFixed(2),
      item_name: `Deposit — ${s.name} (${booking.refNumber})`,
      item_description: `Appointment on ${booking.date} at ${booking.time}, ${booking.location}`,
      custom_str1: booking.date,
      custom_str2: booking.time,
      custom_str3: booking.location
    };

    const payfastForm = document.getElementById('payfastForm');
    payfastForm.innerHTML = '';
    payfastForm.action = action;
    Object.entries(fields).forEach(([k, v]) => {
      const input = document.createElement('input');
      input.type = 'hidden'; input.name = k; input.value = v;
      payfastForm.appendChild(input);
    });
    payfastForm.submit();
  }
}
