// src/hooks/useFlowSchemas.ts
import { useState, useEffect } from 'react';
import { Node, Edge } from '@xyflow/react';
import { DeviceNodeData, CableEdgeData, SavedSchema } from '../types/flowTypes';

const STORAGE_KEY = 'flow_schemas';

export const useFlowSchemas = () => {
  const [schemas, setSchemas] = useState<SavedSchema[]>([]);
  const [currentSchemaId, setCurrentSchemaId] = useState<string | null>(null);
  const [schemaName, setSchemaName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSchemas(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse schemas', e);
      }
    }
  }, []);

  const saveSchemas = (newSchemas: SavedSchema[]) => {
    setSchemas(newSchemas);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSchemas));
  };

  const saveCurrentSchema = (nodes: Node<DeviceNodeData>[], edges: Edge<CableEdgeData>[]) => {
    if (!schemaName.trim()) {
      alert('Введите название схемы');
      return;
    }
    const id = currentSchemaId || Date.now().toString();
    const newSchema: SavedSchema = { id, name: schemaName, nodes, edges };
    const updated = schemas.filter(s => s.id !== id).concat(newSchema);
    saveSchemas(updated);
    setCurrentSchemaId(id);
  };

  const loadSchema = (id: string): SavedSchema | undefined => {
    const schema = schemas.find(s => s.id === id);
    if (schema) {
      setCurrentSchemaId(schema.id);
      setSchemaName(schema.name);
    }
    return schema;
  };

  const newSchema = () => {
    setCurrentSchemaId(null);
    setSchemaName('');
    return { nodes: [], edges: [] };
  };

  const importSchema = (schema: SavedSchema) => {
    setCurrentSchemaId(schema.id);
    setSchemaName(schema.name);
    const updated = schemas.filter(s => s.id !== schema.id).concat(schema);
    saveSchemas(updated);
  };

  return {
    schemas,
    currentSchemaId,
    schemaName,
    setSchemaName,
    saveCurrentSchema,
    loadSchema,
    newSchema,
    importSchema,
  };
};
