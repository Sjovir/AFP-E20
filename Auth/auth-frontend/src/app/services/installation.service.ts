import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Installation } from '../models/installation.model';
import { JavaWebTokens } from '../models/java-web-token.model';

@Injectable({
  providedIn: 'root',
})
export class InstallationService {
  readonly BASE_URL: string = `http://${environment.host}:7000/api/installations`;

  constructor(private http: HttpClient) {}

  public getInstallationsOnUser(userId: string): Observable<Installation[]> {
    return this.http.get<Installation[]>(`${this.BASE_URL}/users/${userId}`);
  }

  public selectInstallation(installationId: string): Observable<JavaWebTokens> {
    const tokens: JavaWebTokens = {
      accessToken: localStorage.getItem('access-token'),
      refreshToken: localStorage.getItem('refresh-token'),
    };

    return this.http.post<JavaWebTokens>(`${this.BASE_URL}/select`, {
      installationId,
      tokens,
    });
  }
}
