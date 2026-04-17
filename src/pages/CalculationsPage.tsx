// src/pages/CalculationsPage.tsx
import React, { useState } from 'react';
import { TractsSection } from '../features/tracts/TractsSection';
import { VideoSection } from '../features/video/VideoSection';
import { NetworkSection } from '../features/network/NetworkSection';
import { SoundSection } from '../features/sound/SoundSection';
import { LedSection } from '../features/led/LedSection';
import { VcSection } from '../features/vc/VcSection';
import { ErgoSection } from '../features/ergo/ErgoSection';
import { PowerSection } from '../features/power/PowerSection';
import { AccordionWrapper } from '../components/ui/AccordionWrapper';
import { sidebarModules } from '../config/sidebarModules';

export const CalculationsPage: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);

  const calculatorComponents: Record<string, React.ReactNode> = {
    video: <VideoSection />,
    network: <NetworkSection />,
    led: <LedSection />,
    sound: <SoundSection />,
    vc: <VcSection />,
    ergo: <ErgoSection />,
    power: <PowerSection />,
  };

  if (activeCalculator) {
    return (
      <div className="calculations-page" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <button
          className="btn-secondary"
          onClick={() => setActiveCalculator(null)}
          style={{ marginBottom: '20px', padding: '8px 16px', borderRadius: '40px' }}
        >
          <i className="fas fa-arrow-left"></i> Назад к разделам
        </button>
        {calculatorComponents[activeCalculator]}
      </div>
    );
  }

  return (
    <div className="calculations-page" style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '24px', color: 'var(--text-primary)' }}>Расчёты</h1>
      
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 500, marginBottom: '16px', color: 'var(--text-primary)' }}>Тракты</h2>
        <TractsSection onSelectCalculator={setActiveCalculator} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {sidebarModules
          .filter(m => m.id !== 'tracts' && m.id !== 'manage')
          .map(module => (
            <div
              key={module.id}
              className="calculator-card"
              onClick={() => setActiveCalculator(module.id)}
              style={{
                background: 'var(--bg-panel)',
                borderRadius: '20px',
                padding: '20px',
                boxShadow: 'var(--shadow)',
                cursor: 'pointer',
                border: '1px solid var(--border-light)',
                transition: 'transform 0.1s, box-shadow 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <i className={module.icon} style={{ fontSize: '24px', color: 'var(--accent)' }}></i>
                <h3 style={{ fontSize: '18px', fontWeight: 500, color: 'var(--text-primary)' }}>{module.title}</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Открыть калькулятор</p>
            </div>
          ))}
      </div>
    </div>
  );
};
