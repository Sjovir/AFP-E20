import { EventEmitter } from 'events';
import { Service } from 'typedi';

@Service()
export default class CitizenSseService {
  private citizenViewEvents = new EventEmitter();
  private citizenEditEvents = new EventEmitter();

  constructor() {
    this.citizenEditEvents.setMaxListeners(0);
  }

  addViewListener(citizenUUID: string, listener: (data: string) => void): void {
    this.citizenViewEvents.on(citizenUUID, listener);
  }

  removeViewListener(citizenUUID: string, listener: (data: string) => void): void {
    this.citizenViewEvents.off(citizenUUID, listener);
  }

  addEditListener(citizenUUID: string, listener: (data: string) => void): void {
    this.citizenEditEvents.on(citizenUUID, listener);
  }

  removeEditListener(citizenUUID: string, listener: (data: string) => void): void {
    this.citizenEditEvents.off(citizenUUID, listener);
  }

  emitEditTotalEvent(citizenUUID: string) {
    this.emitEditEvent(citizenUUID, {
      event: 'USER_CHANGE',
      data: {
        total: this.citizenEditEvents.listenerCount(citizenUUID),
      },
    });
  }

  emitViewEvent(citizenUUID: string, data: Record<string, unknown>) {
    this.citizenViewEvents.emit(citizenUUID, JSON.stringify(data));
  }

  emitEditEvent(citizenUUID: string, data: Record<string, unknown>) {
    this.citizenEditEvents.emit(citizenUUID, JSON.stringify(data));
  }
}
