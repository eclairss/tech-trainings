import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Movie } from '../models/Movie';
import { PagedList } from '../models/PagedList';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }

  get(id: number) {
    return this.http
      .get<Movie>(`${environment.apiConfig.url}/movies/${id}`)
      .pipe(tap(res => res));
  }

  getAll() {
    return this.http
      .get<Movie[]>(`${environment.apiConfig.url}/movies?_sort=Title`)
      .pipe(tap(res => res));
  }

  getPagedList(searchKey: string = '', start: number = 0, end: number = 10) {
    let search = '';

    if (searchKey) {
      search = `&Title_like=${searchKey}`;
    }

    return this.http
      .get(
        `${
        environment.apiConfig.url
        }/movies?_sort=Title&_start=${start}&_end=${end}${search}`, {
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

  getMoviesByDate(startDate: string, endDate: string, branchId?: number) {
    return this.http
      .get<any[]>(
        `${
        environment.apiConfig.url
        }/schedules?startDate_gte=${startDate}&startDate_lte=${endDate}&_expand=movie&_expand=cinema`
      )
      .pipe(
        map<any, Movie[]>(res => {
          if (branchId) {
            return Array.from(new Set(res.filter(r => r.cinema.branchId === branchId).map((item: any) => item.movie)));
          } else {
            return Array.from(new Set(res.map((item: any) => item.movie)));
          }
        })
      );
  }

  getTrailerUrl(imdbID: string) {
    return `https://www.imdb.com/title/${imdbID}/videogallery/content_type-trailer/`;
  }

  add(data: Movie) {
    return this.http
      .post<Movie>(`${environment.apiConfig.url}/movies`, data)
      .pipe(tap(res => res));
  }

  update(data: Movie) {
    return this.http
      .patch(`${environment.apiConfig.url}/movies/${data.id}`, data)
      .pipe(tap(res => res));
  }

  delete(id: number) {
    return this.http
      .delete<Movie>(`${environment.apiConfig.url}/movies/${id}`)
      .pipe(tap(res => res));
  }
}
