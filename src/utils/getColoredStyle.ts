import { getRgbColor } from './getRgbColor';
import Color from 'color';
import { colors } from './defaultHaCardStyle';

import type { CalendarItem } from './calendarItem';
import type { CalendarEventTrackerConfig } from '../cards/calendar-event-tracker/calendar-event-tracker-config';

const isColorModesArray = (modes: CalendarEventTrackerConfig['color_mode'] | CalendarEventTrackerConfig['color_mode'][]): modes is CalendarEventTrackerConfig['color_mode'][] =>
  Boolean(modes && Array.isArray(modes));

const calculateContrast = (currentColorString: string, darkMode: boolean, parentElement?: null | HTMLElement): 'text' | 'background' => {
  try {
    const color = currentColorString.startsWith('#') ?
      new Color(currentColorString) :
      new Color(`rgb(${colors[currentColorString]})`);

    if (parentElement) {
      const primaryTextColor = getComputedStyle(parentElement).getPropertyValue('--primary-text-color');
      const primaryBackgroundColor = getComputedStyle(parentElement).getPropertyValue('--primary-background-color');
      const primaryConstrast = color.contrast(new Color(primaryTextColor));

      return primaryConstrast > color.contrast(new Color(primaryBackgroundColor)) ? 'text' : 'background';
    }

    return color.contrast(new Color(darkMode ? 'white' : 'black')) ? 'text' : 'text';
  } catch {
    return 'text';
  }
};

const getColoredStyle = (modes: CalendarEventTrackerConfig['color_mode'] | CalendarEventTrackerConfig['color_mode'][], item: CalendarItem, parentElement?: null | HTMLElement, darkMode = false) => {
  const color = item.color ?? 'disabled';

  const colorModes: CalendarEventTrackerConfig['color_mode'][] = isColorModesArray(modes) ? modes : [ modes ?? 'background' ];

  const style = {};
  const rgbColor = getRgbColor(color);

  const contrast = calculateContrast(color, darkMode, parentElement);

  if (colorModes.includes('icon')) {
    style['--tile-color'] = `rgba(${rgbColor})`;
    style['--icon-color'] = `rgba(${rgbColor})`;
    style['--badge-color'] = `rgba(${rgbColor})`;
    style['--secondary-text-color'] = `var(--primary-text-color)`;

    if (contrast === 'background') {
      style['--primary-text-color'] = `var(--primary-text-color)`;
      style['--secondary-text-color'] = `var(--primary-text-color)`;
    }
  }

  if (colorModes.includes('background')) {
    style['--ha-card-background'] = `rgba(${rgbColor}, 1)`;
    style['--secondary-text-color'] = `var(--primary-text-color)`;

    style['--icon-color'] = `var(--primary-text-color)`;
    style['--tile-color'] = `rgb(var(--rgb-dark-grey))`;

    if (contrast === 'background') {
      style['--primary-text-color'] = `var(--primary-background-color)`;
      style['--secondary-text-color'] = `var(--primary-background-color)`;
    }
  }

  if (colorModes.includes('badge')) {
    style['--icon-primary-color'] = `rgba(${rgbColor})`;
    style['--badge-color'] = `rgba(${rgbColor})`;

    if (contrast === 'background') {
      style['--tile-color'] = `var(--primary-background-color)`;
      style['--primary-text-color'] = `var(--primary-background-color)`;
      style['--secondary-text-color'] = `var(--primary-background-color)`;
    }
  }

  return style;
};

export {
  getColoredStyle
};
