import { useState, useEffect } from 'react';
import { MOCK_BOOKS, formatEC } from '../data/mockData';
import { ArrowLeft, BookOpen, Clock, Star, Trophy, Play, CheckCircle } from 'lucide-react';
import { getBookProgress } from '../hooks/useReadingSession';

const BookDetail = ({ book, navigateTo }) => {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const saved = getBookProgress(book.id);
    if (saved) setProgress(saved);
  }, [book.id]);

  const hasProgress = progress && progress.lastPage > 1;
  const readPercent = progress?.progressPercent || book.progress || 0;
  const validPages = progress?.validPages?.length || 0;

  const formatTime = (seconds) => {
    if (!seconds) return '00:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const pad = (n) => String(n).padStart(2, '0');
    if (hrs > 0) return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    return `${pad(mins)}:${pad(secs)}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="back-header">
        <div className="back-btn" onClick={() => navigateTo('library')}><ArrowLeft size={18} /></div>
        <div className="back-title">Detail Buku</div>
      </div>

      <div className="main-scroll hide-scrollbar">
        {/* Cover */}
        <div className="glass-card fade-in" style={{ padding: '32px', textAlign: 'center' }}>
          {(book.cover.startsWith('http') || book.cover.startsWith('/')) ? (
            <img src={book.cover} alt={book.title} style={{ width: '150px', height: '220px', objectFit: 'cover', borderRadius: '16px', marginBottom: '16px', boxShadow: '0 15px 35px rgba(0,0,0,0.2)' }} />
          ) : (
            <div style={{ fontSize: '5rem', marginBottom: 16 }}>{book.cover}</div>
          )}
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-main)' }}>{book.title}</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 4 }}>{book.author}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--primary)' }}><Star size={14} /> <span style={{ fontWeight: 700 }}>{book.rating}</span></div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Rating</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700 }}>{book.pages}</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Halaman</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700 }}>{book.chapters}</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Bab</div>
            </div>
          </div>
        </div>

        {/* === RESUME READING CARD (jika ada progress) === */}
        {hasProgress && (
          <div className="glass-card glass-card-glow fade-in resume-card" onClick={() => navigateTo('book-reader', { bookId: book.id })}>
            <div className="resume-card-left">
              <div className="resume-icon-wrap">
                <Play size={18} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>Lanjut Membaca</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                  Halaman {progress.lastPage} dari {book.pages} • {formatTime(progress.totalTime)} dibaca
                </div>
              </div>
            </div>
            <div className="resume-card-right">
              <div className="resume-percent">{readPercent}%</div>
            </div>
          </div>
        )}

        {/* Reading Stats (jika ada data sesi) */}
        {hasProgress && (
          <div className="glass-card fade-in" style={{ padding: 'var(--space-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>📊 Statistik Membaca</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div className="detail-mini-stat">
                <Clock size={14} color="var(--primary)" />
                <div className="detail-mini-val">{formatTime(progress.totalTime)}</div>
                <div className="detail-mini-lbl">Waktu</div>
              </div>
              <div className="detail-mini-stat">
                <CheckCircle size={14} color="#00C896" />
                <div className="detail-mini-val">{validPages}</div>
                <div className="detail-mini-lbl">Hlm Valid</div>
              </div>
              <div className="detail-mini-stat">
                <BookOpen size={14} color="var(--secondary)" />
                <div className="detail-mini-val">{readPercent}%</div>
                <div className="detail-mini-lbl">Progres</div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {readPercent > 0 && (
          <div className="glass-card fade-in" style={{ padding: 'var(--space-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Progres Membaca</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>{readPercent}%</span>
            </div>
            <div className="challenge-progress">
              <div className="challenge-progress-fill" style={{ width: `${readPercent}%` }}></div>
            </div>
          </div>
        )}

        {/* Reward Info */}
        <div className="glass-card glass-card-glow fade-in ec-reward-info-card">
          <div className="ec-reward-info-left">
            <div className="ec-reward-info-icon"><Trophy size={20} color="var(--primary)" /></div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Reward Membaca</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Selesaikan buku + quiz</div>
            </div>
          </div>
          <div className="ec-reward-info-right">
            <div className="ec-reward-badge">
              <span className="ec-reward-badge-icon">🪙</span>
              <span className="ec-reward-badge-amount">{book.rewardEC}</span>
              <span className="ec-reward-badge-sym">EC</span>
            </div>
            <div className="ec-reward-info-bonus">+ 15 EC quiz bonus</div>
          </div>
        </div>

        {/* Synopsis */}
        <div className="glass-card fade-in" style={{ padding: 'var(--space-md)' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 8 }}>📝 Sinopsis</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {book.synopsis || 'Mulai membaca untuk mempelajari lebih lanjut tentang materi luar biasa di dalam buku ini.'}
          </p>
        </div>

        {/* CTA */}
        <button 
          className="withdraw-btn fade-in" 
          style={{ marginTop: 0 }}
          onClick={() => navigateTo('book-reader', { bookId: book.id })}
        >
          <BookOpen size={16} style={{ verticalAlign: 'middle', marginRight: 8 }} />
          {hasProgress ? 'Lanjut Membaca' : 'Mulai Membaca'}
        </button>
      </div>
    </div>
  );
};

export default BookDetail;
