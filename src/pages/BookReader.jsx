import { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Settings, Maximize2, Bookmark, Loader2 } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Setup worker untuk react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const BookReader = ({ book, navigateTo, localFile }) => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1.0);

  // Gunakan file lokal jika ada, jika tidak gunakan placeholder
  const pdfSource = localFile || book.pdfUrl || null;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  const toggleControls = () => setShowControls(!showControls);

  const getThemeStyles = () => {
    switch(theme) {
      case 'sepia': return { bg: '#f4ecd8', filter: 'sepia(0.3) contrast(0.9)' };
      case 'dark': return { bg: '#1a1a1a', filter: 'invert(0.9) hue-rotate(180deg)' };
      default: return { bg: '#f8fafc', filter: 'none' };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className="reader-container" style={{ backgroundColor: styles.bg }}>
      {/* Top Bar */}
      <div className={`reader-header ${showControls ? 'visible' : 'hidden'}`}>
        <button className="reader-back" onClick={() => navigateTo('library')}>
          <ArrowLeft size={20} />
        </button>
        <div className="reader-title-info">
          <span className="reader-book-title">{localFile ? localFile.name : book.title}</span>
          <span className="reader-page-count">
            {numPages ? `Halaman ${currentPage} dari ${numPages}` : 'Memuat dokumen...'}
          </span>
        </div>
        <button className="reader-action-btn"><Bookmark size={20} /></button>
      </div>

      {/* Progress Bar */}
      <div className="reader-progress-bar">
        <div 
          className="reader-progress-fill" 
          style={{ width: `${numPages ? (currentPage / numPages) * 100 : 0}%` }}
        ></div>
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
                  <p>Gagal memuat PDF. Pastikan file valid.</p>
                </div>
              }
            >
              <Page 
                pageNumber={currentPage} 
                scale={scale}
                renderAnnotationLayer={false}
                renderTextLayer={true}
                className="reader-page-shadow"
                width={window.innerWidth > 600 ? 600 : window.innerWidth - 48}
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
            onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => prev - 1); }}
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="reader-slider-container">
            <input 
              type="range" 
              min="1" 
              max={numPages || 1} 
              value={currentPage}
              onChange={(e) => setCurrentPage(parseInt(e.target.value))}
              onClick={(e) => e.stopPropagation()}
              className="reader-slider"
            />
          </div>

          <button 
            className="reader-nav-btn" 
            disabled={currentPage >= numPages}
            onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => prev + 1); }}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="reader-settings-bar">
          <button className={`theme-dot light ${theme === 'light' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setTheme('light'); }}></button>
          <button className={`theme-dot sepia ${theme === 'sepia' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setTheme('sepia'); }}></button>
          <button className={`theme-dot dark ${theme === 'dark' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setTheme('dark'); }}></button>
          <div className="divider"></div>
          <button className="setting-icon" onClick={(e) => { e.stopPropagation(); setScale(prev => prev + 0.1); }}><Settings size={18} /></button>
          <button className="setting-icon" onClick={(e) => { e.stopPropagation(); setScale(1.0); }}><Maximize2 size={18} /></button>
          <div className="reward-badge-reader">
            <span className="reward-icon">🪙</span>
            <span>+40 EC</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .reader-pdf-wrapper {
          display: flex;
          justify-content: center;
          min-height: 100%;
        }
        .reader-page-shadow canvas {
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          border-radius: 4px;
          max-width: 100%;
          height: auto !important;
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
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
};

export default BookReader;
