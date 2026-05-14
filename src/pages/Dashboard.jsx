import { useState, useEffect } from 'react';
import { MOCK_USER, MOCK_BOOKS, EC_CONFIG, formatEC } from '../data/mockData';
import { BookOpen, Flame, Target, TrendingUp, ChevronRight, Wallet, Play, Clock } from 'lucide-react';
import { getAllReadingProgress } from '../hooks/useReadingSession';
import { useWallet } from '../hooks/useWallet';

const Dashboard = ({ navigateTo }) => {
  const { wallet } = useWallet();
  const user = MOCK_USER;
  const reading = MOCK_BOOKS.filter(b => b.progress > 0 && b.progress < 100);
  const completed = MOCK_BOOKS.filter(b => b.progress === 100).length;
  const days = ['S','S','R','K','J','S','M'];

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
    <div className="dashboard-minimalist fade-in">
      {/* Background Decor */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      {/* Header */}
      <div className="minimal-header">
        <div className="header-left">
          <div className="avatar-wrap-mini">
            <span className="avatar-emoji">{user.avatar}</span>
          </div>
          <div className="header-text-mini">
            <div className="greetings">Hello,</div>
            <div className="user-name">{user.name.split(' ')[0]} ✨</div>
          </div>
        </div>
        <div className="header-right">
          <button className="icon-btn-round" onClick={() => navigateTo('referral')}>
            <TrendingUp size={20} color="#6366F1" />
          </button>
        </div>
      </div>

      <div className="scroll-content hide-scrollbar">
        {/* Colorful Wallet Card */}
        <div className="wallet-card-wrap">
          <div className={`vibrant-wallet-card ${!user.package ? 'promo' : 'active'}`} onClick={() => navigateTo(user.package ? 'reward' : 'package-select')}>
            <div className="card-top">
              <div className="wallet-icon-box">
                <Wallet size={24} color="#fff" />
              </div>
              <div className="wallet-label-mini">EDU COIN BALANCE</div>
            </div>
            <div className="wallet-main">
              <div className="balance-val">
                <span className="unit">🪙</span>
                {wallet.totalBalance.toLocaleString('id-ID')}
              </div>
              <div className="fiat-val">≈ Rp {(wallet.totalBalance * EC_CONFIG.exchangeRate).toLocaleString('id-ID')}</div>
            </div>
            {!user.package && (
              <div className="promo-badge-mini">UPGRADE TO EARN MORE 🚀</div>
            )}
            <div className="card-pattern"></div>
          </div>
        </div>

        {/* Quick Mini Stats - Simple & Colorful */}
        <div className="mini-stats-row">
          <div className="stat-card blue">
            <div className="s-icon">📘</div>
            <div className="s-data">
              <span className="s-val">{completed}</span>
              <span className="s-lbl">Selesai</span>
            </div>
          </div>
          <div className="stat-card orange">
            <div className="s-icon">🔥</div>
            <div className="s-data">
              <span className="s-val">{user.stats.currentStreak}d</span>
              <span className="s-lbl">Streak</span>
            </div>
          </div>
          <div className="stat-card purple">
            <div className="s-icon">👥</div>
            <div className="s-data">
              <span className="s-val">{user.stats.referralCount}</span>
              <span className="s-lbl">Referral</span>
            </div>
          </div>
        </div>

        {/* Continue Reading Section */}
        {continueBooks.length > 0 && (
          <div className="section-wrap-mini">
            <div className="section-title-mini">
              <span>📖 Lanjutkan Membaca</span>
              <ChevronRight size={16} color="#94A3B8" />
            </div>
            <div className="continue-scroll-mini hide-scrollbar">
              {continueBooks.map(book => (
                <div key={book.id} className="book-tile-mini" onClick={() => navigateTo('book-detail', { bookId: book.id })}>
                  <div className="tile-cover" style={{ background: book.color + '15' }}>
                    {(book.cover.startsWith('http') || book.cover.startsWith('/')) ? (
                      <img src={book.cover} alt="" />
                    ) : (
                      <span className="cover-emoji">{book.cover}</span>
                    )}
                  </div>
                  <div className="tile-info">
                    <div className="tile-title">{book.title}</div>
                    <div className="tile-progress-wrap">
                      <div className="tile-progress-bg">
                        <div className="tile-progress-fill" style={{ width: `${book.savedProgress.progressPercent}%`, backgroundColor: book.color }}></div>
                      </div>
                      <span className="tile-percent">{book.savedProgress.progressPercent}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Challenge Card - Colorful Minimalist */}
        <div className="section-wrap-mini">
          <div className="challenge-banner-mini">
            <div className="banner-left">
              <div className="banner-tag">CHALLENGE</div>
              <div className="banner-title">Baca 4 Buku Bulan Ini</div>
              <div className="banner-progress-text">{completed}/4 Buku Selesai</div>
              <div className="banner-bar-bg">
                <div className="banner-bar-fill" style={{ width: `${(completed/4)*100}%` }}></div>
              </div>
            </div>
            <div className="banner-right">
              <div className="reward-pill">+50 EC</div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-minimalist {
          height: 100%;
          background: #F8FAFC;
          display: flex;
          flex-direction: column;
          position: relative;
          color: #1E293B;
          overflow: hidden;
        }

        .bg-blob { position: absolute; border-radius: 50%; z-index: 0; filter: blur(60px); opacity: 0.1; }
        .blob-1 { width: 300px; height: 300px; background: #6366F1; top: -100px; right: -50px; }
        .blob-2 { width: 250px; height: 250px; background: #F59E0B; bottom: -50px; left: -50px; }

        .minimal-header { 
          padding: 24px 20px; 
          display: flex; 
          align-items: center; 
          justify-content: space-between; 
          background: #fff;
          z-index: 10;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
        }
        .header-left { display: flex; align-items: center; gap: 12px; }
        .avatar-wrap-mini { width: 44px; height: 44px; background: #F1F5F9; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
        .greetings { font-size: 0.75rem; font-weight: 600; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px; }
        .user-name { font-size: 1.1rem; font-weight: 800; color: #0F172A; }
        .icon-btn-round { width: 44px; height: 44px; border-radius: 50%; border: 1px solid #F1F5F9; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
        .icon-btn-round:active { transform: scale(0.95); background: #F8FAFC; }

        .scroll-content { flex: 1; overflow-y: auto; padding: 20px 0 100px; z-index: 1; }

        .wallet-card-wrap { padding: 0 20px 24px; }
        .vibrant-wallet-card {
          width: 100%;
          padding: 24px;
          border-radius: 32px;
          color: #fff;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .vibrant-wallet-card.active { background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%); box-shadow: 0 20px 40px rgba(99, 102, 241, 0.3); }
        .vibrant-wallet-card.promo { background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2); }
        .vibrant-wallet-card:active { transform: scale(0.98); }

        .card-top { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .wallet-icon-box { width: 40px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .wallet-label-mini { font-size: 0.7rem; font-weight: 800; opacity: 0.8; letter-spacing: 1px; }
        .balance-val { font-size: 2.2rem; font-weight: 900; margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
        .balance-val .unit { font-size: 1.5rem; }
        .fiat-val { font-size: 0.9rem; font-weight: 600; opacity: 0.7; }
        .promo-badge-mini { margin-top: 15px; font-size: 0.65rem; font-weight: 900; background: rgba(255,255,255,0.15); padding: 6px 12px; border-radius: 8px; display: inline-block; }
        .card-pattern { position: absolute; top: -20%; right: -10%; width: 150px; height: 150px; background: rgba(255,255,255,0.05); border-radius: 50%; }

        .mini-stats-row { display: flex; gap: 12px; padding: 0 20px 24px; }
        .stat-card { flex: 1; padding: 16px; border-radius: 24px; display: flex; flex-direction: column; gap: 8px; border: 1px solid #F1F5F9; background: #fff; }
        .stat-card .s-icon { font-size: 1.5rem; }
        .stat-card .s-val { display: block; font-size: 1.1rem; font-weight: 800; color: #0F172A; }
        .stat-card .s-lbl { font-size: 0.7rem; font-weight: 700; color: #94A3B8; text-transform: uppercase; }
        .stat-card.blue { border-bottom: 3px solid #3B82F6; }
        .stat-card.orange { border-bottom: 3px solid #F59E0B; }
        .stat-card.purple { border-bottom: 3px solid #8B5CF6; }

        .section-wrap-mini { padding: 0 20px 24px; }
        .section-title-mini { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; font-size: 0.95rem; font-weight: 800; color: #0F172A; }
        
        .continue-scroll-mini { display: flex; gap: 12px; overflow-x: auto; padding-bottom: 10px; }
        .book-tile-mini { min-width: 200px; background: #fff; border: 1px solid #F1F5F9; border-radius: 20px; padding: 12px; display: flex; align-items: center; gap: 12px; cursor: pointer; }
        .tile-cover { width: 48px; height: 60px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; overflow: hidden; }
        .tile-cover img { width: 100%; height: 100%; object-fit: cover; }
        .tile-info { flex: 1; }
        .tile-title { font-size: 0.85rem; font-weight: 800; color: #1E293B; margin-bottom: 6px; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
        .tile-progress-wrap { display: flex; align-items: center; gap: 8px; }
        .tile-progress-bg { flex: 1; height: 4px; background: #F1F5F9; border-radius: 2px; }
        .tile-progress-fill { height: 100%; border-radius: 2px; }
        .tile-percent { font-size: 0.65rem; font-weight: 800; color: #64748B; }

        .challenge-banner-mini { 
          background: #EFF6FF; 
          border: 1px solid #DBEAFE; 
          border-radius: 24px; 
          padding: 20px; 
          display: flex; 
          align-items: center; 
          justify-content: space-between;
        }
        .banner-tag { font-size: 0.6rem; font-weight: 900; color: #2563EB; background: #DBEAFE; padding: 4px 8px; border-radius: 6px; margin-bottom: 8px; display: inline-block; }
        .banner-title { font-size: 1rem; font-weight: 800; color: #1E40AF; margin-bottom: 8px; }
        .banner-progress-text { font-size: 0.7rem; font-weight: 700; color: #60A5FA; margin-bottom: 6px; }
        .banner-bar-bg { width: 140px; height: 6px; background: #DBEAFE; border-radius: 3px; }
        .banner-bar-fill { height: 100%; background: #2563EB; border-radius: 3px; }
        .reward-pill { background: #fff; color: #1E40AF; padding: 10px 14px; border-radius: 16px; font-weight: 900; font-size: 0.8rem; box-shadow: 0 4px 10px rgba(37, 99, 235, 0.1); }
      `}} />
    </div>
  );
};

export default Dashboard;
