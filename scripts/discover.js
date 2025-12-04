// scripts/discover.js
// Module: builds the cards grid from data/items.mjs, implements localStorage message, lazy loading, and desktop-only hover effect.

import items from '../data/items.mjs';

const grid = document.getElementById('cards-grid');
const visitMsg = document.getElementById('visit-msg');

function formatDays(n) {
  return n === 1 ? '1 day' : `${n} days`;
}

/* localStorage last visit logic */
(function handleLastVisit() {
  try {
    const key = 'edohub-last-visit';
    const now = Date.now();
    const last = Number(localStorage.getItem(key));
    if (!last) {
      visitMsg.innerHTML = `<div class="visit-banner">Welcome! Let us know if you have any questions. <button id="visit-close" aria-label="Dismiss">×</button></div>`;
    } else {
      const diffMs = now - last;
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (days === 0) {
        visitMsg.innerHTML = `<div class="visit-banner">Back so soon! Awesome! <button id="visit-close" aria-label="Dismiss">×</button></div>`;
      } else {
        visitMsg.innerHTML = `<div class="visit-banner">You last visited ${formatDays(days)} ago. <button id="visit-close" aria-label="Dismiss">×</button></div>`;
      }
    }
    // set current visit
    localStorage.setItem(key, String(now));

    // dismiss button
    visitMsg.addEventListener('click', (e) => {
      if (e.target && (e.target.id === 'visit-close' || e.target.matches('#visit-close'))) {
        visitMsg.innerHTML = '';
      }
    });
  } catch (err) {
    // silently fail in older browsers
    console.warn('localStorage not available', err);
  }
})();

/* Build card elements and assign named grid areas */
function buildCards(list) {
  // create each card and append
  list.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = `discover-card card-${index + 1}`;
    card.setAttribute('role', 'article');

    // title
    const h2 = document.createElement('h2');
    h2.textContent = item.title;

    // figure with image
    const fig = document.createElement('figure');
    const img = document.createElement('img');

    // path from items.mjs image property
    img.src = item.image;
    img.alt = item.title;
    img.width = 300;
    img.height = 200;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.className = 'poi-img';

    const figcap = document.createElement('figcaption');
    figcap.textContent = item.title;

    fig.appendChild(img);
    // address
    const addr = document.createElement('address');
    addr.textContent = item.address;

    // description
    const p = document.createElement('p');
    p.textContent = item.description;

    // learn more button (could link to more details later)
    const btn = document.createElement('button');
    btn.className = 'learn-more';
    btn.textContent = 'Learn More';
    btn.addEventListener('click', () => {
      // for now: accessible reveal or alert
      alert(`${item.title}\n\n${item.address}\n\n${item.description}`);
    });

    card.appendChild(h2);
    card.appendChild(fig);
    card.appendChild(addr);
    card.appendChild(p);
    card.appendChild(btn);

    grid.appendChild(card);
  });
}

/* assign CSS grid area classes (card-1 .. card-8 must match discover.css grid-template-areas) */
buildCards(items);
