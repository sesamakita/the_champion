import { useState } from 'react';
import { MOCK_USER, MOCK_TRANSACTIONS, EC_CONFIG, GIFTS_CATALOG, PACKAGES, formatEC, TX_META } from '../data/mockData';
import { ArrowLeft, Download, ShoppingBag, ArrowUpRight, ArrowDownLeft, Gift, ChevronRight, Lock, Sparkles } from 'lucide-react';

const Reward = ({ navigateTo }) => {
  const [tab, setTab] = useState('overview');
  const user = MOCK_USER;
  const wallet = user.wallet;
  const isGuest = !user.package;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="back-header">
        <div className="back-title">🪙 Edu Coin Wallet</div>
      </div>

      <div className="main-scroll hide-scrollbar">
        {isGuest ? (
          /* ===== TAMPILAN GUEST (Belum Beli Paket) ===== */
          <>
            {/* Empty Wallet Preview */}
            <div className="glass-card glass-card-glow ec-wallet-card fade-in">
              <div className="ec-wallet-header">
                <div className="ec-wallet-label">Total Saldo</div>
                <div className="ec-wallet-amount">
                  <span className="ec-wallet-number">0</span>
                  <span className="ec-wallet-sym">EC</span>
                </div>
                <div className="ec-wallet-rupiah">≈ Rp 0</div>
              </div>
              <div className="ec-wallet-actions">
                <button className="ec-action-btn primary" style={{ opacity: 0.5 }} disabled>
                  <Lock size={14} />
                  <span>Top Up</span>
                </button>
                <button className="ec-action-btn outline" style={{ opacity: 0.5 }} disabled>
                  <Lock size={14} />
                  <span>Tarik</span>
                </button>
                <button className="ec-action-btn outline" style={{ opacity: 0.5 }} disabled>
                  <Lock size={14} />
                  <span>Hadiah</span>
                </button>
              </div>
            </div>

            {/* CTA Banner: Mulai Hasilkan EC */}
            <div className="guest-wallet-cta fade-in" onClick={() => navigateTo('package-select')}>
              <div className="guest-cta-icon">🚀</div>
              <div className="guest-cta-content">
                <h3>Mulai Hasilkan Edu Coin!</h3>
                <p>Beli paket untuk membuka akses buku premium dan mulai menghasilkan EC dari membaca.</p>
              </div>
              <ChevronRight size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            </div>

            {/* Potensi Earning Preview */}
            <div className="fade-in">
              <div className="section-header">
                <div className="section-title">💡 Potensi Penghasilan</div>
              </div>
              <div className="guest-earning-grid">
                {PACKAGES.map(pkg => (
                  <div key={pkg.id} className="glass-card guest-earning-card" onClick={() => navigateTo('package-select')}>
                    <div className="guest-pkg-emoji">{pkg.emoji}</div>
                    <div className="guest-pkg-name">{pkg.name}</div>
                    <div className="guest-pkg-max">Max {formatEC(pkg.maxTotalReward)}</div>
                    <div className="guest-pkg-price">Rp {pkg.price.toLocaleString('id-ID')}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Cara Kerja */}
            <div className="fade-in">
              <div className="section-header">
                <div className="section-title">📖 Cara Kerja EC</div>
              </div>
              <div className="glass-card" style={{ padding: '16px' }}>
                <div className="guest-info-item">
                  <span className="guest-info-num">1</span>
                  <div>
                    <strong>Beli Paket</strong>
                    <p>Pilih paket sesuai budget kamu</p>
                  </div>
                </div>
                <div className="guest-info-item">
                  <span className="guest-info-num">2</span>
                  <div>
                    <strong>Baca Buku</strong>
                    <p>Baca buku & kerjakan quiz untuk dapat EC</p>
                  </div>
                </div>
                <div className="guest-info-item">
                  <span className="guest-info-num">3</span>
                  <div>
                    <strong>Tarik Uang</strong>
                    <p>Tukar EC ke Rupiah & tarik ke rekening</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* ===== TAMPILAN MEMBER (Sudah Beli Paket) ===== */
          <>
            {/* Wallet Card */}
            <div className="glass-card glass-card-glow ec-wallet-card fade-in">
              <div className="ec-wallet-header">
                <div className="ec-wallet-label">Total Saldo</div>
                <div className="ec-wallet-amount">
                  <span className="ec-wallet-number">{wallet.totalBalance.toLocaleString('id-ID')}</span>
                  <span className="ec-wallet-sym">EC</span>
                </div>
                <div className="ec-wallet-rupiah">≈ Rp {(wallet.totalBalance * EC_CONFIG.exchangeRate).toLocaleString('id-ID')}</div>
              </div>
              <div className="ec-wallet-breakdown">
                <div className="ec-wallet-item">
                  <div className="ec-wallet-item-icon earned">💰</div>
                  <div className="ec-wallet-item-info">
                    <div className="ec-wallet-item-value">{formatEC(wallet.earnedBalance)}</div>
                    <div className="ec-wallet-item-label">Earned (bisa ditarik)</div>
                  </div>
                </div>
                <div className="ec-wallet-item">
                  <div className="ec-wallet-item-icon topup">💎</div>
                  <div className="ec-wallet-item-info">
                    <div className="ec-wallet-item-value">{formatEC(wallet.topUpBalance)}</div>
                    <div className="ec-wallet-item-label">Top-Up (untuk belanja)</div>
                  </div>
                </div>
              </div>
              <div className="ec-wallet-actions">
                <button className="ec-action-btn primary">
                  <ArrowUpRight size={16} />
                  <span>Top Up</span>
                </button>
                <button className="ec-action-btn outline">
                  <Download size={16} />
                  <span>Tarik</span>
                </button>
                <button className="ec-action-btn outline">
                  <Gift size={16} />
                  <span>Hadiah</span>
                </button>
              </div>
            </div>

            {/* Earning Progress */}
            <div className="glass-card fade-in" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>📖 Progres Reward Baca</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>{formatEC(user.stats.totalEarnedEC)} / {formatEC(1375)}</span>
              </div>
              <div className="challenge-progress">
                <div className="challenge-progress-fill" style={{ width: `${(user.stats.totalEarnedEC / 1375) * 100}%` }}></div>
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 6 }}>Paket Reader — Max reward {formatEC(1375)}</div>
            </div>

            {/* Quick Stats */}
            <div className="stats-grid fade-in">
              <div className="stat-mini">
                <div className="stat-mini-icon">📈</div>
                <div className="stat-mini-value">{formatEC(wallet.lifetimeEarned)}</div>
                <div className="stat-mini-label">Total Didapat</div>
              </div>
              <div className="stat-mini">
                <div className="stat-mini-icon">🛍️</div>
                <div className="stat-mini-value">{formatEC(wallet.lifetimeSpent)}</div>
                <div className="stat-mini-label">Dibelanjakan</div>
              </div>
              <div className="stat-mini">
                <div className="stat-mini-icon">🏧</div>
                <div className="stat-mini-value">{formatEC(wallet.lifetimeWithdrawn)}</div>
                <div className="stat-mini-label">Ditarik</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="ec-tabs fade-in">
              <div className={`ec-tab ${tab === 'overview' ? 'active' : ''}`} onClick={() => setTab('overview')}>Riwayat</div>
              <div className={`ec-tab ${tab === 'gifts' ? 'active' : ''}`} onClick={() => setTab('gifts')}>Katalog Hadiah</div>
            </div>

            {tab === 'overview' && (
              <div className="glass-card fade-in">
                {MOCK_TRANSACTIONS.map(tx => {
                  const meta = TX_META[tx.type] || { icon: '🪙', color: 'var(--text-muted)', label: '—' };
                  const isSpend = tx.amount < 0;
                  return (
                    <div key={tx.id} className="tx-item">
                      <div className="tx-icon" style={{ background: `${meta.color}15`, color: meta.color }}>
                        {meta.icon}
                      </div>
                      <div className="tx-info">
                        <div className="tx-label">{tx.label}</div>
                        <div className="tx-date">{tx.date}</div>
                      </div>
                      <div className={`tx-amount ${isSpend ? 'spend' : ''}`}>
                        {isSpend ? '' : '+'}{tx.amount} EC
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {tab === 'gifts' && (
              <div className="ec-gifts-grid fade-in">
                {GIFTS_CATALOG.map(gift => (
                  <div key={gift.id} className="glass-card ec-gift-card">
                    <div className="ec-gift-icon">{gift.icon}</div>
                    <div className="ec-gift-name">{gift.name}</div>
                    <div className="ec-gift-price">🪙 {gift.priceEC} EC</div>
                    <button className="ec-gift-btn" disabled={wallet.totalBalance < gift.priceEC}>
                      {wallet.totalBalance >= gift.priceEC ? 'Tukar' : 'Kurang EC'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Reward;
