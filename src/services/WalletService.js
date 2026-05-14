import StorageService, { STORAGE_KEYS } from './StorageService';
import { MOCK_USER, MOCK_TRANSACTIONS, EC_CONFIG, EARNING_RULES } from '../data/mockData';

/**
 * WalletService
 * Handles all financial operations involving Edu Coin (EC).
 * Ensures transaction integrity and persistence.
 */

const WalletService = {
    /**
     * Get the current user including wallet
     */
    getUser() {
        return StorageService.get(STORAGE_KEYS.CURRENT_USER) || MOCK_USER;
    },

    /**
     * Get the current wallet state
     */
    getWallet() {
        const user = this.getUser();
        return user.wallet || MOCK_USER.wallet;
    },

    /**
     * Get all transactions
     */
    getTransactions() {
        return StorageService.get(STORAGE_KEYS.REWARD_HISTORY, MOCK_TRANSACTIONS);
    },

    /**
     * Add a new transaction and update wallet balance
     * @param {Object} tx - { type, label, amount }
     */
    addTransaction(tx) {
        const transactions = this.getTransactions();
        const user = this.getUser();
        const wallet = user.wallet;

        const newTx = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            status: 'COMPLETED',
            ...tx
        };

        // Update Wallet Balances
        const amount = tx.amount;
        if (tx.type.startsWith('EARN_')) {
            wallet.earnedBalance += amount;
            wallet.lifetimeEarned += amount;
        } else if (tx.type === 'TOPUP') {
            wallet.topUpBalance += amount;
            wallet.lifetimeEarned += amount;
        } else if (tx.type.startsWith('SPEND_') || tx.type === 'WITHDRAW') {
            if (tx.type === 'WITHDRAW') {
                wallet.earnedBalance += amount; // amount is negative
                wallet.lifetimeWithdrawn += Math.abs(amount);
            } else {
                // Deduct from Top Up first, then Earned
                let remainingToDeduct = Math.abs(amount);
                if (wallet.topUpBalance >= remainingToDeduct) {
                    wallet.topUpBalance -= remainingToDeduct;
                } else {
                    remainingToDeduct -= wallet.topUpBalance;
                    wallet.topUpBalance = 0;
                    wallet.earnedBalance -= remainingToDeduct;
                }
                wallet.lifetimeSpent += Math.abs(amount);
            }
        }

        wallet.totalBalance = wallet.earnedBalance + wallet.topUpBalance;

        // Save Transactions
        const updatedTransactions = [newTx, ...transactions];
        StorageService.save(STORAGE_KEYS.REWARD_HISTORY, updatedTransactions);
        
        // Save User (which contains the wallet)
        user.wallet = wallet;
        StorageService.save(STORAGE_KEYS.CURRENT_USER, user);

        // Notify other tabs/components
        window.dispatchEvent(new Event('storage'));

        return { wallet, transaction: newTx };
    },

    /**
     * Top Up EC
     */
    topUp(amount, method = 'MOCK_PAYMENT') {
        return this.addTransaction({
            type: 'TOPUP',
            label: `Top Up EC via ${method}`,
            amount: amount
        });
    },

    /**
     * Buy a membership package
     */
    buyPackage(packageId) {
        const pkg = PACKAGES.find(p => p.id === packageId);
        if (!pkg) return { success: false, message: 'Paket tidak ditemukan' };

        const wallet = this.getWallet();
        if (wallet.totalBalance < pkg.priceEC) {
            return { success: false, message: 'Saldo EC tidak cukup' };
        }

        // Deduct balance
        this.addTransaction({
            type: 'SPEND_BOOK', // Using book spend for now, could add SPEND_PACKAGE
            label: `Beli Paket: ${pkg.name}`,
            amount: -pkg.priceEC
        });

        // Update user's package
        const user = this.getUser();
        user.package = pkg.id;
        StorageService.save(STORAGE_KEYS.CURRENT_USER, user);

        window.dispatchEvent(new Event('storage'));
        return { success: true, message: `Berhasil membeli paket ${pkg.name}` };
    },

    /**
     * Withdraw EC to Bank/E-Wallet
     */
    withdraw(amount, bankInfo) {
        const wallet = this.getWallet();
        if (wallet.earnedBalance < amount) {
            return { success: false, message: 'Saldo Earned tidak cukup' };
        }
        if (amount < EC_CONFIG.minWithdrawal) {
            return { success: false, message: `Minimal penarikan ${EC_CONFIG.minWithdrawal} EC` };
        }

        this.addTransaction({
            type: 'WITHDRAW',
            label: `Tarik Saldo ke ${bankInfo.method}`,
            amount: -amount
        });

        return { success: true, message: 'Permintaan penarikan berhasil diajukan' };
    },

    /**
     * Specifically handle reading reward
     */
    rewardReading(book) {
        return this.addTransaction({
            type: 'EARN_READ',
            label: `Selesai baca: ${book.title}`,
            amount: book.rewardEC || EARNING_RULES.readReward
        });
    },

    /**
     * Check if withdrawal is possible
     */
    canWithdraw(amount) {
        const wallet = this.getWallet();
        return wallet.earnedBalance >= amount && amount >= EC_CONFIG.minWithdrawal;
    }
};

export default WalletService;
