import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchNui } from '../utils/fetchNui';

interface ClientData {
  x: number;
  y: number;
  z: number;
  // Adicione outros campos conforme necessário
}

interface UseClientDataOptions {
  cacheTime?: number; // Tempo de cache em ms (padrão: 5000ms)
  debounceTime?: number; // Tempo de debounce em ms (padrão: 300ms)
  autoRefresh?: boolean; // Se deve atualizar automaticamente
  refreshInterval?: number; // Intervalo de atualização em ms
}

export const useClientData = (options: UseClientDataOptions = {}) => {
  const {
    cacheTime = 5000,
    debounceTime = 300,
    autoRefresh = false,
    refreshInterval = 1000
  } = options;

  const [data, setData] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const cacheRef = useRef<{ data: ClientData; timestamp: number } | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = useCallback(async (force = false) => {
    // Verificar cache
    if (!force && cacheRef.current) {
      const now = Date.now();
      if (now - cacheRef.current.timestamp < cacheTime) {
        setData(cacheRef.current.data);
        return;
      }
    }

    // Debounce para evitar múltiplas requisições
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchNui<ClientData>('getClientData');
        
        // Atualizar cache
        cacheRef.current = {
          data: result,
          timestamp: Date.now()
        };
        
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar dados');
        // Fallback para dados mock em caso de erro
        setData({ x: 500, y: 300, z: 200 });
      } finally {
        setLoading(false);
      }
    }, debounceTime);
  }, [cacheTime, debounceTime]);

  // Auto-refresh
  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(() => {
        fetchData();
      }, refreshInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [autoRefresh, refreshInterval, fetchData]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    refetch: () => fetchData(true),
    clearCache: () => {
      cacheRef.current = null;
    }
  };
}; 