import { useState } from 'react';
import { PACKAGES, formatEC } from '../data/mockData';
import { ArrowLeft, CheckCircle2, TrendingUp, Target, Zap } from 'lucide-react';

const PackageSelect = ({ navigateTo }) => {
  const [activeTab, setActiveTab] = useState('reader'); // Default ke Reader karena paling populer
  const pkg = PACKAGES.find(p => p.id === activeTab);

  return (
    <div className="page-container package-page">
      <div className="page-header">
        <div className="header-left" onClick={() => navigateTo('dashboard')} style={{ cursor: 'pointer' }}>
          <ArrowLeft size={20} />
          <div className="header-name">Pilih Paket</div>
        </div>
      </div>

      <div className="main-scroll hide-scrollbar">
        {/* Tab Menu */}
        <div className="package-tabs">
          {PACKAGES.map(p => (
            <button 
              key={p.id}
              className={`package-tab ${activeTab === p.id ? 'active' : ''}`}
              onClick={() => setActiveTab(p.id)}
              style={activeTab === p.id ? { background: p.colorSoft, color: p.color, borderColor: p.color } : {}}
            >
              {p.emoji} {p.name}
            </button>
          ))}
        </div>

        {/* Unified Package Card */}
        <div className="unified-package-card fade-in" key={activeTab}>
          {/* Header Card */}
          <div className="up-header" style={{ background: `linear-gradient(135deg, ${pkg.color}, ${pkg.color}DD)` }}>
            <div className="up-badge">PAKET {pkg.name.toUpperCase()}</div>
            <div className="up-price-row">
              <div className="up-price">Rp {pkg.price.toLocaleString('id-ID')}</div>
              <div className="up-price-ec">{pkg.priceEC} EC</div>
            </div>
            <div className="up-earning-limit">Potensi Earning: 🪙 {pkg.maxTotalReward} EC</div>
          </div>

          <div className="up-body">
            {/* Features Section */}
            <div className="up-section">
              <h4 className="up-section-title"><Zap size={16} /> Keuntungan Paket</h4>
              <div className="up-features-grid">
                {pkg.features.map((feat, i) => (
                  <div key={i} className="up-feature-item">
                    <CheckCircle2 size={14} className="up-feat-icon" style={{ color: pkg.color }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Profit Simulation Section */}
            <div className="up-section">
              <h4 className="up-section-title"><TrendingUp size={16} /> Profit Referral ({(pkg.referralCommission * 100)}%)</h4>
              <div className="up-profit-preview">
                <div className="up-profit-box">
                  <div className="up-profit-label">Komisi per Teman</div>
                  <div className="up-profit-val" style={{ color: pkg.color }}>
                    Rp {(pkg.price * pkg.referralCommission).toLocaleString('id-ID')}
                  </div>
                </div>
                <div className="up-profit-box">
                  <div className="up-profit-label">Target Balik Modal</div>
                  <div className="up-profit-val">
                    {Math.ceil(pkg.price / (pkg.price * pkg.referralCommission))} <small>Orang</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Roadmap Section */}
            <div className="up-section">
              <h4 className="up-section-title"><Target size={16} /> Roadmap Profit</h4>
              <div className="up-roadmap">
                <div className="up-roadmap-step">
                  <div className="up-step-dot" style={{ background: pkg.color }}></div>
                  <div className="up-step-info">
                    <strong>Balik Modal</strong>
                    <span>Invite {Math.ceil(pkg.price / (pkg.price * pkg.referralCommission))} orang</span>
                  </div>
                </div>
                <div className="up-roadmap-step">
                  <div className="up-step-dot" style={{ background: pkg.color }}></div>
                  <div className="up-step-info">
                    <strong>Untung Rp 500rb</strong>
                    <span>Invite {Math.ceil((pkg.price + 500000) / (pkg.price * pkg.referralCommission))} orang</span>
                  </div>
                </div>
                <div className="up-roadmap-step highlight">
                  <div className="up-step-dot" style={{ background: pkg.color }}></div>
                  <div className="up-step-info">
                    <strong>Untung Rp 2jt</strong>
                    <span>Invite {Math.ceil((pkg.price + 2000000) / (pkg.price * pkg.referralCommission))} orang</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              className="up-buy-btn"
              style={{ background: pkg.color, boxShadow: `0 8px 24px ${pkg.color}44` }}
              onClick={() => alert(`Memproses pembelian paket ${pkg.name}`)}
            >
              Beli Paket {pkg.name} Sekarang
            </button>
          </div>
        </div>

        <div className="package-footer-note">
          *Semua perhitungan profit di atas berasumsi teman Anda membeli paket yang sama dengan Anda. Komisi akan otomatis masuk ke Earned Balance Anda.
        </div>

        <div style={{ height: '40px' }}></div>
      </div>
    </div>
  );
};

export default PackageSelect;
