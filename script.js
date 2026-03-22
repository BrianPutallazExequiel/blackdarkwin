// ── FORM SUBMIT ──────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMsg = document.getElementById('formMsg');

contactForm.addEventListener('submit', async function(e) {
  e.preventDefault();

  submitBtn.innerHTML = '<span>Sending...</span>';
  submitBtn.disabled = true;

  const data = new FormData(contactForm);

  try {
    const res = await fetch('https://formspree.io/f/mreyvyyk', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      contactForm.reset();
      formMsg.style.display = 'block';
      formMsg.style.color = '#f2f2f2';
      formMsg.textContent = '✓ Message sent successfully. Darwin will get back to you soon.';
      submitBtn.innerHTML = '<span>Send Message</span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
      submitBtn.disabled = false;
    } else {
      throw new Error('Error');
    }
  } catch {
    formMsg.style.display = 'block';
    formMsg.style.color = '#ff6b6b';
    formMsg.textContent = '✕ Something went wrong. Please try again or contact directly.';
    submitBtn.innerHTML = '<span>Send Message</span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
    submitBtn.disabled = false;
  }
});


// ── TICKER ──────────────────────────────────────────────
const ticker = document.getElementById('ticker');
const tickerItem = ticker.children[0];

// Clone items until content fills at least 3x the screen width
while (ticker.scrollWidth < window.innerWidth * 3) {
  ticker.appendChild(tickerItem.cloneNode(true));
}

// Animate: scroll left seamlessly
const totalW = ticker.scrollWidth / 2;
let pos = 0;
const speed = 0.5;

(function animTicker() {
  pos -= speed;
  if (Math.abs(pos) >= totalW) pos = 0;
  ticker.style.transform = `translateX(${pos}px)`;
  requestAnimationFrame(animTicker);
})();


// ── WAVEFORM PLAY TOGGLE ─────────────────────────────────
const wf = document.getElementById('waveform');
const pb = document.getElementById('playBtn');
let playing = false;

function togglePlay() {
  playing = !playing;
  wf.classList.toggle('active', playing);
  pb.innerHTML = playing ? '&#9646;&#9646;' : '&#9654;';
}

wf.addEventListener('click', togglePlay);
pb.addEventListener('click', togglePlay);


// ── SCROLL REVEAL ────────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Fallback: si algo sigue oculto después de 1.5s, lo muestra igual
setTimeout(() => {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}, 1500);