export enum UserRole {
    Administrator = 0,
    LaunchDirector = 1,
    LaunchEngineer = 2,
}

export class UserRoles {
    public static userRoles = [
        { value: UserRole.Administrator.toString(), label: "Administrator" },
        { value: UserRole.LaunchDirector.toString(), label: "Launch Director" },
        { value: UserRole.LaunchEngineer.toString(), label: "Launch Engineer" }
    ];
}