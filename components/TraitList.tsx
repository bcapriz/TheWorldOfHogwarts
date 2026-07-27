'use client';

import { track } from '@/lib/amplitude';
import { EVENTS } from '@/lib/analytics/events';
import type { Trait } from '@/lib/types';

export default function TraitList({
  houseId,
  traits,
}: {
  houseId: string;
  traits: Trait[];
}) {
  return (
    <ul className="flex flex-wrap gap-2">
      {traits.map((trait) => (
        <li key={trait.id}>
          <button
            onClick={() =>
              track(EVENTS.COMMON_ROOM_VIEWED, {
                house_id: houseId,
                trait_name: trait.name,
              })
            }
            className="rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-800"
          >
            {trait.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
