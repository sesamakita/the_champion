import { PACKAGES, formatCurrency } from '../data/mockData';
import { ArrowLeft } from 'lucide-react';

const PackageSelect = ({ navigateTo }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="back-header">
        <div className="back-btn" onClick={() => navigateTo('dashboard')}><ArrowLeft size={18} /></div>
        <div className="back-title">Pilih Paket</div>
      </div>

      <div className="main-scroll hide-scrollbar">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }} className="fade-in">
          <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>📚</div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-main)' }}>Mulai Perjalanan Membaca</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>Pilih paket yang sesuai dengan kebutuhanmu</p>
        </div>

        {PACKAGES.map(pkg => (
          <div key={pkg.id} className={`package-card fade-in ${pkg.popular ? 'popular' : ''}`}>
            {pkg.popular && <div className="package-badge">⭐ POPULER</div>}
            <div className="package-emoji">{pkg.emoji}</div>
            <div className="package-name">{pkg.name}</div>
            <div className="package-price" style={{ color: pkg.color }}>{formatCurrency(pkg.price)}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {pkg.bookCount} buku · Max reward {formatCurrency(pkg.maxReadReward)} · Komisi {pkg.referralCommission * 100}%
            </div>
            <ul className="package-features">
              {pkg.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <button className="package-select-btn">Pilih Paket {pkg.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageSelect;
