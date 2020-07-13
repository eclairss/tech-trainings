import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Branch } from '../models/Branch';
import { tap, map } from 'rxjs/operators';
import { PagedList } from '../models/PagedList';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  constructor(private http: HttpClient) {}

  get(id: number) {
    return this.http
      .get<Branch>(`${environment.apiConfig.url}/branches/${id}`)
      .pipe(tap(res => res));
  }

  getAll() {
    return this.http
      .get<Branch[]>(`${environment.apiConfig.url}/branches?_sort=name`)
      .pipe(tap(res => res));
  }

  getPagedList(searchKey: string = '', start: number = 0, end: number = 10) {
    let search = '';

    if (searchKey) {
      search = `&name_like=${searchKey}`;
    }

    return this.http
      .get(
        `${
          environment.apiConfig.url
        }/branches?_sort=name&_start=${start}&_end=${end}${search}`,
        {
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

  add(data: Branch) {
    return this.http
      .post<Branch>(`${environment.apiConfig.url}/branches`, data)
      .pipe(tap(res => res));
  }

  update(data: Branch) {
    return this.http
      .patch(`${environment.apiConfig.url}/branches/${data.id}`, data)
      .pipe(tap(res => res));
  }

  delete(id: number) {
    return this.http
      .delete<Branch>(`${environment.apiConfig.url}/branches/${id}`)
      .pipe(tap(res => res));
  }
}
