// src/components/slides/_shared/PollLiveQr.tsx
'use client';

import { QRCodeSVG } from 'qrcode.react';
import { FiLink } from 'react-icons/fi';

interface Props {
  url: string;
  size?: number;
}

export default function PollLiveQr({ url, size = 200 }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
        <QRCodeSVG
          value={url}
          size={size}
          level="M"
          bgColor="#ffffff"
          fgColor="#0f172a"
          marginSize={0}
        />
      </div>

      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-foreground-muted transition-colors hover:border-accent hover:text-accent"
      >
        <FiLink className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate">{stripProtocol(url)}</span>
      </a>
    </div>
  );
}

function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}