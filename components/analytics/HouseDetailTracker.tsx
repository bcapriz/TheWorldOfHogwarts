'use client';

import { useEffect } from 'react';
import { track } from '@/lib/amplitude';
import { EVENTS } from '@/lib/analytics/events';

export default function HouseDetailTracker({
  houseId,
  houseName,
}: {
  houseId: string;
  houseName: string;
}) {
  useEffect(() => {
    track(EVENTS.HOUSE_VIEWED, { house_id: houseId, house_name: houseName });
  }, [houseId, houseName]);

  return null;
}
