import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { OMDbSearch } from '../models/OMDbSearch';
import { OMDbMovie } from '../models/OMDbMovie';

@Injectable({
  providedIn: 'root'
})
export class OMDbService {
  private http: HttpClient;
  private url = environment.omdbConfig.url;
  private apiKey = environment.omdbConfig.apiKey;

  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  get(imdbID) {
    return this.http
      .get<OMDbMovie>(`${this.url}?apiKey=${this.apiKey}&i=${imdbID}`)
      .pipe(tap(res => res));
  }

  searchMovie(searchKey: string, page?: number) {
    return this.search('movie', searchKey, page);
  }

  searchSeries(searchKey: string, page?: number) {
    return this.search('series', searchKey, page);
  }

  searchEpisode(searchKey: string, page?: number) {
    return this.search('episode', searchKey, page);
  }

  private search(type: string, searchKey: string, page?: number) {
    return this.http
      .get<OMDbSearch>(
        `${this.url}?apiKey=${
          this.apiKey
        }&type=${type}&s=${searchKey}&page=${page}`
      )
      .pipe(tap(res => res));
  }
}
