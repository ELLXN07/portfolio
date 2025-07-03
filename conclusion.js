// Like and visit counter logic
const likeBtn = document.getElementById('like-btn');
const likeCountEl = document.getElementById('like-count');
const visitCountEl = document.getElementById('visit-count');
const FEEDBACK_KEY = 'conclusion-feedback';
const LIKE_KEY = 'site-like';
const VISIT_KEY = 'site-visit';

// Visit counter
let visits = parseInt(localStorage.getItem(VISIT_KEY) || '0', 10) + 1;
localStorage.setItem(VISIT_KEY, visits);
visitCountEl.textContent = visits;

// Like counter
let likes = parseInt(localStorage.getItem(LIKE_KEY) || '0', 10);
let liked = localStorage.getItem(LIKE_KEY + '-user') === '1';
likeCountEl.textContent = likes;
if (liked) likeBtn.classList.add('liked');
likeBtn.addEventListener('click', () => {
  if (!liked) {
    likes++;
    likeCountEl.textContent = likes;
    localStorage.setItem(LIKE_KEY, likes);
    localStorage.setItem(LIKE_KEY + '-user', '1');
    likeBtn.classList.add('liked');
  }
});

// Feedback form (optional thank you)
const feedbackBox = document.getElementById('conclusion-textbox');
const feedbackBtn = document.getElementById('conclusion-submit');
feedbackBtn.addEventListener('click', () => {
  if (feedbackBox.value.trim()) {
    localStorage.setItem(FEEDBACK_KEY, feedbackBox.value.trim());
    feedbackBox.value = '';
    feedbackBox.placeholder = 'Thank you for your feedback!';
    setTimeout(() => {
      feedbackBox.placeholder = 'Your feedback, thoughts, or a hello...';
    }, 2000);
  }
}); 