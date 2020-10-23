import { Drug } from "./drug.model";

export class Ordination {
  id: string;
  drug: Drug;
  drugAmount: number;
  drugUnit: string;
  startDate: Date;
  endDate?: Date;
}
