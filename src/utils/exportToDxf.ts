// src/utils/exportToDxf.ts
import { Node, Edge } from '@xyflow/react';
import { DeviceNodeData, CableEdgeData } from '../types/flowTypes';
import { Drawing, Line, Text, Polyline, Layer } from 'js-dxf';

interface Point {
  x: number;
  y: number;
}

// Конвертация координат React Flow в DXF (ось Y инвертируется)
const toDxfCoord = (x: number, y: number, maxY: number = 1000): Point => ({
  x: x,
  y: maxY - y,
});

// Определяем границы схемы для масштабирования
const getBounds = (nodes: Node<DeviceNodeData>[]) => {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  nodes.forEach(node => {
    const w = (node.data.width as number) || 90;
    const h = (node.data.height as number) || 90;
    minX = Math.min(minX, node.position.x);
    minY = Math.min(minY, node.position.y);
    maxX = Math.max(maxX, node.position.x + w);
    maxY = Math.max(maxY, node.position.y + h);
  });
  return { minX, minY, maxX, maxY };
};

export const exportToDxf = (
  nodes: Node<DeviceNodeData>[],
  edges: Edge<CableEdgeData>[],
  filename: string = 'sputnik-scheme'
) => {
  const drawing = new Drawing();
  const layer = new Layer('main', 0, 'CONTINUOUS');
  drawing.addLayer(layer);

  const bounds = getBounds(nodes);
  const maxY = bounds.maxY + 100;

  // Рисуем рёбра
  edges.forEach(edge => {
    // В DXF координаты для ребра нужны в виде отрезков (прямая линия между центрами нод)
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);
    if (!sourceNode || !targetNode) return;

    const start = toDxfCoord(
      sourceNode.position.x + ((sourceNode.data.width as number) || 90) / 2,
      sourceNode.position.y + ((sourceNode.data.height as number) || 90) / 2,
      maxY
    );
    const end = toDxfCoord(
      targetNode.position.x + ((targetNode.data.width as number) || 90) / 2,
      targetNode.position.y + ((targetNode.data.height as number) || 90) / 2,
      maxY
    );

    const strokeColor = edge.data?.edgeStrokeColor || '#2563eb';
    const strokeWidth = edge.data?.edgeStrokeWidth || 2;
    // DXF цвет: индекс или RGB
    const line = new Line(start.x, start.y, end.x, end.y);
    line.setColor(strokeColor);
    line.setLineweight(strokeWidth / 10); // в мм
    drawing.addEntity(line);
  });

  // Рисуем ноды
  nodes.forEach(node => {
    const w = (node.data.width as number) || 90;
    const h = (node.data.height as number) || 90;
    const p1 = toDxfCoord(node.position.x, node.position.y, maxY);
    const p2 = toDxfCoord(node.position.x + w, node.position.y, maxY);
    const p3 = toDxfCoord(node.position.x + w, node.position.y + h, maxY);
    const p4 = toDxfCoord(node.position.x, node.position.y + h, maxY);

    // Рамка ноды (прямоугольник)
    const poly = new Polyline([p1, p2, p3, p4], true);
    poly.setColor(node.data.color || '#2563eb');
    poly.setLineweight((node.data.borderWidth || 1) / 10);
    drawing.addEntity(poly);

    // Текст метки
    const text = new Text(
      node.data.label,
      p1.x + 5,
      p1.y + 15,
      10 // высота текста
    );
    text.setColor('#000000');
    drawing.addEntity(text);
  });

  const dxfString = drawing.toDxfString();
  const blob = new Blob([dxfString], { type: 'application/dxf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.dxf`;
  a.click();
  URL.revokeObjectURL(url);
};
