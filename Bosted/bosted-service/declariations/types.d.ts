interface ICitizen {
  id?: string;
  firstName: string;
  lastName: string;
  cpr: string;
}

interface IInstallation {
  id?: string;
  name: string;
  address: string;
}

interface IDecodedAccessToken {
  firstName: string;
  lastName: string;
  username: string;
  permissions?: string[];
}
