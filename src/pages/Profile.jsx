import { MOCK_USER, BADGES } from '../data/mockData';
import { Settings, ChevronRight, Bell, Shield, HelpCircle, LogOut, Award } from 'lucide-react';

const Profile = ({ navigateTo }) => {
  const user = MOCK_USER;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="back-header">
        <div className="back-title">👤 Profil</div>
      </div>

      <div className="main-scroll hide-scrollbar">
        {/* Profile Card */}
        <div className="glass-card profile-card fade-in">
          <div className="profile-avatar">{user.avatar}</div>
          <div className="profile-name">{user.name}</div>
          <div className="profile-level">⭐ {user.level}</div>
          <div className="profile-stats">
            <div className="profile-stat">
              <div className="profile-stat-val">{user.stats.booksCompleted}</div>
              <div className="profile-stat-lbl">Buku Selesai</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat-val">{user.stats.currentStreak}🔥</div>
              <div className="profile-stat-lbl">Streak</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat-val">{user.stats.referralCount}</div>
              <div className="profile-stat-lbl">Referral</div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="fade-in">
          <div className="section-header">
            <div className="section-title">🏅 Badge Collection</div>
          </div>
          <div className="badge-grid">
            {BADGES.map(badge => (
              <div key={badge.id} className={`badge-item ${badge.unlocked ? '' : 'locked'}`}>
                <div className="badge-item-icon">{badge.icon}</div>
                <div className="badge-item-name">{badge.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div className="fade-in">
          <div className="section-header">
            <div className="section-title">⚙️ Pengaturan</div>
          </div>
          <div className="menu-list">
            <div className="menu-item">
              <Bell size={18} className="menu-item-icon" />
              <span className="menu-item-label">Notifikasi</span>
              <ChevronRight size={16} className="menu-item-arrow" />
            </div>
            <div className="menu-item">
              <Shield size={18} className="menu-item-icon" />
              <span className="menu-item-label">Keamanan Akun</span>
              <ChevronRight size={16} className="menu-item-arrow" />
            </div>
            <div className="menu-item">
              <Award size={18} className="menu-item-icon" />
              <span className="menu-item-label">Paket Saya</span>
              <ChevronRight size={16} className="menu-item-arrow" />
            </div>
            <div className="menu-item">
              <HelpCircle size={18} className="menu-item-icon" />
              <span className="menu-item-label">Bantuan & FAQ</span>
              <ChevronRight size={16} className="menu-item-arrow" />
            </div>
            <div className="menu-item danger">
              <LogOut size={18} className="menu-item-icon" />
              <span className="menu-item-label">Keluar</span>
              <ChevronRight size={16} className="menu-item-arrow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
