// src/components/calculations/TractList.tsx
import React from 'react';
import { Tract } from '../../store/tractsSlice';

interface TractListProps {
  tracts: Tract[];
  activeTractId: string | null;
  newTractName: string;
  onNewTractNameChange: (value: string) => void;
  onCreateTract: () => void;
  onSelectTract: (id: string) => void;
}

export const TractList: React.FC<TractListProps> = ({
  tracts,
  activeTractId,
  newTractName,
  onNewTractNameChange,
  onCreateTract,
  onSelectTract,
}) => {
  return (
    <div className="tract-list">
      <div className="tract-list-header">
        <h3>Тракты</h3>
        <div className="tract-create">
          <input
            type="text"
            placeholder="Название тракта"
            value={newTractName}
            onChange={e => onNewTractNameChange(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onCreateTract()}
          />
          <button className="btn-primary" onClick={onCreateTract}>
            <i className="fas fa-plus"></i> Создать
          </button>
        </div>
      </div>
      <div className="tract-items">
        {tracts.length === 0 ? (
          <div className="tract-empty">Нет созданных трактов</div>
        ) : (
          tracts.map(tract => (
            <div
              key={tract.id}
              className={`tract-item ${activeTractId === tract.id ? 'active' : ''}`}
              onClick={() => onSelectTract(tract.id)}
            >
              <div className="tract-item-name">{tract.name}</div>
              <div className="tract-item-stats">
                <span>⏱️ {tract.totalLatency.toFixed(2)} мс</span>
                <span>📡 {tract.totalBitrate} Мбит/с</span>
                <span>💡 {tract.totalPower} Вт</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
