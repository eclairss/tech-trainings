import { Injectable } from '@angular/core';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MapperService {
  constructor() {}

  mapToMovie(data: any): Movie {
    const movie = new Movie();

    movie.Title = data.Title;
    movie.Year = data.Year;
    movie.Rated = data.Rated;
    movie.Released = data.Released;
    movie.Runtime = data.Runtime;
    movie.Genre = data.Genre;
    movie.Director = data.Director;
    movie.Writer = data.Writer;
    movie.Actors = data.Actors;
    movie.Plot = data.Plot;
    movie.Language = data.Language;
    movie.Country = data.Country;
    movie.Awards = data.Awards;
    movie.Poster = data.Poster;
    movie.Metascore = data.Metascore;
    movie.imdbRating = data.imdbRating;
    movie.imdbVotes = data.imdbVotes;
    movie.imdbID = data.imdbID;
    movie.Type = data.Type;
    movie.DVD = data.DVD;
    movie.BoxOffice = data.BoxOffice;
    movie.Production = data.Production;
    movie.Website = data.Website;

    return movie;
  }
}
