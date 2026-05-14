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
import SplashScreen from './SplashScreen';
import Onboarding from './pages/Onboarding';
import Auth from './pages/Auth';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem('the_champion_onboarded'));
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('the_champion_logged_in') === 'true');
  const [view, setView] = useState('dashboard');

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

  const navigateTo = (page) => setView(page);

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
    return <Auth onLogin={() => {
      localStorage.setItem('the_champion_logged_in', 'true');
      setIsLoggedIn(true);
    }} />;
  }

  const renderContent = () => {
    switch (view) {
      case 'library': return <Library navigateTo={navigateTo} />;
      case 'reward': return <Reward navigateTo={navigateTo} />;
      case 'profile': return <Profile navigateTo={navigateTo} />;
      case 'referral': return <Referral navigateTo={navigateTo} />;
      case 'book-detail': return <BookDetail navigateTo={navigateTo} />;
      case 'package-select': return <PackageSelect navigateTo={navigateTo} />;
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
    </div>
  );
}

export default App;
