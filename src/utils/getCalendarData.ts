import { eventsToItems } from './eventsToItems';
import { findActiveEvents } from './findActiveEvents';
import { normaliseEvents } from './normaliseEvents';
import { filterDuplicatedItems } from './filterDuplicatedItems';

import type { Debugger } from './debugger';
import type { HomeAssistant } from './ha';
import type { RawCalendarEvent } from './calendarEvents';
import type { CalendarEventTrackerConfig } from '../cards/calendar-event-tracker/calendar-event-tracker-config';

const fetchData = async (
  hass: HomeAssistant,
  entity: string,
  { start, end }: { start: string; end: string }
) => {
  if (entity.startsWith('todo.')) {
    try {
      const response = await hass.callWS<{ items: any[] }>({
        type: 'todo/item/list',
        entity_id: entity
      });

      if (response.items) {
        return response.items.map(item => {
          let startDate = new Date();
          let endDate = new Date();

          if (item.due) {
            startDate = new Date(item.due);
            endDate = new Date(item.due);
          }

          return {
            summary: item.summary,
            uid: item.uid,
            status: item.status,
            entity,
            start: {
              dateTime: startDate.toISOString(),
              date: item.due ? startDate.toISOString().split('T')[0] : undefined
            },
            end: {
              dateTime: endDate.toISOString(),
              date: item.due ? endDate.toISOString().split('T')[0] : undefined
            }
          } as unknown as RawCalendarEvent;
        });
      }
    } catch {
      return [];
    }

    return [];
  }

  const uri = `calendars/${entity}?start=${start}&end=${end}`;

  return await hass.callApi<RawCalendarEvent[]>('GET', uri).
    then(data => data.map(item => ({
      ...item,
      entity
    })));
};

const getCalendarData = async (
  hass: HomeAssistant,
  calendars: string[],
  { start, end, dropAfter }: { start: string; end: string; dropAfter: boolean },
  debuggerInstance: Debugger,
  config: CalendarEventTrackerConfig,
  timezoneOffset: string
) => {
  const rawCalendarEvents: RawCalendarEvent[] = [];

  for await (const calendar of calendars) {
    rawCalendarEvents.push(...await fetchData(hass, calendar, { start, end }));
  }

  debuggerInstance.reset();
  debuggerInstance.log(`timezone`, timezoneOffset);
  debuggerInstance.log(`calendar data`, rawCalendarEvents);

  const normalisedEvents = normaliseEvents(rawCalendarEvents);

  normalisedEvents.sort((evtA, evtB) => evtA.date.start.getTime() - evtB.date.start.getTime());

  const now = new Date();

  debuggerInstance.log(`normaliseEvents`, normalisedEvents);
  debuggerInstance.log(`dropAfter`, dropAfter);
  debuggerInstance.log(`now`, now);

  if (config.location) {
    debuggerInstance.log(`location filtering`, config.location);
  }

  const activeEvents = findActiveEvents(normalisedEvents, {
    config: {
      pattern: config.pattern!,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      filter_events: config.filter_events,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      only_all_day_events: config.only_all_day_events,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      show_completed: config.show_completed
    },
    dropAfter,
    now,
    location: config.location,
    filterFutureEventsDay: end
  });

  debuggerInstance.log(`activeElements`, activeEvents);

  const eventItems = eventsToItems(activeEvents, {
    pattern: config.pattern!,
    useSummary: Boolean(config.use_summary)
  });

  debuggerInstance.log(`eventsToItems`, eventItems);

  const finalItems = !config.event_grouping ?
    eventItems :
    filterDuplicatedItems(eventItems);

  return finalItems.slice(0, config.max_items ?? 5);
};

export {
  getCalendarData
};
