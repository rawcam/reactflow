// src/components/calculations/DeviceEditModal.tsx
import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { updateDeviceThunk, TractDevice } from '../../store/tractsSlice';

interface DeviceEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  device: TractDevice;
  tractId: string;
}

export const DeviceEditModal: React.FC<DeviceEditModalProps> = ({ isOpen, onClose, device, tractId }) => {
  const dispatch = useAppDispatch();
  const [latency, setLatency] = useState(device.latency);
  const [poeEnabled, setPoeEnabled] = useState(device.poeEnabled);
  const [poePower, setPoePower] = useState(device.poePower);
  const [powerW, setPowerW] = useState(device.powerW);
  const [shortName, setShortName] = useState(device.shortName);

  useEffect(() => {
    setLatency(device.latency);
    setPoeEnabled(device.poeEnabled);
    setPoePower(device.poePower);
    setPowerW(device.powerW);
    setShortName(device.shortName);
  }, [device]);

  const handleSave = () => {
    dispatch(updateDeviceThunk({
      tractId,
      deviceId: device.id,
      updates: {
        latency,
        poeEnabled,
        poePower: poeEnabled ? poePower : 0,
        powerW,
        shortName,
      },
    }));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ width: '400px', maxWidth: '90vw', padding: '24px' }}>
        <h3 style={{ marginBottom: '16px' }}>Редактировать устройство</h3>
        <div className="form-group" style={{ marginBottom: '16px' }}>
          <label>Короткое имя:</label>
          <input
            type="text"
            value={shortName}
            onChange={e => setShortName(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-panel)', color: 'var(--text-primary)' }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '16px' }}>
          <label>Задержка (мс):</label>
          <input
            type="number"
            step="0.1"
            value={latency}
            onChange={e => setLatency(parseFloat(e.target.value) || 0)}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-panel)', color: 'var(--text-primary)' }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '16px' }}>
          <label>Мощность (Вт):</label>
          <input
            type="number"
            value={powerW}
            onChange={e => setPowerW(parseFloat(e.target.value) || 0)}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-panel)', color: 'var(--text-primary)' }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" checked={poeEnabled} onChange={e => setPoeEnabled(e.target.checked)} />
            Использовать PoE
          </label>
        </div>
        {poeEnabled && (
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label>Мощность PoE (Вт):</label>
            <input
              type="number"
              value={poePower}
              onChange={e => setPoePower(parseFloat(e.target.value) || 0)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-panel)', color: 'var(--text-primary)' }}
            />
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button className="btn-secondary" onClick={onClose}>Отмена</button>
          <button className="btn-primary" onClick={handleSave}>Сохранить</button>
        </div>
      </div>
    </div>
  );
};
