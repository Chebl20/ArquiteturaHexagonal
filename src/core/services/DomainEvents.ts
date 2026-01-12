
import { DomainEvent } from "./DomainEvent";

type Handler = (event: DomainEvent) => void;

export class DomainEvents {
  private static handlers: { [key: string]: Handler[] } = {};

  public static register(handler: Handler, eventClassName: string): void {
    if (!this.handlers[eventClassName]) {
      this.handlers[eventClassName] = [];
    }
    this.handlers[eventClassName].push(handler);
  }

  public static dispatch(event: DomainEvent): void {
    const eventClassName = event.constructor.name;
    const handlers = this.handlers[eventClassName];
    if (handlers) {
      handlers.forEach((handler) => handler(event));
    }
  }
}
