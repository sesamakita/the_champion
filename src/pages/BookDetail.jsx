import { MOCK_BOOKS, formatEC } from '../data/mockData';
import { ArrowLeft, BookOpen, Clock, Star, Trophy } from 'lucide-react';

const BookDetail = ({ book, navigateTo }) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="back-header">
        <div className="back-btn" onClick={() => navigateTo('library')}><ArrowLeft size={18} /></div>
        <div className="back-title">Detail Buku</div>
      </div>

      <div className="main-scroll hide-scrollbar">
        {/* Cover */}
        <div className="glass-card fade-in" style={{ padding: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '5rem', marginBottom: 16 }}>{book.cover}</div>
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

        {/* Progress */}
        {book.progress > 0 && (
          <div className="glass-card fade-in" style={{ padding: 'var(--space-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Progres Membaca</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>{book.progress}%</span>
            </div>
            <div className="challenge-progress">
              <div className="challenge-progress-fill" style={{ width: `${book.progress}%` }}></div>
            </div>
          </div>
        )}

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
          {book.progress > 0 ? 'Lanjut Membaca' : 'Mulai Membaca'}
        </button>
      </div>
    </div>
  );
};

export default BookDetail;
