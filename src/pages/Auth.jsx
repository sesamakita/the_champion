import { useState } from 'react';
import { Mail, Lock, User, Phone, ArrowRight, Github, Chrome, ChevronLeft } from 'lucide-react';

const Auth = ({ onLogin }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);

  const toggleMode = () => setMode(mode === 'login' ? 'signup' : 'login');

  return (
    <div className="auth-container">
      {/* Back to Onboarding if needed - optional */}
      
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
        <div className="auth-form">
          {mode === 'signup' && (
            <div className="auth-input-group">
              <label>Nama Lengkap</label>
              <div className="auth-input-wrapper">
                <User size={18} className="auth-input-icon" />
                <input type="text" placeholder="Masukkan nama lengkap" />
              </div>
            </div>
          )}

          <div className="auth-input-group">
            <label>Alamat Email</label>
            <div className="auth-input-wrapper">
              <Mail size={18} className="auth-input-icon" />
              <input type="email" placeholder="contoh@email.com" />
            </div>
          </div>

          {mode === 'signup' && (
            <div className="auth-input-group">
              <label>Nomor WhatsApp</label>
              <div className="auth-input-wrapper">
                <Phone size={18} className="auth-input-icon" />
                <input type="tel" placeholder="0812xxxx" />
              </div>
            </div>
          )}

          <div className="auth-input-group">
            <label>Kata Sandi</label>
            <div className="auth-input-wrapper">
              <Lock size={18} className="auth-input-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
              />
              <button 
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
                <input type="text" placeholder="Masukkan kode referral" />
              </div>
              <p className="auth-input-hint">Dapatkan bonus 10 EC saat pendaftaran</p>
            </div>
          )}

          {mode === 'login' && (
            <div className="auth-forgot">
              <button>Lupa kata sandi?</button>
            </div>
          )}

          <button className="auth-submit-btn" onClick={onLogin}>
            {mode === 'login' ? 'Masuk' : 'Daftar Akun'}
            <ArrowRight size={18} style={{ marginLeft: 8 }} />
          </button>
        </div>

        {/* Divider */}
        <div className="auth-divider">
          <span>Atau lanjut dengan</span>
        </div>

        {/* Social Auth */}
        <div className="auth-social">
          <button className="social-btn">
            <div className="social-icon google">G</div>
            Google
          </button>
          <button className="social-btn">
            <div className="social-icon apple"></div>
            Apple ID
          </button>
        </div>

        {/* Footer */}
        <div className="auth-footer">
          {mode === 'login' ? (
            <p>Belum punya akun? <button onClick={toggleMode}>Daftar Sekarang</button></p>
          ) : (
            <p>Sudah punya akun? <button onClick={toggleMode}>Masuk Di Sini</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
