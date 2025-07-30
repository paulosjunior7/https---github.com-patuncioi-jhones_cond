import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage?: number;
  renderTime: number;
  requestCount: number;
}

interface UsePerformanceOptions {
  enabled?: boolean;
  interval?: number; // Intervalo de medição em ms
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
}

export const usePerformance = (options: UsePerformanceOptions = {}) => {
  const { enabled = true, interval = 1000, onMetricsUpdate } = options;
  
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    renderTime: 0,
    requestCount: 0
  });
  
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const requestCountRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Contador de FPS
  const measureFPS = () => {
    frameCountRef.current++;
    const currentTime = performance.now();
    
    if (currentTime - lastTimeRef.current >= 1000) {
      const fps = Math.round((frameCountRef.current * 1000) / (currentTime - lastTimeRef.current));
      
      setMetrics(prev => ({
        ...prev,
        fps,
        requestCount: requestCountRef.current
      }));
      
      frameCountRef.current = 0;
      lastTimeRef.current = currentTime;
      requestCountRef.current = 0;
      
      if (onMetricsUpdate) {
        onMetricsUpdate(metrics);
      }
    }
    
    requestAnimationFrame(measureFPS);
  };

  // Monitorar requisições
  const trackRequest = () => {
    requestCountRef.current++;
  };

  useEffect(() => {
    if (!enabled) return;

    // Iniciar medição de FPS
    requestAnimationFrame(measureFPS);

    // Intervalo para métricas adicionais
    intervalRef.current = setInterval(() => {
      // Medir tempo de renderização
      const startTime = performance.now();
      
      // Simular renderização
      setTimeout(() => {
        const renderTime = performance.now() - startTime;
        setMetrics(prev => ({
          ...prev,
          renderTime
        }));
      }, 0);
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, interval, onMetricsUpdate]);

  return {
    metrics,
    trackRequest,
    isLowPerformance: metrics.fps < 30 || metrics.renderTime > 16
  };
}; 