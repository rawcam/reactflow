// src/components/flow/IconPickerModal.tsx
import React, { useState } from 'react';

interface IconCategory {
  name: string;
  icons: string[];
}

const ICON_CATEGORIES: IconCategory[] = [
  {
    name: 'Видео',
    icons: [
      'fas fa-video', 'fas fa-camera', 'fas fa-tv', 'fas fa-projector',
      'fas fa-clapperboard', 'fas fa-film', 'fas fa-play', 'fas fa-stop',
      'fas fa-pause', 'fas fa-record-vinyl', 'fas fa-broadcast-tower',
    ],
  },
  {
    name: 'Аудио',
    icons: [
      'fas fa-microphone', 'fas fa-music', 'fas fa-headphones', 'fas fa-volume-up',
      'fas fa-speaker', 'fas fa-guitar', 'fas fa-drum', 'fas fa-podcast',
      'fas fa-sliders-h', 'fas fa-waveform', 'fas fa-circle-radiation',
    ],
  },
  {
    name: 'Сеть',
    icons: [
      'fas fa-network-wired', 'fas fa-server', 'fas fa-wifi', 'fas fa-router',
      'fas fa-cloud', 'fas fa-database', 'fas fa-ethernet', 'fas fa-globe',
      'fas fa-satellite', 'fas fa-satellite-dish', 'fas fa-signal',
    ],
  },
  {
    name: 'Устройства',
    icons: [
      'fas fa-computer', 'fas fa-laptop', 'fas fa-tablet', 'fas fa-mobile-screen',
      'fas fa-phone', 'fas fa-print', 'fas fa-keyboard', 'fas fa-mouse',
      'fas fa-microchip', 'fas fa-memory', 'fas fa-hard-drive', 'fas fa-usb-drive',
    ],
  },
  {
    name: 'Питание',
    icons: [
      'fas fa-bolt', 'fas fa-plug', 'fas fa-battery-full', 'fas fa-battery-half',
      'fas fa-power-off', 'fas fa-charging-station', 'fas fa-solar-panel',
    ],
  },
  {
    name: 'Общие',
    icons: [
      'fas fa-cog', 'fas fa-wrench', 'fas fa-gear', 'fas fa-toolbox',
      'fas fa-circle', 'fas fa-square', 'fas fa-star', 'fas fa-heart',
      'fas fa-home', 'fas fa-building', 'fas fa-map-pin', 'fas fa-tag',
      'fas fa-clock', 'fas fa-calendar', 'fas fa-envelope', 'fas fa-bell',
    ],
  },
];

interface IconPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (iconClass: string) => void;
  currentIcon?: string;
}

const IconPickerModal: React.FC<IconPickerModalProps> = ({ isOpen, onClose, onSelect, currentIcon }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredCategories = ICON_CATEGORIES.map(cat => ({
    ...cat,
    icons: cat.icons.filter(icon => icon.toLowerCase().includes(searchTerm.toLowerCase())),
  })).filter(cat => cat.icons.length > 0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '800px',
          maxHeight: '80vh',
          overflow: 'auto',
          background: 'var(--bg-panel)',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: 'var(--shadow)',
          color: 'var(--text-primary)',
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '20px', fontWeight: 600 }}>Выберите иконку</h3>

        <input
          type="text"
          placeholder="Поиск иконки..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: '14px',
            border: '1px solid var(--border-light)',
            borderRadius: '12px',
            background: 'var(--bg-panel)',
            color: 'var(--text-primary)',
            marginBottom: '20px',
          }}
        />

        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              border: '1px solid var(--border-light)',
              background: selectedCategory === null ? 'var(--accent)' : 'transparent',
              color: selectedCategory === null ? 'white' : 'var(--text-primary)',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            Все
          </button>
          {ICON_CATEGORIES.map(cat => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              style={{
                padding: '6px 12px',
                borderRadius: '20px',
                border: '1px solid var(--border-light)',
                background: selectedCategory === cat.name ? 'var(--accent)' : 'transparent',
                color: selectedCategory === cat.name ? 'white' : 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {filteredCategories
          .filter(cat => !selectedCategory || cat.name === selectedCategory)
          .map(cat => (
            <div key={cat.name} style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 500, marginBottom: '10px', color: 'var(--text-secondary)' }}>
                {cat.name}
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '10px' }}>
                {cat.icons.map(icon => (
                  <div
                    key={icon}
                    onClick={() => { onSelect(icon); onClose(); }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '8px',
                      borderRadius: '12px',
                      background: currentIcon === icon ? 'var(--accent)' : 'var(--card-bg)',
                      color: currentIcon === icon ? 'white' : 'var(--text-primary)',
                      cursor: 'pointer',
                      border: '1px solid var(--border-light)',
                    }}
                  >
                    <i className={icon} style={{ fontSize: '24px', marginBottom: '4px' }} />
                    <span style={{ fontSize: '10px', textAlign: 'center', wordBreak: 'break-word' }}>
                      {icon.split('fa-')[1]?.replace(/-/g, ' ') || icon}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default IconPickerModal;
