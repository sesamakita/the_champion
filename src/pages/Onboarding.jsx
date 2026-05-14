import { useState } from 'react';
import { BookOpen, Coins, Users, ChevronRight, ArrowRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    emoji: '📚',
    icon: BookOpen,
    title: 'Baca Buku Digital',
    subtitle: 'Akses ratusan buku berkualitas langsung dari genggamanmu',
    description: 'Nikmati koleksi buku fiksi, non-fiksi, self-help, dan bisnis dari penulis terbaik Indonesia dan dunia.',
    color: '#3B82F6',
    bgGradient: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
    iconBg: 'rgba(59, 130, 246, 0.1)',
  },
  {
    id: 2,
    emoji: '🪙',
    icon: Coins,
    title: 'Kumpulkan Edu Coin',
    subtitle: 'Setiap halaman yang kamu baca menghasilkan reward',
    description: 'Selesaikan buku dan quiz untuk mendapatkan Edu Coin (EC). Tukarkan dengan uang tunai, voucher, atau hadiah menarik lainnya.',
    color: '#F5A623',
    bgGradient: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
    iconBg: 'rgba(245, 166, 35, 0.1)',
  },
  {
    id: 3,
    emoji: '👥',
    icon: Users,
    title: 'Ajak Teman, Raih Komisi',
    subtitle: 'Bagikan kode referral dan dapatkan komisi hingga 15%',
    description: 'Semakin tinggi paketmu, semakin besar komisi referral. Bangun jaringan pembaca dan jadikan membaca sebagai penghasilan.',
    color: '#10B981',
    bgGradient: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
    iconBg: 'rgba(16, 185, 129, 0.1)',
  },
];

const Onboarding = ({ onComplete }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState('next');
  const slide = SLIDES[current];
  const isLast = current === SLIDES.length - 1;
  const Icon = slide.icon;

  const goNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setDirection('next');
      setCurrent(c => c + 1);
    }
  };

  const goTo = (index) => {
    setDirection(index > current ? 'next' : 'prev');
    setCurrent(index);
  };

  return (
    <div className="onboarding-container">
      {/* Skip Button */}
      {!isLast && (
        <button className="onboarding-skip" onClick={onComplete}>
          Lewati
        </button>
      )}

      {/* Slide Content */}
      <div className="onboarding-slide" key={slide.id}>
        {/* Illustration Area */}
        <div className="onboarding-visual" style={{ background: slide.bgGradient }}>
          <div className="onboarding-visual-glow" style={{ background: `radial-gradient(circle, ${slide.color}20 0%, transparent 70%)` }}></div>
          
          {/* Floating decorations */}
          <div className="onboarding-float float-1" style={{ color: slide.color }}>✦</div>
          <div className="onboarding-float float-2" style={{ color: slide.color }}>◆</div>
          <div className="onboarding-float float-3" style={{ color: slide.color }}>●</div>

          <div className="onboarding-icon-wrapper">
            <div className="onboarding-emoji">{slide.emoji}</div>
            <div className="onboarding-icon-ring" style={{ borderColor: `${slide.color}30` }}>
              <div className="onboarding-icon-circle" style={{ background: slide.iconBg }}>
                <Icon size={32} color={slide.color} strokeWidth={1.8} />
              </div>
            </div>
          </div>

          {/* Feature pills */}
          {current === 0 && (
            <div className="onboarding-pills">
              <span className="onboarding-pill">📖 Fiksi</span>
              <span className="onboarding-pill">💡 Self-Help</span>
              <span className="onboarding-pill">💼 Bisnis</span>
            </div>
          )}
          {current === 1 && (
            <div className="onboarding-pills">
              <span className="onboarding-pill">🪙 +40 EC/buku</span>
              <span className="onboarding-pill">🧠 +15 EC/quiz</span>
            </div>
          )}
          {current === 2 && (
            <div className="onboarding-pills">
              <span className="onboarding-pill">📗 10%</span>
              <span className="onboarding-pill">📘 12%</span>
              <span className="onboarding-pill highlight">📕 15%</span>
            </div>
          )}
        </div>

        {/* Text Area */}
        <div className="onboarding-text">
          <h1 className="onboarding-title">{slide.title}</h1>
          <p className="onboarding-subtitle">{slide.subtitle}</p>
          <p className="onboarding-desc">{slide.description}</p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="onboarding-controls">
        {/* Dots */}
        <div className="onboarding-dots">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`onboarding-dot ${i === current ? 'active' : ''}`}
              style={i === current ? { background: slide.color } : {}}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        {/* CTA Button */}
        <button
          className="onboarding-cta"
          style={{ background: `linear-gradient(135deg, ${slide.color}, ${slide.color}DD)` }}
          onClick={goNext}
        >
          {isLast ? (
            <>Mulai Sekarang <ArrowRight size={18} /></>
          ) : (
            <>Lanjut <ChevronRight size={18} /></>
          )}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
