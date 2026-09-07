// Plain JS in public/, referenced with <script is:inline src="/scripts/a11y.js">
// in BaseLayout.astro — same reason as site.js: our CSP is `script-src
// 'self'` with no 'unsafe-inline', so an inlined <script> is simply
// blocked from running. Kept as its own file (rather than folded into
// site.js) so it stays trivially self-contained.
//
// Deliberately loaded at the end of <body>, same spot as site.js, not in
// <head> — a <head> script would apply saved preferences before first
// paint with zero flash, but <head> is being actively edited elsewhere
// right now, so this accepts a brief instant of unadjusted styling for
// returning visitors instead of touching that section. These are
// readability/comfort preferences, not layout-critical ones, so that
// trade-off is fine.

const A11Y_STORAGE_KEY = 'sa_a11y_prefs_v1';

// One entry per switch in the accessibility panel (see BaseLayout.astro).
// `key` matches a switch's data-a11y-toggle attribute; `htmlClass` is the
// class applied to <html> while that preference is on (see global.css).
const A11Y_TOGGLES = [
  { key: 'largerText', htmlClass: 'a11y-larger-text' },
  { key: 'spacing', htmlClass: 'a11y-spacing' },
  { key: 'highContrast', htmlClass: 'a11y-high-contrast' },
  { key: 'underlineLinks', htmlClass: 'a11y-underline-links' },
  { key: 'strongFocus', htmlClass: 'a11y-strong-focus' },
  { key: 'reduceMotion', htmlClass: 'a11y-reduce-motion' },
];

function loadA11yPrefs() {
  try {
    const raw = localStorage.getItem(A11Y_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {}; // storage unavailable (private browsing, disabled, etc.)
  }
}

function saveA11yPrefs(prefs) {
  try {
    localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Nothing we can do — toggles still work for the current page view,
    // they just won't persist across a reload for this visitor.
  }
}

function applyA11yPrefs(prefs) {
  const root = document.documentElement;
  for (const { key, htmlClass } of A11Y_TOGGLES) {
    root.classList.toggle(htmlClass, prefs[key] === true);
  }
}

// Apply whatever was saved as early as this script runs, independent of
// whether the panel markup below even exists on this render.
let a11yPrefs = loadA11yPrefs();
applyA11yPrefs(a11yPrefs);

function initA11yPanel() {
  const toggleButton = document.getElementById('a11y-panel-toggle');
  const panel = document.getElementById('a11y-panel');
  const closeButton = document.getElementById('a11y-panel-close');
  const resetButton = document.getElementById('a11y-panel-reset');
  if (!toggleButton || !panel || !closeButton) return;

  const switches = [...panel.querySelectorAll('[data-a11y-toggle]')];

  function syncSwitchUI(el, on) {
    el.setAttribute('aria-checked', String(on));
    const label = el.querySelector('.a11y-toggle-label');
    if (label) label.textContent = on ? 'On' : 'Off';
  }

  function refreshSwitches() {
    for (const el of switches) syncSwitchUI(el, a11yPrefs[el.dataset.a11yToggle] === true);
  }
  refreshSwitches();

  switches.forEach((el) => {
    el.addEventListener('click', () => {
      const key = el.dataset.a11yToggle;
      const next = !(a11yPrefs[key] === true);
      a11yPrefs = { ...a11yPrefs, [key]: next };
      syncSwitchUI(el, next);
      applyA11yPrefs(a11yPrefs);
      saveA11yPrefs(a11yPrefs);
    });
  });

  resetButton?.addEventListener('click', () => {
    a11yPrefs = {};
    applyA11yPrefs(a11yPrefs);
    saveA11yPrefs(a11yPrefs);
    refreshSwitches();
  });

  // Same focus-trap technique used by the disclaimer acknowledgment
  // modal (site.js): role="dialog" only reads as modal to a screen
  // reader, or blocks a sighted keyboard user, if focus is actually
  // confined to it while open.
  let previouslyFocused = null;
  const dialog = panel.firstElementChild;

  function trapFocus(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closePanel();
      return;
    }
    if (e.key !== 'Tab') return;
    const focusable = [...panel.querySelectorAll('button, a[href]')];
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function onOutsideClick(e) {
    if (dialog && !dialog.contains(e.target) && !toggleButton.contains(e.target)) closePanel();
  }

  function openPanel() {
    previouslyFocused = document.activeElement;
    panel.hidden = false;
    // Applied only via JS, never in the static class list — Tailwind's
    // `.flex{display:flex}` is author-origin and beats the browser's
    // default `[hidden]{display:none}` regardless of specificity, so
    // having both classes at once would leave the panel visible even
    // while `hidden` reads true.
    panel.classList.add('flex');
    toggleButton.setAttribute('aria-expanded', 'true');
    panel.addEventListener('keydown', trapFocus);
    document.addEventListener('click', onOutsideClick, true);
    closeButton.focus();
  }

  function closePanel() {
    panel.hidden = true;
    panel.classList.remove('flex');
    toggleButton.setAttribute('aria-expanded', 'false');
    panel.removeEventListener('keydown', trapFocus);
    document.removeEventListener('click', onOutsideClick, true);
    if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    else toggleButton.focus();
  }

  toggleButton.addEventListener('click', () => {
    if (panel.hidden) openPanel();
    else closePanel();
  });
  closeButton.addEventListener('click', closePanel);
}

initA11yPanel();
