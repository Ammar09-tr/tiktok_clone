# TikTok Clone — Frontend Project

A fully functional TikTok-style short video platform frontend built with pure HTML, CSS, and JavaScript. No frameworks, no build tools — just open `index.html` in your browser!

## 🚀 Getting Started

1. **Download** and unzip the project folder
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge)
3. That's it! No server or npm install needed

## 📁 Project Structure

```
tiktok-clone/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles (dark theme, layout, components)
├── js/
│   ├── data.js         # Mock video, user, and comment data
│   └── app.js          # All interactivity and rendering logic
└── README.md
```

## ✨ Features

### UI & Layout
- ✅ Sidebar navigation (Home, Explore, Following, LIVE, Profile)
- ✅ Main video feed with scroll
- ✅ Right panel with suggested accounts
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Dark theme matching TikTok's aesthetic

### Video Cards
- ✅ Video placeholder with tap-to-play toggle
- ✅ User avatar, username, display name
- ✅ Caption with highlighted hashtags
- ✅ Sound/audio track row
- ✅ Video duration badge

### Interactions
- ✅ **Like / Unlike** — heart toggle with animation
- ✅ **Follow / Unfollow** — per creator
- ✅ **Comment drawer** — slide-up panel with real comments
- ✅ **Post comments** — type and press Enter or send button
- ✅ **Share** — copies link to clipboard
- ✅ **Bookmark / Save** — toggle save state
- ✅ **Suggested accounts** — follow/unfollow in right panel
- ✅ **Toast notifications** — feedback for all actions

### Data
- 8 mock videos with Pakistani creators & content
- 5 suggested accounts
- Rich comment threads per video
- All data in `js/data.js` — easy to edit

## 🛠️ Customization

### Add a new video
In `js/data.js`, add an object to the `VIDEOS` array:
```js
{
  id: 9,
  userId: 1,           // Must match a user in USERS array
  caption: 'Your caption here #hashtag',
  sound: 'Song Name - Artist',
  likes: '10K', comments: 500, shares: 200, duration: '0:30',
  colorClass: 'vid-color-2',  // vid-color-1 through vid-color-6
  icon: 'fa-star',            // Any FontAwesome icon name
  tags: ['#hashtag'],
}
```

### Add a new user
```js
{ id: 9, username: '@newuser', display: 'New User', grad: 'grad-3', initial: 'N', followers: '100K', likes: '500K' }
```

### Change the color theme
Edit CSS variables in `css/style.css`:
```css
:root {
  --accent: #fe2c55;    /* TikTok red — change to any color */
  --accent2: #25f4ee;   /* Teal — secondary accent */
  --bg: #121212;         /* Background */
}
```

## 📱 Responsive Breakpoints
- **Desktop** (>1100px): Sidebar + Feed + Right panel
- **Tablet** (720–1100px): Sidebar + Feed only
- **Mobile** (<720px): Icon-only sidebar + Feed

## 🔧 Technologies Used
- HTML5
- CSS3 (Custom Properties, Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- Font Awesome 6.5 (icons via CDN)
- Google Fonts (via CDN — Segoe UI fallback)

## 📝 License
Free to use for portfolio and learning purposes.
