import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../model/Movie';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  apiBaseUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) {
  }

  public getAllRecentMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiBaseUrl}/movie/recent`)
  }

  public getMovieByID(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiBaseUrl}/movie/id/${id}`)
  }

  public getMovieByIDLike(id:string) : Observable<Movie>{
    return this.http.get<Movie>(`${this.apiBaseUrl}/movie/search/id/${id}`)
  }

  public getAllMoviesWithGenreAndActor(genres: String, actors: String): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiBaseUrl}/movie/filter?actor=${actors}&genre=${genres}`)
  }

  public getAllMoviesWithGenres(genres: String): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiBaseUrl}/movie/filter?genre=${genres}`)
  }

  public getAllMoviesWithActors(actors: String): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiBaseUrl}/movie/filter?actor=${actors}`)
  }

  public getAllMoviesWithNamesLike(id:string):Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.apiBaseUrl}/movie/search/id/${id}`)
  }

  public getAllGenresLike(genre:string):Observable<string[]>{
    return this.http.get<string[]>(`${this.apiBaseUrl}/movie/search/genre/${genre}`)
  }

  //Files section

  public getAllStreamLinks(id: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiBaseUrl}/movie/files/${id}`)
  }

  public getVideoFile(studio: string, id: string): Observable<string> {
    return this.http.get<string>(`${this.apiBaseUrl}/stream/video/${studio}/${id}`)
  }

  public getMovieImageFile(studio: string, id: string): Observable<string> {
    return this.http.get<string>(`${this.apiBaseUrl}/stream/picture/movie/${id}.jpg`)
  }
  //Files section ends


}
