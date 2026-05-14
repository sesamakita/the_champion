import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, CreditCard, Smartphone, Landmark, QrCode, ChevronRight, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { formatCurrency, formatEC } from '../data/mockData';
import { useWallet } from '../hooks/useWallet';

const TOP_UP_OPTIONS = [
  { id: 1, ec: 100, price: 10000, badge: null },
  { id: 2, ec: 500, price: 47500, badge: 'Hemat 5%' },
  { id: 3, ec: 1000, price: 90000, badge: 'Populer' },
  { id: 4, ec: 2500, price: 215000, badge: 'Terbaik' },
  { id: 5, ec: 5000, price: 400000, badge: 'Hemat 20%' },
];

const PAYMENT_GROUPS = [
  {
    title: 'E-Wallet & QRIS',
    methods: [
      { id: 'qris', name: 'QRIS (All E-Wallet)', icon: <QrCode size={18} />, color: '#EA1E63' },
      { id: 'gopay', name: 'GoPay', icon: <Smartphone size={18} />, color: '#00AED1' },
      { id: 'ovo', name: 'OVO', icon: <Smartphone size={18} />, color: '#4C3494' },
    ]
  },
  {
    title: 'Virtual Account',
    methods: [
      { id: 'bca', name: 'BCA Virtual Account', icon: <Landmark size={18} />, color: '#005596' },
      { id: 'mandiri', name: 'Mandiri Virtual Account', icon: <Landmark size={18} />, color: '#FFB800' },
    ]
  }
];

const TopUp = ({ navigateTo }) => {
  const [selectedOption, setSelectedOption] = useState(TOP_UP_OPTIONS[2]);
  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_GROUPS[0].methods[0]);
  const [step, setStep] = useState('select'); // 'select', 'processing', 'success'
  const { topUp } = useWallet();

  const handleProcess = () => {
    setStep('processing');
    // Simulate payment orchestration
    setTimeout(() => {
      topUp(selectedOption.ec, selectedMethod.name);
      setStep('success');
    }, 3000);
  };

  if (step === 'success') {
    return (
      <div className="page-container flex-center fade-in bg-glow">
        <div className="success-lottie">
          <div className="confetti-wrap">
            {[...Array(12)].map((_, i) => <div key={i} className={`confetti c${i}`}></div>)}
          </div>
          <div className="success-ring">
            <CheckCircle2 size={60} color="#00C896" strokeWidth={3} />
          </div>
        </div>
        <h2 className="success-title">Pembayaran Berhasil!</h2>
        <p className="success-desc">
          Saldo <strong>{selectedOption.ec} EC</strong> telah ditambahkan ke wallet Anda via <strong>{selectedMethod.name}</strong>.
        </p>
        
        <div className="glass-card success-detail">
          <div className="detail-row">
            <span>ID Transaksi</span>
            <span>#CHMP-{Date.now().toString().slice(-6)}</span>
          </div>
          <div className="detail-row">
            <span>Waktu</span>
            <span>Baru Saja</span>
          </div>
        </div>

        <button className="primary-btn pulse-anim" style={{ width: '80%', marginTop: '30px' }} onClick={() => navigateTo('reward')}>
          Cek Saldo Wallet
        </button>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="page-container flex-center fade-in">
        <div className="processing-wrap">
          <div className="loader-container">
            <div className="loader-outer"></div>
            <div className="loader-inner"></div>
            <div className="loader-icon"><Loader2 size={32} className="spin-slow" /></div>
          </div>
          <h2 className="processing-title">Menunggu Pembayaran</h2>
          <p className="processing-desc">Mohon tunggu sebentar, kami sedang memverifikasi transaksi Anda.</p>
          
          <div className="processing-summary glass-card">
            <div className="p-sum-label">Total Tagihan</div>
            <div className="p-sum-val">{formatCurrency(selectedOption.price)}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container topup-page">
      <div className="page-header header-glass">
        <div className="header-left" onClick={() => navigateTo('reward')} style={{ cursor: 'pointer' }}>
          <ArrowLeft size={20} />
          <div className="header-name">Isi Saldo Edu Coin</div>
        </div>
      </div>

      <div className="main-scroll hide-scrollbar p-20">
        {/* Nominal Grid */}
        <div className="section-label mb-15">
          <Sparkles size={14} color="var(--primary)" />
          <span>Pilih Nominal</span>
        </div>
        <div className="premium-topup-grid">
          {TOP_UP_OPTIONS.map(opt => (
            <div 
              key={opt.id} 
              className={`premium-topup-card ${selectedOption.id === opt.id ? 'active' : ''}`}
              onClick={() => setSelectedOption(opt)}
            >
              {opt.badge && <div className="card-badge">{opt.badge}</div>}
              <div className="card-ec">
                <span className="ec-num">{opt.ec}</span>
                <span className="ec-label">EC</span>
              </div>
              <div className="card-price">{formatCurrency(opt.price)}</div>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="section-label mt-30 mb-15">
          <CreditCard size={14} color="var(--primary)" />
          <span>Metode Pembayaran</span>
        </div>
        <div className="payment-groups">
          {PAYMENT_GROUPS.map((group, idx) => (
            <div key={idx} className="payment-group">
              <div className="group-title">{group.title}</div>
              <div className="group-list glass-card">
                {group.methods.map(method => (
                  <div 
                    key={method.id} 
                    className={`payment-row ${selectedMethod.id === method.id ? 'active' : ''}`}
                    onClick={() => setSelectedMethod(method)}
                  >
                    <div className="method-icon" style={{ background: `${method.color}15`, color: method.color }}>
                      {method.icon}
                    </div>
                    <div className="method-name">{method.name}</div>
                    <div className="method-check">
                      <div className="check-outer">
                        <div className="check-inner"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Summary */}
        <div className="checkout-bar-spacer"></div>
      </div>

      {/* Floating Checkout Bar */}
      <div className="checkout-bar fade-in-up">
        <div className="checkout-info">
          <div className="checkout-label">Total Pembayaran</div>
          <div className="checkout-val">{formatCurrency(selectedOption.price)}</div>
        </div>
        <button className="checkout-btn" onClick={handleProcess}>
          Bayar Sekarang <ChevronRight size={18} />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .topup-page { background: var(--bg-dark); }
        .header-glass { backdrop-filter: blur(10px); background: rgba(13, 13, 43, 0.7); }
        .section-label { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); }
        
        .premium-topup-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .premium-topup-card { 
          background: rgba(255,255,255,0.03); 
          border: 1.5px solid rgba(255,255,255,0.05);
          border-radius: 20px; 
          padding: 24px 16px; 
          text-align: center; 
          position: relative; 
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }
        .premium-topup-card.active { 
          background: rgba(0, 200, 150, 0.08); 
          border-color: var(--primary);
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(0, 200, 150, 0.15);
        }
        .card-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: var(--primary);
          color: #000;
          font-size: 0.6rem;
          font-weight: 900;
          padding: 4px 10px;
          border-bottom-left-radius: 12px;
          text-transform: uppercase;
        }
        .card-ec { margin-bottom: 8px; }
        .ec-num { font-size: 1.6rem; font-weight: 900; color: #fff; }
        .ec-label { font-size: 0.8rem; font-weight: 700; color: var(--primary); margin-left: 4px; }
        .card-price { font-size: 0.85rem; color: var(--text-muted); font-weight: 600; }
        
        .payment-groups { display: flex; flex-direction: column; gap: 20px; }
        .group-title { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); margin-bottom: 8px; padding-left: 4px; text-transform: uppercase; letter-spacing: 1px; }
        .group-list { padding: 4px; border-radius: 16px; }
        .payment-row { 
          display: flex; 
          align-items: center; 
          gap: 12px; 
          padding: 12px; 
          border-radius: 12px; 
          cursor: pointer;
          transition: background 0.2s;
        }
        .payment-row:active { background: rgba(255,255,255,0.05); }
        .payment-row.active .check-inner { opacity: 1; transform: scale(1); }
        .method-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .method-name { flex: 1; font-size: 0.9rem; font-weight: 600; color: var(--text-primary); }
        .check-outer { width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .check-inner { width: 10px; height: 10px; background: var(--primary); border-radius: 50%; opacity: 0; transform: scale(0.5); transition: all 0.2s; }

        .checkout-bar {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: rgba(13, 13, 43, 0.9);
          backdrop-filter: blur(20px);
          padding: 16px 20px 34px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255,255,255,0.05);
          z-index: 100;
        }
        .checkout-info { display: flex; flex-direction: column; }
        .checkout-label { font-size: 0.7rem; color: var(--text-muted); font-weight: 600; }
        .checkout-val { font-size: 1.2rem; color: #fff; font-weight: 800; }
        .checkout-btn {
          background: var(--primary);
          color: #000;
          border: none;
          padding: 12px 24px;
          border-radius: 14px;
          font-weight: 800;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 8px 20px rgba(0, 200, 150, 0.3);
        }
        .checkout-bar-spacer { height: 120px; }

        /* Processing Styles */
        .processing-wrap { text-align: center; padding: 40px 20px; width: 100%; }
        .loader-container { position: relative; width: 100px; height: 100px; margin: 0 auto 30px auto; }
        .loader-outer { position: absolute; inset: 0; border: 3px solid rgba(0, 200, 150, 0.1); border-radius: 50%; }
        .loader-inner { position: absolute; inset: 0; border: 3px solid transparent; border-top-color: var(--primary); border-radius: 50%; animation: spin 1s linear infinite; }
        .loader-icon { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: var(--primary); }
        .processing-title { font-size: 1.4rem; font-weight: 800; margin-bottom: 12px; }
        .processing-desc { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 30px; line-height: 1.5; }
        .processing-summary { padding: 20px; text-align: center; }
        .p-sum-label { font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px; font-weight: 600; }
        .p-sum-val { font-size: 1.5rem; font-weight: 900; color: #fff; }

        /* Success Styles */
        .success-lottie { position: relative; margin-bottom: 30px; }
        .success-ring { width: 100px; height: 100px; background: rgba(0, 200, 150, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; animation: bounceIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .success-title { font-size: 1.6rem; font-weight: 900; margin-bottom: 12px; color: #fff; }
        .success-desc { font-size: 0.95rem; color: var(--text-muted); margin-bottom: 30px; padding: 0 20px; line-height: 1.6; }
        .success-detail { width: 100%; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
        .detail-row { display: flex; justify-content: space-between; font-size: 0.85rem; }
        .detail-row span:first-child { color: var(--text-muted); }
        .detail-row span:last-child { color: #fff; font-weight: 700; }

        .confetti-wrap { position: absolute; inset: 0; pointer-events: none; }
        .confetti { position: absolute; width: 6px; height: 6px; background: var(--primary); border-radius: 1px; animation: confettiFall 2s ease-out forwards; opacity: 0; }
        ${[...Array(12)].map((_, i) => `
          .c${i} { 
            left: ${50 + (Math.random() - 0.5) * 80}%; 
            top: 50%; 
            background: ${['#00C896', '#FFD700', '#00AED1', '#EA1E63'][i % 4]};
            animation-delay: ${i * 0.1}s;
          }
        `).join('')}

        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0); opacity: 1; }
          100% { transform: translateY(100px) rotate(720deg); opacity: 0; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bounceIn { from { transform: scale(0); } to { transform: scale(1); } }
        .spin-slow { animation: spin 3s linear infinite; }
        .pulse-anim { animation: pulseBtn 2s infinite; }
        @keyframes pulseBtn { 
          0% { box-shadow: 0 8px 20px rgba(0, 200, 150, 0.3); }
          50% { box-shadow: 0 8px 30px rgba(0, 200, 150, 0.5); }
          100% { box-shadow: 0 8px 20px rgba(0, 200, 150, 0.3); }
        }
      `}} />
    </div>
  );
};

export default TopUp;
