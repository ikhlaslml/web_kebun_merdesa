import { useEffect, useMemo, useState } from "react";
import { ORIGIN } from "../api";

type SmartImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  fallbackSrc?: string;
  src?: string | null;
};

function toHttpsWhenNeeded(url: string) {
  if (typeof window === "undefined") return url;
  if (window.location.protocol !== "https:") return url;
  return url.startsWith("http://") ? `https://${url.slice("http://".length)}` : url;
}

function resolveMediaUrl(input?: string | null) {
  const raw = (input || "").trim();
  if (!raw) return "";

  if (
    raw.startsWith("https://") ||
    raw.startsWith("http://") ||
    raw.startsWith("//") ||
    raw.startsWith("/") ||
    raw.startsWith("blob:") ||
    raw.startsWith("data:")
  ) {
    return toHttpsWhenNeeded(raw);
  }

  const origin = toHttpsWhenNeeded(ORIGIN);
  if (raw.startsWith("uploads/")) return `${origin}/storage/${raw}`;
  if (raw.startsWith("storage/")) return `${origin}/${raw}`;
  return `${origin}/storage/${raw}`;
}

export default function SmartImage({ src, fallbackSrc, alt, ...rest }: SmartImageProps) {
  const resolvedSrc = useMemo(() => resolveMediaUrl(src), [src]);
  const resolvedFallback = useMemo(() => resolveMediaUrl(fallbackSrc), [fallbackSrc]);
  const [currentSrc, setCurrentSrc] = useState(resolvedSrc || resolvedFallback);

  useEffect(() => {
    setCurrentSrc(resolvedSrc || resolvedFallback);
  }, [resolvedSrc, resolvedFallback]);

  return (
    <img
      {...rest}
      src={currentSrc || resolvedFallback}
      alt={alt}
      onError={() => {
        if (resolvedFallback && currentSrc !== resolvedFallback) {
          setCurrentSrc(resolvedFallback);
        }
      }}
    />
  );
}
