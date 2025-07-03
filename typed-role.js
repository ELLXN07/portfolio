const phrases = [
  "I'm an AI Engineer",
  "I Love coding",
  "I build cool projects",
  "I build things that think.",
  "I watch a lot of movies",
  "I enjoy learning new things",
  "I swear it worked last time.",
  "It worked on my computer.",
  "Inspired by Nolan. Coding like Tarantino.",
  "I turn coffee into code and ideas into reality."
];
const el = document.getElementById('typed-role');
let phraseIndex = 0;
let charIndex = 0;
let typing = true;
const staticPrefix = 'I';
function typeLoop() {
  if (!el) return;
  const phrase = phrases[phraseIndex];
  // Always keep the 'I' at the start
  if (typing) {
    if (charIndex < phrase.length) {
      el.textContent = phrase.slice(0, charIndex + 1);
      charIndex++;
      setTimeout(typeLoop, 70);
    } else {
      typing = false;
      setTimeout(typeLoop, 1200);
    }
  } else {
    if (charIndex > staticPrefix.length) {
      el.textContent = phrase.slice(0, charIndex - 1);
      charIndex--;
      setTimeout(typeLoop, 35);
    } else {
      typing = true;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeLoop, 400);
    }
  }
}
typeLoop(); 