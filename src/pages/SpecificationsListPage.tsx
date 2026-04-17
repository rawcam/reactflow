// src/pages/SpecificationsListPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { addSpecification } from '../store/specificationsSlice';
import { useAppDispatch } from '../hooks/hooks';
import { getSpecTotalRub } from '../utils/specificationUtils';
import { Specification } from '../store/specificationsSlice';

export const SpecificationsListPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const specifications = useSelector((state: RootState) => state.specifications.list);
  const { usdRate, eurRate } = useSelector((state: RootState) => state.currency);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSpecName, setNewSpecName] = useState('');

  const handleCreateSpec = () => {
    if (!newSpecName.trim()) return;
    const newId = Date.now().toString();
    const now = new Date().toISOString();
    dispatch(addSpecification({
      id: newId,
      name: newSpecName,
      projectId: null,
      createdAt: now,
      updatedAt: now,
      rows: [],
    }));
    setNewSpecName('');
    setShowCreateModal(false);
    navigate(`/specification/${newId}`);
  };

  const handleOpenSpec = (id: string) => {
    navigate(`/specification/${id}`);
  };

  return (
    <div className="specs-page" style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 600, color: 'var(--text-primary)' }}>Спецификации</h1>
        <button
          className="btn-primary"
          onClick={() => setShowCreateModal(true)}
          style={{ padding: '10px 20px', borderRadius: '40px' }}
        >
          <i className="fas fa-plus"></i> Новая спецификация
        </button>
      </div>

      {specifications.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
          <i className="fas fa-file-alt" style={{ fontSize: '48px', marginBottom: '16px' }}></i>
          <p>Нет созданных спецификаций. Нажмите «Новая спецификация», чтобы начать.</p>
        </div>
      ) : (
        <div className="specs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {specifications.map((spec: Specification) => {
            const total = getSpecTotalRub(spec.rows, usdRate, eurRate);
            const itemsCount = spec.rows.filter(r => r.type === 'data').length;
            return (
              <div
                key={spec.id}
                className="spec-card"
                onClick={() => handleOpenSpec(spec.id)}
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
                <i className="fas fa-file-invoice" style={{ fontSize: '32px', color: 'var(--accent)', marginBottom: '16px' }}></i>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>{spec.name}</h3>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  {itemsCount} позиций
                </div>
                <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {Math.round(total).toLocaleString()} ₽
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px' }}>
                  Обновлено: {new Date(spec.updatedAt).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ width: '400px', padding: '24px' }}>
            <h3 style={{ marginBottom: '20px' }}>Новая спецификация</h3>
            <input
              type="text"
              placeholder="Название спецификации"
              value={newSpecName}
              onChange={e => setNewSpecName(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-panel)', color: 'var(--text-primary)' }}
              autoFocus
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn-secondary" onClick={() => setShowCreateModal(false)}>Отмена</button>
              <button className="btn-primary" onClick={handleCreateSpec}>Создать</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
