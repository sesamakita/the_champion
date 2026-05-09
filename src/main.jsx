import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '24px', fontFamily: "'Poppins', sans-serif", color: '#fca5a5', background: '#0D0D2B', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '16px' }}>
          <div style={{ fontSize: '48px' }}>🏆</div>
          <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Terjadi Kesalahan</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', maxWidth: '300px' }}>Aplikasi mengalami error. Silakan muat ulang.</p>
          <button onClick={() => window.location.reload()} style={{ marginTop: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: '600', background: '#F5A623', color: '#0D0D2B', border: 'none', borderRadius: '12px', cursor: 'pointer', fontFamily: "'Poppins', sans-serif" }}>Muat Ulang</button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
