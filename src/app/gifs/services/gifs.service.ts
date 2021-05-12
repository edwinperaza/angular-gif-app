import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'eQ2q1mbbx33CTNaFxEDk7NtGsZ2RoLiD';
  private baseURL: string = 'https://api.giphy.com/v1/gifs';
  private _history: string[] = [];
  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor( private http: HttpClient) {
    // ! validates the object and if it is null return empty array
    this._history = JSON.parse(localStorage.getItem('historial')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searchGifs (query: string) {

    query = query.trim().toLocaleLowerCase();

    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._history))
    }
    
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('q', query)
    .set('limit', '10');

    this.http.get<SearchGifsResponse>(`${this.baseURL}/search`, {params})
    .subscribe( resp  => {
      this.results = resp.data;
      localStorage.setItem('results', JSON.stringify(this.results))
    })
  }
}
