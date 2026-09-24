// src/components/viewer/SlideCounter.tsx

interface Props {
  current: number;
  total: number;
}

export default function SlideCounter({ current, total }: Props) {
  return (
    <span className="select-none font-mono text-xs font-medium tracking-wider text-foreground-muted">
      <span className="text-foreground">{current}</span>
      <span className="mx-1 text-foreground-subtle">/</span>
      <span>{total}</span>
    </span>
  );
}