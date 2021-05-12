import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "eQ2q1mbbx33CTNaFxEDk7NtGsZ2RoLiD";
  private _history: string[] = [];
  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor( private http: HttpClient) {
    // ! validates the object and if it is null return empty array
    this._history = JSON.parse(localStorage.getItem('historial')!) || [];
  }

  searchGifs (query: string) {

    query = query.trim().toLocaleLowerCase();

    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._history))
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=eQ2q1mbbx33CTNaFxEDk7NtGsZ2RoLiD&q=${query}&limit=10`)
    .subscribe( resp  => {
      console.log(resp.data);
      this.results = resp.data;
    })
  }
}
