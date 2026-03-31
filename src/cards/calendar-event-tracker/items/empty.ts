import { html, nothing, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CALENDAR_EVENT_TRACKER_NAME } from '../const';
import { BaseItemElement } from './BaseItemElement';
import setupCustomlocalize from '../../../localize';
import { hasEntities } from '../../../utils/hasEntities';
import { defaultHaCardStyle } from '../../../utils/defaultHaCardStyle';

@customElement(`${CALENDAR_EVENT_TRACKER_NAME}-item-empty`)
class ItemCard extends BaseItemElement {
  public render () {
    if (!this.hass || !this.config) {
      return nothing;
    }

    const customLocalize = setupCustomlocalize(this.hass);

    if (!hasEntities(this.config.entities)) {
      return html`
      <ha-alert alert-type="error" .title="CalendarEventTracker">
        <b>${customLocalize('card.not_found.title')}</b>
        <div>${customLocalize('card.not_found.description')}</div>
      </ha-alert>
    `;
    }

    if (this.config.show_empty) {
      return html`
        <ha-card class="empty-state">
          <ha-icon icon="mdi:check-all"></ha-icon>
          <div>${customLocalize('card.empty.title' as any) || 'All caught up!'}</div>
        </ha-card>
      `;
    }

    return html`
      <ha-alert alert-type="warning" .title="CalendarEventTracker">
        <div><b>CalendarEventTracker</b></div>
        <div>${customLocalize('card.empty.description')}</div>
      </ha-alert>
    `;
  }

  public static get styles () {
    return [
      defaultHaCardStyle,
      css`
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          text-align: center;
          color: var(--secondary-text-color);
          background: transparent;
          border: 2px dashed var(--divider-color, #e0e0e0);
          box-shadow: none;
        }
        .empty-state ha-icon {
          --mdc-icon-size: 48px;
          color: var(--primary-color);
          margin-bottom: 8px;
        }
      `
    ];
  }
}

export {
  ItemCard
};
