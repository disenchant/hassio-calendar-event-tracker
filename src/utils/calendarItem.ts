import type { CalendarEvent } from './calendarEvents';

interface CalendarItem extends CalendarEvent {
  label: string;
  color?: string;
  icon?: string;
  type: `custom-${number}` | 'type1' | 'type2' | 'type3' | 'type4' | 'others';
  picture?: string;
  idx?: number;
  max_items?: number;
  task_interval?: number;
  uid?: string;
  summary?: string;
  entity?: string;
  status?: string;
}

export type {
  CalendarItem
};
