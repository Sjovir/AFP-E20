import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private jwtHelper: JwtHelperService) {}

  public hasPermissions(permissions: Permission | Permission[]): boolean {
    const accessTokenString: string = localStorage.getItem('access-token');
    const accessToken = this.jwtHelper.decodeToken(accessTokenString);
    const userPermissions: string[] = accessToken.permissions;

    if (Array.isArray(permissions)) {
      return permissions.every((permission) => {
        return userPermissions.includes(permission);
      });
    }

    return userPermissions.includes(permissions);
  }
}

export enum Permission {
  ADMIN = 'ADMIN',
  INSTALLATION_VIEW = 'INSTALLATION:VIEW',
  INSTALLATION_EDIT = 'INSTALLATION:EDIT',
  USER_VIEW = 'USER:VIEW',
  USER_EDIT = 'USER:EDIT',
  CITIZEN_VIEW = 'CITIZEN:VIEW',
  CITIZEN_EDIT = 'CITIZEN:EDIT',
  JOURNAL_VIEW = 'JOURNAL:VIEW',
  JOURNAL_EDIT = 'JOURNAL:EDIT',
  MEDICINE_VIEW = 'MEDICINE:VIEW',
  MEDICINE_EDIT = 'MEDICINE:EDIT',
}
