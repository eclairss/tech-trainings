import { Seat } from './Seat';
import { Movie } from './Movie';
import { Cinema } from './Cinema';

export class Reservation {
    id: number;
    seats: Seat[];
    paymentId?: number;
    scheduleId: number;
    movieId: number;
    cinemaId: number;
    totalAmount: number;
}
