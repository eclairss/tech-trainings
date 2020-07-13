import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CinemaSeatPlan } from '../models/CinemaSeatPlan';

@Injectable({
  providedIn: 'root'
})
export class CinemaSeatPlanService {
  constructor(private http: HttpClient) {}

  get(id: number) {
    return this.http
      .get<CinemaSeatPlan>(
        `${environment.apiConfig.url}/cinema_seat_plans/${id}`
      )
      .pipe(tap(res => res));
  }

  getByCinema(cinemaId: number) {
    return this.http
      .get<CinemaSeatPlan[]>(
        `${environment.apiConfig.url}/cinema_seat_plans?cinemaId=${cinemaId}`
      )
      .pipe(map(res => (res && res.length ? res[0] : undefined)));
  }

  add(data: CinemaSeatPlan) {
    return this.http
      .post<CinemaSeatPlan>(
        `${environment.apiConfig.url}/cinema_seat_plans`,
        data
      )
      .pipe(tap(res => res));
  }

  update(data: CinemaSeatPlan) {
    return this.http
      .patch(`${environment.apiConfig.url}/cinema_seat_plans/${data.id}`, data)
      .pipe(tap(res => res));
  }

  delete(id: number) {
    return this.http
      .delete<CinemaSeatPlan>(
        `${environment.apiConfig.url}/cinema_seat_plans/${id}`
      )
      .pipe(tap(res => res));
  }
}
