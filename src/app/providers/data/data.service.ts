import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'https://api.themoviedb.org/3/'
  apiKey = '79b2db1673db35ab754bce2a8fad653e'
  language = 'pt-BR'

  constructor(
    private http: HttpClient
  ) { }

  getPopular(): Observable<any> {
    return this.http.get(this.url + `movie/popular?api_key=${this.apiKey}&language=${this.language}&page=1`)
  }

  getRated(page): Observable<any> {
    return this.http.get(this.url + `movie/top_rated?api_key=${this.apiKey}&language=${this.language}&page=${page}`)
  }

  getGenres(): Observable<any>{
    return this.http.get(this.url + `genre/movie/list?api_key=${this.apiKey}&language=${this.language}`)
  } 
}
