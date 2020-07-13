import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { PagedList } from '../models/PagedList';
import { Payment } from '../models/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  add(data: Payment) {
    return this.http
      .post<Payment>(`${environment.apiConfig.url}/payments`, data)
      .pipe(tap(res => res));
  }

  get(id: number) {
    return this.http
      .get<Payment>(`${environment.apiConfig.url}/payments/${id}`)
      .pipe(tap(res => res));
  }

  getAll() {
    return this.http
      .get<Payment[]>(`${environment.apiConfig.url}/payments?_sort=id`)
      .pipe(tap(res => res));
  }

  getPagedList(transactionDate: string = '', start: number = 0, end: number = 10) {
    let search = '';

    if (transactionDate) {
      search = `&transactionDate_like=${transactionDate}`;
    }

    return this.http
      .get(
        `${
        environment.apiConfig.url
        }/payments?_sort=id`, {
        observe: 'response'
      }
      )
      .pipe(map(res => {
        const pagedList = new PagedList();
        pagedList.list = JSON.parse(JSON.stringify(res.body));
        
        if (transactionDate) {
          const tDate = new Date(transactionDate);

          pagedList.list = pagedList.list.filter(value => {
            return new Date(value.transactionDate).toDateString() === tDate.toDateString();
          })
        }

        pagedList.totalCount = pagedList.list.length;
        pagedList.list = pagedList.list.filter((value, index) => {
          return index >= start && index < end;
        });

        return pagedList;
      }));
  }
}


