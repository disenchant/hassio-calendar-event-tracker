/* eslint-disable unicorn/filename-case */

import type { HomeAssistant } from '../../../utils/ha';
import type { CalendarEventTrackerConfig } from '../calendar-event-tracker-config';
import type { CalendarItem } from '../../../utils/calendarItem';

interface BaseContainerElement extends HTMLElement {
  setConfig: (config?: CalendarEventTrackerConfig) => void;

  setItems: (items?: CalendarItem[]) => void;

  setHass: (hass?: HomeAssistant) => void;
}

export {
  BaseContainerElement
};
