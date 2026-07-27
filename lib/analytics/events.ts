export const EVENTS = {
  HOUSE_VIEWED: 'House Viewed',
  HOUSE_CARD_CLICKED: 'House Card Clicked',
  HOUSE_SELECTED: 'House Selected',
  COMMON_ROOM_VIEWED: 'Common Room Viewed',
  NAVIGATION_LINK_CLICKED: 'Navigation Link Clicked',
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

export interface EventProperties {
  'House Viewed': { house_id: string; house_name: string };
  'House Card Clicked': { house_name: string; source: string };
  'House Selected': { house_name: string };
  'Common Room Viewed': { house_id: string; trait_name: string };
  'Navigation Link Clicked': { from_page: string; to_page: string };
}
