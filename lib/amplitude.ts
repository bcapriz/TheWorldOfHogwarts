import * as amplitude from '@amplitude/analytics-browser';
import { Identify } from '@amplitude/analytics-browser';
import type { EventName, EventProperties } from '@/lib/analytics/events';

export function track<T extends EventName>(
  name: T,
  properties: EventProperties[T],
): void {
  amplitude.track(name, properties as Record<string, unknown>);
}

export function identifyUser(userId: string, houseName: string): void {
  amplitude.setUserId(userId);
  const identifyObj = new Identify();
  identifyObj.set('favorite_house', houseName);
  amplitude.identify(identifyObj);
}
