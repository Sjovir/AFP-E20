interface ICitizen {
  id?: string;
  firstName: string;
  lastName: string;
  cpr: string;
}

interface IOrdination {
  id?: string;
  drug: IDrug;
  drugAmount: string;
  drugUnit: string;
  startDate: Date;
  endDate?: Date;
}

interface IDrug {
  id?: string;
  name: string;
  code: string;
}

interface IDecodedAccessToken {
  firstName: string;
  lastName: string;
  username: string;
  permissions?: string[];
}
