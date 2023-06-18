import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { Review } from '../models/review';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MoviesDataService {
  reviewBaseUrl = environment.reviewBaseUrl;
  movieBaseUrl = environment.movieBaseUrl;

  constructor(private _http: HttpClient) {}

  createMovie(movie: Movie): Observable<Movie> {
    const _url = this.movieBaseUrl;
    return this._http.post<Movie>(_url, movie);
  }

  getMovies(): Observable<Movie[]> {
    const _url = this.movieBaseUrl;
    return this._http.get<Movie[]>(_url);
  }

  getOneMovie(id: string): Observable<Movie> {
    const _url = this.movieBaseUrl;
    return this._http.get<Movie>(_url + id);
  }

  deleteMovie(id: string): Observable<Movie> {
    const url = this.movieBaseUrl;
    return this._http.delete<Movie>(url + id);
  }

  updateMovie(movie: Movie, id: string): Observable<Movie> {
    console.log('I am sending this movie,', movie);

    const url = `${this.movieBaseUrl}${id}`;
    return this._http.put<Movie>(url, JSON.stringify(movie));
  }

  // review related services

  createMovieReview(movie: Movie): Observable<Review> {
    const _url = this.reviewBaseUrl;
    return this._http.post<Review>(_url, movie);
  }

  getMovieReviews(): Observable<Review[]> {
    const _url = this.reviewBaseUrl;
    return this._http.get<Review[]>(_url);
  }

  deleteMovieReview(id: string): Observable<Review> {
    const url = this.movieBaseUrl;
    return this._http.delete<Review>(url + id);
  }

  updateMovieReview(review: Review, id: string): Observable<Review> {
    const url = `${this.movieBaseUrl}${id}`;
    return this._http.put<Review>(url, JSON.stringify(review));
  }
}
