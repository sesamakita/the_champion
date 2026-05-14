import StorageService, { STORAGE_KEYS } from './StorageService';
import { MOCK_USER, MOCK_TRANSACTIONS, EC_CONFIG, EARNING_RULES, PACKAGES } from '../data/mockData';

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
        console.log('DEBUG: PACKAGES in WalletService:', PACKAGES);
        const pkg = PACKAGES.find(p => p.id === packageId);
        if (!pkg) return { success: false, message: 'Paket tidak ditemukan' };

        const user = this.getUser();
        const wallet = user.wallet;
        
        if (wallet.totalBalance < pkg.priceEC) {
            return { success: false, message: 'Saldo EC tidak cukup' };
        }

        // 1. Deduct balance from buyer
        this.addTransaction({
            type: 'SPEND_BOOK', // Using book spend for now
            label: `Beli Paket: ${pkg.name}`,
            amount: -pkg.priceEC
        });

        // 2. Update user's package status
        user.package = pkg.id;
        StorageService.save(STORAGE_KEYS.CURRENT_USER, user);

        // 3. Handle Referral Commission (if invited by someone)
        const invitedBy = StorageService.get(STORAGE_KEYS.REFERRAL_CODE); // The code used during registration
        if (invitedBy) {
            this.processReferralCommission(invitedBy, pkg);
        }

        window.dispatchEvent(new Event('storage'));
        return { success: true, message: `Berhasil membeli paket ${pkg.name}` };
    },

    /**
     * Process referral commission for the inviter
     */
    processReferralCommission(inviterCode, purchasedPkg) {
        // In a real app, we would find the user with this referral code in DB
        // For mock, we'll just simulate adding a transaction for "The Inviter"
        const commissionAmount = Math.floor(purchasedPkg.priceEC * purchasedPkg.referralCommission);
        
        // This is a bit tricky for mock because we are currently "The Buyer".
        // In this local architecture, we'll just log it or simulate it.
        console.log(`Referral Commission: ${commissionAmount} EC sent to inviter ${inviterCode}`);
        
        // To make it visible in MOCK_TRANSACTIONS for the current session if they were the inviter
        // but since we are the buyer, we just log it for now.
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
