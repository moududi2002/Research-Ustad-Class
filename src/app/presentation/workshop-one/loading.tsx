// src/app/presentation/workshop-one/loading.tsx

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col bg-background">
      {/* top progress skeleton */}
      <div className="h-0.5 w-full bg-border/60">
        <div className="h-full w-1/4 animate-pulse bg-accent/70" />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span
            aria-hidden
            className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent"
          />
          <p className="text-xs uppercase tracking-[0.18em] text-foreground-subtle">
            Loading presentation
          </p>
        </div>
      </div>

      <div className="pb-6">
        <div className="mx-auto h-10 w-64 animate-pulse rounded-full border border-border bg-surface" />
      </div>
    </div>
  );
}