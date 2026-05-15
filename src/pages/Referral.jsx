import { MOCK_USER, MOCK_REFERRALS, PACKAGES, formatEC, getActiveUser } from '../data/mockData';
import { ArrowLeft, Copy, Share2, Lock, ChevronRight } from 'lucide-react';

const Referral = ({ navigateTo }) => {
  const user = getActiveUser();
  const isGuest = !user.package;
  const userPkg = isGuest ? null : PACKAGES.find(p => p.id === user.package);
  const totalCommission = MOCK_REFERRALS.reduce((s, r) => s + r.commissionEC, 0);
  const commissionRate = userPkg ? userPkg.referralCommission * 100 : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="back-header">
        <div className="back-btn" onClick={() => navigateTo('dashboard')}><ArrowLeft size={18} /></div>
        <div className="back-title">Referral Hub</div>
      </div>

      <div className="main-scroll hide-scrollbar">
        {isGuest ? (
          /* ===== GUEST VIEW ===== */
          <>
            <div className="glass-card fade-in" style={{ padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔒</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 8 }}>Fitur Referral Terkunci</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
                Upgrade ke paket berbayar untuk membuka fitur referral dan mulai menghasilkan komisi dari setiap teman yang kamu ajak bergabung.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
                {PACKAGES.map(pkg => (
                  <div key={pkg.id} style={{ 
                    padding: '8px 16px', 
                    background: pkg.colorSoft, 
                    borderRadius: 12, 
                    fontSize: '0.75rem', 
                    fontWeight: 700, 
                    color: pkg.color 
                  }}>
                    {pkg.emoji} {(pkg.referralCommission * 100)}% komisi
                  </div>
                ))}
              </div>
              <button 
                className="primary-btn" 
                onClick={() => navigateTo('package-select')}
                style={{ maxWidth: 280, margin: '0 auto' }}
              >
                Pilih Paket Sekarang
                <ChevronRight size={18} />
              </button>
            </div>
          </>
        ) : (
          /* ===== MEMBER VIEW ===== */
          <>
            {/* Stats */}
            <div className="stats-grid fade-in">
              <div className="stat-mini">
                <div className="stat-mini-icon">👥</div>
                <div className="stat-mini-value">{MOCK_REFERRALS.length}</div>
                <div className="stat-mini-label">Total Referral</div>
              </div>
              <div className="stat-mini">
                <div className="stat-mini-icon">✅</div>
                <div className="stat-mini-value">{MOCK_REFERRALS.filter(r => r.active).length}</div>
                <div className="stat-mini-label">Aktif</div>
              </div>
              <div className="stat-mini">
                <div className="stat-mini-icon">🪙</div>
                <div className="stat-mini-value">{totalCommission}</div>
                <div className="stat-mini-label">Total EC</div>
              </div>
            </div>

            {/* Referral Code */}
            <div className="glass-card glass-card-glow referral-code-box fade-in">
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>Kode Referral Kamu</div>
              <div className="referral-code">{user.referralCode}</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
                Bagikan kode ini dan dapatkan komisi <span className="ec-inline">{commissionRate}%</span> dari setiap pembelian paket
              </p>

              {/* Commission Preview */}
              <div className="ec-commission-preview">
                <div className="ec-commission-row">
                  <span>Undang beli Starter</span>
                  <span className="ec-inline">+{Math.round(990 * userPkg.referralCommission)} EC</span>
                </div>
                <div className="ec-commission-row">
                  <span>Undang beli Reader</span>
                  <span className="ec-inline">+{Math.round(2490 * userPkg.referralCommission)} EC</span>
                </div>
                <div className="ec-commission-row">
                  <span>Undang beli Premium</span>
                  <span className="ec-inline">+{Math.round(4990 * userPkg.referralCommission)} EC</span>
                </div>
              </div>

              <div className="referral-actions">
                <button className="ref-btn primary"><Copy size={14} /> Salin</button>
                <button className="ref-btn outline"><Share2 size={14} /> Bagikan</button>
              </div>
            </div>

            {/* Referral List */}
            <div className="fade-in">
              <div className="section-header">
                <div className="section-title">👥 Daftar Referral</div>
              </div>
              <div className="glass-card">
                {MOCK_REFERRALS.map(ref => (
                  <div key={ref.id} className="ref-list-item">
                    <div className="ref-avatar">👤</div>
                    <div className="ref-info">
                      <div className="ref-name">{ref.name}</div>
                      <div className="ref-detail">Paket {ref.package} · {ref.date}</div>
                    </div>
                    <div className="ref-commission">+{formatEC(ref.commissionEC)}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Referral;
