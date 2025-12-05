"use client";

import { useGlobalStore } from "@/app/store/useGlobalStore";

export const useLoading = () => {
  const { setLoading, isLoading, loadingMessage } = useGlobalStore();

  const showLoading = (message?: string) => {
    setLoading(true, message);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  const withLoading = async <T>(promise: Promise<T>, message?: string): Promise<T> => {
    showLoading(message);
    try {
      const result = await promise;
      return result;
    } finally {
      hideLoading();
    }
  };

  return {
    isLoading,
    loadingMessage,
    showLoading,
    hideLoading,
    withLoading,
  };
};
