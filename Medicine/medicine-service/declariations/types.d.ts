interface ICitizen {
  id?: string;
  firstName: string;
  lastName: string;
  cpr: string;
}

interface IOrdination {
  id?: string;
  drugId: string;
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
