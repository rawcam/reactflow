// src/components/flow/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Node, Edge } from '@xyflow/react';
import { DeviceNodeData, CableEdgeData } from '../../types/flowTypes';

const COLOR_PALETTE = [
  '#000000', '#ffffff',
  '#9ca3af', '#6b7280', '#4b5563', '#374151', '#1f2937',
  '#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6',
];

interface SidebarProps {
  selectedNode: Node<DeviceNodeData> | null;
  selectedEdge: Edge<CableEdgeData> | null;
  onUpdateNode: (nodeId: string, updates: Partial<DeviceNodeData>) => void;
  onUpdateEdge: (edgeId: string, updates: Partial<CableEdgeData>) => void;
  onApplyNodeStyleToAll: (styles: Partial<DeviceNodeData>) => void;
  schemas: any[];
  currentSchemaId: string | null;
  schemaName: string;
  onSchemaNameChange: (name: string) => void;
  onLoadSchema: (id: string) => void;
  onNewSchema: () => void;
  onSaveSchema: () => void;
  onExportSVG: () => void;
  onExportDXF: () => void;
  onSaveToFile: () => void;
  onLoadFromFile: () => void;
  onAddNode: () => void;
  gridSettings: any;
  onUpdateGridVariant: (variant: string) => void;
  onUpdateGridGap: (gap: number) => void;
  onUpdateSnapToGrid: (snap: boolean) => void;
  onUpdateGridColor: (color: string) => void;
  onUpdateGridOpacity: (opacity: number) => void;
  onUpdateGridVisible: (visible: boolean) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ ... }) => {
  // ... все состояния и эффекты без изменений ...

  const ColorPickerCompact = ({ value, onChange, onReset, defaultColor }: any) => {
    const [expanded, setExpanded] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const buttonRef = React.useRef<HTMLDivElement>(null);

    const handleToggle = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setCoords({ top: rect.bottom + 4, left: rect.left });
      }
      setExpanded(!expanded);
    };

    const pickerContent = expanded && (
      <div
        style={{
          position: 'fixed',
          top: coords.top,
          left: coords.left,
          background: 'var(--bg-panel)',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          zIndex: 9999,
          width: '240px',
        }}
      >
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: '100%', height: '40px', marginBottom: '8px' }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: '100%', padding: '6px', marginBottom: '8px', borderRadius: '6px', border: '1px solid var(--border-light)' }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
          {COLOR_PALETTE.map(c => (
            <div
              key={c}
              style={{
                width: '24px', height: '24px', background: c, borderRadius: '6px', cursor: 'pointer',
                border: value === c ? '2px solid var(--text-primary)' : '1px solid var(--border-light)'
              }}
              onClick={() => onChange(c)}
            />
          ))}
        </div>
        <button onClick={onReset} style={{ marginTop: '8px', width: '100%', padding: '4px', cursor: 'pointer' }}>Сбросить</button>
      </div>
    );

    return (
      <>
        <div ref={buttonRef} onClick={handleToggle} style={{
          width: '32px', height: '32px', background: value, borderRadius: '8px',
          border: '1px solid var(--border-light)', cursor: 'pointer', flexShrink: 0
        }} />
        {expanded && ReactDOM.createPortal(pickerContent, document.body)}
      </>
    );
  };

  // ... остальной JSX сайдбара без изменений, но с использованием ColorPickerCompact ...
};

export default Sidebar;
