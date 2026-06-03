export default function Loading() {
  return (
    <div
      className="min-h-screen bg-surface-dim flex items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      <span className="font-headline italic text-5xl animate-pulse select-none" aria-hidden="true">
        NL<span className="text-primary">.</span>
      </span>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
