import { useEffect, useState } from 'react';

/**
 * Hook simples para devolver um valor somente após um período sem mudanças.
 * Equivalente ao uso manual de setTimeout + clearTimeout (inspirado em debounce comum em Angular pipes / funções utilitárias).
 * @param value Valor de entrada (string ou qualquer tipo comparável)
 * @param delay Delay em ms (default 300)
 */
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
