// src/components/slides/ChartSlide.tsx
'use client';

import { motion } from 'framer-motion';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ChartSlide as ChartSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';

interface Props {
  slide: ChartSlideType;
}

/* Consistent palette — teal & friends */
const PALETTE = [
  '#0f766e', // teal-700
  '#14b8a6', // teal-500
  '#0891b2', // cyan-600
  '#6366f1', // indigo-500
  '#d97706', // amber-600
  '#be123c', // rose-700
];

/* Shared tooltip style */
const tooltipStyle = {
  backgroundColor: 'rgb(var(--surface))',
  border: '1px solid rgb(var(--border))',
  borderRadius: '0.5rem',
  fontSize: '0.75rem',
  color: 'rgb(var(--foreground))',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
} as const;

export default function ChartSlide({ slide }: Props) {
  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading eyebrow="Data" subtitle={slide.subtitle}>
          {slide.title}
        </SlideHeading>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-10 h-[340px] w-full rounded-2xl border border-border bg-surface p-4 shadow-sm sm:h-[380px] sm:p-6"
        >
          <ResponsiveContainer width="100%" height="100%">
            {renderChart(slide)}
          </ResponsiveContainer>
        </motion.div>

        {slide.footnote && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-6 max-w-2xl text-sm italic leading-relaxed text-foreground-subtle"
          >
            {slide.footnote}
          </motion.p>
        )}
      </div>
    </SlideShell>
  );
}

/* ------------------------------------------------------------------ */
/* Chart renderers                                                     */
/* ------------------------------------------------------------------ */

function renderChart(slide: ChartSlideType) {
  switch (slide.chartType) {
    case 'bar':
      return (
        <BarChart
          data={slide.data}
          margin={{ top: 10, right: 16, left: -12, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgb(var(--border))"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            stroke="rgb(var(--foreground-subtle))"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: 'rgb(var(--border))' }}
          />
          <YAxis
            stroke="rgb(var(--foreground-subtle))"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: 'rgb(var(--border))' }}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            cursor={{ fill: 'rgb(var(--surface-muted))' }}
            formatter={(value) => [value ?? 0, slide.unit ?? 'value']}          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {slide.data.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Bar>
        </BarChart>
      );

    case 'line':
      return (
        <LineChart
          data={slide.data}
          margin={{ top: 10, right: 16, left: -12, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgb(var(--border))"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            stroke="rgb(var(--foreground-subtle))"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: 'rgb(var(--border))' }}
          />
          <YAxis
            stroke="rgb(var(--foreground-subtle))"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: 'rgb(var(--border))' }}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value) => [value ?? 0, slide.unit ?? 'value']}          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={PALETTE[0]}
            strokeWidth={3}
            dot={{ r: 5, fill: PALETTE[0] }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      );

    case 'pie':
    default:
      return (
        <PieChart>
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value) => [
            `${value ?? 0}%`,
            slide.unit ?? 'value',
            ]}

          />
          <Pie
            data={slide.data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="72%"
            innerRadius="40%"
            paddingAngle={2}
            label={(entry: any) =>
              `${entry.name}  ${entry.value}${slide.unit ?? ''}`
            }
            labelLine={{ stroke: 'rgb(var(--border))' }}
          >
            {slide.data.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Pie>
        </PieChart>
      );
  }
}