import { Node, Edge } from '@xyflow/react';

export type ConnectorType = ... // без изменений
export type ProtocolType = ... // без изменений

export interface DeviceInterface {
  id: string;
  name: string;
  direction: 'input' | 'output' | 'bidirectional';
  connector: ConnectorType;
  protocol: ProtocolType;
  poe?: boolean;
  poePower?: number;
  pins?: number;
}

export interface PowerSupply {
  voltage: 'AC' | 'DC';
  power: number;
  connector?: 'IEC' | 'PowerCON' | 'USB' | 'Terminal';
}

export interface DeviceNodeData {
  [key: string]: unknown;
  label: string;
  manufacturer?: string;
  model?: string;
  icon: string;
  inputs: DeviceInterface[];
  outputs: DeviceInterface[];
  color?: string;
  width?: number;
  height?: number;
  totalPoEConsumption?: number;
  powerSupply?: PowerSupply;
  borderWidth?: number;
  borderRadius?: number;
  handleLength?: number;
  handleThickness?: number;
  handleOffset?: number;
  headerFontSize?: number;
  portFontSize?: number;
  headerFontWeight?: 'normal' | 'bold';
}

export interface CableEdgeData {
  [key: string]: unknown;
  cableType: string;
  sourceLabel: string;
  targetLabel: string;
  adapter?: string;
  length?: number;
  labelText?: string;
  badgeFontSize?: number;
  badgeTextColor?: string;
  badgeBorderColor?: string;
  badgeBorderWidth?: number;
  badgeBorderRadius?: number;
  badgeBackgroundColor?: string;
}

export interface SavedSchema {
  id: string;
  name: string;
  nodes: Node<DeviceNodeData>[];
  edges: Edge<CableEdgeData>[];
}
