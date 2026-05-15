import { useState, useEffect } from 'react';
import { Home, BookOpen, Trophy, Wallet, User } from 'lucide-react';
import { App as CapApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import Reward from './pages/Reward';
import Profile from './pages/Profile';
import Referral from './pages/Referral';
import BookDetail from './pages/BookDetail';
import PackageSelect from './pages/PackageSelect';
import BookReader from './pages/BookReader';
import SplashScreen from './SplashScreen';
import Onboarding from './pages/Onboarding';
import Auth from './pages/Auth';
import TopUp from './pages/TopUp';
import { MOCK_BOOKS, DEMO_ACCOUNTS } from './data/mockData';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem('the_champion_onboarded'));
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('the_champion_logged_in') === 'true');
  const [view, setView] = useState('dashboard');
  const [viewData, setViewData] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        if (typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.()) {
          await StatusBar.setOverlaysWebView({ overlay: true });
          await StatusBar.setStyle({ style: Style.Dark });
          await StatusBar.setBackgroundColor({ color: '#0D0D2B' });
        }
      } catch (err) { console.error('StatusBar error:', err); }
    };
    init();
  }, []);

  useEffect(() => {
    let listener;
    const setup = async () => {
      try {
        if (typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.()) {
          listener = await CapApp.addListener('backButton', () => {
            if (view !== 'dashboard') setView('dashboard');
            else CapApp.exitApp();
          });
        }
      } catch (err) { console.error('Back button error:', err); }
    };
    setup();
    return () => { if (listener) listener.remove(); };
  }, [view]);

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  // Initial user setup — if logged in but no user data, set default
  useEffect(() => {
    if (isLoggedIn && !localStorage.getItem('champion_current_user')) {
      localStorage.setItem('champion_current_user', JSON.stringify(DEMO_ACCOUNTS[0].profile));
    }
  }, [isLoggedIn]);

  // Toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const navigateTo = (page, data = null) => {
    setView(page);
    setViewData(data);
  };

  const handleLogout = () => {
    localStorage.removeItem('the_champion_logged_in');
    localStorage.removeItem('champion_current_user');
    localStorage.removeItem('champion_reward_history');
    setIsLoggedIn(false);
    setView('dashboard');
  };

  if (showSplash) {
    return <SplashScreen version="1.0.0" message="Mempersiapkan pengalaman membaca..." />;
  }

  if (showOnboarding) {
    return <Onboarding onComplete={() => {
      localStorage.setItem('the_champion_onboarded', 'true');
      setShowOnboarding(false);
    }} />;
  }

  if (!isLoggedIn) {
    return <Auth onLogin={(userProfile, walletData, txData) => {
      localStorage.setItem('the_champion_logged_in', 'true');
      localStorage.setItem('champion_current_user', JSON.stringify(userProfile));
      // Store wallet data if provided
      if (walletData) {
        const fullUser = { ...userProfile, wallet: walletData };
        localStorage.setItem('champion_current_user', JSON.stringify(fullUser));
      }
      if (txData && txData.length > 0) {
        localStorage.setItem('champion_reward_history', JSON.stringify(txData));
      }
      setIsLoggedIn(true);
    }} />;
  }

  const renderContent = () => {
    switch (view) {
      case 'library': return <Library navigateTo={navigateTo} />;
      case 'reward': return <Reward navigateTo={navigateTo} />;
      case 'profile': return <Profile navigateTo={navigateTo} onLogout={handleLogout} showToast={showToast} />;
      case 'referral': return <Referral navigateTo={navigateTo} />;
      case 'book-detail': 
        const bookId = viewData?.bookId || 1;
        const book = MOCK_BOOKS.find(b => b.id === bookId) || MOCK_BOOKS[0];
        return <BookDetail book={book} navigateTo={navigateTo} />;
      case 'book-reader':
        const rBookId = viewData?.bookId || 1;
        const rBook = MOCK_BOOKS.find(b => b.id === rBookId) || MOCK_BOOKS[0];
        return <BookReader book={rBook} navigateTo={navigateTo} localFile={viewData?.localFile} />;
      case 'package-select': return <PackageSelect navigateTo={navigateTo} />;
      case 'topup': return <TopUp navigateTo={navigateTo} />;
      default: return <Dashboard navigateTo={navigateTo} />;
    }
  };

  const showNav = ['dashboard', 'library', 'reward', 'profile'].includes(view);

  return (
    <div className="app-container">
      {renderContent()}
      {showNav && (
        <nav className="bottom-nav">
          <div className={`nav-link ${view === 'dashboard' ? 'active' : ''}`} onClick={() => navigateTo('dashboard')}>
            <Home size={20} /><span className="nav-text">Beranda</span>
          </div>
          <div className={`nav-link ${view === 'library' ? 'active' : ''}`} onClick={() => navigateTo('library')}>
            <BookOpen size={20} /><span className="nav-text">Pustaka</span>
          </div>
          <div className={`nav-link ${view === 'reward' ? 'active' : ''}`} onClick={() => navigateTo('reward')}>
            <Wallet size={20} /><span className="nav-text">Reward</span>
          </div>
          <div className={`nav-link ${view === 'profile' ? 'active' : ''}`} onClick={() => navigateTo('profile')}>
            <User size={20} /><span className="nav-text">Profil</span>
          </div>
        </nav>
      )}
      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notification ${toast.type} fade-in`}>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export default App;
