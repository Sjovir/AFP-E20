import { EventEmitter } from 'events';
import { Service } from 'typedi';

@Service()
export default class CitizenSseService {
  private citizenEvents = new EventEmitter();

  constructor() {
    this.citizenEvents.setMaxListeners(0);
  }

  addListener(citizenUUID: string, listener: (data: string) => void): void {
    this.citizenEvents.on(citizenUUID, listener);
  }

  removeListener(citizenUUID: string, listener: (data: string) => void): void {
    this.citizenEvents.off(citizenUUID, listener);
  }

  emitTotalEvent(citizenUUID: string) {
    this.emitEvent(citizenUUID, {
      event: 'USER_CHANGE',
      data: {
        total: this.citizenEvents.listenerCount(citizenUUID),
      },
    });
  }

  emitEvent(citizenUUID: string, data: Record<string, unknown>) {
    this.citizenEvents.emit(citizenUUID, JSON.stringify(data));
  }
}
