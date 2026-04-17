// src/components/projects/CreateProjectModal.tsx
import React, { useState } from 'react';
import { ProjectCategory, ProjectStatus } from '../../store/projectsSlice';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (project: Omit<any, 'id' | 'shortId'>) => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('new');
  const [status, setStatus] = useState<ProjectStatus>('presale');
  const [contractAmount, setContractAmount] = useState(0);
  const [engineer, setEngineer] = useState('');
  const [projectManager, setProjectManager] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      name,
      category,
      status,
      statusStartDate: startDate,
      startDate,
      progress: 10,
      contractAmount,
      engineer,
      projectManager,
      priority: false,
      meetings: [],
      purchases: [],
      incomeSchedule: [],
      expenseSchedule: [],
      serviceVisits: [],
      actualIncome: 0,
      actualExpenses: 0,
      nextStatus: status === 'presale' ? 'design' : undefined,
      nextStatusDate: status === 'presale' ? new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10) : undefined,
      roadmapPlanned: [
        { status: 'presale', date: startDate },
        { status: 'design', date: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10) },
        { status: 'ready', date: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10) },
        { status: 'construction', date: new Date(Date.now() + 60 * 86400000).toISOString().slice(0, 10) },
        { status: 'done', date: new Date(Date.now() + 90 * 86400000).toISOString().slice(0, 10) },
      ],
      roadmapActual: [],
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ width: '500px', maxWidth: '90vw', padding: '24px' }}>
        <h3 style={{ marginBottom: '20px' }}>Новый проект</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label>Название:</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-panel)', color: 'var(--text-primary)' }} />
          </div>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label>Категория:</label>
            <select value={category} onChange={e => setCategory(e.target.value as ProjectCategory)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-panel)', color: 'var(--text-primary)' }}>
              <option value="new">Новый (0000–1999)</option>
              <option value="modernization">Модернизация (2000–3999)</option>
              <option value="service">Сервис (4000–5999)</option>
              <option value="standard">Типовой (6000–7999)</option>
              <option value="pilot">Пилот (8000–9999)</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label>Статус:</label>
            <select value={status} onChange={e => setStatus(e.target.value as ProjectStatus)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-panel)', color: 'var(--text-primary)' }}>
              <option value="presale">Пресейл</option>
              <option value="design">Стадия П</option>
              <option value="ready">Стадия Р</option>
              <option value="construction">Монтаж</option>
              <option value="done">Завершён</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label>Сумма контракта (₽):</label>
            <input type="number" value={contractAmount} onChange={e => setContractAmount(Number(e.target.value))} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-panel)', color: 'var(--text-primary)' }} />
          </div>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label>Инженер:</label>
            <input type="text" value={engineer} onChange={e => setEngineer(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-panel)', color: 'var(--text-primary)' }} />
          </div>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label>Руководитель проекта:</label>
            <input type="text" value={projectManager} onChange={e => setProjectManager(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-panel)', color: 'var(--text-primary)' }} />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label>Дата начала:</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-panel)', color: 'var(--text-primary)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>Отмена</button>
            <button type="submit" className="btn-primary">Создать</button>
          </div>
        </form>
      </div>
    </div>
  );
};
