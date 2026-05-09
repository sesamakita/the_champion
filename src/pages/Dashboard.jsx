import { MOCK_USER, MOCK_BOOKS, formatCurrency } from '../data/mockData';
import { BookOpen, Flame, Target, TrendingUp, ChevronRight } from 'lucide-react';

const Dashboard = ({ navigateTo }) => {
  const user = MOCK_USER;
  const reading = MOCK_BOOKS.filter(b => b.progress > 0 && b.progress < 100);
  const completed = MOCK_BOOKS.filter(b => b.progress === 100).length;
  const days = ['S','S','R','K','J','S','M'];

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
        {/* Reward Hero Card */}
        <div className="reward-hero fade-in">
          <div className="reward-hero-bg"></div>
          <div className="reward-hero-content">
            <div className="reward-hero-label">💰 Total Reward Kamu</div>
            <div className="reward-hero-amount">{formatCurrency(user.stats.totalReward + user.stats.totalReferralIncome)}</div>
            <div className="reward-hero-sub">Dari membaca & referral</div>
            <div className="reward-hero-stats" style={{ justifyContent: 'space-between' }}>
              <div className="reward-stat" style={{ textAlign: 'left' }}>
                <div className="reward-stat-value">{formatCurrency(user.stats.totalReward)}</div>
                <div className="reward-stat-label">Reward Baca</div>
              </div>
              <div className="reward-stat" style={{ textAlign: 'right' }}>
                <div className="reward-stat-value">{formatCurrency(user.stats.totalReferralIncome)}</div>
                <div className="reward-stat-label">Komisi Referral</div>
              </div>
            </div>
          </div>
        </div>

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
          <div className="stat-mini">
            <div className="stat-mini-icon">💰</div>
            <div className="stat-mini-value">{formatCurrency(user.stats.totalReward)}</div>
            <div className="stat-mini-label">Reward Baca</div>
          </div>
          <div className="stat-mini">
            <div className="stat-mini-icon">👥</div>
            <div className="stat-mini-value">{user.stats.referralCount}</div>
            <div className="stat-mini-label">Referral</div>
          </div>
        </div>

        {/* Currently Reading */}
        {reading.length > 0 && (
          <div className="fade-in">
            <div className="section-header">
              <div className="section-title">📖 Sedang Dibaca</div>
              <div className="section-link" onClick={() => navigateTo('library')}>Semua <ChevronRight size={14} style={{verticalAlign:'middle'}} /></div>
            </div>
            <div className="books-scroll hide-scrollbar">
              {reading.map(book => (
                <div key={book.id} className="book-card" onClick={() => navigateTo('book-detail')}>
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
              <p>Selesaikan untuk dapat bonus +Rp 5.000</p>
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
