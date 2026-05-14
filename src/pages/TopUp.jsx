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
      <div className="page-container flex-center fade-in success-viewport">
        {/* Animated Background Elements */}
        <div className="floating-elements">
          <div className="float-coin c1">🪙</div>
          <div className="float-coin c2">🪙</div>
          <div className="float-sparkle s1">✨</div>
          <div className="float-sparkle s2">✨</div>
        </div>

        <div className="premium-success-card">
          <div className="card-glow-bg"></div>
          
          {/* 3D-Style Success Header */}
          <div className="success-icon-container">
            <div className="icon-glow-ring"></div>
            <div className="icon-main">
              <CheckCircle2 size={48} color="#fff" strokeWidth={3} />
            </div>
          </div>

          <div className="success-content">
            <div className="success-badge">TRANSAKSI BERHASIL</div>
            <h2 className="success-headline">Saldo Berhasil Ditambahkan</h2>
            
            <div className="amount-display">
              <div className="amount-ec">
                <span className="coin-icon">🪙</span>
                <span className="val">{selectedOption.ec}</span>
                <span className="unit">EC</span>
              </div>
              <div className="amount-fiat">{formatCurrency(selectedOption.price)}</div>
            </div>

            <div className="success-separator">
              <div className="sep-line"></div>
              <div className="sep-diamond"></div>
              <div className="sep-line"></div>
            </div>

            <div className="transaction-details">
              <div className="detail-item">
                <span className="d-label">Metode</span>
                <span className="d-value">{selectedMethod.name}</span>
              </div>
              <div className="detail-item">
                <span className="d-label">ID Transaksi</span>
                <span className="d-value mono">{Date.now().toString().slice(-10)}</span>
              </div>
              <div className="detail-item">
                <span className="d-label">Status</span>
                <span className="d-value status-pill">SUCCESSFUL</span>
              </div>
            </div>
          </div>

          <div className="card-footer-guarantee">
            <ShieldCheck size={16} color="var(--primary)" />
            <span>Pembayaran Aman & Terverifikasi</span>
          </div>
        </div>

        <div className="success-actions-wrap">
          <button className="premium-btn-primary" onClick={() => navigateTo('reward')}>
            <Sparkles size={18} />
            Selesai & Cek Wallet
          </button>
          <div className="secondary-actions">
            <button className="action-icon-btn"><Copy size={18} /></button>
            <button className="action-icon-btn"><Share2 size={18} /></button>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .success-viewport { 
            background: radial-gradient(circle at center, #1E293B 0%, #0F172A 100%);
            overflow: hidden;
            position: relative;
            padding: 20px;
            justify-content: center;
          }

          /* Floating Elements Animation */
          .floating-elements { position: absolute; inset: 0; pointer-events: none; z-index: 1; }
          .float-coin { position: absolute; font-size: 24px; filter: drop-shadow(0 0 10px rgba(245,166,35,0.5)); animation: floatAnim 4s ease-in-out infinite; }
          .c1 { top: 15%; left: 10%; animation-delay: 0s; }
          .c2 { bottom: 20%; right: 15%; animation-delay: 1s; }
          .float-sparkle { position: absolute; font-size: 20px; animation: sparkleAnim 3s linear infinite; }
          .s1 { top: 25%; right: 10%; animation-delay: 0.5s; }
          .s2 { bottom: 30%; left: 15%; animation-delay: 1.5s; }

          @keyframes floatAnim {
            0%, 100% { transform: translateY(0) rotate(0); opacity: 0.6; }
            50% { transform: translateY(-20px) rotate(20deg); opacity: 0.8; }
          }
          @keyframes sparkleAnim {
            0%, 100% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.5); opacity: 0.7; }
          }

          /* Premium Card Design */
          .premium-success-card {
            width: 100%;
            max-width: 350px;
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(25px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 40px;
            padding: 50px 24px 30px;
            position: relative;
            z-index: 10;
            box-shadow: 0 40px 100px rgba(0,0,0,0.6), inset 0 0 20px rgba(255,255,255,0.05);
            animation: cardEntrance 0.8s cubic-bezier(0.17, 0.67, 0.37, 0.99) both;
          }
          @keyframes cardEntrance {
            from { transform: scale(0.9) translateY(40px); opacity: 0; }
            to { transform: scale(1) translateY(0); opacity: 1; }
          }

          .card-glow-bg {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at top right, rgba(245,166,35,0.1), transparent 60%);
            border-radius: 40px;
            z-index: -1;
          }

          /* Success Header */
          .success-icon-container {
            position: absolute;
            top: -45px;
            left: 50%;
            transform: translateX(-50%);
            width: 90px;
            height: 90px;
          }
          .icon-glow-ring {
            position: absolute;
            inset: -10px;
            background: rgba(16, 185, 129, 0.2);
            border-radius: 50%;
            filter: blur(15px);
            animation: pulseGlow 2s infinite;
          }
          @keyframes pulseGlow {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.2); opacity: 0.8; }
          }
          .icon-main {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 15px 30px rgba(16, 185, 129, 0.4), inset 0 4px 10px rgba(255,255,255,0.3);
            border: 4px solid #0F172A;
          }

          .success-content { text-align: center; }
          .success-badge {
            background: rgba(16, 185, 129, 0.1);
            color: #10B981;
            font-size: 0.65rem;
            font-weight: 900;
            padding: 6px 16px;
            border-radius: 100px;
            display: inline-block;
            letter-spacing: 2px;
            margin-bottom: 20px;
            border: 1px solid rgba(16, 185, 129, 0.2);
          }
          .success-headline { font-size: 1.4rem; font-weight: 800; color: #fff; margin-bottom: 30px; line-height: 1.3; }

          .amount-display { margin-bottom: 30px; }
          .amount-ec { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 8px; }
          .amount-ec .coin-icon { font-size: 2rem; }
          .amount-ec .val { font-size: 3.5rem; font-weight: 900; color: #fff; letter-spacing: -2px; }
          .amount-ec .unit { font-size: 1.2rem; font-weight: 700; color: var(--primary); margin-top: 10px; }
          .amount-fiat { font-size: 1.1rem; font-weight: 700; color: #64748B; }

          .success-separator { display: flex; align-items: center; gap: 15px; margin: 30px 0; }
          .sep-line { flex: 1; height: 1px; background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent); }
          .sep-diamond { width: 6px; height: 6px; background: var(--primary); transform: rotate(45deg); box-shadow: 0 0 10px var(--primary); }

          .transaction-details { background: rgba(255,255,255,0.03); border-radius: 24px; padding: 20px; display: flex; flex-direction: column; gap: 16px; }
          .detail-item { display: flex; justify-content: space-between; align-items: center; }
          .d-label { font-size: 0.8rem; font-weight: 600; color: #64748B; }
          .d-value { font-size: 0.9rem; font-weight: 700; color: #fff; }
          .d-value.mono { font-family: monospace; font-size: 0.8rem; color: #94A3B8; }
          .status-pill { background: #10B981; color: #fff; padding: 4px 10px; border-radius: 8px; font-size: 0.65rem; font-weight: 900; }

          .card-footer-guarantee {
            margin-top: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 0.75rem;
            font-weight: 700;
            color: #64748B;
          }

          /* Bottom Actions */
          .success-actions-wrap { width: 100%; max-width: 350px; margin-top: 30px; display: flex; flex-direction: column; gap: 12px; z-index: 10; }
          .premium-btn-primary {
            width: 100%;
            padding: 20px;
            background: linear-gradient(135deg, var(--primary) 0%, #D97706 100%);
            color: #000;
            border: none;
            border-radius: 20px;
            font-weight: 900;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            box-shadow: 0 20px 40px rgba(245,166,35,0.3);
            cursor: pointer;
            transition: all 0.3s;
          }
          .premium-btn-primary:active { transform: scale(0.96); box-shadow: 0 10px 20px rgba(245,166,35,0.2); }
          
          .secondary-actions { display: flex; gap: 12px; }
          .action-icon-btn {
            flex: 1;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            color: #fff;
            padding: 16px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
          }
          .action-icon-btn:active { background: rgba(255,255,255,0.1); }
        `}} />
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
    <div className="page-container topup-viewport">
      {/* Background Glows */}
      <div className="bg-glow-orb orb-1"></div>
      <div className="bg-glow-orb orb-2"></div>

      <div className="page-header premium-header">
        <div className="header-left" onClick={() => navigateTo('reward')} style={{ cursor: 'pointer' }}>
          <div className="back-btn-glass"><ArrowLeft size={20} /></div>
          <div className="header-text-wrap">
            <div className="header-title-premium">Isi Saldo Wallet</div>
            <div className="header-sub-premium">Pilih paket Edu Coin terbaik</div>
          </div>
        </div>
      </div>

      <div className="main-scroll hide-scrollbar">
        {/* Balance Hero Card */}
        <div className="premium-hero-container">
          <div className="balance-glass-card">
            <div className="hero-coin-icon">🪙</div>
            <div className="hero-info">
              <span className="hero-label">Saldo Aktif Anda</span>
              <div className="hero-val">1,250 <small>EC</small></div>
            </div>
            <div className="hero-glow-effect"></div>
          </div>
        </div>

        <div className="section-padding-premium">
          <div className="section-header-premium">
            <Sparkles size={16} color="var(--primary)" />
            <span>Pilih Nominal Top Up</span>
          </div>
          
          <div className="premium-nominal-grid">
            {TOP_UP_OPTIONS.map((opt, idx) => (
              <div 
                key={opt.id} 
                className={`glass-nominal-card ${selectedOption.id === opt.id ? 'active' : ''}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
                onClick={() => setSelectedOption(opt)}
              >
                {opt.bonus && <div className="nominal-badge-glow">{opt.bonus}</div>}
                <div className="nominal-icon-wrap">🪙</div>
                <div className="nominal-ec-val">{opt.ec} <small>EC</small></div>
                <div className="nominal-price-tag">{formatCurrency(opt.price)}</div>
                {selectedOption.id === opt.id && <div className="card-active-glow"></div>}
              </div>
            ))}
          </div>

          <div className="section-header-premium mt-40">
            <CreditCard size={16} color="var(--primary)" />
            <span>Metode Pembayaran</span>
          </div>

          <div className="premium-payment-list">
            {PAYMENT_GROUPS.map((group, gIdx) => (
              <div key={gIdx} className="payment-group-glass">
                <div className="group-label-premium">{group.title}</div>
                <div className="methods-glass-container">
                  {group.methods.map(method => (
                    <div 
                      key={method.id} 
                      className={`method-glass-tile ${selectedMethod.id === method.id ? 'active' : ''}`}
                      onClick={() => setSelectedMethod(method)}
                    >
                      <div className="method-icon-circle" style={{ background: `${method.color}20`, color: method.color }}>
                        {method.icon}
                      </div>
                      <div className="method-text">
                        <div className="m-name-premium">{method.name}</div>
                        <div className="m-status-premium">Tersedia • Instan</div>
                      </div>
                      <div className={`m-radio-premium ${selectedMethod.id === method.id ? 'checked' : ''}`}>
                        <div className="m-radio-inner"></div>
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

      <div className="premium-checkout-bar">
        <div className="checkout-glass-inner">
          <div className="checkout-summary">
            <span className="c-label">Total Tagihan</span>
            <span className="c-val">{formatCurrency(selectedOption.price)}</span>
          </div>
          <button className="confirm-btn-premium" onClick={handleProcess}>
            <span>Konfirmasi & Bayar</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .topup-viewport { background: #0F172A; position: relative; overflow: hidden; }
        .bg-glow-orb { position: absolute; border-radius: 50%; filter: blur(100px); z-index: 0; opacity: 0.15; }
        .orb-1 { width: 300px; height: 300px; background: var(--primary); top: -50px; right: -50px; }
        .orb-2 { width: 250px; height: 250px; background: #10B981; bottom: 50px; left: -50px; }

        .premium-header { padding: 20px; background: rgba(15, 23, 42, 0.5); backdrop-filter: blur(10px); z-index: 100; }
        .back-btn-glass { width: 44px; height: 44px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 15px; }
        .header-title-premium { font-size: 1.1rem; font-weight: 800; color: #fff; }
        .header-sub-premium { font-size: 0.75rem; color: #94A3B8; margin-top: 2px; }

        .premium-hero-container { padding: 20px; z-index: 1; }
        .balance-glass-card { 
          background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 30px;
          padding: 25px;
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .hero-coin-icon { font-size: 2.5rem; filter: drop-shadow(0 0 10px rgba(245,166,35,0.4)); }
        .hero-label { font-size: 0.75rem; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px; }
        .hero-val { font-size: 1.8rem; font-weight: 900; color: #fff; }
        .hero-val small { font-size: 0.9rem; color: var(--primary); margin-left: 4px; }
        .hero-glow-effect { position: absolute; top: -50%; right: -20%; width: 100px; height: 200px; background: var(--primary); filter: blur(60px); opacity: 0.2; transform: rotate(45deg); }

        .section-padding-premium { padding: 0 20px; }
        .section-header-premium { display: flex; align-items: center; gap: 10px; font-size: 0.95rem; font-weight: 800; color: #fff; margin-bottom: 18px; }
        
        .premium-nominal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .glass-nominal-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 24px 16px;
          text-align: center;
          position: relative;
          transition: all 0.3s cubic-bezier(0.17, 0.67, 0.37, 0.99);
          animation: fadeSlideIn 0.5s ease-out both;
          cursor: pointer;
        }
        @keyframes fadeSlideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .glass-nominal-card.active {
          background: rgba(245,166,35,0.08);
          border-color: var(--primary);
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(245,166,35,0.15);
        }
        .nominal-badge-glow {
          position: absolute;
          top: -10px; right: 10px;
          background: var(--primary);
          color: #000;
          font-size: 0.6rem;
          font-weight: 900;
          padding: 4px 10px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(245,166,35,0.3);
        }
        .nominal-icon-wrap { font-size: 1.8rem; margin-bottom: 10px; }
        .nominal-ec-val { font-size: 1.5rem; font-weight: 900; color: #fff; }
        .nominal-ec-val small { font-size: 0.75rem; color: var(--primary); }
        .nominal-price-tag { font-size: 0.8rem; font-weight: 600; color: #64748B; margin-top: 5px; }
        .card-active-glow { position: absolute; inset: 0; border-radius: 24px; background: radial-gradient(circle at center, rgba(245,166,35,0.1), transparent 70%); z-index: -1; }

        .payment-group-glass { margin-bottom: 30px; }
        .group-label-premium { font-size: 0.7rem; font-weight: 800; color: #64748B; text-transform: uppercase; margin-bottom: 12px; padding-left: 5px; letter-spacing: 1px; }
        .methods-glass-container { background: rgba(255,255,255,0.02); border-radius: 24px; border: 1px solid rgba(255,255,255,0.05); overflow: hidden; }
        .method-glass-tile { display: flex; align-items: center; gap: 15px; padding: 18px; transition: all 0.2s; cursor: pointer; }
        .method-glass-tile.active { background: rgba(255,255,255,0.05); }
        .method-icon-circle { width: 44px; height: 44px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .method-text { flex: 1; }
        .m-name-premium { font-size: 0.9rem; font-weight: 700; color: #fff; }
        .m-status-premium { font-size: 0.7rem; color: #64748B; margin-top: 2px; }
        .m-radio-premium { width: 22px; height: 22px; border: 2px solid rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .m-radio-premium.checked { border-color: var(--primary); }
        .m-radio-inner { width: 10px; height: 10px; background: var(--primary); border-radius: 50%; transform: scale(0); transition: all 0.2s; }
        .m-radio-premium.checked .m-radio-inner { transform: scale(1); }

        .premium-checkout-bar { position: fixed; bottom: 0; left: 0; right: 0; padding: 20px 20px 40px; z-index: 1000; }
        .checkout-glass-inner { 
          background: rgba(30, 41, 59, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 28px;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 -20px 40px rgba(0,0,0,0.3);
        }
        .checkout-summary { display: flex; flex-direction: column; }
        .c-label { font-size: 0.7rem; font-weight: 700; color: #94A3B8; text-transform: uppercase; }
        .c-val { font-size: 1.25rem; font-weight: 900; color: #fff; }
        .confirm-btn-premium { 
          background: linear-gradient(135deg, var(--primary) 0%, #D97706 100%);
          color: #000;
          padding: 14px 24px;
          border-radius: 18px;
          border: none;
          font-weight: 900;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 10px 20px rgba(245,166,35,0.3);
          cursor: pointer;
          transition: all 0.3s;
        }
        .confirm-btn-premium:active { transform: scale(0.96); }
      `}} />
    </div>
  );
};

export default TopUp;
