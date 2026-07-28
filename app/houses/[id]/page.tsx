import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getHouses, getHouseById, HouseNotFoundError } from '@/lib/api';
import HouseDetailTracker from '@/components/analytics/HouseDetailTracker';
import SelectHouseButton from '@/components/analytics/SelectHouseButton';
import TraitList from '@/components/TraitList';

export async function generateStaticParams() {
  const houses = await getHouses();
  return houses.map((h) => ({ id: h.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const house = await getHouseById(id);
    return { title: `${house.name} | The World of Hogwarts` };
  } catch {
    return { title: 'House | The World of Hogwarts' };
  }
}

export default async function HousePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let house;
  try {
    house = await getHouseById(id);
  } catch (err) {
    if (err instanceof HouseNotFoundError) notFound();
    console.error(`Failed to load house ${id}:`, err);
    throw new Error('We couldn\'t load this house. Please try again later.');
  }

  return (
    <>
      <HouseDetailTracker houseId={house.id} houseName={house.name} />

      <main className="mx-auto max-w-2xl px-6 py-16">
        <nav className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
          <a
            href="/houses"
            className="hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            ← All houses
          </a>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {house.name}
          </h1>
          <p className="mt-1 text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {house.houseColours}
          </p>
        </header>

        <dl className="mb-10 grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
          {[
            ['Founder', house.founder],
            ['Animal', house.animal],
            ['Element', house.element],
            ['Ghost', house.ghost],
            ['Common Room', house.commonRoom],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="font-medium text-zinc-900 dark:text-zinc-200">
                {label}
              </dt>
              <dd className="text-zinc-600 dark:text-zinc-400">{value}</dd>
            </div>
          ))}
        </dl>

        {house.traits.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Traits
            </h2>
            <TraitList houseId={house.id} traits={house.traits} />
            <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
              Click a trait to explore the common room.
            </p>
          </section>
        )}

        {house.heads.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Heads of House
            </h2>
            <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
              {house.heads.map((head) => (
                <li key={head.id}>
                  {head.firstName} {head.lastName}
                </li>
              ))}
            </ul>
          </section>
        )}

        <SelectHouseButton houseName={house.name} />
      </main>
    </>
  );
}
