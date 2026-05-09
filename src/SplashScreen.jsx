import React from 'react';
import { Trophy } from 'lucide-react';
import './SplashScreen.css';

const SplashScreen = ({ version = "1.0.0", message = "Mempersiapkan pengalaman membaca..." }) => {
    return (
        <div className="splash-screen">
            <div className="splash-content">
                <div className="logo-container shine-effect">
                    <div className="splash-logo-icon">
                        <Trophy strokeWidth={1.5} />
                    </div>
                </div>

                <div className="splash-brand">
                    <h1>The Champion</h1>
                    <p>Baca Buku · Raih Hadiah</p>
                </div>

                <div className="loading-container">
                    <div className="progress-bar">
                        <div className="progress-fill"></div>
                    </div>
                    {message && <div className="splash-status-text">{message}</div>}
                </div>
            </div>

            <div className="version-info">
                Versi {version}
            </div>
        </div>
    );
};

export default SplashScreen;
