import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Citizen } from '../models/citizen.model';
import { Installation } from '../models/installation.model';

@Injectable({
  providedIn: 'root',
})
export class InstallationService {
  readonly BASE_URL: string = 'http://localhost:3010/api/installations';

  constructor(private http: HttpClient) {}

  public getCitizensOnInstallation(
    installationId: string
  ): Observable<Citizen[]> {
    return this.http.get<Citizen[]>(
      `${this.BASE_URL}/${installationId}/citizens`
    );
  }

  public get(installationId: String): Observable<Installation> {
    return this.http.get<Installation>(`${this.BASE_URL}/${installationId}`);
  }

  public getAll(): Observable<Installation[]> {
    return this.http.get<Installation[]>(this.BASE_URL);
  }

  public create(installation: Installation) {
    return this.http.post<any>(this.BASE_URL, installation);
  }

  public addCitizen(citizenId: string, installationId: string) {
    return this.http.post<any>(
      `${this.BASE_URL}/${installationId}/citizens/${citizenId}`,
      {}
    );
  }
}
