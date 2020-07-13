export class Payment {
    id: number;
    userId: number;
    transactionDate: Date;
    method: string;
    amount: number;
    cardholderName: string;
    creditCardNo: string;
    cvv: string;
    expiryDate: Date;
    description: string;
    cinemaSeatPlanIds: number[];
}
