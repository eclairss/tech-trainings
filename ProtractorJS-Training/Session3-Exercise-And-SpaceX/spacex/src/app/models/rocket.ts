export class Rocket {
    public id: number;
    public RocketID: string;
    public Name: string;
    public Description: string;
    public Type: string;

    constructor(rocketid: string, rocketname: string, description: string, type: string)
    {
        this.RocketID = rocketid;
        this.Name = rocketname;
        this.Description = description;
        this.Type = type;
    }
}