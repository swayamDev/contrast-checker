import { useState, useCallback } from "react";
import { copyToClipboard } from "@/lib/utils";

export function useCopy(duration = 1800) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = useCallback(async (text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(text);
      setTimeout(() => setCopied(null), duration);
    }
  }, [duration]);

  return { copy, copied, isCopied: (text: string) => copied === text };
}
