'use client';

export default function HouseError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Something went wrong
      </h1>
      <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
        We couldn&apos;t load this page. Please try again.
        {error.digest && (
          <span className="ml-1 text-zinc-400 dark:text-zinc-500">
            (ref: {error.digest})
          </span>
        )}
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-zinc-100 dark:text-black"
      >
        Try again
      </button>
    </main>
  );
}
