import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Cinema } from '../models/Cinema';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  constructor(private http: HttpClient) {}

  get(id: number) {
    return this.http
      .get<Cinema>(`${environment.apiConfig.url}/cinemas/${id}`)
      .pipe(tap(res => res));
  }

  getAll() {
    return this.http
      .get<Cinema[]>(`${environment.apiConfig.url}/cinemas?_sort=name&`)
      .pipe(tap(res => res));
  }

  getAllByBranch(branchId: number) {
    return this.http
      .get<Cinema[]>(
        `${environment.apiConfig.url}/cinemas?_sort=name&branchId=${branchId}`
      )
      .pipe(tap(res => res));
  }

  getList(
    branchId: number,
    searchKey: string = '',
    start: number = 0,
    end: number = 10
  ) {
    let search = '';

    if (searchKey) {
      search = `&name_like=${searchKey}`;
    }

    return this.http
      .get<Cinema[]>(
        `${
          environment.apiConfig.url
        }/cinemas?_sort=name&_start=${start}&_end=${end}&branchId=${branchId}${search}`
      )
      .pipe(tap(res => res));
  }

  getTotalCount() {
    const start = 0;
    const end = 10;

    return this.http
      .get(`${environment.apiConfig.url}/cinemas?_start=${start}&_end=${end}`, {
        observe: 'response'
      })
      .pipe(map(res => +res.headers.get('X-Total-Count')));
  }

  add(data: Cinema) {
    return this.http
      .post<Cinema>(`${environment.apiConfig.url}/cinemas`, data)
      .pipe(tap(res => res));
  }

  update(data: Cinema) {
    return this.http
      .patch(`${environment.apiConfig.url}/cinemas/${data.id}`, data)
      .pipe(tap(res => res));
  }

  delete(id: number) {
    return this.http
      .delete<Cinema>(`${environment.apiConfig.url}/cinemas/${id}`)
      .pipe(tap(res => res));
  }
}
