import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Settings, Maximize2, Bookmark, Loader2, Clock, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import useReadingSession from '../hooks/useReadingSession';

// Setup worker untuk react-pdf menggunakan UNPKG yang lebih andal untuk versi spesifik
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const BookReader = ({ book, navigateTo, localFile }) => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1.0);
  const [showSessionStats, setShowSessionStats] = useState(false);

  // Gunakan file lokal jika ada, jika tidak gunakan placeholder
  const pdfSource = localFile || book.pdfUrl || null;
  const isLocalFile = !!localFile;

  // === READING SESSION HOOK ===
  const session = useReadingSession(book.id, numPages);

  // Load saved page on mount
  useEffect(() => {
    if (session.savedPage > 1 && numPages) {
      setCurrentPage(session.savedPage);
    }
  }, [numPages]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  const toggleControls = () => setShowControls(!showControls);

  // Page change with session tracking
  const goToPage = (newPage) => {
    if (newPage < 1 || (numPages && newPage > numPages)) return;
    const oldPage = currentPage;
    setCurrentPage(newPage);
    session.handlePageChange(newPage, oldPage);
  };

  const getThemeStyles = () => {
    switch(theme) {
      case 'sepia': return { bg: '#f4ecd8', filter: 'sepia(0.3) contrast(0.9)' };
      case 'dark': return { bg: '#1a1a1a', filter: 'invert(0.9) hue-rotate(180deg)' };
      default: return { bg: '#f8fafc', filter: 'none' };
    }
  };

  const styles = getThemeStyles();
  const stats = session.getSessionStats();

  return (
    <div className="reader-container" style={{ backgroundColor: styles.bg }}>
      {/* === FAST FLIP WARNING TOAST === */}
      <div className={`reader-toast warning ${session.showFastFlipWarning ? 'show' : ''}`}>
        <AlertTriangle size={16} />
        <span>Terlalu cepat! Baca perlahan agar halaman tervalidasi 📖</span>
      </div>

      {/* === PAGE VALIDATED TOAST === */}
      <div className={`reader-toast success ${session.showPageValidated ? 'show' : ''}`}>
        <CheckCircle size={16} />
        <span>Halaman tervalidasi ✓</span>
      </div>

      {/* Top Bar */}
      <div className={`reader-header ${showControls ? 'visible' : 'hidden'}`}>
        <button className="reader-back" onClick={() => { session.saveProgress(currentPage); navigateTo('library'); }}>
          <ArrowLeft size={20} />
        </button>
        <div className="reader-title-info">
          <span className="reader-book-title">{localFile ? localFile.name : book.title}</span>
          <span className="reader-page-count">
            {numPages ? `Halaman ${currentPage} dari ${numPages}` : 'Memuat dokumen...'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* Reading Timer Badge */}
          <div className="reader-timer-badge" onClick={(e) => { e.stopPropagation(); setShowSessionStats(!showSessionStats); }}>
            <Clock size={12} />
            <span>{session.formatTime(session.totalReadingTime)}</span>
          </div>
          <button className="reader-action-btn"><Bookmark size={20} /></button>
        </div>
      </div>

      {/* === PAGE VALIDATION INDICATOR (mini ring) === */}
      <div className="reader-page-ring">
        <svg width="28" height="28" viewBox="0 0 28 28">
          <circle cx="14" cy="14" r="12" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" />
          <circle cx="14" cy="14" r="12" fill="none"
            stroke={stats.isPageValid ? '#00C896' : 'var(--primary)'}
            strokeWidth="2.5"
            strokeDasharray={`${2 * Math.PI * 12}`}
            strokeDashoffset={`${2 * Math.PI * 12 * (1 - stats.pageTimerProgress)}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease, stroke 0.3s ease', transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          />
        </svg>
        {stats.isPageValid && <CheckCircle size={12} className="ring-check" />}
      </div>

      {/* Progress Bar */}
      <div className="reader-progress-bar">
        <div 
          className="reader-progress-fill" 
          style={{ width: `${numPages ? (currentPage / numPages) * 100 : 0}%` }}
        ></div>
      </div>

      {/* === SESSION STATS PANEL === */}
      <div className={`reader-session-panel ${showSessionStats ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="session-panel-header">
          <Shield size={16} color="var(--primary)" />
          <span>Sesi Membaca</span>
          <button className="session-close" onClick={() => setShowSessionStats(false)}>✕</button>
        </div>
        <div className="session-stats-grid">
          <div className="session-stat">
            <div className="session-stat-value">{session.formatTime(session.totalReadingTime)}</div>
            <div className="session-stat-label">Waktu Baca</div>
          </div>
          <div className="session-stat">
            <div className="session-stat-value">{stats.totalValidPages}/{stats.totalPages}</div>
            <div className="session-stat-label">Hlm Valid</div>
          </div>
          <div className="session-stat">
            <div className="session-stat-value">{stats.validPercent}%</div>
            <div className="session-stat-label">Validasi</div>
          </div>
          <div className="session-stat">
            <div className="session-stat-value">{stats.progressPercent}%</div>
            <div className="session-stat-label">Progres</div>
          </div>
        </div>
        {!isLocalFile && (
          <div className="session-reward-preview">
            <span>🪙</span>
            <span>{stats.canClaimReward ? `+${book.rewardEC} EC siap diklaim!` : `Baca ${Math.ceil(stats.totalPages * 0.7) - stats.totalValidPages} hlm lagi untuk reward`}</span>
          </div>
        )}
      </div>

      {/* PDF Content Area */}
      <div className="reader-content" onClick={toggleControls}>
        <div className="reader-pdf-wrapper" style={{ filter: styles.filter }}>
          {pdfSource ? (
            <Document
              file={pdfSource}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="reader-loading">
                  <Loader2 className="animate-spin" size={40} color="var(--primary)" />
                  <p>Menyiapkan lembaran buku...</p>
                </div>
              }
              error={
                <div className="reader-error">
                  <p>Gagal memuat PDF secara otomatis.</p>
                  <a 
                    href={pdfSource} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="withdraw-btn"
                    style={{ marginTop: 12, display: 'inline-block', fontSize: '0.8rem' }}
                  >
                    Buka File Secara Manual
                  </a>
                  <p style={{ fontSize: '0.65rem', marginTop: 8, color: 'var(--text-muted)' }}>
                    (Adblocker/VPN mungkin memblokir mesin pembaca)
                  </p>
                </div>
              }
            >
              <Page 
                key={`page_${currentPage}`}
                pageNumber={currentPage} 
                scale={scale}
                renderAnnotationLayer={false}
                renderTextLayer={true}
                className="reader-page-shadow"
                width={window.innerWidth > 600 ? 600 : window.innerWidth - 48}
                loading={null}
              />
            </Document>
          ) : (
            <div className="reader-error">
              <p>Tidak ada file untuk ditampilkan.</p>
              <button onClick={() => navigateTo('library')} className="withdraw-btn" style={{marginTop: 20}}>
                Pilih File di Pustaka
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className={`reader-controls ${showControls ? 'visible' : 'hidden'}`}>
        <div className="reader-controls-inner">
          <button 
            className="reader-nav-btn" 
            disabled={currentPage <= 1}
            onClick={(e) => { e.stopPropagation(); goToPage(currentPage - 1); }}
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="reader-slider-container">
            <input 
              type="range" 
              min="1" 
              max={numPages || 1} 
              value={currentPage}
              onChange={(e) => goToPage(parseInt(e.target.value))}
              onClick={(e) => e.stopPropagation()}
              className="reader-slider"
            />
          </div>

          <button 
            className="reader-nav-btn" 
            disabled={currentPage >= numPages}
            onClick={(e) => { e.stopPropagation(); goToPage(currentPage + 1); }}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="reader-settings-bar">
          {/* Theme Dots */}
          <button className={`theme-dot light ${theme === 'light' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setTheme('light'); }} title="Light"></button>
          <button className={`theme-dot sepia ${theme === 'sepia' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setTheme('sepia'); }} title="Sepia"></button>
          <button className={`theme-dot dark ${theme === 'dark' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setTheme('dark'); }} title="Dark"></button>
          
          <div className="divider"></div>
          
          {/* Zoom Controls */}
          <div className="zoom-controls">
            <button 
              className="setting-icon" 
              onClick={(e) => { e.stopPropagation(); setScale(prev => Math.max(0.5, prev - 0.1)); }}
              title="Zoom Out"
            >
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>−</div>
            </button>
            
            <span className="zoom-level" onClick={(e) => { e.stopPropagation(); setScale(1.0); }} title="Reset Zoom">
              {Math.round(scale * 100)}%
            </span>
            
            <button 
              className="setting-icon" 
              onClick={(e) => { e.stopPropagation(); setScale(prev => Math.min(2.5, prev + 0.1)); }}
              title="Zoom In"
            >
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>+</div>
            </button>
          </div>

          <div className="divider"></div>
          
          <button className="setting-icon" onClick={(e) => { e.stopPropagation(); setScale(1.0); }} title="Fit to Width">
            <Maximize2 size={18} />
          </button>
          
          <div className="reward-badge-reader">
            <span className="reward-icon">🪙</span>
            <span>+{book.rewardEC || 0} EC</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .reader-pdf-wrapper {
          display: flex;
          justify-content: center;
          min-height: 100%;
          width: fit-content;
          margin: 0 auto;
        }
        .reader-page-shadow canvas {
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          border-radius: 4px;
          max-width: none !important;
          height: auto !important;
          transition: transform 0.2s ease;
        }
        .reader-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 300px;
          gap: 15px;
          color: var(--text-muted);
          font-weight: 700;
        }
        .zoom-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .zoom-level {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--text-primary);
          background: rgba(0,0,0,0.05);
          padding: 4px 8px;
          border-radius: 6px;
          min-width: 45px;
          text-align: center;
          cursor: pointer;
        }
        .zoom-level:hover { background: rgba(0,0,0,0.1); }

        /* === READING TIMER BADGE === */
        .reader-timer-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(0,0,0,0.06);
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Courier New', monospace;
          min-width: 68px;
          justify-content: center;
        }
        .reader-timer-badge:hover {
          background: rgba(0,0,0,0.1);
          color: var(--primary);
        }

        /* === PAGE VALIDATION RING === */
        .reader-page-ring {
          position: fixed;
          top: 62px;
          right: 14px;
          z-index: 100;
          opacity: 0.85;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ring-check {
          position: absolute;
          color: #00C896;
          animation: ringPop 0.3s ease;
        }
        @keyframes ringPop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.3); }
          100% { transform: scale(1); opacity: 1; }
        }

        /* === TOAST NOTIFICATIONS === */
        .reader-toast {
          position: fixed;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          font-family: var(--font-main);
          backdrop-filter: blur(12px);
          transition: top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          white-space: nowrap;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .reader-toast.show { top: 16px; }
        .reader-toast.warning {
          background: rgba(245,166,35,0.92);
          color: #fff;
        }
        .reader-toast.success {
          background: rgba(0,200,150,0.92);
          color: #fff;
        }

        /* === SESSION STATS PANEL === */
        .reader-session-panel {
          position: fixed;
          top: 56px;
          right: 12px;
          z-index: 200;
          background: var(--bg-card);
          border: 1px solid var(--border-glow);
          border-radius: 16px;
          padding: 16px;
          width: 240px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
          opacity: 0;
          transform: translateY(-10px) scale(0.95);
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-family: var(--font-main);
        }
        .reader-session-panel.show {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: all;
        }
        .session-panel-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 14px;
        }
        .session-close {
          margin-left: auto;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 0.9rem;
          padding: 2px 6px;
          border-radius: 6px;
        }
        .session-close:hover { background: rgba(0,0,0,0.06); }
        .session-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .session-stat {
          text-align: center;
          background: rgba(0,0,0,0.03);
          border-radius: 10px;
          padding: 10px 6px;
        }
        .session-stat-value {
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .session-stat-label {
          font-size: 0.6rem;
          color: var(--text-muted);
          font-weight: 600;
          margin-top: 2px;
        }
        .session-reward-preview {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          padding: 8px 12px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(245,166,35,0.1), rgba(0,200,150,0.1));
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-secondary);
        }
      `}} />
    </div>
  );
};

export default BookReader;
