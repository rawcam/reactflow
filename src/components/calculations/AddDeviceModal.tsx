// src/components/calculations/AddDeviceModal.tsx
import React, { useState } from 'react';

interface DeviceModel {
  id: string;
  name: string;
  type: string;
  latency: number;
  poe: boolean;
  poePower?: number;
  powerW: number;
  icon: string;
  hasNetwork: boolean;
  shortPrefix: string;
  bitrateFactor?: number;
  inputs?: number;
  outputs?: number;
  ports?: number;
  speed?: number;
  backplane?: number;
  switchingLatency?: number;
  poeBudget?: number;
}

interface AddDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (device: DeviceModel) => void;
  column: 'source' | 'matrix' | 'sink';
}

const DEMO_DEVICES: DeviceModel[] = [
  {
    id: '1',
    name: 'Видеокамера',
    type: 'source',
    latency: 2,
    poe: true,
    poePower: 15,
    powerW: 15,
    icon: 'fas fa-camera',
    hasNetwork: true,
    shortPrefix: 'CAM',
    bitrateFactor: 1,
  },
  {
    id: '2',
    name: 'HDMI источник',
    type: 'source',
    latency: 0.5,
    poe: false,
    powerW: 5,
    icon: 'fas fa-video',
    hasNetwork: false,
    shortPrefix: 'HDMI',
    bitrateFactor: 1,
  },
  {
    id: '3',
    name: 'Микрофон',
    type: 'source',
    latency: 0.2,
    poe: false,
    powerW: 2,
    icon: 'fas fa-microphone',
    hasNetwork: false,
    shortPrefix: 'MIC',
    bitrateFactor: 0.1,
  },
  {
    id: '4',
    name: 'Коммутатор 8 портов',
    type: 'matrix',
    latency: 0.5,
    poe: false,
    powerW: 10,
    icon: 'fas fa-network-wired',
    hasNetwork: true,
    shortPrefix: 'SW',
    ports: 8,
    switchingLatency: 0.3,
  },
  {
    id: '5',
    name: 'Матричный коммутатор',
    type: 'matrix',
    latency: 1,
    poe: false,
    powerW: 20,
    icon: 'fas fa-th',
    hasNetwork: false,
    shortPrefix: 'MX',
    inputs: 4,
    outputs: 4,
    switchingLatency: 0.5,
  },
  {
    id: '6',
    name: 'Монитор',
    type: 'sink',
    latency: 5,
    poe: false,
    powerW: 30,
    icon: 'fas fa-tv',
    hasNetwork: false,
    shortPrefix: 'MON',
  },
  {
    id: '7',
    name: 'Проектор',
    type: 'sink',
    latency: 8,
    poe: false,
    powerW: 250,
    icon: 'fas fa-video',
    hasNetwork: true,
    shortPrefix: 'PRJ',
  },
  {
    id: '8',
    name: 'Акустическая система',
    type: 'sink',
    latency: 0,
    poe: false,
    powerW: 50,
    icon: 'fas fa-volume-up',
    hasNetwork: false,
    shortPrefix: 'SPK',
  },
];

export const AddDeviceModal: React.FC<AddDeviceModalProps> = ({ isOpen, onClose, onAdd, column }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredDevices = DEMO_DEVICES.filter(d => {
    if (column === 'source' && d.type !== 'source') return false;
    if (column === 'matrix' && d.type !== 'matrix') return false;
    if (column === 'sink' && d.type !== 'sink') return false;
    return d.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ width: '500px', maxWidth: '90vw', padding: '24px' }}>
        <h3 style={{ marginBottom: '16px' }}>Добавить устройство</h3>
        <input
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '16px',
            borderRadius: '8px',
            border: '1px solid var(--border-light)',
            background: 'var(--bg-panel)',
            color: 'var(--text-primary)',
          }}
        />
        <div style={{ maxHeight: '400px', overflow: 'auto' }}>
          {filteredDevices.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>Нет подходящих устройств</p>
          ) : (
            filteredDevices.map(device => (
              <div
                key={device.id}
                className="device-item"
                onClick={() => { onAdd(device); onClose(); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--border-light)',
                }}
              >
                <i className={device.icon} style={{ fontSize: '20px', width: '24px', color: 'var(--accent)' }}></i>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500 }}>{device.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Задержка: {device.latency} мс | Мощность: {device.powerW} Вт
                    {device.poe && ` | PoE: ${device.poePower} Вт`}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
};
