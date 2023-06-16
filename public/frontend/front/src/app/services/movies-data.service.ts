import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesDataService {
  baseUrl = "http://localhost:4003/api/movies/"

  constructor(private _http:HttpClient) { }

createMovie(movie:Movie):Observable<Movie> {
  const _url = this.baseUrl;
  return this._http.post<Movie>(_url, movie);
}

getMovies():Observable<Movie[]> {
  const _url = this.baseUrl;
  return this._http.get<Movie[]>(_url);
}

getOneMovie(id:string):Observable<Movie> {
  const _url = this.baseUrl;
  return this._http.get<Movie>(_url+id);
}

deleteMovie(id:string):Observable<Movie> {
  const url = this.baseUrl;
  return this._http.delete<Movie>(url + id)
}

updateMovie(movie:Movie, id:string):Observable<Movie> {
  console.log("I am sending this movie,", movie);
  
  const url = `${this.baseUrl}${id}`;
  return this._http.put<Movie>(url, JSON.stringify(movie));
}

// review related routes 


}
