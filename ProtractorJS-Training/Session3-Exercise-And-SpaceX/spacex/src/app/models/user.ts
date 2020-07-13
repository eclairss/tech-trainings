import { UserRole  } from './enums/userrole';

export  class User {
    public id : number;
    public FirstName: string;
    public LastName: string;
    public Username: string;
    public Password: string;
    public EmailAddress: string;

    public UserRole: UserRole;
}

