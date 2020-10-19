interface ICitizen {
  firstName: string;
  lastName: string;
  cpr: string;
}

interface IOrdination {
  id?: string;
  drug_id: string;
  drug_amount: string;
  drug_unit: string;
  start_date: Date;
  end_date?: Date;
}

interface IDrug {
  name: string;
  code: string;
}
