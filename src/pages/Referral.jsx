import { MOCK_USER, MOCK_REFERRALS, formatCurrency } from '../data/mockData';
import { ArrowLeft, Copy, Share2, Users } from 'lucide-react';

const Referral = ({ navigateTo }) => {
  const user = MOCK_USER;
  const totalCommission = MOCK_REFERRALS.reduce((s, r) => s + r.commission, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="back-header">
        <div className="back-btn" onClick={() => navigateTo('dashboard')}><ArrowLeft size={18} /></div>
        <div className="back-title">Referral Hub</div>
      </div>

      <div className="main-scroll hide-scrollbar">
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
            <div className="stat-mini-icon">💰</div>
            <div className="stat-mini-value">{formatCurrency(totalCommission)}</div>
            <div className="stat-mini-label">Total Komisi</div>
          </div>
        </div>

        {/* Referral Code */}
        <div className="glass-card glass-card-glow referral-code-box fade-in">
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>Kode Referral Kamu</div>
          <div className="referral-code">{user.referralCode}</div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>Bagikan kode ini dan dapatkan komisi 12% dari setiap pembelian paket</p>
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
                <div className="ref-commission">+{formatCurrency(ref.commission)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referral;
