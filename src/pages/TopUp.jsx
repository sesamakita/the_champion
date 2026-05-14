import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, CreditCard, Smartphone, Landmark, QrCode, ChevronRight, Sparkles, Loader2, Copy, Share2, ShieldCheck } from 'lucide-react';
import { formatCurrency, formatEC } from '../data/mockData';
import { useWallet } from '../hooks/useWallet';

const TOP_UP_OPTIONS = [
  { id: 1, ec: 100, price: 10000, bonus: null },
  { id: 2, ec: 500, price: 47500, bonus: '5% OFF' },
  { id: 3, ec: 1000, price: 90000, bonus: '10% OFF' },
  { id: 4, ec: 2500, price: 215000, bonus: 'Best Value' },
  { id: 5, ec: 5000, price: 400000, bonus: '20% OFF' },
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
  const { topUp } = useWallet();

  const handleProcess = () => {
    setStep('processing');
    setTimeout(() => {
      topUp(selectedOption.ec, selectedMethod.name);
      setStep('success');
    }, 3000);
  };

  if (step === 'success') {
    return (
      <div className="page-container flex-center fade-in bg-receipt-glow" style={{ padding: '20px' }}>
        <div className="receipt-container">
          <div className="receipt-ticket">
            {/* Ticket Notches */}
            <div className="notch notch-left"></div>
            <div className="notch notch-right"></div>
            
            <div className="receipt-header">
              <div className="receipt-success-icon">
                <CheckCircle2 size={36} color="#ffffff" strokeWidth={3} />
              </div>
              <h2 className="receipt-title">Pembayaran Sukses</h2>
              <div className="receipt-amount-ec">{selectedOption.ec} <span style={{ fontSize: '1.2rem' }}>EC</span></div>
              <div className="receipt-amount-fiat">{formatCurrency(selectedOption.price)}</div>
            </div>

            <div className="receipt-divider">
              <div className="dashed-line"></div>
            </div>

            <div className="receipt-body">
              <div className="receipt-row">
                <span className="label">Status Transaksi</span>
                <span className="value status-success">Success</span>
              </div>
              <div className="receipt-row">
                <span className="label">Metode Pembayaran</span>
                <span className="value">{selectedMethod.name}</span>
              </div>
              <div className="receipt-row">
                <span className="label">Nomor Referensi</span>
                <span className="value mono">CHMP{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="receipt-row">
                <span className="label">Tanggal & Waktu</span>
                <span className="value">{new Date().toLocaleDateString('id-ID')} • {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>

            <div className="receipt-footer">
              <ShieldCheck size={14} color="#64748B" />
              <span>Transaksi Aman & Terenkripsi</span>
            </div>
          </div>
          
          <div className="receipt-actions">
            <button className="receipt-action-btn">
              <Copy size={16} /> Copy ID
            </button>
            <button className="receipt-action-btn">
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>

        <button className="primary-btn mt-30" style={{ width: '100%', maxWidth: '340px' }} onClick={() => navigateTo('reward')}>
          Selesai
        </button>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="page-container flex-center fade-in">
        <div className="modern-loader">
          <div className="loader-orbit"></div>
          <div className="loader-core"><Loader2 size={32} className="spin-slow" color="var(--primary)" /></div>
        </div>
        <h2 className="processing-text">Menyinkronkan Saldo...</h2>
        <p className="processing-subtext">Mohon tunggu sebentar, kami sedang memvalidasi pembayaran Anda melalui {selectedMethod.name}.</p>
      </div>
    );
  }

  return (
    <div className="page-container topup-page">
      <div className="page-header sticky-header">
        <div className="header-left" onClick={() => navigateTo('reward')} style={{ cursor: 'pointer' }}>
          <ArrowLeft size={20} />
          <div className="header-name">Top Up Saldo</div>
        </div>
      </div>

      <div className="main-scroll hide-scrollbar">
        <div className="topup-hero">
          <div className="hero-label">Total Saldo EC Saat Ini</div>
          <div className="hero-balance">🪙 1,250 <small>EC</small></div>
        </div>

        <div className="section-padding">
          <div className="section-header-row">
            <span className="section-title">Pilih Nominal Top Up</span>
            <span className="section-sub">Dapatkan harga lebih hemat</span>
          </div>
          
          <div className="nominal-grid">
            {TOP_UP_OPTIONS.map(opt => (
              <div 
                key={opt.id} 
                className={`nominal-card ${selectedOption.id === opt.id ? 'active' : ''}`}
                onClick={() => setSelectedOption(opt)}
              >
                {opt.bonus && <div className="nominal-bonus">{opt.bonus}</div>}
                <div className="nominal-ec">{opt.ec} <small>EC</small></div>
                <div className="nominal-price">{formatCurrency(opt.price)}</div>
              </div>
            ))}
          </div>

          <div className="section-header-row mt-30">
            <span className="section-title">Metode Pembayaran</span>
            <span className="section-sub">Terverifikasi & Aman</span>
          </div>

          <div className="payment-groups-container">
            {PAYMENT_GROUPS.map((group, idx) => (
              <div key={idx} className="payment-group-item">
                <div className="group-label">{group.title}</div>
                <div className="methods-wrapper">
                  {group.methods.map(method => (
                    <div 
                      key={method.id} 
                      className={`method-tile ${selectedMethod.id === method.id ? 'active' : ''}`}
                      onClick={() => setSelectedMethod(method)}
                    >
                      <div className="method-icon-bg" style={{ color: method.color }}>
                        {method.icon}
                      </div>
                      <div className="method-info">
                        <div className="method-name">{method.name}</div>
                        <div className="method-desc">Proses Instan</div>
                      </div>
                      <div className="method-radio">
                        <div className="radio-dot"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: '120px' }}></div>
      </div>

      <div className="checkout-sticky">
        <div className="checkout-content">
          <div className="checkout-price-wrap">
            <span className="price-label">Total Pembayaran</span>
            <span className="price-value">{formatCurrency(selectedOption.price)}</span>
          </div>
          <button className="checkout-button-primary" onClick={handleProcess}>
            Konfirmasi & Bayar
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .topup-page { background: #0F172A; }
        .sticky-header { background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(20px); z-index: 1000; position: sticky; top: 0; }
        .topup-hero { padding: 30px 24px; background: linear-gradient(135deg, rgba(245,166,35,0.1), transparent); text-align: center; border-bottom: 1px solid rgba(255,255,255,0.03); }
        .hero-label { font-size: 0.75rem; font-weight: 600; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
        .hero-balance { font-size: 2rem; font-weight: 800; color: #fff; }
        .hero-balance small { font-size: 1rem; color: var(--primary); }

        .section-header-row { display: flex; flex-direction: column; gap: 4px; margin-bottom: 16px; }
        .section-title { font-size: 1rem; font-weight: 800; color: #fff; }
        .section-sub { font-size: 0.75rem; color: #94A3B8; }

        .nominal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .nominal-card { 
          background: rgba(255,255,255,0.03); 
          border: 1px solid rgba(255,255,255,0.05); 
          border-radius: 20px; 
          padding: 24px 16px; 
          position: relative; 
          transition: all 0.3s; 
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .nominal-card.active { background: rgba(245,166,35,0.08); border-color: var(--primary); transform: translateY(-4px); box-shadow: 0 12px 24px rgba(245,166,35,0.15); }
        .nominal-bonus { position: absolute; top: 0; right: 0; background: var(--primary); color: #000; font-size: 0.6rem; font-weight: 900; padding: 4px 12px; border-bottom-left-radius: 12px; }
        .nominal-ec { font-size: 1.5rem; font-weight: 900; color: #fff; }
        .nominal-ec small { font-size: 0.8rem; color: var(--primary); }
        .nominal-price { font-size: 0.85rem; color: #94A3B8; margin-top: 4px; font-weight: 600; }

        .payment-group-item { margin-bottom: 24px; }
        .group-label { font-size: 0.7rem; font-weight: 700; color: #64748B; text-transform: uppercase; margin-bottom: 12px; padding-left: 4px; }
        .methods-wrapper { background: rgba(255,255,255,0.03); border-radius: 20px; padding: 4px; border: 1px solid rgba(255,255,255,0.05); }
        .method-tile { display: flex; align-items: center; gap: 16px; padding: 14px; border-radius: 16px; transition: all 0.2s; cursor: pointer; }
        .method-tile.active { background: rgba(255,255,255,0.04); }
        .method-icon-bg { width: 44px; height: 44px; background: #fff; border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .method-info { flex: 1; }
        .method-name { font-size: 0.9rem; font-weight: 700; color: #fff; }
        .method-desc { font-size: 0.7rem; color: #64748B; margin-top: 2px; }
        .method-radio { width: 22px; height: 22px; border: 2px solid #334155; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .method-tile.active .method-radio { border-color: var(--primary); }
        .radio-dot { width: 10px; height: 10px; background: var(--primary); border-radius: 50%; transform: scale(0); transition: all 0.2s; }
        .method-tile.active .radio-dot { transform: scale(1); }

        .checkout-sticky { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(20px); border-top: 1px solid rgba(255,255,255,0.05); padding: 16px 20px 34px; z-index: 2000; }
        .checkout-content { display: flex; align-items: center; justify-content: space-between; max-width: 410px; margin: 0 auto; }
        .checkout-price-wrap { display: flex; flex-direction: column; }
        .price-label { font-size: 0.7rem; color: #94A3B8; font-weight: 600; }
        .price-value { font-size: 1.25rem; font-weight: 900; color: #fff; }
        .checkout-button-primary { background: var(--primary); color: #000; padding: 14px 28px; border-radius: 16px; font-weight: 900; border: none; font-size: 0.95rem; box-shadow: 0 8px 24px rgba(245,166,35,0.3); }

        /* Modern Loader */
        .modern-loader { position: relative; width: 80px; height: 80px; margin-bottom: 30px; }
        .loader-orbit { position: absolute; inset: 0; border: 2px dashed rgba(245,166,35,0.3); border-radius: 50%; animation: spin 4s linear infinite; }
        .loader-core { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
        .processing-text { font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 12px; }
        .processing-subtext { font-size: 0.9rem; color: #94A3B8; max-width: 280px; line-height: 1.6; }

        /* Receipt Success Screen */
        .bg-receipt-glow { 
          background: radial-gradient(circle at center, rgba(16,185,129,0.2), transparent 70%), #0F172A; 
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .receipt-container { 
          width: 90%; 
          max-width: 340px; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          animation: slideUpReceipt 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideUpReceipt {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .receipt-ticket { 
          width: 100%;
          background: #ffffff; 
          border-radius: 30px; 
          padding: 40px 24px 30px; 
          position: relative; 
          color: #1E293B; 
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        /* Notches that actually look like cut-outs */
        .notch { 
          position: absolute; 
          width: 30px; 
          height: 30px; 
          background: #0F172A; 
          border-radius: 50%; 
          top: 175px; 
          z-index: 10; 
          box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
        }
        .notch-left { left: -15px; }
        .notch-right { right: -15px; }
        
        .receipt-header { text-align: center; margin-bottom: 25px; }
        .receipt-success-icon { 
          width: 72px; height: 72px; 
          background: #10B981; 
          border-radius: 50%; 
          display: flex; align-items: center; justify-content: center; 
          margin: 0 auto 20px; 
          box-shadow: 0 12px 24px rgba(16, 185, 129, 0.4);
        }
        .receipt-title { font-size: 0.9rem; font-weight: 800; color: #10B981; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 2px; }
        .receipt-amount-ec { font-size: 3rem; font-weight: 900; color: #000; line-height: 1; letter-spacing: -1.5px; }
        .receipt-amount-fiat { font-size: 1.1rem; font-weight: 700; color: #94A3B8; margin-top: 8px; }

        .receipt-divider { 
          margin: 30px -24px; 
          height: 2px; 
          border-top: 3px dashed #F1F5F9; 
          position: relative;
        }

        .receipt-body { display: flex; flex-direction: column; gap: 20px; }
        .receipt-row { display: flex; justify-content: space-between; align-items: flex-start; }
        .receipt-row .label { font-size: 0.8rem; font-weight: 600; color: #94A3B8; }
        .receipt-row .value { font-size: 0.95rem; font-weight: 800; color: #0F172A; text-align: right; max-width: 65%; }
        .receipt-row .value.mono { font-family: 'Courier New', Courier, monospace; font-size: 0.8rem; background: #F8FAFC; padding: 2px 8px; border-radius: 6px; }
        .receipt-row .value.status-success { color: #059669; background: #ECFDF5; padding: 4px 12px; border-radius: 20px; font-size: 0.7rem; text-transform: uppercase; }

        .receipt-footer { 
          margin-top: 40px; 
          display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 18px; background: #F8FAFC; border-radius: 20px;
          font-size: 0.75rem; font-weight: 700; color: #64748B;
          border: 1px dashed #E2E8F0;
        }

        .receipt-actions { display: flex; gap: 12px; margin-top: 24px; width: 100%; }
        .receipt-action-btn { 
          flex: 1; 
          background: rgba(255,255,255,0.06); 
          border: 1px solid rgba(255,255,255,0.1); 
          color: #fff; padding: 15px; border-radius: 18px; 
          font-size: 0.85rem; font-weight: 700; 
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: all 0.2s;
        }
        .receipt-action-btn:hover { background: rgba(255,255,255,0.1); }
        .receipt-action-btn:active { transform: scale(0.96); }
      `}} />
    </div>
  );
};

export default TopUp;
