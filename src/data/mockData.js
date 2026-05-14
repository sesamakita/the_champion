// ===== EDU COIN (EC) SYSTEM =====
// Exchange Rate: 1 EC = Rp 100

export const EC_CONFIG = {
  name: 'Edu Coin',
  symbol: 'EC',
  icon: '🪙',
  exchangeRate: 100, // 1 EC = Rp 100
  minWithdrawal: 500,
  withdrawalFee: 25,
  withdrawalFreeThreshold: 1000,
  minTopUp: 100,
  rewardExpiryDays: 180,
  dailyEarnCap: 200,
};

export const EARNING_RULES = {
  readReward: 40,
  quizReward: 15,
  quizPerfectBonus: 5,
  streakReward: 20,
  streakMaxPerMonth: 4,
  bookPrice: 150, // buku satuan
  referralRates: {
    starter: 0.10,
    reader: 0.12,
    premium: 0.15,
  },
  minReadingMinutesPerPage: 0.5,
};

export const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter',
    emoji: '📗',
    price: 99000,
    priceEC: 990,
    bookCount: 10,
    rewardPerBook: 40,
    rewardPerQuiz: 15,
    maxReadReward: 400,
    maxQuizReward: 150,
    maxTotalReward: 550,
    referralCommission: 0.10,
    color: '#00C896',
    colorSoft: 'rgba(0, 200, 150, 0.12)',
    features: [
      '10 buku digital pilihan',
      'Reward baca 40 EC/buku',
      'Komisi referral 10%',
      'Akses komunitas pembaca',
    ],
  },
  {
    id: 'reader',
    name: 'Reader',
    emoji: '📘',
    price: 249000,
    priceEC: 2490,
    bookCount: 25,
    rewardPerBook: 40,
    rewardPerQuiz: 15,
    maxReadReward: 1000,
    maxQuizReward: 375,
    maxTotalReward: 1375,
    referralCommission: 0.12,
    color: '#4A90D9',
    colorSoft: 'rgba(74, 144, 217, 0.12)',
    popular: true,
    features: [
      '25 buku digital premium',
      'Reward baca 40 EC/buku',
      'Komisi referral 12%',
      'Akses komunitas + tantangan',
      'Badge eksklusif',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    emoji: '📕',
    price: 499000,
    priceEC: 4990,
    bookCount: 50,
    rewardPerBook: 40,
    rewardPerQuiz: 15,
    maxReadReward: 2000,
    maxQuizReward: 750,
    maxTotalReward: 2750,
    referralCommission: 0.15,
    color: '#F5A623',
    colorSoft: 'rgba(245, 166, 35, 0.12)',
    features: [
      '50 buku digital terlengkap',
      'Reward baca 40 EC/buku',
      'Komisi referral 15%',
      'Akses semua fitur + prioritas',
      'Badge Champion eksklusif',
      'Early access buku baru',
    ],
  },
];

export const MOCK_BOOKS = [
  { 
    id: 11, 
    title: 'Speak: Mengatasi Rasa Takut Bicara', 
    author: 'Deni Apps', 
    genre: 'Self-Help', 
    cover: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=400', 
    pages: 120, 
    chapters: 12, 
    rating: 5.0, 
    progress: 0, 
    rewardEC: 50, 
    color: '#FF5733', 
    isPremium: false, 
    pdfUrl: '/books/speak-book.pdf' 
  },
  { id: 1, title: 'Atomic Habits', author: 'James Clear', genre: 'Self-Help', cover: '📘', pages: 320, chapters: 20, rating: 4.8, progress: 0, rewardEC: 40, color: '#4A90D9', isPremium: true },
  { id: 2, title: 'Filosofi Teras', author: 'Henry Manampiring', genre: 'Filosofi', cover: '📙', pages: 280, chapters: 16, rating: 4.7, progress: 0, rewardEC: 40, color: '#F5A623', isPremium: true },
  { id: 3, title: 'Laut Bercerita', author: 'Leila S. Chudori', genre: 'Fiksi', cover: '📕', pages: 400, chapters: 24, rating: 4.9, progress: 0, rewardEC: 40, color: '#E74C3C', isPremium: true },
  { id: 4, title: 'Sapiens', author: 'Yuval N. Harari', genre: 'Sains', cover: '📗', pages: 464, chapters: 20, rating: 4.6, progress: 0, rewardEC: 40, color: '#00C896', isPremium: true },
  { id: 5, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', genre: 'Bisnis', cover: '📒', pages: 336, chapters: 10, rating: 4.5, progress: 0, rewardEC: 40, color: '#9B59B6', isPremium: true },
  { id: 6, title: 'Bumi', author: 'Tere Liye', genre: 'Fiksi', cover: '📓', pages: 440, chapters: 30, rating: 4.8, progress: 0, rewardEC: 40, color: '#3498DB', isPremium: true },
  { id: 7, title: 'The Psychology of Money', author: 'Morgan Housel', genre: 'Bisnis', cover: '📔', pages: 256, chapters: 20, rating: 4.7, progress: 0, rewardEC: 40, color: '#1ABC9C', isPremium: true },
  { id: 8, title: 'Panduan Membaca', author: 'Team Champion', genre: 'Pendidikan', cover: '📖', pages: 50, chapters: 5, rating: 5.0, progress: 0, rewardEC: 0, color: '#95a5a6', isPremium: false },
  { id: 9, title: 'Tips Menabung EC', author: 'Finance Pro', genre: 'Bisnis', cover: '💰', pages: 30, chapters: 3, rating: 4.9, progress: 0, rewardEC: 0, color: '#f1c40f', isPremium: false },
  { id: 10, title: 'Ikigai', author: 'Héctor García', genre: 'Self-Help', cover: '📗', pages: 194, chapters: 11, rating: 4.6, progress: 0, rewardEC: 40, color: '#27AE60', isPremium: true },
];

export const MOCK_WALLET = {
  earnedBalance: 450,
  topUpBalance: 0,
  totalBalance: 450,
  lifetimeEarned: 1230,
  lifetimeSpent: 780,
  lifetimeWithdrawn: 0,
};

export const MOCK_USER = {
  name: 'Budi Santoso',
  email: 'budi@email.com',
  phone: '081234567890',
  avatar: '👤',
  level: 'Pembaca Baru',
  package: null, // Start as Guest
  referralCode: 'BUDI2024',
  joinDate: '2024-11-15',
  wallet: { ...MOCK_WALLET, totalBalance: 0, earnedBalance: 0 },
  stats: {
    booksCompleted: 0,
    booksInProgress: 0,
    totalPagesRead: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalReadingMinutes: 0,
    totalEarnedEC: 0,
    totalReferralEC: 0,
    referralCount: 0,
  },
};

export const MOCK_TRANSACTIONS = [
  { id: 1, type: 'EARN_READ', label: 'Selesai baca: Sapiens', amount: 40, date: '2024-12-28', status: 'COMPLETED' },
  { id: 2, type: 'EARN_QUIZ_PERFECT', label: 'Quiz Perfect: Sapiens (5/5)', amount: 20, date: '2024-12-28', status: 'COMPLETED' },
  { id: 3, type: 'EARN_REF', label: 'Referral: Ani (Paket Starter)', amount: 99, date: '2024-12-27', status: 'COMPLETED' },
  { id: 4, type: 'EARN_READ', label: 'Selesai baca: Atomic Habits (bab 13)', amount: 5, date: '2024-12-26', status: 'COMPLETED' },
  { id: 5, type: 'EARN_STREAK', label: 'Streak 7 hari berturut', amount: 20, date: '2024-12-26', status: 'COMPLETED' },
  { id: 6, type: 'EARN_REF', label: 'Referral: Cici (Paket Reader)', amount: 299, date: '2024-12-25', status: 'COMPLETED' },
  { id: 7, type: 'EARN_READ', label: 'Selesai baca: Ikigai (bab 8)', amount: 5, date: '2024-12-24', status: 'COMPLETED' },
  { id: 8, type: 'EARN_BONUS', label: 'Tantangan: Baca 4 buku Desember', amount: 50, date: '2024-12-23', status: 'COMPLETED' },
  { id: 9, type: 'EARN_REF', label: 'Referral: Doni (Paket Reader)', amount: 299, date: '2024-12-22', status: 'COMPLETED' },
  { id: 10, type: 'SPEND_BOOK', label: 'Beli buku: The Psychology of Money', amount: -150, date: '2024-12-21', status: 'COMPLETED' },
  { id: 11, type: 'EARN_READ', label: 'Selesai baca: Filosofi Teras (bab 5)', amount: 5, date: '2024-12-21', status: 'COMPLETED' },
];

export const MOCK_REFERRALS = [
  { id: 1, name: 'Ani Wijaya', package: 'Starter', date: '2024-12-27', commissionEC: 99, active: true },
  { id: 2, name: 'Cici Lestari', package: 'Reader', date: '2024-12-25', commissionEC: 299, active: true },
  { id: 3, name: 'Doni Pratama', package: 'Reader', date: '2024-12-22', commissionEC: 299, active: true },
  { id: 4, name: 'Eka Putri', package: 'Starter', date: '2024-12-18', commissionEC: 99, active: true },
  { id: 5, name: 'Fajar Nugroho', package: 'Premium', date: '2024-12-15', commissionEC: 599, active: false },
  { id: 6, name: 'Gita Sari', package: 'Starter', date: '2024-12-10', commissionEC: 99, active: true },
];

export const MOCK_QUIZ = [
  { id: 1, question: 'Apa konsep utama yang dibahas dalam buku "Atomic Habits"?', options: ['Kebiasaan kecil yang berdampak besar', 'Meditasi harian', 'Olahraga intensif', 'Manajemen waktu'], correct: 0 },
  { id: 2, question: 'Siapa penulis buku "Filosofi Teras"?', options: ['Tere Liye', 'Andrea Hirata', 'Henry Manampiring', 'Dee Lestari'], correct: 2 },
  { id: 3, question: 'Dalam "Sapiens", Homo sapiens mulai mendominasi bumi sejak era apa?', options: ['Revolusi Industri', 'Revolusi Kognitif', 'Revolusi Digital', 'Revolusi Hijau'], correct: 1 },
  { id: 4, question: 'Apa arti kata "Ikigai" dalam bahasa Jepang?', options: ['Kedamaian', 'Alasan untuk hidup', 'Kebijaksanaan', 'Keberanian'], correct: 1 },
  { id: 5, question: 'Buku "Laut Bercerita" berkisah tentang era apa di Indonesia?', options: ['Reformasi 1998', 'Orde Baru', 'Kemerdekaan', 'Orde Lama'], correct: 1 },
];

export const GENRES = ['Semua', 'Fiksi', 'Non-Fiksi', 'Self-Help', 'Bisnis', 'Filosofi', 'Sains', 'Pendidikan'];

export const BADGES = [
  { id: 1, name: 'Pembaca Pertama', icon: '📖', description: 'Selesaikan buku pertamamu', unlocked: true },
  { id: 2, name: 'Streak 7 Hari', icon: '🔥', description: '7 hari membaca berturut-turut', unlocked: true },
  { id: 3, name: 'Penakluk 5 Buku', icon: '🏅', description: 'Selesaikan 5 buku', unlocked: false },
  { id: 4, name: 'Quiz Master', icon: '🧠', description: 'Perfect score 3x quiz', unlocked: true },
  { id: 5, name: 'Referral Star', icon: '⭐', description: 'Ajak 5 teman bergabung', unlocked: true },
  { id: 6, name: 'Marathon Reader', icon: '🏃', description: 'Baca 100 halaman dalam sehari', unlocked: false },
  { id: 7, name: 'Book Worm', icon: '🐛', description: 'Selesaikan 10 buku', unlocked: false },
  { id: 8, name: 'The Champion', icon: '🏆', description: 'Selesaikan semua buku di paket', unlocked: false },
];

export const GIFTS_CATALOG = [
  { id: 1, name: 'Bookmark Eksklusif', icon: '🔖', priceEC: 100, stock: 50 },
  { id: 2, name: 'Voucher Shopee 25K', icon: '🛍️', priceEC: 300, stock: 20 },
  { id: 3, name: 'Tumblr The Champion', icon: '🥤', priceEC: 500, stock: 15 },
  { id: 4, name: 'Earphone Wireless', icon: '🎧', priceEC: 1500, stock: 5 },
];

// ===== FORMATTERS =====

export const formatEC = (amount) => {
  return `${Math.abs(amount).toLocaleString('id-ID')} EC`;
};

export const formatCurrency = (amount) => {
  return 'Rp ' + amount.toLocaleString('id-ID');
};

export const ecToRupiah = (ec) => {
  return ec * EC_CONFIG.exchangeRate;
};

export const rupiahToEC = (rupiah) => {
  return Math.floor(rupiah / EC_CONFIG.exchangeRate);
};

// Transaction type icons & colors
export const TX_META = {
  EARN_READ: { icon: '📖', color: 'var(--accent)', label: 'Baca' },
  EARN_QUIZ: { icon: '🧠', color: '#9B59B6', label: 'Quiz' },
  EARN_QUIZ_PERFECT: { icon: '🧠', color: '#9B59B6', label: 'Quiz Perfect' },
  EARN_REF: { icon: '👥', color: 'var(--secondary)', label: 'Referral' },
  EARN_STREAK: { icon: '🔥', color: 'var(--primary)', label: 'Streak' },
  EARN_BONUS: { icon: '🎯', color: '#E74C3C', label: 'Bonus' },
  SPEND_BOOK: { icon: '📚', color: '#E67E22', label: 'Beli Buku' },
  SPEND_GIFT: { icon: '🎁', color: '#E91E63', label: 'Hadiah' },
  WITHDRAW: { icon: '🏧', color: '#607D8B', label: 'Penarikan' },
  TOPUP: { icon: '💎', color: '#00BCD4', label: 'Top Up' },
};
