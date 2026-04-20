// =====================
//  STATE
// =====================
const state = {
  likedVideos: new Set(),
  followedUsers: new Set(),
  followedSuggested: new Set(),
  activeCommentVideoId: null,
  userComments: {},
};

// =====================
//  HELPERS
// =====================
function formatCount(n) {
  if (typeof n === 'string') return n;
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

function getUser(userId) {
  return USERS.find(u => u.id === userId);
}

function shimmer(el) {
  el.style.transform = 'scale(1.15)';
  el.style.transition = 'transform 0.12s';
  setTimeout(() => { el.style.transform = 'scale(1)'; }, 120);
}

// =====================
//  RENDER FEED
// =====================
function renderFeed() {
  const feed = document.getElementById('feed');
  feed.innerHTML = '';
  VIDEOS.forEach(video => {
    feed.appendChild(createVideoCard(video));
  });
  // Loading spinner at bottom
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  feed.appendChild(spinner);
  // Simulate infinite scroll trigger
  setTimeout(() => { spinner.style.display = 'none'; }, 2000);
}

function createVideoCard(video) {
  const user = getUser(video.userId);
  const isLiked = state.likedVideos.has(video.id);
  const isFollowed = state.followedUsers.has(video.userId);
  const commentCount = getCommentCount(video.id);

  const card = document.createElement('div');
  card.className = 'video-card';
  card.dataset.videoId = video.id;

  // Format caption with hashtags highlighted
  const captionHtml = video.caption.replace(/(#\w+)/g, '<span class="hashtag">$1</span>');

  card.innerHTML = `
    <div class="card-left">
      <div class="avatar ${user.grad}" onclick="showProfile('${user.username}')">
        ${user.initial}
        <span class="follow-plus">+</span>
      </div>
    </div>
    <div class="card-content">
      <div class="card-header">
        <span class="username" onclick="showProfile('${user.username}')">${user.username}</span>
        <span class="display-name">${user.display}</span>
        <button class="follow-btn ${isFollowed ? 'following' : ''}" 
          data-uid="${user.id}" onclick="toggleFollow(this, ${user.id})">
          ${isFollowed ? 'Following' : 'Follow'}
        </button>
      </div>
      <p class="caption">${captionHtml}</p>
      <div class="sound-row">
        <i class="fa-solid fa-music"></i>
        <span>${video.sound}</span>
      </div>
      <div class="video-wrapper" onclick="togglePlay(this)">
        <div class="vid-placeholder ${video.colorClass}">
          <i class="fa-solid ${video.icon}"></i>
          <span>Tap to play</span>
        </div>
        <div class="video-overlay" id="overlay-${video.id}">
          <div class="play-icon"><i class="fa-solid fa-play"></i></div>
        </div>
        <div class="video-bottom">
          <span class="duration">${video.duration}</span>
          <button class="vol-btn" onclick="event.stopPropagation()">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
      <div class="actions">
        <button class="action-btn ${isLiked ? 'liked' : ''}" 
          id="like-btn-${video.id}" onclick="toggleLike(${video.id}, this)">
          <i class="fa-${isLiked ? 'solid' : 'regular'} fa-heart"></i>
          <span class="count" id="like-count-${video.id}">${video.likes}</span>
        </button>
        <button class="action-btn" onclick="openComments(${video.id})">
          <i class="fa-regular fa-comment"></i>
          <span class="count" id="comment-count-${video.id}">${formatCount(commentCount)}</span>
        </button>
        <button class="action-btn" onclick="shareVideo(${video.id}, this)">
          <i class="fa-solid fa-share"></i>
          <span class="count">${formatCount(video.shares)}</span>
        </button>
        <button class="action-btn" onclick="bookmarkVideo(this)">
          <i class="fa-regular fa-bookmark"></i>
        </button>
      </div>
    </div>
  `;
  return card;
}

// =====================
//  INTERACTIONS
// =====================
function togglePlay(wrapper) {
  const overlay = wrapper.querySelector('.video-overlay');
  const icon = overlay.querySelector('i');
  if (overlay.classList.contains('hidden')) {
    overlay.classList.remove('hidden');
    icon.className = 'fa-solid fa-play';
  } else {
    overlay.classList.add('hidden');
    icon.className = 'fa-solid fa-pause';
  }
}

function toggleLike(videoId, btn) {
  const countEl = document.getElementById(`like-count-${videoId}`);
  const video = VIDEOS.find(v => v.id === videoId);
  const icon = btn.querySelector('i');

  shimmer(btn.querySelector('i'));

  if (state.likedVideos.has(videoId)) {
    state.likedVideos.delete(videoId);
    btn.classList.remove('liked');
    icon.className = 'fa-regular fa-heart';
    // Decrement displayed count (simplified)
    const cur = countEl.textContent;
    if (!cur.includes('K') && !cur.includes('M')) {
      countEl.textContent = Math.max(0, parseInt(cur) - 1);
    }
  } else {
    state.likedVideos.add(videoId);
    btn.classList.add('liked');
    icon.className = 'fa-solid fa-heart';
    const cur = countEl.textContent;
    if (!cur.includes('K') && !cur.includes('M')) {
      countEl.textContent = parseInt(cur) + 1;
    }
  }
}

function toggleFollow(btn, userId) {
  if (state.followedUsers.has(userId)) {
    state.followedUsers.delete(userId);
    btn.textContent = 'Follow';
    btn.classList.remove('following');
  } else {
    state.followedUsers.add(userId);
    btn.textContent = 'Following';
    btn.classList.add('following');
    showToast('Following! 🎉');
  }
}

function shareVideo(videoId, btn) {
  shimmer(btn);
  const url = `https://tiktok-clone.pk/video/${videoId}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => showToast('Link copied! 🔗'));
  } else {
    showToast('Link copied! 🔗');
  }
}

function bookmarkVideo(btn) {
  const icon = btn.querySelector('i');
  shimmer(icon);
  const isSaved = icon.className.includes('solid');
  icon.className = isSaved ? 'fa-regular fa-bookmark' : 'fa-solid fa-bookmark';
  showToast(isSaved ? 'Removed from saved' : 'Saved to favorites ✨');
}

function showProfile(username) {
  showToast(`Profile: ${username}`);
}

// =====================
//  COMMENT DRAWER
// =====================
function getCommentCount(videoId) {
  const defaults = VIDEOS.find(v => v.id === videoId)?.comments || 0;
  const extra = (state.userComments[videoId] || []).length;
  return defaults + extra;
}

function openComments(videoId) {
  state.activeCommentVideoId = videoId;
  const drawer = document.getElementById('commentDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const list = document.getElementById('commentList');
  const countEl = document.getElementById('commentCount');

  countEl.textContent = formatCount(getCommentCount(videoId)) + ' comments';
  list.innerHTML = '';

  // Built-in comments
  const builtIn = COMMENTS_DATA[videoId] || generateDefaultComments();
  builtIn.forEach(c => list.appendChild(createCommentEl(c)));

  // User-added comments
  (state.userComments[videoId] || []).forEach(c => list.appendChild(createCommentEl(c)));

  drawer.classList.add('open');
  overlay.classList.add('show');
}

function closeComments() {
  document.getElementById('commentDrawer').classList.remove('open');
  document.getElementById('drawerOverlay').classList.remove('show');
  state.activeCommentVideoId = null;
}

function createCommentEl(c) {
  const el = document.createElement('div');
  el.className = 'comment-item';
  el.innerHTML = `
    <div class="comment-av ${c.grad || 'grad-1'}">${(c.user[0] || 'U').toUpperCase()}</div>
    <div class="comment-body">
      <span class="comment-user">${c.user}</span>
      <p class="comment-text">${c.text}</p>
      <div class="comment-meta">
        <span>${c.time}</span>
        <span>♥ ${formatCount(c.likes || 0)}</span>
        <span>Reply</span>
      </div>
    </div>
  `;
  return el;
}

function generateDefaultComments() {
  return [
    { user: 'user_123', grad: 'grad-3', text: 'This is amazing! 🔥', time: '1h', likes: 45 },
    { user: 'follower99', grad: 'grad-6', text: 'Keep it up! Love your content ❤️', time: '2h', likes: 23 },
    { user: 'pk_vibes', grad: 'grad-2', text: 'Pakistan zindabad! 🇵🇰', time: '3h', likes: 78 },
  ];
}

function postComment() {
  const input = document.getElementById('commentInput');
  const text = input.value.trim();
  if (!text || !state.activeCommentVideoId) return;

  const videoId = state.activeCommentVideoId;
  const newComment = {
    user: 'you',
    grad: 'grad-8',
    text: text,
    time: 'just now',
    likes: 0,
  };

  if (!state.userComments[videoId]) state.userComments[videoId] = [];
  state.userComments[videoId].push(newComment);

  const list = document.getElementById('commentList');
  const el = createCommentEl(newComment);
  el.style.animation = 'none';
  list.appendChild(el);
  list.scrollTop = list.scrollHeight;

  // Update count
  document.getElementById('commentCount').textContent =
    formatCount(getCommentCount(videoId)) + ' comments';

  const countEl = document.getElementById(`comment-count-${videoId}`);
  if (countEl) countEl.textContent = formatCount(getCommentCount(videoId));

  input.value = '';
}

// Enter key to post comment
document.getElementById('commentInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') postComment();
});

// =====================
//  SUGGESTED PANEL
// =====================
function renderSuggested() {
  const list = document.getElementById('suggestedList');
  list.innerHTML = '';
  SUGGESTED_USERS.forEach((u, i) => {
    const el = document.createElement('div');
    el.className = 'suggested-user';
    el.innerHTML = `
      <div class="sug-avatar ${u.grad}">${u.display[0]}</div>
      <div class="sug-info">
        <div class="sug-name">${u.display}</div>
        <div class="sug-handle">${u.username} · ${u.followers}</div>
      </div>
      <button class="sug-follow" data-idx="${i}" onclick="followSuggested(this, ${i})">Follow</button>
    `;
    list.appendChild(el);
  });
}

function followSuggested(btn, idx) {
  if (state.followedSuggested.has(idx)) {
    state.followedSuggested.delete(idx);
    btn.textContent = 'Follow';
    btn.style.background = 'transparent';
    btn.style.color = 'var(--accent)';
  } else {
    state.followedSuggested.add(idx);
    btn.textContent = 'Following';
    btn.style.background = 'var(--accent)';
    btn.style.color = 'white';
    showToast(`Following ${SUGGESTED_USERS[idx].display}! 🎉`);
  }
}

// =====================
//  SIDEBAR NAV
// =====================
document.querySelectorAll('.nav-links li').forEach(li => {
  li.addEventListener('click', () => {
    document.querySelectorAll('.nav-links li').forEach(x => x.classList.remove('active'));
    li.classList.add('active');
  });
});

// =====================
//  TOAST NOTIFICATION
// =====================
let toastTimer = null;
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
      background: #333; color: #fff; padding: 10px 20px; border-radius: 20px;
      font-size: 14px; z-index: 999; transition: opacity 0.3s; pointer-events: none;
      white-space: nowrap;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}

// =====================
//  TAG CLICK
// =====================
document.querySelectorAll('.tag').forEach(tag => {
  tag.addEventListener('click', () => {
    showToast(`Searching ${tag.textContent}...`);
  });
});

// =====================
//  LOGIN BUTTON
// =====================
document.querySelector('.login-btn').addEventListener('click', () => {
  showToast('Login coming soon! 🔐');
});

// =====================
//  INIT
// =====================
renderFeed();
renderSuggested();
