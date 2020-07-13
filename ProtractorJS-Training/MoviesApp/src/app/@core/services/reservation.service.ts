import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Reservation } from '../models/Reservation';
import { Schedule } from '../models/Schedule';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private readonly reservation: BehaviorSubject<
    Reservation
  > = new BehaviorSubject<Reservation>(new Reservation());
  readonly reservation$ = this.reservation.asObservable();

  constructor(private http: HttpClient) {}

  get(id: number) {
    return this.http
      .get<Reservation>(`${environment.apiConfig.url}/reservations/${id}`)
      .pipe(tap(res => res));
  }

  getBySchedule(schedule: Schedule) {
    const scheduleId = schedule.id;
    return this.http
      .get<Reservation[]>(
        `${environment.apiConfig.url}/reservations?scheduleId=${scheduleId}`
      )
      .pipe(tap(res => res));
  }

  add(data: Reservation) {
    return this.http
      .post<Reservation>(`${environment.apiConfig.url}/reservations`, data)
      .pipe(tap(res => res));
  }

  update(data: Reservation) {
    return this.http
      .patch(`${environment.apiConfig.url}/reservations/${data.id}`, data)
      .pipe(tap(res => res));
  }

  delete(id: number) {
    return this.http
      .delete<Reservation>(`${environment.apiConfig.url}/reservations/${id}`)
      .pipe(tap(res => res));
  }

  updateReservation(reservation: Reservation) {
    this.reservation.next(reservation);
  }
}
