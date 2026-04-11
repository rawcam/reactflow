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
  // Получаем путь и координаты для центрального лейбла
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

  // Для меток у концов используем точки на пути, смещённые от source и target
  // Используем дешёвый трюк: берём координаты из getSmoothStepPath с небольшим смещением по длине пути
  const pathPoints = edgePath.match(/-?\d+\.?\d*/g)?.map(Number) || [];
  let startX = sourceX, startY = sourceY;
  let endX = targetX, endY = targetY;
  
  // Находим первую точку после source (примерно)
  if (pathPoints.length >= 4) {
    // Формат пути: M x y L x y ... или кривые
    // Упростим: используем отрезок от source до ближайшей точки
    startX = pathPoints[1];
    startY = pathPoints[2];
    endX = pathPoints[pathPoints.length - 2];
    endY = pathPoints[pathPoints.length - 1];
  }

  // Смещение от концов (в пикселях)
  const offset = 25;
  const dxStart = startX - sourceX;
  const dyStart = startY - sourceY;
  const lenStart = Math.sqrt(dxStart*dxStart + dyStart*dyStart) || 1;
  const sourceLabelX = sourceX + (dxStart / lenStart) * offset;
  const sourceLabelY = sourceY + (dyStart / lenStart) * offset;

  const dxEnd = targetX - endX;
  const dyEnd = targetY - endY;
  const lenEnd = Math.sqrt(dxEnd*dxEnd + dyEnd*dyEnd) || 1;
  const targetLabelX = targetX - (dxEnd / lenEnd) * offset;
  const targetLabelY = targetY - (dyEnd / lenEnd) * offset;

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

  const mainBadgeStyle = {
    fontSize: badgeFontSize,
    padding: '2px 6px',
    background: badgeTextColor,
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
        {sourceLabel && (
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${sourceLabelX}px,${sourceLabelY}px)`,
              ...markerStyle,
            }}
            className="nodrag nopan"
          >
            {sourceLabel}
          </div>
        )}

        {targetLabel && (
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${targetLabelX}px,${targetLabelY}px)`,
              ...markerStyle,
            }}
            className="nodrag nopan"
          >
            {targetLabel}
          </div>
        )}

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
