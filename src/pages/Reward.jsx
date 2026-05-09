import { MOCK_USER, MOCK_REWARDS, formatCurrency } from '../data/mockData';
import { ArrowLeft, Download } from 'lucide-react';

const Reward = ({ navigateTo }) => {
  const user = MOCK_USER;
  const totalIncome = user.stats.totalReward + user.stats.totalReferralIncome;
  const icons = { read: '📖', referral: '👥', streak: '🔥', quiz: '🧠', challenge: '🎯' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="back-header">
        <div className="back-title">💰 Reward Saya</div>
      </div>

      <div className="main-scroll hide-scrollbar">
        {/* Balance Card */}
        <div className="glass-card glass-card-glow balance-card fade-in">
          <div className="balance-label">Total Saldo</div>
          <div className="balance-amount">{formatCurrency(totalIncome)}</div>
          <div className="balance-breakdown">
            <div className="balance-item">
              <div className="balance-item-value">{formatCurrency(user.stats.totalReward)}</div>
              <div className="balance-item-label">📖 Reward Baca</div>
            </div>
            <div className="balance-item">
              <div className="balance-item-value">{formatCurrency(user.stats.totalReferralIncome)}</div>
              <div className="balance-item-label">👥 Komisi Referral</div>
            </div>
          </div>
          <button className="withdraw-btn">
            <Download size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} />
            Tarik Saldo
          </button>
        </div>

        {/* Progress Reward Baca */}
        <div className="glass-card fade-in" style={{ padding: 'var(--space-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>📖 Progres Reward Baca</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>{formatCurrency(user.stats.totalReward)} / {formatCurrency(75000)}</span>
          </div>
          <div className="challenge-progress">
            <div className="challenge-progress-fill" style={{ width: `${(user.stats.totalReward / 75000) * 100}%` }}></div>
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 6 }}>Paket Reader — Max reward {formatCurrency(75000)}</div>
        </div>

        {/* Transaction History */}
        <div className="fade-in">
          <div className="section-header">
            <div className="section-title">📋 Riwayat Transaksi</div>
          </div>
          <div className="glass-card">
            {MOCK_REWARDS.map(tx => (
              <div key={tx.id} className="tx-item">
                <div className={`tx-icon ${tx.type}`}>{icons[tx.type]}</div>
                <div className="tx-info">
                  <div className="tx-label">{tx.label}</div>
                  <div className="tx-date">{tx.date}</div>
                </div>
                <div className="tx-amount">+{formatCurrency(tx.amount)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reward;
