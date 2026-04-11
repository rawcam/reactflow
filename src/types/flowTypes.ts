import type { Node, Edge } from '@xyflow/react';

export type ConnectorType =
  | 'HDMI' | 'DVI' | 'DisplayPort' | 'VGA'
  | 'RJ45' | 'XLR' | 'TRS' | 'RCA'
  | 'USB-C' | 'USB-A' | 'USB-B'
  | 'Phoenix3' | 'Phoenix5'
  | 'PowerCON' | 'IEC'
  | 'Optical' | 'BNC';

export type ProtocolType =
  | 'HDMI' | 'DVI' | 'DisplayPort' | 'VGA'
  | 'Ethernet' | 'Dante' | 'AES67' | 'AVB'
  | 'AnalogAudio' | 'AES3'
  | 'USB2' | 'USB3' | 'USB-C-AltDP'
  | 'Power' | 'PoE';

// Матрица совместимости разъёмов и протоколов
export const CONNECTOR_PROTOCOL_MAP: Record<ConnectorType, ProtocolType[]> = {
  HDMI: ['HDMI', 'DVI', 'DisplayPort'],
  DVI: ['DVI', 'HDMI'],
  DisplayPort: ['DisplayPort', 'HDMI'],
  VGA: ['VGA'],
  RJ45: ['Ethernet', 'Dante', 'AES67', 'AVB', 'PoE'],
  XLR: ['AnalogAudio', 'AES3'],
  TRS: ['AnalogAudio'],
  RCA: ['AnalogAudio'],
  'USB-C': ['USB2', 'USB3', 'USB-C-AltDP', 'DisplayPort', 'HDMI', 'Power'],
  'USB-A': ['USB2', 'USB3', 'Power'],
  'USB-B': ['USB2', 'USB3'],
  Phoenix3: ['AnalogAudio', 'Power'],
  Phoenix5: ['AnalogAudio', 'Power'],
  PowerCON: ['Power'],
  IEC: ['Power'],
  Optical: ['AES3', 'AnalogAudio'],
  BNC: ['AnalogAudio', 'AES3'],
};

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
  edgeStrokeWidth?: number;
  sourceLabelText?: string;
  targetLabelText?: string;
}

export interface SavedSchema {
  id: string;
  name: string;
  nodes: Node<DeviceNodeData>[];
  edges: Edge<CableEdgeData>[];
}
