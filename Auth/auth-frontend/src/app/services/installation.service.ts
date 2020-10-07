import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Installation } from '../models/installation.model';
import { JavaWebToken } from '../models/java-web-token.model';

@Injectable({
  providedIn: 'root',
})
export class InstallationService {
  readonly BASE_URL: string = 'http://localhost:7000/api/installations';

  constructor(private http: HttpClient) {}

  public getInstallationsForUser(userId: string): Observable<Installation[]> {
    const installations: Installation[] = [
      { id: '1', name: 'Odense', address: 'OdenseVej 105, 5230 Odense M' },
      { id: '2', name: 'Århus', address: 'Århusvej 507, 8000 Århus C' },
      {
        id: '3',
        name: 'Køb En Havn',
        address: 'Fjernvej 101, 1000 København V',
      },
    ];

    return of(installations);
  }

  public selectInstallation(
    installationId: string,
    userId: string
  ): Observable<JavaWebToken> {
    const jwt: JavaWebToken = {
      accessToken: 'aLongString',
      refreshToken: 'aVeryLongString',
    };

    return of(jwt);
  }
}
