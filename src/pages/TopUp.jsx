import { useState } from 'react';
import { ArrowLeft, CheckCircle2, CreditCard, Smartphone, Landmark, QrCode, ChevronRight } from 'lucide-react';
import { formatCurrency, formatEC } from '../data/mockData';
import { useWallet } from '../hooks/useWallet';

const TOP_UP_OPTIONS = [
  { id: 1, ec: 100, price: 10000 },
  { id: 2, ec: 500, price: 50000 },
  { id: 3, ec: 1000, price: 100000 },
  { id: 4, ec: 2500, price: 250000 },
  { id: 5, ec: 5000, price: 500000 },
];

const PAYMENT_METHODS = [
  { id: 'qris', name: 'QRIS', icon: <QrCode size={18} />, color: '#EA1E63' },
  { id: 'gopay', name: 'GoPay', icon: <Smartphone size={18} />, color: '#00AED1' },
  { id: 'bca', name: 'BCA Virtual Account', icon: <Landmark size={18} />, color: '#005596' },
  { id: 'card', name: 'Kartu Kredit/Debit', icon: <CreditCard size={18} />, color: '#4A90D9' },
];

const TopUp = ({ navigateTo }) => {
  const [selectedOption, setSelectedOption] = useState(TOP_UP_OPTIONS[1]);
  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0]);
  const [step, setStep] = useState('select'); // 'select', 'pending', 'success'
  const { topUp } = useWallet();

  const handleProcess = () => {
    setStep('pending');
    // Simulate payment process
    setTimeout(() => {
      topUp(selectedOption.ec, selectedMethod.name);
      setStep('success');
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="page-container flex-center fade-in">
        <div className="success-screen">
          <div className="success-icon-wrap">
            <CheckCircle2 size={48} color="#00C896" />
          </div>
          <h2>Top Up Berhasil!</h2>
          <p>Selamat! {formatEC(selectedOption.ec)} telah ditambahkan ke saldo Top Up Anda.</p>
          <button className="primary-btn mt-20" onClick={() => navigateTo('reward')}>
            Cek Saldo
          </button>
        </div>
      </div>
    );
  }

  if (step === 'pending') {
    return (
      <div className="page-container flex-center fade-in">
        <div className="pending-screen">
          <div className="loader-ring"></div>
          <h2>Memproses Pembayaran</h2>
          <p>Jangan tutup halaman ini sampai proses selesai...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container topup-page">
      <div className="page-header">
        <div className="header-left" onClick={() => navigateTo('reward')} style={{ cursor: 'pointer' }}>
          <ArrowLeft size={20} />
          <div className="header-name">Top Up Edu Coin</div>
        </div>
      </div>

      <div className="main-scroll hide-scrollbar">
        <div className="section-padding">
          <div className="section-title mb-10">Pilih Nominal</div>
          <div className="topup-grid">
            {TOP_UP_OPTIONS.map(opt => (
              <div 
                key={opt.id} 
                className={`topup-item ${selectedOption.id === opt.id ? 'active' : ''}`}
                onClick={() => setSelectedOption(opt)}
              >
                <div className="topup-ec">{opt.ec} EC</div>
                <div className="topup-price">{formatCurrency(opt.price)}</div>
                {selectedOption.id === opt.id && <div className="active-dot"></div>}
              </div>
            ))}
          </div>

          <div className="section-title mt-25 mb-10">Metode Pembayaran</div>
          <div className="payment-list">
            {PAYMENT_METHODS.map(method => (
              <div 
                key={method.id} 
                className={`payment-item ${selectedMethod.id === method.id ? 'active' : ''}`}
                onClick={() => setSelectedMethod(method)}
              >
                <div className="payment-icon" style={{ color: method.color }}>
                  {method.icon}
                </div>
                <div className="payment-name">{method.name}</div>
                <div className="payment-radio">
                  <div className={`radio-inner ${selectedMethod.id === method.id ? 'active' : ''}`}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="topup-summary glass-card mt-25">
            <div className="summary-row">
              <span>Total EC</span>
              <strong>{selectedOption.ec} EC</strong>
            </div>
            <div className="summary-row">
              <span>Total Bayar</span>
              <strong className="summary-total">{formatCurrency(selectedOption.price)}</strong>
            </div>
          </div>

          <button className="primary-btn mt-20" onClick={handleProcess}>
            Bayar Sekarang
          </button>
        </div>
        <div style={{ height: '40px' }}></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .topup-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .topup-item {
          background: var(--bg-input);
          border: 2px solid transparent;
          border-radius: 16px;
          padding: 16px;
          text-align: center;
          position: relative;
          transition: all 0.2s;
        }
        .topup-item.active {
          border-color: var(--primary);
          background: rgba(0, 200, 150, 0.05);
        }
        .topup-ec {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .topup-price {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .active-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background: var(--primary);
          border-radius: 50%;
        }
        .payment-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .payment-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-input);
          padding: 14px;
          border-radius: 12px;
          cursor: pointer;
        }
        .payment-icon {
          width: 36px;
          height: 36px;
          background: #fff;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .payment-name {
          flex: 1;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .payment-radio {
          width: 18px;
          height: 18px;
          border: 2px solid var(--border-glow);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .radio-inner {
          width: 8px;
          height: 8px;
          background: var(--primary);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .radio-inner.active { opacity: 1; }
        .topup-summary {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .summary-total {
          font-size: 1.1rem;
          color: var(--primary);
          font-weight: 800;
        }
        .flex-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          text-align: center;
        }
        .success-icon-wrap {
          width: 80px;
          height: 80px;
          background: rgba(0, 200, 150, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          margin: 0 auto 20px auto;
        }
        .loader-ring {
          width: 50px;
          height: 50px;
          border: 4px solid var(--border-glow);
          border-top: 4px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
};

export default TopUp;
