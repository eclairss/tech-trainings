import { AccessType } from '../constants/AccessType';

export class User {
  id: number;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDay: Date;
  accessType: AccessType;
}
