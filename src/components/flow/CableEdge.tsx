import { FC } from 'react';
import {
  getSmoothStepPath,
  BaseEdge,
  EdgeLabelRenderer,
} from '@xyflow/react';
import { CableEdgeData } from '../../types/flowTypes';

const CableEdge: FC<any> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
  style = {},
  markerEnd,
  markerStart,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 8,
  });

  const d = (data || {}) as CableEdgeData;

  const badgeFontSize = d.badgeFontSize ?? 6;
  const badgeTextColor = d.badgeTextColor ?? '#2563eb';
  const badgeBorderColor = d.badgeBorderColor ?? '#2563eb';
  const badgeBorderWidth = d.badgeBorderWidth ?? 1;
  const badgeBorderRadius = d.badgeBorderRadius ?? 12;
  const badgeBackgroundColor = d.badgeBackgroundColor ?? 'var(--bg-panel, white)';
  const edgeStrokeWidth = d.edgeStrokeWidth ?? 2;
  const sourceLabel = d.sourceLabelText || d.sourceLabel?.split(':')[1]?.trim() || '';
  const targetLabel = d.targetLabelText || d.targetLabel?.split(':')[1]?.trim() || '';

  const displayLabel = d.labelText?.trim()
    ? d.labelText
    : d.adapter
      ? `${d.cableType} (${d.adapter})`
      : d.cableType || 'Cable';

  const edgeStyle = {
    stroke: selected ? '#ef4444' : '#2563eb',
    strokeWidth: edgeStrokeWidth,
    ...(style as React.CSSProperties),
  };

  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const length = Math.sqrt(dx * dx + dy * dy);
  const offset = Math.min(30, length * 0.1);
  const sourceOffsetX = sourceX + (dx / length) * offset;
  const sourceOffsetY = sourceY + (dy / length) * offset;
  const targetOffsetX = targetX - (dx / length) * offset;
  const targetOffsetY = targetY - (dy / length) * offset;

  // Стиль для маркировок (компактный)
  const markerStyle = {
    fontSize: badgeFontSize * 0.85,
    padding: '1px 4px',
    background: badgeBackgroundColor,
    border: `${badgeBorderWidth}px solid ${badgeBorderColor}`,
    borderRadius: badgeBorderRadius,
    color: badgeTextColor,
    fontWeight: 500,
    whiteSpace: 'nowrap',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    zIndex: 10,
  };

  // Стиль для основного бейджа (залитый цветом)
  const mainBadgeStyle = {
    fontSize: badgeFontSize,
    padding: '2px 6px',
    background: badgeTextColor, // заливка цветом текста
    color: 'white',
    border: 'none',
    borderRadius: badgeBorderRadius,
    fontWeight: 500,
    whiteSpace: 'nowrap',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    zIndex: 10,
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={edgeStyle} markerEnd={markerEnd} markerStart={markerStart} />
      <EdgeLabelRenderer>
        {/* Маркировка у источника */}
        {sourceLabel && (
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${sourceOffsetX}px,${sourceOffsetY}px)`,
              ...markerStyle,
            }}
            className="nodrag nopan"
          >
            {sourceLabel}
          </div>
        )}

        {/* Маркировка у приёмника */}
        {targetLabel && (
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${targetOffsetX}px,${targetOffsetY}px)`,
              ...markerStyle,
            }}
            className="nodrag nopan"
          >
            {targetLabel}
          </div>
        )}

        {/* Основной бейдж типа сигнала */}
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            ...mainBadgeStyle,
          }}
          className="nodrag nopan"
        >
          {displayLabel}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CableEdge;
