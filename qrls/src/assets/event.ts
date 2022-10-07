interface QEvent {
  dispatch(): void;
}

export type QNotificationAction = {
  action: (() => Promise<void>) | (() => void);
  text: string;
};

export class QChange implements QEvent {
  constructor(public qName: string) {}

  dispatch(): void {
    dispatchEvent("change", this);
  }
}

export class QNotification implements QEvent {
  constructor(public text: string, public action?: QNotificationAction) {}

  dispatch(): void {
    dispatchEvent("notification", this);
  }
}

export type EventHandler<T extends QEvent> = (event: T) => Promise<void> | void;

type EventMap = {
  notification: QNotification;
  change: QChange;
};

let eventHandlers: Record<keyof EventMap, EventHandler<any>[]> = {
  notification: [],
  change: [],
};

export const addEventListener = <T extends keyof EventMap>(
  name: T,
  handler: EventHandler<EventMap[T]>
) => {
  eventHandlers[name].push(handler);
};

const dispatchEvent = <T extends keyof EventMap>(
  name: T,
  detail: EventMap[T]
) => {
  eventHandlers[name].forEach((handler) => handler(detail));
};
