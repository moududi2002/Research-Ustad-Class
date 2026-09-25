// src/components/slides/ClosingSlide.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowLeft,FiDownload, FiGlobe, FiMail } from 'react-icons/fi';
import type { ClosingSlide as ClosingSlideType } from '@/types/slide';

interface Props {
  slide: ClosingSlideType;
}

const [showPdfModal, setShowPdfModal] = useState(false);
const [accessKey, setAccessKey] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

const handleDownloadPdf = async () => {
  if (!accessKey.trim()) {
    setError('Please enter the access key.');
    return;
  }

  setLoading(true);
  setError('');

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/pdf/workshop-one`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessKey: accessKey.trim(),
        }),
      },
    );

    if (!response.ok) {
      if (response.status === 401) {
        setError('Invalid access key.');
      } else {
        setError('Failed to generate PDF.');
      }

      return;
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;
    link.download = 'Research-Ustad-Workshop.pdf';

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

    setShowPdfModal(false);
    setAccessKey('');
  } catch {
    setError(
      'Unable to connect to the server. Please try again.',
    );
  } finally {
    setLoading(false);
  }
};

export default function ClosingSlide({ slide }: Props) {
  return (
    <div className="relative flex min-h-full w-full items-center justify-center overflow-hidden">
      {/* subtle background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-accent-soft/60 via-background to-background"
      />

      <div className="mx-auto w-full max-w-4xl px-6 py-16 text-center sm:px-10 sm:py-20">
        {/* Logo */}
        {slide.logo && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-8 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
          >
            <Image
              src={slide.logo}
              alt="Research Ustad Classes"
              width={48}
              height={48}
              className="object-contain"
            />
          </motion.div>
        )}

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs font-semibold uppercase tracking-[0.24em] text-accent"
        >
          {slide.title}
        </motion.p>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-8 max-w-3xl"
        >
          <p className="font-serif text-2xl font-medium italic leading-snug text-foreground sm:text-3xl lg:text-4xl">
            “{slide.quote}”
          </p>

          {slide.quoteAuthor && (
            <footer className="mt-5 text-sm uppercase tracking-[0.16em] text-foreground-subtle">
              — {slide.quoteAuthor}
            </footer>
          )}
        </motion.blockquote>

        {/* Contact + QR row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.45 }}
          className="mt-14 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-12"
        >
          <div className="flex flex-col items-center gap-3 text-sm text-foreground-muted sm:items-start">
            {slide.contact && (
              <a
                href={`mailto:${slide.contact}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-accent"
              >
                <FiMail className="h-4 w-4 text-accent" />
                {slide.contact}
              </a>
            )}
            {slide.website && (
              <a
                href={`https://${slide.website.replace(/^https?:\/\//, '')}`}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 transition-colors hover:text-accent"
              >
                <FiGlobe className="h-4 w-4 text-accent" />
                {slide.website}
              </a>
            )}
          </div>

         {/*
          {slide.qrImage && (
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface p-2">
                <Image
                  src={slide.qrImage}
                  alt="QR code"
                  width={112}
                  height={112}
                  className="object-contain"
                />
              </div>
              <span className="text-xs uppercase tracking-[0.14em] text-foreground-subtle">
                Scan to connect
              </span>
            </div>
          )}
            */}
        </motion.div>

        { /* Get Pfdf */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-8"
        >
          <button
            type="button"
            onClick={() => {
              setShowPdfModal(true);
              setError('');
            }}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90"
          >
            <FiDownload className="h-4 w-4" />
            Get PDF
          </button>
          </motion.div>

          {/* Back to home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-14"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground-muted transition-all hover:border-accent hover:text-accent"
            >
              <FiArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </motion.div>
        </div>


        {showPdfModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div
            className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-foreground">
                Get Presentation PDF
              </h2>

              <p className="mt-2 text-sm text-foreground-muted">
                Enter the access key to generate and download
                the complete presentation PDF.
              </p>
            </div>

            <input
              type="password"
              value={accessKey}
              onChange={(e) => {
                setAccessKey(e.target.value);
                setError('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !loading) {
                  void handleDownloadPdf();
                }
              }}
              placeholder="Enter access key"
              autoFocus
              disabled={loading}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            />

            {error && (
              <p className="mt-2 text-sm text-red-500">
                {error}
              </p>
            )}

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowPdfModal(false);
                  setAccessKey('');
                  setError('');
                }}
                disabled={loading}
                className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground-muted transition hover:bg-background disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => void handleDownloadPdf()}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiDownload className="h-4 w-4" />

                {loading
                  ? 'Generating PDF...'
                  : 'Generate PDF'}
              </button>
            </div>
          </div>
        </div>
      )} 


    </div>
  );
}