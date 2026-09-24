// src/app/presentation/workshop-one/loading.tsx

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-accent" />
        <p className="text-xs uppercase tracking-[0.18em] text-foreground-subtle">
          Loading presentation
        </p>
      </div>
    </div>
  );
}