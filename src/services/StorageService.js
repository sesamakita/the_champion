/**
 * StorageService
 * Manages all local device storage operations for The Champion App.
 */

const PREFIX = 'champion_';

export const STORAGE_KEYS = {
    AUTH_TOKEN: `${PREFIX}auth_token`,
    USER_SESSION: `${PREFIX}user_session`,
    IS_LOGGED_IN: `${PREFIX}is_logged_in`,
    CURRENT_USER: `${PREFIX}current_user`,
    SELECTED_PACKAGE: `${PREFIX}selected_package`,
    READING_PROGRESS: `${PREFIX}reading_progress`,
    REWARD_HISTORY: `${PREFIX}reward_history`,
    CLAIMED_REWARDS: `${PREFIX}claimed_rewards`,
    REFERRAL_CODE: `${PREFIX}referral_code`,
    STREAK_DATA: `${PREFIX}streak_data`,
    THEME_MODE: `${PREFIX}theme_mode`,
    ONBOARDING_DONE: `${PREFIX}onboarding_done`,
};

const StorageService = {
    save(key, value) {
        try {
            const serialized = typeof value === 'string' ? value : JSON.stringify(value);
            localStorage.setItem(key, serialized);
            return true;
        } catch (error) {
            console.error('StorageService: Save failed', error);
            return false;
        }
    },

    get(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            if (data === null) return defaultValue;
            if (data.startsWith('{') || data.startsWith('[')) {
                return JSON.parse(data);
            }
            if (data === 'true') return true;
            if (data === 'false') return false;
            return data;
        } catch (error) {
            console.error('StorageService: Get failed', error);
            return defaultValue;
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    },

    clearApp() {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    },

    clearSession() {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_SESSION);
        localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'false');
    }
};

export default StorageService;
