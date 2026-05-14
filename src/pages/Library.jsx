import { useState } from 'react';
import { MOCK_BOOKS, GENRES, MOCK_USER } from '../data/mockData';
import { Search, ArrowLeft } from 'lucide-react';

const Library = ({ navigateTo }) => {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('Semua');

  const filtered = MOCK_BOOKS.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    const matchGenre = genre === 'Semua' || b.genre === genre;
    return matchSearch && matchGenre;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="back-header">
        <div className="back-title">📚 Perpustakaan</div>
      </div>

      <div className="main-scroll hide-scrollbar">
        <div className="search-bar">
          <Search size={18} color="var(--text-muted)" />
          <input placeholder="Cari judul atau penulis..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div style={{ padding: '0 var(--space-lg) var(--space-md)' }}>
          <input 
            type="file" 
            id="local-pdf-picker" 
            accept="application/pdf" 
            style={{ display: 'none' }} 
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) navigateTo('book-reader', { localFile: file });
            }}
          />
          <button 
            className="withdraw-btn" 
            style={{ marginTop: 0, background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px dashed var(--border-glow)' }}
            onClick={() => document.getElementById('local-pdf-picker').click()}
          >
            📂 Ujicoba PDF Lokal Anda
          </button>
        </div>

        <div className="genre-chips hide-scrollbar">
          {GENRES.map(g => (
            <div key={g} className={`genre-chip ${genre === g ? 'active' : ''}`} onClick={() => setGenre(g)}>{g}</div>
          ))}
        </div>

        <div className="books-grid">
          {filtered.map(book => (
            <div key={book.id} className="book-card" onClick={() => navigateTo('book-detail', { bookId: book.id })}>
              <div className="book-cover" style={{ background: book.cover.startsWith('http') ? 'none' : `linear-gradient(135deg, ${book.color}22, ${book.color}44)` }}>
                {book.cover.startsWith('http') ? (
                  <img src={book.cover} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                ) : (
                  <span>{book.cover}</span>
                )}
                {book.isPremium && <div className="book-premium-tag">PREMIUM</div>}
                {book.progress === 100 && <span className="book-cover-badge">✅ Selesai</span>}
                {book.progress > 0 && book.progress < 100 && <span className="book-cover-badge">{book.progress}%</span>}
                {!MOCK_USER.package && book.isPremium && <div className="book-lock-overlay">🔒</div>}
              </div>
              <div className="book-info">
                <div className="book-title">{book.title}</div>
                <div className="book-author">{book.author}</div>
                {book.progress > 0 && (
                  <>
                    <div className="book-progress-bar">
                      <div className="book-progress-fill" style={{ width: `${book.progress}%`, background: book.color }}></div>
                    </div>
                    <div className="book-progress-text">{book.progress}%</div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📭</div>
            <p>Tidak ada buku ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
