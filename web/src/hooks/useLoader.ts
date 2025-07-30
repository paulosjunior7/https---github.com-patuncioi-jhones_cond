import { useState, useCallback } from 'react';

interface LoaderState {
  show: boolean;
  message: string;
  variant: 'default' | 'pulse' | 'spinner' | 'dots';
}

const useLoader = () => {
  const [loaderState, setLoaderState] = useState<LoaderState>({
    show: false,
    message: 'Carregando...',
    variant: 'default'
  });

  const showLoader = useCallback((message?: string, variant?: LoaderState['variant']) => {
    setLoaderState({
      show: true,
      message: message || 'Carregando...',
      variant: variant || 'default'
    });
  }, []);

  const hideLoader = useCallback(() => {
    setLoaderState(prev => ({
      ...prev,
      show: false
    }));
  }, []);

  const updateMessage = useCallback((message: string) => {
    setLoaderState(prev => ({
      ...prev,
      message
    }));
  }, []);

  const updateVariant = useCallback((variant: LoaderState['variant']) => {
    setLoaderState(prev => ({
      ...prev,
      variant
    }));
  }, []);

  return {
    loaderState,
    showLoader,
    hideLoader,
    updateMessage,
    updateVariant
  };
};

export default useLoader; 