const gallery = document.querySelector('#gallery');
const title = gallery.querySelector('#gallery-title');
const image = gallery.querySelector('img');
const view = gallery.querySelector('.gallery-view');
const zoom = gallery.querySelector('.gallery-zoom');
const close = gallery.querySelector('.gallery-close');

let opener;

function setZoom(expanded) {
  gallery.classList.toggle('actual-size', expanded);
  zoom.setAttribute('aria-pressed', String(expanded));
  zoom.textContent = expanded ? 'Fit to screen' : 'Actual size';
  view.scrollTo(0, 0);
}

for (const link of document.querySelectorAll('[data-enlarge]')) {
  link.addEventListener('click', (event) => {
    if (!gallery.showModal || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    const thumbnail = link.querySelector('img');
    opener = link;
    title.textContent = link.dataset.enlarge;
    image.src = link.href;
    image.alt = thumbnail.alt;
    setZoom(false);
    gallery.showModal();
    document.documentElement.classList.add('gallery-open');
    close.focus();
  });
}

zoom.addEventListener('click', () => {
  setZoom(zoom.getAttribute('aria-pressed') === 'false');
});

close.addEventListener('click', () => gallery.close());
gallery.addEventListener('click', (event) => {
  if (event.target === gallery) gallery.close();
});
gallery.addEventListener('close', () => {
  document.documentElement.classList.remove('gallery-open');
  opener?.focus({ preventScroll: true });
});
