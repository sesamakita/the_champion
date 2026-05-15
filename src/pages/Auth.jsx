import { useState } from 'react';
import { Mail, Lock, User, Phone, ArrowRight, Github, Chrome, ChevronLeft } from 'lucide-react';

const Auth = ({ onLogin }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    referral: ''
  });

  const toggleMode = () => setMode(mode === 'login' ? 'signup' : 'login');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    // In a real app, we would validate and call an API here
    // For now, we just pass the form data to onLogin
    onLogin({
      name: formData.name || 'Budi Santoso',
      email: formData.email || 'budi@email.com',
      avatar: '👤',
      package: null, // Default as guest
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
      }
    });
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
                  required={mode === 'signup'}
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
                required
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
                required
              />
              <button 
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Sembunyikan' : 'Lihat'}
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
            <div className="social-icon apple"></div>
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
