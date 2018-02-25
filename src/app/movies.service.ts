import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Movie from './models/movie';
import Review from './models/review';

@Injectable()
export class MoviesService {
  private _baseUrl : string = 'https://anguflix-api.herokuapp.com/api/movies'

  constructor(private http : HttpClient) { }

  getMovies(filter?) : Observable<Movie[]> { 
    let params = new HttpParams();
    filter.title ? params = params.set('title', filter.title) : null
    filter.year ? params = params.set('year', filter.year) : null
    return this.http.get<Movie[]>(this._baseUrl, { params: params });
  }

  getMovie(id : number) : Observable<Movie> {
    return this.http.get<Movie>(`${this._baseUrl}/${id}`);
  }

  addMovieReview(movieId : string, review : Review) : Observable<Movie> {
    return this.http.post<Movie>(`${this._baseUrl}/${movieId}/reviews`, review);
  }

}
