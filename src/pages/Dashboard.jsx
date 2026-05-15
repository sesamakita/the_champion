import { useState, useEffect } from 'react';
import { MOCK_USER, MOCK_BOOKS, EC_CONFIG, formatEC, getActiveUser } from '../data/mockData';
import { BookOpen, Flame, Target, TrendingUp, ChevronRight, Wallet, Play, Clock, Coins, Users, Bell } from 'lucide-react';
import { getAllReadingProgress } from '../hooks/useReadingSession';
import { useWallet } from '../hooks/useWallet';

const Dashboard = ({ navigateTo }) => {
  const { wallet } = useWallet();
  const user = getActiveUser();
  const reading = MOCK_BOOKS.filter(b => b.progress > 0 && b.progress < 100);
  const completed = MOCK_BOOKS.filter(b => b.progress === 100).length;
  const days = ['S', 'S', 'R', 'K', 'J', 'S', 'M'];

  // === PERSISTED READING PROGRESS ===
  const [continueBooks, setContinueBooks] = useState([]);

  useEffect(() => {
    const allProgress = getAllReadingProgress();
    const booksWithProgress = Object.entries(allProgress)
      .map(([bookId, data]) => {
        const book = MOCK_BOOKS.find(b => b.id === parseInt(bookId));
        if (!book || !data || data.lastPage <= 1) return null;
        return { ...book, savedProgress: data };
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.savedProgress.lastReadAt) - new Date(a.savedProgress.lastReadAt));
    setContinueBooks(booksWithProgress);
  }, []);

  const formatTime = (seconds) => {
    if (!seconds) return '00:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const pad = (n) => String(n).padStart(2, '0');
    if (hrs > 0) return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    return `${pad(mins)}:${pad(secs)}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <div className="page-header">
        <div className="header-left">
          <div className="header-avatar">{user.avatar}</div>
          <div>
            <div className="header-greeting">Selamat Datang</div>
            <div className="header-name">{user.name.split(' ')[0]} 👋</div>
          </div>
        </div>
        <div className="header-actions">
          <div className="header-btn" onClick={() => navigateTo('referral')}>
            <TrendingUp size={18} />
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="main-scroll hide-scrollbar">
        {/* Conditional Header: Wallet vs Upgrade Banner */}
        {!user.package ? (
          <div className="card-primary fade-in" onClick={() => navigateTo('package-select')}>
            <div className="card-primary-bg"></div>
            <div className="frame">
              <div className="text-wrapper">MODE GRATIS</div>
            </div>
            <div className="div">
              <div className="text-wrapper-2">Buka Potensi Reward Kamu !</div>
              <p className="p">
                Kamu bisa menghasilkan hingga <strong>2.750 EC</strong> dengan upgrade ke paket Premium.
              </p>
            </div>
            <div className="frame-2">
              <div className="frame-3">
                <div className="frame-4">
                  <div className="frame-5">
                    <div className="img"><Coins size={20} color="var(--primary)" /></div>
                    <div className="text-wrapper-3">40 EC</div>
                  </div>
                  <div className="text-wrapper-4">PER BUKU</div>
                </div>
                <div className="frame-6">
                  <div className="frame-7">
                    <div className="img"><Users size={20} color="var(--primary)" /></div>
                    <div className="text-wrapper-3">15%</div>
                  </div>
                  <div className="text-wrapper-5">KOMISI</div>
                </div>
              </div>
              <div className="div-wrapper">
                <div className="text-wrapper-6">Pilih Paket Sekarang</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="reward-hero fade-in" onClick={() => navigateTo('reward')} style={{ cursor: 'pointer' }}>
            <div className="reward-hero-bg"></div>
            <div className="reward-hero-content">
              <div className="reward-hero-label">🪙 Edu Coin Wallet</div>
              <div className="ec-hero-amount">
                <span className="ec-amount-number">{wallet.totalBalance.toLocaleString('id-ID')}</span>
                <span className="ec-amount-symbol">EC</span>
              </div>
              <div className="reward-hero-sub">≈ Rp {(wallet.totalBalance * EC_CONFIG.exchangeRate).toLocaleString('id-ID')}</div>
              <div className="reward-hero-stats" style={{ justifyContent: 'space-between' }}>
                <div className="reward-stat" style={{ textAlign: 'left' }}>
                  <div className="reward-stat-value">{formatEC(user.stats.totalEarnedEC)}</div>
                  <div className="reward-stat-label">📖 Reward Baca</div>
                </div>
                <div className="reward-stat" style={{ textAlign: 'right' }}>
                  <div className="reward-stat-value">{formatEC(user.stats.totalReferralEC)}</div>
                  <div className="reward-stat-label">👥 Komisi Referral</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Streak */}
        <div className="glass-card streak-card fade-in">
          <div className="streak-header">
            <div className="streak-fire">🔥</div>
            <div className="streak-info">
              <h4>{user.stats.currentStreak} Hari Berturut!</h4>
              <p>Rekor terbaik: {user.stats.longestStreak} hari</p>
            </div>
          </div>
          <div className="streak-days">
            {days.map((d, i) => (
              <div key={i} className={`streak-dot ${i < user.stats.currentStreak % 7 ? 'active' : ''}`}>{d}</div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid fade-in">
          <div className="stat-mini">
            <div className="stat-mini-icon">📚</div>
            <div className="stat-mini-value">{completed}</div>
            <div className="stat-mini-label">Buku Selesai</div>
          </div>
          <div className="stat-mini" onClick={() => navigateTo('reward')} style={{ cursor: 'pointer' }}>
            <div className="stat-mini-icon">🪙</div>
            <div className="stat-mini-value">{wallet.totalBalance}</div>
            <div className="stat-mini-label">Saldo EC</div>
          </div>
          <div className="stat-mini">
            <div className="stat-mini-icon">👥</div>
            <div className="stat-mini-value">{user.stats.referralCount}</div>
            <div className="stat-mini-label">Referral</div>
          </div>
        </div>

        {/* Continue Reading (from persisted progress) */}
        {continueBooks.length > 0 && (
          <div className="fade-in">
            <div className="section-header">
              <div className="section-title">📖 Lanjutkan Membaca</div>
              <div className="section-link" onClick={() => navigateTo('library')}>Semua <ChevronRight size={14} style={{ verticalAlign: 'middle' }} /></div>
            </div>
            {continueBooks.slice(0, 2).map(book => (
              <div key={book.id} className="glass-card continue-reading-card fade-in" onClick={() => navigateTo('book-detail', { bookId: book.id })}>
                <div className="continue-book-cover" style={{ background: (book.cover.startsWith('http') || book.cover.startsWith('/')) ? 'none' : `linear-gradient(135deg, ${book.color}22, ${book.color}44)` }}>
                  {(book.cover.startsWith('http') || book.cover.startsWith('/')) ? (
                    <img src={book.cover} alt={book.title} />
                  ) : (
                    <span>{book.cover}</span>
                  )}
                </div>
                <div className="continue-info">
                  <div className="continue-title">{book.title}</div>
                  <div className="continue-meta">
                    <Clock size={10} style={{ verticalAlign: 'middle', marginRight: 3 }} />
                    {formatTime(book.savedProgress.totalTime)} • Hlm {book.savedProgress.lastPage}
                  </div>
                  <div className="continue-progress-wrap">
                    <div className="continue-progress-bar">
                      <div className="continue-progress-fill" style={{ width: `${book.savedProgress.progressPercent}%` }}></div>
                    </div>
                    <span className="continue-progress-text">{book.savedProgress.progressPercent}%</span>
                  </div>
                </div>
                <div className="continue-play">
                  <Play size={14} color="#0D0D2B" fill="#0D0D2B" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Currently Reading (from mock data) */}
        {reading.length > 0 && continueBooks.length === 0 && (
          <div className="fade-in">
            <div className="section-header">
              <div className="section-title">📖 Sedang Dibaca</div>
              <div className="section-link" onClick={() => navigateTo('library')}>Semua <ChevronRight size={14} style={{ verticalAlign: 'middle' }} /></div>
            </div>
            <div className="books-scroll hide-scrollbar">
              {reading.map(book => (
                <div key={book.id} className="book-card" onClick={() => navigateTo('book-detail', { bookId: book.id })}>
                  <div className="book-cover" style={{ background: `linear-gradient(135deg, ${book.color}22, ${book.color}44)` }}>
                    <span>{book.cover}</span>
                    {book.progress > 50 && <span className="book-cover-badge">🔥 {book.progress}%</span>}
                  </div>
                  <div className="book-info">
                    <div className="book-title">{book.title}</div>
                    <div className="book-author">{book.author}</div>
                    <div className="book-progress-bar">
                      <div className="book-progress-fill" style={{ width: `${book.progress}%`, background: book.color }}></div>
                    </div>
                    <div className="book-progress-text">{book.progress}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenge */}
        <div className="fade-in">
          <div className="section-header">
            <div className="section-title">🎯 Tantangan Aktif</div>
          </div>
          <div className="glass-card challenge-card">
            <div className="challenge-icon">🏆</div>
            <div className="challenge-info">
              <h4>Baca 4 Buku Bulan Ini</h4>
              <p>Selesaikan untuk dapat bonus <span className="ec-inline">+50 EC</span></p>
              <div className="challenge-progress">
                <div className="challenge-progress-fill" style={{ width: `${(completed / 4) * 100}%` }}></div>
              </div>
            </div>
            <div className="challenge-reward">{completed}/4</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
