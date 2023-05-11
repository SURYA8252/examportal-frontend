import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }
  //Load All The Category
  public categories()
  {
    return this._http.get(`${baseUrl}/category/`)
  }
  //Save Category
  public addCategory(category:any)
  {
     return this._http.post(`${baseUrl}/category/`,category)
  }
}
