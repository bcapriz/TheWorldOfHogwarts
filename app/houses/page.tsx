import type { Metadata } from 'next';
import { getHouses } from '@/lib/api';
import HouseCard from '@/components/HouseCard';

export const metadata: Metadata = {
  title: 'Houses | The World of Hogwarts',
};

export default async function HousesPage() {
  const houses = await getHouses();

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          The Houses of Hogwarts
        </h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Select a house to learn more about it.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {houses.map((house) => (
          <HouseCard key={house.id} house={house} />
        ))}
      </div>
    </main>
  );
}
