"use client"
import { useState, useEffect } from "react";

export interface UseAsyncResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  reload: () => void;
}

export const useAsync = <T>(promise: Promise<T>, dependencies: any[] = []): UseAsyncResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [reloading, setRealoding] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const execute = async () => {
      try {
        const result = await promise;
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("An unknown error occurred"));
          setLoading(false);
        }
      }
    };

    execute();
    return () => {
      isMounted = false;
    };
  }, [...dependencies, reloading]);

  return { data, isLoading, error, reload: () => setRealoding(p => !p) };
}


type ComponentPromise = (props: any) => React.ReactNode
type onError = (message: string) => React.ReactNode;

export const withAsync = (Component: ComponentPromise, fallback?: React.ReactNode, onError?: onError) => {
  return function WrappedComponent<P>(props: P): React.ReactNode {
    const { data, isLoading, error } = useAsync<React.ReactNode>((Component as any)(props), [props]);
    if (fallback && isLoading) return fallback;
    if (onError && error) return onError(error.message);
    return data
  };
}