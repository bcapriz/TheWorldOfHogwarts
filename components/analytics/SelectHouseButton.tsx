'use client';

import { useState, useEffect } from 'react';
import { track, identifyUser } from '@/lib/amplitude';
import { EVENTS } from '@/lib/analytics/events';

function getUserId(): string {
  const stored = localStorage.getItem('hogwarts_user_id');
  if (stored) return stored;
  const id = crypto.randomUUID();
  localStorage.setItem('hogwarts_user_id', id);
  return id;
}

export default function SelectHouseButton({ houseName }: { houseName: string }) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(localStorage.getItem('hogwarts_favorite_house') === houseName);
  }, [houseName]);

  function handleSelect() {
    identifyUser(getUserId(), houseName);
    track(EVENTS.HOUSE_SELECTED, { house_name: houseName });
    localStorage.setItem('hogwarts_favorite_house', houseName);
    setSelected(true);
  }

  if (selected) {
    return (
      <p className="text-sm font-medium text-green-700 dark:text-green-400">
        ✓ This is your house
      </p>
    );
  }

  return (
    <button
      onClick={handleSelect}
      className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300"
    >
      Esta es mi casa
    </button>
  );
}
