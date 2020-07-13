export class Payload 
{
    public PayloadID: string;
    public PayloadType: string;

    constructor(payloadid: string, payloadtype: string)
    {
        this.PayloadID = payloadid;
        this.PayloadType = payloadtype;
    }
}