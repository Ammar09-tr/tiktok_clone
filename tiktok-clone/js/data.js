// =====================
//  MOCK DATA
// =====================

const USERS = [
  { id: 1, username: '@zahra.official', display: 'Zahra Khan', grad: 'grad-1', initial: 'Z', followers: '2.4M', likes: '18.6M' },
  { id: 2, username: '@ali.creates', display: 'Ali Hassan', grad: 'grad-2', initial: 'A', followers: '890K', likes: '4.1M' },
  { id: 3, username: '@fatima.daily', display: 'Fatima Malik', grad: 'grad-3', initial: 'F', followers: '1.2M', likes: '9.8M' },
  { id: 4, username: '@omar_vibes', display: 'Omar Siddiq', grad: 'grad-4', initial: 'O', followers: '455K', likes: '2.3M' },
  { id: 5, username: '@sana.artsy', display: 'Sana Riaz', grad: 'grad-5', initial: 'S', followers: '3.1M', likes: '22.4M' },
  { id: 6, username: '@bilal.code', display: 'Bilal Qureshi', grad: 'grad-6', initial: 'B', followers: '678K', likes: '3.5M' },
  { id: 7, username: '@nadia.travel', display: 'Nadia Shah', grad: 'grad-7', initial: 'N', followers: '1.8M', likes: '14.2M' },
  { id: 8, username: '@hasan.chef', display: 'Hasan Raza', grad: 'grad-8', initial: 'H', followers: '560K', likes: '6.1M' },
];

const VIDEOS = [
  {
    id: 1, userId: 1,
    caption: 'Morning vibes in Lahore 🌄 Nothing beats the desi chai with this view #lahore #morningvibes #pakistan',
    sound: 'Ustad Nusrat Fateh Ali Khan - Tere Bin',
    likes: '342K', comments: 4821, shares: 12400, duration: '0:28',
    colorClass: 'vid-color-1', icon: 'fa-sun',
    tags: ['#lahore', '#morningvibes', '#pakistan'],
  },
  {
    id: 2, userId: 2,
    caption: 'Built this full-stack app in 24 hours 🤯 React + Node + MongoDB. Tutorial dropping soon! #webdev #coding #100daysofcode',
    sound: 'Lo-fi Coding Beats',
    likes: '89K', comments: 2143, shares: 5600, duration: '0:45',
    colorClass: 'vid-color-3', icon: 'fa-code',
    tags: ['#webdev', '#coding', '#100daysofcode'],
  },
  {
    id: 3, userId: 3,
    caption: 'Trying viral biryani recipe 🍛 This is INSANE #biryani #foodie #pakistanifood #viral',
    sound: 'Original Audio - fatima.daily',
    likes: '1.2M', comments: 31200, shares: 89400, duration: '0:32',
    colorClass: 'vid-color-2', icon: 'fa-bowl-rice',
    tags: ['#biryani', '#foodie', '#pakistanifood'],
  },
  {
    id: 4, userId: 4,
    caption: 'Nathia Gali sunset hits different 😍🏔️ #nathiagali #abbottabad #travel #pakistan #mountains',
    sound: 'Atif Aslam - Dooriyan',
    likes: '567K', comments: 8920, shares: 23100, duration: '0:18',
    colorClass: 'vid-color-5', icon: 'fa-mountain',
    tags: ['#nathiagali', '#travel', '#pakistan'],
  },
  {
    id: 5, userId: 5,
    caption: 'Traditional truck art but make it modern ✨🎨 POV: You are a Pakistani artist #truckart #pakistan #art #viral',
    sound: 'Coke Studio Season 14 - Pasoori',
    likes: '2.1M', comments: 45600, shares: 112000, duration: '1:02',
    colorClass: 'vid-color-4', icon: 'fa-palette',
    tags: ['#truckart', '#pakistan', '#art'],
  },
  {
    id: 6, userId: 6,
    caption: 'React hooks explained in 60 seconds ⚡ Save this for later! #reactjs #javascript #programming #devtips',
    sound: 'Tokyo Machine - RISE',
    likes: '156K', comments: 3400, shares: 18200, duration: '1:00',
    colorClass: 'vid-color-6', icon: 'fa-laptop-code',
    tags: ['#reactjs', '#javascript', '#programming'],
  },
  {
    id: 7, userId: 7,
    caption: 'Solo trip to Hunza Valley 🏞️ The most breathtaking place on Earth #hunza #gilgitbaltistan #travel #adventure',
    sound: 'Sajjad Ali - Bolo Bolo',
    likes: '890K', comments: 17800, shares: 45000, duration: '0:52',
    colorClass: 'vid-color-3', icon: 'fa-camera',
    tags: ['#hunza', '#gilgitbaltistan', '#travel'],
  },
  {
    id: 8, userId: 8,
    caption: 'Nihari recipe passed down 3 generations 🍲❤️ Karachi walo comment karo! #nihari #karachifood #streetfood #recipe',
    sound: 'Original Audio - hasan.chef',
    likes: '445K', comments: 9900, shares: 28700, duration: '0:38',
    colorClass: 'vid-color-1', icon: 'fa-utensils',
    tags: ['#nihari', '#karachifood', '#streetfood'],
  },
];

const COMMENTS_DATA = {
  1: [
    { user: 'maryam.k', grad: 'grad-2', text: 'This view is absolutely magical! Lahore represent 🌟', time: '2h', likes: 234 },
    { user: 'usman90', grad: 'grad-4', text: 'I grew up here and still get emotional seeing this 🥺', time: '3h', likes: 189 },
    { user: 'laila.writes', grad: 'grad-5', text: 'The golden light is everything omg', time: '4h', likes: 97 },
    { user: 'raza.official', grad: 'grad-1', text: 'Which area is this exactly? So stunning!', time: '5h', likes: 45 },
    { user: 'aisha.m', grad: 'grad-7', text: 'Miss home so much watching this 😭❤️', time: '6h', likes: 312 },
  ],
  2: [
    { user: 'code.with.sara', grad: 'grad-3', text: 'Tutorial please! I need this in my life rn 🙏', time: '1h', likes: 567 },
    { user: 'dev.hamza', grad: 'grad-6', text: 'What hosting did you use? Vercel or Railway?', time: '2h', likes: 89 },
    { user: 'zara.tech', grad: 'grad-8', text: 'You forgot sleep in those 24 hours 😂', time: '3h', likes: 445 },
    { user: 'imran.codes', grad: 'grad-2', text: 'Subscribed! Can\'t wait for the tutorial', time: '4h', likes: 102 },
  ],
  3: [
    { user: 'foodie.pk', grad: 'grad-1', text: 'The cardamom ratio is key! Great recipe 🫶', time: '30m', likes: 1234 },
    { user: 'karachi.eats', grad: 'grad-4', text: 'Add a little bit of kewra water at the end, trust me!', time: '1h', likes: 890 },
    { user: 'ammi.kitchen', grad: 'grad-6', text: 'My ammi does it exactly like this! Authentic ❤️', time: '2h', likes: 2341 },
    { user: 'desi.foodie', grad: 'grad-2', text: 'Why does this make me so hungry at 3am 😩', time: '3h', likes: 567 },
    { user: 'lahori.naan', grad: 'grad-5', text: 'Finally a recipe that doesn\'t use shortcuts!', time: '4h', likes: 334 },
    { user: 'biryani.lover', grad: 'grad-7', text: 'Karachi vs Lahore biryani debate incoming 😂', time: '5h', likes: 1122 },
  ],
};

const SUGGESTED_USERS = [
  { username: '@ayesha.beauty', display: 'Ayesha Noor', grad: 'grad-1', followers: '1.4M' },
  { username: '@tariq.fitness', display: 'Tariq Ahmed', grad: 'grad-3', followers: '892K' },
  { username: '@mehwish.art', display: 'Mehwish Hayat', grad: 'grad-5', followers: '3.2M' },
  { username: '@pakistan.travel', display: 'Visit Pakistan', grad: 'grad-2', followers: '5.6M' },
  { username: '@desi.comedy', display: 'Desi Laughs', grad: 'grad-4', followers: '2.1M' },
];
