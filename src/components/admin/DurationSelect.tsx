// src/components/admin/DurationSelect.tsx
'use client';

interface Props {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const PRESETS = [
  { label: '30 seconds', value: 30 },
  { label: '60 seconds', value: 60 },
  { label: '2 minutes', value: 120 },
  { label: '5 minutes', value: 300 },
  { label: '10 minutes', value: 600 },
];

export default function DurationSelect({ value, onChange, disabled }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      disabled={disabled}
      className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-foreground outline-none transition-colors focus:border-accent disabled:opacity-50"
    >
      {PRESETS.map((p) => (
        <option key={p.value} value={p.value}>
          {p.label}
        </option>
      ))}
    </select>
  );
}