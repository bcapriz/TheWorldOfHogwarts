'use client';

import Link from 'next/link';
import { track } from '@/lib/amplitude';
import { EVENTS } from '@/lib/analytics/events';
import { parseHouseColours } from '@/lib/houseColours';
import type { House } from '@/lib/types';

export default function HouseCard({ house }: { house: House }) {
  const [primary, secondary] = parseHouseColours(house.houseColours);

  return (
    <Link
      href={`/houses/${house.id}`}
      onClick={() =>
        track(EVENTS.HOUSE_CARD_CLICKED, {
          house_name: house.name,
          source: 'houses_list',
        })
      }
      className="block overflow-hidden rounded-xl border border-zinc-200 transition-shadow hover:shadow-lg dark:border-zinc-700"
    >
      <div
        className="h-1.5 w-full"
        style={{ background: `linear-gradient(90deg, ${primary}, ${secondary})` }}
      />
      <div className="p-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {house.name}
        </h2>
        <p className="mt-1 flex items-center gap-1.5 text-xs font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}
          />
          {house.houseColours}
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <div>
            <dt className="font-medium text-zinc-900 dark:text-zinc-200">Animal</dt>
            <dd>{house.animal}</dd>
          </div>
          <div>
            <dt className="font-medium text-zinc-900 dark:text-zinc-200">Element</dt>
            <dd>{house.element}</dd>
          </div>
          <div>
            <dt className="font-medium text-zinc-900 dark:text-zinc-200">Founder</dt>
            <dd>{house.founder}</dd>
          </div>
          <div>
            <dt className="font-medium text-zinc-900 dark:text-zinc-200">Ghost</dt>
            <dd>{house.ghost}</dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}
