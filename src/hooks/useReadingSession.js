import { useState, useEffect, useRef, useCallback } from 'react';
import StorageService from '../services/StorageService';

/**
 * useReadingSession
 * Manages the entire reading session lifecycle:
 * - Per-page timer with anti-cheat validation
 * - Total reading time accumulation
 * - Progress persistence (auto-save last page)
 * - Page-flip speed detection
 * - Reading session statistics
 */

const STORAGE_PREFIX = 'champion_reading_';
const MIN_SECONDS_PER_PAGE = 8;       // Minimum 8 detik per halaman untuk dianggap "dibaca"
const FAST_FLIP_THRESHOLD = 3;         // Kurang dari 3 detik = terlalu cepat
const FAST_FLIP_WARNING_COUNT = 3;     // Setelah 3x fast-flip, tampilkan warning
const VALID_PAGES_FOR_REWARD = 0.7;    // 70% halaman harus dibaca valid untuk klaim reward

function useReadingSession(bookId, numPages) {
  // === STATE ===
  const [pageTimer, setPageTimer] = useState(0);            // Detik di halaman saat ini
  const [totalReadingTime, setTotalReadingTime] = useState(0); // Total detik membaca
  const [validPagesRead, setValidPagesRead] = useState(new Set()); // Halaman yang dibaca valid
  const [fastFlipCount, setFastFlipCount] = useState(0);    // Jumlah fast-flip berturut
  const [showFastFlipWarning, setShowFastFlipWarning] = useState(false);
  const [showPageValidated, setShowPageValidated] = useState(false);
  const [savedPage, setSavedPage] = useState(1);             // Halaman terakhir yang disimpan
  const [isSessionActive, setIsSessionActive] = useState(true);

  // === REFS ===
  const timerRef = useRef(null);
  const pageStartTime = useRef(Date.now());
  const lastPageChange = useRef(Date.now());

  // === STORAGE KEYS ===
  const progressKey = `${STORAGE_PREFIX}progress_${bookId}`;
  const sessionKey = `${STORAGE_PREFIX}session_${bookId}`;

  // === LOAD SAVED SESSION ===
  useEffect(() => {
    const saved = StorageService.get(progressKey, null);
    if (saved) {
      setSavedPage(saved.lastPage || 1);
      setTotalReadingTime(saved.totalTime || 0);
      setValidPagesRead(new Set(saved.validPages || []));
    }
  }, [bookId]);

  // === PAGE TIMER (ticks every second) ===
  useEffect(() => {
    if (!isSessionActive) return;

    timerRef.current = setInterval(() => {
      setPageTimer(prev => prev + 1);
      setTotalReadingTime(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSessionActive]);

  // === SAVE PROGRESS (auto-save every 10 seconds) ===
  useEffect(() => {
    const autoSave = setInterval(() => {
      saveProgress();
    }, 10000);

    return () => clearInterval(autoSave);
  }, [totalReadingTime, validPagesRead, savedPage]);

  // === FUNCTIONS ===
  const saveProgress = useCallback((page) => {
    const data = {
      bookId,
      lastPage: page || savedPage,
      totalTime: totalReadingTime,
      validPages: Array.from(validPagesRead),
      lastReadAt: new Date().toISOString(),
      progressPercent: numPages ? Math.round(((page || savedPage) / numPages) * 100) : 0,
    };
    StorageService.save(progressKey, data);
  }, [bookId, savedPage, totalReadingTime, validPagesRead, numPages]);

  const handlePageChange = useCallback((newPage, oldPage) => {
    const now = Date.now();
    const timeOnPage = (now - pageStartTime.current) / 1000; // seconds
    const timeSinceLastFlip = (now - lastPageChange.current) / 1000;

    // Check if page was read long enough to be "valid"
    if (timeOnPage >= MIN_SECONDS_PER_PAGE) {
      setValidPagesRead(prev => {
        const next = new Set(prev);
        next.add(oldPage);
        return next;
      });
      // Brief validation indicator
      setShowPageValidated(true);
      setTimeout(() => setShowPageValidated(false), 1500);
    }

    // Anti-cheat: detect fast page flipping
    if (timeSinceLastFlip < FAST_FLIP_THRESHOLD) {
      setFastFlipCount(prev => {
        const next = prev + 1;
        if (next >= FAST_FLIP_WARNING_COUNT) {
          setShowFastFlipWarning(true);
          setTimeout(() => setShowFastFlipWarning(false), 4000);
        }
        return next;
      });
    } else {
      setFastFlipCount(0);
    }

    // Reset timers for new page
    setPageTimer(0);
    pageStartTime.current = now;
    lastPageChange.current = now;
    setSavedPage(newPage);

    // Auto-save on page change
    saveProgress(newPage);
  }, [saveProgress]);

  const pauseSession = useCallback(() => {
    setIsSessionActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    saveProgress();
  }, [saveProgress]);

  const resumeSession = useCallback(() => {
    setIsSessionActive(true);
    pageStartTime.current = Date.now();
  }, []);

  const getSessionStats = useCallback(() => {
    const totalValid = validPagesRead.size;
    const validPercent = numPages ? Math.round((totalValid / numPages) * 100) : 0;
    const canClaimReward = numPages ? (totalValid / numPages) >= VALID_PAGES_FOR_REWARD : false;
    const progressPercent = numPages ? Math.round((savedPage / numPages) * 100) : 0;

    return {
      totalReadingTime,
      totalValidPages: totalValid,
      totalPages: numPages || 0,
      validPercent,
      canClaimReward,
      progressPercent,
      currentPage: savedPage,
      isPageValid: pageTimer >= MIN_SECONDS_PER_PAGE,
      pageTimerProgress: Math.min(pageTimer / MIN_SECONDS_PER_PAGE, 1),
    };
  }, [totalReadingTime, validPagesRead, numPages, savedPage, pageTimer]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const pad = (n) => String(n).padStart(2, '0');
    if (hrs > 0) return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    return `${pad(mins)}:${pad(secs)}`;
  };

  // === CLEANUP ===
  useEffect(() => {
    return () => {
      saveProgress();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return {
    // State
    pageTimer,
    totalReadingTime,
    validPagesRead,
    savedPage,
    fastFlipCount,
    showFastFlipWarning,
    showPageValidated,
    isSessionActive,

    // Functions
    handlePageChange,
    pauseSession,
    resumeSession,
    saveProgress,
    getSessionStats,
    formatTime,

    // Constants
    MIN_SECONDS_PER_PAGE,
  };
}

export default useReadingSession;

/**
 * Utility: Get saved reading progress for a specific book
 * (Used by BookDetail, Library, Dashboard for showing resume info)
 */
export function getBookProgress(bookId) {
  const key = `${STORAGE_PREFIX}progress_${bookId}`;
  return StorageService.get(key, null);
}

/**
 * Utility: Get all reading progress data
 */
export function getAllReadingProgress() {
  const results = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(`${STORAGE_PREFIX}progress_`)) {
      const bookId = key.replace(`${STORAGE_PREFIX}progress_`, '');
      results[bookId] = StorageService.get(key, null);
    }
  }
  return results;
}
