import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Schedule } from '../models/Schedule';
import { PagedList } from '../models/PagedList';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  constructor(private http: HttpClient) { }

  get(id: number) {
    return this.http
      .get<Schedule>(`${environment.apiConfig.url}/schedules/${id}`)
      .pipe(tap(res => res));
  }

  getPagedListByBranch(branchId: number, start: number = 0, end: number = 10, sort: string = 'id', order: string = 'asc') {
    return this.http
      .get(
        `${
        environment.apiConfig.url
        }/schedules?_expand=cinema&_sort=${sort}&_order=${order}`, {
        observe: 'response'
      }
      )
      .pipe(map(res => {
        const pagedList = new PagedList();
        pagedList.list = JSON.parse(JSON.stringify(res.body));
        pagedList.list = pagedList.list.filter((value, index) => {
          return value.cinema.branchId === branchId;
        });
        pagedList.totalCount = pagedList.list.length;
        pagedList.list = pagedList.list.filter((value, index) => {
          return index >= start && index < end;
        });
        console.log(pagedList);
        return pagedList;
      }));
  }

  getPagedListByCinema(cinemaId: number, start: number = 0, end: number = 10, sort: string = 'id', order: string = 'asc') {
    return this.http
      .get<Schedule[]>(
        `${
        environment.apiConfig.url
        }/schedules?cinemaId=${cinemaId}&_start=${start}&_end=${end}&_sort=${sort}&_order=${order}`, {
        observe: 'response'
      }
      )
      .pipe(map(res => {
        const pagedList = new PagedList();
        pagedList.totalCount = +res.headers.get('X-Total-Count');
        pagedList.list = JSON.parse(JSON.stringify(res.body));

        return pagedList;
      }));
  }

  getScheduleByMovieAndCinema(cinemaId: number, movieId: number, minDate?: Date) {
    return this.http.get<Schedule[]>(
      `${environment.apiConfig.url}/schedules?cinemaId=${cinemaId}&movieId=${movieId}`
    )
      .pipe(map(res => res.filter(r => {
        if (minDate) {
          return new Date(r.startDate).getTime() >= new Date(minDate).getTime();
        } else {
          return r;
        }
      })));
  }

  add(data: Schedule) {
    return this.http
      .post<Schedule>(`${environment.apiConfig.url}/schedules`, data)
      .pipe(tap(res => res));
  }

  update(data: Schedule) {
    return this.http
      .patch(`${environment.apiConfig.url}/schedules/${data.id}`, data)
      .pipe(tap(res => res));
  }

  delete(id: number) {
    return this.http
      .delete<Schedule>(
        `${environment.apiConfig.url}/schedules/${id}`
      )
      .pipe(tap(res => res));
  }
}
