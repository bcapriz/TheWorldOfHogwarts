import Link from 'next/link';

export default function HouseNotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        House not found
      </h1>
      <p className="mt-3 text-zinc-500 dark:text-zinc-400">
        That house doesn&apos;t exist in the wizarding world.
      </p>
      <Link
        href="/houses"
        className="mt-6 inline-block text-sm font-medium text-zinc-900 underline dark:text-zinc-100"
      >
        Back to all houses
      </Link>
    </main>
  );
}
