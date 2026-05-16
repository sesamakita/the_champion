import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, CreditCard, Smartphone, Landmark, QrCode, ChevronRight, Sparkles, Loader2, Copy, Share2, ShieldCheck, Wallet } from 'lucide-react';
import { formatCurrency, formatEC, getActiveUser } from '../data/mockData';
import { useWallet } from '../hooks/useWallet';

const TOP_UP_OPTIONS = [
  { id: 1, ec: 100, price: 10000, bonus: null },
  { id: 2, ec: 500, price: 47500, bonus: 'Hemat 5%' },
  { id: 3, ec: 1000, price: 90000, bonus: 'Hemat 10%' },
  { id: 4, ec: 2500, price: 215000, bonus: 'Paling Laris' },
  { id: 5, ec: 5000, price: 400000, bonus: 'Hemat 20%' },
];

const PAYMENT_GROUPS = [
  {
    title: 'E-Wallet & QRIS',
    methods: [
      { id: 'qris', name: 'QRIS', icon: <QrCode size={20} />, color: '#EA1E63' },
      { id: 'gopay', name: 'GoPay', icon: <Smartphone size={20} />, color: '#00AED1' },
      { id: 'ovo', name: 'OVO', icon: <Smartphone size={20} />, color: '#4C3494' },
    ]
  },
  {
    title: 'Transfer Bank',
    methods: [
      { id: 'bca', name: 'BCA Virtual Account', icon: <Landmark size={20} />, color: '#005596' },
      { id: 'mandiri', name: 'Mandiri Virtual Account', icon: <Landmark size={20} />, color: '#FFB800' },
    ]
  }
];

const TopUp = ({ navigateTo }) => {
  const [selectedOption, setSelectedOption] = useState(TOP_UP_OPTIONS[2]);
  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_GROUPS[0].methods[0]);
  const [step, setStep] = useState('select'); // 'select', 'processing', 'success'
  const { topUp, wallet } = useWallet();
  const user = getActiveUser();

  const handleProcess = () => {
    setStep('processing');
    setTimeout(() => {
      topUp(selectedOption.ec, selectedMethod.name);
      setStep('success');
    }, 2500);
  };

  if (step === 'success') {
    return (
      <div className="page-container minimal-success-viewport fade-in">
        <div className="minimal-success-content">
          <div className="success-icon-minimal">
            <CheckCircle2 size={64} color="var(--secondary)" strokeWidth={2.5} />
          </div>
          
          <h2 className="success-title-minimal">Pembayaran Berhasil!</h2>
          <p className="success-desc-minimal">Saldo EC kamu sudah bertambah otomatis.</p>

          <div className="success-amount-card">
            <div className="amount-main">
              <span className="amount-icon">🪙</span>
              <span className="amount-value">{selectedOption.ec}</span>
              <span className="amount-unit">EC</span>
            </div>
            <div className="amount-secondary">{formatCurrency(selectedOption.price)}</div>
          </div>

          <div className="minimal-details-list">
            <div className="min-detail-item">
              <span>Metode</span>
              <strong>{selectedMethod.name}</strong>
            </div>
            <div className="min-detail-item">
              <span>Waktu</span>
              <strong>{new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</strong>
            </div>
            <div className="min-detail-item">
              <span>Status</span>
              <span className="min-status-tag">Sukses</span>
            </div>
          </div>

          <div className="minimal-success-footer">
            <button className="min-btn-primary" onClick={() => navigateTo('reward')}>
              Cek Wallet Saya
            </button>
            <button className="min-btn-outline" onClick={() => navigateTo('dashboard')}>
              Kembali ke Beranda
            </button>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .minimal-success-viewport {
            background: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
          }
          .minimal-success-content {
            width: 100%;
            max-width: 400px;
            text-align: center;
          }
          .success-icon-minimal {
            margin-bottom: 24px;
            display: flex;
            justify-content: center;
          }
          .success-title-minimal {
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--text-primary);
            margin-bottom: 8px;
          }
          .success-desc-minimal {
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-bottom: 40px;
          }
          .success-amount-card {
            background: var(--bg-dark);
            border-radius: 24px;
            padding: 32px 24px;
            margin-bottom: 32px;
          }
          .amount-main {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 4px;
          }
          .amount-icon { font-size: 1.8rem; }
          .amount-value { font-size: 2.5rem; font-weight: 900; color: var(--text-primary); letter-spacing: -1px; }
          .amount-unit { font-size: 1rem; font-weight: 700; color: var(--primary); margin-top: 10px; }
          .amount-secondary { font-size: 1rem; font-weight: 600; color: var(--text-muted); }

          .minimal-details-list {
            margin-bottom: 48px;
            padding: 0 12px;
          }
          .min-detail-item {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid var(--border);
            font-size: 0.85rem;
          }
          .min-detail-item:last-child { border-bottom: none; }
          .min-detail-item span { color: var(--text-secondary); }
          .min-detail-item strong { color: var(--text-primary); font-weight: 700; }
          .min-status-tag {
            background: var(--secondary-soft);
            color: var(--secondary);
            padding: 2px 10px;
            border-radius: 6px;
            font-weight: 800;
            font-size: 0.75rem;
          }

          .minimal-success-footer {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .min-btn-primary {
            background: var(--primary);
            color: #FFFFFF;
            border: none;
            padding: 18px;
            border-radius: 16px;
            font-weight: 800;
            font-size: 1rem;
            cursor: pointer;
            transition: var(--transition);
          }
          .min-btn-outline {
            background: transparent;
            color: var(--text-secondary);
            border: 1px solid var(--border);
            padding: 16px;
            border-radius: 16px;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
          }
          .min-btn-primary:active, .min-btn-outline:active { transform: scale(0.98); }
        `}} />
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="page-container flex-center fade-in" style={{ background: '#FFFFFF' }}>
        <Loader2 size={48} className="spin-slow" color="var(--primary)" />
        <h2 style={{ marginTop: 24, fontSize: '1.2rem', fontWeight: 800 }}>Memproses Pembayaran</h2>
        <p style={{ marginTop: 8, color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center', padding: '0 40px' }}>
          Mohon jangan tutup aplikasi ini sampai proses selesai.
        </p>
      </div>
    );
  }

  return (
    <div className="page-container minimal-topup-viewport">
      <div className="page-header">
        <div className="header-left" onClick={() => navigateTo('reward')} style={{ cursor: 'pointer' }}>
          <ArrowLeft size={20} />
          <h1 className="header-title-minimal">Isi Saldo EC</h1>
        </div>
      </div>

      <div className="main-scroll hide-scrollbar">
        {/* Simple Balance Box */}
        <div className="minimal-balance-card">
          <div className="min-bal-label">Saldo Saat Ini</div>
          <div className="min-bal-value">
            <span className="min-bal-icon">🪙</span>
            <span>{wallet?.totalBalance || 0}</span>
            <small>EC</small>
          </div>
        </div>

        <div className="minimal-section">
          <h2 className="minimal-section-title">Pilih Nominal</h2>
          <div className="minimal-nominal-list">
            {TOP_UP_OPTIONS.map((opt) => (
              <div 
                key={opt.id} 
                className={`min-nominal-item ${selectedOption.id === opt.id ? 'active' : ''}`}
                onClick={() => setSelectedOption(opt)}
              >
                <div className="min-nom-left">
                  <div className="min-nom-ec">{opt.ec} EC</div>
                  {opt.bonus && <div className="min-nom-bonus">{opt.bonus}</div>}
                </div>
                <div className="min-nom-right">
                  <div className="min-nom-price">{formatCurrency(opt.price)}</div>
                  <div className={`min-nom-radio ${selectedOption.id === opt.id ? 'checked' : ''}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="minimal-section" style={{ marginTop: 32 }}>
          <h2 className="minimal-section-title">Metode Pembayaran</h2>
          <div className="minimal-payment-groups">
            {PAYMENT_GROUPS.map((group, idx) => (
              <div key={idx} className="min-payment-group">
                <div className="min-group-title">{group.title}</div>
                <div className="min-method-list">
                  {group.methods.map((method) => (
                    <div 
                      key={method.id} 
                      className={`min-method-item ${selectedMethod.id === method.id ? 'active' : ''}`}
                      onClick={() => setSelectedMethod(method)}
                    >
                      <div className="min-method-icon" style={{ color: method.color }}>
                        {method.icon}
                      </div>
                      <div className="min-method-info">
                        <div className="min-method-name">{method.name}</div>
                        <div className="min-method-time">Verifikasi Otomatis</div>
                      </div>
                      <div className={`min-method-check ${selectedMethod.id === method.id ? 'visible' : ''}`}>
                        <CheckCircle2 size={18} color="var(--primary)" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: '140px' }}></div>
      </div>

      <div className="minimal-checkout-bar">
        <div className="min-checkout-content">
          <div className="min-checkout-total">
            <span className="min-total-label">Total Pembayaran</span>
            <span className="min-total-val">{formatCurrency(selectedOption.price)}</span>
          </div>
          <button className="min-checkout-btn" onClick={handleProcess}>
            Bayar Sekarang
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .minimal-topup-viewport { background: #FFFFFF; }
        .header-title-minimal { font-size: 1.1rem; font-weight: 800; }
        
        .minimal-balance-card {
          margin: 16px 0 32px;
          padding: 24px;
          background: var(--bg-dark);
          border-radius: 20px;
          text-align: center;
        }
        .min-bal-label { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
        .min-bal-value { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 1.8rem; font-weight: 900; color: var(--text-primary); }
        .min-bal-icon { font-size: 1.6rem; }
        .min-bal-value small { font-size: 0.9rem; color: var(--primary); margin-left: 2px; }

        .minimal-section-title { font-size: 0.95rem; font-weight: 800; color: var(--text-primary); margin-bottom: 16px; }
        
        .minimal-nominal-list { display: flex; flex-direction: column; gap: 10px; }
        .min-nominal-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          background: #FFFFFF;
          border: 1px solid var(--border);
          border-radius: 16px;
          transition: var(--transition);
          cursor: pointer;
        }
        .min-nominal-item.active { border-color: var(--primary); background: var(--primary-soft); }
        
        .min-nom-left { display: flex; align-items: center; gap: 12px; }
        .min-nom-ec { font-size: 1rem; font-weight: 800; color: var(--text-primary); }
        .min-nom-bonus { background: var(--secondary-soft); color: var(--secondary); font-size: 0.65rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; }
        
        .min-nom-right { display: flex; align-items: center; gap: 12px; }
        .min-nom-price { font-size: 0.9rem; font-weight: 700; color: var(--text-secondary); }
        .min-nom-radio { width: 18px; height: 18px; border: 2px solid var(--border); border-radius: 50%; position: relative; }
        .min-nominal-item.active .min-nom-radio { border-color: var(--primary); }
        .min-nom-radio::after { content: ''; position: absolute; inset: 3px; background: var(--primary); border-radius: 50%; transform: scale(0); transition: var(--transition); }
        .min-nominal-item.active .min-nom-radio::after { transform: scale(1); }

        .min-payment-group { margin-bottom: 24px; }
        .min-group-title { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 12px; }
        .min-method-list { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
        .min-method-item {
          display: flex;
          align-items: center;
          padding: 14px 16px;
          background: #FFFFFF;
          border-bottom: 1px solid var(--border);
          cursor: pointer;
          transition: var(--transition);
        }
        .min-method-item:last-child { border-bottom: none; }
        .min-method-item.active { background: #F8FAFC; }
        .min-method-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; }
        .min-method-info { flex: 1; padding-left: 4px; }
        .min-method-name { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); }
        .min-method-time { font-size: 0.7rem; color: var(--text-muted); }
        .min-method-check { opacity: 0; transition: var(--transition); }
        .min-method-check.visible { opacity: 1; }

        .minimal-checkout-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 16px 20px 32px;
          background: #FFFFFF;
          border-top: 1px solid var(--border);
          z-index: 1000;
        }
        .min-checkout-content { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .min-checkout-total { display: flex; flex-direction: column; }
        .min-total-label { font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; }
        .min-total-val { font-size: 1.15rem; font-weight: 900; color: var(--text-primary); }
        .min-checkout-btn {
          flex: 1;
          background: var(--primary);
          color: #FFFFFF;
          border: none;
          padding: 14px;
          border-radius: 14px;
          font-weight: 800;
          font-size: 0.95rem;
          cursor: pointer;
        }
        .min-checkout-btn:active { transform: scale(0.98); }
      `}} />
    </div>
  );
};

export default TopUp;
