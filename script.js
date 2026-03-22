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
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));