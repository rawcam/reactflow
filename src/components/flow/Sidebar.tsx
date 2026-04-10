import React, { useState, useEffect } from 'react';
import { Node } from 'reactflow';
import { DeviceNodeData } from '../../types/flowTypes';

interface SidebarProps {
  selectedNode: Node<DeviceNodeData> | null;
  onUpdateNode: (nodeId: string, updates: Partial<DeviceNodeData>) => void;
  schemas: any[];
  currentSchemaId: string | null;
  schemaName: string;
  onSchemaNameChange: (name: string) => void;
  onLoadSchema: (id: string) => void;
  onNewSchema: () => void;
  onSaveSchema: () => void;
  onExportSVG: () => void;
  gridSettings: any;
  onUpdateGridVariant: (variant: string) => void;
  onUpdateGridGap: (gap: number) => void;
  onUpdateSnapToGrid: (snap: boolean) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedNode,
  onUpdateNode,
  schemas,
  currentSchemaId,
  schemaName,
  onSchemaNameChange,
  onLoadSchema,
  onNewSchema,
  onSaveSchema,
  onExportSVG,
  gridSettings,
  onUpdateGridVariant,
  onUpdateGridGap,
  onUpdateSnapToGrid,
  theme,
  onToggleTheme,
}) => {
  const [localSettings, setLocalSettings] = useState({
    borderWidth: 1,
    borderRadius: 8,
    handleLength: 8,
    handleThickness: 1,
    handleOffset: 27,
    headerFontSize: 10,
    portFontSize: 6,
    headerFontWeight: 'normal' as 'normal' | 'bold',
  });

  const [showSchema, setShowSchema] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [showTheme, setShowTheme] = useState(true);
  const [showStyle, setShowStyle] = useState(true);

  useEffect(() => {
    if (selectedNode) {
      setLocalSettings({
        borderWidth: selectedNode.data.borderWidth ?? 1,
        borderRadius: selectedNode.data.borderRadius ?? 8,
        handleLength: selectedNode.data.handleLength ?? 8,
        handleThickness: selectedNode.data.handleThickness ?? 1,
        handleOffset: selectedNode.data.handleOffset ?? 27,
        headerFontSize: selectedNode.data.headerFontSize ?? 10,
        portFontSize: selectedNode.data.portFontSize ?? 6,
        headerFontWeight: selectedNode.data.headerFontWeight ?? 'normal',
      });
    }
  }, [selectedNode]);

  const handleSettingChange = (key: keyof typeof localSettings, value: any) => {
    if (!selectedNode) return;
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onUpdateNode(selectedNode.id, newSettings);
  };

  return (
    <div className={`sidebar ${theme}`}>
      {/* Схема */}
      <div className="sidebar-section">
        <div className="section-header" onClick={() => setShowSchema(!showSchema)}>
          <span><i className="fas fa-folder-open"></i> Схема</span>
          <i className={`fas fa-chevron-${showSchema ? 'down' : 'right'}`}></i>
        </div>
        {showSchema && (
          <div className="section-content">
            <select value={currentSchemaId || ''} onChange={(e) => onLoadSchema(e.target.value)}>
              <option value="">-- Выберите схему --</option>
              {schemas.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <input
              type="text"
              value={schemaName}
              onChange={(e) => onSchemaNameChange(e.target.value)}
              placeholder="Название схемы"
            />
            <div className="sidebar-actions">
              <button onClick={onSaveSchema}><i className="fas fa-save"></i> Сохранить</button>
              <button onClick={onNewSchema}><i className="fas fa-file"></i> Новая</button>
              <button onClick={onExportSVG}><i className="fas fa-camera"></i> Экспорт</button>
            </div>
          </div>
        )}
      </div>

      {/* Сетка */}
      <div className="sidebar-section">
        <div className="section-header" onClick={() => setShowGrid(!showGrid)}>
          <span><i className="fas fa-th"></i> Сетка</span>
          <i className={`fas fa-chevron-${showGrid ? 'down' : 'right'}`}></i>
        </div>
        {showGrid && (
          <div className="section-content">
            <label>Вид сетки</label>
            <select value={gridSettings.variant} onChange={(e) => onUpdateGridVariant(e.target.value)}>
              <option value="dots">Точки</option>
              <option value="lines">Линии</option>
            </select>
            <label>Размер ячейки (px)</label>
            <input
              type="number"
              min="5"
              max="50"
              value={gridSettings.gap}
              onChange={(e) => onUpdateGridGap(Number(e.target.value))}
            />
            <label>
              <input
                type="checkbox"
                checked={gridSettings.snapToGrid}
                onChange={(e) => onUpdateSnapToGrid(e.target.checked)}
              />
              Прилипание
            </label>
          </div>
        )}
      </div>

      {/* Тема */}
      <div className="sidebar-section">
        <div className="section-header" onClick={() => setShowTheme(!showTheme)}>
          <span><i className="fas fa-palette"></i> Тема</span>
          <i className={`fas fa-chevron-${showTheme ? 'down' : 'right'}`}></i>
        </div>
        {showTheme && (
          <div className="section-content">
            <button onClick={onToggleTheme} style={{ width: '100%' }}>
              {theme === 'light' ? '🌙 Тёмная' : '☀️ Светлая'}
            </button>
          </div>
        )}
      </div>

      {/* Оформление ноды */}
      {selectedNode && (
        <div className="sidebar-section">
          <div className="section-header" onClick={() => setShowStyle(!showStyle)}>
            <span><i className="fas fa-paint-brush"></i> Оформление</span>
            <i className={`fas fa-chevron-${showStyle ? 'down' : 'right'}`}></i>
          </div>
          {showStyle && (
            <div className="section-content">
              <label>Обводка (px)</label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.5"
                value={localSettings.borderWidth}
                onChange={(e) => handleSettingChange('borderWidth', Number(e.target.value))}
              />
              <label>Скругление (px)</label>
              <input
                type="number"
                min="0"
                max="20"
                value={localSettings.borderRadius}
                onChange={(e) => handleSettingChange('borderRadius', Number(e.target.value))}
              />
              <label>Длина хендла (px)</label>
              <input
                type="number"
                min="4"
                max="20"
                value={localSettings.handleLength}
                onChange={(e) => handleSettingChange('handleLength', Number(e.target.value))}
              />
              <label>Толщина хендла (px)</label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.5"
                value={localSettings.handleThickness}
                onChange={(e) => handleSettingChange('handleThickness', Number(e.target.value))}
              />
              <label>Выступ хендла (px)</label>
              <input
                type="number"
                min="0"
                max="40"
                value={localSettings.handleOffset}
                onChange={(e) => handleSettingChange('handleOffset', Number(e.target.value))}
              />
              <label>Размер заголовка (px)</label>
              <input
                type="number"
                min="8"
                max="20"
                value={localSettings.headerFontSize}
                onChange={(e) => handleSettingChange('headerFontSize', Number(e.target.value))}
              />
              <label>Жирность заголовка</label>
              <select
                value={localSettings.headerFontWeight}
                onChange={(e) => handleSettingChange('headerFontWeight', e.target.value)}
              >
                <option value="normal">Обычный</option>
                <option value="bold">Жирный</option>
              </select>
              <label>Размер портов (px)</label>
              <input
                type="number"
                min="4"
                max="12"
                value={localSettings.portFontSize}
                onChange={(e) => handleSettingChange('portFontSize', Number(e.target.value))}
              />
            </div>
          )}
        </div>
      )}

      {!selectedNode && (
        <div className="sidebar-section">
          <div className="section-content">
            <p>Выберите ноду для настройки</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
