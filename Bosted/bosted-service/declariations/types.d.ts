interface ICitizen {
  firstName: string;
  lastName: string;
  cpr: string;
}

interface IInstallation {
  name: string;
  address: string;
}

interface IDecodedAccessToken {
  firstName: string;
  lastName: string;
  username: string;
  permissions: string[];
}
