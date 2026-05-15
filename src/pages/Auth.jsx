import { useState } from 'react';
import { Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { DEMO_ACCOUNTS } from '../data/mockData';

const Auth = ({ onLogin }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    referral: ''
  });

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    // Validate fields
    if (!formData.email || !formData.password) {
      setError('Email dan kata sandi wajib diisi');
      return;
    }

    if (mode === 'signup' && !formData.name) {
      setError('Nama lengkap wajib diisi');
      return;
    }

    // Check demo accounts
    const account = DEMO_ACCOUNTS.find(
      a => a.email.toLowerCase() === formData.email.toLowerCase() && a.password === formData.password
    );

    if (mode === 'login') {
      if (!account) {
        setError('Email atau kata sandi salah. Coba akun demo di bawah.');
        return;
      }
      // Login with the matched account profile + wallet data
      onLogin(account.profile, account.wallet, account.transactions);
    } else {
      // Signup mode — create new user (uses free template)
      const newUser = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        avatar: '👤',
        level: 'Pembaca Baru',
        package: null,
        referralCode: formData.name.split(' ')[0].toUpperCase() + Math.floor(Math.random() * 9999),
        joinDate: new Date().toISOString().split('T')[0],
        stats: {
          booksCompleted: 0,
          booksInProgress: 0,
          totalPagesRead: 0,
          currentStreak: 0,
          longestStreak: 0,
          totalReadingMinutes: 0,
          totalEarnedEC: 0,
          totalReferralEC: 0,
          referralCount: 0,
        },
      };
      onLogin(newUser, DEMO_ACCOUNTS[0].wallet, []);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content fade-in">
        {/* Header Section */}
        <div className="auth-header">
          <div className="auth-logo">🏆</div>
          <h1 className="auth-title">
            {mode === 'login' ? 'Selamat Datang Kembali' : 'Bergabung Sekarang'}
          </h1>
          <p className="auth-subtitle">
            {mode === 'login' 
              ? 'Masuk untuk lanjut membaca dan raih reward' 
              : 'Mulai perjalanan membacamu dan kumpulkan Edu Coin'}
          </p>
        </div>

        {/* Demo Account Info */}
        {mode === 'login' && (
          <div className="auth-demo-info fade-in">
            <div className="auth-demo-title">
              <Info size={14} /> Akun Demo
            </div>
            <div className="auth-demo-accounts">
              <div className="auth-demo-account" onClick={() => {
                setFormData(prev => ({ ...prev, email: 'free@champion.com', password: 'free123' }));
                setError('');
              }}>
                <span className="auth-demo-badge free">GRATIS</span>
                <span className="auth-demo-email">free@champion.com</span>
                <span className="auth-demo-pass">free123</span>
              </div>
              <div className="auth-demo-account" onClick={() => {
                setFormData(prev => ({ ...prev, email: 'premium@champion.com', password: 'premium123' }));
                setError('');
              }}>
                <span className="auth-demo-badge premium">PREMIUM</span>
                <span className="auth-demo-email">premium@champion.com</span>
                <span className="auth-demo-pass">premium123</span>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="auth-error fade-in">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Form Section */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="auth-input-group">
              <label>Nama Lengkap</label>
              <div className="auth-input-wrapper">
                <User size={18} className="auth-input-icon" />
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap" 
                />
              </div>
            </div>
          )}

          <div className="auth-input-group">
            <label>Alamat Email</label>
            <div className="auth-input-wrapper">
              <Mail size={18} className="auth-input-icon" />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contoh@email.com" 
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div className="auth-input-group">
              <label>Nomor WhatsApp</label>
              <div className="auth-input-wrapper">
                <Phone size={18} className="auth-input-icon" />
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0812xxxx" 
                />
              </div>
            </div>
          )}

          <div className="auth-input-group">
            <label>Kata Sandi</label>
            <div className="auth-input-wrapper">
              <Lock size={18} className="auth-input-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••" 
              />
              <button 
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div className="auth-input-group">
              <label>Kode Referral (Opsional)</label>
              <div className="auth-input-wrapper">
                <User size={18} className="auth-input-icon" style={{ color: 'var(--primary)' }} />
                <input 
                  type="text" 
                  name="referral"
                  value={formData.referral}
                  onChange={handleChange}
                  placeholder="Masukkan kode referral" 
                />
              </div>
              <p className="auth-input-hint">Dapatkan bonus 10 EC saat pendaftaran</p>
            </div>
          )}

          {mode === 'login' && (
            <div className="auth-forgot">
              <button type="button">Lupa kata sandi?</button>
            </div>
          )}

          <button type="submit" className="auth-submit-btn">
            {mode === 'login' ? 'Masuk' : 'Daftar Akun'}
            <ArrowRight size={18} style={{ marginLeft: 8 }} />
          </button>
        </form>

        {/* Divider */}
        <div className="auth-divider">
          <span>Atau lanjut dengan</span>
        </div>

        {/* Social Auth */}
        <div className="auth-social">
          <button type="button" className="social-btn" onClick={handleSubmit}>
            <div className="social-icon google">G</div>
            Google
          </button>
          <button type="button" className="social-btn" onClick={handleSubmit}>
            <div className="social-icon apple"></div>
            Apple ID
          </button>
        </div>

        {/* Footer */}
        <div className="auth-footer">
          {mode === 'login' ? (
            <p>Belum punya akun? <button type="button" onClick={toggleMode}>Daftar Sekarang</button></p>
          ) : (
            <p>Sudah punya akun? <button type="button" onClick={toggleMode}>Masuk Di Sini</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
