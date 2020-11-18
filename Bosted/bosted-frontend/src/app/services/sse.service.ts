import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  readonly BASE_URL: string = 'http://localhost:7100/sse';

  constructor(private zone: NgZone) {}

  public getCitizenEvents(citizenid: string): Observable<any> {
    return this.getServerSentEvents(`${this.BASE_URL}/citizens/${citizenid}`);
  }

  private getServerSentEvents(url: string): Observable<any> {
    return new Observable((observer) => {
      const eventSource = this.getEventSource(url);

      eventSource.onmessage = (event) => {
        this.zone.run(() => {
          observer.next(event);
        });
      };

      eventSource.onerror = (error) => {
        this.zone.run(() => {
          observer.error(error);
        });
      };
    });
  }

  private getEventSource(url: string) {
    return new EventSource(url);
  }
}
