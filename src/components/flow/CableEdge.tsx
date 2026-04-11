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
  // Получаем путь и точки для позиционирования
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

  // Вычисляем позиции для маркировок, основываясь на реальном пути.
  // Получаем массив точек пути (в виде строки SVG path) и парсим первую/последнюю координаты.
  const pathCommands = edgePath.match(/[MLC]\s*[\d.]+\s*[\d.]+/g) || [];
  const firstPointMatch = pathCommands[0]?.match(/[\d.]+/g);
  const lastPointMatch = pathCommands[pathCommands.length - 1]?.match(/[\d.]+/g);
  
  let sourceMarkerX = sourceX;
  let sourceMarkerY = sourceY;
  let targetMarkerX = targetX;
  let targetMarkerY = targetY;

  if (firstPointMatch && firstPointMatch.length >= 2) {
    // Первая точка после начального смещения (отступ от source)
    const x = parseFloat(firstPointMatch[0]);
    const y = parseFloat(firstPointMatch[1]);
    // Если точка близка к source, берём вторую точку для отступа
    if (Math.hypot(x - sourceX, y - sourceY) < 5 && pathCommands.length > 1) {
      const secondMatch = pathCommands[1]?.match(/[\d.]+/g);
      if (secondMatch && secondMatch.length >= 2) {
        sourceMarkerX = parseFloat(secondMatch[0]);
        sourceMarkerY = parseFloat(secondMatch[1]);
      } else {
        sourceMarkerX = x;
        sourceMarkerY = y;
      }
    } else {
      sourceMarkerX = x;
      sourceMarkerY = y;
    }
  }

  if (lastPointMatch && lastPointMatch.length >= 2) {
    const x = parseFloat(lastPointMatch[0]);
    const y = parseFloat(lastPointMatch[1]);
    if (Math.hypot(x - targetX, y - targetY) < 5 && pathCommands.length > 1) {
      const prevMatch = pathCommands[pathCommands.length - 2]?.match(/[\d.]+/g);
      if (prevMatch && prevMatch.length >= 2) {
        targetMarkerX = parseFloat(prevMatch[0]);
        targetMarkerY = parseFloat(prevMatch[1]);
      } else {
        targetMarkerX = x;
        targetMarkerY = y;
      }
    } else {
      targetMarkerX = x;
      targetMarkerY = y;
    }
  }

  // Стиль для маркировок (компактный)
  const markerStyle: React.CSSProperties = {
    fontSize: badgeFontSize * 0.85,
    padding: '1px 4px',
    background: badgeBackgroundColor,
    border: `${badgeBorderWidth}px solid ${badgeBorderColor}`,
    borderRadius: badgeBorderRadius,
    color: badgeTextColor,
    fontWeight: 500,
    whiteSpace: 'nowrap',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    pointerEvents: 'all',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  };

  // Стиль для основного бейджа (залитый цветом)
  const mainBadgeStyle: React.CSSProperties = {
    fontSize: badgeFontSize,
    padding: '2px 6px',
    background: badgeTextColor,
    color: 'white',
    border: 'none',
    borderRadius: badgeBorderRadius,
    fontWeight: 500,
    whiteSpace: 'nowrap',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    pointerEvents: 'all',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={edgeStyle} markerEnd={markerEnd} markerStart={markerStart} />
      <EdgeLabelRenderer>
        {sourceLabel && (
          <div
            style={{
              ...markerStyle,
              left: sourceMarkerX,
              top: sourceMarkerY,
            }}
            className="nodrag nopan"
          >
            {sourceLabel}
          </div>
        )}
        {targetLabel && (
          <div
            style={{
              ...markerStyle,
              left: targetMarkerX,
              top: targetMarkerY,
            }}
            className="nodrag nopan"
          >
            {targetLabel}
          </div>
        )}
        <div
          style={{
            ...mainBadgeStyle,
            left: labelX,
            top: labelY,
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
