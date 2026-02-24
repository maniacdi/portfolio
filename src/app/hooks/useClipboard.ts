import { useCallback,useState } from "react";

export const useClipboard = (timeout = 2000) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), timeout);
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    },
    [timeout]
  );

  return { copied, copyToClipboard };
};
