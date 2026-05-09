export const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter',
    emoji: '📗',
    price: 99000,
    bookCount: 10,
    maxReadReward: 30000,
    referralCommission: 0.10,
    color: '#00C896',
    colorSoft: 'rgba(0, 200, 150, 0.12)',
    features: [
      '10 buku digital pilihan',
      'Reward baca hingga Rp 30.000',
      'Komisi referral 10%',
      'Akses komunitas pembaca',
    ],
  },
  {
    id: 'reader',
    name: 'Reader',
    emoji: '📘',
    price: 249000,
    bookCount: 25,
    maxReadReward: 75000,
    referralCommission: 0.12,
    color: '#4A90D9',
    colorSoft: 'rgba(74, 144, 217, 0.12)',
    popular: true,
    features: [
      '25 buku digital premium',
      'Reward baca hingga Rp 75.000',
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
    bookCount: 50,
    maxReadReward: 150000,
    referralCommission: 0.15,
    color: '#F5A623',
    colorSoft: 'rgba(245, 166, 35, 0.12)',
    features: [
      '50 buku digital terlengkap',
      'Reward baca hingga Rp 150.000',
      'Komisi referral 15%',
      'Akses semua fitur + prioritas',
      'Badge Champion eksklusif',
      'Early access buku baru',
    ],
  },
];

export const MOCK_BOOKS = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', genre: 'Self-Help', cover: '📘', pages: 320, chapters: 20, rating: 4.8, progress: 65, rewardPerBook: 3000, color: '#4A90D9' },
  { id: 2, title: 'Filosofi Teras', author: 'Henry Manampiring', genre: 'Filosofi', cover: '📙', pages: 280, chapters: 16, rating: 4.7, progress: 30, rewardPerBook: 3000, color: '#F5A623' },
  { id: 3, title: 'Laut Bercerita', author: 'Leila S. Chudori', genre: 'Fiksi', cover: '📕', pages: 400, chapters: 24, rating: 4.9, progress: 0, rewardPerBook: 3000, color: '#E74C3C' },
  { id: 4, title: 'Sapiens', author: 'Yuval N. Harari', genre: 'Sains', cover: '📗', pages: 464, chapters: 20, rating: 4.6, progress: 100, rewardPerBook: 3000, color: '#00C896' },
  { id: 5, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', genre: 'Bisnis', cover: '📒', pages: 336, chapters: 10, rating: 4.5, progress: 0, rewardPerBook: 3000, color: '#9B59B6' },
  { id: 6, title: 'Bumi', author: 'Tere Liye', genre: 'Fiksi', cover: '📓', pages: 440, chapters: 30, rating: 4.8, progress: 45, rewardPerBook: 3000, color: '#3498DB' },
  { id: 7, title: 'The Psychology of Money', author: 'Morgan Housel', genre: 'Bisnis', cover: '📔', pages: 256, chapters: 20, rating: 4.7, progress: 0, rewardPerBook: 3000, color: '#1ABC9C' },
  { id: 8, title: 'Madilog', author: 'Tan Malaka', genre: 'Filosofi', cover: '📕', pages: 340, chapters: 12, rating: 4.4, progress: 0, rewardPerBook: 3000, color: '#E67E22' },
  { id: 9, title: 'Laskar Pelangi', author: 'Andrea Hirata', genre: 'Fiksi', cover: '📘', pages: 534, chapters: 34, rating: 4.9, progress: 0, rewardPerBook: 3000, color: '#2980B9' },
  { id: 10, title: 'Ikigai', author: 'Héctor García', genre: 'Self-Help', cover: '📗', pages: 194, chapters: 11, rating: 4.6, progress: 80, rewardPerBook: 3000, color: '#27AE60' },
];

export const MOCK_USER = {
  name: 'Budi Santoso',
  email: 'budi@email.com',
  phone: '081234567890',
  avatar: '👤',
  level: 'Pembaca Aktif',
  package: 'reader',
  referralCode: 'BUDI2024',
  joinDate: '2024-11-15',
  stats: {
    booksCompleted: 4,
    booksInProgress: 3,
    totalPagesRead: 1280,
    currentStreak: 7,
    longestStreak: 14,
    totalReadingMinutes: 2400,
    totalReward: 45000,
    totalReferralIncome: 89640,
    referralCount: 6,
  },
};

export const MOCK_REWARDS = [
  { id: 1, type: 'read', label: 'Selesai baca: Sapiens', amount: 3000, date: '2024-12-28' },
  { id: 2, type: 'quiz', label: 'Quiz: Sapiens (5/5)', amount: 2500, date: '2024-12-28' },
  { id: 3, type: 'referral', label: 'Referral: Ani (Paket Starter)', amount: 9900, date: '2024-12-27' },
  { id: 4, type: 'read', label: 'Selesai baca: Atomic Habits (bab 13)', amount: 500, date: '2024-12-26' },
  { id: 5, type: 'streak', label: 'Streak 7 hari berturut', amount: 2000, date: '2024-12-26' },
  { id: 6, type: 'referral', label: 'Referral: Cici (Paket Reader)', amount: 29880, date: '2024-12-25' },
  { id: 7, type: 'read', label: 'Selesai baca: Ikigai (bab 8)', amount: 500, date: '2024-12-24' },
  { id: 8, type: 'challenge', label: 'Tantangan: Baca 4 buku Desember', amount: 5000, date: '2024-12-23' },
  { id: 9, type: 'referral', label: 'Referral: Doni (Paket Reader)', amount: 29880, date: '2024-12-22' },
  { id: 10, type: 'read', label: 'Selesai baca: Filosofi Teras (bab 5)', amount: 500, date: '2024-12-21' },
];

export const MOCK_REFERRALS = [
  { id: 1, name: 'Ani Wijaya', package: 'Starter', date: '2024-12-27', commission: 9900, active: true },
  { id: 2, name: 'Cici Lestari', package: 'Reader', date: '2024-12-25', commission: 29880, active: true },
  { id: 3, name: 'Doni Pratama', package: 'Reader', date: '2024-12-22', commission: 29880, active: true },
  { id: 4, name: 'Eka Putri', package: 'Starter', date: '2024-12-18', commission: 9900, active: true },
  { id: 5, name: 'Fajar Nugroho', package: 'Premium', date: '2024-12-15', commission: 59880, active: false },
  { id: 6, name: 'Gita Sari', package: 'Starter', date: '2024-12-10', commission: 9900, active: true },
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

export const formatCurrency = (amount) => {
  return 'Rp ' + amount.toLocaleString('id-ID');
};
