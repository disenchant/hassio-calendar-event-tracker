/* eslint-disable unicorn/filename-case */
import { LitElement, html, nothing } from 'lit';
import { state } from 'lit/decorators.js';
import { getPicture } from '../../../utils/getPicture';
import { fireEvent } from '../../../utils/fireEvent';

import type { CalendarEventTrackerConfig } from '../calendar-event-tracker-config';
import type { CalendarItem } from '../../../utils/calendarItem';
import type { HomeAssistant } from '../../../utils/ha';

class BaseItemElement<T = {}> extends LitElement {
  @state() protected readonly item?: CalendarItem & T;

  @state() protected readonly hass?: HomeAssistant;

  @state() protected readonly config?: CalendarEventTrackerConfig;

  @state() protected isUpdating = false;

  @state() protected pendingCompletion = false;

  private completionTimeout?: ReturnType<typeof setTimeout>;

  protected withBackground = false;

  protected getPictureUrl () {
    return getPicture(this.item!.picture, this.hass!);
  }

  protected async handleTaskClick(e: Event) {
    if (!this.hass || !this.item || !this.item.content.entity?.startsWith('todo.')) {
      return;
    }

    e.stopPropagation();
    e.preventDefault();

    const { entity, uid, summary, status } = this.item.content;
    const task_interval = this.item.task_interval;

    if (status === 'completed' || this.isUpdating) {
      return;
    }

    if (this.pendingCompletion) {
      // Cancel the completion
      if (this.completionTimeout) {
        clearTimeout(this.completionTimeout);
        this.completionTimeout = undefined;
      }
      this.pendingCompletion = false;
      return;
    }

    // Start 5-second grace period
    this.pendingCompletion = true;

    this.completionTimeout = setTimeout(async () => {
      this.pendingCompletion = false;
      this.isUpdating = true;

      try {
        await this.hass!.callService('todo', 'update_item', {
          item: uid,
          status: 'completed'
        }, { entity_id: entity });

        if (task_interval && task_interval > 0) {
          const newDueDate = new Date();
          newDueDate.setDate(newDueDate.getDate() + task_interval);
          const dueString = newDueDate.toISOString().split('T')[0];

          await this.hass!.callService('todo', 'add_item', {
            item: summary,
            due_date: dueString
          }, { entity_id: entity });
        }

        fireEvent(this, 'calendar-event-tracker-update');
      } finally {
        this.isUpdating = false;
      }
    }, 5000);
  }

  // eslint-disable-next-line class-methods-use-this
  protected renderPicture (pictureUrl: string) {
    if (this.isUpdating) {
      return html`
        <div style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;">
          <ha-icon icon="mdi:loading" class="spin" style="width: 24px; height: 24px; color: var(--primary-color)"></ha-icon>
        </div>`;
    }
    
    if (this.pendingCompletion) {
      return html`
      <div class="hui-image-wrapper" @click=${this.handleTaskClick} style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer; width: 48px; height: 48px;">
        <hui-image
          .image=${pictureUrl}
          .hass=${this.hass}
          style="opacity: 0.3; width: 24px; height: 24px;"
        ></hui-image>
        <ha-icon icon="mdi:undo-variant" style="position: absolute; color: var(--primary-text-color); width: 24px; height: 24px;"></ha-icon>
      </div>`;
    }

    return html`
    <div class="hui-image-wrapper" @click=${this.handleTaskClick} style="display: flex; align-items: center; justify-content: center; cursor: ${this.item?.content.entity?.startsWith('todo.') ? 'pointer' : 'default'}; width: 48px; height: 48px;">
      <hui-image
        .image=${pictureUrl}
        .hass=${this.hass}
        style="width: 24px; height: 24px;"
      ></hui-image>
    </div>`;
  }

  protected renderIcon () {
    const isTodo = this.item?.content.entity?.startsWith('todo.');
    
    if (this.isUpdating) {
      return html`
        <div style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;">
          <ha-tile-icon>
            <ha-icon icon="mdi:loading" class="spin" style="color: var(--primary-color)"></ha-icon>
          </ha-tile-icon>
        </div>`;
    }

    const badgeIcon = this.pendingCompletion ? 'mdi:undo-variant' : 
                      this.item?.content.status === 'completed' ? 'mdi:check-circle' : 'mdi:circle-outline';

    return html`
      <div class="hui-image-wrapper" @click=${this.handleTaskClick} style="cursor: ${isTodo ? 'pointer' : 'default'}; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; opacity: ${this.pendingCompletion ? 0.6 : 1}">
        <ha-tile-icon>
          <ha-state-icon
            slot="icon"
            .icon=${this.item?.icon}
            .hass=${this.hass}
          ></ha-state-icon>
          ${isTodo ? html`<ha-tile-badge slot="badge" .icon=${badgeIcon}></ha-tile-badge>` : nothing}
        </ha-tile-icon>
      </div>`;
  }
}

export {
  BaseItemElement
};
