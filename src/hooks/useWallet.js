import { useState, useEffect, useCallback } from 'react';
import WalletService from '../services/WalletService';
import StorageService, { STORAGE_KEYS } from '../services/StorageService';

/**
 * useWallet
 * Reactive hook to manage and interact with the user's wallet.
 */
export function useWallet() {
    const [wallet, setWallet] = useState(() => WalletService.getWallet());
    const [transactions, setTransactions] = useState(() => WalletService.getTransactions());

    // Listen for storage changes (for multi-tab or cross-component sync)
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === STORAGE_KEYS.CURRENT_USER || e.key === STORAGE_KEYS.REWARD_HISTORY) {
                setWallet(WalletService.getWallet());
                setTransactions(WalletService.getTransactions());
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const addTransaction = useCallback((tx) => {
        const result = WalletService.addTransaction(tx);
        setWallet({ ...result.wallet });
        setTransactions([...WalletService.getTransactions()]);
        return result;
    }, []);

    const earnReadingReward = useCallback((book) => {
        const result = WalletService.rewardReading(book);
        setWallet({ ...result.wallet });
        setTransactions([...WalletService.getTransactions()]);
        return result;
    }, []);

    return {
        wallet,
        transactions,
        addTransaction,
        earnReadingReward,
        refresh: () => {
            setWallet(WalletService.getWallet());
            setTransactions(WalletService.getTransactions());
        }
    };
}

export default useWallet;
