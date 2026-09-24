// src/app/vote/[slug]/loading.tsx

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-xl items-center justify-center px-4">
          <span className="font-serif text-sm font-semibold text-foreground-muted sm:text-base">
            Research Ustad Classes
          </span>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-4 py-10">
        <div className="mx-auto mb-5 h-8 w-40 animate-pulse rounded-full bg-surface-muted" />
        <div className="mx-auto mb-6 h-6 w-3/4 animate-pulse rounded bg-surface-muted" />

        <ul className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <li
              key={i}
              className="h-14 animate-pulse rounded-2xl bg-surface-muted"
            />
          ))}
        </ul>
      </section>
    </main>
  );
}