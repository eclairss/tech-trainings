import { Seat } from './Seat';

export class CinemaSeatPlan {
    id: number;
    cinemaId: number;
    rows: number;
    columns: number;
    seats: Seat[];
}
