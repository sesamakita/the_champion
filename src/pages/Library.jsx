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

        <div className="genre-chips hide-scrollbar">
          {GENRES.map(g => (
            <div key={g} className={`genre-chip ${genre === g ? 'active' : ''}`} onClick={() => setGenre(g)}>{g}</div>
          ))}
        </div>

        <div className="books-grid">
          {filtered.map(book => (
            <div key={book.id} className="book-card" onClick={() => navigateTo('book-detail')}>
              <div className="book-cover" style={{ background: `linear-gradient(135deg, ${book.color}22, ${book.color}44)` }}>
                <span>{book.cover}</span>
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
