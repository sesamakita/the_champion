import { useState } from 'react';
import { MOCK_USER, PACKAGES, BADGES, getActiveUser } from '../data/mockData';
import { Settings, ChevronRight, Bell, Shield, HelpCircle, LogOut, Award, Crown, Sparkles, AlertTriangle } from 'lucide-react';

const Profile = ({ navigateTo, onLogout, showToast }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const user = getActiveUser();
  const isGuest = !user.package;
  const activePkg = isGuest ? null : PACKAGES.find(p => p.id === user.package);

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    if (onLogout) onLogout();
  };

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

          {/* Status Paket */}
          {isGuest ? (
            <div className="profile-package-badge guest" onClick={() => navigateTo('package-select')}>
              <span>🆓 Mode Gratis</span>
              <ChevronRight size={14} />
            </div>
          ) : (
            <div className="profile-package-badge member" style={{ borderColor: activePkg.color, color: activePkg.color }}>
              <span>{activePkg.emoji} Paket {activePkg.name}</span>
            </div>
          )}

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

        {/* Upgrade Banner (Guest Only) */}
        {isGuest && (
          <div className="glass-card profile-upgrade-card fade-in" onClick={() => navigateTo('package-select')}>
            <div className="profile-upgrade-icon">👑</div>
            <div className="profile-upgrade-info">
              <strong>Upgrade ke Premium</strong>
              <p>Buka semua fitur, dapatkan reward EC, dan mulai hasilkan uang dari referral!</p>
            </div>
            <ChevronRight size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
          </div>
        )}

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
            <div className="menu-item" onClick={() => navigateTo('package-select')}>
              <Award size={18} className="menu-item-icon" />
              <span className="menu-item-label">
                {isGuest ? 'Beli Paket' : 'Paket Saya'}
              </span>
              {isGuest && <span style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 700, marginLeft: 'auto', marginRight: 8 }}>UPGRADE</span>}
              <ChevronRight size={16} className="menu-item-arrow" />
            </div>
            <div className="menu-item">
              <HelpCircle size={18} className="menu-item-icon" />
              <span className="menu-item-label">Bantuan & FAQ</span>
              <ChevronRight size={16} className="menu-item-arrow" />
            </div>
            <div className="menu-item danger" onClick={() => setShowLogoutConfirm(true)}>
              <LogOut size={18} className="menu-item-icon" />
              <span className="menu-item-label">Keluar</span>
              <ChevronRight size={16} className="menu-item-arrow" />
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="fade-in" style={{ textAlign: 'center', padding: '16px 0 8px' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            Login sebagai <strong>{user.email || 'user'}</strong>
          </p>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 4 }}>
            The Champion v1.0.0
          </p>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="modal-overlay fade-in" onClick={() => setShowLogoutConfirm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">
              <AlertTriangle size={32} color="var(--danger)" />
            </div>
            <h3 className="modal-title">Keluar dari Akun?</h3>
            <p className="modal-desc">Kamu akan keluar dari akun ini. Data progress membaca tetap tersimpan.</p>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowLogoutConfirm(false)}>
                Batal
              </button>
              <button className="modal-btn confirm danger" onClick={handleLogout}>
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
