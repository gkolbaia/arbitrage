import { CasePerson } from './case-person.interface';

export interface Case {
  _id?: string;
  record?: any;
  caseId?: string;
  reporter: CasePerson;
  defendant: CasePerson;
  reportFiles: any[];
  defendantFiles?: any[];
}
