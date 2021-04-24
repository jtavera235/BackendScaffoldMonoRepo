import {Service} from "typedi";
import EventEmitter from "events";


@Service('event.emitter')
export class CustomEvent {

  private eventEmitter: EventEmitter;

  public constructor() {
    this.eventEmitter = new EventEmitter();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public emit(eventName: string, event: any): void {
    this.eventEmitter.emit(eventName, event);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/explicit-module-boundary-types
  public on(event: string, listener: any): void {
    this.eventEmitter.on(event, listener);
  }

}