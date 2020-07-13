import { AccessType } from '../constants/AccessType';

export class Register {
    email: string;
    password: string;
    firstName: string;
    middleName: string;
    lastName: string;
    birthDay: Date;
    accessType: AccessType;
}