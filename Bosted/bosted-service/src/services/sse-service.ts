import { EventEmitter } from 'events';
import { Service } from 'typedi';

@Service()
export default class SseService {
  citizenEvents = new EventEmitter();

  constructor() {
    this.citizenEvents.setMaxListeners(0);

    const _interval = setInterval(() => {
      this.emitCitizenEvent('update', new Date());
    }, 5000);
  }

  addCitizenListener(listener) {
    this.citizenEvents.on('update', listener);
    console.log(`Added Listener:${listener}`);
    
  }

  emitCitizenEvent(event: string, data) {
    console.log(`Emit: ${event}\nData: ${JSON.stringify(data)}`);
    
    this.citizenEvents.emit(event, JSON.stringify(data));
  }
}
